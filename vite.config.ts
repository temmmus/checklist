import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { config } from "dotenv";
import { ghPages } from "vite-plugin-gh-pages";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

config();

// https://vitejs.dev/config/
export default defineConfig({
  base: "/checklist/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: Number(process.env.VITE_APP_PORT) || 4000,
  },
  plugins: [
    vue(),
    ghPages(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Todo app",
        short_name: "TODO",
        description: "A simple to-do list application",
        start_url: "/checklist/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#323232",
        theme_color: "#323232",
        icons: [
          {
            src: "/checklist/favicon-assets/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/checklist/favicon-assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/checklist/favicon-assets/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/checklist/favicon-assets/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
