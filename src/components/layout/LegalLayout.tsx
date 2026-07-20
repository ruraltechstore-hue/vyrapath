import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";

export function LegalLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={subtitle} />
      <section className="section-y">
        <div className="container-page max-w-3xl">
          <article className="prose prose-neutral max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-muted-foreground [&_li]:mt-1">
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
