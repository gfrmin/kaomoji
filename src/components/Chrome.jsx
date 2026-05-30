import { createSignal, onMount, onCleanup, Show } from "solid-js";

// Header chrome: an install affordance for the PWA when the browser offers one.
// The beforeinstallprompt capture lives as an is:inline script in Layout.astro so
// it runs before this island hydrates; this component only reads/reacts to it.
// (The light/dark theme toggle was removed with the move to the single warm theme.)

export default function Chrome() {
  const [canInstall, setCanInstall] = createSignal(false);

  onMount(() => {
    const syncInstall = () => setCanInstall(!!window.__installPrompt);
    syncInstall();
    window.addEventListener("installpromptready", syncInstall);
    onCleanup(() => window.removeEventListener("installpromptready", syncInstall));
  });

  const install = async () => {
    const prompt = window.__installPrompt;
    if (!prompt) return;
    prompt.prompt();
    try { await prompt.userChoice; } catch {}
    window.__installPrompt = null;
    setCanInstall(false);
  };

  return (
    <Show when={canInstall()}>
      <div class="chrome">
        <button class="chrome-btn chrome-install" onClick={install} aria-label="Install the Kaomoji app">
          <span aria-hidden="true">⤓</span> Install
        </button>
      </div>
    </Show>
  );
}
