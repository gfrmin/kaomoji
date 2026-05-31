# Cloudflare Pages Functions

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
