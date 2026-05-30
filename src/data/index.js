// Single source of truth for the kaomoji dataset.
// Assembles normalized, tagged items from the migrated raw data + curated
// overrides, and derives the tag index that powers search and the tag pages.
import { categories } from "./categories.js";
import { raw } from "./raw.js";
import { tagOverrides } from "./overrides.js";

export { categories };

const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));
export const getCategory = (id) => categoryById[id];

// Slugify a tag/keyword into a URL-safe segment (used for /t/[tag]).
export const slugifyTag = (tag) =>
  tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Build the flat, tagged item list. Each item inherits its category keywords
// and merges any curated per-glyph overrides. Tags are de-duplicated.
let _idSeq = 0;
export const items = categories.flatMap((cat) =>
  (raw[cat.id] || []).map((value) => {
    const tags = [...new Set([...cat.keywords, ...(tagOverrides[value] || [])])];
    return {
      id: ++_idSeq,
      value,
      type: cat.type,
      category: cat.id,
      categoryName: cat.name,
      tags,
    };
  })
);

// Slugs of curated (famous) tags — always worth their own page even if rare.
const curatedTagSlugs = new Set(
  Object.values(tagOverrides).flat().map(slugifyTag).filter(Boolean)
);

// tag (slug) -> { tag, slug, items[], categories:Set }. Drives /t/[tag] pages.
const _tagMap = new Map();
for (const item of items) {
  for (const tag of item.tags) {
    const slug = slugifyTag(tag);
    if (!slug) continue;
    if (!_tagMap.has(slug)) _tagMap.set(slug, { tag, slug, items: [], categories: new Set() });
    const entry = _tagMap.get(slug);
    entry.items.push(item);
    entry.categories.add(item.category);
  }
}
export const tagIndex = _tagMap;

export const tags = [..._tagMap.values()].sort((a, b) => b.items.length - a.items.length);

// A tag earns its own page only when it's DISTINCT from a category page:
// either a curated/famous tag, or one whose items span 2+ categories
// (genuinely cross-cutting). Single-category keyword tags are skipped to avoid
// duplicate-content clones of their category page.
const isPageTag = (t) =>
  curatedTagSlugs.has(t.slug) || t.categories.size >= 2;

// Eligible tag pages, biggest first. Used by /t/[tag] and the home tag cloud.
export const pageTags = tags.filter(isPageTag);
const _pageTagSlugs = new Set(pageTags.map((t) => t.slug));

export const getItemsByCategory = (id) => items.filter((i) => i.category === id);
export const getTag = (slug) => _tagMap.get(slug);

// Related tags for a given tag: other tags that co-occur on its items, by frequency.
export const relatedTags = (slug, limit = 12) => {
  const entry = _tagMap.get(slug);
  if (!entry) return [];
  const counts = new Map();
  for (const item of entry.items) {
    for (const t of item.tags) {
      const s = slugifyTag(t);
      if (!s || s === slug) continue;
      counts.set(s, (counts.get(s) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => _tagMap.get(s))
    .filter((t) => t && _pageTagSlugs.has(t.slug)) // only link to tags that have a page
    .slice(0, limit);
};

// Tags worth linking from a category page: tags that appear on this category's
// items AND earn their own page (curated or cross-category). Sorted by how many
// of the tag's items live in this category, so the most on-topic links surface
// first. Filtered to _pageTagSlugs so links never 404.
export const categoryTags = (categoryId, limit = 12) => {
  const counts = new Map();
  for (const item of items) {
    if (item.category !== categoryId) continue;
    for (const t of item.tags) {
      const s = slugifyTag(t);
      if (!s || !_pageTagSlugs.has(s)) continue;
      counts.set(s, (counts.get(s) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => _tagMap.get(s))
    .filter(Boolean)
    .slice(0, limit);
};

// Compact dataset shipped to the client for fuzzy search (no derived bloat).
export const searchDataset = items.map((i) => ({
  v: i.value,
  c: i.categoryName,
  t: i.tags,
}));
