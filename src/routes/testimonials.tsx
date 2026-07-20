import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { OutcomeMailCard } from "@/components/testimonials/OutcomeMailCard";
import { outcomeProofs } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — VYRAPATH" },
      { name: "description", content: "Anonymized outcome proof from students and freshers — interview invites, offer letters, and recruiter replies." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const avg = (outcomeProofs.reduce((a, t) => a + t.rating, 0) / outcomeProofs.length).toFixed(1);
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={<>Stories from <span className="text-gradient">VYRAPATH</span></>}
        subtitle="Real outcomes from students we've worked with — interview invites, offer letters, and recruiter replies. Personal details are anonymized."
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
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/pricing">Start your story</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
