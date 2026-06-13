// Shared clipboard + persistence for the picker and the maker, so both speak the
// same favourites/recents store and the same copy path. Extracted verbatim from
// Picker.jsx (behaviour-identical). Versioned localStorage keys; SSR/quota-safe.

export const STORAGE_FAVS = "kaomoji-favourites-v2";
export const STORAGE_RECENT = "kaomoji-recent-v2";
export const RECENT_CAP = 30;

export const readLS = (key) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
};
export const writeLS = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

const fallbackCopy = (value) => {
  const el = document.createElement("textarea");
  el.value = value;
  el.style.cssText = "position:fixed;opacity:0;top:0;left:0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand("copy");
  } catch {}
  document.body.removeChild(el);
};

// Clipboard write with an execCommand fallback. Resolves once copied (or fell back).
export const copyText = async (value) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {}
  }
  fallbackCopy(value);
};

// Prepend value, dedup, cap — the recents/favourites prepend-dedup pattern (pure).
export const prependCapped = (list, value, cap = RECENT_CAP) =>
  [value, ...list.filter((x) => x !== value)].slice(0, cap);

export const toggleInList = (list, value) =>
  list.includes(value) ? list.filter((x) => x !== value) : [value, ...list];
