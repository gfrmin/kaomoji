# Cloudflare Pages Functions

## `e.js` — aggregate-only usage beacon (`POST /e`)

Receives the tiny `sendBeacon` payloads from `src/lib/analytics.js` (a copy or a
search) and records them in **Cloudflare Analytics Engine** for aggregate stats —
*which kaomoji are copied most*, *what people search for*.

**Privacy:** only `{event type, value}` is stored. No IP, no cookie, no account,
no session/user id — the data can be tallied but never linked to a person. This
matches the `/privacy` and `/about` copy.

### Activation (one-time, owner)
The function **no-ops (returns 204) until an Analytics Engine binding named
`EVENTS` is attached to the Pages project**, so it's safe to deploy now and turn
on later. To enable collection:

1. **Add the binding.** Cloudflare dashboard → Workers & Pages → **kaomoji** →
   Settings → **Functions** → *Analytics Engine bindings* → add
   **Variable name `EVENTS`**, **Dataset `kaomoji_events`** (Production).
   *(The dataset is created automatically on first write — no pre-provisioning.)*
   This is intentionally **not** put in `wrangler.toml`, to keep the
   `wrangler pages deploy` step in CI from depending on/breaking over it.
2. Redeploy (any push to `master`) so the function picks up the binding.
3. Verify: `curl -i https://kaomoji.fyi/e` → `204`; copy a kaomoji on the live
   site, then query the dataset:
   ```sql
   SELECT blob1 AS type, blob2 AS value, count() AS n
   FROM kaomoji_events
   WHERE timestamp > now() - INTERVAL '1' DAY
   GROUP BY type, value ORDER BY n DESC
   ```
   (Cloudflare dashboard → Analytics Engine → SQL API, or the GraphQL API.)

To **disable** the client beacon entirely, set `ANALYTICS_EVENTS = false` in
`src/consts.js`.
