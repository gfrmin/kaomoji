import { createSignal, onMount, onCleanup, Show } from "solid-js";

// Header chrome: theme toggle + (when available) an install affordance for the PWA.
// The anti-FOUC theme bootstrap + beforeinstallprompt capture live as an is:inline
// script in Layout.astro so they run before paint / before this island hydrates;
// this component only reads/reacts to that state.

const THEME_KEY = "kaomoji-theme";
const THEME_COLOR = { light: "#f1ecff", dark: "#1a1040" };

const applyTheme = (t) => {
  document.documentElement.dataset.theme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[t]);
};

export default function Chrome() {
  const [theme, setTheme] = createSignal("dark");
  const [canInstall, setCanInstall] = createSignal(false);

  onMount(() => {
    setTheme(document.documentElement.dataset.theme || "dark");

    const syncInstall = () => setCanInstall(!!window.__installPrompt);
    syncInstall();
    window.addEventListener("installpromptready", syncInstall);
    onCleanup(() => window.removeEventListener("installpromptready", syncInstall));
  });

  const toggleTheme = () => {
    const next = theme() === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  };

  const install = async () => {
    const prompt = window.__installPrompt;
    if (!prompt) return;
    prompt.prompt();
    try { await prompt.userChoice; } catch {}
    window.__installPrompt = null;
    setCanInstall(false);
  };

  return (
    <div class="chrome">
      <Show when={canInstall()}>
        <button class="chrome-btn chrome-install" onClick={install} aria-label="Install the Kaomoji app">
          <span aria-hidden="true">⤓</span> Install
        </button>
      </Show>
      <button
        class="chrome-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme() === "light" ? "dark" : "light"} theme`}
        title="Toggle theme"
      >
        {theme() === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
