// Aggregate-only usage beacon — privacy-preserving by design.
//
// Each call fires a single, isolated event to /e via navigator.sendBeacon:
// fire-and-forget, off the main thread, only on a real user action → zero
// LCP/INP/CLS cost. There is NO cookie, NO account, NO device/session id and
// NO timestamp/IP sent. The server stores only {event type, value}, so the data
// can be tallied in aggregate ("this kaomoji is popular", "people search X")
// but can never be linked to a person — it cannot answer "who copied what".
//
// Honours the ANALYTICS_EVENTS flag; also a no-op outside the browser (SSR) or
// where sendBeacon is unavailable.
import { ANALYTICS_EVENTS } from "../consts.js";

const send = (payload) => {
  if (!ANALYTICS_EVENTS) return;
  if (typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") return;
  try {
    navigator.sendBeacon("/e", JSON.stringify(payload));
  } catch {
    /* never let analytics affect the UI */
  }
};

// Cap by code points (not chars) so we never split a surrogate pair.
const clip = (s, n) => Array.from(String(s)).slice(0, n).join("");

export const trackCopy = (value) => send({ t: "copy", v: clip(value, 40) });

// Debounced: record only the settled query, not every keystroke.
let searchTimer;
export const trackSearch = (query) => {
  const q = clip(String(query).trim().toLowerCase(), 64);
  if (!q) return;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => send({ t: "search", q }), 900);
};
