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
  shy: {
    lead: "Shy kaomoji — bashful, hiding faces for that quietly-overwhelmed, don't-look-at-me feeling.",
    body: [
      "Shy kaomoji have a quality of retreating: eyes averted, hands covering the face, cheeks warm. (/ω＼) hides behind its hands; (〃￣ω￣〃)ゞ looks away with a sheepish scratch; (>///<) squeezes its eyes shut from the embarrassment. They're the quiet, inward version of a blush.",
      "Use them for moments of sweet embarrassment — when someone says something that makes you want to disappear a little, when you're caught being earnest, or when the affection is just a bit too much.",
    ],
    faqs: [
      { q: "What is the shy kaomoji?", a: "(/ω＼) is the classic shy face — hands raised to hide the face, eyes closed or averted. (>///<) is another popular version with squeezed eyes. Both read immediately as bashful or overwhelmed." },
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

  // -- Please / apology group -------------------------------------------------
  please: {
    lead: "Pleading and begging kaomoji — bowed heads and outstretched arms for when only a heartfelt ask will do.",
    body: [
      "Japanese culture has a specific gesture for earnest pleading: hands pressed together, head bowed. These please kaomoji capture exactly that — figures dropping to their knees m(_ _)m, arms raised in supplication (ﾉ*’ω’*)ﾉ, or prostrating fully. The physical vocabulary of a sincere ask, rendered in text.",
      "Use them when a joke won’t land, when you genuinely need something, or when the dramatic overstatement of a full-body bow is the funniest possible reply.",
    ],
    faqs: [
      { q: "What does m(_ _)m mean?", a: "m(_ _)m is a kaomoji of someone bowing with both hands flat on the floor — the Japanese dogeza posture for the most sincere please or thank-you. The m’s are the hands pressed down, the underscores form the bowed arms." },
      { q: "Which kaomoji means please in Japanese?", a: "m(_ _)m is the most common please kaomoji, mimicking the deep dogeza bow. You’ll also see (*_ _)人 (hands pressed together) and (人*´∀｀)。*ﾟ+ for a more hopeful, cheerful please." },
    ],
  },
  sorry: {
    lead: "Sorry kaomoji — bowed heads and regretful poses for apologies big and small.",
    body: [
      "When words feel insufficient, a sorry kaomoji carries the weight you need. The same bowing forms used for please — m(_ _)m, m(TωT)m, _(._.)_ — become apologies when the context shifts. The body language of remorse reads the same in any language.",
      "Choose a tearful variant like m(TωT)m for something serious, or the cleaner m(_ _)m for formal contrition without drama. All copy in one tap.",
    ],
    faqs: [
      { q: "What kaomoji means sorry?", a: "m(_ _)m is the classic sorry kaomoji — a deep bow with hands flat on the floor. For a more emotional apology try m(TωT)m (bowing with a crying face) or (´；ω；｀)m (teary-eyed bow)." },
    ],
  },
  apology: {
    lead: "Apology kaomoji — full-body bowing poses that show remorse rather than just stating it.",
    body: [
      "An apology kaomoji does what a typed “sorry” can’t: it shows the posture of remorse. These characters bow forward, press hands to the floor, and lower their heads — the physical grammar of contrition spanning Japanese and internet culture alike.",
      "Whether you reach for the austere m(_ _)m or the tearful m(TωT)m depends on how deep the offence. Either way, the receiver sees a body in genuflection rather than a word on a screen.",
    ],
    faqs: [
      { q: "How do I type an apology kaomoji?", a: "m(_ _)m is the most recognised but fiddly to type by hand — the brackets, underscores and spaces must be exact. Tap it above to copy it instantly. For the tearful version, copy m(TωT)m the same way." },
    ],
  },
  bow: {
    lead: "Bowing kaomoji — respectful, pleading and thankful poses rooted in Japanese bow culture.",
    body: [
      "The bow is the Swiss Army knife of Japanese non-verbal communication: greeting, gratitude, apology, plea — all at different depths. These kaomoji render the full range, from the shallow nod of (*・ω・)ﾉ to the full prostration of m(_ _)m, hands on the floor.",
      "On the internet, bowing kaomoji most often mean please or sorry — the depth signals the weight of the ask or sincerity of the apology. _(._.)_ is the extreme: the dogeza, forehead-to-floor bow.",
    ],
    faqs: [
      { q: "What is a bowing kaomoji?", a: "A bowing kaomoji shows a figure bending forward — from a light bow-and-wave like (*・ω・)ﾉ to the full dogeza like m(_ _)m where the person is kneeling with hands pressed to the ground." },
    ],
  },

  // -- Sad / cry group --------------------------------------------------------
  sad: {
    lead: "Sad kaomoji — drooping faces and quiet expressions for every low mood that words can’t quite reach.",
    body: [
      "Sadness in kaomoji is almost always in the eyes: downturned arcs (╥_╥), watery dots (T_T), or the heavy-lidded look of someone who has given up (。-_-。). Japanese emoticons capture the quieter, more resigned face of grief rather than a dramatic wail.",
      "Use them to acknowledge someone’s bad day, express your own low mood, or commiserate. The gentle sadness of (´；ω；｀) lands softer than a blunt “I’m sad”, and (ノД｀) can make light of mild disappointment.",
    ],
    faqs: [
      { q: "What is the sad kaomoji face?", a: "(╥_╥) is one of the most recognisable — the X-shaped tear streaks under the eyes sell the sadness immediately. (T_T) is the classic: T’s read as weeping eyes. Both copy in one tap." },
    ],
  },
  cry: {
    lead: "Crying kaomoji — tears streaming down every kind of sad face, from gentle weeping to full ugly-cry.",
    body: [
      "The T in (T_T) stands for tears — two eyes flowing downward, built into the face itself. It’s the template for every crying kaomoji: (;_;), (╥_╥), (ノД｀). The more elaborate ones add a collapsing posture for the full ugly-cry experience.",
      "Copy one for heartfelt sympathy, comic despair over minor inconveniences, or the reply that needs no caption. (ノД｀) is the sob; (T_T) is the quiet weep; (╥_╥) is the streaming-tears face.",
    ],
    faqs: [
      { q: "What is the crying kaomoji?", a: "(T_T) is the original — the T’s are eyes with tears falling straight down. (;_;) is the closed-eye version. For more drama: (ノД｀) shows someone collapsing in a sob." },
    ],
  },
  crying: {
    lead: "Crying kaomoji — all the weeping faces, from a single tear to a full-body breakdown.",
    body: [
      "Crying kaomoji range from delicate — a single tear-dot — to catastrophic, with the whole figure slumping. (T_T), (;_;), and (╥_╥) are the core trio: immediate, readable, and universally understood as “this is sad” or “I am broken about this minor thing.”",
      "The best thing about a crying kaomoji is the ambiguity: it can mean genuine grief or ridiculous over-reaction to spilled coffee, depending on context.",
    ],
    faqs: [
      { q: "Which kaomoji shows crying?", a: "(T_T) and (;_;) are the classics — eyes shaped like teardrops in motion. (ノД｀) adds a collapsing body for maximum pathos. All are one tap to copy." },
    ],
  },
  tears: {
    lead: "Tear kaomoji — weeping faces with visible tears for sympathy, sadness or melodrama.",
    body: [
      "Tears in kaomoji are visual: the T’s of (T_T), the semicolons of (;_;), the X-marks of (╥_╥). Each renders a different crying face — quiet, streaming, ugly. The teardrop characters make the emotion unmistakable without a single word.",
      "Pair a tears kaomoji with nothing else and it says everything. Or pair it with a relatable sentence to amplify the pathos.",
    ],
    faqs: [
      { q: "What kaomoji has tears?", a: "(T_T) has the most iconic tears — the T shape reads instantly as streaming eyes. (╥_╥) uses X marks to show tear-streaks. (;_;) gives closed, leaking eyes." },
    ],
  },

  // -- Animal group -----------------------------------------------------------
  animal: {
    lead: "Animal kaomoji — cats, bears, bunnies and more built from text characters, ready to copy.",
    body: [
      "Animal kaomoji take the basic kaomoji grammar — two eyes, a nose or mouth — and add creature-specific details. Cats get pointy ears and whisker lines (=^･ω･^=); bears get round snouts ʕ•ᴥ•ʔ; bunnies get tall ear strokes. The character work is precise enough that you know the animal immediately.",
      "They read as cute in almost every context without the tonal ambiguity of a face emoticon. Nobody misreads ʕ•ᴥ•ʔ as sarcastic.",
    ],
    faqs: [
      { q: "What are animal kaomoji?", a: "Animal kaomoji use text characters to draw recognisable creatures — bears like ʕ•ᴥ•ʔ, cats like (=^･ω･^=), and more. They replace the human face with an animal shape." },
    ],
  },
  cat: {
    lead: "Cat kaomoji — pointy ears, whisker lines and (=^･ω･^=) energy, one tap to copy.",
    body: [
      "Cat kaomoji are built around the ears: ^ or ∧ marks sitting above the eyes give the instant feline silhouette. The range goes from sleepy (ๅ^&#x2022;ẍ&#x2022;^ๅ) to alert (=^･ω･^=) to grumpy.",
      "They’re the kaomoji equivalent of sending a cat photo — universally disarming. Use them as reactions, as signatures, or whenever you want to communicate in pure cat energy.",
    ],
    faqs: [
      { q: "What is a cat kaomoji?", a: "Cat kaomoji use characters like ^ for ears and ω for a cat’s open mouth. (=^･ω･^=) is the most classic — pointy ears, round eyes, cat face." },
      { q: "What does (=^･ω･^=) mean?", a: "It’s a cat face kaomoji — the = signs are ears, ^’s frame the face, ･ω･ is the nose and wide mouth. It reads as a content or curious cat." },
    ],
  },
  bear: {
    lead: "Bear kaomoji — soft, round ʕ•ᴥ•ʔ faces built from text characters, ready to copy anywhere.",
    body: [
      "ʕ•ᴥ•ʔ is the original bear kaomoji: the ʕ and ʔ are the bear’s paws/arms, the •ᴥ• is the classic bear muzzle. It spread widely in the early 2010s and remains one of the most immediately recognisable kaomoji.",
      "The extended bear family includes waving bears ʕ•ᴥ•ʔﾉ, hugging bears ʕっ•ᴥ•ʔっ, sleepy bears ʕ◞ᴥ◟ʔ, and the rage-flip ʕノ•ᴥ•ʔノ ► ┻━┻. One tap copies whichever mood you need.",
    ],
    faqs: [
      { q: "What does ʕ•ᴥ•ʔ mean?", a: "ʕ•ᴥ•ʔ is a bear kaomoji — the ʕ and ʔ are the bear’s arms/paws, and •ᴥ• is the bear’s face with a characteristic muzzle shape. One of the most popular animal kaomoji on the internet." },
    ],
  },
  teddy: {
    lead: "Teddy bear kaomoji — the soft ʕ•ᴥ•ʔ family, from hugs to sleepy flops.",
    body: [
      "The teddy bear kaomoji cluster all traces back to ʕ•ᴥ•ʔ — warm, rounded, immediately comforting. Variations add arms (ʕっ•ᴥ•ʔっ for a hug), a wave (ʕ•ᴥ•ʔﾉ), or a sleepy slump (ʕ◞ᴥ◟ʔ). Each is the same bear in a different mood.",
      "Send them when you want to communicate softness without words — a virtual hug, a greeting, a gentle reaction.",
    ],
    faqs: [
      { q: "What is the teddy bear kaomoji?", a: "ʕ•ᴥ•ʔ is the standard teddy bear kaomoji. ʕっ•ᴥ•ʔっ reaches its arms forward for a hug. ʕ◞ᴥ◟ʔ is the sleepy variant with drooping eyes." },
    ],
  },
  kitty: {
    lead: "Kitty kaomoji — small, soft cat faces to copy & paste for any cute or playful moment.",
    body: [
      "Kitty kaomoji are the cuter, rounder end of the cat spectrum — less angular, more snuggly. Characters like ๅ^&#x2022;ẍ&#x2022;^ๅ emphasise the soft, pawsy, kitten-energy side of cat emoticons.",
      "They work as reactions to anything adorable, as greetings, or just as a standalone expression of kitten vibes. No caption needed.",
    ],
    faqs: [
      { q: "What is the kitty kaomoji?", a: "Kitty kaomoji like ๅ^&#x2022;ẍ&#x2022;^ๅ use paw characters and soft cat-face shapes to render a cute, cosy cat. They’re the kawaii end of the cat kaomoji spectrum." },
    ],
  },
  neko: {
    lead: "Neko kaomoji — Japanese cat emoticons (neko = 猫) for all your feline text needs.",
    body: [
      "Neko (猫) is simply Japanese for cat, and neko kaomoji are the cat emoticons from that tradition — pointy-eared, whisker-lined, immediately cute. (=^･ω･^=) and ๅ^&#x2022;ẍ&#x2022;^ๅ are the heavy hitters.",
      "In anime and manga fandom, “neko” also refers to catgirl/catboy characters — so neko kaomoji pull double duty as cat faces and as fandom shorthand.",
    ],
    faqs: [
      { q: "What does neko mean in kaomoji?", a: "Neko (猫) means cat in Japanese. Neko kaomoji are cat-shaped emoticons like (=^･ω･^=). In fandom contexts “neko” can also mean cat-eared anime characters." },
    ],
  },
  meow: {
    lead: "Meow kaomoji — cat faces mid-sound, the text equivalent of a cat making noise at you.",
    body: [
      "Meow kaomoji are cat faces with an open-mouth or vocalising quality — the ω in (=^･ω･^=) doubles as a mouth mid-meow. Use them as a non-sequitur reaction, a playful greeting, or any time you want to communicate in pure cat.",
      "They’re the same cat emoticons but used as a vocal reaction: a greeting, a demand for attention, a random noise.",
    ],
    faqs: [
      { q: "What kaomoji means meow?", a: "(=^･ω･^=) is the most common cat/meow kaomoji — the ω mouth gives it an open, vocalising look. ๅ^&#x2022;ẍ&#x2022;^ๅ is another popular option." },
    ],
  },

  // -- Love group -------------------------------------------------------------
  love: {
    lead: "Love kaomoji — hearts, blushes and romantic faces for crushing, confessing and everything between.",
    body: [
      "Love kaomoji span the whole range from shy glance to full heart-eyes overflow. (。♥‿♥。) is pure infatuation; (♥ω♥) is contented love; (づ￣ ³￣)づ reaches out for a kiss. The category pulls from happy, kawaii, and love to cover every shade of the feeling.",
      "They work in romantic contexts and equally well as hyperbolic affection for food, a show, or a friend’s joke — the internet’s loose use of “love” fully accommodated.",
    ],
    faqs: [
      { q: "What is the love kaomoji?", a: "(。♥‿♥。) is the most expressive love kaomoji — heart eyes, happy mouth, radiating affection. (♥ω♥) is softer and more contented. Both copy in one tap." },
    ],
  },
  hearts: {
    lead: "Heart kaomoji — faces overflowing with ♡ and ♥ for love, adoration and maximum cuteness.",
    body: [
      "Heart kaomoji integrate hearts into the face structure, making the emotion architectural. (♥ω♥) has hearts as eyes; (。♥‿♥。) radiates them; ٩(♡ε♡)۶ has a heart-shaped mouth. The whole face IS the love.",
      "Use them for affection both genuine and playful — “I love this song (♥ω♥)” works as well as “I love you (。♥‿♥。).” The heart grammar scales to any intensity.",
    ],
    faqs: [
      { q: "What kaomoji has a heart?", a: "(♥ω♥) uses hearts as eyes. (♡∀♡) has heart eyes and a wide happy mouth. (。♥‿♥。) is perhaps the most heart-saturated — hearts for eyes and a heart curve in the mouth." },
    ],
  },
  "heart-eyes": {
    lead: "Heart-eyes kaomoji — love-struck faces where the hearts ARE the eyes.",
    body: [
      "Heart-eyes kaomoji make the infatuation literal: instead of round eyes, the character looks at you with ♥ or ♡. (。♥‿♥。) is the classic; (♥ω♥) softens it into contentment; (●♡∀♡) adds chubby cheeks to the heart-eyed look.",
      "Use them for anything you’re enthusiastically into — a person, a meal, a piece of media. The heart-eyes face communicates instant, unconditional approval.",
    ],
    faqs: [
      { q: "What is the heart-eyes kaomoji?", a: "(。♥‿♥。) and (♥ω♥) are the classic heart-eyes kaomoji — the ♥ characters replace the normal eyes so the face is literally looking at you with love." },
    ],
  },
  "in-love": {
    lead: "In-love kaomoji — dreamy, heart-eyed faces for crushes, infatuation and wholesome romance.",
    body: [
      "In-love kaomoji have a dreamy, floaty quality — (。♥‿♥。) looks slightly dazed with affection; (♡∀♡) is wide-eyed with delight. They’re the emoticon equivalent of heart-shaped pupils in anime: unmistakably smitten.",
      "Perfect for declaring love of any intensity — from “I’m obsessed with this coffee” to something more sincere. The form is the same; the context does the work.",
    ],
    faqs: [
      { q: "Which kaomoji means being in love?", a: "(。♥‿♥。) is the most in-love-looking kaomoji — heart eyes, soft smile, the whole dreamy package. (♡∀♡) is slightly more excitable in-love energy." },
    ],
  },
  hugs: {
    lead: "Hug kaomoji — arms-out, reaching figures for virtual embraces when you can’t be there.",
    body: [
      "Hug kaomoji reach their arms forward — (づ￣ ³￣)づ and ʕっ•ᴥ•ʔっ both stretch out toward the receiver, making the embrace visual. Bear variants add softness; human ones add warmth.",
      "Send them for comfort, for affection, for greeting someone you haven’t seen, or for any message that needs physical warmth that words alone can’t provide.",
    ],
    faqs: [
      { q: "What is the hug kaomoji?", a: "(づ￣ ³￣)づ is a classic hug kaomoji — arms stretched forward (the づ characters) with a soft expression. ʕっ•ᴥ•ʔっ is the bear-hug version." },
    ],
  },

  // -- Style / aesthetic group ------------------------------------------------
  aesthetic: {
    lead: "Aesthetic kaomoji — decorated, soft-styled text faces for a dreamy, art-forward vibe.",
    body: [
      "Aesthetic kaomoji are the ones that look like they belong in a lo-fi playlist thumbnail: delicately decorated, with flower petals ✿, sparkles ✧ and gentle curves replacing hard lines. They come from the softcore and vaporwave ends of internet visual culture.",
      "They work as profile decorations, message ornaments, or standalone vibes — pieces of text that are more about texture and mood than a specific emotion.",
    ],
    faqs: [
      { q: "What is an aesthetic kaomoji?", a: "Aesthetic kaomoji are ornate or decorated text faces — like (✿◠‿◠✿) or °✧₊* (๑•ᴗ•๑) *₊✧° — that prioritise a dreamy visual style over a specific emotion." },
    ],
  },
  kawaii: {
    lead: "Kawaii kaomoji — the cutest, most over-the-top adorable Japanese emoticons, ready to copy.",
    body: [
      "Kawaii (可愛い, “cute”) is a whole aesthetic in Japan — round, soft, pastel, non-threatening. Kawaii kaomoji lean into that: bigger eyes (◕ᴗ◕), rounder cheeks, decorative flourishes. They look like something from a sticker pack.",
      "Use them when you want to be maximally soft and cute — as reactions, greetings, or just decoration. They tend to read as wholesome regardless of context.",
    ],
    faqs: [
      { q: "What does kawaii mean in kaomoji?", a: "Kawaii (可愛い) means cute in Japanese. Kawaii kaomoji are the extra-cute subset of emoticons — round eyes, soft features, often with flowers or sparkles." },
    ],
  },
  cute: {
    lead: "Cute kaomoji — the softest, most adorable emoticons from animals to round-eyed faces.",
    body: [
      "Cute kaomoji are defined by softness: rounded characters, gentle expressions, minimal aggression. The eyes are wide (◕ᴗ◕), the mouths are small curves or dots, and the overall energy is “please protect this creature.”",
      "They’re versatile — cute kaomoji work as reactions to good news, a way to soften a message, or pure aesthetic filler when you want your text to feel friendlier.",
    ],
    faqs: [
      { q: "What is the cutest kaomoji?", a: "Highly subjective, but (◕‿◕✿), (。•́‿•̀。) and ʕ•ᴥ•ʔ are perennial favourites — the flower, the soft smile, and the bear." },
    ],
  },
  soft: {
    lead: "Soft kaomoji — gentle, rounded faces with a cosy, low-key sweetness.",
    body: [
      "Soft kaomoji are the muted, pastel end of the cute spectrum — not high-energy or sparkle-heavy, just quietly warm. (◍•ᴗ•◍), (´。• ᴘ •。｀) and ₍ᴐᴄƂᴄ₎ share a calm, tender quality.",
      "They pair well with soft messages — checking in on someone, a small expression of affection, a quiet “this is nice.” Less a statement, more a texture.",
    ],
    faqs: [
      { q: "What are soft kaomoji?", a: "Soft kaomoji are gentle, low-key cute faces — things like (◍•ᴗ•◍) and (´。• ᴘ •。｀) that have a quiet warmth rather than high-energy cuteness. Common in cosy internet spaces." },
    ],
  },
  wholesome: {
    lead: "Wholesome kaomoji — warm, kind-hearted faces for positivity, encouragement and gentle affection.",
    body: [
      "Wholesome kaomoji have a specific internet meaning: earnest, unironic warmth. No edge, no sarcasm — just (◝(⁰◿⁰)◜) open-armed positivity. They’re the antidote to a cynical timeline.",
      "Use them when you genuinely mean it: to cheer someone up, to celebrate a win, to say “I’m rooting for you” without it sounding hollow.",
    ],
    faqs: [
      { q: "What is a wholesome kaomoji?", a: "Wholesome kaomoji express genuine warmth and positivity — (◝(⁰◿⁰)◜) and (✿◠‿◠✿) are examples. They’re earnest rather than ironic, used in supportive, feel-good contexts." },
    ],
  },

  // -- Decoration group -------------------------------------------------------
  decoration: {
    lead: "Decoration kaomoji — ornate, sparkle-heavy text art for borders, dividers and visual flair.",
    body: [
      "Decoration kaomoji are less about emotion and more about texture: strings of ✧, ♪ and 彡 characters that make text look designed. They show up as dividers in long posts, as headers in social bios, and as visual punctuation between thoughts.",
      "They work best when the visual effect is the whole point — a row of sparkle-dots to mark a section break, an elaborate frame around a caption.",
    ],
    faqs: [
      { q: "What are decoration kaomoji used for?", a: "Decoration kaomoji like ✧･ﾟ: *✧･ﾟ:* are used as visual dividers, borders and ornaments in bios, long posts and messages. They’re text art for structure and style rather than emotion." },
    ],
  },
  decorated: {
    lead: "Decorated kaomoji — ornate, elaborate text faces heavy on sparkle, flourish and visual complexity.",
    body: [
      "Decorated kaomoji are the most visually dense in the set: ♪―――O (≧▽≦) O―――♪ has musical notes on both sides; ＼＼٩( 'ω' )۷／／ has double-slash energy arms. Built for maximum visual impact in a single line.",
      "Use them for big moments — announcements, celebrations, farewells — where a plain face would feel underwhelming.",
    ],
    faqs: [
      { q: "What are decorated kaomoji?", a: "Decorated kaomoji are ornate emoticons with extra characters for visual impact — musical notes, sparkles, elaborate arm gestures. ♪―――O (≧▽≦) O―――♪ is a classic example." },
    ],
  },
  glitter: {
    lead: "Glitter kaomoji — sparkling, shimmering text faces for glamour, excitement and extra energy.",
    body: [
      "Glitter kaomoji are all about the shimmer: ✧, ﾟ, * and ･ characters layered around a face or gesture. (ﾉ◕ワ◕)ﾉ*:･ﾟ✧ is the archetype — arms raised, glitter flying in every direction.",
      "Use them when the moment deserves more than a plain reaction: big announcements, celebrations, anything that benefits from a bit of visual excitement.",
    ],
    faqs: [
      { q: "What is the glitter kaomoji?", a: "(ﾉ◕ワ◕)ﾉ*:･ﾟ✧ is the classic glitter kaomoji — arms up and sparkles everywhere. ✧･ﾟ: *✧･ﾟ:* is the pure sparkle version with no face." },
    ],
  },
  sparkle: {
    lead: "Sparkle kaomoji — ✧ and ﾟ characters dancing around faces for magic-light moments.",
    body: [
      "Sparkle kaomoji use ✧, ﾟ and ✩ characters to create the visual impression of things catching light. They’re used for reactions to beautiful things, for a sense of magic or wonder, and as general-purpose “this is good” emphasis.",
      "A single ✧ beside a face changes the register. A string of sparkle characters turns any message into something a little more special.",
    ],
    faqs: [
      { q: "What is a sparkle kaomoji?", a: "Sparkle kaomoji include ✧･ﾟ: *✧･ﾟ:* (a pure sparkle string) and faces surrounded by sparkle characters. Used for magical, beautiful or exciting moments." },
    ],
  },
  star: {
    lead: "Star kaomoji — ★ and ☆ faces for wishing, dreaming and nighttime energy.",
    body: [
      "Star kaomoji use ★, ☆ and ✦ characters to evoke night skies, wishes and the sense of something special. ★彡 is the shooting star streaking by; (★^O^★) is a face lit up with star eyes; ☆*:.｡.o(≧▽≦)o.｡.:*☆ is pure celebration under a starry sky.",
      "The right choice for goals, wishes, night-owl messages, and anything that benefits from a sense of magic or aspiration.",
    ],
    faqs: [
      { q: "What is the star kaomoji?", a: "★彡 is the classic star kaomoji — a shooting star streaking in text. (★^O^★) has star-shaped eyes for a starry-eyed look. ☆彡 is the open-star variant." },
    ],
  },
  stars: {
    lead: "Stars kaomoji — constellations of ★☆ characters for nighttime vibes, magic and celebration.",
    body: [
      "Stars kaomoji multiply the single-star effect: faces surrounded by ★ and ☆ in orbit, strings of stars trailing behind a gesture. ☆*:.｡.o(≧▽≦)o.｡.:*☆ surrounds a beaming face with an entire starfield.",
      "Use them for celebrations, night-themed messages, wishing someone luck, or any moment that calls for a sense of scale and wonder.",
    ],
    faqs: [
      { q: "What kaomoji uses stars?", a: "ヽ(>∀<☆)ﾉ has a star in hand; ☆*:.｡.o(≧▽≦)o.｡.:*☆ surrounds a happy face with stars; ★彡 is the shooting-star streak." },
    ],
  },
  "shooting-star": {
    lead: "Shooting star kaomoji — ★彡 and ☆彡 streaking across your text for wishes and wonder.",
    body: [
      "★彡 and ☆彡 are minimalist masterpieces: the ★ or ☆ is the star, the 彡 character gives the motion trail. Together they read instantly as a shooting star in flight.",
      "Use them to signal a wish, a fleeting beautiful thing, or just add a streak of night-sky energy to a message. Short, sharp, unmistakable.",
    ],
    faqs: [
      { q: "What does ★彡 mean?", a: "★彡 is a shooting star kaomoji. The ★ is the star; the 彡 character creates the visual motion trail behind it. ☆彡 is the hollow-star version. Both copy in one tap." },
    ],
  },
  twinkle: {
    lead: "Twinkle kaomoji — flickering ✧ and ✩ characters for starlight and sparkling moments.",
    body: [
      "Twinkle kaomoji capture the visual pulse of a star — ✧, ✩ and ‧₊˚✩彡 suggest light that shimmers rather than burns steady. They’re softer than full sparkle, more atmospheric.",
      "Use twinkle kaomoji for dreamy, gentle moments: a soft compliment, a quiet “you’re special”, a night-sky caption.",
    ],
    faqs: [
      { q: "What is a twinkle kaomoji?", a: "Twinkle kaomoji like ‧₊˚✩彡 and ✧･ﾟ: use small star and sparkle characters to suggest flickering starlight. The quieter, softer version of sparkle kaomoji." },
    ],
  },

  // -- Happy / celebration group ----------------------------------------------
  happy: {
    lead: "Happy kaomoji — bright, smiling faces for good moods, good news and everyday joy.",
    body: [
      "Happy kaomoji are the baseline of the form: upturned mouth curves (＾▽＾), wide-open eyes, raised arms. (＾▽＾) and (✿◠‿◠✿) are the workhorses — clear, immediate, impossible to misread as anything but joy.",
      "Use them as reactions to good news, as greetings, as a way to lighten a message. They work in any register because the emotion is direct: no irony, no ambiguity, just a happy face.",
    ],
    faqs: [
      { q: "What is the happy kaomoji?", a: "(＾▽＾) is one of the most classic happy kaomoji — wide happy eyes and a broad open smile. (✿◠‿◠✿) adds a flower for a softer, kawaii-adjacent happiness." },
    ],
  },
  yay: {
    lead: "Yay kaomoji — arms up, eyes wide, everything good — for wins big and small.",
    body: [
      "Yay kaomoji are the victory-lap end of happy: arms raised \\(^▽^)/, faces beaming, the whole figure celebrating. They’re for moments that deserve more than a thumbs-up — a finished project, unexpected good news, a personal win.",
      "They land as enthusiastic rather than hollow because the gesture is physical: the raised arms and open face. The excitement is built into the form.",
    ],
    faqs: [
      { q: "What kaomoji means yay?", a: "\\(^▽^)/ is the classic yay kaomoji — arms up and beaming face. ٩(^\\u203f^)۶ is a slightly more intense version." },
    ],
  },
  celebrate: {
    lead: "Celebration kaomoji — confetti energy in text form for every kind of win worth marking.",
    body: [
      "Celebration kaomoji are about visible, physical joy: arms raised, eyes bright, maybe some sparkle characters in orbit. ヾ(＾∇＾) and \\(★ω★)/ capture that “we did it” moment in text.",
      "They scale from subtle (a gentle raised-arm face) to full confetti-cannon (☆*:.｡.o(≧▽≦)o.｡.:*☆). Match the intensity to the occasion.",
    ],
    faqs: [
      { q: "What is a celebration kaomoji?", a: "Celebration kaomoji like ヾ(＾∇＾) and \\(★ω★)/ show a figure with arms up in a victory gesture. Used for wins, announcements and happy milestones." },
    ],
  },
  dancing: {
    lead: "Dancing kaomoji — figures in motion, spinning and swaying to an imagined beat.",
    body: [
      "Dancing kaomoji show movement in text: twisting postures, raised hands, the kinetic suggestion of a body in rhythm. ε=ε=ε=(ﾉ≧∀≦)ﾉ suggests speed and momentum; others are more serene in their swaying.",
      "Use them for any moment of musical joy, for celebrating in text, or for the pure expression of physical happiness that words don’t quite reach.",
    ],
    faqs: [
      { q: "What kaomoji means dancing?", a: "ε=ε=ε=(ﾉ≧∀≦)ﾉ suggests rapid dancing motion — the ε=ε= characters give the sense of speed and momentum. Other dancing kaomoji use raised arms and decorated characters for a more graceful sway." },
    ],
  },

  // -- Angry group ------------------------------------------------------------
  angry: {
    lead: "Angry kaomoji — furrowed brows, clenched faces and table-flip energy for every frustration level.",
    body: [
      "Angry kaomoji have a distinctive visual grammar: downturned brows (´Д｀), clenched teeth (╬ಠ益ಠ), and kanji like 益 and 皿 that suggest anger in their shapes. Japanese emoticons externalise anger through the face structure itself.",
      "They span from mild irritation (｀へ´) to full table-flip rage (ノಠ益ಠ)ノ彡┻━┻. Pick the level that matches your frustration — or deliberately overshoot for comic effect.",
    ],
    faqs: [
      { q: "What kaomoji means angry?", a: "(｀Д´) is a classic angry face — the backtick brow and wide open mouth read as shouting frustration. (╬ಠ益ಠ) is more intense. (ノಠ益ಠ)ノ彡┻━┻ adds the table flip." },
    ],
  },
  annoyed: {
    lead: "Annoyed kaomoji — the face you make when something is wrong but not worth a full angry.",
    body: [
      "Annoyed kaomoji live between calm and angry: a furrowed brow, a flat or gritted mouth, the general energy of “I can’t believe this.” (｀へ´) and (*｀ー´) are in this territory — not screaming, but definitely done.",
      "Use them for minor frustrations, sarcastic replies, and the kind of low-grade exasperation that a single sigh would cover in real life.",
    ],
    faqs: [
      { q: "What kaomoji means annoyed?", a: "(｀へ´) reads as mildly annoyed — brow furrowed, mouth tense but closed. (*｀ー´) has a colder, more withering quality. Both are pre-anger rather than full rage." },
    ],
  },
  furious: {
    lead: "Furious kaomoji — maximum anger energy with clenched faces and pure, sustained rage.",
    body: [
      "Furious kaomoji are past annoyed and past angry: (╬ಠ益ಠ) is at this level, with the 益 kanji visible in the face. ヽ(#｀Д´)ﾉ is shouting, arms waving. These are the faces for when “mad” isn’t strong enough.",
      "Use them for comic catharsis — the irony of deploying a furious kaomoji over trivial things is its own joke — or for genuine, maximum-intensity frustration.",
    ],
    faqs: [
      { q: "What kaomoji is furious?", a: "(╬ಠ益ಠ) is one of the most furious kaomoji — the 益 character expresses resentment/anger, making the rage literal. ヽ(#｀Д´)ﾉ adds flailing arms to the fury." },
    ],
  },
  rage: {
    lead: "Rage kaomoji — the table-flip tier of anger, with (ノ°Д°)ノ energy and ┻━┻ casualties.",
    body: [
      "Rage kaomoji are the top of the anger scale: everything has broken down, and a table may have been flipped. (ノಠ益ಠ)ノ彡┻━┻ became famous as the perfect expression of throwing up your hands at a broken system.",
      "They’re almost always used for comic effect — the extreme of the form makes the rage legible and funny at once.",
    ],
    faqs: [
      { q: "What kaomoji shows rage?", a: "(ノಠ益ಠ)ノ彡┻━┻ is the classic rage kaomoji — furious face flipping a table. ヽ(｀Д´)ﾉ is pure screaming rage without the table. (╬ಠ益ಠ) is a cold, seething version." },
    ],
  },

  // -- Cool / smug / unamused group -------------------------------------------
  cool: {
    lead: "Cool kaomoji — the Lenny face, sunglasses and sidelong looks for effortless composure.",
    body: [
      "Cool kaomoji have a swagger the other categories don’t: ( ͡° ͜ʖ ͡°) is all knowing smirk; (¬‿¬) is quietly smug; ヾ(⌐■_■)ﾉ♪ puts on sunglasses and doesn’t look back. They communicate attitude rather than emotion.",
      "Use them for a confident reply, a knowing comment, or any moment where the right response is a raised eyebrow rather than a smile.",
    ],
    faqs: [
      { q: "What is a cool kaomoji?", a: "Cool kaomoji include ( ͡° ͜ʖ ͡°) (the Lenny face), (¬‿¬) (smug) and ヾ(⌐■_■)ﾉ♪ (sunglasses-and-dance). They convey composure and a knowing quality." },
    ],
  },
  smug: {
    lead: "Smug kaomoji — the face that knows something you don’t, for winning arguments and quiet satisfaction.",
    body: [
      "Smug kaomoji are the knowing cousins of happy: not open-faced joy, but the closed, self-satisfied look of someone who was right. (¬‿¬) is the archetype — that slight curve is a smirk, not a smile. ( ͡° ͜ʖ ͡°) adds the eyebrow waggle.",
      "Use smug kaomoji when you called something correctly, when someone walked into exactly the situation you predicted, or when you want to project amused superiority.",
    ],
    faqs: [
      { q: "What is the smug kaomoji?", a: "(¬‿¬) is the classic smug face — sideways eyes and a subtle curve read as a self-satisfied smirk. ( ͡° ͜ʖ ͡°) takes it further with the waggling eyebrow." },
    ],
  },
  lenny: {
    lead: "( ͡° ͜ʖ ͡°) the Lenny face and its variants — copy the internet’s most suggestive raised eyebrow.",
    body: [
      "Lenny and lenny-face refer to the same thing: ( ͡° ͜ʖ ͡°), the Unicode combining-character face that spread in the early 2010s and never left. The ͡° eyes sit under arched brows and above a ͜ʖ smirk that implies exactly what you think it implies.",
      "Here you get the full Lenny family — winking, armed, sunglasses-clad. All copy instantly, combining characters intact.",
    ],
    faqs: [
      { q: "What is the Lenny face kaomoji?", a: "( ͡° ͜ʖ ͡°) is the Lenny face — built from Unicode combining characters to make a knowing, suggestive expression. It means “you know what I mean” or adds a mischievous tone." },
    ],
  },
  unamused: {
    lead: "Unamused kaomoji — flat, unimpressed faces for when you’re not buying it.",
    body: [
      "Unamused kaomoji have the flat affect of someone who has heard this joke before: ಠ_ಠ is the definitive unimpressed face; ⁊⁊⁊ does the same sidelong thing; (¬_¬) adds a slight squint. These are the faces of withering tolerance.",
      "Use them when enthusiasm is unwarranted, when a claim is dubious, or when you need to express mild-to-moderate scepticism without committing to full anger.",
    ],
    faqs: [
      { q: "What kaomoji is unamused?", a: "ಠ_ಠ is the most iconic unamused face — cold, flat, unblinking. (¬_¬) adds a squint of suspicion. 고_고 is the Korean-style version with the same energy." },
    ],
  },
  bored: {
    lead: "Bored kaomoji — flat, listless faces for when you’re over it and want everyone to know.",
    body: [
      "Bored kaomoji have a heavy, low-energy quality: eyes half-closed, mouth flat, the general posture of someone waiting too long. (-_-) is the reference form — lidded, deflated, done.",
      "They work for genuine ennui and for comic overstatement of mild tedium. “Another meeting that could have been an email (-_-)” is a perfectly deployed bored kaomoji.",
    ],
    faqs: [
      { q: "What kaomoji means bored?", a: "(-_-) is the standard bored face — flat eyes, no expression, zero enthusiasm. It reads immediately as low-energy indifference." },
    ],
  },

  // -- Greetings group --------------------------------------------------------
  hi: {
    lead: "Hi kaomoji — friendly waving faces for quick, warm greetings.",
    body: [
      "Hi kaomoji are upbeat and gestural: a hand raised, a face beaming, the whole figure mid-wave. ヽ(・∀・)ﾉ and ヾ(＾∇＾) are the archetype — short, energetic, impossible to misread as anything but a hello.",
      "Use them as a text greeting opener, as a way to signal your presence in a group chat, or as a stand-alone “hey” that’s warmer than the word itself.",
    ],
    faqs: [
      { q: "What kaomoji means hi?", a: "ヽ(・∀・)ﾉ is a classic hi kaomoji — an arm raised mid-wave with a happy face. (＾▽＾)/ is the simpler version. Both read immediately as a friendly greeting." },
    ],
  },
  hello: {
    lead: "Hello kaomoji — waving, open-faced greetings for messages that deserve a warm opening.",
    body: [
      "Hello kaomoji and hi kaomoji share the same set: arms-up or waving figures with beaming faces. ヾ(＾∇＾) and ( ´ ▽ ｀ )ﾉ are the softer, more welcoming end. (*^▽^)ﾉ and ヾ(*⌒ワ⌒*)ﾉ are more energetic. All work as openers.",
      "The difference between hi and hello is mostly register — hello can feel slightly more considered, but both are warm and immediate.",
    ],
    faqs: [
      { q: "What kaomoji means hello?", a: "ヾ(＾∇＾) is a friendly hello kaomoji — a raised arm and a happy face. ( ´ ▽ ｀ )ﾉ is a softer version. Both copy in one tap." },
    ],
  },

  // -- Music group ------------------------------------------------------------
  music: {
    lead: "Music kaomoji — dancing notes, singing faces and ♪ characters for all things musical.",
    body: [
      "Music kaomoji have ♪ and ♫ notes built into them — floating beside a figure or woven through a decoration. ♪―――O (≧▽≦) O―――♪ wraps a beaming face in a staff of notes. They signal singing, dancing, or just a good-vibes musical moment.",
      "Use them for sharing a song, for karaoke excitement, for anything that’s got you moving. The note characters do as much work as the face.",
    ],
    faqs: [
      { q: "What is a music kaomoji?", a: "Music kaomoji include ♪―――O (≧▽≦) O―――♪ (a happy face between musical notes) and singing faces with ♪ floating beside them." },
    ],
  },
  singing: {
    lead: "Singing kaomoji — open-mouthed, note-filled faces belting it out in text.",
    body: [
      "Singing kaomoji show a figure mid-song: mouth open, notes escaping, arms sometimes raised in performance. ♪―――O (≧▽≦) O―――♪ is the showstopper — full orchestral accompaniment implied. Lighter options show a face with a single ♪ floating beside it.",
      "Use them for karaoke nights, for sharing a song living rent-free in your head, or for any moment of spontaneous vocalisation.",
    ],
    faqs: [
      { q: "What is the singing kaomoji?", a: "♪―――O (≧▽≦) O―――♪ is the most elaborate singing kaomoji — a happy face framed by musical notes. Simpler versions just place a ♪ beside an open-mouthed or happy face." },
    ],
  },

  // -- Action / fight group ---------------------------------------------------
  flex: {
    lead: "Flex kaomoji — muscle-popping, arm-raising figures showing off their strength.",
    body: [
      "Flex kaomoji use arm-character tricks (ᕙ, ᕗ) to suggest biceps flexed. ᕙ(⇀‸↜‶)ᕗ is the purest form: both arms raised in a show of strength. They come from the fighting and actions categories, sharing raised-arm energy pointed at strength display.",
      "Use them for personal wins, for hype, or any “look at what I did” moment. Or just send one unprompted as a vibe.",
    ],
    faqs: [
      { q: "What kaomoji means flexing?", a: "ᕙ(⇀‸↜‶)ᕗ is the iconic flex kaomoji — the ᕙ and ᕗ characters form arms raised in a strong pose. ᕖ(ò_óˇ)ᕔ is the determined, fists-up version." },
    ],
  },
  fight: {
    lead: "Fight kaomoji — fists up and ready for a battle, real or imagined.",
    body: [
      "Fight kaomoji show a figure in a confrontational stance — fists raised, body forward, ready to go. (ง ͟° ͟ʖ͜ ͡°)ง is the most distinctive: a Lenny-variant face in a fighting stance.",
      "Use them for playful trash talk, for hyping yourself up before a challenge, or for comic over-commitment to something low-stakes.",
    ],
    faqs: [
      { q: "What is the fight kaomoji?", a: "(ง ͟° ͟ʖ͜ ͡°)ง is the classic fight kaomoji — a Lenny face with fists raised. ᕖ(ò_óˇ)ᕔ is the flex-into-fight variant." },
    ],
  },
  fighting: {
    lead: "Fighting kaomoji — combat stances and fists-up poses for hype, sparring and competitive energy.",
    body: [
      "Fighting kaomoji span from playful sparring to intense showdown energy. (ง ͡° ͜ʖ ͡°)ง channels the Lenny swagger into a fighting stance; (ง'̀-'́)ง is focused and ready; (•̀o•́)ง is the pre-match pump-up face.",
      "They’re widely used in gaming and competitive contexts — before a match, as a challenge, or after a win with fists still raised.",
    ],
    faqs: [
      { q: "What kaomoji is used for fighting?", a: "(ง ͡° ͜ʖ ͡°)ง and (ง'̀-'́)ง are the most-used fighting kaomoji — both show fists up and a ready stance. Common in gaming and competitive chat." },
    ],
  },
  muscle: {
    lead: "Muscle kaomoji — flexing, strong poses for gains, effort and physical achievement.",
    body: [
      "Muscle kaomoji use ᕙ and ᕗ arm characters to suggest biceps flexed at the viewer. ᕙ(⇀‸↜‶)ᕗ is the purest form: both arms raised. The determined face adds conviction — this isn’t an idle flex, it means it.",
      "Use them for workout posts, for celebrating physical or mental strength, or for that “I got through it” feeling after something difficult.",
    ],
    faqs: [
      { q: "What is the muscle kaomoji?", a: "ᕙ(⇀‸↜‶)ᕗ is the classic muscle kaomoji — the ᕙ and ᕗ characters function as raised, flexed arms. ᕖ(ò_óˇ)ᕔ adds a determined face to the flex." },
    ],
  },
  ready: {
    lead: "Ready kaomoji — fists up and expression set for whatever comes next.",
    body: [
      "Ready kaomoji show a figure braced: jaw set, hands raised, everything about them saying “bring it.” (ง •̀_•́)ง and (ง'̀-'́)ง have that energy — calm, focused, prepared.",
      "Use them to signal preparedness, to hype someone else up, or for the “I’ve got this” moment before something difficult.",
    ],
    faqs: [
      { q: "What kaomoji means ready?", a: "(ง •̀_•́)ง and ( •̀ᄇ• ́)﹫✧ are the classic ready kaomoji — determined faces with raised arms or a stance that reads as “let’s go.”" },
    ],
  },

  // -- Blush / shy group ------------------------------------------------------
  blushing: {
    lead: "Blushing kaomoji — rosy-cheeked, flustered faces for embarrassment, flattery and sudden shyness.",
    body: [
      "Blushing kaomoji show the involuntary redness — // characters representing heat in the cheeks, wide eyes from the surprise of it. (//∇//) is almost pure blush: the slashes are the cheeks, the face overwhelmed.",
      "Use them when a compliment lands harder than expected, when you’ve been caught doing something, or when the moment is just a bit more than you can handle.",
    ],
    faqs: [
      { q: "What is the blushing kaomoji?", a: "(//∇//) uses // characters to represent blushing cheeks. (^///^) and (〃∀〃) are similar: wide eyes and cheeks visually flushed with heat." },
    ],
  },
  flustered: {
    lead: "Flustered kaomoji — overwhelmed, embarrassed faces for when too much is happening at once.",
    body: [
      "Flustered is a step past blushing: not just red, but slightly scrambled. (>///<) has that quality — the >< eyes suggest being overwhelmed, the /// is intense heat in the cheeks. These are the faces of someone who didn’t see the compliment coming.",
      "Use them for social overwhelm, unexpected flattery, or any moment where the ideal response is “I do not know how to act right now.”",
    ],
    faqs: [
      { q: "What kaomoji means flustered?", a: "(>///<) is the classic flustered face — squeezed >< eyes and /// cheeks read as someone overwhelmed and embarrassed. (⁄ ⁄•⁄ω⁄•⁄ ⁄) adds more detail to the same flustered energy." },
    ],
  },

  // -- Surprised group --------------------------------------------------------
  surprised: {
    lead: "Surprised kaomoji — wide eyes, open mouths and the physical shock of the unexpected.",
    body: [
      "Surprised kaomoji have eyes that pop open and mouths that drop: Σ(ﾟДﾟ) is the archetype — Sigma for “sum of” (implying a reaction to everything at once), ﾟДﾟ for the wide-eyed open-mouthed shock.",
      "Use them for news you didn’t see coming, for reveals and plot twists — anything where the honest reaction is physical surprise.",
    ],
    faqs: [
      { q: "What is the surprised kaomoji?", a: "Σ(ﾟДﾟ) is the classic surprised kaomoji — Sigma plus wide shocked eyes and open mouth. (°o°) and (⊙_⊙) are simpler versions for lighter surprise." },
    ],
  },

  // -- Rude / flip group ------------------------------------------------------
  flip: {
    lead: "Table-flip kaomoji — (ノ°Д°)ノ彡┻━┻ and variants for moments of absolute frustration.",
    body: [
      "The table flip is one of the internet’s most satisfying kaomoji: a figure that reaches the end of their patience and physically overturns the nearest surface. (ノಠ益ಠ)ノ彡┻━┻ is the iconic version.",
      "Used for comic catharsis more than genuine destruction: “the CI failed again (ノಠ益ಠ)ノ彡┻━┻” is a relatable moment rendered perfectly.",
    ],
    faqs: [
      { q: "What is the table flip kaomoji?", a: "(ノಠ益ಠ)ノ彡┻━┻ is the classic table-flip — the ノ throws arms up, ┻━┻ is the table being flipped. The ಠ益ಠ face expresses pure, table-flipping rage." },
    ],
  },
  "flip-table": {
    lead: "Flip-table kaomoji — (ノ°Д°)ノ彡┻━┻ for ultimate frustration and dramatic exit.",
    body: [
      "The flip-table (also written “table-flip”) is the same iconic kaomoji by another name: arms up, furniture airborne, dignity abandoned. The ┻━┻ is built from box-drawing characters — ┻ shapes are table legs in the air connected by a ━ surface.",
      "You can also restore the table: ┬─┬ノ( º _ ºノ) — the calm follow-up to a flip-table moment.",
    ],
    faqs: [
      { q: "What does ┻━┻ mean?", a: "┻━┻ is a flipped table rendered in box-drawing characters — the ┻ shapes are the table legs pointing upward. It pairs with (ノಠ益ಠ)ノ彡 to make the full table-flip kaomoji." },
    ],
  },
  "flip-off": {
    lead: "Flip-off kaomoji — the 凸 character raised as a blunt, text-format rude gesture.",
    body: [
      "The flip-off kaomoji uses 凸 — a character that, held up, reads visually as a raised middle finger. 凸(｀△´＋) and 凸( ̄ヘ ̄) are the canonical forms: the character is the gesture, the face shows exactly what mood it’s in.",
      "Used for the most emphatic form of “no”, for comic rudeness between friends, or as a text middle finger where an emoji wouldn’t quite do it.",
    ],
    faqs: [
      { q: "What kaomoji is the middle finger?", a: "凸(｀△´＋) is the flip-off kaomoji — the 凸 character reads as a raised middle finger. It’s paired with an angry face for clarity." },
    ],
  },
  throw: {
    lead: "Throw kaomoji — figures hurling things in text, for rage, play and dramatic punctuation.",
    body: [
      "Throw kaomoji overlap heavily with the table-flip family — the physical gesture of throwing something as an expression of emotion. (ﾉಥ益ಥ）ﾉ ┻━┻ is the table-throw; other variants suggest the same arcing, releasing motion.",
      "Use them when the situation calls for more than words — when something needs to be visually sent flying.",
    ],
    faqs: [
      { q: "What is the throw kaomoji?", a: "Throw kaomoji include (ﾉಥ益ಥ）ﾉ ┻━┻ (a table being thrown) and similar figures with arms raised in the throwing motion." },
    ],
  },
  evil: {
    lead: "Evil kaomoji — sinister grins, ψ pitchforks and the energy of a well-executed scheme.",
    body: [
      "Evil kaomoji have the ψ character (a pitchfork/trident) and expressions that say “this was all part of the plan.” (｀∀´)Ψ is the archetypal evil face — smug, plotting, ready to cackle. (*｀ー´)ψ is colder and more calculating.",
      "Use them ironically when a plan works out, for villain-energy jokes, or any moment that benefits from a little theatrical malevolence.",
    ],
    faqs: [
      { q: "What is the evil kaomoji?", a: "(｀∀´)Ψ is the classic evil kaomoji — the ψ character is a pitchfork and the face has a wide, plotting grin. (*｀ー´)ψ is the colder, more calculating variant." },
    ],
  },
  devil: {
    lead: "Devil kaomoji — scheming, pitchfork-wielding faces for mischief and theatrical villainy.",
    body: [
      "Devil kaomoji use ψ as a pitchfork and pair it with grins ranging from mischievous to sinister. They’re the text-face version of the devil emoji — but more expressive, with faces that actually look like they’re plotting something.",
      "Perfect for when you’re the villain in a situation you’re comfortable with, for light-hearted scheming, or any “I did that” moment.",
    ],
    faqs: [
      { q: "What kaomoji means devil?", a: "(｀∀´)Ψ uses the ψ character as a pitchfork to signal devil energy — a scheming, grinning face holding its trident." },
    ],
  },
  rude: {
    lead: "Rude kaomoji — the 凸 middle finger and blunt face-combos for maximum emphasis.",
    body: [
      "Rude kaomoji are built around the 凸 character — visually a raised middle finger — paired with angry or smug faces. 凸(｀∀´)凸 doubles down by raising both simultaneously.",
      "Used between friends as playful rudeness, as a comic dismissal, or as the most emphatic possible “no.” Context matters — these are obviously rude by design.",
    ],
    faqs: [
      { q: "What is the rude kaomoji?", a: "凸( ̄ヘ ̄) is a classic rude kaomoji — the 凸 character reads as a raised middle finger, paired with an annoyed or contemptuous face." },
    ],
  },

  // -- Misc ------------------------------------------------------------------
  "blank-stare": {
    lead: "Blank-stare kaomoji — empty, expressionless faces for when you have no reaction at all.",
    body: [
      "Blank-stare kaomoji are the emoticon equivalent of a long pause followed by nothing: (°_°) looks startled into blankness, (-_-) is just gone, (ʘ_ʘ) opens the eyes wide to stare at something incomprehensible.",
      "Use them for moments that defy reaction — news so strange, a take so bad, a situation so absurd that a normal face would be insufficient.",
    ],
    faqs: [
      { q: "What kaomoji is a blank stare?", a: "(°_°) reads as a blank or surprised stare — round eyes open but the face otherwise empty. (-_-) is the flat, dead-eyed version. (ʘ_ʘ) is the wide-eyed variant." },
    ],
  },
  "angry-stare": {
    lead: "Angry-stare kaomoji — the cold, simmering glare of controlled fury.",
    body: [
      "The angry stare is a specific register: not screaming or table-flipping, but the dangerous stillness before something erupts. (╬ಠ益ಠ) has it — the ಠ eyes are staring, the 益 face is tense, and the whole thing reads as barely-contained.",
      "It’s more threatening than a full-rage kaomoji because the anger is focused and directed. Use it to communicate controlled fury rather than chaotic explosion.",
    ],
    faqs: [
      { q: "What kaomoji is an angry stare?", a: "(╬ಠ益ಠ) is the classic angry-stare kaomoji — the ಠ eyes are cold and staring, the 益 face furious but controlled. It’s a glare, not a shout." },
    ],
  },

};

export const getTagContent = (slug) => tagContent[slug] || null;
