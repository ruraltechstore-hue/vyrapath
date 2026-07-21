export const SITE_URL = "https://vyrapath.com";
export const SITE_NAME = "VYRAPATH";

export type PagePath =
  | "/"
  | "/services"
  | "/pricing"
  | "/ats-checker"
  | "/portfolio"
  | "/testimonials"
  | "/about"
  | "/contact"
  | "/blog";

export function pageUrl(path: PagePath) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function articleUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}

type PageSeo = {
  title: string;
  description: string;
  path: PagePath;
};

export const PAGE_SEO = {
  home: {
    title: "ATS Resume Builder & Career Services for Freshers | VyraPath",
    description:
      "Build ATS-friendly resumes, check your ATS score, improve your LinkedIn profile, create professional portfolios, and get career support for job applications with VyraPath.",
    path: "/",
  },
  services: {
    title: "Resume Building & Career Services for Freshers | VyraPath",
    description:
      "Professional resume building, ATS-friendly digital resumes, LinkedIn optimization, portfolio building, IT certification guidance, and job application assistance for students and freshers.",
    path: "/services",
  },
  pricing: {
    title: "Resume & Career Service Pricing for Freshers | VyraPath",
    description:
      "Transparent pricing for ATS-friendly resume building, LinkedIn optimization, portfolio services, and career packages. À la carte from $15 or bundled plans from $229.",
    path: "/pricing",
  },
  atsChecker: {
    title: "Free ATS Resume Checker & ATS Score Tool | VyraPath",
    description:
      "Check your resume ATS score for free. Upload your resume and get an instant compatibility report with category breakdown and improvement tips — no signup required.",
    path: "/ats-checker",
  },
  work: {
    title: "Resume & Portfolio Work Samples for Freshers | VyraPath",
    description:
      "See sample ATS-friendly resumes, professional portfolios, and LinkedIn profile transformations built for students and freshers by VyraPath.",
    path: "/portfolio",
  },
  testimonials: {
    title: "Fresher Career Success Stories & Outcomes | VyraPath",
    description:
      "Read anonymized stories from students and freshers who improved their resumes, profiles, and job applications with VyraPath career services.",
    path: "/testimonials",
  },
  about: {
    title: "About VyraPath — Career Support for Students & Freshers",
    description:
      "VyraPath helps students and freshers with ATS-friendly resumes, resume building, LinkedIn optimization, portfolio building, and job application assistance worldwide.",
    path: "/about",
  },
  contact: {
    title: "Contact VyraPath — Resume & Career Support",
    description:
      "Talk to VyraPath about resume building, ATS checking, LinkedIn optimization, portfolio services, or job application support. We reply within 24 hours.",
    path: "/contact",
  },
  blog: {
    title: "Career Resources — ATS Resumes, LinkedIn & Job Search | VyraPath",
    description:
      "Practical guides on ATS-friendly resumes, resume ATS scores, LinkedIn optimization, portfolio building, and job search tips for students and freshers.",
    path: "/blog",
  },
} as const satisfies Record<string, PageSeo>;

type HeadResult = {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
};

function baseMeta(title: string, description: string, url: string): HeadResult {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function buildPageHead(page: PageSeo) {
  return baseMeta(page.title, page.description, pageUrl(page.path));
}

export function buildArticleHead(article: { title: string; description: string; slug: string }) {
  return baseMeta(article.title, article.description, articleUrl(article.slug));
}

export function buildRootHead() {
  const home = PAGE_SEO.home;
  const head = baseMeta(home.title, home.description, pageUrl(home.path));

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE_NAME },
      ...head.meta,
    ],
    links: [
      ...head.links,
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "32x32" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  };
}
