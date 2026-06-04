import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import { aboutContent } from "@/lib/aboutContent";
import CopyResultButton from "@/components/CopyResultButton";

const faq = [
  { q: "How to calculate percentage?", a: "Percentage = (Obtained / Total) × 100." },
  { q: "How to find percentage increase?", a: "Increase % = ((New - Old) / Old) × 100." },
  { q: "What is percentage of a number?", a: "X% of Y = (X / 100) × Y." },
];

interface SeoOverride { title: string; description: string; path: string; h1: string; intro: string; faq: { q: string; a: string }[]; }
const PercentageCalculator = ({ seo }: { seo?: SeoOverride } = {}) => {
  const [mode, setMode] = useState<"basic" | "increase" | "of">("basic");
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);

  const result = useMemo(() => {
    if (mode === "basic") {
      if (val2 <= 0) return null;
      return { value: (val1 / val2) * 100, label: "Percentage", suffix: "%" };
    }
    if (mode === "increase") {
      if (val1 <= 0) return null;
      const pct = ((val2 - val1) / val1) * 100;
      return { value: pct, label: pct >= 0 ? "Increase" : "Decrease", suffix: "%" };
    }
    if (mode === "of") {
      return { value: (val1 / 100) * val2, label: "Result", suffix: "" };
    }
    return null;
  }, [mode, val1, val2]);

  const hasData = result !== null;

  const barData = useMemo(() => {
    if (mode === "basic" && val2 > 0) return [
      { name: "Obtained", value: val1 },
      { name: "Total", value: val2 },
    ];
    if (mode === "increase" && val1 > 0) return [
      { name: "Old", value: val1 },
      { name: "New", value: val2 },
    ];
    return [];
  }, [mode, val1, val2]);

  const labels = mode === "basic" ? { l1: "Obtained Marks", l2: "Total Marks" }
    : mode === "increase" ? { l1: "Old Value", l2: "New Value" }
    : { l1: "Percentage (%)", l2: "Number" };

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead
        title={seo?.title ?? "Percentage Calculator – Fast & Accurate Math"}
        description={seo?.description ?? "Calculate percentage, percentage increase or decrease, and percentage of a number in seconds. Free online percentage calculator with formulas explained."}
        path={seo?.path ?? "/percentage-calculator"}
        faq={seo?.faq ?? faq}
        howTo={[
          { name: "Choose a mode", text: "Pick the calculation you need: X% of a number, what % is X of Y, or % increase/decrease." },
          { name: "Enter the two values", text: "Type the base amount and the percentage (or comparison value) in the input fields." },
          { name: "Read the answer instantly", text: "The result updates live as you type — no submit button needed." },
          { name: "Copy or reuse", text: "Tap the copy-result button to paste the answer anywhere, or switch modes to keep going." },
        ]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: seo?.h1 ?? "Percentage Calculator", path: seo?.path ?? "/percentage-calculator" }]}
      />
      {seo ? (
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{seo.h1}</h1>
          <p className="text-base text-muted-foreground leading-relaxed">{seo.intro}</p>
        </header>
      ) : (
        <div>
        <PageHeading title={"Percentage Calculator"} subtitle={"All percentage maths — increase, decrease, of, and change."} />
        <p className="text-base text-muted-foreground mt-1">Choose a mode and enter values</p>
        </div>
      )}

      <div className="flex gap-2">
        {(["basic", "increase", "of"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setVal1(0); setVal2(0); }}
            className={`px-4 py-2.5 rounded-xl text-base font-medium transition-all ${mode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            {m === "basic" ? "Basic %" : m === "increase" ? "% Change" : "% of Number"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">{labels.l1}</span>
          <input type="number" value={val1 || ""} onChange={e => setVal1(+e.target.value)} placeholder="0" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">{labels.l2}</span>
          <input type="number" value={val2 || ""} onChange={e => setVal2(+e.target.value)} placeholder="0" className="compact-input" /></label>
      </div>

      {hasData && result && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-6 text-center ${result.value >= 0 ? "bg-safe/10" : "bg-danger/10"}`}>
            <p className={`text-4xl font-bold ${result.value >= 0 ? "text-safe" : "text-danger"}`}>
              {result.value.toFixed(2)}{result.suffix}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{result.label}</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="Percentage Result" text={`${result.label}: ${result.value.toFixed(2)}${result.suffix} (${labels.l1}: ${val1}, ${labels.l2}: ${val2})`} /></div>
          </motion.div>

          {barData.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-sm text-muted-foreground font-medium mb-3">Comparison</h3>
              <ChartFrame height={160}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 13, borderRadius: 12 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    <Cell fill="#4F46E5" /><Cell fill="#22C55E" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          </ChartFrame>
            </motion.div>
          )}

          <DownloadReport getData={() => ({
            title: "Percentage Report",
            rows: [
              { label: "Mode", value: mode === "basic" ? "Basic %" : mode === "increase" ? "% Change" : "% of Number" },
              { label: labels.l1, value: `${val1}` },
              { label: labels.l2, value: `${val2}` },
              { label: result.label, value: `${result.value.toFixed(2)}${result.suffix}` },
            ]
          })} />
        </>
      )}

      {!hasData && <div className="text-center py-12 text-base text-muted-foreground">Enter values to calculate percentage</div>}
      <AboutCalculator {...aboutContent.percentage} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/percentage-calculator" />
      <RelatedArticles cluster="tax" />
    </div>
  );
};

export default PercentageCalculator;
