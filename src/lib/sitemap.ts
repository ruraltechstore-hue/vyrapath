import { SITE_URL } from "./seo";
import { blogPosts } from "../data/blog";

export type SitemapEntry = {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

/** Indexable public pages — excludes /privacy, /terms, /refund */
export const SITEMAP_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/services", changefreq: "monthly", priority: 0.9 },
  { path: "/pricing", changefreq: "monthly", priority: 0.9 },
  { path: "/ats-checker", changefreq: "monthly", priority: 0.9 },
  { path: "/portfolio", changefreq: "monthly", priority: 0.8 },
  { path: "/testimonials", changefreq: "monthly", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "yearly", priority: 0.8 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: "monthly" as const,
    priority: 0.6,
  })),
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function locForPath(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = SITEMAP_ENTRIES.map(
    (entry) => `  <url>
    <loc>${escapeXml(locForPath(entry.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
