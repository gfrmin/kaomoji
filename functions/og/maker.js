// Cloudflare Pages Function: dynamic per-creation OG card for the Kaomoji Maker.
// GET /og/maker?k=<selection-token> → a 1200×630 PNG of the assembled kaomoji.
//
// Renders a hand-built SVG (no satori needed — the card is one centred line) and
// rasterises it with @resvg/resvg-wasm, using the tiny subset font bundle that
// covers exactly the maker's glyphs (functions/og/_fonts.js). On any failure it
// redirects to the static /og/maker.png card so a shared link always has an image.
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm";
import { decode, assemble } from "../../src/lib/generator.js";
import { fontsB64 } from "./_fonts.js";

// Init the WASM module once per isolate. Pages bundles the .wasm as a
// WebAssembly.Module (static import), so initWasm gets a Module, not bytes —
// avoiding the "Wasm code generation disallowed" trap.
let wasmReady;
const ensureWasm = () => (wasmReady ??= initWasm(resvgWasm));

// Decode base64 fonts once.
const fontBuffers = fontsB64.map((b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));

const xmlEscape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const card = (face) => {
  // Scale the glyph down for longer faces so arms/decor stay on the card.
  const len = [...face].length;
  const size = Math.max(40, Math.min(132, Math.floor(1180 / Math.max(len, 5))));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fff8ec"/>
  <rect x="0" y="0" width="16" height="630" fill="#a85d1c"/>
  <text x="608" y="312" font-size="${size}" text-anchor="middle" dominant-baseline="middle" fill="#4a4036">${xmlEscape(face)}</text>
  <text x="608" y="560" font-size="34" text-anchor="middle" fill="#736655">kaomoji.fyi · make your own</text>
</svg>`;
};

export const onRequestGet = async ({ request }) => {
  const origin = new URL(request.url).origin;
  try {
    const k = new URL(request.url).searchParams.get("k") || "";
    const face = assemble(decode(k));
    if (!face) throw new Error("empty face");

    await ensureWasm();
    const resvg = new Resvg(card(face), {
      background: "#fff8ec",
      fitTo: { mode: "width", value: 1200 },
      font: { fontBuffers, loadSystemFonts: false },
    });
    const png = resvg.render().asPng();
    return new Response(png, {
      headers: {
        "content-type": "image/png",
        // Content-addressed by the token → cache hard at the edge and in clients.
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // Always hand back a valid image.
    return Response.redirect(`${origin}/og/maker.png`, 302);
  }
};
