import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceRegionsMap } from "@/components/about/ServiceRegionsMap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { stats, images } from "@/data/site";
import { Target, Heart, Compass, Users, Trophy, Sparkles } from "lucide-react";
import { buildPageHead, PAGE_SEO } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/about")({
  head: () => buildPageHead(PAGE_SEO.about),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Outcomes over vanity", body: "We optimize for interview calls, messages and mails — not fancy templates or clever copy." },
  { icon: Heart, title: "Coach, don't sell", body: "We push back when a claim is fluffy. Tighter, honest resumes convert better." },
  { icon: Compass, title: "Guide, then hand off", body: "You leave knowing how to keep your profile sharp on your own." },
];

const timeline = [
  { year: "2015", title: "The beginning", body: "Started as a small team helping students in one campus career cell." },
  { year: "2018", title: "Portfolios enter the mix", body: "Added portfolio builds when we saw how few students had a live URL to share." },
  { year: "2020", title: "Digital resume launched", body: "Introduced our signature digital resume with embedded intro videos and live links." },
  { year: "2022", title: "1,000+ interview calls", body: "Crossed 1,000 interview calls and recruiter messages across IT, marketing, finance and design roles." },
  { year: "2025", title: "500+ interviews scheduled", body: "Now serving students — mainly freshers — across India, UAE and Southeast Asia." },
];

function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About VyraPath"
        title={<>Career support for <span className="text-gradient">students & freshers</span></>}
        subtitle="VyraPath is a career support platform helping students and freshers with ATS-friendly resumes, resume building, ATS checking, professional portfolios, LinkedIn optimization, IT certification support, and job application assistance."
      />

      {/* Mission */}
      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-elegant">
              <img src={images.workspace} alt="Indian professionals collaborating in a modern office environment" loading="lazy"
                className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden sm:grid grid-cols-2 gap-3 rounded-2xl bg-surface-elevated shadow-elegant border border-border p-4">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="text-center px-3">
                  <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">Our mission</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Every student deserves a fair shot at interview calls and replies.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Most students don't lose out because they're unqualified — they lose out because their resume, portfolio and profile don't communicate what they can actually do. We fix that.
            </p>
            <p className="mt-4 text-muted-foreground">
              We're not a course, a template shop, or a bot. We're a small team of writers, designers and career coaches — mainly focused on freshers.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <Card key={s.label} className="p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">Global reach</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Serving students across key global markets
            </h2>
            <p className="mt-4 text-muted-foreground">
              We help freshers build hire-ready profiles for opportunities in the USA, UK, Ireland, and Germany.
            </p>
          </div>
          <div className="mt-10">
            <ServiceRegionsMap />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">What we believe</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">Principles we don't compromise on</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title} className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display font-semibold">{v.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{v.body}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">Milestones</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">On the path to interviews</h2>
          </div>
          <div className="mt-12 relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 pb-10 ${i % 2 === 1 ? "sm:[&>*:first-child]:col-start-2" : ""}`}>
                <div className="absolute left-2 sm:left-1/2 top-2 h-5 w-5 -translate-x-1/2 rounded-full bg-gradient-primary shadow-glow ring-4 ring-background" />
                <Card className={`p-5 ${i % 2 === 1 ? "sm:col-start-2" : ""}`}>
                  <div className="text-sm font-semibold text-primary">{t.year}</div>
                  <div className="mt-1 font-display font-semibold">{t.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{t.body}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: "Mainly focused on freshers", body: "We work mainly with freshers — early-career is our specialty." },
              { icon: Trophy, title: "Track record", body: "Over a thousand students who got interview calls, messages and mails across engineering, marketing, design and finance." },
              { icon: Sparkles, title: "Modern-first", body: "Digital resumes with live links, portfolios with case studies, and profiles that read like a story." },
            ].map((w) => (
              <Card key={w.title} className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary">
                  <w.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 font-display font-semibold">{w.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{w.body}</div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Work with us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
