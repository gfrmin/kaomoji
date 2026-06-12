// Decompose the kaomoji dataset into a structured, slot-based parts taxonomy.
// Deterministic parser (the bulk) + hand-curated fixups (src/data/partsOverrides.js),
// mirroring the migrate.mjs (auto) + overrides.js (curated) pattern.
// Run: node scripts/decompose.mjs   (also runs from .githooks/pre-commit)
//
// Anatomy (a generative grammar — slots are recombinable):
//   decorL · armL · [ bracketL · cheekL · eyeL · mouth · eyeR · cheekR · bracketR ] · armR · decorR
// Eyes are an OPEN class (whatever flanks the mouth); the mouth/arm/bracket/cheek/
// decoration sets in partsOverrides.js are what the parser keys off.
import fs from "node:fs";
import { categories } from "../src/data/categories.js";
import { raw } from "../src/data/raw.js";
import {
  brackets, mouths, arms, cheeks, decorations, partsFixups,
} from "../src/data/partsOverrides.js";

const SLOT_ORDER = [
  "decorL", "armL", "bracketL", "cheekL", "eyeL", "mouth",
  "eyeR", "cheekR", "bracketR", "armR", "decorR",
];

const seg = new Intl.Segmenter("und", { granularity: "grapheme" });
// Halfwidth katakana sound marks (ﾞ U+FF9E, ﾟ U+FF9F) are spacing chars but the
// segmenter glues them onto the preceding base (so "(ﾟ" and "Дﾟ" become one
// cluster, breaking bracket + mouth matching). Split those clusters back to code
// points; leave real combining clusters (e.g. lenny's "͡°") intact.
const graphemes = (s) =>
  [...seg.segment(s)].flatMap((x) =>
    x.segment.length > 1 && /[ﾞﾟ]/.test(x.segment) ? [...x.segment] : [x.segment]
  );

const openSet = new Set(brackets.open);
const closeSet = new Set(brackets.close);
const armSet = new Set(arms);
const cheekSet = new Set(cheeks);
const decorSet = new Set(decorations);
// Mouths matched longest-first so multi-glyph mouths (‿‿, ╭╮) win over their parts.
const mouthList = [...new Set(mouths)].sort((a, b) => b.length - a.length);
const mouthSet = new Set(mouthList);

const isSpace = (g) => g.trim() === "";

// Locate the dominant bracket pair: first opening char, last closing char after it.
const findBrackets = (chars) => {
  let openIdx = -1;
  for (let i = 0; i < chars.length; i++) {
    if (openSet.has(chars[i])) { openIdx = i; break; }
  }
  if (openIdx < 0) return null;
  let closeIdx = -1;
  for (let i = chars.length - 1; i > openIdx; i--) {
    if (closeSet.has(chars[i])) { closeIdx = i; break; }
  }
  if (closeIdx < 0) return null;
  return { openIdx, closeIdx };
};

// Outer region → { arm, decor }. Known arms + the cluster adjacent to the bracket
// (unless it's a known decoration) are arms; the rest are decorations.
const splitOuter = (str, side) => {
  const clusters = graphemes(str).filter((g) => !isSpace(g));
  if (!clusters.length) return { arm: "", decor: "" };
  const adjIdx = side === "left" ? clusters.length - 1 : 0;
  let arm = "", decor = "";
  clusters.forEach((g, i) => {
    const isArm = armSet.has(g) || (i === adjIdx && !decorSet.has(g));
    if (isArm) arm += g; else decor += g;
  });
  return { arm, decor };
};

// Inner face → cheek/eye/mouth slots (+ any arms tucked inside the brackets).
const splitFace = (inner) => {
  let clusters = graphemes(inner).filter((g) => !isSpace(g));
  const slots = {};
  // Peel arms tucked just inside the brackets (e.g. (ﾉ◕ヮ◕)ﾉ, (づ｡◕‿‿◕｡)づ).
  let insideArmL = "";
  while (clusters.length && armSet.has(clusters[0])) insideArmL += clusters.shift();
  let insideArmR = "";
  while (clusters.length && armSet.has(clusters[clusters.length - 1])) insideArmR = clusters.pop() + insideArmR;
  if (insideArmL) slots.armL = insideArmL;
  if (insideArmR) slots.armR = insideArmR;
  // Peel one cheek/ear/blush on each side.
  if (clusters.length > 1 && cheekSet.has(clusters[0])) slots.cheekL = clusters.shift();
  if (clusters.length > 1 && cheekSet.has(clusters[clusters.length - 1])) slots.cheekR = clusters.pop();

  if (!clusters.length) return slots;

  // Find the mouth: dictionary match nearest the interior center; else heuristic.
  const center = (clusters.length - 1) / 2;
  let best = null; // { i, len, dist }
  for (let i = 0; i < clusters.length; i++) {
    for (const len of [2, 1]) {
      if (i + len > clusters.length) continue;
      if (mouthSet.has(clusters.slice(i, i + len).join(""))) {
        const dist = Math.abs((i + (len - 1) / 2) - center);
        if (!best || dist < best.dist) best = { i, len, dist };
        break; // prefer longer match at this start
      }
    }
  }
  if (best) {
    slots.eyeL = clusters.slice(0, best.i).join("");
    slots.mouth = clusters.slice(best.i, best.i + best.len).join("");
    slots.eyeR = clusters.slice(best.i + best.len).join("");
  } else if (clusters.length === 1) {
    slots.mouth = clusters[0]; // single combined face, e.g. (ツ)
  } else if (clusters.length % 2 === 1) {
    const mid = (clusters.length - 1) / 2;
    slots.eyeL = clusters.slice(0, mid).join("");
    slots.mouth = clusters[mid];
    slots.eyeR = clusters.slice(mid + 1).join("");
  } else {
    const mid = clusters.length / 2; // even, no dict mouth → eyes only
    slots.eyeL = clusters.slice(0, mid).join("");
    slots.eyeR = clusters.slice(mid).join("");
  }
  return slots;
};

// Merge an inside-arm (peeled from the face) with an outer arm, in left-to-right
// reading order: on the left the outer arm precedes the bracket then the inside
// arm (outer+inside); on the right the inside arm precedes the bracket then the
// outer arm (inside+outer).
const joinArm = (outer, inside, side) =>
  side === "left" ? (outer || "") + (inside || "") : (inside || "") + (outer || "");

// Keep only non-empty slots, in canonical SLOT_ORDER.
const orderSlots = (slots) => {
  const ordered = {};
  for (const k of SLOT_ORDER) if (slots[k]) ordered[k] = slots[k];
  return ordered;
};

const parse = (glyph) => {
  if (partsFixups[glyph]) {
    return { slots: orderSlots(partsFixups[glyph]), parsed: true };
  }
  const chars = graphemes(glyph);
  const b = findBrackets(chars);
  if (!b) {
    // Bracketless face (ಠ_ಠ, 〒▽〒, ˘ᵕ˘, ✿◕‿◕✿…): accept only when a dictionary
    // mouth is present, so decorative/divider strings stay unparsed.
    const hasMouth = chars.some((g, i) =>
      mouthSet.has(g) || (i + 1 < chars.length && mouthSet.has(g + chars[i + 1])));
    if (!hasMouth) return { slots: {}, parsed: false };
    const face = splitFace(glyph);
    if (!face.mouth || (!face.eyeL && !face.eyeR)) return { slots: {}, parsed: false };
    return { slots: orderSlots(face), parsed: true };
  }

  const left = chars.slice(0, b.openIdx).join("");
  const inner = chars.slice(b.openIdx + 1, b.closeIdx).join("");
  const right = chars.slice(b.closeIdx + 1).join("");

  const outerL = splitOuter(left, "left");
  const outerR = splitOuter(right, "right");
  const face = splitFace(inner);

  const slots = {
    decorL: outerL.decor,
    armL: joinArm(outerL.arm, face.armL, "left"),
    bracketL: chars[b.openIdx],
    cheekL: face.cheekL,
    eyeL: face.eyeL,
    mouth: face.mouth,
    eyeR: face.eyeR,
    cheekR: face.cheekR,
    bracketR: chars[b.closeIdx],
    armR: joinArm(outerR.arm, face.armR, "right"),
    decorR: outerR.decor,
  };
  return { slots: orderSlots(slots), parsed: true };
};

// --- Run over the kaomoji-type categories only. ------------------------------
const kaomojiCats = new Set(categories.filter((c) => c.type === "kaomoji").map((c) => c.id));
const naCats = categories.filter((c) => c.type !== "kaomoji").map((c) => c.id);

const decomposition = {};
const counts = { eye: new Map(), mouth: new Map(), cheek: new Map(), arm: new Map(), bracket: new Map(), decoration: new Map() };
const bump = (map, key) => { if (key) map.set(key, (map.get(key) || 0) + 1); };

// Observed L/R combinations: many parts are only meaningful paired (mirrored eyes
// ≧…≦, brackets ʕ…ʔ, arms ٩…۶, framing decorations). These tables encode which
// left part actually co-occurs with which right part — the constraint a flat
// per-slot list loses — so a generator recombines real pairs, not arbitrary ones.
const pairCounts = { eye: new Map(), bracket: new Map(), arm: new Map(), decoration: new Map() };
const bumpPair = (map, l, r) => { if (l && r) { const k = l + "\t" + r; map.set(k, (map.get(k) || 0) + 1); } };

let total = 0, parsed = 0;
const unparsed = [];
for (const id of kaomojiCats) {
  for (const glyph of raw[id] || []) {
    if (glyph in decomposition) continue; // same glyph can appear in 2 categories
    total++;
    const res = parse(glyph);
    decomposition[glyph] = res;
    if (!res.parsed) { unparsed.push(glyph); continue; }
    parsed++;
    const s = res.slots;
    bump(counts.eye, s.eyeL); bump(counts.eye, s.eyeR);
    bump(counts.mouth, s.mouth);
    bump(counts.cheek, s.cheekL); bump(counts.cheek, s.cheekR);
    bump(counts.arm, s.armL); bump(counts.arm, s.armR);
    bump(counts.bracket, s.bracketL); bump(counts.bracket, s.bracketR);
    bump(counts.decoration, s.decorL); bump(counts.decoration, s.decorR);
    bumpPair(pairCounts.eye, s.eyeL, s.eyeR);
    bumpPair(pairCounts.bracket, s.bracketL, s.bracketR);
    bumpPair(pairCounts.arm, s.armL, s.armR);
    bumpPair(pairCounts.decoration, s.decorL, s.decorR);
  }
}

let naCount = 0;
for (const id of naCats) {
  for (const glyph of raw[id] || []) {
    if (glyph in decomposition) continue;
    decomposition[glyph] = { slots: {}, parsed: false, na: true };
    naCount++;
  }
}

const toInventory = (map) =>
  [...map.entries()].map(([glyph, count]) => ({ glyph, count })).sort((a, b) => b.count - a.count);
const partsInventory = Object.fromEntries(Object.entries(counts).map(([k, m]) => [k, toInventory(m)]));

const toPairs = (map) =>
  [...map.entries()]
    .map(([k, count]) => { const [left, right] = k.split("\t"); return { left, right, count, identical: left === right }; })
    .sort((a, b) => b.count - a.count);
// Observed left/right combinations per slot — the recombination constraint.
const partsPairs = Object.fromEntries(Object.entries(pairCounts).map(([k, m]) => [k, toPairs(m)]));

const coverage = { total, parsed, unparsedCount: unparsed.length, naCount };

const header = "// AUTO-GENERATED by scripts/decompose.mjs — do not edit by hand.\n";
fs.writeFileSync(
  "src/data/parts.js",
  header +
    "export const decomposition = " + JSON.stringify(decomposition, null, 2) + ";\n\n" +
    "export const partsInventory = " + JSON.stringify(partsInventory, null, 2) + ";\n\n" +
    "export const partsPairs = " + JSON.stringify(partsPairs, null, 2) + ";\n\n" +
    "export const coverage = " + JSON.stringify(coverage, null, 2) + ";\n"
);

// --- Coverage report ---------------------------------------------------------
const pct = (n) => ((n / total) * 100).toFixed(1);
console.log(`\nKaomoji decomposition coverage`);
console.log(`  kaomoji glyphs:   ${total}`);
console.log(`  cleanly parsed:   ${parsed} (${pct(parsed)}%)`);
console.log(`  unparsed:         ${unparsed.length} (${pct(unparsed.length)}%)`);
console.log(`  non-kaomoji N/A:  ${naCount} (emoji/symbol/divider, skipped)`);

console.log(`\nParts inventory (distinct parts per slot):`);
for (const [slot, list] of Object.entries(partsInventory)) {
  const top = list.slice(0, 15).map((p) => `${p.glyph}×${p.count}`).join("  ");
  console.log(`  ${slot.padEnd(11)} ${String(list.length).padStart(4)} distinct | ${top}`);
}

console.log(`\nObserved L/R pairs (the combination constraint; = identical sides, → differing):`);
for (const [slot, list] of Object.entries(partsPairs)) {
  const diff = list.filter((p) => !p.identical).length;
  const top = list.slice(0, 8).map((p) => `${p.left}${p.identical ? "=" : "→"}${p.right}×${p.count}`).join("  ");
  console.log(`  ${slot.padEnd(11)} ${String(list.length).padStart(4)} pairs (${diff} asymmetric) | ${top}`);
}

if (unparsed.length) {
  console.log(`\nUnparsed glyphs (curation triage — add to partsFixups):`);
  console.log("  " + unparsed.join("   "));
}
