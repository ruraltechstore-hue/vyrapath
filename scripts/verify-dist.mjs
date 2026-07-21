import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const requiredFiles = ["index.html", "robots.txt", "sitemap.xml", ".htaccess"];

const missing = requiredFiles.filter((file) => !existsSync(resolve(distDir, file)));
if (missing.length > 0) {
  console.error("Build verification failed. Missing from dist/:");
  for (const file of missing) console.error(`  - ${file}`);
  process.exit(1);
}

const sitemap = readFileSync(resolve(distDir, "sitemap.xml"), "utf8");
if (!sitemap.startsWith("<?xml") || !sitemap.includes("<urlset")) {
  console.error("Build verification failed. dist/sitemap.xml is not valid XML.");
  process.exit(1);
}

if (!sitemap.includes("https://vyrapath.com/")) {
  console.error("Build verification failed. dist/sitemap.xml is missing vyrapath.com URLs.");
  process.exit(1);
}

console.log("dist/ verification passed:");
for (const file of requiredFiles) {
  console.log(`  ✓ ${file}`);
}
