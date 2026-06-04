import { useMemo } from "react";
import { Star } from "lucide-react";

const POOL = [
  { n: "Ayesha K.", r: "Saved my semester — attendance tracker is brutally accurate.", s: 5, t: "B.Tech, 3rd year" },
  { n: "Rohan M.", r: "EMI calc is cleaner than any bank app I've used.", s: 5, t: "Working professional" },
  { n: "Priya S.", r: "Required marks tool told me exactly what to score. Hit it.", s: 5, t: "B.Com final year" },
  { n: "Karan V.", r: "Expense tracker pie chart was a wake-up call. Spending dropped 30%.", s: 4, t: "Hostel student" },
  { n: "Sneha P.", r: "Pomodoro + study streak combo keeps me locked in daily.", s: 5, t: "NEET aspirant" },
  { n: "Aman D.", r: "CGPA calculator matches my college portal exactly. No more guessing.", s: 5, t: "Engineering" },
  { n: "Ishita R.", r: "Backlog planner gave me a real timeline. Cleared 3 papers.", s: 5, t: "MBA" },
  { n: "Vikram T.", r: "Goal splitter actually breaks goals into doable chunks. Love it.", s: 4, t: "Self-learner" },
  { n: "Neha J.", r: "Document reader summarised my 40-page PDF in seconds.", s: 5, t: "Law student" },
  { n: "Rahul B.", r: "Bunk tool saved me from getting debarred. Genuinely useful.", s: 5, t: "Day scholar" },
  { n: "Tanvi G.", r: "Marks analyzer charts make my weak subjects obvious.", s: 4, t: "Class 12" },
  { n: "Sahil N.", r: "Procrastination detector called me out — and I needed it.", s: 5, t: "Designer" },
];

// Deterministic per page-load: same set on refresh of this page render, varies between sessions/tools.
export default function Reviews({ toolKey = "" }: { toolKey?: string }) {
  const items = useMemo(() => {
    const seed = (toolKey + "|" + Math.floor(Date.now() / 1000)).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const arr = [...POOL];
    // Fisher-Yates with seeded PRNG
    let s = seed;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 3);
  }, [toolKey]);

  return (
    <section
      aria-label="User reviews"
      className="rounded-2xl border border-border bg-card p-5"
      style={{ minHeight: 240 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-bold text-foreground">What users say</h2>
        <div className="flex items-center gap-1 text-warning">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" stroke="none" />
          ))}
          <span className="text-[12px] text-muted-foreground ml-1 font-semibold">4.9 / 5</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <article
            key={i}
            className="rounded-xl border border-border bg-secondary/30 p-4"
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="flex items-center gap-1 text-warning mb-2" aria-label={`${it.s} stars`}>
              {Array.from({ length: it.s }).map((_, j) => (
                <Star key={j} size={12} fill="currentColor" stroke="none" />
              ))}
            </div>
            <p className="text-[14px] text-foreground leading-relaxed" itemProp="reviewBody">
              "{it.r}"
            </p>
            <p className="text-[12px] text-muted-foreground mt-3 font-semibold" itemProp="author">
              {it.n} · <span className="font-normal">{it.t}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
