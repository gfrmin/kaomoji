import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import { SITE } from "./src/consts.js";

// Single build timestamp so the sitemap carries a freshness signal per deploy.
const buildDate = new Date().toISOString();

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",
  prefetch: {
    // Prefetch on hover/focus intent rather than eagerly for every in-viewport
    // link (the home page has ~60), so we don't burn bandwidth on slow links.
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    solid(),
    sitemap({
      filter: (page) => !page.includes("/og/"),
      serialize(item) {
        item.lastmod = buildDate;
        return item;
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        id: "/",
        name: "Kaomoji — Japanese Emoticons, Emoji & Text Faces",
        short_name: "Kaomoji",
        description:
          "The fast, installable kaomoji picker. Copy & paste 700+ Japanese emoticons, text faces, emoji and symbols.",
        lang: "en",
        dir: "ltr",
        theme_color: "#fdf6ea",
        background_color: "#fdf6ea",
        display: "standalone",
        start_url: "/",
        scope: "/",
        categories: ["utilities", "productivity", "social"],
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        ],
        shortcuts: [
          { name: "Happy kaomoji", short_name: "Happy", url: "/kaomoji/happy/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
          { name: "Kawaii kaomoji", short_name: "Kawaii", url: "/kaomoji/kawaii/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
          { name: "Animal kaomoji", short_name: "Animals", url: "/kaomoji/animals/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
          { name: "Love kaomoji", short_name: "Love", url: "/kaomoji/love/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
        ],
        screenshots: [
          { src: "/screenshots/mobile.png", sizes: "390x844", type: "image/png", form_factor: "narrow", label: "Kaomoji picker on mobile" },
          { src: "/screenshots/desktop.png", sizes: "1280x800", type: "image/png", form_factor: "wide", label: "Kaomoji picker on desktop" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{html,js,css,svg,png,ico,webp,woff2,xml,txt}"],
        // Social cards are only fetched by crawlers — don't bloat the offline precache.
        globIgnores: ["**/og/**"],
        navigateFallback: "/",
        cleanupOutdatedCaches: true,
      },
      experimental: { directoryAndTrailingSlashHandler: true },
    }),
  ],
});
