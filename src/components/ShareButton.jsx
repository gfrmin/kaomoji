import { createSignal } from "solid-js";
import { shareKaomoji } from "../lib/share.js";

// Tiny island: share the current page via the native sheet, or copy its link.
export default function ShareButton(props) {
  const [msg, setMsg] = createSignal("");
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 1500); };
  const onClick = () =>
    shareKaomoji({ text: props.text, url: props.url, title: props.text }).then((r) => {
      if (r === "copied") flash("Link copied!");
      else if (r === "failed") flash("Couldn't copy");
    });
  return (
    <>
      <button class="share-btn" onClick={onClick} aria-label={`Share: ${props.text}`}>
        {msg() || "⤴ Share this page"}
      </button>
      {/* Always present so the live region announces the copied/failed result. */}
      <span class="visually-hidden" role="status" aria-live="polite">{msg()}</span>
    </>
  );
}
