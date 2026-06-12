// Hand-authored, per-category SEO copy. Keyed by category id.
// This is the anti-thin-content payload: every category gets a UNIQUE lead
// (shown above the picker), body (shown below the items) and FAQs, so each
// category page is genuinely distinct rather than a templated clone.
//
//   sample — a representative glyph, used in <title> + as the H1 accent.
//   lead   — one unique sentence above the picker (drives the meta description).
//   body   — unique paragraphs below the items (the crawlable depth).
//   faqs   — question-shaped copy for long-tail / People-Also-Ask coverage.
//
// Voice: playful but clean. Keep `lead` ≲120 chars so the derived meta
// description stays ≲160. Not auto-generated — edit freely.

export const categoryContent = {
  disappointed: {
    sample: "(´・ω・`)",
    lead: "Sighing, deflated, let-down faces — copy and paste disappointed kaomoji for every quiet 'oh… okay then' moment.",
    body: [
      "Disappointed kaomoji sit between sad and unimpressed: drooped eyes, flat ＿ mouths and the odd weary sigh (￣ヘ￣). They capture being let down without the full waterworks of a crying face.",
      "Reach for one when plans fall through, a reply stings a little, or something just doesn't live up to the hype. Tap to copy; long-press to keep your favourites.",
    ],
    faqs: [
      { q: "What is a disappointed kaomoji?", a: "A disappointed kaomoji is a Japanese emoticon showing a let-down or deflated mood — like (´・ω・`) or (︶︿︶) — built from down-turned eyes and flat mouths, read upright." },
      { q: "What's the difference between disappointed and sad kaomoji?", a: "Sad kaomoji show active upset or crying (T_T); disappointed ones are quieter and more deflated — a sigh or an unimpressed flat face rather than tears." },
    ],
  },
  uwu: {
    sample: "( ˘ω˘ )",
    lead: "Soft, wholesome uwu and owo faces — copy and paste cute kaomoji for when something is just too precious.",
    body: [
      "UwU kaomoji are the squishy, blushy end of the kaomoji world: closed happy eyes (˘ ˘), little ω mouths and the odd paw ฅ, built to look adorable. They're how you say 'this is so cute I can't' in pure text.",
      "Use them to soften a message, react to something wholesome, or decorate a bio. Right-click or long-press any face to keep it in your favourites.",
    ],
    faqs: [
      { q: "What does uwu mean?", a: "UwU is a text face showing a happy, content expression — the U's are closed eyes and the w is a smiling mouth. It signals warmth, cuteness or affection. OwO is its wide-eyed, surprised cousin." },
      { q: "How do I type a uwu face?", a: "The easiest way is to copy one — tap any uwu kaomoji above and it's on your clipboard, ready to paste into Discord, texts or a bio. No special keyboard needed." },
    ],
  },
  coquette: {
    sample: "꒰ᐢ. .ᐢ꒱",
    lead: "Dainty, bow-soft coquette kaomoji — copy and paste girly faces with ribbons, hearts and a little ꒰♡꒱ for your bio.",
    body: [
      "Coquette kaomoji lean into the soft, ribbon-and-lace aesthetic: gentle eyes, blushy cheeks and trailing hearts ♡ or bows ʚ♡ɞ. They pair perfectly with the coquette and 'that girl' looks all over TikTok and Pinterest.",
      "Drop them in a bio, a caption or a username for an instantly dainty feel. Tap to copy; long-press to save your favourites.",
    ],
    faqs: [
      { q: "What is a coquette kaomoji?", a: "A coquette kaomoji is a soft, feminine text face styled with bows, ribbons and hearts — like ꒰♡ˊᵕˋ♡꒱ — matching the dainty coquette aesthetic popular on TikTok and Pinterest." },
      { q: "How do I use coquette symbols in my bio?", a: "Just tap any face or symbol above to copy it, then paste it into your Instagram, TikTok or Discord bio. They paste cleanly as text wherever you can type." },
    ],
  },
  happy: {
    sample: "(＾▽＾)",
    lead: "Beaming, bouncing, sparkling-with-joy Japanese emoticons for every good mood — copy and paste happy kaomoji in one tap.",
    body: [
      "Happy kaomoji turn a plain message into a grin. Built from curved eyes like ＾, ◕ and ≧, often with raised arms ＼(…)／ or sparkles ✧, they carry a warmth a single 🙂 can't.",
      "Drop one after good news, a thank-you, or just because — they read as genuinely cheerful in chats, comments, usernames and bios.",
    ],
    faqs: [
      { q: "What is a happy kaomoji?", a: "A happy kaomoji is a Japanese emoticon that shows joy using text characters — for example (＾▽＾) or ٩(◕‿◕｡)۶ — read upright, without tilting your head like Western emoticons." },
      { q: "How do I copy a happy kaomoji?", a: "Tap any face above and it's copied to your clipboard instantly. Paste it anywhere — Discord, Instagram, texts, docs. Right-click or long-press to save it to favourites." },
    ],
  },
  sad: {
    sample: "(T_T)",
    lead: "Teary eyes, trembling frowns and quiet sobs — copy and paste sad kaomoji for every shade of down.",
    body: [
      "Sad kaomoji express sorrow with crying eyes like T_T, ;_; and ╥, sometimes with falling tears ｡ﾟ or a drooping mouth. They range from a small sniffle to full ｡ﾟ(ﾟ´Д｀ﾟ)ﾟ｡ wailing.",
      "Use them to show empathy, lean into melodrama, or make a heartfelt 'sorry' feel a little more human.",
    ],
    faqs: [
      { q: "What does (T_T) mean?", a: "(T_T) is a crying kaomoji — the two T shapes are streaming eyes. It signals sadness, disappointment or 'I'm crying', whether playfully or sincerely." },
      { q: "How do I type a crying Japanese emoticon?", a: "Easiest is to copy one above with a tap. To type a simple one yourself, put two crying eyes around an underscore mouth, like (;_;) or (T_T)." },
    ],
  },
  angry: {
    sample: "(╬ಠ益ಠ)",
    lead: "Furrowed brows, gritted teeth and the legendary table flip — copy and paste angry kaomoji that actually look mad.",
    body: [
      "Angry kaomoji use sharp, glaring eyes like ಠ, ｀Д´ and 益 to radiate rage, often with raised fists ヽ(`Д´)ﾉ. The most famous is the table flip (╯°□°)╯︵ ┻━┻ — pure comedic fury.",
      "Reach for them when you're (jokingly) done, fed up, or want to throw a tantrum without typing a paragraph.",
    ],
    faqs: [
      { q: "How do I make the table flip emoticon?", a: "The classic table flip is (╯°□°)╯︵ ┻━┻ — copy it above in one tap. The ┻━┻ is the flying table; you'll also find rage-flip variants like (ノಠ益ಠ)ノ彡┻━┻." },
      { q: "What is an angry kaomoji?", a: "An angry kaomoji is a Japanese text emoticon showing anger with intense eyes and symbols like 益 or 凸. They're great for venting frustration playfully." },
    ],
  },
  surprised: {
    sample: "(⊙_⊙)",
    lead: "Wide eyes, dropped jaws and full-on shock — copy and paste surprised kaomoji for every 'wait, WHAT?' moment.",
    body: [
      "Surprised kaomoji blow the eyes wide open — ﾟдﾟ, O_O, ⊙_⊙ — often with a shocked Σ or a bead of sweat ；. They capture everything from a mild 'oh!' to (ﾟдﾟ；) jaw-on-floor disbelief.",
      "Use them to react to plot twists, surprising news, or anything that makes you do a double take.",
    ],
    faqs: [
      { q: "What is the shocked Japanese emoticon?", a: "Common shocked kaomoji are Σ(ﾟДﾟ), ( ﾟдﾟ) and (⊙_⊙) — the Σ adds a 'jolt' of surprise. Tap any above to copy it." },
      { q: "How do surprised kaomoji work?", a: "They exaggerate the eyes (big circles or Д) to show shock. Read them upright — no need to tilt your head like :O." },
    ],
  },
  love: {
    sample: "(｡♥‿♥｡)",
    lead: "Heart eyes, blown kisses and warm embraces — copy and paste love kaomoji to send a little affection.",
    body: [
      "Love kaomoji swap normal eyes for hearts ♥ and ♡, and add kisses ³ or a hug (づ｡◕‿‿◕｡)づ. They glow with romance, crushes and pure adoration.",
      "Perfect for partners, besties and anything you absolutely love — they say 'I care' more softly than a plain red heart.",
    ],
    faqs: [
      { q: "What is a love kaomoji?", a: "A love kaomoji is a Japanese emoticon expressing affection, usually with heart-shaped eyes like (♥ω♥) or a hug like (づ￣ ³￣)づ. Copy one above with a tap." },
      { q: "How do I make a heart face emoticon?", a: "Use ♥ or ♡ as the eyes inside a face, e.g. (｡♥‿♥｡). Easiest is to copy a ready-made one above and paste it anywhere." },
    ],
  },
  greetings: {
    sample: "( ´ ▽ ` )ﾉ",
    lead: "Friendly waves for hello and goodbye — copy and paste greeting kaomoji that say hi with a smile.",
    body: [
      "Greeting kaomoji add a waving hand ﾉ or / to a cheerful face — ( ´ ▽ ` )ﾉ, ヾ(・ω・*) — so a simple 'hi' arrives with body language. The same wave works for hello, bye and see-you-later.",
      "Open a chat, welcome someone, or sign off warmly without sounding flat.",
    ],
    faqs: [
      { q: "What is a waving kaomoji?", a: "A waving kaomoji is a Japanese emoticon with a raised hand, like ( ´ ▽ ` )ﾉ or (＾▽＾)/, used to say hello or goodbye. Tap to copy." },
      { q: "How do I say hi with a kaomoji?", a: "Pick a smiling face with a ﾉ or / 'hand' and paste it before your message — an instant friendly greeting." },
    ],
  },
  tired: {
    sample: "(－_－) zzZ",
    lead: "Heavy eyelids, yawns and zzz's — copy and paste tired kaomoji for when you're running on empty.",
    body: [
      "Tired kaomoji droop the eyes into flat lines － _ = and often trail a sleepy zzZ. They cover sleepy, drained, bored and 'I cannot adult today'.",
      "Send one when you're exhausted, half-asleep, or replying at 2am — they make 'so tired' feel relatable.",
    ],
    faqs: [
      { q: "What does (-_-) mean?", a: "(-_-) is a tired or unimpressed kaomoji — the flat, closed eyes suggest sleepiness or a mild 'done with this'. Add zzZ to make it clearly asleep." },
      { q: "How do I make a sleepy emoticon?", a: "Use dashes for closed eyes and add zzZ, like (－_－) zzZ. Or just copy a ready-made tired kaomoji above." },
    ],
  },
  thinking: {
    sample: "(・・ ) ?",
    lead: "Raised brows, question marks and a deep 'hmm' — copy and paste thinking kaomoji while you ponder.",
    body: [
      "Thinking kaomoji pair a curious face with a ? or a stroking-chin pose — (・・ ) ?, (¬_¬), ლ(ʘ̆~̆ʘ̆ლ). They show pondering, confusion or healthy skepticism.",
      "Drop one when you're mulling something over, unsure, or politely going 'are you sure about that?'",
    ],
    faqs: [
      { q: "What is a thinking kaomoji?", a: "A thinking kaomoji is a Japanese emoticon showing thought or confusion, often with a question mark like (・・ ) ? or (？_？). Tap any to copy." },
      { q: "Which emoticon means confused?", a: "(？_？), (・・ ) ? and (@_@) all read as confused or puzzled. Copy one above and paste it where you need it." },
    ],
  },
  animals: {
    sample: "ʕ•ᴥ•ʔ",
    lead: "Bears, cats, bunnies and more — copy and paste animal kaomoji that are unbearably cute.",
    body: [
      "Animal kaomoji shape whole creatures from text: the bear ʕ•ᴥ•ʔ, the cat (=^･ω･^=), paws ฅ and bunnies ₍ᐢ•ﻌ•ᐢ₎. The ᴥ snout and ･ﻌ･ whiskers are the giveaways.",
      "Use them to make any message friendlier and softer — they're a staple of cute, kawaii chat.",
    ],
    faqs: [
      { q: "How do I make a bear kaomoji?", a: "The classic bear is ʕ•ᴥ•ʔ — the ʕ ʔ are ears and ᴥ is the snout. Copy it above with a tap; you'll find happy and grumpy bear variants too." },
      { q: "What is the cat kaomoji?", a: "The cat face is (=^･ω･^=) or (=^･^=), with ^ ^ ears and ･ ･ whiskers. Tap to copy and paste it anywhere." },
    ],
  },
  actions: {
    sample: "ヽ(^Д^)ﾉ",
    lead: "Running, dancing, shrugging and flexing — copy and paste action kaomoji caught mid-move.",
    body: [
      "Action kaomoji add motion: dashing ε=ε=┌(;*´Д`)ﾉ, arms thrown up ヽ(^Д^)ﾉ, or the iconic shrug ¯\\_(ツ)_/¯. The trailing arms and speed lines do the acting.",
      "Use them when words alone feel too still — to show you're hyping, fleeing, dancing or just ¯\\_(ツ)_/¯ 'who knows'.",
    ],
    faqs: [
      { q: "How do I type the shrug emoticon?", a: "The shrug is ¯\\_(ツ)_/¯. It's fiddly to type, so just tap it above to copy the whole thing, then paste." },
      { q: "What are action kaomoji?", a: "Action kaomoji are Japanese emoticons showing movement — running, dancing, shrugging, flexing — using arms like ヽ ﾉ and motion marks. Copy any with a tap." },
    ],
  },
  magic: {
    sample: "*:･ﾟ✧",
    lead: "Sparkles, stars and shimmering trails — copy and paste magic kaomoji to add a little ✨ to anything.",
    body: [
      "Magic kaomoji surround a face with sparkles ✧, stars ☆ and *:･ﾟ trails — (ﾉ´ヮ`)ﾉ*:･ﾟ✧ — for a glittery, enchanted feel. Some are pure decoration with no face at all.",
      "Use them to make text feel special, dreamy or celebratory, or as shimmer around your name and bio.",
    ],
    faqs: [
      { q: "How do I make a sparkle kaomoji?", a: "Add ✧ or *:･ﾟ✧ around a happy face, like (ﾉ´ヮ`)ﾉ*:･ﾟ✧. Or copy a ready-made sparkly one above in a tap." },
      { q: "What are these sparkle symbols called?", a: "They're sparkle and star characters (✧ ✦ ☆ ★) often used in kaomoji and aesthetic text. Tap to copy individual sparkles or full magic faces." },
    ],
  },
  decorated: {
    sample: "°˖✧ (≧◡≦) ✧˖°",
    lead: "Cute faces wrapped in starry borders, sparkle trails and aesthetic flourishes — copy and paste decorated kaomoji to make any bio or message shine.",
    body: [
      "Decorated kaomoji frame a simple face in ornamental flair — sparkle borders ✧･ﾟ, flying stars ★彡, swirls ⋆｡°, twinkles ₊˚ and dotted edges ꒷꒦. The face stays gentle while the decoration does the talking, turning a plain (≧◡≦) into °˖✧ (≧◡≦) ✧˖°.",
      "They're the go-to for aesthetic usernames, Instagram and TikTok bios, Discord status lines and soft kawaii posts where a bare emoticon would look unfinished. Copy one whole — borders and all — and paste it straight into your profile or caption.",
    ],
    faqs: [
      { q: "What are decorated kaomoji?", a: "Decorated kaomoji are Japanese emoticons dressed up with ornamental symbols — sparkles, stars, swirls and dotted borders — like ✧･ﾟ: *(˶ˆ꒳ˆ˶)* :･ﾟ✧. The framing makes a normal face look fancy and aesthetic." },
      { q: "Where do people use decorated kaomoji?", a: "They're popular in social-media bios, aesthetic usernames, Discord status and cute captions — anywhere you want text to look pretty. Tap any above to copy the whole decorated face, borders included." },
      { q: "How do I make my own decorated kaomoji?", a: "Start with a simple face like (≧◡≦), then wrap it in symbols — sparkles ✧, stars ☆彡, dots ｡°, or a ⋆｡°✩ border. Or copy a ready-made one above and tweak the decoration to taste." },
    ],
  },
  cool: {
    sample: "( ͡° ͜ʖ ͡°)",
    lead: "Smug smirks, side-eyes and the famous Lenny face — copy and paste cool kaomoji with attitude.",
    body: [
      "Cool kaomoji play it unbothered: the Lenny face ( ͡° ͜ʖ ͡°), a sly (¬‿¬), or a flat ಠ_ಠ stare. They read as smug, suggestive or effortlessly chill.",
      "Drop one to be cheeky, imply something, or act like you've got it all under control.",
    ],
    faqs: [
      { q: "What is the Lenny face?", a: "Lenny is ( ͡° ͜ʖ ͡°), a smug, suggestive kaomoji built from raised eyebrows ͡° and a sly mouth ͜ʖ. Tap above to copy it instantly." },
      { q: "What does ಠ_ಠ mean?", a: "ಠ_ಠ is the 'look of disapproval' — a flat, judging stare that reads as unimpressed or skeptical. Copy it with a tap." },
    ],
  },
  scared: {
    sample: "((( ;°Д°)))",
    lead: "Trembling, wide-eyed panic — copy and paste scared kaomoji for fear, dread and pure 'nope'.",
    body: [
      "Scared kaomoji shake with fright: trembling brackets ((( ))), bulging ﾟДﾟ eyes and nervous sweat ；. They range from jittery nerves to (|||ﾟДﾟ) full terror.",
      "Use them for spooky moments, anxiety, or a dramatic 'I'm scared' that still makes people smile.",
    ],
    faqs: [
      { q: "What is a scared kaomoji?", a: "A scared kaomoji is a Japanese emoticon showing fear, usually with wide eyes and trembling brackets like ((( ;°Д°))). Tap any to copy." },
      { q: "How do I show fear with text?", a: "Wrap a wide-eyed face in shaking brackets and add sweat, e.g. ((( ;°Д°))). Easiest is to copy one above." },
    ],
  },
  embarrassed: {
    sample: "(〃∀〃)",
    lead: "Blushing cheeks and shy, flustered grins — copy and paste embarrassed kaomoji when you're feeling 〃▽〃.",
    body: [
      "Embarrassed kaomoji blush with 〃 marks, ⁄ ⁄ shading and bashful eyes — (〃∀〃), (⁄ ⁄•⁄ω⁄•⁄ ⁄), (/▽＼). They show shyness, flattery or sweet awkwardness.",
      "Use them when you're flustered by a compliment, caught being soft, or just feeling timid.",
    ],
    faqs: [
      { q: "What is a blushing kaomoji?", a: "A blushing kaomoji shows shyness using 〃 or ⁄ ⁄ 'blush' marks on the cheeks, like (〃∀〃) or (/▽＼). Copy one with a tap." },
      { q: "How do I make a shy face?", a: "Add 〃 marks beside the eyes of a small smile, e.g. (〃∀〃). Or copy a ready-made embarrassed kaomoji above." },
    ],
  },
  kawaii: {
    sample: "(✿◠‿◠)",
    lead: "Soft, sweet and aggressively adorable — copy and paste kawaii kaomoji for maximum cuteness.",
    body: [
      "Kawaii kaomoji are peak cute: gentle ◠‿◠ smiles, flower ✿ accents, tiny animals ₍ᐢ•ﻌ•ᐢ₎ and heart eyes (｡♥‿♥｡). 'Kawaii' (かわいい) literally means cute in Japanese.",
      "Use them to soften messages, decorate bios, or sprinkle aesthetic charm anywhere.",
    ],
    faqs: [
      { q: "What does kawaii mean?", a: "Kawaii (かわいい) is Japanese for 'cute'. Kawaii kaomoji are extra-adorable text faces — soft smiles, flowers, hearts and tiny critters. Tap to copy." },
      { q: "What are the cutest kaomoji?", a: "Favourites include (✿◠‿◠), (｡♥‿♥｡) and the bunny ₍ᐢ•ﻌ•ᐢ₎. Browse and copy any above in one tap." },
    ],
  },
  music: {
    sample: "♪(┌・。・)┌",
    lead: "Singing, humming and dancing to the beat — copy and paste music kaomoji trailing ♪♫♬.",
    body: [
      "Music kaomoji add notes ♪ ♫ ♬ to a swaying, happy face — ♪(┌・。・)┌, ヾ(´〇`)ﾉ♪♪♪. The notes turn a smile into a little song.",
      "Use them when you're vibing, sharing a track, or just feeling musical and upbeat.",
    ],
    faqs: [
      { q: "How do I add music notes to a kaomoji?", a: "Append ♪, ♫ or ♬ to a cheerful face, like ヽ(´∀`)ﾉ♪♪. Or copy a ready-made music kaomoji above in a tap." },
      { q: "What is a singing kaomoji?", a: "A singing kaomoji is a Japanese emoticon with music notes, e.g. ♪(┌・。・)┌, suggesting song or dance. Tap to copy." },
    ],
  },
  fighting: {
    sample: "(ง •̀_•́)ง",
    lead: "Fists up, determined and ready to go — copy and paste fighting kaomoji full of 'you've got this' energy.",
    body: [
      "Fighting kaomoji throw up fists ง ง or ᕦ ᕤ with a fierce •̀_•́ glare — (ง •̀_•́)ง, ᕦ(ò_óˇ)ᕤ. In Japanese they channel 'ganbatte!' — give it your all.",
      "Send one to hype someone up, show resolve, or psych yourself up for a challenge.",
    ],
    faqs: [
      { q: "What is the fighting kaomoji?", a: "The classic is (ง •̀_•́)ง — raised fists ง and a determined face. It means 'let's go' or 'you can do it'. Tap to copy." },
      { q: "How do I show determination with a kaomoji?", a: "Use a fierce face with fists, like ᕦ(ò_óˇ)ᕤ or (ง •̀_•́)ง. Copy one above and paste it to cheer someone on." },
    ],
  },
  please: {
    sample: "m(_ _)m",
    lead: "Bowing heads, folded hands and earnest pleas — copy and paste please kaomoji to ask nicely or say sorry.",
    body: [
      "Please kaomoji bow politely with m(_ _)m or fold their hands to beg — (＾人＾). The m( )m 'hands on the floor' is a deep, respectful Japanese bow (dogeza).",
      "Use them to request a favour, apologise sincerely, or say a heartfelt thank-you.",
    ],
    faqs: [
      { q: "What does m(_ _)m mean?", a: "m(_ _)m is a bowing kaomoji — the m's are hands on the ground and (_ _) is a lowered head. It means please, sorry or thank you, politely. Tap to copy." },
      { q: "How do I say sorry with a kaomoji?", a: "Use a bow like m(_ _)m, or m(T_T)m for a tearful apology. Copy one above and paste it with your message." },
    ],
  },
  celebrate: {
    sample: "＼(^▽^)／",
    lead: "Arms in the air, confetti and pure 'we did it!' — copy and paste celebrate kaomoji for every win.",
    body: [
      "Celebration kaomoji throw both arms up ＼(^▽^)／ or burst with sparkles ☆*:.｡.o(≧▽≦)o.｡.:*☆. They're joy turned all the way up.",
      "Use them for good news, congratulations, parties and victories — confetti not included, but strongly implied.",
    ],
    faqs: [
      { q: "What is a celebration kaomoji?", a: "A celebration kaomoji is a joyful Japanese emoticon with raised arms and sparkles, like ＼(^▽^)／ or ٩(^‿^)۶. Tap to copy." },
      { q: "How do I say congrats with a kaomoji?", a: "Pair your message with a cheering face like ＼(^▽^)／ or a sparkly o(≧▽≦)o. Copy one above in a tap." },
    ],
  },
  dividers: {
    sample: "･:*:･ﾟ✧",
    lead: "Pretty lines, sparkly borders and section breaks — copy and paste text dividers to decorate any post.",
    body: [
      "Text dividers aren't faces — they're decorative lines built from sparkles ✧, dots ･:., stars ☆ and dashes ━ to separate sections of text.",
      "Use them in bios, journals, fan edits and aesthetic posts to frame content and add a soft, tidy flourish.",
    ],
    faqs: [
      { q: "What are text dividers?", a: "Text dividers are decorative lines made from symbols like ･:*:･ﾟ✧ or ━━━━━━ used to separate sections in bios, posts and journals. Tap any to copy." },
      { q: "How do I use aesthetic dividers?", a: "Copy a divider above and paste it between blocks of text — between bio lines, headings or paragraphs — for a clean, decorative break." },
    ],
  },
  emoji: {
    sample: "😀",
    lead: "The full set of smileys, faces and feelings — copy and paste emoji in one tap, no keyboard switching.",
    body: [
      "This is the classic Unicode emoji set — 😀 😂 😍 😎 and hundreds more — the colourful picture characters that render the same across phones and computers.",
      "Tap any to copy it instantly; handy when you're on a desktop or just want to grab one fast without opening the emoji panel.",
    ],
    faqs: [
      { q: "What's the difference between emoji and kaomoji?", a: "Emoji are single colourful picture characters (😀) from Unicode; kaomoji are faces built from multiple text characters, like (＾▽＾), read upright. This site has both." },
      { q: "How do I copy an emoji on desktop?", a: "Just tap any emoji above and it's copied to your clipboard — no emoji keyboard needed. Paste it anywhere." },
    ],
  },
  symbols: {
    sample: "★",
    lead: "Hearts, stars, arrows and special characters — copy and paste text symbols you can't find on the keyboard.",
    body: [
      "Text symbols are single special characters — ♡ ★ ♪ ✿ ☆ ✓ and more — that aren't on a standard keyboard but paste cleanly into any text.",
      "Use them as bullet points, name decorations, star ratings, or little accents in bios and posts.",
    ],
    faqs: [
      { q: "How do I type symbols not on my keyboard?", a: "The simplest way is to copy them — tap any symbol above (★ ♡ ♪ …) and paste it anywhere. No alt-codes or unicode hunting needed." },
      { q: "What are text symbols?", a: "Text symbols are special Unicode characters like ♥, ★ and ✓ used to decorate text. They work in most apps, bios and documents. Tap to copy." },
    ],
  },
};

export const getCategoryContent = (id) => categoryContent[id] || null;
