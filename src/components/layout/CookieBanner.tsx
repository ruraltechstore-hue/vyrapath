import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const KEY = "vyrapath.cookieConsent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  const save = (v: "accepted" | "rejected" | "custom") => {
    try { localStorage.setItem(KEY, v); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 animate-fade-in-up">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface-elevated/95 backdrop-blur-xl shadow-elegant p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary">
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">We use cookies</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We use cookies to improve your experience, analyze traffic and personalize content. You can accept all, reject non-essential or manage your preferences.
            </p>
            {manage && (
              <div className="mt-3 space-y-2 text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" defaultChecked disabled className="accent-primary" /> Essential (required)
                </label>
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" defaultChecked className="accent-primary" /> Analytics
                </label>
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="accent-primary" /> Marketing
                </label>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => save("accepted")}>Accept all</Button>
              <Button size="sm" variant="outline" onClick={() => save("rejected")}>Reject</Button>
              <Button size="sm" variant="ghost" onClick={() => setManage((m) => !m)}>
                {manage ? "Hide options" : "Manage"}
              </Button>
              {manage && (
                <Button size="sm" variant="secondary" onClick={() => save("custom")}>Save preferences</Button>
              )}
            </div>
          </div>
          <button className="p-1 rounded-md hover:bg-secondary" onClick={() => save("rejected")} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
