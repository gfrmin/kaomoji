import { createSignal, createMemo, onMount, onCleanup, For, Show } from "solid-js";
import Fuse from "fuse.js";
import { categories, items, getItemsByCategory, getTag, searchDataset } from "../data/index.js";

const STORAGE_FAVS = "kaomoji-favourites-v2";
const STORAGE_RECENT = "kaomoji-recent-v2";
const RECENT_CAP = 30;

// Category sticker colors — rotate by index for active pill fills (matches --c0..--c6).
const A_COLORS = ["#ff9a8b", "#ffcf6b", "#97d8b0", "#9cc4f0", "#c4a9e8", "#ffb3c8", "#f0b98a"];
const colorFor = (i) => A_COLORS[i % A_COLORS.length];
// Deterministic per-cell tilt in [-2°, +2°] — makes the grid feel hand-placed.
const tilt = (i) => ((i * 53) % 5) - 2;

const isEmoji = (s) =>
  /^\p{Emoji}(️)?(‍\p{Emoji}(️)?)*$/u.test(s) && [...s].length <= 3;

const valueToItem = new Map(items.map((i) => [i.value, i]));

// Build the Fuse index lazily on first search rather than at module load, so
// hydrating the picker (every page) doesn't pay the index-construction cost
// up front — only users who actually search do, on their first keystroke.
let _fuse = null;
const getFuse = () => {
  if (!_fuse) {
    _fuse = new Fuse(searchDataset, {
      keys: [
        { name: "t", weight: 0.7 },
        { name: "c", weight: 0.25 },
        { name: "v", weight: 0.05 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }
  return _fuse;
};

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
 * @param {{ initial?: { kind: 'category'|'tag', id: string, label: string },
 *           showBook?: boolean }} props
 *   showBook — render the "your little book" hero (recents/favourites tray). Home only;
 *   on category/tag pages the ⭐/🕐 views stay reachable via the pill row instead.
 */
export default function Picker(props) {
  const initial = props.initial || { kind: "category", id: categories[0].id, label: categories[0].name };

  const [view, setView] = createSignal(initial); // {kind, id, label}
  const [search, setSearch] = createSignal("");
  const [favourites, setFavourites] = createSignal([]);
  const [recent, setRecent] = createSignal([]);
  const [copied, setCopied] = createSignal(null);
  const [announce, setAnnounce] = createSignal("");
  const [bookTab, setBookTab] = createSignal("recent"); // hero tab: "recent" | "favourites"

  let searchRef;
  let gridRef;

  // Screen-reader feedback to mirror the visual "copied! ✓". Clear-then-set on a
  // microtask so the polite live region re-announces even when the same item is
  // copied twice in a row (identical text wouldn't otherwise re-fire).
  const announceCopied = () => {
    setAnnounce("");
    queueMicrotask(() => setAnnounce("Copied to clipboard"));
  };

  onMount(() => {
    setFavourites(readLS(STORAGE_FAVS));
    setRecent(readLS(STORAGE_RECENT));

    // Global "/" focuses search (unless already typing), so the whole picker is
    // reachable from the keyboard without a mouse.
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (typing) return;
      e.preventDefault();
      searchRef?.focus();
      searchRef?.select();
    };
    document.addEventListener("keydown", onKey);
    onCleanup(() => document.removeEventListener("keydown", onKey));
  });

  // Geometry-aware vertical move across a flex-wrap grid of variable-width cells:
  // jump to the cell in the adjacent row whose horizontal centre is closest.
  const geomMove = (cells, i, dir) => {
    const cur = cells[i].getBoundingClientRect();
    const curMid = cur.left + cur.width / 2;
    const candidates = cells
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => (dir > 0 ? r.top > cur.top + 1 : r.top < cur.top - 1));
    if (!candidates.length) return null;
    const rowTop = dir > 0
      ? Math.min(...candidates.map((x) => x.r.top))
      : Math.max(...candidates.map((x) => x.r.top));
    const inRow = candidates.filter((x) => Math.abs(x.r.top - rowTop) < 2);
    let best = inRow[0];
    let bestDx = Infinity;
    for (const x of inRow) {
      const dx = Math.abs(x.r.left + x.r.width / 2 - curMid);
      if (dx < bestDx) { bestDx = dx; best = x; }
    }
    return best.el;
  };

  const onGridKeydown = (e) => {
    if (!gridRef) return;
    const cells = [...gridRef.querySelectorAll(".a-cell")];
    if (!cells.length) return;
    let i = cells.indexOf(document.activeElement);
    if (i === -1) i = 0;
    const focus = (el) => el && el.focus();
    switch (e.key) {
      case "ArrowRight": e.preventDefault(); focus(cells[Math.min(i + 1, cells.length - 1)]); break;
      case "ArrowLeft": e.preventDefault(); focus(cells[Math.max(i - 1, 0)]); break;
      case "ArrowDown": e.preventDefault(); focus(geomMove(cells, i, 1)); break;
      case "ArrowUp": {
        e.preventDefault();
        const up = geomMove(cells, i, -1);
        if (up) focus(up); else searchRef?.focus();
        break;
      }
      case "Home": e.preventDefault(); focus(cells[0]); break;
      case "End": e.preventDefault(); focus(cells[cells.length - 1]); break;
    }
  };

  const copy = (value) => {
    const done = () => {
      setCopied(value);
      announceCopied();
      setTimeout(() => setCopied((c) => (c === value ? null : c)), 1200);
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
    return getFuse().search(q).slice(0, 120).map((r) => valueToItem.get(r.item.v)).filter(Boolean);
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

  // The hero "book" tray contents follow the hero tab (independent of the grid view).
  const trayList = createMemo(() => (bookTab() === "recent" ? recent() : favourites()));
  const isFav = (value) => favourites().includes(value);

  // Clearing the active book tab — 2-step so a favourites wipe isn't accidental:
  // first click arms (label asks to confirm), second click within 3s clears.
  const [clearArmed, setClearArmed] = createSignal(false);
  let clearTimer;
  const armOrClear = () => {
    if (clearArmed()) {
      clearTimeout(clearTimer);
      setClearArmed(false);
      if (bookTab() === "recent") { setRecent([]); writeLS(STORAGE_RECENT, []); }
      else { setFavourites([]); writeLS(STORAGE_FAVS, []); }
    } else {
      setClearArmed(true);
      clearTimer = setTimeout(() => setClearArmed(false), 3000);
    }
  };
  const switchTab = (t) => { setClearArmed(false); setBookTab(t); };
  const removeRecent = (value) => {
    setRecent((r) => { const next = r.filter((x) => x !== value); writeLS(STORAGE_RECENT, next); return next; });
  };

  return (
    <div class="picker">
      <div class="visually-hidden" role="status" aria-live="polite">{announce()}</div>

      <Show when={props.showBook}>
        <section class="a-hero" aria-label="Your little book — recently copied and favourites">
          <div class="a-tape" aria-hidden="true"></div>
          <div class="a-book-head">
            <div>
              <div class="a-kicker">★ your little book</div>
              <p class="a-book-title">{bookTab() === "recent" ? "Recently copied" : "Favourites"}</p>
            </div>
            <div class="a-book-actions">
              <div class="a-tabs" role="tablist" aria-label="Book view">
                <button
                  class="a-tab"
                  role="tab"
                  classList={{ "is-on": bookTab() === "recent" }}
                  aria-selected={bookTab() === "recent"}
                  onClick={() => switchTab("recent")}
                >
                  🕐 Recent <span class="n">{recent().length}</span>
                </button>
                <button
                  class="a-tab"
                  role="tab"
                  classList={{ "is-on": bookTab() === "favourites" }}
                  aria-selected={bookTab() === "favourites"}
                  onClick={() => switchTab("favourites")}
                >
                  ⭐ Favourites <span class="n">{favourites().length}</span>
                </button>
              </div>
              <Show when={trayList().length > 0}>
                <button class="a-clear" classList={{ "is-armed": clearArmed() }} onClick={armOrClear}>
                  {clearArmed() ? `Clear ${bookTab() === "recent" ? "recent" : "favourites"}? ✓` : "Clear"}
                </button>
              </Show>
            </div>
          </div>

          <div class="a-tray">
            <Show
              when={trayList().length > 0}
              fallback={
                <div class="a-empty">
                  <div class="slots" aria-hidden="true"><div class="slot"></div><div class="slot"></div><div class="slot"></div></div>
                  <div class="hint">
                    {bookTab() === "recent"
                      ? "Tap any face below — it sticks here so you can grab it again. ✶"
                      : "Tap the ☆ on a face to pin it to your favourites. ⭐"}
                  </div>
                </div>
              }
            >
              <For each={trayList()}>
                {(value) => {
                  const emoji = isEmoji(value);
                  const isCopied = () => copied() === value;
                  const activate = () => copy(value);
                  // Remove this sticker: from recents on the Recent tab, else unfavourite.
                  const removeOne = () => (bookTab() === "recent" ? removeRecent(value) : toggleFav(value));
                  let pressTimer;
                  let suppressClick = false;
                  const startPress = () => {
                    suppressClick = false;
                    pressTimer = setTimeout(() => { suppressClick = true; removeOne(); navigator.vibrate?.(15); }, 450);
                  };
                  const endPress = () => clearTimeout(pressTimer);
                  return (
                    <div
                      class="a-tray-chip"
                      classList={{ "is-emoji": emoji, "is-copied": isCopied() }}
                      role="button"
                      tabindex="0"
                      title={bookTab() === "recent" ? "Click to copy · right-click or long-press to remove" : "Click to copy · ☆ to unpin"}
                      aria-label={`Copy ${value}${isFav(value) ? ", favourited" : ""}`}
                      onClick={() => { if (suppressClick) { suppressClick = false; return; } activate(); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } }}
                      onContextMenu={(e) => { e.preventDefault(); removeOne(); }}
                      onTouchStart={startPress}
                      onTouchEnd={endPress}
                      onTouchMove={endPress}
                      onTouchCancel={endPress}
                    >
                      {isCopied() ? "copied! ✓" : value}
                      <button
                        class="a-star"
                        classList={{ "is-fav": isFav(value) }}
                        aria-label={isFav(value) ? "Unpin from favourites" : "Pin to favourites"}
                        onClick={(e) => { e.stopPropagation(); toggleFav(value); }}
                      >{isFav(value) ? "★" : "☆"}</button>
                    </div>
                  );
                }}
              </For>
            </Show>
          </div>
        </section>
      </Show>

      <div class="a-search-wrap">
        <span class="a-search-ic" aria-hidden="true">⌕</span>
        <input
          ref={searchRef}
          type="search"
          class="a-search"
          placeholder="Search happy, shrug, cat, table flip…"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              gridRef?.querySelector(".a-cell")?.focus();
            } else if (e.key === "Escape" && search()) {
              e.preventDefault();
              setSearch("");
            }
          }}
          aria-label="Search kaomoji and emoji"
        />
      </div>
      <p class="picker-hint">Tip: press <kbd>/</kbd> to search · <kbd>↑↓←→</kbd> to move · <kbd>Enter</kbd> to copy</p>

      <Show when={!search()}>
        <Show when={props.showBook}>
          <div class="a-seclabel"><span class="star">✿</span> Pick a mood</div>
          <p class="picker-subhint">Tap to filter the faces below.</p>
        </Show>
        <div class="a-pills" role="tablist" aria-label="Kaomoji categories">
          <Show when={!props.showBook}>
            <button
              class="a-pill"
              role="tab"
              classList={{ "is-active": activeKey() === "favourites:favourites" }}
              style={activeKey() === "favourites:favourites" ? { background: "#fff4d6", "border-color": "var(--gold-line)" } : undefined}
              aria-selected={activeKey() === "favourites:favourites"}
              onClick={() => pick("favourites", "favourites", "Favourites")}
            >
              ⭐ Favourites <span class="n">{favourites().length}</span>
            </button>
            <button
              class="a-pill"
              role="tab"
              classList={{ "is-active": activeKey() === "recent:recent" }}
              style={activeKey() === "recent:recent" ? { background: "#fff4d6", "border-color": "var(--gold-line)" } : undefined}
              aria-selected={activeKey() === "recent:recent"}
              onClick={() => pick("recent", "recent", "Recent")}
            >
              🕐 Recent <span class="n">{recent().length}</span>
            </button>
          </Show>
          <For each={categories}>
            {(c, i) => {
              const active = () => activeKey() === `category:${c.id}`;
              return (
                <button
                  class="a-pill"
                  role="tab"
                  classList={{ "is-active": active() }}
                  style={active() ? { background: colorFor(i()), "border-color": colorFor(i()) } : undefined}
                  aria-selected={active()}
                  onClick={() => pick("category", c.id, c.name)}
                >
                  {c.icon} {c.name}<span class="n">{getItemsByCategory(c.id).length}</span>
                </button>
              );
            }}
          </For>
        </div>
      </Show>

      <div class="picker-status">{statusText()}</div>

      <div class="a-grid" ref={gridRef} onKeyDown={onGridKeydown}>
        <Show
          when={display().length > 0}
          fallback={
            <div class="picker-empty">
              {view().kind === "favourites"
                ? "No favourites yet — right-click / long-press any face to ⭐"
                : view().kind === "recent"
                  ? "Nothing copied yet — tap any kaomoji to copy"
                  : "No results — try another keyword"}
            </div>
          }
        >
          <For each={display()}>
            {(item, i) => {
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
                  class="a-cell"
                  classList={{ "is-emoji": emoji, "is-copied": isCopied() }}
                  style={{ transform: `rotate(${tilt(i())}deg)` }}
                  tabindex={i() === 0 ? 0 : -1}
                  title={value}
                  aria-label={`Copy ${value}${fav() ? ", favourited" : ""}`}
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
                  {isCopied() ? "copied! ✓" : value}
                  <Show when={fav() && !isCopied()}>
                    <span class="a-gridstar" aria-hidden="true">★</span>
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
