// Node assertions for the pure generator engine (no test runner in this repo).
// Run: node scripts/test-generator.mjs
import assert from "node:assert/strict";
import { galleries, SLOT_ORDER, assemble, randomKaomoji, encode, decode } from "../src/lib/generator.js";

// — galleries are populated and shaped right —
for (const slot of ["eye", "mouth", "bracket", "arm", "cheek", "decoration"]) {
  assert.ok(galleries[slot]?.length > 0, `${slot} gallery non-empty`);
}
assert.ok(galleries.eye.every((e) => e.left && e.right), "eyes are pairs");
assert.ok(galleries.mouth.every((m) => [...m.glyph].length >= 1), "mouths are glyphs");
for (const slot of ["bracket", "arm", "cheek", "decoration"]) {
  assert.ok(galleries[slot].some((x) => x === null), `${slot} has a "none"`);
}

// — assemble is balanced, single-mouth, in SLOT_ORDER —
const sel = {
  bracket: { left: "(", right: ")" }, eye: { left: "◕", right: "◕" }, mouth: { glyph: "‿" },
  arm: null, cheek: null, decoration: null,
};
assert.equal(assemble(sel), "(◕‿◕)");
const sel2 = { ...sel, arm: { left: "ヽ", right: "ﾉ" }, cheek: { glyph: "｡" }, decoration: { left: "☆", right: "☆" } };
assert.equal(assemble(sel2), "☆ヽ(｡◕‿◕｡)ﾉ☆");

// — SLOT_ORDER is the canonical 11-slot grammar —
assert.deepEqual(SLOT_ORDER, ["decorL","armL","bracketL","cheekL","eyeL","mouth","eyeR","cheekR","bracketR","armR","decorR"]);

// — encode/decode round-trips valid selections and never throws on garbage —
assert.deepEqual(decode(encode(sel)), sel);
assert.deepEqual(decode(encode(sel2)), sel2);
assert.doesNotThrow(() => decode("@@not-valid@@"));
assert.ok(decode("@@not-valid@@").eye, "garbage decodes to a valid default");
assert.ok(decode("").eye, "empty decodes to a valid default");

// — randomKaomoji: deterministic with a seeded rng, always valid —
const seeded = (() => { let s = 42; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; })();
const r1 = randomKaomoji(seeded);
assert.ok(r1.value.length > 0 && r1.selection.bracket && r1.selection.eye && r1.selection.mouth, "random has core slots");
const mouths = [...r1.value].filter((c) => galleries.mouth.some((x) => x.glyph === c));
assert.ok(mouths.length >= 1, "random face has a mouth glyph");
const seededAgain = (() => { let s = 42; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; })();
assert.equal(randomKaomoji(seededAgain).value, r1.value, "same seed → same face");

console.log("generator: all assertions passed");
