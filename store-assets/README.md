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
| Phone screenshots (2–8) | yes (≥2) | ⚠️ only `public/screenshots/mobile.png` exists — **need ≥1 more** (e.g. a category page + search-in-action). Generate the same way as the existing ones (Playwright/chromium at 390×844). |
| 7"/10" tablet screenshots | optional | — |
| Short description (≤80 chars) | yes | draft: *"Fast, offline kaomoji picker. Copy & paste 800+ Japanese emoticons — no tracking."* (78) |
| Full description (≤4000) | yes | adapt the Product Hunt description from the plan file |
| Privacy policy URL | yes | ✅ will be `https://kaomoji.fyi/privacy/` once PR #15 merges |

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
7. Data-safety form: declare **no data collected/shared** (cookieless, device-local). Content rating: Everyone.
8. Verify the installed app opens **full-screen, no Chrome address bar** (`adb shell pm get-app-links in.gfrm.kaomoji` → `verified`).

> The long pole is **step 5** (account + verification + closed test = 2–4 weeks). Start it first; everything else is quick once it clears.
