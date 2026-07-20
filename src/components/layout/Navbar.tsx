import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/BrandLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/ats-checker", label: "ATS Checker" },
  { to: "/portfolio", label: "Work" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center group shrink-0" onClick={() => setOpen(false)}>
          <BrandLogo size="md" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
            <Link to="/contact">Contact</Link>
          </Button>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant">
            <Link to="/pricing">Get Started</Link>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border/60 transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="container-page py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-secondary text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
