// Presentation grouping for the 23 categories — the browse spine, split by KIND so the
// map reads clearly (Moods vs Things & actions vs formats), the way kaomoji.life groups
// "emotion / action / theme". This is presentation metadata only; the canonical taxonomy
// is still each glyph's single `category`. Any category not listed here is surfaced under
// a trailing "More" group by the helper, so the dataset can grow without silently dropping.

export const CATEGORY_GROUPS = [
  { id: "moods", label: "Moods", ids: ["happy", "sad", "angry", "surprised", "love", "tired", "cool", "scared", "embarrassed", "kawaii"] },
  { id: "things", label: "Things & actions", ids: ["greetings", "thinking", "animals", "actions", "magic", "music", "fighting", "please", "celebrate"] },
  { id: "symbols", label: "Symbols & emoji", ids: ["decorated", "dividers", "emoji", "symbols"] },
];

/**
 * Resolve the groups to actual category objects (in group order), appending any
 * categories that aren't assigned to a group under a final "More" group.
 * @param {Array<{id:string}>} categories
 * @returns {Array<{ id:string, label:string, categories:object[] }>}
 */
export function groupedCategories(categories) {
  const byId = new Map(categories.map((c) => [c.id, c]));
  const used = new Set();
  const groups = CATEGORY_GROUPS.map((g) => {
    const cats = g.ids.map((id) => byId.get(id)).filter(Boolean);
    cats.forEach((c) => used.add(c.id));
    return { id: g.id, label: g.label, categories: cats };
  });
  const leftover = categories.filter((c) => !used.has(c.id));
  if (leftover.length) groups.push({ id: "more", label: "More", categories: leftover });
  return groups;
}
