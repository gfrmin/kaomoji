import { OGImageRoute } from "astro-og-canvas";
import { categories, pageTags, getItemsByCategory } from "../../data/index.js";
import { getCategoryContent } from "../../data/categoryContent.js";
import { coveredCodepoints } from "../../data/ogGlyphCoverage.js";

// Kaomoji draw on ~40 Unicode scripts; the build-only card fonts (Noto Sans +
// JP + Symbols 2 + Kannada + Arabic + Math) cover every glyph the dataset's
// representative faces use, but not every exotic codepoint (Canadian syllabics
// ᕦ, Thai ๑, …). To avoid tofu on the cards we pick a render-SAFE glyph per
// page: prefer the page's representative glyph, else the first item whose every
// codepoint is covered, else a universal fallback. (See fonts/README.)
const COVERED = new Set(coveredCodepoints);
const FALLBACK_GLYPH = "(・ω・)";
const safe = (g: string | undefined) =>
  !!g && [...g].every((ch) => { const cp = ch.codePointAt(0); return cp <= 0x7f || COVERED.has(cp); });
const pickGlyph = (preferred: string | undefined, values: string[]) =>
  (safe(preferred) && preferred) || values.find(safe) || FALLBACK_GLYPH;

// One 1200×630 social card per page. Key = page path (minus slashes); the route
// emits /og/<key>.png, which SEO.astro references as og:image.
type Card = { glyph: string; name: string };
const pages: Record<string, Card> = {
  home: { glyph: "＼(＾▽＾)／  (=^･ω･^=)  ʕ•ᴥ•ʔ", name: "Copy & paste Japanese emoticons" },
  tags: { glyph: "✧･ﾟ #tags ･ﾟ✧", name: "All kaomoji tags" },
  about: { glyph: "¯\\_(ツ)_/¯", name: "About Kaomoji" },
  "404": { glyph: "(·_·)", name: "Page not found" },
};

for (const c of categories) {
  const glyph = pickGlyph(getCategoryContent(c.id)?.sample, getItemsByCategory(c.id).map((i) => i.value));
  const name =
    c.type === "emoji" ? `${c.name} Emoji`
      : c.type === "symbol" ? `${c.name} Symbols`
        : c.type === "decoration" ? "Text Dividers"
          : `${c.name} Kaomoji`;
  pages[`kaomoji/${c.id}`] = { glyph, name };
}

for (const t of pageTags) {
  const label = t.tag.charAt(0).toUpperCase() + t.tag.slice(1);
  const glyph = pickGlyph(t.items[0]?.value, t.items.map((i) => i.value));
  pages[`t/${t.slug}`] = { glyph, name: `${label} kaomoji` };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page: Card) => ({
    title: page.glyph,
    description: `${page.name}  ·  kaomoji.fyi`,
    bgGradient: [[20, 13, 48], [13, 11, 26]],
    border: { color: [167, 139, 250], width: 16, side: "inline-start" },
    padding: 80,
    font: {
      title: {
        color: [233, 230, 255],
        size: 80,
        lineHeight: 1.35,
        weight: "normal",
        families: ["Noto Sans", "Noto Sans JP", "Noto Sans Symbols 2", "Noto Sans Kannada", "Noto Sans Arabic", "Noto Sans Math"],
      },
      description: {
        color: [196, 181, 253],
        size: 38,
        weight: "normal",
        families: ["Noto Sans", "Noto Sans JP", "Noto Sans Symbols 2", "Noto Sans Kannada", "Noto Sans Arabic", "Noto Sans Math"],
      },
    },
    // Build-only fonts (not shipped to the browser). See fonts/README.md.
    // Noto Sans + Symbols 2 are codepoint-subset (tiny); Noto Sans JP is the FULL
    // static font — subsetting it drops math-symbol glyphs (≧≦…) under canvaskit's
    // fallback even when they remain in the cmap, so it's kept whole.
    fonts: [
      "./fonts/NotoSans-subset.ttf",
      "./fonts/NotoSansJP-Regular.ttf",
      "./fonts/NotoSansSymbols2-subset.ttf",
      "./fonts/NotoSansKannada-Regular.ttf",
      "./fonts/NotoSansArabic-Regular.ttf",
      "./fonts/NotoSansMath-Regular.ttf",
    ],
  }),
});
