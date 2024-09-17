import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ghPages } from "vite-plugin-gh-pages";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/checklist/",
  plugins: [
    vue(),
    ghPages(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "To-Do App",
        short_name: "TODO",
        description: "A simple to-do list application",
        start_url: "/checklist/",
        display: "standalone",
        background_color: "#323232",
        theme_color: "#323232",
        icons: [
          {
            src: "/favicon-assets/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/favicon-assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/favicon-assets/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/favicon-assets/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
