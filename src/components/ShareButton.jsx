import { createSignal } from "solid-js";
import { shareKaomoji } from "../lib/share.js";

// Tiny island: share the current page via the native sheet, or copy its link.
export default function ShareButton(props) {
  const [msg, setMsg] = createSignal("");
  const onClick = () =>
    shareKaomoji({ text: props.text, url: props.url, title: props.text }).then((r) => {
      if (r === "copied") {
        setMsg("Link copied!");
        setTimeout(() => setMsg(""), 1500);
      }
    });
  return (
    <button class="share-btn" onClick={onClick} aria-label={`Share ${props.text}`}>
      {msg() || "⤴ Share this page"}
    </button>
  );
}
