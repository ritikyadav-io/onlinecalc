import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";

const labels: Record<string, string> = {
  loans: "Loan & EMI Guides",
  investments: "Investment Guides",
  tax: "Tax & GST Guides",
  health: "Health Calculators",
  salary: "Salary & Savings",
};

interface RelatedCategoryProps {
  cluster: keyof typeof labels;
  blurb?: string;
}

const RelatedCategory = ({ cluster, blurb }: RelatedCategoryProps) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div
        className="mt-6 rounded-2xl border border-border bg-muted/40 animate-pulse"
        style={{ height: 76 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Link
      to={`/blog/category/${cluster}`}
      className="mt-6 flex items-center justify-between gap-3 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/15 hover:to-accent/15 border border-primary/20 rounded-2xl p-4 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <BookOpen size={18} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-bold text-foreground truncate">Read more: {labels[cluster]}</p>
          <p className="text-[12px] text-muted-foreground truncate">{blurb || "Tips, strategies, and guides from Online Calculators."}</p>
        </div>
      </div>
      <ArrowRight size={18} className="text-primary shrink-0" />
    </Link>
  );
};

export default RelatedCategory;
