import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://til.esakki.app",
  base: "/",
  experimental: {
    svg: true,
  },
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
    },
  },
});
