# OG-card fonts (build-time only)

These fonts are used by `src/pages/og/[...route].ts` (astro-og-canvas / canvaskit)
to render the per-page 1200×630 social cards at build time. They are **not**
shipped to the browser — the website itself uses the visitor's system fonts.

- `NotoSans-subset.ttf` (~53 KB) — Latin, punctuation, common symbols. Subset to
  only the codepoints used across the dataset.
- `NotoSansSymbols2-subset.ttf` (~40 KB) — decorative symbols (✧ ★ ☆ ⋆ …). Subset.
- `NotoSansJP-Regular.ttf` (~5.8 MB) — katakana/hiragana/CJK punctuation **and the
  math symbols** kaomoji use (≧ ≦ ◕ …). Kept **whole** (instanced from the variable
  font to wght=400, not subset): `pyftsubset` makes canvaskit drop math-symbol
  glyphs even when they stay in the `cmap` (its fallback keys off OS/2 coverage),
  so the JP font must not be subset.

## Coverage & safe glyphs

Kaomoji span ~40 Unicode scripts; these three fonts cover the common ones but not
every exotic glyph (Kannada ಠ, Canadian syllabics ᕦ, Thai ๑, box-drawing ┻ …).
To avoid tofu, the OG route picks a **render-safe glyph per card** using
`src/data/ogGlyphCoverage.js` (the AUTO-GENERATED list of dataset codepoints these
fonts can render): it prefers the page's representative glyph, else the first item
whose every codepoint is covered, else the universal fallback `(・ω・)`.

## Regenerating (after adding fonts or dataset glyphs)

1. Rebuild the subsets from the full Noto fonts via `pyftsubset --unicodes=…`
   (compute the codepoint set from `src/data/raw.js` + category samples). Keep
   `NotoSansJP-Regular.ttf` **full** (do not subset it).
2. Regenerate `src/data/ogGlyphCoverage.js`: union the three fonts' `cmap`s
   (fontTools), intersect with the dataset codepoints, write the sorted list.
3. `npm run build`, then eyeball a few `/og/*.png` (a decorated card, a CJK card,
   and a known-exotic tag) for tofu.
