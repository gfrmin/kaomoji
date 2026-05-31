# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, installable **PWA kaomoji picker** (Japanese emoticons primarily; emoticons + emoji
secondary), built with **Astro** + a **SolidJS** interactive island. Goal: become the most
popular kaomoji picker in the world.

**Strategy (why the architecture is shaped this way):** the dominant incumbent (emojicombos.com)
ranks for everything purely via *page-surface-area* — every tag is a URL → huge long-tail SEO.
We out-compete with **curated, fast, prerendered pages per category and per tag**, plus a
best-in-class **installable offline PWA** (a retention moat incumbents lack) and **perfect Core
Web Vitals**. A client-rendered SPA is deliberately avoided: content must be in static HTML to
rank. Hence Astro (zero-JS content pages) with the picker as a small hydrated island.

## Commands

```bash
npm run dev        # local dev server (http://localhost:4321)
npm run build      # static build -> dist/  (also emits sitemap + service worker)
npm run preview    # serve the production build locally
node scripts/migrate.mjs   # regenerate src/data/{categories,raw}.js from the legacy source (also dedupes)
npx wrangler pages deploy  # deploy dist/ to Cloudflare Pages (see wrangler.toml)
```

No test runner is wired up. For ad-hoc interaction testing, `playwright-core` against the
system Chromium (`/usr/bin/chromium`) works against a running `npm run preview`.

## Architecture

### Data — single source of truth (`src/data/`)

- `categories.js`, `raw.js` — **AUTO-GENERATED** by `scripts/migrate.mjs`, which extracts the
  `CATEGORIES` object from the legacy `kaomoji-app.jsx` (the original single-file app, kept only
  as the migration source). Edit the `META` map in `migrate.mjs` (category ids/keywords/type),
  not the generated files. `migrate.mjs` also **dedupes glyphs within each category** (an exact
  repeat in one category is always a bug); the same glyph appearing in *different* categories is
  intentional (discoverable from each category page). A committed **`.githooks/pre-commit`** hook
  re-runs migrate and re-stages the generated files on every commit, so the dataset can never
  drift from its source. `npm install` auto-points `core.hooksPath` at `.githooks` (via the
  `prepare` script); on a fresh clone run `npm install` once to activate it.
- `overrides.js` — hand-curated per-glyph keyword tags for famous items (shrug, lenny,
  table-flip, bear, cat…). This is where high-value search terms are added.
- `categoryContent.js`, `tagContent.js` — hand-authored SEO copy keyed by category id / tag
  slug (`{ lead, body[], faqs[] }`, accessed via `getCategoryContent` / `getTagContent`). This
  is the **anti-thin-content payload**: unique prose + FAQs rendered on each category/tag page
  so it's genuinely distinct, not a templated clone. Not auto-generated — edit freely. Tags
  without a `tagContent` entry fall back to a plain lede (fine for long tail); deliberately **no
  generic templated fallback** (that would itself be thin content across pages).
- `index.js` — assembles everything: flat `items` (each gets `tags` = category keywords +
  overrides), the `tagIndex` (tag → items), and helpers. **This is the module both the Astro
  pages and the Solid island import.**

### The tag-page eligibility rule (important)

`pageTags` in `index.js` decides which tags get their own `/t/<slug>` page. A tag earns a page
**only if it is curated OR its items span 2+ categories** (`isPageTag`). Single-category keyword
tags are intentionally skipped because they would be **duplicate-content clones** of their
category page (every item in a category inherits that category's keywords). A `noPageTags` set
in `index.js` additionally excludes thin near-duplicates — single-glyph tags that just mirror a
kept head-term (e.g. the `shrug` synonyms `whatever`/`dunno`/`idk`… all render the same
`¯\_(ツ)_/¯`); these stay searchable in the picker but don't get a thin standalone page. Keep
both rules when adding tags; `relatedTags()` / `categoryTags()` filter to eligible pages so
internal links never 404.

### Pages — the SEO surface (`src/pages/`)

- `index.astro` — home: hero, the picker, category cloud, popular-tag cloud, `WebSite` +
  `WebApplication` JSON-LD with a `SearchAction` pointing at `/t/{query}`.
- `kaomoji/[category].astro` — one prerendered page per category (`getStaticPaths` over
  `categories`).
- `t/[tag].astro` — one prerendered page per eligible tag (`getStaticPaths` over `pageTags`).
  This is the long-tail SEO engine.
- `tags.astro` — HTML hub listing every tag page. `guide.astro` — a `/guide` head-term hub
  (what-is / kaomoji-vs-emoji / how-to-type, `Article` + `FAQPage`). `about.astro`, `privacy.astro`
  — about + privacy policy (`/privacy` doubles as the Google-Play-required policy URL).
- `og/[...route].ts` — build-time 1200×630 social card per page (`astro-og-canvas`), warm-theme
  palette. New static pages need an entry in its `pages` map to get a card.

Every page renders its items as **static crawlable HTML via the server-rendered island** (Astro
SSRs Solid islands at build time, then hydrates), plus real `<a>` internal links to related
tags/categories. `Layout.astro` provides the shell + `<ClientRouter/>` (View Transitions) +
SEO; `SEO.astro` emits title/description/canonical/OG/Twitter + JSON-LD.

### Picker island (`src/components/Picker.jsx`, SolidJS)

- Imports the dataset directly (one shared, cached JS chunk — not serialized per-page). Receives
  only a small `initial` prop (`{kind, id, label}`) telling it what view to show first.
- Fuzzy/keyword search via **Fuse.js** over `tags + category + value` → "shrug", "table flip"
  resolve (literal-glyph search can't). Favourites/recents in `localStorage` under **versioned
  keys** (`kaomoji-*-v2`), prepend-dedup, recents capped at 30. Click = copy (clipboard →
  `execCommand` fallback); right-click / long-press = ⭐ favourite.
- **Not** `transition:persist`ed — by design. Each page re-hydrates the picker with its own
  `initial` so the picker matches page context (favourites/recents still persist via
  localStorage). Don't add `transition:persist` without solving the context-mismatch it causes.

### Styling

Global CSS only (`src/styles/global.css`) with CSS custom properties — the warm **"Paper
Sticker Book"** theme (cream paper `--bg: #fdf6ea`, warm `--accent: #a85d1c`, brown ink).
Tokens are **WCAG-AA contrast-tuned — do not lighten them**. No CSS framework. The picker uses
classes (`.picker-*`), not inline styles.

### PWA + config

- `@vite-pwa/astro` (Workbox) generates the manifest + precaching service worker → installable +
  full offline browsing. Icons in `public/icons/` are rasterized from `public/favicon.svg` via
  `rsvg-convert` (see the commands used in git history if regenerating).
- **`src/consts.js` exports `SITE`** — the production origin. Change it before deploy; it drives
  canonical URLs, sitemap, OG absolute URLs, and manifest scope. Imported by both
  `astro.config.mjs` and the pages (kept separate from the config so node-only integration deps
  don't leak into the render graph).

## Deferred / roadmap (architected for, not yet built)

Emoji skin-tone variants + a kaomoji builder, dynamic (per-request) OG images, and the big one:
**real per-item tags** to massively expand the `/t/` page surface (currently limited to curated
+ cross-category tags to avoid thin/duplicate pages). *(Shipped already: the warm theme,
keyboard nav, per-page static OG cards, hand-authored category + tag copy.)*
