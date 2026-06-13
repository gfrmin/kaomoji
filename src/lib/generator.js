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
