import { contactInfo } from "@/data/site";
import type { FAQ } from "@/data/site";
import { SITE_NAME, SITE_URL } from "./seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: contactInfo.emails[0],
    telephone: contactInfo.phones[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: contactInfo.address,
      addressCountry: "IN",
    },
    sameAs: [],
    description:
      "VyraPath is a career support platform helping students and freshers with ATS-friendly resumes, resume building, ATS checking, professional portfolios, LinkedIn optimization, IT certification support, and job application assistance.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Build ATS-friendly resumes, check your ATS score, improve your LinkedIn profile, create professional portfolios, and get career support for job applications with VyraPath.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VyraPath Career Services",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: ["IN", "US", "GB", "IE", "DE"],
    serviceType: [
      "ATS-friendly resume building",
      "Resume writing for freshers",
      "LinkedIn profile optimization",
      "Portfolio building",
      "IT certification guidance",
      "Job application assistance",
    ],
    url: `${SITE_URL}/services`,
    description:
      "Professional resume building, ATS resume checking, LinkedIn optimization, portfolio building, and job application support for students and freshers.",
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  cover: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.cover,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}
