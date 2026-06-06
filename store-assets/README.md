# Google Play store assets

Assets and a checklist for submitting the PWA to Google Play as a **Trusted Web Activity** (TWA). These files are **not deployed** (they live outside `public/`); they're for uploading in the Play Console / building the Android wrapper.

## In this folder
- **`feature-graphic-1024x500.png`** — the Play "feature graphic" (required, 1024×500). Warm-theme, matches the site.
- **`feature-graphic.html`** — source for the above. Regenerate with:
  ```bash
  chromium --headless=new --disable-gpu --force-device-scale-factor=1 \
    --window-size=1024,500 --hide-scrollbars \
    --screenshot=store-assets/feature-graphic-1024x500.png \
    "file://$PWD/store-assets/feature-graphic.html"
  ```

## Listing assets — status
| Asset | Required | Status |
|-------|----------|--------|
| App icon 512×512 | yes | ✅ `public/icons/icon-512.png` |
| Feature graphic 1024×500 | yes | ✅ this folder |
| Phone screenshots (2–8) | yes (≥2) | ✅ 3 in `store-assets/screenshots/` (`phone-1-moods`, `phone-2-animals`, `phone-3-famous` — live pages at 390×844 @2x) + the home/book `public/screenshots/mobile.png`. Regenerate: `chromium --headless=new --force-device-scale-factor=2 --window-size=390,844 --virtual-time-budget=5000 --screenshot=out.png https://kaomoji.fyi/kaomoji/happy/` |
| 7"/10" tablet screenshots | optional | — |
| Short description (≤80 chars) | yes | draft: *"Fast, offline kaomoji picker. Copy & paste 800+ Japanese emoticons — no tracking."* (78) |
| Full description (≤4000) | yes | adapt the Product Hunt description from the plan file |
| Privacy policy URL | yes | ✅ `https://kaomoji.fyi/privacy/` (live) |

## TWA build checklist (Bubblewrap)
1. Install `@bubblewrap/cli` + JDK 17 + Android SDK (separate dir, e.g. `~/git/kaomoji-twa/`).
2. `bubblewrap init --manifest https://kaomoji.fyi/manifest.webmanifest`
   - **packageId: `in.gfrm.kaomoji`** (reverse-DNS of gfrm.in; immutable once published)
   - **targetSdkVersion: 35** (Play requirement since 2025-08-31)
   - colors `#fdf6ea`; let it generate the keystore — **back up the keystore + passwords offsite immediately**.
3. `bubblewrap build` → `app-release-bundle.aab`. Get the upload-key SHA-256: `bubblewrap fingerprint list` (= **FP_UPLOAD**).
4. Create `public/.well-known/assetlinks.json` with package `in.gfrm.kaomoji` + FP_UPLOAD, commit/push, verify: `curl -i https://kaomoji.fyi/.well-known/assetlinks.json` → 200 JSON. *(Confirmed: Astro+Vite copy `public/.well-known/` to dist and CF Pages serves it.)*
5. Create the Play dev account ($25 + identity verification — can take days–weeks). **New personal accounts (post-2023-11-13) need 12 testers / 14-day closed test before production.**
6. Upload the AAB. Play App Signing re-signs with **its own** key → copy that **App-signing SHA-256 (FP_PLAY)** from Console → App integrity, and **add it to `assetlinks.json` alongside FP_UPLOAD** (both must be listed), commit/push. *Production verification only works after this step.*
7. **Data-safety form** — see the **Data safety declaration** section below. (As of 2026-06-06 the site sends an anonymous aggregate usage beacon, so this is **not** a "no data collected" app — declaring that would be a false statement and a policy violation.) Content rating: Everyone.
8. Verify the installed app opens **full-screen, no Chrome address bar** (`adb shell pm get-app-links in.gfrm.kaomoji` → `verified`).

> The long pole is **step 5** (account + verification + closed test = 2–4 weeks). Start it first; everything else is quick once it clears.

## Signing key (already generated — BACK IT UP)
The upload keystore was generated and lives at **`~/git/kaomoji-twa/android.keystore`** (alias `android`, PKCS12, RSA-2048, 25-yr validity). Passwords are in **gnome-keyring**: `secret-tool lookup service env key KAOMOJI_TWA_KEYSTORE_PASSWORD` (the PKCS12 key password equals the store password — same value under `KAOMOJI_TWA_KEY_PASSWORD`).

- **Upload-key SHA-256 (FP_UPLOAD):** `B0:67:2B:36:50:9E:F4:5C:58:54:22:31:EA:0A:38:D8:A1:8E:7F:1B:B1:C6:C2:F6:D9:A0:D6:AB:A5:F3:47:F5`
- ⚠️ **Back the keystore file + both passwords up offsite now.** With Play App Signing a lost upload key can be reset via Play support, but don't rely on that — copy `android.keystore` somewhere safe.
- This `FP_UPLOAD` is already in `public/.well-known/assetlinks.json` (live). After the first AAB upload, **append Play's app-signing SHA-256 (`FP_PLAY`)** — Play re-signs every distributed build (incl. closed-testing) with its own key, so `FP_PLAY` is what verifies the *installed* app. Ping Claude with `FP_PLAY` and it'll add it.

## Data safety declaration (fill the Play form to match this)
The app is a TWA wrapping kaomoji.fyi, which sends a cookieless aggregate beacon (`functions/e.js` → Analytics Engine): the **kaomoji you copy** and the **terms you search**. There is **no IP, cookie, session, account, or device ID** stored, so nothing is linkable to a person.

- **Does the app collect or share user data?** → **Yes, collects** (data leaves the device). **Not shared** (Cloudflare is infrastructure/processor, not a third-party recipient).
- **Data types:** *App activity* → **App interactions** (copy events) and **In-app search history** (search terms). Nothing else (no personal info, no location, no identifiers).
- **Linked to identity?** → **No.** **Used for tracking?** → **No.**
- **Encrypted in transit?** → **Yes** (HTTPS). **Can users request deletion?** → there is no per-user data to delete (nothing is identified); answer per the form's options ("data isn't linked to a user").
- If you'd rather file the simpler "no data collected": set `ANALYTICS_EVENTS = false` in `src/consts.js`, redeploy, then the beacon is off and the app collects nothing.

## Store listing text (ready to paste)
- **App name:** `Kaomoji — Japanese Emoticons & Text Faces`
- **Short description (≤80):** `Fast, offline kaomoji picker. Copy & paste 800+ Japanese emoticons — no tracking.` (78)
- **Full description (≤4000):**
```
Kaomoji is a fast, installable picker for Japanese emoticons (顔文字) — the text faces like ¯\_(ツ)_/¯, (╯°□°)╯︵ ┻━┻ and ʕ•ᴥ•ʔ that emoji just can't capture.

Search by feeling — "happy", "shrug", "table flip", "bear", "love" — tap once to copy, then paste anywhere: chats, captions, bios, comments, code reviews. Over 800 kaomoji across 23 categories, plus emoticons, emoji and symbols.

• Works offline. Install it and the whole picker works with no connection.
• No account, no ads, no tracking cookies. Your favourites and recents stay on your device.
• Fast. Built to be near-instant, with none of the clutter of other emoticon sites.
• Searchable by meaning, not just by glyph — so you find the face you mean.
• Open source.

Whether you want a cute kaomoji to soften a message, a flipping-table for the group chat, or a classic shrug, Kaomoji puts the right text face one tap away.
```
- **Categories:** Productivity / Tools. **Tags:** kaomoji, emoticons, text faces, emoji, 顔文字.
