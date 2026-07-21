import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { services } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, ArrowRight, FileCode2, FileText, LayoutDashboard, Award, Linkedin, Briefcase, Sparkles,
} from "lucide-react";
import { buildPageHead, PAGE_SEO } from "@/lib/seo";
import { FaqSection } from "@/components/seo/FaqSection";
import { servicesFaqs } from "@/data/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

const iconMap = { FileCode2, FileText, LayoutDashboard, Award, Linkedin, Briefcase, Sparkles } as const;

export const Route = createFileRoute("/services")({
  head: () => buildPageHead(PAGE_SEO.services),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <JsonLd data={[serviceSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
      <PageHero
        eyebrow="Career services"
        title={<>Resume building & <span className="text-gradient">career support for freshers</span></>}
        subtitle="Professional resume building, ATS-friendly digital resumes, LinkedIn optimization, portfolio building, IT certification guidance, and job application assistance — designed for students and early-career candidates."
      >
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/pricing">See pricing</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/ats-checker">Check your ATS score</Link></Button>
      </PageHero>

      <section className="section-y bg-surface">
        <div className="container-page max-w-4xl">
          <h2 className="font-display text-3xl font-bold tracking-tight">ATS-friendly resumes vs. digital resumes</h2>
          <p className="mt-4 text-muted-foreground">
            A <strong className="text-foreground font-medium">traditional ATS resume</strong> focuses on clean formatting, standard headings, and keywords that applicant tracking systems can parse. A{" "}
            <strong className="text-foreground font-medium">digital resume</strong> adds live links to your intro video, certifications, portfolio, and LinkedIn — useful when recruiters want more context in one document.
          </p>
          <p className="mt-4 text-muted-foreground">
            VyraPath offers both formats, plus resume customization for specific job descriptions through our{" "}
            <Link to="/services" hash="job-applications" className="text-primary hover:underline">job application assistance</Link> and{" "}
            <Link to="/services" hash="resume-monthly-subscription" className="text-primary hover:underline">monthly resume subscription</Link>.
            Before ordering, you can <Link to="/ats-checker" className="text-primary hover:underline">check your current ATS resume score</Link> for free.
          </p>
        </div>
      </section>

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
                      {s.slug === "digital-resume" || s.slug === "resume-building" ? (
                        <Button asChild variant="outline">
                          <Link to="/ats-checker">Check ATS score</Link>
                        </Button>
                      ) : null}
                      {s.slug === "portfolio-building" ? (
                        <Button asChild variant="outline">
                          <Link to="/portfolio">View samples</Link>
                        </Button>
                      ) : null}
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

      <FaqSection
        title="Resume building services FAQ"
        subtitle="Questions about ATS resumes, digital resumes, and fresher career support."
        faqs={servicesFaqs}
      />
    </>
  );
}
