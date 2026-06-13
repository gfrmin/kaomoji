// Cloudflare Pages middleware for /maker. When a ?k= selection token is present
// (a shared creation), rewrite the page's OG/Twitter meta so the link preview
// shows that exact kaomoji (via the dynamic /og/maker card). No token → serve the
// static page untouched, keeping its build-time /og/maker.png card. Humans always
// get the real, pre-filling maker page either way; only crawlers read the meta.
import { decode, assemble } from "../../src/lib/generator.js";

export const onRequest = async ({ request, next }) => {
  const res = await next(); // the static /maker/ asset (or downstream function)
  const url = new URL(request.url);
  const k = url.searchParams.get("k");
  if (!k || !/text\/html/i.test(res.headers.get("content-type") || "")) return res;

  let face = "";
  try { face = assemble(decode(k)); } catch { return res; }
  if (!face) return res;

  const img = `${url.origin}/og/maker?k=${encodeURIComponent(k)}`;
  const title = `${face} — made with the Kaomoji Maker`;
  const desc = `Make your own kaomoji like ${face} — free, no sign-up, works everywhere.`;
  const set = (content) => ({ element: (el) => el.setAttribute("content", content) });

  return new HTMLRewriter()
    .on('meta[property="og:image"]', set(img))
    .on('meta[name="twitter:image"]', set(img))
    .on('meta[property="og:title"]', set(title))
    .on('meta[name="twitter:title"]', set(title))
    .on('meta[property="og:description"]', set(desc))
    .on('meta[name="twitter:description"]', set(desc))
    .transform(res);
};
