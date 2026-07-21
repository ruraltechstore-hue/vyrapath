import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { alaCarte, plans } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildPageHead, PAGE_SEO } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const Route = createFileRoute("/pricing")({
  head: () => buildPageHead(PAGE_SEO.pricing),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <PageHero
        eyebrow="Pricing"
        title={<>Resume & career service <span className="text-gradient">pricing</span></>}
        subtitle="Transparent pricing for ATS-friendly resume building, LinkedIn optimization, portfolio services, and job application support. Pay à la carte or bundle into a fresher career package."
      />

      {/* PLANS */}
      <section className="section-y">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Bundle & save with a plan</h2>
            <p className="mt-3 text-muted-foreground">Three plans, built around what early-career candidates actually need at each stage.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative p-8 flex flex-col transition-all",
                  plan.popular
                    ? "border-primary/50 shadow-elegant lg:scale-[1.03] bg-surface-elevated"
                    : "hover:-translate-y-1 hover:shadow-card",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold shadow-elegant">
                      <Star className="h-3 w-3 fill-current" /> Most Popular
                    </div>
                  </div>
                )}
                <div>
                  <div className="font-display text-xl font-bold">{plan.name}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                </div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </div>
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-success/15 shrink-0">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "mt-8",
                    plan.popular
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "",
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to="/contact">Choose {plan.name}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* À LA CARTE */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">À la carte services</h2>
            <p className="mt-3 text-muted-foreground">One-off services if you don't need the full bundle.</p>
          </div>
          <div className="mt-8 max-w-3xl mx-auto rounded-2xl border border-primary/30 bg-surface-elevated p-5 text-center shadow-card">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Premium recurring</div>
            <div className="mt-2 font-display text-lg font-bold">Resume Monthly Subscription</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Daily AI-tailored resumes based on job descriptions — $279/month. Cancel anytime.
            </p>
          </div>
          <Card className="mt-10 overflow-hidden p-0 max-w-3xl mx-auto">
            <table className="w-full">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Service</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {alaCarte.map((row, i) => (
                  <tr key={row.name} className={cn("border-t border-border/60", i % 2 === 1 && "bg-secondary/20")}>
                    <td className="px-6 py-4 text-sm">
                      {row.name}
                      {row.note && <span className="ml-2 text-xs text-muted-foreground">({row.note})</span>}
                    </td>
                    <td className="px-6 py-4 text-right font-display font-bold">${row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <p className="mt-4 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            Not sure which option fits? <Link to="/ats-checker" className="text-primary hover:underline">Check your ATS resume score</Link> for free, or <Link to="/contact" className="text-primary hover:underline">talk to our team</Link> about resume building services for freshers.
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">Prices in USD. Local billing available on request.</p>
        </div>
      </section>
    </>
  );
}
