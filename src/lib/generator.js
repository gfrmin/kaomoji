// The Kaomoji Maker engine — pure, DOM-free, importable by the Solid island, the
// (phase-2) OG Pages Function, and the node test alike.
//
// The per-slot `galleries` are precomputed at build time (scripts/build-galleries.mjs
// → src/data/galleries.js) so the client ships only the small curated result, not
// the full raw parts taxonomy. This module just assembles a selection into a face,
// draws a random one, and serializes a selection to/from a compact URL token.
//
// Two shapes, kept distinct on purpose:
//   • a GALLERY entry carries display metadata — {left,right,identical,count} for
//     pair slots, {glyph,count,mood} for mouths, {glyph,count} for cheeks.
//   • a SELECTION entry is the MINIMAL canonical form actually chosen/serialized —
//     {left,right} | {glyph} | null. assemble/encode/decode/random all speak this.
import { galleries } from "../data/galleries.js";

export { galleries };

// Canonical slot grammar:  decorL armL bracketL cheekL eyeL mouth eyeR cheekR bracketR armR decorR
export const SLOT_ORDER = ["decorL", "armL", "bracketL", "cheekL", "eyeL", "mouth", "eyeR", "cheekR", "bracketR", "armR", "decorR"];

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

// The real (non-"none") options per slot, computed once — not on every 🎲.
const REAL = Object.fromEntries(Object.entries(galleries).map(([slot, opts]) => [slot, opts.filter(Boolean)]));
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
    bracket: toPair(weightedPick(REAL.bracket, rng)),
    eye: toPair(weightedPick(REAL.eye, rng)),
    mouth: { glyph: weightedPick(REAL.mouth, rng).glyph },
    arm: rng() < 0.5 ? toPair(weightedPick(REAL.arm, rng)) : null,
    cheek: rng() < 0.4 ? { glyph: weightedPick(REAL.cheek, rng).glyph } : null,
    decoration: rng() < 0.25 ? toPair(weightedPick(REAL.decoration, rng)) : null,
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

// A decoded slot is only accepted if it's an ACTUAL gallery part — never raw
// token text. This keeps every legitimate share working (the maker only ever
// emits gallery parts) while ensuring a crafted ?k= token can't inject arbitrary
// text into the rendered face / OG meta or blow up the face length: the result is
// always a real, bounded, valid kaomoji. Unknown required slot → default; unknown
// optional slot → none.
const pairIn = (slot, v) =>
  Array.isArray(v) && galleries[slot].some((e) => e && e.left === v[0] && e.right === v[1])
    ? { left: v[0], right: v[1] } : undefined;
const glyphIn = (slot, v) =>
  galleries[slot].some((e) => e && e.glyph === v) ? { glyph: v } : undefined;

export const decode = (token) => {
  const d = defaultSelection();
  try {
    const o = JSON.parse(unb64u(token));
    return {
      bracket: o.b === null ? null : (pairIn("bracket", o.b) ?? d.bracket),
      eye: pairIn("eye", o.e) ?? d.eye,
      mouth: glyphIn("mouth", o.m) ?? d.mouth,
      arm: pairIn("arm", o.a) ?? null,
      cheek: glyphIn("cheek", o.c) ?? null,
      decoration: pairIn("decoration", o.d) ?? null,
    };
  } catch {
    return d;
  }
};
