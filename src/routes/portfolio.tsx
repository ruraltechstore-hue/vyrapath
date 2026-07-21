import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Layout, Linkedin, ExternalLink } from "lucide-react";
import { buildPageHead, PAGE_SEO } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/portfolio")({
  head: () => buildPageHead(PAGE_SEO.work),
  component: PortfolioPage,
});

const samples = [
  { type: "Digital Resume", role: "Frontend Developer", tag: "IT", icon: FileText, img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&auto=format&fit=crop&q=75" },
  { type: "Portfolio Site", role: "UX Designer", tag: "Design", icon: Layout, img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&auto=format&fit=crop&q=75" },
  { type: "LinkedIn Rewrite", role: "Data Analyst", tag: "Analytics", icon: Linkedin, img: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=900&auto=format&fit=crop&q=75" },
  { type: "Digital Resume", role: "Cloud Engineer", tag: "IT", icon: FileText, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=75" },
  { type: "Portfolio Site", role: "Product Manager", tag: "Product", icon: Layout, img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=75" },
  { type: "Resume", role: "Financial Analyst", tag: "Finance", icon: FileText, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=75" },
];

function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work Samples", path: "/portfolio" }])} />
      <PageHero
        eyebrow="Work samples"
        title={<>Professional <span className="text-gradient">portfolio & resume</span> samples</>}
        subtitle="Sample ATS-friendly resumes, portfolio sites, and LinkedIn profile transformations built for students and freshers. Real client work is under NDA — these illustrate our approach."
      />
      <section className="section-y bg-surface">
        <div className="container-page max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight">Portfolio building for students and freshers</h2>
          <p className="mt-4 text-muted-foreground">
            A professional portfolio complements your resume by showing projects, case studies, and proof of skills. VyraPath builds responsive portfolio sites alongside{" "}
            <Link to="/services" hash="digital-resume" className="text-primary hover:underline">ATS-friendly resume building</Link> and{" "}
            <Link to="/services" hash="linkedin-optimization" className="text-primary hover:underline">LinkedIn profile optimization</Link>.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((s, i) => (
              <Card key={i} className="overflow-hidden p-0 group hover:-translate-y-1 hover:shadow-elegant transition-all">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img src={s.img} alt={`${s.type} — ${s.role}`} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-surface-elevated/90 text-foreground border border-border backdrop-blur-sm">{s.tag}</Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-xl bg-surface-elevated/95 backdrop-blur text-primary shadow-card">
                    <s.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider">{s.type}</div>
                  <div className="mt-1 font-display font-semibold">{s.role}</div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Sample project</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-14 text-center">
            <p className="text-muted-foreground">Want samples for your role or ready to start?</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg"><Link to="/contact">Request samples</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/services" hash="portfolio-building">Portfolio building services</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
