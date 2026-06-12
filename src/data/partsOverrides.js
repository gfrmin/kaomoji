// Hand-curated input to the kaomoji decomposition parser (scripts/decompose.mjs).
// Mirrors the role of overrides.js for tags: a deterministic parser does the bulk,
// and this file seeds its dictionaries + corrects the glyphs it gets wrong.
//
// Two exports:
//   partsDictionary — recognizable glyph classes the parser keys off. Eyes are an
//     OPEN class (anything flanking the mouth), so there is intentionally no eye set;
//     the mouth/arm/bracket/cheek/decoration sets are what the parser actually needs.
//   partsFixups     — exact-glyph slot corrections, keyed by the raw glyph string.

// --- Bracket pairs (face boundary). Order matters only for display. ----------
export const brackets = {
  open: ["(", "（", "[", "［", "{", "｛", "<", "＜", "〔", "「", "｢", "ʕ", "꒰", "₍", "⌈", "⸂", "❪"],
  close: [")", "）", "]", "］", "}", "｝", ">", "＞", "〕", "」", "｣", "ʔ", "꒱", "₎", "⌉", "⸃", "❫"],
};

// --- Mouths / noses (the center of the face). Used to find the split point. ---
// Longest-match first is applied at parse time, so multi-glyph mouths are listed too.
export const mouths = [
  "‿‿", "╭╮", "﹏", "ᴥ", "Д", "益", "ω", "ヮ", "∀", "▽", "▿", "◡", "‿", "ε",
  "³", "人", "ヘ", "дﾞ", "д", "⌒", "‸", "ㅅ", "_", "～", "~", "ｰ", "ー", "◇",
  "ᵕ", "□", "ロ", "о", "o", "O", "０", "0", "₃", "³", "▾", "▔", "ｪ", "ヮ",
  "ヮ", "౪", "ω", "ꞈ", "ل", "ʖ", "ᗢ", "ᴗ", "ᵔ", "ᵒ", " Θ", "θ", "ν", "ᗝ",
  "ﻌ", "⩊", "㉨", "ᆺ", "ᗜ", "⌣", "‸", "ェ", "ᗴ",
];

// --- Arms (gestures outside, or just inside, the brackets). -------------------
export const arms = [
  "ヽ", "ﾉ", "ノ", "ヾ", "＼", "／", "/", "\\", "٩", "۶", "୧", "୨", "⊂", "⊃",
  "つ", "づ", "╰", "╯", "╭", "╮", "ᕙ", "ᕗ", "ᕦ", "ᕤ", "ヮ", "d", "b", "q", "p",
  "ｂ", "ｄ", "凸", "彡", "シ", "ﾐ", "三", "︵", "︶", "┛", "┓", "┏", "┗", "ﻭ",
  "७", "৩", "໒", "ૢ", "⸜", "⸝", "ᶘ", "ᶅ",
];

// --- Cheeks / ears / blush (between a bracket and an eye). --------------------
export const cheeks = [
  "｡", "✿", "❀", "✾", "❁", "*", "＊", "ﾟ", "ﾞ", "✲", "꒷", "˵", "๑", "⑅", "⸝⸍",
  "ฅ", "✧", "♡", "°", "₊", "˶", "ⓛ", "˓", "˒", "⑅",
];

// --- Decorations (sparkles / stars / notes / hearts, outside the face). -------
export const decorations = [
  "☆", "★", "✧", "✦", "✩", "✫", "✬", "✭", "✮", "✯", "❂", "✰", "♡", "♥", "❤",
  "♪", "♫", "♬", "♩", "♭", "♮", "✿", "❀", "❁", "✾", "❃", "❋", "✺", "✻",
  "°", "˚", "•", "◦", "◌", "○", "●", "◯", "⊹", "⟡", "✪", "⋆", "₊", "˖", "༘",
  "｡", "･", "：", ":", ".", "．", "、", ",", "彡", "シ", "ﾐ", "～", "~", "+", "＋",
  "✩", "₊", "ฺ", "꒰", "꒱", "⸜", "⸝", "꒷", "꒦", "≧", "≦",
];

// --- Exact-glyph slot fixups. Keyed by the raw glyph string. ------------------
// Slots: decorL, armL, bracketL, cheekL, eyeL, mouth, eyeR, cheekR, bracketR, armR, decorR.
// Famous / structurally awkward ones the heuristic parser can't reliably slot.
export const partsFixups = {
  "¯\\_(ツ)_/¯": {
    decorL: "¯", armL: "\\_", bracketL: "(", eyeL: "", mouth: "ツ", eyeR: "",
    bracketR: ")", armR: "_/", decorR: "¯",
  },
  "( ͡° ͜ʖ ͡°)": {
    bracketL: "(", eyeL: "͡°", mouth: "͜ʖ", eyeR: "͡°", bracketR: ")",
  },
  "(ノಠ益ಠ)ノ彡┻━┻": {
    bracketL: "(", armL: "ノ", eyeL: "ಠ", mouth: "益", eyeR: "ಠ", bracketR: ")",
    armR: "ノ彡", decorR: "┻━┻",
  },
  "ʕ•ᴥ•ʔ": {
    bracketL: "ʕ", eyeL: "•", mouth: "ᴥ", eyeR: "•", bracketR: "ʔ",
  },
  "(=^･^=)": {
    bracketL: "(", cheekL: "=", eyeL: "^", mouth: "･", eyeR: "^", cheekR: "=",
    bracketR: ")",
  },
  "(づ｡◕‿‿◕｡)づ": {
    bracketL: "(", armL: "づ", cheekL: "｡", eyeL: "◕", mouth: "‿‿", eyeR: "◕",
    cheekR: "｡", bracketR: ")", armR: "づ",
  },
  "ヾ(⌐■_■)ノ♪": {
    armL: "ヾ", bracketL: "(", eyeL: "⌐■", mouth: "_", eyeR: "■", bracketR: ")",
    armR: "ノ", decorR: "♪",
  },
};
