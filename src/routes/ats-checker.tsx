import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Upload, FileText, Loader2, Sparkles, Info, ArrowRight, RefreshCw,
  CheckCircle2, AlertCircle, ShieldCheck,
} from "lucide-react";
import { scoreResume, type ScoreResult } from "@/lib/ats-scorer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ats-checker")({
  head: () => ({
    meta: [
      { title: "ATS Resume Score Checker — VYRAPATH" },
      { name: "description", content: "Check your resume against the VYRAPATH ATS optimization methodology. Get a score, category breakdown and improvement suggestions." },
    ],
  }),
  component: AtsPage,
});

type Status = "idle" | "parsing" | "scoring" | "done" | "error";

async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) {
    const pdfjs: any = await import("pdfjs-dist");
    const version = pdfjs.version;
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buf }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it: any) => it.str).join(" ") + "\n";
    }
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const annots = await page.getAnnotations();
      for (const a of annots) if (a.url) text += " " + a.url;
    }
    // Also read metadata — our platform stamps a marker
    try {
      const meta = await pdf.getMetadata();
      text += " " + JSON.stringify(meta || {});
    } catch { /* ignore */ }
    return text;
  }
  if (name.endsWith(".docx")) {
    const mammoth: any = await import("mammoth/mammoth.browser");
    const buf = await file.arrayBuffer();
    const res = await mammoth.extractRawText({ arrayBuffer: buf });
    return res.value || "";
  }
  if (name.endsWith(".txt")) {
    return await file.text();
  }
  throw new Error("Unsupported file type. Please upload a PDF, DOCX or TXT file.");
}

function AtsPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = useCallback(async (file: File) => {
    setError(""); setResult(null); setFileName(file.name);
    setStatus("parsing");
    try {
      const text = await extractText(file);
      if (!text || text.trim().length < 40) {
        throw new Error("Couldn't extract text — your file may be image-based. Export as a text-selectable PDF or DOCX.");
      }
      setStatus("scoring");
      await new Promise((r) => setTimeout(r, 600));
      const scored = scoreResume(text);
      setResult(scored);
      setStatus("done");
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Something went wrong parsing your file.");
      setStatus("error");
      toast.error("Could not process file", { description: e?.message });
    }
  }, []);

  const onFile = (f?: File | null) => { if (f) handle(f); };

  const reset = () => {
    setStatus("idle"); setResult(null); setFileName(""); setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <PageHero
        eyebrow="Free tool"
        title={<>Check your <span className="text-gradient">ATS score</span></>}
        subtitle="Upload your resume and get a compatibility score against the VYRAPATH optimization methodology, with a full category breakdown."
      />

      <section className="section-y">
        <div className="container-page max-w-4xl">
          {status !== "done" && (
            <Card
              className={cn(
                "relative border-2 border-dashed p-10 sm:p-16 text-center transition-all",
                dragOver ? "border-primary bg-primary/5" : "border-border",
              )}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault(); setDragOver(false);
                onFile(e.dataTransfer.files?.[0]);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                {status === "parsing" || status === "scoring"
                  ? <Loader2 className="h-7 w-7 animate-spin" />
                  : <Upload className="h-7 w-7" />}
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">
                {status === "parsing" && "Reading your resume…"}
                {status === "scoring" && "Scoring against ATS rubric…"}
                {(status === "idle" || status === "error") && "Drop your resume here"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {status === "idle" || status === "error"
                  ? "PDF, DOCX or TXT — up to 10MB. Processed locally in your browser."
                  : fileName}
              </p>
              {(status === "idle" || status === "error") && (
                <Button size="lg" className="mt-6" onClick={() => inputRef.current?.click()}>
                  Choose file
                </Button>
              )}
              {status === "error" && error && (
                <div className="mt-6 mx-auto max-w-md flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-left">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                  <div><div className="font-semibold text-destructive">Couldn't process file</div><div className="text-muted-foreground">{error}</div></div>
                </div>
              )}
            </Card>
          )}

          {status === "done" && result && (
            <ScoreView result={result} fileName={fileName} onReset={reset} />
          )}

          <div className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Info className="h-3.5 w-3.5" /> Your file never leaves your browser. Scoring happens client-side.
          </div>
        </div>
      </section>
    </>
  );
}

function ScoreView({ result, fileName, onReset }: { result: ScoreResult; fileName: string; onReset: () => void }) {
  const band =
    result.overall >= 85 ? { label: "Excellent ATS compatibility", color: "text-success", ring: "stroke-success" }
    : result.overall >= 65 ? { label: "Good, with room to improve", color: "text-primary", ring: "stroke-primary" }
    : result.overall >= 45 ? { label: "Needs improvement", color: "text-warning", ring: "stroke-warning" }
    : { label: "Not ATS-optimized yet", color: "text-destructive", ring: "stroke-destructive" };

  return (
    <div className="animate-fade-in-up">
      <Card className="p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <Gauge value={result.overall} ringClass={band.ring} />
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 justify-center sm:justify-start">
              <FileText className="h-3.5 w-3.5" /> {fileName}
            </div>
            <div className={cn("mt-2 font-display text-2xl sm:text-3xl font-bold", band.color)}>{band.label}</div>
            {result.isPlatformResume ? (
              <p className="mt-2 text-sm text-muted-foreground max-w-lg inline-flex items-start gap-1.5">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-success shrink-0" />
                Verified VYRAPATH resume — fully optimized against our ATS methodology.
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground max-w-lg">
                Your resume was created outside our platform, so it doesn't yet follow the VYRAPATH optimization standards. See suggestions below.
              </p>
            )}
            <Button variant="outline" size="sm" className="mt-4" onClick={onReset}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Score another
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {result.categories.map((c) => (
          <Card key={c.key} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold truncate">{c.label}</div>
                <div className="text-xs text-muted-foreground">Category</div>
              </div>
              <div className={cn("font-display text-2xl font-bold shrink-0",
                c.score >= 80 ? "text-success" : c.score >= 55 ? "text-primary" : "text-destructive")}>
                {c.score}%
              </div>
            </div>
            <Progress value={c.score} className="mt-3" />
            <p className="mt-3 text-xs text-muted-foreground">{c.description}</p>
          </Card>
        ))}
      </div>

      {result.isPlatformResume ? (
        <Card className="mt-6 p-6 sm:p-8 border-success/40 bg-success/5">
          <h3 className="font-display text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-success" /> What's working
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {result.positives.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-success shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Card className="mt-6 p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> Suggested improvements
          </h3>
          <ul className="mt-4 space-y-2.5">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="mt-6 p-5 border-dashed">
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> This compatibility score is based on VYRAPATH's platform evaluation methodology and is intended to help improve resumes. Different employers and ATS software may evaluate resumes differently.
          </span>
        </p>
      </Card>

      {!result.isPlatformResume && (
        <Card className="mt-6 relative overflow-hidden p-8 sm:p-10 bg-primary text-primary-foreground border-0">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">Want a resume built for maximum ATS performance?</h3>
            <p className="mt-2 max-w-xl text-primary-foreground/80">
              Resumes built on VYRAPATH ship with embedded live links, ATS-safe formatting and role-relevant keywords by default — the same signals this checker rewards.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/services" hash="digital-resume">See Digital Resume <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function Gauge({ value, ringClass }: { value: number; ringClass: string }) {
  const size = 160;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} strokeWidth={stroke} className="stroke-secondary" fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r} strokeWidth={stroke} strokeLinecap="round" fill="none"
          className={cn("transition-all duration-1000", ringClass)}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-4xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </div>
    </div>
  );
}
