// Hand-authored, per-tag SEO copy. Keyed by tag slug (see data/index.js).
// Mirrors categoryContent.js exactly: { lead, body[], faqs[] }.
//
// This is the anti-thin-content payload for the TAG surface. Two jobs:
//   1. Justify the famous one-glyph head-terms we deliberately KEEP after the
//      thin-page consolidation (shrug, lenny-face, dogeza, …) — a single glyph
//      is fine if the page carries real, unique prose about that emoticon.
//   2. Give the highest-intent CROSS-CATEGORY tags (heart, blush, party, …)
//      copy that leans on what makes the tag distinct from any one category
//      page — the cross-cut angle — so it never reads as a category clone.
//
//   lead — one unique sentence above the picker (drives the meta description).
//          Keep ≲120 chars so the derived description stays ≲160.
//   body — unique paragraphs below the items (the crawlable depth).
//   faqs — question-shaped copy for long-tail / People-Also-Ask coverage.
//
// Only add an entry for a slug that actually earns a page (curated or 2+
// categories). Voice: playful but clean — match categoryContent.js. Not
// auto-generated; edit freely. A tag with no entry here just renders its
// default lede, which is fine for a long-tail term with a real glyph grid.

export const tagContent = {
  // ── Kept famous head-terms (one or few glyphs, but iconic) ──────────────
  shrug: {
    lead: "The original ¯\\_(ツ)_/¯ — copy & paste the shrug emoticon for every “eh, who knows” moment.",
    body: [
      "The shrug — ¯\\_(ツ)_/¯, sometimes called the smugshrug — is the most-copied kaomoji on the internet. The face is the Japanese katakana “tsu” (ツ); the arms are a macron ¯ and a backslash on each side, raised in cheerful indifference.",
      "It’s the perfect reply to anything you can’t or won’t explain: “it broke ¯\\_(ツ)_/¯”, “your guess is as good as mine”, “not my problem”. One tap copies the whole thing, backslashes intact — no more rebuilding it by hand.",
    ],
    faqs: [
      { q: "How do I type the shrug emoji ¯\\_(ツ)_/¯?", a: "Rebuilding it by hand is fiddly because of the backslashes and the macron over the first arm. The easy way is to copy it — tap the shrug above and paste it anywhere. It pastes identically into Discord, texts, Slack and docs." },
      { q: "Is ¯\\_(ツ)_/¯ a kaomoji or an emoji?", a: "It’s a kaomoji — a Japanese-style text emoticon read upright. It’s built from regular characters (the ツ face plus backslash arms), not a single emoji glyph, which is why it copies as plain text everywhere." },
    ],
  },
  "lenny-face": {
    lead: "( ͡° ͜ʖ ͡°) — copy & paste the Lenny face and its variants, the internet’s favourite eyebrow-wiggle.",
    body: [
      "The Lenny face ( ͡° ͜ʖ ͡°) is built from combining Unicode marks — two ͡° eyes under curved brows and a ͜ʖ smirk — stacked so they read as a single knowing look. It spread from imageboards and Facebook groups in the early 2010s and never left.",
      "Lenny means “…if you know what I mean.” Drop it after anything you want to make suggestive, cheeky or conspiratorial. Here you also get the variants — winking, arms-up, sunglasses — so you can pick the exact energy.",
    ],
    faqs: [
      { q: "What does ( ͡° ͜ʖ ͡°) mean?", a: "The Lenny face implies innuendo or mischief — a playful “if you know what I mean.” It’s used to add a knowing, suggestive or teasing tone to a message." },
      { q: "Why won’t the Lenny face type properly?", a: "It’s made of combining characters that are easy to break when typed by hand. Copy it instead — tap any Lenny above and it pastes intact. On some older fonts the brows may shift slightly; the underlying text is still correct." },
    ],
  },
  "look-of-disapproval": {
    lead: "ಠ_ಠ — copy & paste the look of disapproval, the internet’s flattest unimpressed stare.",
    body: [
      "The look of disapproval, ಠ_ಠ, uses the Kannada letter “ṭha” (ಠ) as two cold, lidded eyes either side of a straight mouth. The result is pure judgement — no anger, just quiet, unblinking disappointment.",
      "It’s the reply for a bad pun, a questionable life choice, or a take you cannot endorse. Closely related to the unamused ¬_¬ and the rage-tier (╬ಠ益ಠ) — but this one is the calm, deadpan stare.",
    ],
    faqs: [
      { q: "What does ಠ_ಠ mean?", a: "ಠ_ಠ is the “look of disapproval” — a deadpan, unimpressed stare. It signals mild judgement or scepticism without anger: you’ve seen what someone did, and you do not approve." },
    ],
  },
  stare: {
    lead: "The best kaomoji stare faces — from the deadpan ಠ_ಠ to wide-eyed (ʘ_ʘ) — copy & paste in one tap.",
    body: [
      "A kaomoji stare lands differently from a smile or a frown: no emotion, just eyes. That flat, unblinking look reads as judgement, suspicion, boredom, or plain “I’m watching you” depending on the context — which is exactly why it works so well in text.",
      "The range here goes from the legendary ಠ_ಠ (Kannada letters as cold, lidded eyes) to the owl-wide (ʘ_ʘ), the Korean 눈_눈, and the dead-eyed (-_-). At the heated end there's (╬ಠ益ಠ) — same staring eyes, maximum rage.",
    ],
    faqs: [
      { q: "What kaomoji means staring?", a: "ಠ_ಠ is the classic stare — flat, unimpressed, unflinching. For a wide-eyed stare try (ʘ_ʘ); for the Korean side-eye version use 눈_눈 or (눈‸눈). All of them copy in one tap." },
      { q: "What's the difference between ಠ_ಠ and (°_°)?", a: "ಠ_ಠ is a knowing, lidded stare — calm disappointment. (°_°) is the same blank look but with rounder, wider eyes, so it reads more like a startled or confused stare than a judgemental one." },
    ],
  },
  dogeza: {
    lead: "_(._.)_ — copy & paste the dogeza, the full kneeling bow of a serious apology.",
    body: [
      "Dogeza (土下座) is the Japanese gesture of kneeling and bowing until your forehead nears the floor — the most earnest possible apology or plea. The kaomoji _(._.)_ captures it: a small bowed head between two arms pressed to the ground.",
      "Use it to say sorry with real weight, to beg a favour, or — just as often — for comic over-the-top contrition (“forgot the milk again _(._.)_”). It’s a cousin of the gratitude bow m(_ _)m.",
    ],
    faqs: [
      { q: "What does dogeza mean?", a: "Dogeza is a Japanese form of bowing performed kneeling on the ground, used for the most sincere apologies or earnest requests. As a kaomoji, _(._.)_ shows that deep, head-to-the-floor bow." },
    ],
  },
  "thank-you": {
    lead: "m(_ _)m — copy & paste the bowing thank-you kaomoji, the polite Japanese-style bow of gratitude.",
    body: [
      "m(_ _)m shows a head lowered in a respectful bow, the two “m” shapes reading as hands placed down on either side. In Japanese chat it’s the everyday way to say thank you, please, or sorry with sincerity.",
      "It’s warmer and more deferential than a plain “thanks” — good for genuine gratitude, polite requests, or apologising for the trouble. The deeper, kneeling version is the dogeza _(._.)_.",
    ],
    faqs: [
      { q: "What does m(_ _)m mean?", a: "m(_ _)m is a bowing kaomoji used to say thank you, please or sorry politely. The lowered head between two hands signals respect and sincerity, like a small bow in text." },
    ],
  },
  "deal-with-it": {
    lead: "ヾ(⌐■_■)ノ♪ — copy & paste the “deal with it” sunglasses kaomoji and own the moment.",
    body: [
      "The ⌐■_■ in the middle is a pair of sunglasses sliding into place — the text version of the “deal with it” meme. Add the dancing arms and a ♪ and it becomes a full, unbothered victory strut.",
      "Use it when you’ve done something slightly outrageous and refuse to apologise, or to cap off a flex. It pairs naturally with the celebrate and cool faces.",
    ],
    faqs: [
      { q: "What does (⌐■_■) mean?", a: "(⌐■_■) is the “deal with it” kaomoji — the ⌐■_■ depicts sunglasses dropping onto the face. It signals cool, unbothered confidence, often after a bold or cheeky move." },
    ],
  },
  "table-flip": {
    lead: "(╯°□°)╯︵ ┻━┻ — copy & paste the table flip and its variants for peak dramatic rage.",
    body: [
      "The table flip is rage made visible: a furious figure on the left, the ︵ arc of motion, and the ┻━┻ tabletop sent flying. It’s the most theatrical way to register that you are Done — whether you mean it or you’re being a drama queen on purpose.",
      "Because frustration shows up everywhere, the flip crosses categories — the classic angry (ノಠ益ಠ)ノ彡┻━┻, a bear flipping its table, and more. When you’ve calmed down, the counterpart puts it back: ┬─┬ノ( º _ ºノ).",
    ],
    faqs: [
      { q: "How do I type the table flip (╯°□°)╯︵ ┻━┻?", a: "It’s several characters including the ┻━┻ table, so it’s far easier to copy than to type. Tap any flip above and paste it whole — Discord, Twitch, texts and docs all keep the table intact." },
      { q: "How do you put the table back?", a: "The “calm down” counterpart is ┬─┬ノ( º _ ºノ) — a figure setting the table upright again. It’s the traditional reply to a table flip." },
    ],
  },

  // ── High-intent cross-category tags (the cross-cut is the point) ────────
  heart: {
    lead: "From a quiet ♡ to sparkling love spells — copy & paste heart kaomoji across love, magic and décor.",
    body: [
      "“Heart” cuts across the whole site, which is exactly why it has its own page: the soft in-love faces of the love category, the ✩-trailing sparkle-hearts from magic, and the ♡-bordered decorative pieces all gather here in one place.",
      "Whether you want a gentle ♡(｡- ω -｡), a starry-eyed (♥ω♥), or a heart you can tuck into a bio or username, tap to copy and send a little affection.",
    ],
    faqs: [
      { q: "How do I copy a heart kaomoji?", a: "Tap any heart face above and it’s copied instantly — paste it into messages, captions, bios or comments. Right-click or long-press to save your favourites for next time." },
    ],
  },
  blush: {
    lead: "(⁄ ⁄•⁄ω⁄•⁄ ⁄) — copy & paste blushing kaomoji for that shy, flustered, caught-feelings glow.",
    body: [
      "Blush sits right where the love and embarrassed categories overlap — the warm fluster of being complimented, teased or hopelessly smitten. The faces use shaded cheeks ⁄ ⁄, hidden eyes (/ω＼) and bashful little smiles.",
      "Reach for one when you’re flattered, shy, or playing up an “oh stop it~” reaction. They’re softer than a plain 😊 and read as genuinely flustered.",
    ],
    faqs: [
      { q: "What is a blushing kaomoji?", a: "A blushing kaomoji shows shy embarrassment or affection, usually with shaded cheeks (the ⁄ ⁄ marks) or a hidden-face gesture like (/ω＼). It reads as flustered, bashful or caught-feelings." },
    ],
  },
  party: {
    lead: "ヽ(>∀<☆)ノ — copy & paste party kaomoji bursting with celebration, cheer and sparkle.",
    body: [
      "Party faces pull together the most jubilant energy on the site — the arms-up cheer of the happy and celebrate categories plus the ✧ and ☆ sparkle trails from magic. The result is text that genuinely looks like it’s celebrating.",
      "Use them for birthdays, wins, launches and good news — ☆*:.｡.o(≧▽≦)o.｡.:*☆ says “let’s go!” far better than a plain 🎉.",
    ],
    faqs: [
      { q: "What’s a good party or celebration kaomoji?", a: "Try ヽ(>∀<☆)ノ or ☆*:.｡.o(≧▽≦)o.｡.:*☆ — raised arms plus stars and sparkles read as pure celebration. Tap to copy and drop one into a birthday message or a “we did it!” announcement." },
    ],
  },
  kiss: {
    lead: "(づ￣ ³￣)づ — copy & paste kiss kaomoji, from sweet pecks to blown ❤ kisses.",
    body: [
      "Kiss faces blend the love and actions categories — some lean in for a ³ pucker, others reach out (づ…)づ to plant one or blow a heart across the screen. It’s affection with a little motion in it.",
      "Send one to a partner, a close friend, or to sign off a message with warmth. Pair them with the heart and blush faces for full soft-mode.",
    ],
    faqs: [
      { q: "What does (づ￣ ³￣)づ mean?", a: "(づ￣ ³￣)づ is a kiss kaomoji — the ³ is puckered lips and the づ arms reach in for the kiss or hug. It’s a sweet, affectionate way to send a peck in text." },
    ],
  },
  wave: {
    lead: "ヾ(＾∇＾) — copy & paste waving kaomoji for hellos, goodbyes and friendly greetings.",
    body: [
      "Waving faces span the greetings, happy and animals categories — a cheerful ヾ(＾∇＾) hello, a (＾▽＾)/ raised hand, even a little bear waving you off. The /-shaped or ヾ arm is the wave.",
      "Use them to open a message warmly or sign off without it feeling abrupt — a wave reads friendlier than a full stop.",
    ],
    faqs: [
      { q: "What kaomoji means hello or goodbye?", a: "A waving kaomoji like ヾ(＾∇＾) or (＾▽＾)/ works for both — the raised hand reads as “hi!” at the start of a message and “bye!” at the end. Tap to copy one." },
    ],
  },
  hug: {
    lead: "(づ｡◕‿‿◕｡)づ — copy & paste hug kaomoji to send a warm squeeze to anyone.",
    body: [
      "The hug spans happy, love, animals and actions — open づ…づ arms reaching out for a squeeze, from a beaming (づ｡◕‿‿◕｡)づ to a little bear offering one. It’s comfort you can paste.",
      "Send it when someone needs support, to celebrate with a friend, or to make a goodnight message a bit warmer.",
    ],
    faqs: [
      { q: "What does (づ｡◕‿‿◕｡)づ mean?", a: "It’s a hug kaomoji — the づ shapes are open arms reaching out to embrace. Send it to offer comfort, affection or a friendly squeeze in chat." },
    ],
  },
  sparkles: {
    lead: "(ﾉ´ヮ`)ﾉ*:･ﾟ✧ — copy & paste sparkle kaomoji to add a little ✧ shine to anything.",
    body: [
      "Sparkles run through the happy, magic, actions and celebrate categories — the *:･ﾟ✧ and ✧･ﾟ trails that make a face look like it’s casting a tiny spell or presenting something with a flourish.",
      "Use them to add emphasis, glamour or a “ta-da” to a message, or as standalone decoration around text in a bio. ✧ instantly makes plain words feel special.",
    ],
    faqs: [
      { q: "How do I make sparkle text like *:･ﾟ✧?", a: "Copy it — tap a sparkle kaomoji above and the whole *:･ﾟ✧ trail pastes as text. Wrap it around a word or name in a bio to give it a little shine, no special keyboard needed." },
    ],
  },
  "middle-finger": {
    lead: "凸(｀△´＋) — copy & paste the middle-finger kaomoji to flip someone off in text.",
    body: [
      "The 凸 character is a raised middle finger, paired here with a range of irritated faces from the angry, actions and fighting categories — from a grumpy 凸( ̄ヘ ̄) to a double-barrelled 凸(｀∀´)凸.",
      "It’s the cheeky, text-safe way to tell someone where to go — rude enough to land, mild enough to stay funny among friends.",
    ],
    faqs: [
      { q: "What does 凸 mean in a kaomoji?", a: "The 凸 symbol represents a raised middle finger. In a kaomoji like 凸(｀△´＋) it’s used to flip someone off jokingly in text — rude, but in a playful, meme-y way." },
    ],
  },

  // ── Batch 2: more cross-category high-intent tags ───────────────────────
  uwu: {
    lead: "(✿◠‿◠) — copy & paste uwu kaomoji for that soft, content, melt-into-a-puddle cuteness.",
    body: [
      "“uwu” is the face of pure soft contentment — happy little closed eyes and a small smile, the look of being adored or adoring something. It draws on the happy, love and kawaii categories at once, which is why it lives on its own page rather than inside any one of them.",
      "Use it when something is too wholesome to handle, to be affectionately silly, or to soften a message into a hug. Its more wide-eyed sibling is owo.",
    ],
    faqs: [
      { q: "What does uwu mean?", a: "uwu represents a soft, happy, affectionate face — closed smiling eyes (the u’s) and a little mouth (w). It signals adoration, cosiness or wholesome cuteness, like (✿◠‿◠)." },
    ],
  },
  owo: {
    lead: "(✿◠‿◠) — copy & paste owo kaomoji for that wide-eyed, curious, “what’s this?” cuteness.",
    body: [
      "Where uwu is sleepy-content, owo is alert and curious — round open eyes (the o’s) catching sight of something interesting. The faces here pull from happy, love and kawaii for that bright, surprised-but-delighted look.",
      "Reach for it when you spot something exciting, react with playful intrigue, or want a cuter version of “oh?”.",
    ],
    faqs: [
      { q: "What’s the difference between owo and uwu?", a: "Both are cute text faces. uwu has closed, content eyes (soft and happy); owo has wide open eyes (curious or surprised). owo is the “ooh, what’s this?” face; uwu is the cosy, adoring one." },
    ],
  },
  mad: {
    lead: "(╬ಠ益ಠ) — copy & paste mad kaomoji, from a grumpy huff to full incandescent rage.",
    body: [
      "Mad spans the angry and fighting categories — gritted (｀Д´) frustration, the throbbing-vein 益 of (╬ಠ益ಠ), and arms-up ヽ(`Д´)ﾉ fury. Unlike the cold, deadpan look of disapproval, these faces are hot, loud and animated.",
      "Use them to vent, to be dramatically furious on purpose, or to react to something genuinely infuriating. When you tip fully over the edge, there’s always the table flip.",
    ],
    faqs: [
      { q: "What is an angry kaomoji?", a: "An angry or mad kaomoji shows rage with tense eyes, a gritted mouth, or the 益 “bulging vein” symbol — for example (╬ಠ益ಠ) or ヽ(`Д´)ﾉ. Tap to copy one and register your displeasure." },
    ],
  },
  strong: {
    lead: "ᕙ(⇀‸↼‶)ᕗ — copy & paste strong, flexing, muscle kaomoji to show off some power.",
    body: [
      "The flex faces — ᕙ(⇀‸↼‶)ᕗ and ᕦ(ò_óˇ)ᕤ — bend their arms into bulging biceps. They cut across the actions and fighting categories (with a stubborn, never-give-up streak from tired), so they earn a page of their own.",
      "Use them for gym energy, a “we’ve got this”, or to celebrate powering through something hard. For the fists-clenched, eyes-locked version, see determined.",
    ],
    faqs: [
      { q: "What kaomoji means strong or flexing?", a: "Faces like ᕙ(⇀‸↼‶)ᕗ and ᕦ(ò_óˇ)ᕤ use bent ᕙ ᕗ arms to mime flexed muscles — the kaomoji for strength, working out, or “I’ve got this.” Tap to copy." },
    ],
  },
  determined: {
    lead: "(ง •̀_•́)ง — copy & paste determined kaomoji for game-face, fired-up, let’s-do-this energy.",
    body: [
      "Determined is the raised-fists ง…ง stance with locked, focused eyes — resolve rather than raw muscle. It bridges the actions and fighting categories: ready to start, refusing to quit.",
      "Drop one before a challenge, to hype yourself or a friend up, or to say “I’m on it”. The pure-power cousin is strong.",
    ],
    faqs: [
      { q: "What kaomoji shows determination?", a: "(ง •̀_•́)ง — raised fists and a focused stare — is the classic determined kaomoji. It reads as “let’s do this,” motivation or readiness for a challenge." },
    ],
  },
  dance: {
    lead: "ヽ(^o^)ノ — copy & paste dancing kaomoji that groove across chat with a ♪ in tow.",
    body: [
      "Dance faces are some of the liveliest on the site, pulling together the actions, music and celebrate categories — swaying arms, kicking ┌(┌^o^)┐ legs, and trailing ♪ notes.",
      "Use them to celebrate, to set a party mood, or just to vibe when a good song comes on. They pair perfectly with the party and music faces.",
    ],
    faqs: [
      { q: "What’s a good dancing kaomoji?", a: "Try ヽ(^o^)ノ or ♪┏(・o･)┛ — swinging arms plus a ♪ music note read as dancing. Tap to copy one and drop it into a celebration or a “this song slaps” message." },
    ],
  },
  confused: {
    lead: "(・・ ) ? — copy & paste confused kaomoji for every “huh?”, “wait, what?” and tilted-head moment.",
    body: [
      "Confused faces blend the surprised and thinking categories — wide (@_@) spirals, a tilted (・・ ) ? glance, and trailing question marks （？_？）. They capture the gap between “I don’t get it” and “let me work this out”.",
      "Use one when something makes no sense, to ask “wait, what?”, or to react to a plot twist.",
    ],
    faqs: [
      { q: "What kaomoji means confused?", a: "A confused kaomoji uses dizzy eyes or question marks to show puzzlement — like (・・ ) ? or （？_？）. It reads as “huh?” or “I don’t understand.” Tap to copy." },
    ],
  },
  sleepy: {
    lead: "(－_－) zzZ — copy & paste sleepy kaomoji for tired, drowsy, goodnight-time moods.",
    body: [
      "Sleepy faces droop their eyes shut and trail zzZ off to one side. They sit across the tired and animals categories — including a few dozing critters — for every shade of worn-out and ready-for-bed.",
      "Send one to say goodnight, to admit you’re exhausted, or to react to something dull. For wired-awake energy instead, see the excited and party faces.",
    ],
    faqs: [
      { q: "What kaomoji means sleepy or tired?", a: "A sleepy kaomoji has closed or half-closed eyes and often a zzZ trail — for example (－_－) zzZ. It signals tiredness, drowsiness or “goodnight.” Tap to copy." },
    ],
  },
  excited: {
    lead: "☆*:.｡.o(≧▽≦)o.｡.:*☆ — copy & paste excited kaomoji bursting with hyped, can’t-wait energy.",
    body: [
      "Excited faces crank everything up — squeezed-shut ≧▽≦ eyes, thrown-up arms and a shower of ✧ sparkles. They span the happy and decorated categories, which is what gives them that extra-glittery, over-the-top intensity.",
      "Use them for big news, countdowns, fandom hype, or anything you genuinely can’t wait for. Dial it down with the plain happy faces or up with party.",
    ],
    faqs: [
      { q: "What’s the most excited kaomoji?", a: "Faces like ☆*:.｡.o(≧▽≦)o.｡.:*☆ and (*≧ω≦) combine scrunched happy eyes with sparkles for maximum hype — the go-to for “I can’t wait!” Tap to copy one." },
    ],
  },
};

export const getTagContent = (slug) => tagContent[slug] || null;
