import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { buildPageHead, PAGE_SEO } from "@/lib/seo";
import { blogPosts } from "@/data/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/blog")({
  head: () => buildPageHead(PAGE_SEO.blog),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="Blog & Resources"
        title={<>Career guides for <span className="text-gradient">ATS resumes & job search</span></>}
        subtitle="Practical articles on ATS-friendly resumes, resume ATS scores, LinkedIn optimization, portfolio building, and applying for jobs as a fresher."
      />
      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}>
                <Card className="p-0 overflow-hidden group hover:-translate-y-1 hover:shadow-elegant transition-all h-full">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={p.cover} alt={p.title} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    <Badge variant="secondary" className="absolute top-3 left-3 bg-surface-elevated/90 backdrop-blur">{p.tag}</Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {p.read}
                    </div>
                    <h2 className="mt-3 font-display text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary">
                      Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
