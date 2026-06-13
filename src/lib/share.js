// One sharing primitive for the whole app. Uses the native share sheet where
// available (the real viral surface on mobile / Discord / IG), and falls back to
// copying "<text> <url>" to the clipboard. Never throws to the caller.
//
// Returns "shared" | "copied" | "dismissed" so the UI can show the right feedback.
import { copyText } from "./store.js";
import { SITE } from "../consts.js";

export const shareKaomoji = async ({ text, url = SITE, title = "Kaomoji" }) => {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text, url, title });
      return "shared";
    } catch (e) {
      if (e && e.name === "AbortError") return "dismissed"; // user closed the sheet
      // any other failure → fall through to the copy fallback
    }
  }
  await copyText(`${text} ${url}`.trim());
  return "copied";
};
