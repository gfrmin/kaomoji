import { createSignal, createMemo, onMount, For, Show } from "solid-js";
import Fuse from "fuse.js";
import { categories, items, getItemsByCategory, getTag, searchDataset } from "../data/index.js";

const STORAGE_FAVS = "kaomoji-favourites-v2";
const STORAGE_RECENT = "kaomoji-recent-v2";
const RECENT_CAP = 30;

const isEmoji = (s) =>
  /^\p{Emoji}(️)?(‍\p{Emoji}(️)?)*$/u.test(s) && [...s].length <= 3;

// Static module-level search index (data is build-time constant).
const valueToItem = new Map(items.map((i) => [i.value, i]));
const fuse = new Fuse(searchDataset, {
  keys: [
    { name: "t", weight: 0.7 },
    { name: "c", weight: 0.25 },
    { name: "v", weight: 0.05 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

const readLS = (key) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
};
const writeLS = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

/**
 * @param {{ initial?: { kind: 'category'|'tag', id: string, label: string } }} props
 */
export default function Picker(props) {
  const initial = props.initial || { kind: "category", id: categories[0].id, label: categories[0].name };

  const [view, setView] = createSignal(initial); // {kind, id, label}
  const [search, setSearch] = createSignal("");
  const [favourites, setFavourites] = createSignal([]);
  const [recent, setRecent] = createSignal([]);
  const [copied, setCopied] = createSignal(null);

  onMount(() => {
    setFavourites(readLS(STORAGE_FAVS));
    setRecent(readLS(STORAGE_RECENT));
  });

  const copy = (value) => {
    const done = () => {
      setCopied(value);
      setTimeout(() => setCopied((c) => (c === value ? null : c)), 1400);
      setRecent((r) => {
        const next = [value, ...r.filter((x) => x !== value)].slice(0, RECENT_CAP);
        writeLS(STORAGE_RECENT, next);
        return next;
      });
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(() => fallbackCopy(value, done));
    } else {
      fallbackCopy(value, done);
    }
  };

  const fallbackCopy = (value, done) => {
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
    done();
  };

  const toggleFav = (value) => {
    setFavourites((f) => {
      const next = f.includes(value) ? f.filter((x) => x !== value) : [value, ...f];
      writeLS(STORAGE_FAVS, next);
      return next;
    });
  };

  const searchResults = createMemo(() => {
    const q = search().trim();
    if (!q) return null;
    return fuse.search(q).slice(0, 120).map((r) => valueToItem.get(r.item.v)).filter(Boolean);
  });

  // Display list: always an array of item-like objects with a `value`.
  const display = createMemo(() => {
    const sr = searchResults();
    if (sr) return sr;
    const v = view();
    if (v.kind === "favourites") return favourites().map((value) => valueToItem.get(value) || { value });
    if (v.kind === "recent") return recent().map((value) => valueToItem.get(value) || { value });
    if (v.kind === "tag") return getTag(v.id)?.items || [];
    return getItemsByCategory(v.id);
  });

  const pick = (kind, id, label) => {
    setSearch("");
    setView({ kind, id, label });
  };

  const statusText = createMemo(() => {
    const sr = searchResults();
    if (sr) return `${sr.length} result${sr.length === 1 ? "" : "s"} for “${search().trim()}”`;
    const v = view();
    if (v.kind === "favourites") return `${favourites().length} saved`;
    if (v.kind === "recent") return `${recent().length} recent`;
    return `${display().length} ${v.label}`;
  });

  const activeKey = createMemo(() => {
    const v = view();
    return `${v.kind}:${v.id}`;
  });

  return (
    <div class="picker">
      <div class="picker-bar">
        <input
          type="search"
          class="picker-search"
          placeholder="Search… happy, shrug, cat, table flip, ✨"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          aria-label="Search kaomoji and emoji"
        />
      </div>

      <Show when={!search()}>
        <div class="picker-pills" role="tablist">
          <button
            classList={{ active: activeKey() === "favourites:favourites" }}
            onClick={() => pick("favourites", "favourites", "Favourites")}
          >
            ⭐ Favourites <span class="n">{favourites().length}</span>
          </button>
          <button
            classList={{ active: activeKey() === "recent:recent" }}
            onClick={() => pick("recent", "recent", "Recent")}
          >
            🕐 Recent <span class="n">{recent().length}</span>
          </button>
          <For each={categories}>
            {(c) => (
              <button
                classList={{ active: activeKey() === `category:${c.id}` }}
                onClick={() => pick("category", c.id, c.name)}
              >
                {c.icon} {c.name}
              </button>
            )}
          </For>
        </div>
      </Show>

      <div class="picker-status">{statusText()}</div>

      <div class="picker-grid">
        <Show
          when={display().length > 0}
          fallback={
            <div class="picker-empty">
              {view().kind === "favourites"
                ? "No favourites yet — right-click / long-press any item to ⭐"
                : view().kind === "recent"
                  ? "Nothing copied yet — tap any kaomoji to copy"
                  : "No results — try another keyword"}
            </div>
          }
        >
          <For each={display()}>
            {(item) => {
              const value = item.value;
              const emoji = isEmoji(value);
              const fav = () => favourites().includes(value);
              const isCopied = () => copied() === value;
              // Real long-press for touch, so the "long-press to ⭐" instruction holds.
              let pressTimer;
              let suppressClick = false;
              let suppressContext = false;
              const startPress = () => {
                suppressClick = false;
                suppressContext = false;
                pressTimer = setTimeout(() => {
                  suppressClick = true; // the tap that follows shouldn't also copy
                  suppressContext = true; // a synthetic contextmenu may follow; don't double-toggle
                  toggleFav(value);
                  navigator.vibrate?.(15);
                }, 450);
              };
              const endPress = () => clearTimeout(pressTimer);
              return (
                <button
                  class="picker-cell"
                  classList={{ "is-emoji": emoji, "is-fav": fav(), "is-copied": isCopied() }}
                  title={value}
                  onClick={() => {
                    if (suppressClick) { suppressClick = false; return; }
                    copy(value);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (suppressContext) { suppressContext = false; return; }
                    toggleFav(value);
                  }}
                  onTouchStart={startPress}
                  onTouchEnd={endPress}
                  onTouchMove={endPress}
                  onTouchCancel={endPress}
                >
                  {isCopied() ? "Copied! ✓" : value}
                  <Show when={fav() && !isCopied()}>
                    <span class="star">⭐</span>
                  </Show>
                </button>
              );
            }}
          </For>
        </Show>
      </div>
    </div>
  );
}
