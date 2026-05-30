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
- `NotoSansKannada-Regular.ttf` (~180 KB) — Kannada (ಠ in `ಠ_ಠ`, `(ノಠ益ಠ)ノ彡┻━┻` …).
  Kept whole.
- `NotoSansArabic-Regular.ttf` (~235 KB) — Arabic (٩ و in `٩( 'ω' )و` …). Kept whole.
- `NotoSansMath-Regular.ttf` (~1 MB) — the only Noto family covering `⌐` (U+2310, in
  `(⌐■_■)`) plus `♪` (U+266A). Kept whole.

The last three were added so every category/tag's **representative** glyph renders
crisply instead of falling back; they're kept whole for the same OS/2-pruning reason
as the JP font.

## Coverage & safe glyphs

Kaomoji span ~40 Unicode scripts; these fonts cover every glyph the dataset's
representative faces use, but not every exotic codepoint (Canadian syllabics ᕦ,
Thai ๑, …). To avoid tofu, the OG route picks a **render-safe glyph per card** using
`src/data/ogGlyphCoverage.js` (the AUTO-GENERATED list of dataset codepoints these
fonts can render): it prefers the page's representative glyph, else the first item
whose every codepoint is covered, else the universal fallback `(・ω・)`.

## Regenerating (after adding fonts or dataset glyphs)

1. Rebuild the subsets from the full Noto fonts via `pyftsubset --unicodes=…`
   (compute the codepoint set from `src/data/raw.js` + category samples). Keep the
   whole fonts (JP, Kannada, Arabic, Math) **un-subset**.
2. Regenerate `src/data/ogGlyphCoverage.js`: union the fonts' `cmap`s
   (fontTools), intersect with the dataset codepoints, write the sorted list.
3. `npm run build`, then eyeball a few `/og/*.png` (a decorated card, a CJK card,
   and a known-exotic tag) for tofu.

## License

All fonts here are from the **Noto** project, © The Noto Project Authors, licensed
under the **SIL Open Font License 1.1** — see [`OFL.txt`](./OFL.txt). Bundling,
subsetting, and instancing are permitted; Noto declares no Reserved Font Name, so the
subset/instanced copies above keep their original names and remain under the OFL. The
OFL is independent of the project's AGPL-3.0 license (see the repo `LICENSE`): these
build-only font binaries stay under the OFL.
