import type { CSSProperties } from "react";
import { Card } from "@/components/ui/card";
import { Star, Mail, Phone, CheckCircle2, MessageSquare } from "lucide-react";
import type { OutcomeProof } from "@/data/site";
import { cn } from "@/lib/utils";

const typeConfig = {
  offer_letter: { icon: CheckCircle2, label: "Offer", accent: "text-success bg-success/15" },
  interview_invite: { icon: Phone, label: "Interview", accent: "text-primary bg-primary/15" },
  recruiter_reply: { icon: Mail, label: "Recruiter", accent: "text-accent-foreground bg-accent/20" },
  shortlist: { icon: MessageSquare, label: "Shortlist", accent: "text-primary bg-secondary" },
} as const;

function Redacted({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("blur-[3px] select-none", className)} aria-hidden="true">
      {children}
    </span>
  );
}

type OutcomeMailCardProps = {
  proof: OutcomeProof;
  className?: string;
  style?: CSSProperties;
};

export function OutcomeMailCard({ proof, className, style }: OutcomeMailCardProps) {
  const config = typeConfig[proof.type];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "relative overflow-hidden p-0 hover:-translate-y-1 hover:shadow-elegant transition-all",
        className,
      )}
      style={style}
    >
      <div className="border-b border-border/60 bg-secondary/30 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", config.accent)}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {config.label}
              </span>
              <span className="text-[10px] text-muted-foreground shrink-0">{proof.dateLabel}</span>
            </div>
            <div className="mt-0.5 text-sm font-semibold leading-snug truncate">{proof.subject}</div>
            <div className="mt-0.5 text-xs text-muted-foreground truncate">
              From: <Redacted>{proof.fromLabel}</Redacted>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-2">
        <p className="text-sm leading-relaxed">{proof.preview}</p>
        <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground space-y-1">
          <div>
            To: <Redacted>student.fresher@email.com</Redacted>
          </div>
          <div>
            Re: <Redacted>{`${proof.role} · ${proof.domain}`}</Redacted>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/60 px-4 py-3">
        <div className="text-xs text-muted-foreground">
          {proof.role} · {proof.domain}
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: proof.rating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-accent text-accent" />
          ))}
        </div>
      </div>
    </Card>
  );
}
