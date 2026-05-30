import { useState, useEffect, useMemo, useRef } from "react";

const CATEGORIES = {
  "⭐ Favourites": { icon: "⭐", items: [] },
  "🕐 Recent": { icon: "🕐", items: [] },
  "😊 Happy": {
    icon: "😊",
    items: [
      "(＾▽＾)", "ヽ(・∀・)ﾉ", "(*≧ω≦)", "(ﾉ´ヮ`)ﾉ*:･ﾟ✧", "(＊˘︶˘＊)",
      "٩(◕‿◕｡)۶", "(✿◠‿◠)", "ヽ(>∀<☆)ノ", "(づ｡◕‿‿◕｡)づ", "☆*:.｡.o(≧▽≦)o.｡.:*☆",
      "(＾◡＾)", "d(＾o＾)b", "ヾ(＾∇＾)", "(●´∀｀●)", "（*＾▽＾*）",
      "w(°ｏ°)w", "(★^O^★)", "ヽ(^Д^)ﾉ", "(ノ^_^)ノ", "＼(^▽^)／",
      "(*^▽^)/", "ヽ(´▽`)/", "(＊´▽｀＊)", "Σ(ﾉ´∀`)ﾉ", "(๑>◡<๑)",
      "( ´ ▽ ` )ﾉ", "ヾ(*´∀｀*)ﾉ", "(o^▽^o)", "(*´∇｀*)", "╰(´꒳`)╯",
    ],
  },
  "😢 Sad": {
    icon: "😢",
    items: [
      "(T_T)", "(;_;)", "(｡•́︿•̀｡)", "( ˃̣̣̥⌓˂̣̣̥ )", "(っ˘̩╭╮˘̩)っ",
      "ಥ_ಥ", "(╥_╥)", "｡ﾟ(ﾟ´Д｀ﾟ)ﾟ｡", "(´；ω；`)", "(p′﹏‵。)",
      "（´＿｀）", "(｡-_-。)", "(´-ω-`)", "(-_-。)", "。゜゜(´O`) ゜゜。",
      "(ノД`)", "ヽ(´□｀。)ヽ", "(｡ŏ﹏ŏ)", "( p_q)", "〒▽〒",
      "(இ﹏இ`。)", "( ´•̥̥̥ω•̥̥̥` )", "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥`)", "ᗒᗩᗕ", "( ˃̣̣̥᷄⌓˂̣̣̥᷅ )",
    ],
  },
  "😠 Angry": {
    icon: "😠",
    items: [
      "(¬_¬)", "(｀Д´)", "(╬ಠ益ಠ)", "ヽ(`Д´)ﾉ", "(ノಠ益ಠ)ノ彡┻━┻",
      "٩(ఠ益ఠ)۶", "凸(｀△´＋)", "(ꐦ°д°)ꐦ", "ヽ(o`皿′o)ノ", "(#`皿´)",
      "( ゚Д゚)＜!!", "(　`ー´)", "ヽ(`⌒´)ﾉ", "(°ロ°) !!", "٩(๑`^´๑)۶",
      "ヽ(#`Д´)ﾉ", "(｀ε´)", "凸( ̄ヘ ̄)", "( ー`дー´)", "(*`へ´*)",
    ],
  },
  "😮 Surprised": {
    icon: "😮",
    items: [
      "( ﾟдﾟ)", "Σ(ﾟДﾟ)", "∑(O_O；)", "(⊙_⊙)", "Σ(°△°|||)︴",
      "w(ﾟДﾟ)w", "(@_@)", "( º△º )", "Σ( ̄□ ̄||)", "(ﾉﾟ0ﾟ)ﾉ~",
      "∑(；°Д°)", "Σ(ﾟдﾟ；)", "(*ﾟﾛﾟ)", "(⊙ω⊙)", "щ(ﾟДﾟщ)",
      "Σ(ﾟ∀ﾟﾉ)ﾉ!", "(°o°)!", "Σ(°□°；)", "ヽ(゜Q。)ノ？", "（ﾟдﾟ）",
    ],
  },
  "❤️ Love": {
    icon: "❤️",
    items: [
      "(♥ω♥)", "(♡∀♡)", "(づ￣ ³￣)づ", "(˘∀˘)/(μ‿μ) ❤", "♡(｡- ω -｡)",
      "(｡♥‿♥｡)", "(/^▽^)/♡", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "❤(ӦｖӦ｡)", "σ(≧ε≦σ) ♡",
      "(〃￣ω￣〃)ゞ", "♡´･ᴗ･`♡", "(´ ∀ ` *)", "（*^３^）/~☆", "(●♡∀♡)",
      "ヽ(愛´∀｀愛)ノ", "(⺣◡⺣)♡*", "( ´◡‿ゝ◡`)", "♥(ˆ⌣ˆԅ)", "(ﾉ´ з`)ノ♪",
      "(*˘︶˘*).｡.:*♡", "( ˘ ³˘)♥", "٩(♡ε♡)۶", "(≧◡≦) ♡", "❤️(´∀｀)❤️",
    ],
  },
  "👋 Greetings": {
    icon: "👋",
    items: [
      "(＾▽＾)/", "(^-^*)/", "(´･ω･`)/", "ヾ(・ω・*)", "( ´ ▽ ` )ﾉ",
      "ヾ(＾∇＾)", "(o^▽^o)ノ", "＼(^▽^)＼", "(*^▽^)ノ", "ヾ(*⌒ヮ⌒*)ﾉ",
      "ヾ(・ω・）ノ", "ヽ(・∀・)ﾉ", "(っ・∀・)っ", "^_^)/", "(^o^)/~~",
      "ヾ(^∇^)", "ヾ(*´∀`*)ﾉ", "(ﾉ・ω・)ﾉ", "( ° ∀ ° )ﾉﾞ", "＼（＾▽＾）／",
    ],
  },
  "😴 Tired": {
    icon: "😴",
    items: [
      "(－_－) zzZ", "(-_-;)", "(=_=)", "( ´_ゝ｀)", "(-ω-、)",
      "(。-_-。)", "(-。-;)", "（〜＿〜）", "(￣ρ￣)..", "(-.-)",
      "(_ _).｡o○", "(._.) φ__", "(=ω=.)", "(∪｡∪)｡｡｡zzZ", "(ㆆ_ㆆ)",
      "ᕙ(⇀‸↼‶)ᕗ", "¯\\_(ツ)_/¯", "(・_・;)", "(￣_￣)", "( ´~`)",
    ],
  },
  "🤔 Thinking": {
    icon: "🤔",
    items: [
      "(・・ ) ?", "(？。？)", "（？_？）", "(゜.゜)", "ლ(ʘ̆~̆ʘ̆ლ)",
      "(●__●)", "ლ(´ڡ`ლ)", "( ˘▽˘)っ♨", "( ._.) φ", "川o・-・o)φ",
      "(。_°☆", "(ー_ーゞ", "φ(◎ロ◎；)φ", "(・・）ん？", "┌(・。・)┘",
      "ʕ •ₒ• ʔ", "(눈_눈)", "(-.-;)", "ヘ(。□°)ヘ", "〜(￣▽￣〜)",
    ],
  },
  "🐱 Animals": {
    icon: "🐱",
    items: [
      "(=^･^=)", "(=^･ω･^=)", "ฅ^•ﻌ•^ฅ", "(^=˃ᆺ˂)", "ʕ•ᴥ•ʔ",
      "ʕ ·ᴥ·ʔ", "ʕ•̫͡•ʔ", "(V●ᴥ●V)", "（U・ω・U）", "(●´ω｀●)",
      "ʕ≧ᴥ≦ʔ", "（∪^ω^）", "(ﾉ>ω<)ﾉ", "(o´▽`o)", "˙ ͜ʟ˙",
      "(ᵔᴥᵔ)", "(⁰▿⁰)", "ʕ •`ᴥ•´ʔ", "(・∩・)", "ヾ(=｀ω´=)ノ\"",
      "У(=^･ω･^=)У", "(=；ェ；=)", "(^･o･^)ﾉ\"", "ฅ(^・ω・^ฅ)", "≽^•⩊•^≼",
    ],
  },
  "🏃 Actions": {
    icon: "🏃",
    items: [
      "(ง •̀_•́)ง", "(づ￣ ³￣)づ", "ヽ(^Д^)ﾉ", "┌(┌^o^)┐", "ᕙ(⇀‸↼‶)ᕗ",
      "ε=ε=ε=┌(;*´Д`)ﾉ", "ε=ε=ε=ε=┌(΄◉ɷ◉`)┘", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "ヽ(´ー｀)ノ", "凸(｀∀´)凸",
      "(ﾉ゜∇゜)ﾉ", "ᕦ(ò_óˇ)ᕤ", "♪～(´ε｀ )", "ヾ(´〇`)ﾉ♪♪♪", "┗(＾0＾)┓",
      "┌(★o☆)┘", "♪(┌・。・)┌", "ヽ(´∀`)ﾉ♪♪", "d(>_< )", "(ﾉ>ω<)ﾉ",
    ],
  },
  "✨ Magic": {
    icon: "✨",
    items: [
      "(ﾉ´ヮ`)ﾉ*:･ﾟ✧", "✧･ﾟ: *✧･ﾟ:*", "*:･ﾟ✧*:･ﾟ✧", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "☆*:.｡.o(≧▽≦)o.｡.:*☆",
      "｡･:*:･ﾟ★,｡･:*:･ﾟ☆", "✩°｡⋆⸜(ू｡•ω•｡)", "⊹₊ ⟡˖ °", "✦˖ ·̩͙", "˚ ༘ ⋆｡˚",
      "★彡", "☆彡", "꒰⑅˘͈ ᵕ˘͈꒱", "✿◕ ‿ ◕✿", "(✿ヘᴥヘ)",
      "ﾟ*。(・∀・)。*ﾟ", "(*˘︶˘*).｡.:*♡", "~(˘▾˘~)", "(~˘▾˘)~", "₍ᐢ•ﻌ•ᐢ₎",
    ],
  },
  "😎 Cool": {
    icon: "😎",
    items: [
      "( ͡° ͜ʖ ͡°)", "(¬‿¬)", "( ͠° ͟ʖ ͡°)", "¬(º_º)", "(；一_一)",
      "ಠ_ಠ", "(¬_¬)ﾉ", "눈_눈", "(─‿‿─)", "(｀∀´)Ψ",
      "ヽ( ͝° ͜ʖ͡°)ﾉ", "( ͡~ ͜ʖ ͡°)", "(ง ͠° ͟ل͜ ͡°)ง", "( ͡° ͜ʖ ͡°)✌", "ʕ ͡° ʖ̯ ͡°ʔ",
      "(¿ ͜ʖ ¿)", "( ° ͜ʖ °)", "( ≖͞_≖̥)", "( ˘ ³˘)", "(-_^)",
    ],
  },
  "😨 Scared": {
    icon: "😨",
    items: [
      "(ﾟДﾟ;)", "(|||ﾟДﾟ)", "((( ;°Д°)))", "ヽ(゜ロ゜;)ノ", "(((;꒪ω꒪;)))",
      "(×_×;）", "((d[-_-]b))", "（＞＜）", "(((・・;)", "Σ(-᷅_-᷄๑)",
      "(ノ_<。)ヾ(´ ▽ `)", "(」゜ロ゜)」", "((( ；ﾟдﾟ)))", "(っ °Д °;)っ", "ヾ(´･ω･｀)",
    ],
  },
  "🙈 Embarrassed": {
    icon: "🙈",
    items: [
      "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "(*^_^*)", "(/ω＼)", "(ﾉ*>∀<)ﾉ♡", "(〃＾▽＾〃)",
      "(*/▽＼*)", "(〃∀〃)", "(/▽＼)", "(//∇//)", "(*≧▽≦)",
      "(≧艸≦)", "(>///<)", "(*∩_∩*)旦~~", "( ˘ ³˘)♥", "(´∀｀*)ﾉ",
      "(*´▽`*)", "(o^_^o)", "（*/ω＼*）", "(^///^)", "(๑•́ωก̀๑)",
    ],
  },
  "🌸 Kawaii": {
    icon: "🌸",
    items: [
      "(✿◠‿◠)", "(｡♥‿♥｡)", "꒰˘̩̩̩⌣˘̩̩̩꒱", "(人◕ω◕)", "( ˘▽˘)っ♡",
      "₍ᐢ•ﻌ•ᐢ₎", "(ᵕ̣̣̣̣̣̣ᴗᵕ̣̣̣̣̣̣)", "˘ᵕ˘", "(ᴗ͈ˬᴗ͈)", "✿(ˆ◡ˆ)✿",
      "꒰•‧̫•꒱", "(❁´◡`❁)", "(◍•ᴗ•◍)", "✧(˘▾˘)✧", "(´｡• ᵕ •｡`)",
      "◝(⁰▿⁰)◜", "╰(*´︶`*)╯", "(ꂧᴗꂧ)", "(˶˃ ᵕ ˂˶)", "⸜(｡˃ ᵕ ˂ )⸝♡",
      "‧₊˚✩彡", "ˏˋ°•*⁀➷", "·͜·♡", "(¯ ³¯)♡", "꒰ᵕ̤ᴗᵕ̤꒱",
    ],
  },
  "🎵 Music": {
    icon: "🎵",
    items: [
      "♪(┌・。・)┌", "ヾ(´〇`)ﾉ♪♪♪", "(ﾉ♪´∀｀)ﾉ", "♪～(´ε｀ )", "ヽ(´∀`)ﾉ♪♪",
      "～♪(￣▽￣)ノ♪", "((d(◎ ◎)b))", "♩♪♫♬(o^▽^o)", "d(≧∀≦)b", "ヾ(≧∇≦)〃♪",
      "(¬‿¬)ノ♪", "ヽ(°◇° )ノ ♪♪♪", "♫.°˖✧◝(⁰▿⁰)◜✧˖°.♫", "(∪｡∪)♪", "٩(˘◡˘)۶ ♩",
    ],
  },
  "💪 Fighting": {
    icon: "💪",
    items: [
      "(ง •̀_•́)ง", "ᕙ(⇀‸↼‶)ᕗ", "(ง'̀-'́)ง", "ᕦ(ò_óˇ)ᕤ", "(۶•̀ᴗ•́)۶",
      "凸(`△´+)", "ヽ(#`Д´)ﾉ", "(•̀o•́)ง", "(ﾉಥ益ಥ）ﾉ ┻━┻",
      "ヽ(`⌒´)ﾉ", "( •̀ᄇ• ́)ﻭ✧", "（ﾉｰДｰ）ﾉ", "(*`ー´)ψ", "٩(๑•̀ω•́๑)۶",
    ],
  },
  "🙏 Please": {
    icon: "🙏",
    items: [
      "m(_ _)m", "(_　_)。", "(*_ _)人", "人(;´Д｀)", "m(TωT)m",
      "m(T_T)m", "(´；ω；｀)m", "＿〆(。。)", "_(._.)_", "(*・ω・)ﾉ",
      "(ﾉ*'ω'*)ﾉ", "(人*´∀｀)｡*ﾟ+", "(∩^o^)⊃━☆ﾟ.*", "m(_ _;)m", "(*´人｀*)",
    ],
  },
  "🎉 Celebrate": {
    icon: "🎉",
    items: [
      "＼(^▽^)／", "ヽ(>∀<☆)ノ", "☆*:.｡.o(≧▽≦)o.｡.:*☆", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "★~(◠‿◕✿)",
      "\\(★ω★)/", "٩(^‿^)۶", "ヽ(^Д^)ﾉ", "ヾ(⌐■_■)ノ♪", "(＾∇＾)ﾉ",
      "꒰ᵕ̤ᴗᵕ̤꒱", "ε=ε=ε=(ﾉ≧∀≦)ﾉ", "(∩•̀ω•́)⊃✧", "٩(◕‿◕)۶✧*。", "ヽ(・∀・)ﾉ",
    ],
  },
  "🌙 Dividers": {
    icon: "🌙",
    items: [
      "・:*:・゜'★,｡・:*:・゜'☆", "━━━━━━━━━━━━", "･:.｡..｡.:･", "〜〜〜〜〜〜〜〜",
      "────────────────", "＊:･ﾟ✧＊:･ﾟ✧", "｡.:*・°☆.｡.:*・°☆", "✦ ✦ ✦ ✦ ✦",
      "♡ ————— ♡", "~ . ~ . ~ . ~ . ~", "∘₊✧──────✧₊∘",
      "·͜·♡·͜·♡·͜·♡", "✩ ✩ ✩ ✩ ✩", "≋≋≋≋≋≋≋≋≋≋",
      "⊱ ────── {.⋅ ♫ ⋅.} ────── ⊰", "━━━✿━━━",
    ],
  },
  "😀 Emoji": {
    icon: "😀",
    items: [
      "😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇",
      "🥰","😍","🤩","😘","😗","😚","😙","🥲","😋","😛","😜","🤪","😝",
      "🤑","🤗","🤭","🫢","🫣","🤫","🤔","🫡","🤐","🤨","😐","😑","😶",
      "🫥","😏","😒","🙄","😬","🤥","🫨","😌","😔","😪","🤤","😴","😷",
      "🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","🥸",
      "😎","🤓","🧐","😕","🫤","😟","🙁","☹️","😮","😯","😲","😳","🥺",
      "😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓",
      "😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","💩","🤡",
      "😺","😸","😹","😻","😼","😽","🙀","😿","😾",
      "💋","💌","💘","💝","💖","💗","💓","💞","💕","💟","❣️","💔",
      "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎",
      "💯","✨","🔥","🎉","🎊","🎈","🎁","🎀","🌟","⭐","🌈","☀️","🌙","❄️","🌸","🌺","🌻","🌹","💐","🍀",
      "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊",
      "🍎","🍊","🍋","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🍕","🍔","🌮","🍜","🍣","🍱","🍰","🎂","☕","🍵","🧋",
      "👋","🤚","✋","🖖","👌","✌️","🤞","👍","👎","✊","👊","👏","🙌","🫶","🙏","💪",
      "👀","🧠","🦷","🦴",
    ],
  },
  "🔣 Symbols": {
    icon: "🔣",
    items: [
      "♡","♥","❤","✿","❀","★","☆","♪","♫","♬","♩","☀","☁","☂","☃",
      "⊙","◎","●","○","◐","◑","◒","◓","▲","△","▼","▽","◆","◇","■","□",
      "→","←","↑","↓","↔","↕","⇒","⇔","♠","♦","♣","♤","♧","✓","✗",
      "※","〒","〓","〆","∞","π","Σ","Ω","α","β","γ","δ","θ","λ","μ",
      "ツ","シ","ヅ","〜","ー","「","」","『","』",
      "©","®","™","°","±","÷","×","√","∑","∫","≈","≠","≤","≥","‰",
      "†","‡","§","¶","‼","⁉","❗","❓","‽","⁂","※","⁕","⁎",
      "☯","☮","✡","☪","✝","☑","☒","☐",
    ],
  },
};

const STORAGE_KEY_FAVS = "kaomoji-favourites-v2";
const STORAGE_KEY_RECENT = "kaomoji-recent-v2";

export default function KaomojiApp() {
  const [activeCategory, setActiveCategory] = useState("😊 Happy");
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [recent, setRecent] = useState([]);
  const [copied, setCopied] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const f = localStorage.getItem(STORAGE_KEY_FAVS);
      const r = localStorage.getItem(STORAGE_KEY_RECENT);
      if (f) setFavourites(JSON.parse(f));
      if (r) setRecent(JSON.parse(r));
    } catch {}
  }, []);

  const saveFavs = (f) => {
    setFavourites(f);
    try { localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(f)); } catch {}
  };

  const saveRecent = (r) => {
    setRecent(r);
    try { localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(r)); } catch {}
  };

  const showToast = (text) => {
    setToast(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1600);
  };

  const handleCopy = (item) => {
    const doCopy = () => {
      setCopied(item);
      showToast("Copied! " + item);
      setTimeout(() => setCopied(null), 1400);
      const newRecent = [item, ...recent.filter(r => r !== item)].slice(0, 30);
      saveRecent(newRecent);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(item).then(doCopy).catch(() => {
        // fallback
        const el = document.createElement("textarea");
        el.value = item;
        el.style.cssText = "position:fixed;opacity:0;top:0;left:0";
        document.body.appendChild(el);
        el.focus(); el.select();
        try { document.execCommand("copy"); } catch {}
        document.body.removeChild(el);
        doCopy();
      });
    } else {
      const el = document.createElement("textarea");
      el.value = item;
      el.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(el);
      el.focus(); el.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(el);
      doCopy();
    }
  };

  const toggleFav = (item, e) => {
    e.stopPropagation();
    const newFavs = favourites.includes(item)
      ? favourites.filter(f => f !== item)
      : [item, ...favourites];
    saveFavs(newFavs);
  };

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const catMatches = Object.entries(CATEGORIES)
      .filter(([cat]) => cat.toLowerCase().includes(q))
      .flatMap(([, { items }]) => items || []);
    const itemMatches = Object.values(CATEGORIES)
      .flatMap(({ items }) => (items || []).filter(i => i.toLowerCase().includes(q)));
    return [...new Set([...catMatches, ...itemMatches])].slice(0, 80);
  }, [search]);

  const displayItems = useMemo(() => {
    if (search.trim()) return searchResults;
    if (activeCategory === "⭐ Favourites") return favourites;
    if (activeCategory === "🕐 Recent") return recent;
    return CATEGORIES[activeCategory]?.items || [];
  }, [activeCategory, search, favourites, recent, searchResults]);

  const categoryList = Object.keys(CATEGORIES).filter(c => c !== "⭐ Favourites" && c !== "🕐 Recent");

  return (
    <div style={{
      fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Segoe UI',sans-serif",
      background: "linear-gradient(160deg,#0d0b1a 0%,#1a1040 50%,#0f1628 100%)",
      minHeight: "100vh",
      color: "#e2deff",
      display: "flex",
      flexDirection: "column",
      maxWidth: "100vw",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(167,139,250,0.15)",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <button onClick={() => setSidebarOpen(o => !o)} style={{
          background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)",
          color: "#c4b5fd", borderRadius: "8px", padding: "8px 10px",
          cursor: "pointer", fontSize: "16px", lineHeight: 1, flexShrink: 0,
        }}>☰</button>
        <input
          type="text"
          placeholder="Search… happy, cat, love, ✨"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(167,139,250,0.2)", borderRadius: "10px",
            padding: "9px 14px", color: "#e2deff", fontSize: "14px", outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div style={{ fontSize: "20px", flexShrink: 0 }}>顔文字</div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "80px", left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(167,139,250,0.95)",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "24px",
          fontSize: "14px",
          fontWeight: 600,
          zIndex: 200,
          pointerEvents: "none",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          whiteSpace: "nowrap",
          maxWidth: "90vw",
          overflow: "hidden",
          textOverflow: "ellipsis",
          animation: "fadeInUp 0.15s ease",
        }}>
          ✓ Copied!
        </div>
      )}

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50,
        }} />
      )}

      {/* Sidebar */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: "220px",
        background: "linear-gradient(180deg,#1a1040,#0d0b1a)",
        borderRight: "1px solid rgba(167,139,250,0.15)",
        zIndex: 60,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.22s ease",
        overflowY: "auto", paddingTop: "56px", paddingBottom: "20px",
      }}>
        <div style={{ padding: "10px 14px 6px", fontSize: "10px", letterSpacing: "2px", opacity: 0.4, textTransform: "uppercase" }}>
          Categories
        </div>
        {[["⭐ Favourites", `${favourites.length}`], ["🕐 Recent", `${recent.length}`]].map(([cat, count]) => (
          <button key={cat} onClick={() => { setActiveCategory(cat); setSidebarOpen(false); setSearch(""); }} style={{
            display: "flex", alignItems: "center", gap: "8px",
            width: "100%", padding: "9px 14px",
            background: activeCategory === cat ? "rgba(167,139,250,0.18)" : "transparent",
            border: "none", borderLeft: activeCategory === cat ? "3px solid #a78bfa" : "3px solid transparent",
            color: "#e2deff", cursor: "pointer", fontSize: "13px", textAlign: "left",
          }}>
            <span>{cat}</span>
            <span style={{ marginLeft: "auto", opacity: 0.35, fontSize: "11px" }}>{count}</span>
          </button>
        ))}
        <div style={{ margin: "6px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }} />
        {categoryList.map(cat => (
          <button key={cat} onClick={() => { setActiveCategory(cat); setSidebarOpen(false); setSearch(""); }} style={{
            display: "flex", alignItems: "center", gap: "8px",
            width: "100%", padding: "9px 14px",
            background: activeCategory === cat ? "rgba(167,139,250,0.18)" : "transparent",
            border: "none", borderLeft: activeCategory === cat ? "3px solid #a78bfa" : "3px solid transparent",
            color: "#e2deff", cursor: "pointer", fontSize: "13px", textAlign: "left",
          }}>
            <span>{CATEGORIES[cat]?.icon}</span>
            <span>{cat.replace(/^[^ ]+ /, "")}</span>
            <span style={{ marginLeft: "auto", opacity: 0.35, fontSize: "11px" }}>
              {CATEGORIES[cat]?.items?.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Category pill strip */}
      {!search && (
        <div style={{
          display: "flex", gap: "6px", overflowX: "auto", padding: "8px 10px",
          scrollbarWidth: "none", background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(167,139,250,0.08)", flexShrink: 0,
        }}>
          {["⭐ Favourites", "🕐 Recent", ...categoryList].map(cat => {
            const active = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                flexShrink: 0, padding: "5px 11px", borderRadius: "16px", border: "1px solid",
                borderColor: active ? "#a78bfa" : "rgba(255,255,255,0.1)",
                background: active ? "rgba(167,139,250,0.22)" : "rgba(255,255,255,0.04)",
                color: active ? "#c4b5fd" : "#9d93c4",
                cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}>
                {CATEGORIES[cat]?.icon || (cat.startsWith("⭐") ? "⭐" : "🕐")} {cat.replace(/^[^ ]+ /, "")}
              </button>
            );
          })}
        </div>
      )}

      {/* Status bar */}
      <div style={{ padding: "6px 12px 2px", opacity: 0.35, fontSize: "11px", letterSpacing: "0.5px", flexShrink: 0 }}>
        {search
          ? `${searchResults.length} results for "${search}"`
          : activeCategory === "⭐ Favourites" ? `${favourites.length} saved`
          : activeCategory === "🕐 Recent" ? `${recent.length} recent`
          : `${CATEGORIES[activeCategory]?.items?.length || 0} items`}
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "6px 8px 24px",
        display: "flex", flexWrap: "wrap", gap: "5px", alignContent: "flex-start",
      }}>
        {displayItems.length === 0 && (
          <div style={{ padding: "48px 20px", opacity: 0.35, width: "100%", textAlign: "center", fontSize: "14px", lineHeight: 1.7 }}>
            {activeCategory === "⭐ Favourites"
              ? "No favourites yet\nLong-press any item to star it ♡"
              : activeCategory === "🕐 Recent"
              ? "Nothing copied yet\nTap any kaomoji to copy"
              : "No results — try another keyword"}
          </div>
        )}
        {displayItems.map((item, i) => {
          const isFav = favourites.includes(item);
          const isCopied = copied === item;
          const isEmoji = /^\p{Emoji}(\uFE0F)?(\u200D\p{Emoji}(\uFE0F)?)*$/u.test(item) && [...item].length <= 3;
          return (
            <button
              key={`${item}-${i}`}
              onClick={() => handleCopy(item)}
              onContextMenu={e => { e.preventDefault(); toggleFav(item, e); }}
              title={item}
              style={{
                background: isCopied
                  ? "#a78bfa"
                  : isFav
                  ? "rgba(251,191,36,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: isCopied ? "#c4b5fd"
                  : isFav ? "rgba(251,191,36,0.35)"
                  : "rgba(255,255,255,0.09)",
                borderRadius: "9px",
                padding: isEmoji ? "7px 8px" : "7px 9px",
                cursor: "pointer",
                color: isCopied ? "#fff" : "#e2deff",
                fontSize: isEmoji ? "20px" : "12px",
                fontFamily: "inherit",
                transition: "all 0.12s ease",
                position: "relative",
                minWidth: isEmoji ? "38px" : undefined,
                display: "flex", alignItems: "center", justifyContent: "center",
                lineHeight: 1.4,
                transform: isCopied ? "scale(0.93)" : "scale(1)",
                boxShadow: isCopied ? "0 0 12px rgba(167,139,250,0.6)" : "none",
              }}
            >
              {isCopied ? "✓" : item}
              {isFav && !isCopied && (
                <span style={{
                  position: "absolute", top: -5, right: -4,
                  fontSize: "9px", lineHeight: 1,
                }}>⭐</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: "7px 14px", background: "rgba(0,0,0,0.25)",
        borderTop: "1px solid rgba(167,139,250,0.08)",
        fontSize: "11px", opacity: 0.3, textAlign: "center", flexShrink: 0,
      }}>
        Tap to copy · Right-click / long-press to ⭐ favourite
      </div>
    </div>
  );
}
