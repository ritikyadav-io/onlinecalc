import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import { ReactNode } from "react";

export interface Insight {
  /** Stable key — drives layoutId animations and React reconciliation. */
  key: string;
  /** Short label (e.g. "Tax-free portion"). */
  label: string;
  /** Numeric value the card animates to; pass null/undefined to hide. */
  value?: number | null;
  /** Optional pre-formatted text shown when value is not a number. */
  text?: ReactNode;
  /** Currency / percent / unit formatter. Defaults to localeString. */
  format?: (n: number) => string;
  /** Optional secondary line — short "what this means". */
  hint?: string;
  /** Tone affects color + icon (up/down/neutral). */
  tone?: "good" | "warn" | "danger" | "neutral";
  /** Optional icon — overrides the auto tone icon. */
  icon?: LucideIcon;
}

interface Props {
  title?: string;
  insights: Insight[];
  /** Set false to render a 2-up grid even on wide screens (defaults adaptive). */
  cols?: 2 | 3;
}

const toneClasses: Record<NonNullable<Insight["tone"]>, { ring: string; text: string; bg: string }> = {
  good:    { ring: "border-safe/30",    text: "text-safe",    bg: "bg-safe/5" },
  warn:    { ring: "border-warning/30", text: "text-warning", bg: "bg-warning/5" },
  danger:  { ring: "border-danger/30",  text: "text-danger",  bg: "bg-danger/5" },
  neutral: { ring: "border-border",     text: "text-foreground", bg: "bg-card" },
};

const toneIcon: Record<NonNullable<Insight["tone"]>, LucideIcon> = {
  good: TrendingUp,
  warn: Minus,
  danger: TrendingDown,
  neutral: Minus,
};

/**
 * Live, animated insight cards. Each card's value tweens smoothly as inputs
 * change so the "what's happening" feedback is visible without scrolling.
 */
const InsightGrid = ({ title, insights, cols = 3 }: Props) => {
  const visible = insights.filter((i) => i.value != null || i.text != null);
  if (visible.length === 0) return null;

  const gridCols = cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3";

  return (
    <section aria-label={title ?? "Live insights"} className="space-y-3">
      {title && (
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      )}
      <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((i) => {
            const tone = i.tone ?? "neutral";
            const c = toneClasses[tone];
            const Icon = i.icon ?? toneIcon[tone];
            return (
              <motion.div
                key={i.key}
                layout
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className={`relative overflow-hidden rounded-2xl border ${c.ring} ${c.bg} p-4`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {i.label}
                  </p>
                  <Icon size={14} className={c.text} aria-hidden />
                </div>
                <p className={`mt-1.5 text-2xl font-extrabold leading-tight ${c.text}`}>
                  {typeof i.value === "number" ? (
                    <AnimatedNumber value={i.value} format={i.format} />
                  ) : (
                    i.text
                  )}
                </p>
                {i.hint && (
                  <p className="mt-1 text-[12px] text-muted-foreground leading-snug">{i.hint}</p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InsightGrid;
