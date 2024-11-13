import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/playwright",
  retries: 1,
  reporter: [["html", { open: "never" }]],
  use: {
    headless: true,
    screenshot: "only-on-failure",
  },
});
