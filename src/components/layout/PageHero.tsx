import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-hero">
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="container-page py-16 sm:py-24 text-center">
        {eyebrow && (
          <div className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-muted-foreground animate-fade-in-up">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
