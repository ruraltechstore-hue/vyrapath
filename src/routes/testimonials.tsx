import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { OutcomeMailCard } from "@/components/testimonials/OutcomeMailCard";
import { outcomeProofs } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { buildPageHead, PAGE_SEO } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/testimonials")({
  head: () => buildPageHead(PAGE_SEO.testimonials),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const avg = (outcomeProofs.reduce((a, t) => a + t.rating, 0) / outcomeProofs.length).toFixed(1);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Testimonials", path: "/testimonials" }])} />
      <PageHero
        eyebrow="Testimonials"
        title={<>Fresher career <span className="text-gradient">success stories</span></>}
        subtitle="Anonymized outcomes from students who used VyraPath resume building, LinkedIn optimization, and job application services. Individual results vary — we do not guarantee interviews or employment."
      >
        <div className="flex items-center gap-2 rounded-full bg-surface-elevated border border-border px-4 py-2 shadow-card">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-semibold">{avg}/5</span>
          <span className="text-sm text-muted-foreground">from {outcomeProofs.length}+ freshers</span>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outcomeProofs.map((proof, i) => (
              <OutcomeMailCard
                key={`${proof.subject}-${i}`}
                proof={proof}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className="mt-14 text-center">
            <p className="text-muted-foreground">
              Ready to strengthen your resume and applications?{" "}
              <Link to="/ats-checker" className="text-primary hover:underline">Check your ATS score</Link> or explore{" "}
              <Link to="/services" className="text-primary hover:underline">career services for freshers</Link>.
            </p>
            <Button asChild size="lg" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/pricing">Start your story</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
