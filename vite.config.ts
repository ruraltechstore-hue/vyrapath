import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { buildSitemapXml } from "./src/lib/sitemap";

function writeSitemap(outDir: string) {
  const dir = resolve(outDir);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(resolve(dir, "sitemap.xml"), buildSitemapXml(), "utf8");
}

function sitemapPlugin(): Plugin {
  return {
    name: "vyrapath-sitemap",
    apply: "build",
    buildStart() {
      // Ensures public/sitemap.xml exists before Vite copies public/ → dist/
      writeSitemap("public");
    },
    closeBundle() {
      // Final write after the dist/ folder is complete
      writeSitemap("dist");
    },
  };
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      tmpDir: "node_modules/.cache/tanstack-router",
    }),
    react(),
    tailwindcss(),
    sitemapPlugin(),
  ],
});
