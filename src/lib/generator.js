// The Kaomoji Maker engine — pure, DOM-free, importable by the Solid island, the
// (phase-2) OG Pages Function, and the node test alike.
//
// It turns the phase-1 parts taxonomy (src/data/parts.js) into clean, user-facing
// `galleries`, assembles a `selection` into a valid face, draws a random one, and
// serializes a selection to/from a compact URL token.
//
// Two shapes, kept distinct on purpose:
//   • a GALLERY entry carries display metadata — {left,right,identical,count} for
//     pair slots, {glyph,count,mood} for mouths, {glyph,count} for cheeks.
//   • a SELECTION entry is the MINIMAL canonical form actually chosen/serialized —
//     {left,right} | {glyph} | null. assemble/encode/decode/random all speak this.
import { partsInventory, partsPairs } from "../data/parts.js";

// Canonical slot grammar:  decorL armL bracketL cheekL eyeL mouth eyeR cheekR bracketR armR decorR
export const SLOT_ORDER = ["decorL", "armL", "bracketL", "cheekL", "eyeL", "mouth", "eyeR", "cheekR", "bracketR", "armR", "decorR"];

// ── Curation ────────────────────────────────────────────────────────────────
// The raw inventory is noisy (composite tokens, combining-mark soup, parser
// residue). Keep only options that are a single grapheme, or a curated multi.
const MULTI_ALLOW = new Set(["‿‿", "͡°"]);
const isClean = (g) => typeof g === "string" && g.length > 0 && ([...g].length === 1 || MULTI_ALLOW.has(g));

const curatePairs = (arr, { min, cap }) =>
  arr
    .filter((p) => p.count >= min && isClean(p.left) && isClean(p.right))
    .slice(0, cap)
    .map((p) => ({ left: p.left, right: p.right, identical: p.left === p.right, count: p.count }));

const curateSingles = (arr, { min, cap, block = new Set() }) =>
  arr
    .filter((x) => x.count >= min && isClean(x.glyph) && !block.has(x.glyph))
    .slice(0, cap);

// Mouth → mood: the strongest emotion lever. Used to group the mouth gallery and
// to (optionally) bias 🎲. Approximate by design — mouths absent here read "other".
const MOOD = {
  "▽": "happy", "∀": "happy", "◡": "happy", "‿": "happy", "ᴗ": "happy", "ᵕ": "happy", "ヮ": "happy", "ᗜ": "happy", "‿‿": "happy", "◇": "happy",
  "ω": "cute", "³": "cute", "꒳": "cute",
  "﹏": "sad", "︶": "sad", "‸": "sad", "⌓": "sad",
  "益": "angry", "Д": "angry", "д": "angry", "ヘ": "angry",
  "o": "surprised", "O": "surprised", "0": "surprised", "ロ": "surprised", "□": "surprised",
  "ε": "love",
  "ᴥ": "animal", "ﻌ": "animal", "㉨": "animal", "ェ": "animal", "ᆺ": "animal", "⩊": "animal",
  "_": "neutral", "ー": "neutral", "￣": "neutral", "∇": "neutral",
};

// Brackets are a tiny, well-defined set — curated directly so mismatched parser
// pairs (`(）`, `（)`) can't leak in. Each keeps its observed count so 🎲 weights
// toward the corpus-dominant round `()` instead of treating frames uniformly.
const BRACKET_PAIRS = [["(", ")"], ["ʕ", "ʔ"], ["（", "）"], ["꒰", "꒱"], ["₍", "₎"]];
const bracketCount = (l, r) => partsPairs.bracket.find((p) => p.left === l && p.right === r)?.count || 1;

// Decorations: the observed-pair data is too sparse/noisy, so curate a clean set
// of symmetric flourishes (placed on both sides).
const DECOR_GLYPHS = ["☆", "★", "✧", "✦", "♡", "♥", "❤", "♪", "♬", "✿", "❀", "°", "｡", "～"];

// Optional slots lead with the `null` "none" entry so it's always visible (never
// pushed past the gallery's "more" fold) and reads as the natural default.
export const galleries = {
  eye: curatePairs(partsPairs.eye, { min: 3, cap: 40 }),
  mouth: curateSingles(partsInventory.mouth, { min: 2, cap: 40 }).map((m) => ({ ...m, mood: MOOD[m.glyph] || "other" })),
  bracket: [null, ...BRACKET_PAIRS.map(([left, right]) => ({ left, right, count: bracketCount(left, right) }))],
  arm: [null, ...curatePairs(partsPairs.arm, { min: 3, cap: 24 })],
  cheek: [null, ...curateSingles(partsInventory.cheek, { min: 2, cap: 14, block: new Set(["="]) })],
  decoration: [null, ...DECOR_GLYPHS.map((g) => ({ left: g, right: g, identical: true }))],
};

// ── assemble ─────────────────────────────────────────────────────────────────
// selection → the rendered face. Cheeks mirror to both sides; pairs expand L/R.
export const assemble = (sel) => {
  const s = {};
  if (sel.decoration) { s.decorL = sel.decoration.left; s.decorR = sel.decoration.right; }
  if (sel.arm) { s.armL = sel.arm.left; s.armR = sel.arm.right; }
  if (sel.bracket) { s.bracketL = sel.bracket.left; s.bracketR = sel.bracket.right; }
  if (sel.cheek) { s.cheekL = sel.cheek.glyph; s.cheekR = sel.cheek.glyph; }
  if (sel.eye) { s.eyeL = sel.eye.left; s.eyeR = sel.eye.right; }
  if (sel.mouth) { s.mouth = sel.mouth.glyph; }
  return SLOT_ORDER.map((slot) => s[slot] || "").join("");
};

// ── default + random ──────────────────────────────────────────────────────────
// A pleasant, always-valid starting face.
export const defaultSelection = () => ({
  bracket: { left: "(", right: ")" },
  eye: { left: "◕", right: "◕" },
  mouth: { glyph: "‿" },
  arm: null, cheek: null, decoration: null,
});

const real = (slot) => galleries[slot].filter(Boolean); // drop the null "none"
const toPair = (e) => ({ left: e.left, right: e.right });

const weightedPick = (arr, rng) => {
  const total = arr.reduce((n, x) => n + (x.count || 1), 0);
  let t = rng() * total;
  for (const x of arr) { t -= x.count || 1; if (t <= 0) return x; }
  return arr[arr.length - 1];
};

// Valid by construction: a balanced bracket pair + a real eye pair + one mouth,
// with optional arm / cheek / decoration each included probabilistically.
export const randomKaomoji = (rng = Math.random) => {
  const selection = {
    bracket: toPair(weightedPick(real("bracket"), rng)),
    eye: toPair(weightedPick(real("eye"), rng)),
    mouth: { glyph: weightedPick(real("mouth"), rng).glyph },
    arm: rng() < 0.5 ? toPair(weightedPick(real("arm"), rng)) : null,
    cheek: rng() < 0.4 ? { glyph: weightedPick(real("cheek"), rng).glyph } : null,
    decoration: rng() < 0.25 ? toPair(weightedPick(real("decoration"), rng)) : null,
  };
  return { selection, value: assemble(selection) };
};

// ── encode / decode (compact, URL-safe, self-describing) ───────────────────────
// utf8-safe base64url so kaomoji codepoints survive the round-trip.
const b64u = (s) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const unb64u = (s) => {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const encode = (sel) =>
  b64u(JSON.stringify({
    b: sel.bracket ? [sel.bracket.left, sel.bracket.right] : null,
    e: sel.eye ? [sel.eye.left, sel.eye.right] : null,
    m: sel.mouth ? sel.mouth.glyph : null,
    a: sel.arm ? [sel.arm.left, sel.arm.right] : null,
    c: sel.cheek ? sel.cheek.glyph : null,
    d: sel.decoration ? [sel.decoration.left, sel.decoration.right] : null,
  }));

const okGlyph = (v) => typeof v === "string" && v.length > 0;
const okPair = (v) => Array.isArray(v) && okGlyph(v[0]) && okGlyph(v[1]);

// Lenient + total: reproduces a shared face even for rare parts, but any missing/
// malformed slot falls back to the default so the result is always a valid face.
export const decode = (token) => {
  const d = defaultSelection();
  try {
    const o = JSON.parse(unb64u(token));
    return {
      bracket: okPair(o.b) ? { left: o.b[0], right: o.b[1] } : (o.b === null ? null : d.bracket),
      eye: okPair(o.e) ? { left: o.e[0], right: o.e[1] } : d.eye,
      mouth: okGlyph(o.m) ? { glyph: o.m } : d.mouth,
      arm: okPair(o.a) ? { left: o.a[0], right: o.a[1] } : null,
      cheek: okGlyph(o.c) ? { glyph: o.c } : null,
      decoration: okPair(o.d) ? { left: o.d[0], right: o.d[1] } : null,
    };
  } catch {
    return d;
  }
};
