// One-off migration: extract the CATEGORIES object from the legacy
// kaomoji-app.jsx and emit normalized, tagged data files.
// Run: node scripts/migrate.mjs
import fs from "node:fs";

const src = fs.readFileSync("kaomoji-app.jsx", "utf8");
const START = "const CATEGORIES = ";
const start = src.indexOf(START);
const end = src.indexOf("const STORAGE_KEY_FAVS");
if (start < 0 || end < 0) throw new Error("Could not locate CATEGORIES block");
let body = src.slice(start + START.length, end).trim().replace(/;$/, "");
// Pure data literal -> evaluate to an object.
const CATEGORIES = eval("(" + body + ")");

// Category metadata: id (URL slug), type, and SEO/search keywords (base tags).
// Keyed by the legacy category label.
const META = {
  "😊 Happy":       { id: "happy",       type: "kaomoji", keywords: ["happy", "joy", "smile", "glad", "cheerful", "excited", "yay"] },
  "😢 Sad":         { id: "sad",         type: "kaomoji", keywords: ["sad", "cry", "crying", "tears", "unhappy", "sorrow", "depressed"] },
  "😠 Angry":       { id: "angry",       type: "kaomoji", keywords: ["angry", "mad", "rage", "annoyed", "furious"] },
  "😮 Surprised":   { id: "surprised",   type: "kaomoji", keywords: ["surprised", "shock", "shocked", "wow", "omg", "amazed"] },
  "❤️ Love":        { id: "love",        type: "kaomoji", keywords: ["love", "heart", "romance", "affection", "crush", "kiss"] },
  "👋 Greetings":   { id: "greetings",   type: "kaomoji", keywords: ["hi", "hello", "hey", "wave", "waving", "bye", "goodbye", "greeting"] },
  "😴 Tired":       { id: "tired",       type: "kaomoji", keywords: ["tired", "sleepy", "sleep", "exhausted", "bored", "zzz"] },
  "🤔 Thinking":    { id: "thinking",    type: "kaomoji", keywords: ["thinking", "think", "hmm", "confused", "question", "wondering"] },
  "🐱 Animals":     { id: "animals",     type: "kaomoji", keywords: ["animal", "animals", "cute"] },
  "🏃 Actions":     { id: "actions",     type: "kaomoji", keywords: ["action", "run", "running", "dance", "dancing", "flex"] },
  "✨ Magic":       { id: "magic",       type: "kaomoji", keywords: ["magic", "sparkle", "sparkles", "stars", "glitter", "shine"] },
  "💫 Decorated":   { id: "decorated",   type: "kaomoji", keywords: ["decorated", "fancy", "ornate", "sparkly", "aesthetic", "excited", "decoration"] },
  "😎 Cool":        { id: "cool",        type: "kaomoji", keywords: ["cool", "smug", "swag", "awesome", "lenny"] },
  "😨 Scared":      { id: "scared",      type: "kaomoji", keywords: ["scared", "fear", "afraid", "fright", "nervous", "panic"] },
  "🙈 Embarrassed": { id: "embarrassed", type: "kaomoji", keywords: ["embarrassed", "shy", "blush", "blushing", "flustered"] },
  "🌸 Kawaii":      { id: "kawaii",      type: "kaomoji", keywords: ["kawaii", "cute", "adorable", "aesthetic", "soft", "sweet"] },
  "🎵 Music":       { id: "music",       type: "kaomoji", keywords: ["music", "sing", "singing", "song", "notes", "melody", "dance"] },
  "💪 Fighting":    { id: "fighting",    type: "kaomoji", keywords: ["fight", "fighting", "flex", "strong", "power", "determined"] },
  "🙏 Please":      { id: "please",      type: "kaomoji", keywords: ["please", "beg", "begging", "pray", "sorry", "apology", "bow"] },
  "🎉 Celebrate":   { id: "celebrate",   type: "kaomoji", keywords: ["celebrate", "party", "congrats", "congratulations", "cheers", "win", "yay"] },
  "🌙 Dividers":    { id: "dividers",    type: "decoration", keywords: ["divider", "dividers", "decoration", "line", "border", "aesthetic", "separator"] },
  "😀 Emoji":       { id: "emoji",       type: "emoji",   keywords: ["emoji", "emojis", "smiley", "face", "faces"] },
  "🔣 Symbols":     { id: "symbols",     type: "symbol",  keywords: ["symbol", "symbols", "special characters", "text symbols", "decoration"] },
  "😞 Disappointed": { id: "disappointed", type: "kaomoji", keywords: ["disappointed", "letdown", "let down", "disappointment", "unimpressed", "sigh", "bummed", "deflated"] },
  "🥺 UwU": { id: "uwu", type: "kaomoji", keywords: ["uwu", "owo", "cute", "soft", "wholesome", "blush", "shy"] },
  "🎀 Coquette": { id: "coquette", type: "kaomoji", keywords: ["coquette", "bow", "ribbon", "dainty", "soft", "girly", "aesthetic", "cute"] },
};

const categories = [];
const raw = {};
let dropped = 0;
for (const [label, { icon, items }] of Object.entries(CATEGORIES)) {
  if (!items || items.length === 0) continue; // skip runtime-only Favourites/Recent
  const meta = META[label];
  if (!meta) throw new Error(`No META for category: ${label}`);
  const name = label.replace(/^[^ ]+ /, "");
  // Dedupe glyphs WITHIN a category (a Set preserves first-seen order). Exact
  // repeats in one category are always a mistake; the same glyph appearing in
  // *different* categories is intentional (discoverable from each category page).
  const deduped = [...new Set(items)];
  dropped += items.length - deduped.length;
  categories.push({ id: meta.id, name, icon, type: meta.type, keywords: meta.keywords });
  raw[meta.id] = deduped;
}

const header = "// AUTO-GENERATED by scripts/migrate.mjs — do not edit by hand.\n";
fs.writeFileSync("src/data/categories.js", header + "export const categories = " + JSON.stringify(categories, null, 2) + ";\n");
fs.writeFileSync("src/data/raw.js", header + "export const raw = " + JSON.stringify(raw, null, 2) + ";\n");

const totalItems = Object.values(raw).reduce((n, a) => n + a.length, 0);
console.log(
  `Wrote ${categories.length} categories, ${totalItems} items.` +
    (dropped ? ` Removed ${dropped} in-category duplicate glyph(s).` : "")
);
