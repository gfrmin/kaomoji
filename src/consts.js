// Production origin. Change this to the real domain before deploy — it drives
// canonical URLs, sitemap, Open Graph absolute URLs, and the manifest scope.
export const SITE = "https://kaomoji.fyi";

// Aggregate-only usage events (which kaomoji are copied / what's searched).
// Privacy-preserving by design: no cookies, no identifiers, no IP, no per-person
// linkage — see src/lib/analytics.js + functions/e.js. Flip to `false` to fully
// disable the client beacon. (The server endpoint also no-ops with no binding.)
export const ANALYTICS_EVENTS = true;
