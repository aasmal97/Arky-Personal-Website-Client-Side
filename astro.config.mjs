// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import sitemap from "@astrojs/sitemap";
const secrets = loadEnv(import.meta.env.MODE, process.cwd(), "REACT_APP");
// https://astro.build/config
export default defineConfig({
  site: "https://arkyasmal.com",
  integrations: [react(), sitemap()],
  vite: {
    define: {
      "process.env": JSON.stringify(secrets),
    },
  },
});
