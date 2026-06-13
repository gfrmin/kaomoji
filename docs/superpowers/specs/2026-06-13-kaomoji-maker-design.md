# Kaomoji Maker + app-wide sharing — design

## Context

The north-star for kaomoji.fyi is a **custom on-demand kaomoji generator** — let users
build a kaomoji "that's theirs" — as a retention moat and a future paid product.
Phase 1 (PR #21) shipped the foundation: a slot-based parts taxonomy
(`src/data/parts.js`: `decomposition`, `partsInventory`, `partsPairs`, `coverage`),
reverse-engineered from the corpus with 96.7% clean parse coverage.

This spec is **phase 2: the interactive Maker** — the first user-facing surface built on
that taxonomy — plus an **app-wide sharing layer** to drive organic distribution.

### Research grounding (corpus + external)

The corpus decomposition and the external literature/competitors agree on one structural
model, which this design adopts verbatim:

```
decorL · armL · [ bracketL · cheekL · eyeL · mouth · eyeR · cheekR · bracketR ] · armR · decorR
```

Key findings that shaped decisions:

- **Eyes are the primary mood carrier; mouth modulates intensity.** Guides repeatedly note
  "change only the eyes and the whole mood transforms." → galleries order **Eyes first**.
- **Parts pair; they don't free-combine.** The corpus has 315 distinct eye glyphs but only
  **221 observed L/R pairs**, of which only 67 are identical mirrors — the other 154 are
  *directional* (`´`…`` ` ``, `≧`…`≦`, `˃`…`˂`) where left ≠ right and must stay matched.
  Incumbent generators expose flat per-slot lists with **no validity guarantee** (you can
  pick mismatched eyes and get a broken face). Our `partsPairs` **valid-by-construction**
  generation is therefore a genuine quality differentiator — *"every face you make actually
  looks right."* This is the headline.
- **The raw inventory is noisy.** The 315 "eyes" / 135 "decorations" include parser residue:
  composite tokens (`o^`, `●´`, `⌐■`), combining-mark soup (`•̥̥̥`), concatenated multi-glyph
  decor (`*:･ﾟ✧`). The Maker must draw from a **curated, frequency-thresholded subset**, not
  the raw inventory.
- **Sharing is table-stakes + a virality lever.** The leading competitor (kaomojis.jp)
  offers share-via-URL; we extend sharing **app-wide**, and — the single biggest multiplier —
  give shared creations a **dynamic per-creation social card** so the link preview shows the
  actual custom face.
- **AI generation is the paid tier, not v1.** Some competitors generate holistically via an
  LLM. We deliberately ship a deterministic, offline, instant, free parts-builder now; AI-
  generated novel/personalized kaomoji is the deferred premium tier.

### Decisions locked with the user

- Interaction: **builder + 🎲 randomize** (both).
- Validity: **valid by construction** (assemble from observed pairs).
- URL / name: **`/maker`**, "Kaomoji Maker".
- Entry points: **home hero CTA + header/footer nav + category/tag page links** (all).
- Shared-link preview: **dynamic OG image per creation** — delivered in **phase 2** (phase 1
  ships a static maker card the dynamic one gracefully degrades to).
- Sharing scope: `share.js` + maker viral loop + picker share + tag/category page share buttons.
- **Phased into two shipments** (lower risk, wins along the way): **phase 1** = the complete
  functional maker + all app-wide sharing + static OG card (one PR, fully shippable on its
  own); **phase 2** = the dynamic per-creation OG card (the two Pages Functions). Phase 1 has
  zero dependency on phase 2, and the maker viral loop (shareable pre-filling `/maker?…` links)
  works fully in phase 1 — phase 2 only upgrades what the shared link *previews*.

## Architecture overview

Seven units, each with one purpose and a well-defined interface:

| Unit | Kind | Phase | Purpose |
|---|---|---|---|
| `src/lib/generator.js` | pure module | 1 | The engine: curated galleries, `assemble`, `randomKaomoji`, `encode`/`decode` selection. No DOM. |
| `src/lib/store.js` | small module | 1 | Shared clipboard + localStorage favourites/recents, extracted from `Picker.jsx`. |
| `src/lib/share.js` | small module | 1 | `shareKaomoji()` — Web Share API with copy-link fallback + toast. |
| `src/components/Builder.jsx` | Solid island | 1 | The Maker UI: live preview, Copy/⭐/🎲/Share, per-slot galleries. |
| `src/pages/maker.astro` | Astro page | 1 | Prerendered `/maker` shell: hosts Builder + hand-authored SEO copy + JSON-LD. |
| `functions/og/maker.js` | Pages Function | 2 | Renders the assembled kaomoji into a 1200×630 PNG (satori + resvg-wasm + subset font). |
| `functions/maker/index.js` | Pages Function | 2 | Injects per-creation OG meta into the static maker HTML when a `selection` param is present (HTMLRewriter); else passes the asset through. |

Plus wiring edits: `Picker.jsx` (adopt `store.js`, add Share), `Layout.astro` (nav + footer),
`index.astro` (hero CTA), `kaomoji/[category].astro` + `t/[tag].astro` (contextual link),
`og/[...route].ts` (static `maker` fallback card), category/tag pages (Share button),
`src/styles/global.css` (`.maker-*` / `.builder-*` classes).

## Unit designs

### 1. `src/lib/generator.js` — the pure engine

The testable core. No DOM, no Solid; importable by the island, the Pages Functions, and
ad-hoc Node tests alike. Imports `partsInventory` + `partsPairs` from `src/data/parts.js`.

**Slot order (canonical):**
```js
export const SLOT_ORDER = ["decorL","armL","bracketL","cheekL","eyeL","mouth","eyeR","cheekR","bracketR","armR","decorR"];
```

**Curated galleries.** A `curate()` pass turns the noisy raw inventory into clean,
user-facing options, applied once at module load:

- **Cleanliness filter** — drop options that are not a single sensible grapheme (reject
  multi-codepoint composites except a small curated allowlist of legitimately multi-glyph
  parts like `‿‿`), drop combining-mark-only tokens, drop anything with a frequency below a
  per-slot threshold.
- **Pair-based slots** (eye, arm, decoration) draw from `partsPairs[slot]` filtered to clean
  pairs with `count ≥ threshold`, freq-sorted, capped to a top-N (the rest behind a "more"
  reveal). Each gallery entry is `{ left, right, count, identical }`.
- **Single slots** (bracket, cheek, mouth) draw from `partsInventory[slot]` (bracket pairs
  come from `partsPairs.bracket`, all 8 are clean), freq-sorted, capped.
- A small **hand-curated allowlist/blocklist** (`generatorOverrides` constant in this file or
  a tiny adjacent data file) guarantees the marquee parts are present and obvious junk is gone.
  Each slot also offers an explicit **"none"** option where optional (decor, arm, cheek, bracket).

Exported gallery shape:
```js
export const galleries = {
  eye:    [{ left, right, identical, count }, ...],   // ordered: Eyes surfaced first in UI
  mouth:  [{ glyph, count, mood }, ...],               // mood tag: happy|sad|angry|surprised|love|neutral|animal|cute
  bracket:[{ left, right }, ...],                      // incl. a "none" entry
  arm:    [{ left, right, identical }, ...],           // incl. "none"
  cheek:  [{ glyph }, ...],                            // incl. "none"
  decoration: [{ left, right, identical }, ...],       // incl. "none"
};
```

The **mouth `mood` tag** is a small hand-authored map (mouth glyph → emotion) so 🎲 and any
future "happy maker" can bias by feeling, and so the page can group mouths by mood. This is
the only semantic layer added on top of phase-1 data.

**`assemble(selection)`** — pure string builder. `selection` is
`{ bracket, eye, mouth, arm, cheek, decoration }` where each is the chosen gallery entry (or
null for optional slots). Expands pairs into their L/R slots, places `mouth` in the center,
joins present slots in `SLOT_ORDER`. Always produces a balanced, symmetric, single-mouth face
— **valid by construction**.

**`randomKaomoji(rng = Math.random)`** → `{ selection, value }`. Frequency-weighted draw:
always a bracket pair + eye pair + mouth; optional arm/cheek/decoration each included with a
tunable probability (`P_ARM`, `P_CHEEK`, `P_DECOR` constants). `rng` is injectable so tests
are deterministic. Optionally accepts a `mood` to bias the mouth (deferred wiring; engine
supports it).

**`encode(selection)` / `decode(str)`** — compact, URL-safe, self-describing serialization
for share links. Encodes the actual slot **glyphs** (not gallery indices, so links survive
gallery reordering) into one short param. `decode` re-validates against the galleries and
falls back gracefully (unknown glyph → nearest clean option or omitted) so a malformed/old
link never throws. Both pure; used by the Builder, `share.js`, and both Pages Functions.

### 2. `src/lib/store.js` — shared clipboard + persistence

Extract the existing machinery from `Picker.jsx` (behaviour-identical) into one module both
the Picker and the Builder consume:

- Versioned keys `kaomoji-favourites-v2`, `kaomoji-recent-v2`; `RECENT_CAP = 30`.
- `readLS(key)`, `writeLS(key, val)` (SSR/quota-safe — no-ops without `localStorage`).
- `copyText(value)` — `navigator.clipboard.writeText` with `execCommand` fallback.
- `recordCopy(value)`, `favourites()`, `toggleFavourite(value)` — prepend-dedup helpers.
- Continues to call `src/lib/analytics.js`'s `trackCopy` on copy (unchanged behaviour).

`Picker.jsx` is refactored to import these instead of its private copies — a mechanical,
no-behaviour-change edit. A generated face you copy lands in recents and can be ⭐'d, unified
with the rest of the app.

### 3. `src/lib/share.js` — the sharing primitive

```js
shareKaomoji({ text, url, title }) // → Promise<"shared"|"copied"|"dismissed">
```

- Tries `navigator.share({ text, url, title })` when available (the native sheet — the real
  viral surface on mobile/Discord/IG).
- Falls back to `copyText(`${text} ${url}`)` + a small toast ("Link copied!").
- `navigator.share` rejection with `AbortError` (user dismissed) is swallowed, not surfaced as
  an error. Never throws to the caller.

### 4. `src/components/Builder.jsx` — the Maker island

SolidJS island, hydrated, styled with the warm "Paper Sticker Book" tokens (reuses the
existing chip/`.a-cell` aesthetic; new `.builder-*` classes).

- **Live preview** — big, with the hand-placed tilt aesthetic; updates on every slot change.
- **Actions** — **Copy** (via `store.copyText` + `recordCopy`), **⭐ Favourite** (via
  `store.toggleFavourite`), **🎲 Surprise me** (fills all slots from `randomKaomoji`),
  **Share** (via `share.shareKaomoji` with the canonical `/maker?<encoded>` URL + glyph text).
- **Galleries** — one horizontal, scrollable row per slot, ordered **Eyes → Mouth → Brackets →
  Arms → Cheeks → Decorations** (research: eyes lead). Tapping a chip sets that slot and re-
  renders. Optional slots show a "none" chip. A "more" toggle reveals the long tail beyond
  the capped top-N. Mouths are grouped/labelled by `mood`.
- **State** — a single `selection` signal; preview = `assemble(selection)`. On mount, reads
  the URL param via `decode()` to pre-fill (the share/deep-link path), else seeds with a
  pleasant default (e.g. `(◕‿◕)`). On change, updates the URL param via `history.replaceState`
  (no navigation) so the address bar is always shareable.
- **NOT `transition:persist`ed** — consistent with the Picker's documented stance.

### 5. `src/pages/maker.astro` — the prerendered page

- `Layout` shell + the `Builder` island (`client:load` — it's the page's whole point).
- **Hand-authored unique copy** (anti-thin-content): a lead targeting *"kaomoji maker / make
  your own kaomoji / kaomoji generator"*, a short "how it works" (pick eyes → mouth → frame →
  flourishes; every combo is valid), and 4–6 FAQs.
- **JSON-LD**: `WebApplication` + `HowTo` (the build steps) + `FAQPage`, via the existing SEO
  patterns (`SEO.astro`, mirrors `guide.astro`).
- **Static OG fallback card**: add a `maker` entry to `og/[...route].ts`'s `pages` map so the
  bare `/maker/` page (no selection) has a normal build-time card.
- Title: "Kaomoji Maker — Make Your Own Kaomoji". Canonical `/maker/`.

### 6. `functions/maker/index.js` — per-creation OG meta injection

Matches the `/maker/` route (Pages Functions shadow the static asset for matching paths).

- `onRequestGet`: fetch the static asset via `env.ASSETS.fetch(request)`.
- If the request has **no** selection param → return the asset **unchanged** (no-op on the hot
  path; bare maker page keeps its static card).
- If a selection param **is** present → decode it, `assemble` the value, and use Cloudflare's
  **`HTMLRewriter`** to overwrite the `<head>` meta: `og:image` → `/og/maker?<encoded>`,
  `og:title` / `og:description` / `twitter:*` → the actual kaomoji + a share-y caption. Return
  the rewritten HTML. Humans still get the real, pre-filling maker page (same URL); crawlers
  get the custom card.
- Wrapped so any failure falls back to serving the unmodified asset (never 500 a page view).

Decode/assemble/encode are imported from a **runtime-safe copy of the engine logic**. Since
Pages Functions bundle independently of the Astro build, `generator.js` must be written as a
plain ESM module with no Astro/Solid imports (it already is) so both can import it; the data
it needs (`parts.js`) is likewise plain ESM. (Verify the function bundle can import from
`src/` — if the Pages build can't reach `src/`, factor the pure engine to a location both
reach, e.g. keep it in `src/lib/` and import via relative path, or duplicate the tiny
encode/decode/assemble into the function. Resolve during implementation; prefer a single
shared module.)

### 7. `functions/og/maker.js` — dynamic social card

`onRequestGet` at `/og/maker?<encoded>`:

- Decode → `assemble` the kaomoji value.
- Render a 1200×630 PNG with **satori** (kaomoji + "kaomoji.fyi" wordmark on the warm
  gradient, matching the static cards' palette: bg `#fff8ec`→`#f9eedd`, accent border
  `#a85d1c`, ink `#4a4036`) → SVG, then **`@resvg/resvg-wasm`** → PNG.
- **Font:** bundle a **tightly-subset Noto font** covering exactly the codepoints the Maker
  can emit (computed from the curated galleries — a bounded, known set), keeping the Worker
  bundle within budget. A build step (npm script, e.g. `scripts/build-og-font.mjs`) generates
  the subset from the galleries so it can't drift.
- `Cache-Control: public, max-age=31536000, immutable` (selection-keyed URL is content-
  addressed) + edge cache via the Cache API.
- Degrades safely: on any render/font error, redirect to the static `/og/maker.png` fallback
  card so a shared link always has *some* valid image.

**Risk / budget note:** satori + resvg-wasm + subset font must fit the Pages Functions/Worker
bundle size limit. The subset font is the mitigation. If the bundle is still too large, the
fallback is to render server-side at deploy time for the *bare* card and accept the static
card for shares in v1 — but the bounded codepoint set makes the subset approach the expected
outcome. Validate bundle size early in implementation.

## App-wide sharing rollout

1. **Maker** — full viral loop (above): canonical shareable URL, Share button, dynamic card.
2. **Picker** (`Picker.jsx`) — a Share affordance next to Copy/⭐ on each kaomoji, calling
   `share.shareKaomoji({ text: glyph, url: SITE })`. The viral unit is the glyph + attribution
   back to the site; **no new thin per-glyph pages**.
3. **Category & tag pages** — a small Share button (shares the page's canonical URL; the pages
   already have build-time OG cards). Lives in the page template, uses `share.js` via a tiny
   inline island or a progressively-enhanced `<button>`.

## Data flow

```
parts.js ──┐
           ├─ generator.js (curate → galleries, assemble, random, encode/decode)
overrides ─┘        │
                    ├──> Builder.jsx ──(selection)──> assemble ──> preview
                    │         │
                    │         ├── store.js  (copy / favourite / recents)
                    │         ├── share.js  (native share / copy link)
                    │         └── history.replaceState(/maker?<encode(selection)>)
                    │
   share link  /maker?<sel> ──> functions/maker/index.js
                                   ├─ humans: static asset (Builder decodes sel, pre-fills)
                                   └─ crawlers: HTMLRewriter injects og:image=/og/maker?<sel>
                                                          │
                                                          └─> functions/og/maker.js
                                                                 decode → assemble → satori → resvg → PNG
```

## Testing

No test runner is wired (project convention). Use:

- **Engine assertions (Node)** — a `scripts/`-style check or inline `node -e`:
  `assemble` round-trips a known selection; `encode`∘`decode` is identity on valid selections
  and never throws on garbage; `randomKaomoji(seededRng)` is deterministic and *always* yields
  balanced brackets + exactly one mouth + matched eye pair; every gallery option is non-empty
  and clean (passes the cleanliness filter).
- **Playwright-core smoke** (system Chromium against `npm run preview`): load `/maker`, click
  🎲, Copy, assert clipboard + a recents entry; change a slot, assert the URL param updates;
  load a `/maker?<sel>` deep link, assert the builder pre-fills to that face.
- **OG function** — local `wrangler pages dev`: hit `/og/maker?<sel>`, assert `image/png` and
  non-trivial body; hit `/maker?<sel>`, assert injected `og:image` points at the dynamic card;
  hit bare `/maker/`, assert the static card and no rewrite.

## Out of scope (deferred)

- **AI-generated kaomoji** / any paid-product surface (the premium tier).
- A separate **Nose** slot (folded into mouth for v1).
- A **parts-explorer SEO page** (per-part long-tail pages).
- A **mirror-map** to mirror *novel* (non-corpus) parts (`≧`→`≦`, `d`→`b`); v1 only recombines
  observed pairs, so it isn't needed yet.
- Saving named creations / a personal gallery beyond favourites.
- Feeding generated faces back into the dataset/`/t/` pages.

## Build sequence (for the plan)

### Phase 1 — Maker + app-wide sharing + static card (one PR, fully shippable)

1. `generator.js` (engine + curate + encode/decode) + Node assertions — the foundation.
2. `store.js` extraction + `Picker.jsx` refactor (no behaviour change) — verify picker intact.
3. `share.js` + Picker Share button.
4. `Builder.jsx` + `maker.astro` + `global.css` + **static** OG card (entry in `og/[...route].ts`)
   + nav/hero/category+tag page links.
5. Category/tag page Share buttons.
6. Smoke tests (engine assertions + Playwright: 🎲/copy/recents, slot→URL, deep-link pre-fill).

At the end of phase 1 the maker is fully usable and every surface is shareable; shared
`/maker?…` links preview the single static maker card.

### Phase 2 — Dynamic per-creation OG card (fast-follow PR)

7. `functions/og/maker.js` (satori + resvg-wasm) + `scripts/build-og-font.mjs` subset step;
   **validate Worker bundle size early** (the chief risk).
8. `functions/maker/index.js` (HTMLRewriter injects `og:image=/og/maker?<sel>` when a selection
   param is present; no-op + static card otherwise).
9. Local `wrangler pages dev` verification of both functions; confirm graceful degrade to the
   static card on any render/font failure.
