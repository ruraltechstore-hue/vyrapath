import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { services } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, ArrowRight, FileCode2, FileText, LayoutDashboard, Award, Linkedin, Briefcase, Sparkles,
} from "lucide-react";

const iconMap = { FileCode2, FileText, LayoutDashboard, Award, Linkedin, Briefcase, Sparkles } as const;

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — VYRAPATH" },
      { name: "description", content: "Digital resumes, portfolios, LinkedIn optimization, IT certifications, job applications and more. Everything to become hire-ready." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Pick the piece — or take the <span className="text-gradient">full path</span></>}
        subtitle="Every service is designed to plug into the next. Buy one, or bundle them into a plan that gets you hire-ready end-to-end."
      >
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/pricing">See pricing</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/contact">Not sure? Talk to us</Link></Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page space-y-8">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            const flip = i % 2 === 1;
            return (
              <Card key={s.slug} id={s.slug} className="scroll-mt-24 overflow-hidden p-0 border-border/60">
                <div className={`grid gap-0 lg:grid-cols-[1.2fr_1fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                        <Icon className="h-6 w-6" />
                      </div>
                      {s.featured && <Badge className="bg-accent text-accent-foreground hover:bg-accent">Most Loved</Badge>}
                    </div>
                    <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold tracking-tight">{s.name}</h2>
                    <p className="mt-2 text-primary font-medium">{s.tagline}</p>
                    <p className="mt-4 text-muted-foreground">{s.description}</p>
                    <ul className="mt-6 space-y-2.5">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 mt-0.5 text-success shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">{s.priceLabel ? "From" : "Starting at"}</div>
                        <div className="font-display text-3xl font-bold">
                          ${s.price}
                          {s.priceLabel && <span className="text-base font-normal text-muted-foreground"> / month</span>}
                        </div>
                      </div>
                      <Button asChild className="ml-auto">
                        <Link to="/contact">Get started <ArrowRight className="ml-1 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative bg-surface min-h-[240px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-border/60">
                    <img src={s.image} alt={s.name} loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 via-primary/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 grid h-14 w-14 place-items-center rounded-2xl bg-surface-elevated/95 backdrop-blur text-primary shadow-elegant">
                      <Icon className="h-7 w-7" strokeWidth={1.6} />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
