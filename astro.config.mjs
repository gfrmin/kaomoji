import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import { SITE } from "./src/consts.js";

export default defineConfig({
  site: SITE,
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  integrations: [
    solid(),
    sitemap(),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Kaomoji — Japanese Emoticons, Emoji & Text Faces",
        short_name: "Kaomoji",
        description:
          "The fast, installable kaomoji picker. Copy & paste 700+ Japanese emoticons, text faces, emoji and symbols.",
        theme_color: "#1a1040",
        background_color: "#0d0b1a",
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
      },
      workbox: {
        globPatterns: ["**/*.{html,js,css,svg,png,ico,webp,woff2,xml,txt}"],
        navigateFallback: "/",
        cleanupOutdatedCaches: true,
      },
      experimental: { directoryAndTrailingSlashHandler: true },
    }),
  ],
});
