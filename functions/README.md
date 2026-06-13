# Cloudflare Pages Functions

## `og/maker.js` + `maker/_middleware.js` — dynamic Kaomoji Maker OG card

Gives shared maker creations a per-creation social card so the link preview shows
the actual built kaomoji.

- **`og/maker.js`** (`GET /og/maker?k=<token>`) decodes the selection token (the
  same `decode`/`assemble` the maker uses), rasterises a 1200×630 PNG with
  `@resvg/resvg-wasm` (no satori — the card is one centred line) using the subset
  font bundle `og/_fonts.js`, and caches it immutably (the token is content-
  addressed). Any failure → 302 to the static `/og/maker.png`, so a link always
  has an image. The WASM is a **static import** (`import … from '…/index_bg.wasm'`)
  so it's a `WebAssembly.Module`, avoiding the "Wasm code generation disallowed"
  error on Pages.
- **`maker/_middleware.js`** rewrites the static `/maker/` page's OG/Twitter meta
  to point at `/og/maker?k=…` (and shows the face in the title) **only when** a
  `?k=` token is present; otherwise the page is served untouched with its build-
  time `/og/maker.png` card. Humans always get the real, pre-filling maker page.

### Regenerating the font bundle (`og/_fonts.js`)
`og/_fonts.js` holds base64 subset Noto fonts covering **exactly** the maker's
glyphs (~54 KB). It is **not** rebuilt in the pre-commit hook (it needs Python +
fonttools + system Noto fonts). Regenerate and commit it whenever the maker
galleries change:

```
npm run og-fonts        # = python3 scripts/build-og-fonts.py
```

## `e.js` — aggregate-only usage beacon (`POST /e`)

Receives the tiny `sendBeacon` payloads from `src/lib/analytics.js` (a copy or a
search) and records them in **Cloudflare Analytics Engine** for aggregate stats —
*which kaomoji are copied most*, *what people search for*.

**Privacy:** only `{event type, value}` is stored. No IP, no cookie, no account,
no session/user id — the data can be tallied but never linked to a person. This
matches the `/privacy` and `/about` copy.

### Activation (one-time, owner)
The function **no-ops (returns 204) until the `EVENTS` Analytics Engine binding
is wired**, so it's safe to deploy as-is. Two facts learned the hard way (both
verified):

- **A dashboard-set binding does NOT reach the deployed Function.** CI deploys
  via `wrangler pages deploy`, which takes bindings from `wrangler.toml`, not the
  Pages project settings. So the binding must live in `wrangler.toml`.
- **Analytics Engine must be enabled on the account first**, or `wrangler pages
  deploy` *fails* (`"You need to enable Analytics Engine"`) — which would break
  the production deploy. So enable AE before adding the binding.

### Activation
1. **Enable Analytics Engine** (one-time, dashboard — no public API to do this):
   Cloudflare dashboard → Workers & Pages → **Analytics Engine** → enable. Direct
   link: `https://dash.cloudflare.com/<account-id>/workers/analytics-engine`.
2. **Add the binding to `wrangler.toml`** (not the dashboard):
   ```toml
   [[analytics_engine_datasets]]
   binding = "EVENTS"
   dataset = "kaomoji_events"
   ```
   (The dataset is created automatically on first write — no pre-provisioning.)
3. Push to `master` → deploy.
4. **Verify wiring:** `curl https://kaomoji.fyi/e?health=1` → `{"events":true}`.
   Then copy a kaomoji on the live site and query the dataset (a few-minute
   ingestion delay), e.g. in the dashboard SQL console:
   ```sql
   SELECT blob1 AS type, blob2 AS value, count() AS n
   FROM kaomoji_events
   WHERE timestamp > now() - INTERVAL '1' DAY
   GROUP BY type, value ORDER BY n DESC
   ```

`/e?health=1` reports only whether the binding is wired (a boolean — no data).
To **disable** the client beacon entirely, set `ANALYTICS_EVENTS = false` in
`src/consts.js`.
