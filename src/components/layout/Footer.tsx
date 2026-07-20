import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/BrandLogo";

const columns = [
  {
    title: "Services",
    links: [
      { to: "/services", label: "All Services" },
      { to: "/services", label: "Digital Resume", hash: "digital-resume" },
      { to: "/services", label: "Portfolio Building", hash: "portfolio-building" },
      { to: "/services", label: "LinkedIn Optimization", hash: "linkedin-optimization" },
      { to: "/services", label: "IT Certifications", hash: "it-certification" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/testimonials", label: "Testimonials" },
      { to: "/portfolio", label: "Work Samples" },
      { to: "/blog", label: "Blog & Resources" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Tools",
    links: [
      { to: "/ats-checker", label: "ATS Resume Score" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
      { to: "/refund", label: "Refund Policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link to="/" className="inline-flex">
              <BrandLogo size="lg" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Helping students — mainly focused on freshers — get interview calls, messages and mails with resumes, portfolios and profiles that actually get replies.
            </p>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              {contactInfo.emails.map((email) => (
                <div key={email} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> {email}
                </div>
              ))}
              {contactInfo.phones.map((phone) => (
                <div key={phone} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> {phone}
                </div>
              ))}
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {contactInfo.address}</div>
            </div>

            <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Your email" required />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">Career tips, weekly. No spam.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VYRAPATH. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Linkedin, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
