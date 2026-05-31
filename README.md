# Kaomoji 顔文字 — [kaomoji.fyi](https://kaomoji.fyi)

A fast, installable **PWA kaomoji picker**: copy & paste Japanese emoticons, text faces,
emoji and symbols. Search by feeling (`shrug`, `table flip`, `bear`), tap to copy, favourite
with a right-click, and install it to browse fully offline.

It's built as static, prerendered pages (one per category and per high-value tag) so the
content ranks in search, with the interactive picker hydrated as a small island — best-in-class
Core Web Vitals and a real offline retention moat.

## Tech

[Astro](https://astro.build) (zero-JS content pages) + a [SolidJS](https://solidjs.com) picker
island, [Fuse.js](https://fusejs.io) fuzzy search, `@vite-pwa/astro` (Workbox) for the installable
offline service worker, and build-time per-page Open Graph cards via `astro-og-canvas`. Deployed
to Cloudflare Pages. No CSS framework — global CSS with custom properties (a warm
"paper sticker book" theme set in Fredoka + Nunito, with kaomoji glyphs in Noto Sans JP).

## Commands

```bash
npm install        # also activates the .githooks pre-commit (regenerates the dataset)
npm run dev        # local dev server (http://localhost:4321)
npm run build      # static build -> dist/  (emits sitemap + service worker + OG cards)
npm run preview    # serve the production build locally
node scripts/migrate.mjs   # regenerate src/data/{categories,raw}.js from the legacy source
```

## Layout

- `src/data/` — the single source of truth. `categories.js`/`raw.js` are **auto-generated** by
  `scripts/migrate.mjs`; edit its `META` map (or `overrides.js` for per-glyph keywords), not the
  generated files. `index.js` assembles the flat items + tag index that both the pages and the
  picker import. `categoryContent.js`/`tagContent.js` hold the hand-authored per-page SEO copy
  (unique lead + prose + FAQs) that keeps each page from being a thin clone.
- `src/pages/` — the SEO surface: `kaomoji/[category].astro` and `t/[tag].astro` prerender one
  page each over the dataset, plus a `/guide` head-term hub, the `/tags` index, and `/about` +
  `/privacy`.
- `src/components/Picker.jsx` — the SolidJS picker island (search, the sticker grid, and the
  "your little book" recents/favourites hero on the home page).
- `public/fonts/` — self-hosted **woff2 subsets** shipped to the browser (Fredoka, Nunito, and a
  Noto Sans JP glyph subset).
- `fonts/` — separate **build-only** fonts for the OG cards (not shipped to visitors).

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture and the reasoning behind it.

## Licensing

- **Code & content curation:** [GNU AGPL-3.0](./LICENSE).
- **Shipped web fonts under `public/fonts/`:** Fredoka, Nunito and Noto Sans JP subsets, ©
  their respective authors, under the [SIL Open Font License 1.1](https://openfontlicense.org)
  (see [`public/fonts/NOTICE.txt`](./public/fonts/NOTICE.txt)).
- **Build-only fonts under `fonts/`:** the Noto family, © The Noto Project Authors, under the
  [SIL Open Font License 1.1](./fonts/OFL.txt) — used to render the social-share images, never
  shipped to the browser.

---

Just another project by [Guy Freeman](https://gfrm.in).
