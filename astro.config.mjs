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
    resolve: {
      alias: {
        // alias icons to their ESM version
        "@mui/icons-material": "@mui/icons-material/esm",
      },
    },
    ssr: {
      noExternal: /@mui\/.*?/,
    },
    define: {
      "process.env": JSON.stringify(secrets),
    },
  },
});
