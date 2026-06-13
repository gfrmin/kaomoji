import { createSignal, createMemo, onMount, For, Show } from "solid-js";
import { galleries, assemble, randomKaomoji, encode, decode, defaultSelection } from "../lib/generator.js";
import { STORAGE_FAVS, STORAGE_RECENT, readLS, writeLS, copyText, prependCapped, toggleInList } from "../lib/store.js";
import { shareKaomoji } from "../lib/share.js";
import { trackCopy } from "../lib/analytics.js";

// The slot rows, in the order research says reads best: eyes carry the mood, so
// they lead; the mouth sets intensity; then the frame, then optional flourishes.
const SLOTS = [
  { key: "eye", label: "Eyes", kind: "pair" },
  { key: "mouth", label: "Mouth", kind: "glyph" },
  { key: "bracket", label: "Frame", kind: "pair" },
  { key: "arm", label: "Arms", kind: "pair" },
  { key: "cheek", label: "Cheeks", kind: "glyph" },
  { key: "decoration", label: "Sparkles", kind: "pair" },
];
const VISIBLE = 16; // chips shown before the "more" toggle

const toEntry = (slot, e) =>
  e == null ? null : slot.kind === "glyph" ? { glyph: e.glyph } : { left: e.left, right: e.right };

const labelOf = (key, e) => {
  if (e == null) return "—";
  if (key === "bracket") return `${e.left} ${e.right}`;
  if (key === "decoration") return e.left; // symmetric — show one
  if (e.glyph != null) return e.glyph;
  return `${e.left}${e.right}`;
};

const isActive = (sel, slot, e) => {
  const cur = sel[slot.key];
  if (e == null) return cur == null;
  if (cur == null) return false;
  return slot.kind === "glyph" ? cur.glyph === e.glyph : cur.left === e.left && cur.right === e.right;
};

export default function Builder() {
  const [sel, setSel] = createSignal(defaultSelection());
  const [copied, setCopied] = createSignal(false);
  const [favourited, setFavourited] = createSignal(false);
  const [toast, setToast] = createSignal("");
  const [expanded, setExpanded] = createSignal({});

  const value = createMemo(() => assemble(sel()));

  let favs = [];
  const refreshFav = () => setFavourited(favs.includes(value()));

  onMount(() => {
    favs = readLS(STORAGE_FAVS);
    const k = new URLSearchParams(location.search).get("k");
    if (k) setSel(decode(k));
    refreshFav();
  });

  // Reflect the current build in the address bar so it's always shareable.
  const syncUrl = (s) => {
    try { history.replaceState(null, "", `?k=${encode(s)}`); } catch {}
  };

  const setSlot = (slotKey, entry) => {
    const next = { ...sel(), [slotKey]: entry };
    setSel(next);
    setCopied(false);
    syncUrl(next);
    refreshFav();
  };

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 1500); };

  const onCopy = () => {
    const v = value();
    copyText(v).then(() => {
      setCopied(true);
      trackCopy(v);
      writeLS(STORAGE_RECENT, prependCapped(readLS(STORAGE_RECENT), v));
      setTimeout(() => setCopied(false), 1400);
    });
  };

  const onFav = () => {
    favs = toggleInList(favs, value());
    writeLS(STORAGE_FAVS, favs);
    refreshFav();
  };

  const onRandom = () => {
    const r = randomKaomoji();
    setSel(r.selection);
    setCopied(false);
    syncUrl(r.selection);
    refreshFav();
  };

  const onShare = () => {
    shareKaomoji({ text: value(), url: location.href, title: "My kaomoji" }).then((res) => {
      if (res === "copied") flash("Link copied!");
      else if (res === "failed") flash("Couldn't copy — try again");
    });
  };

  const toggleMore = (key) => setExpanded((e) => ({ ...e, [key]: !e[key] }));

  return (
    <section class="maker">
      <div class="visually-hidden" role="status" aria-live="polite">{copied() ? "Copied to clipboard" : ""}</div>

      <div class="builder-stage">
        {/* aria-live off: <output> announces politely by default, which would read
            the whole face as symbol names on every chip tap. The dedicated status
            region above handles copy feedback instead. */}
        <output class="builder-preview" classList={{ "is-copied": copied() }} aria-live="off" aria-label={`Your kaomoji: ${value()}`}>
          {copied() ? "copied! ✓" : value()}
        </output>
        <div class="builder-actions">
          <button class="btn btn-primary" onClick={onCopy}>Copy</button>
          <button class="btn" classList={{ "is-fav": favourited() }} aria-pressed={favourited()} onClick={onFav}>
            {favourited() ? "★ Favourited" : "☆ Favourite"}
          </button>
          <button class="btn" onClick={onRandom}>🎲 Surprise me</button>
          <button class="btn" onClick={onShare}>⤴ Share</button>
        </div>
      </div>

      <For each={SLOTS}>
        {(slot) => {
          const opts = createMemo(() => {
            const all = galleries[slot.key];
            return expanded()[slot.key] ? all : all.slice(0, VISIBLE);
          });
          return (
            <div class="builder-row">
              <div class="builder-rowhead">{slot.label}</div>
              <div class="builder-chips">
                <For each={opts()}>
                  {(e) => (
                    <button
                      class="builder-chip"
                      classList={{ "is-on": isActive(sel(), slot, e), "is-none": e == null }}
                      aria-pressed={isActive(sel(), slot, e)}
                      aria-label={e == null ? `No ${slot.label.toLowerCase()}` : `${slot.label}: ${labelOf(slot.key, e)}`}
                      onClick={() => setSlot(slot.key, toEntry(slot, e))}
                    >
                      {labelOf(slot.key, e)}
                    </button>
                  )}
                </For>
                <Show when={galleries[slot.key].length > VISIBLE}>
                  <button class="builder-more" onClick={() => toggleMore(slot.key)}>
                    {expanded()[slot.key] ? "less" : "more…"}
                  </button>
                </Show>
              </div>
            </div>
          );
        }}
      </For>

      {/* Always in the DOM (empty) so the live region announces when text appears. */}
      <div class="toast" classList={{ "is-shown": !!toast() }} role="status" aria-live="polite">{toast()}</div>
    </section>
  );
}
