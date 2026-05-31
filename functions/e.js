// Cloudflare Pages Function: the aggregate-only usage beacon sink (POST /e).
//
// Writes ONE isolated datapoint per event to an Analytics Engine dataset, IF the
// `EVENTS` binding is configured on the Pages project. Stored fields are only the
// event type ("copy" | "search") and its value (the glyph or search term) — there
// is deliberately NO IP, NO cookie, NO account and NO session/user id, so the data
// can be aggregated ("which kaomoji are copied most", "common searches") but can
// never be tied to a person or answer "who copied what".
//
// Degrades safely: if the binding isn't set (or AE is unavailable), it just
// returns 204 and collects nothing — so this is safe to deploy before the binding
// exists. To activate, add an Analytics Engine binding named `EVENTS` to the
// kaomoji Pages project (see functions/README.md).

const TYPES = new Set(["copy", "search"]);

export const onRequestPost = async ({ request, env }) => {
  const ds = env && env.EVENTS; // Analytics Engine binding (optional)
  if (!ds) return new Response(null, { status: 204 });
  try {
    const body = await request.json();
    const t = body && body.t;
    if (!TYPES.has(t)) return new Response(null, { status: 204 });
    const raw = t === "copy" ? body.v : body.q;
    const value = String(raw == null ? "" : raw).slice(0, 96);
    if (!value) return new Response(null, { status: 204 });
    ds.writeDataPoint({
      blobs: [t, value], // [event type, glyph/term]
      indexes: [t], // index by type only — never anything identifying
    });
  } catch {
    /* malformed body etc. — never error the beacon */
  }
  return new Response(null, { status: 204 });
};

// Cheap health check; also avoids 405s from crawlers/preflights.
// `/e?health=1` reports only whether the Analytics Engine binding is wired
// (a boolean — no data), so collection can be verified without read access.
export const onRequestGet = ({ request, env }) => {
  if (new URL(request.url).searchParams.get("health") === "1") {
    return Response.json({ events: !!(env && env.EVENTS) });
  }
  return new Response(null, { status: 204 });
};
