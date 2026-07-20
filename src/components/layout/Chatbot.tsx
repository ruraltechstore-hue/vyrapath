import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  MessageCircle, X, Send, Minimize2, Mail, Phone, FileText,
  Sparkles, Bot, User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { contactInfo } from "@/data/site";

type Msg = {
  id: string;
  from: "bot" | "user";
  text: string;
  time: number;
  suggestions?: string[];
  showSupport?: boolean;
};

const COMPANY = "VYRAPATH";
const SUPPORT_EMAILS = contactInfo.emails;
const SUPPORT_PHONES = contactInfo.phones;

const QUICK_ACTIONS = [
  "Check ATS Score",
  "Build Resume",
  "Digital Resume",
  "Portfolio",
  "Pricing",
  "Contact Support",
];

const SUGGESTED = [
  "What is a Digital Resume?",
  "Compare Basic, Standard and Premium",
  "How is ATS score calculated?",
  "How does LinkedIn Optimization work?",
];

// Rule-based responder. Returns text + optional follow-up suggestions, or null for escalation.
function respond(input: string): { text: string; suggestions?: string[]; showSupport?: boolean } | null {
  const q = input.toLowerCase().trim();
  const has = (...kws: string[]) => kws.some((k) => q.includes(k));

  if (has("hello", "hi ", "hey", "hii", "namaste") || q === "hi") {
    return { text: `Hi there! 👋 How can I help — resumes, ATS scoring, pricing or something else?`, suggestions: QUICK_ACTIONS.slice(0, 4) };
  }

  // ATS
  if (has("what is ats", "ats mean", "define ats")) {
    return { text: "ATS = Applicant Tracking System. Recruiters use it to scan and rank resumes. Our platform builds resumes optimized for ATS parsing." , suggestions: ["How is ATS score calculated?", "How can I improve my score?"] };
  }
  if (has("ats score", "ats calculated", "score calculated")) {
    return { text: "We score across 10 categories — Formatting, Sections, Keywords, Skills, Experience, Projects, Certifications, Links, Readability, Grammar — using our internal optimization methodology.", suggestions: ["Check ATS Score", "How can I improve my score?"] };
  }
  if (has("improve", "increase score", "better score")) {
    return { text: "Fastest wins: fix formatting (single column), add measurable achievements, embed LinkedIn and portfolio links, and match role keywords. Our Digital Resume does all of this by default." , suggestions: ["Digital Resume", "Check ATS Score"] };
  }

  // Resume
  if (has("create resume", "build resume", "make resume", "how do i create")) {
    return { text: "Place an order → fill a 5-min intake → 20-min discovery call → we deliver a draft in 3–5 business days → you review and we revise. Start with Normal Resume or Digital Resume." , suggestions: ["Digital Resume", "Which package is suitable?", "How long does it take?"] };
  }
  if (has("digital resume")) {
    return { text: "A Digital Resume is a modern, ATS-friendly resume with embedded live links — intro video, certifications, portfolio and LinkedIn. $80 flat.", suggestions: ["Pricing", "How long does it take?"] };
  }
  if (has("normal resume") || (has("resume") && has("package", "suitable"))) {
    return { text: "Normal Resume ($60) is a polished traditional resume tailored to your role. If you want embedded video + live links, upgrade to Digital Resume ($80)." };
  }
  if (has("how long", "turnaround", "delivery")) {
    return { text: "Most services ship in 3–5 business days. Digital Resumes and portfolios take 5–7 days including one revision round." };
  }

  // Pricing
  if (has("pricing", "plans", "price", "cost", "how much")) {
    return { text: "Three plans: Basic $229, Standard $399 (most popular), Premium $699. Or buy individual services à la carte from $15." , suggestions: ["Compare Basic, Standard and Premium", "Explain individual services"] };
  }
  if (has("compare", "basic vs", "standard vs", "premium vs")) {
    return { text: "Basic → Digital Resume + LinkedIn + Job Board. Standard → +Portfolio, Applications for Job Roles (20+). Premium → +3 IT Certifications, 40+ Applications, Resume Monthly Subscription, dedicated coach." };
  }
  if (has("individual", "a la carte", "single service")) {
    return { text: "À la carte: LinkedIn $15, Resume $60, Digital Resume $80, Job Board Access $80, Portfolio $100, 3 IT Certifications $120, Applications for Job Roles $150–$280, Resume Monthly Subscription $279/mo." };
  }

  // Portfolio
  if (has("portfolio")) {
    if (has("include", "what is included", "features")) {
      return { text: "Custom-designed responsive portfolio, up to 6 project case studies, contact form, analytics, deployment guidance. $100." };
    }
    if (has("customize", "custom")) {
      return { text: "Yes — layout, color palette, sections and case studies are all customizable to fit your personal brand." };
    }
    return { text: "Portfolio Building ($100) — a live personal site to showcase your projects, resume and contact." , suggestions: ["What is included?", "Can I customize it?"] };
  }

  // LinkedIn
  if (has("linkedin")) {
    return { text: "LinkedIn Optimization ($15) rewrites your headline, About, Experience and Skills for keyword visibility so recruiters find and message you first." };
  }

  // Subscription
  if (has("subscription", "monthly resume", "daily resume")) {
    return { text: "Resume Monthly Subscription ($279/mo) gives you a daily AI-tailored resume based on job descriptions you paste in — keyword-matched, ATS-safe, cancel anytime." };
  }

  // Certifications
  if (has("certificat", "certification")) {
    return { text: "IT Certification package ($120) covers 3 domain-relevant certifications — e.g. AWS Cloud Practitioner, Azure Fundamentals, Google Data Analytics — with prep resources and mock tests." };
  }

  // Job Applications
  if (has("application", "apply", "job pack", "job role")) {
    return { text: "Applications for Job Roles starts at $150 (20+ applications) or $280 (40+ applications). We tailor each application, apply on your behalf, and share weekly progress reports." };
  }
  if (has("how does the application", "application process")) {
    return { text: "You share your target roles → we shortlist matches → tailor the resume/cover letter → apply → track responses in a shared sheet." };
  }

  // Contact / support
  if (has("contact", "support", "help", "talk to human", "agent")) {
    return {
      text: `You can reach our team at ${SUPPORT_EMAILS.join(" or ")} or call ${SUPPORT_PHONES.join(" / ")}. Want me to open the contact form?`,
      showSupport: true,
    };
  }

  if (has("thank", "thanks")) return { text: "Anytime! 🎉 Anything else I can help with?" };
  if (has("bye")) return { text: "See you! Best of luck with your applications 🚀" };

  return null;
}

const WELCOME_TEXT =
`👋 Hi! Welcome to ${COMPANY}.

I'm your AI Career Assistant. I can help you with:

• Resume Building
• ATS Resume Score
• Digital Resume
• Portfolio Creation
• LinkedIn Optimization
• Applications for Job Roles
• Resume Monthly Subscription
• Pricing Information
• Certifications

How can I help you today?`;

function fmtTime(t: number) {
  const d = new Date(t);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unresolved, setUnresolved] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed welcome on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      const t = setTimeout(() => {
        setMessages([{
          id: crypto.randomUUID(),
          from: "bot",
          text: WELCOME_TEXT,
          time: Date.now(),
          suggestions: SUGGESTED,
        }]);
        setTyping(false);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open, minimized]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const userMsg: Msg = { id: crypto.randomUUID(), from: "user", text, time: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const r = respond(text);
      let botMsg: Msg;
      if (r) {
        setUnresolved(0);
        botMsg = {
          id: crypto.randomUUID(),
          from: "bot",
          text: r.text,
          time: Date.now(),
          suggestions: r.suggestions,
          showSupport: r.showSupport,
        };
      } else {
        const next = unresolved + 1;
        setUnresolved(next);
        if (next >= 2) {
          botMsg = {
            id: crypto.randomUUID(),
            from: "bot",
            text: `I'm sorry, I couldn't fully answer your question. Our support team will be happy to assist you.`,
            time: Date.now(),
            showSupport: true,
          };
        } else {
          botMsg = {
            id: crypto.randomUUID(),
            from: "bot",
            text: `I'm not sure I caught that. Could you rephrase, or pick one of these?`,
            time: Date.now(),
            suggestions: QUICK_ACTIONS,
          };
        }
      }
      setMessages((m) => [...m, botMsg]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  };

  const headerHeight = 64;

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => { setOpen(true); setMinimized(false); }}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow ring-4 ring-primary/20 transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success ring-2 ring-background animate-pulse" />
        </button>
      )}

      {/* Window */}
      {open && (
        <div
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl animate-fade-in",
            "bottom-5 right-5",
            minimized ? "w-[300px]" : "w-[92vw] max-w-[380px] h-[560px] max-h-[80vh]",
          )}
          style={{ height: minimized ? headerHeight : undefined }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-primary px-4 py-3 text-primary-foreground">
            <div className="relative grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold leading-tight truncate">AI Career Assistant</div>
              <div className="text-[10px] opacity-80 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online now
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMinimized((v) => !v)}
              aria-label={minimized ? "Expand chat" : "Minimize chat"}
              className="rounded-md p-1 opacity-80 hover:opacity-100 hover:bg-primary-foreground/10"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 opacity-80 hover:opacity-100 hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 bg-muted/30 px-3 py-4">
                {messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} onQuick={send} />
                ))}
                {typing && (
                  <div className="flex items-end gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-background border border-border/60 px-3 py-2 shadow-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              {messages.length <= 1 && (
                <div className="border-t border-border/60 bg-background px-3 py-2">
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_ACTIONS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => send(a)}
                        className="text-xs rounded-full border border-border bg-background px-2.5 py-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Composer */}
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2 border-t border-border/60 bg-background px-3 py-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message…"
                  className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send"
                  className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

function MessageBubble({ msg, onQuick }: { msg: Msg; onQuick: (s: string) => void }) {
  const isBot = msg.from === "bot";
  return (
    <div className={cn("flex items-end gap-2", isBot ? "" : "flex-row-reverse")}>
      <div className={cn("grid h-7 w-7 place-items-center rounded-full shrink-0",
        isBot ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground")}>
        {isBot ? <Bot className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
      </div>
      <div className={cn("max-w-[78%]")}>
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm shadow-sm whitespace-pre-wrap break-words",
            isBot
              ? "bg-background border border-border/60 rounded-bl-sm"
              : "bg-primary text-primary-foreground rounded-br-sm",
          )}
        >
          {msg.text}
        </div>

        {msg.showSupport && (
          <div className="mt-2 rounded-xl border border-border/60 bg-background p-3 space-y-2 text-xs">
            <div className="font-semibold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Talk to our team
            </div>
            <div className="text-muted-foreground">
              {SUPPORT_EMAILS.map((email) => (
                <div key={email}><strong>Email:</strong> {email}</div>
              ))}
              {SUPPORT_PHONES.map((phone) => (
                <div key={phone}><strong>Phone:</strong> {phone}</div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <a href={`mailto:${SUPPORT_EMAILS[0]}`}
                 className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-primary-foreground hover:opacity-90">
                <Mail className="h-3 w-3" /> Email Support
              </a>
              {SUPPORT_PHONES.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}
                   className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 hover:bg-muted">
                  <Phone className="h-3 w-3" /> {phone}
                </a>
              ))}
              <Link to="/contact"
                    className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 hover:bg-muted">
                <FileText className="h-3 w-3" /> Contact Form
              </Link>
            </div>
          </div>
        )}

        {msg.suggestions && msg.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {msg.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onQuick(s)}
                className="text-xs rounded-full border border-border bg-background px-2.5 py-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className={cn("mt-1 text-[10px] text-muted-foreground", isBot ? "text-left" : "text-right")}>
          {fmtTime(msg.time)}
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}
