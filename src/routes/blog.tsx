import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Resources — VYRAPATH" },
      { name: "description", content: "Career tips, resume advice, and job-hunt strategy for students and freshers." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { tag: "Resumes", title: "The 7-second scan: what recruiters look for", read: "5 min", excerpt: "The average recruiter spends less than 10 seconds on your resume. Here's exactly what they look at — and how to design for it.", cover: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop&q=75" },
  { tag: "LinkedIn", title: "Rewriting your headline for recruiter search", read: "4 min", excerpt: "Your headline is the single most-searched field on LinkedIn. A tiny rewrite can double your profile views in a week.", cover: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=900&auto=format&fit=crop&q=75" },
  { tag: "Portfolio", title: "What to put in your first portfolio (with 0 experience)", read: "6 min", excerpt: "You don't need a job to have a portfolio. Here's what freshers should build to get their first callback.", cover: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&auto=format&fit=crop&q=75" },
  { tag: "ATS", title: "Why your resume isn't reaching humans", read: "4 min", excerpt: "80% of resumes are filtered before a human ever sees them. The fixes are simpler than you think.", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=75" },
  { tag: "Applications", title: "How to tailor every application without burning out", read: "5 min", excerpt: "Applying to dozens of roles? Here's how to customize each resume and cover letter efficiently — without starting from scratch every time.", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=75" },
  { tag: "Interviews", title: "Turning your projects into interview stories", read: "7 min", excerpt: "Every project on your resume is an interview question waiting to happen. Learn the STAR framework applied to student projects.", cover: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&auto=format&fit=crop&q=75" },
];

function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog & Resources"
        title={<>Career tips that <span className="text-gradient">actually help</span></>}
        subtitle="Short, practical writing for students — mainly focused on freshers. No fluff."
      />
      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Card key={i} className="p-0 overflow-hidden group hover:-translate-y-1 hover:shadow-elegant transition-all cursor-pointer">
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
                  <h3 className="mt-3 font-display text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary">
                    Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
