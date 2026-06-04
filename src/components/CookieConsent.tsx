import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const KEY = "tml.cookie.consent.v1";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const set = (val: "accept" | "decline") => {
    try { localStorage.setItem(KEY, val); } catch { /* ignore */ }
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-[60] animate-fade-up">
      <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
            <Cookie size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-foreground">We value your privacy</p>
            <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
              We use cookies to improve your experience and serve relevant ads. Read our{" "}
              <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => set("accept")}
                className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold hover:opacity-90"
              >
                Accept
              </button>
              <button
                onClick={() => set("decline")}
                className="flex-1 py-2 rounded-xl bg-secondary text-foreground text-[13px] font-semibold hover:bg-secondary/80"
              >
                Decline
              </button>
            </div>
          </div>
          <button onClick={() => set("decline")} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
