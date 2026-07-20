import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { contactInfo } from "@/data/site";
import { contactFormSchema, type ContactFormPayload } from "@/lib/contact-schema";
import {
  MapPin, Mail, Phone, Clock, Linkedin, Instagram, Twitter, ShieldCheck,
  Loader2, CheckCircle2, Send, Sparkles, Trophy,
} from "lucide-react";
import { contactFaqs, domains, images } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VYRAPATH" },
      { name: "description", content: "Talk to our team. We reply within 24 hours." },
    ],
  }),
  component: ContactPage,
});

const schema = contactFormSchema.extend({
  name: contactFormSchema.shape.name.min(2, "Please enter your full name"),
  mobile: contactFormSchema.shape.mobile.min(7, "Please enter a valid mobile number"),
  email: contactFormSchema.shape.email.email("Please enter a valid email"),
  domain: contactFormSchema.shape.domain.min(1, "Please select a domain"),
  message: contactFormSchema.shape.message.min(10, "Tell us a little more (10+ characters)"),
});

type FormState = Omit<ContactFormPayload, "botcheck">;

function ContactPage() {
  const [botcheck, setBotcheck] = useState("");
  const [form, setForm] = useState<FormState>({ name: "", mobile: "", email: "", domain: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const fe: any = {};
      for (const issue of res.error.issues) fe[issue.path[0] as string] = issue.message;
      setErrors(fe);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setStatus("loading");
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setStatus("idle");
        toast.error("Contact form is not configured. Please email support@vyrapath.com directly.");
        return;
      }

      if (botcheck) {
        setStatus("success");
        return;
      }

      const composedMessage = [
        `Domain / field: ${res.data.domain}`,
        "",
        res.data.message,
        "",
        "— Submitted via VYRAPATH contact form",
      ].join("\n");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `VYRAPATH contact: ${res.data.name}`,
          from_name: res.data.name,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.mobile,
          message: composedMessage,
          botcheck: "",
        }),
      });

      const payload = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (!response.ok || !payload?.success) {
        setStatus("idle");
        toast.error(payload?.message ?? "Failed to send message. Please try again or email support@vyrapath.com.");
        return;
      }

      setStatus("success");
      toast.success("Message received", { description: "We'll reply within 24 hours." });
    } catch {
      setStatus("idle");
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-glow/40 blur-3xl animate-orbit-pulse" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-orbit-pulse" style={{ animationDelay: "2s" }} />
        <div className="container-page relative py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> We reply within 24 hours
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl sm:text-6xl font-bold tracking-tight">
            Let's get you <span className="text-accent">interview-ready</span> — talk to our team
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80 text-lg">
            Tell us where you're stuck. We'll come back with a plan tailored to your role, timeline and budget.
          </p>
        </div>
      </section>

      {/* FORM + QUICK INFO */}
      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* FORM */}
          <Card className="p-6 sm:p-10 shadow-elegant">
            {status === "success" ? (
              <div className="py-16 text-center animate-fade-in-up">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold">Message received</h2>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  Thanks {form.name.split(" ")[0]} — we'll reply to <span className="font-medium text-foreground">{form.email}</span> within 24 hours.
                </p>
                <Button
                  variant="outline" className="mt-8"
                  onClick={() => { setStatus("idle"); setBotcheck(""); setForm({ name: "", mobile: "", email: "", domain: "", message: "" }); }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <input
                  type="text"
                  name="botcheck"
                  value={botcheck}
                  onChange={(e) => setBotcheck(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                />
                <div>
                  <h2 className="font-display text-2xl font-bold">Send us a message</h2>
                  <p className="mt-1 text-sm text-muted-foreground">All fields are required.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.name}>
                    <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ananya Sharma" maxLength={80} />
                  </Field>
                  <Field label="Mobile Number" error={errors.mobile}>
                    <Input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+91 98765 43210" maxLength={20} />
                  </Field>
                </div>
                <Field label="Email" error={errors.email}>
                  <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" maxLength={120} />
                </Field>
                <Field label="Domain / Field You're Applying For" error={errors.domain}>
                  <Select value={form.domain} onValueChange={(v) => set("domain", v)}>
                    <SelectTrigger><SelectValue placeholder="Select a domain" /></SelectTrigger>
                    <SelectContent>
                      {domains.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Message" error={errors.message}>
                  <Textarea rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Where are you stuck? Which roles are you targeting?" maxLength={1000} />
                </Field>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> 500+ Interview Schedules</Badge>
                  <Badge variant="secondary" className="gap-1"><Trophy className="h-3 w-3" /> 1,000+ Resumes Delivered</Badge>
                  <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> 24hr Response</Badge>
                </div>

                <Button
                  type="submit" size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>)
                    : (<><Send className="mr-2 h-4 w-4" /> Send message</>)}
                </Button>
              </form>
            )}
          </Card>

          {/* QUICK INFO */}
          <div className="space-y-6">
            <Card className="p-0 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img src={images.heroMain} alt="VYRAPATH career support team" loading="lazy"
                  className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                  <div className="text-xs uppercase tracking-widest opacity-80">Meet the team</div>
                  <div className="mt-1 font-display text-lg font-bold">Real humans reply — usually within a few hours.</div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              <h3 className="font-display text-lg font-bold">Quick info</h3>
              <div className="mt-5 space-y-4 text-sm">
                <InfoRow icon={Clock} label="Office hours" value="Mon–Sat, 9:00–19:00 IST" />
                {contactInfo.emails.map((email) => (
                  <InfoRow key={email} icon={Mail} label="Email" value={email} />
                ))}
                {contactInfo.phones.map((phone) => (
                  <InfoRow key={phone} icon={Phone} label="Phone" value={phone} />
                ))}
                <InfoRow icon={MapPin} label="Office" value={contactInfo.address} />
              </div>
              <div className="mt-6 pt-6 border-t border-primary-foreground/20 flex gap-2">
                {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="social">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-success/15">
                  <ShieldCheck className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-sm">24-hour response guarantee</div>
                  <div className="text-xs text-muted-foreground">Or we'll refund your first month.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-16">
        <div className="container-page">
          <Card className="p-0 overflow-hidden">
            <div className="relative aspect-[16/6] bg-secondary grid place-items-center">
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:16px_16px]" />
              <div className="relative text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-float">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="mt-4 font-display font-bold">VYRAPATH HQ</div>
                <div className="text-sm text-muted-foreground">Madhapur, Hyderabad</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">Common questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {contactFaqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-foreground/10">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-primary-foreground/70">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
    </div>
  );
}
