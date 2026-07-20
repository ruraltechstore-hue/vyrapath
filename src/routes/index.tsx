import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services, stats, outcomeProofs, images } from "@/data/site";
import { OutcomeMailCard } from "@/components/testimonials/OutcomeMailCard";
import {
  ArrowRight, Sparkles, ClipboardCheck, MessageSquare, Rocket, Star, Mail,
  FileCode2, FileText, LayoutDashboard, Award, Linkedin, CheckCircle2, Briefcase,
} from "lucide-react";

const iconMap = { FileCode2, FileText, LayoutDashboard, Award, Linkedin, Briefcase, Sparkles } as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYRAPATH — Land Interviews, Not Just Apply" },
      { name: "description", content: "Digital resumes, portfolios, LinkedIn optimization, IT certifications, and a real ATS score checker. 500+ interview schedules, 1,000+ students who got interview calls, messages and mails." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute -top-24 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary-glow/20 blur-3xl animate-orbit-pulse" />
        <div className="container-page pt-16 pb-20 sm:pt-20 sm:pb-24 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <div
                className="inline-flex justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase"
                aria-label="VYRAPATH"
              >
                {"VYRAPATH".split("").map((letter, i) => (
                  <span key={i} className="text-gradient">
                    {letter}
                  </span>
                ))}
              </div>
              <div className="mx-auto lg:mx-0 mt-3 h-px w-full max-w-xs bg-gradient-to-r from-primary via-accent to-transparent opacity-70" />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-muted-foreground animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              500+ interview schedules delivered
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: "80ms" }}>
              Your career, on a{" "}
              <span className="text-gradient">clearer path</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "160ms" }}>
              Resumes recruiters actually open. Portfolios hiring managers remember. Profiles that get found. Built for students — mainly focused on freshers who are ready to work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant">
                <Link to="/pricing">Get started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/ats-checker">Score my resume free</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 animate-fade-in-up" style={{ animationDelay: "320ms" }}>
              <div className="flex gap-1.5">
                {[
                  { label: "Offer", icon: CheckCircle2 },
                  { label: "Interview", icon: MessageSquare },
                  { label: "Shortlist", icon: Mail },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                  >
                    <badge.icon className="h-3 w-3 text-primary" />
                    {badge.label}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}
                </div>
                <div className="text-xs text-muted-foreground">Trusted by 1,000+ freshers</div>
              </div>
            </div>
          </div>

          {/* Hero image collage */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden shadow-elegant">
              <img src={images.heroMain} alt="Indian professional working on a resume at a laptop"
                loading="eager" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -left-6 w-40 rounded-2xl overflow-hidden shadow-elegant ring-4 ring-background rotate-[-6deg]">
              <img src={images.heroSecondary} alt="Indian students collaborating on career planning" loading="lazy" className="h-32 w-full object-cover" />
            </div>
            <div className="hidden sm:flex absolute -top-6 -right-4 items-center gap-2 rounded-2xl bg-surface-elevated shadow-elegant border border-border px-4 py-3 rotate-[4deg]">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-success/15 text-success">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Interview scheduled</div>
                <div className="text-sm font-semibold">Aurora Tech · Frontend</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border/60 bg-surface">
        <div className="container-page py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">Why VYRAPATH</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              We don't hand you a template. We build you a hiring advantage.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We've watched what actually converts applications into interview calls, messages and mails. That's what we build for you — every piece connected: resume, portfolio, LinkedIn, certifications.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "ATS-first, human-second", body: "Every resume passes automated filters before it hits a recruiter's desk." },
              { title: "Real portfolios, real projects", body: "Not just a PDF — a live URL you can share in your applications." },
              { title: "Live-linked digital resumes", body: "Video intros, cert links, portfolio and LinkedIn built into one document." },
              { title: "Honest, coaching-first", body: "We push back when copy is fluffy. Tighter wins interviews." },
            ].map((f) => (
              <Card key={f.title} className="p-5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <div className="mt-3 font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.body}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">Services</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">Everything you need to become hire-ready</h2>
            <p className="mt-4 text-muted-foreground">Buy à la carte or bundle into a plan — start with the ATS checker if you want a free pulse-check.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <Link key={s.slug} to="/services" hash={s.slug}>
                  <Card className="p-6 h-full transition-all hover:-translate-y-1 hover:shadow-elegant border-border/60 group">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground group-hover:shadow-glow transition-shadow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="font-display font-semibold">{s.name}</div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{s.tagline}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.priceLabel ? "From" : "Starting at"}</span>
                      <span className="font-display font-bold text-lg">
                        ${s.price}{s.priceLabel ? <span className="text-sm font-normal text-muted-foreground"> / mo</span> : null}
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-y">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">How it works</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">From order to offer in four steps</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ClipboardCheck, title: "Pick a service", body: "Choose à la carte or a plan.", img: images.step1, alt: "Indian fresher choosing a career service on laptop" },
              { icon: MessageSquare, title: "Quick intake call", body: "20-minute call, we get your story.", img: images.step2, alt: "Indian professional on a video intake call" },
              { icon: Sparkles, title: "We build & refine", body: "Draft in 3–5 days, you revise.", img: images.step3, alt: "Indian mentor and student reviewing a resume draft" },
              { icon: Rocket, title: "You start applying", body: "Ship a profile recruiters open.", img: images.step4, alt: "Indian graduate applying to jobs on laptop" },
            ].map((step, i) => (
              <Card key={step.title} className="p-0 overflow-hidden h-full group hover:-translate-y-1 hover:shadow-elegant transition-all">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={step.img} alt={step.alt} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <span className="absolute top-3 right-3 font-display text-2xl font-bold text-white drop-shadow">0{i + 1}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary">
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-display font-semibold">{step.title}</div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{step.body}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-primary">Voices</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">Students who got interview calls</h2>
            </div>
            <Button asChild variant="outline"><Link to="/testimonials">Read all stories <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {outcomeProofs.slice(0, 3).map((proof, i) => (
              <OutcomeMailCard key={`${proof.subject}-${i}`} proof={proof} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 sm:p-16 text-center shadow-elegant">
            <img src={images.celebrate} alt="" loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/95" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <h2 className="relative font-display text-3xl sm:text-5xl font-bold tracking-tight">Ready to stop guessing?</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/80">Start with a free ATS check, or jump straight into a plan built for early-career candidates.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/pricing">See pricing</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
