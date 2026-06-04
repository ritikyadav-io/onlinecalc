import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import ChartTooltip from "@/components/ChartTooltip";
import InsightGrid from "@/components/InsightGrid";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import { aboutContent } from "@/lib/aboutContent";

const faq = [
  { q: "What is the current PPF interest rate?", a: "PPF rates are revised quarterly by the Government of India. Recent rates have hovered between 7.1% and 7.6%." },
  { q: "What is the PPF lock-in period?", a: "PPF has a 15-year lock-in. Partial withdrawals allowed from the 7th year." },
  { q: "Is PPF tax-free?", a: "Yes — PPF qualifies under EEE: contribution (80C), interest, and maturity are all tax-exempt." },
  { q: "What's the max yearly investment?", a: "₹1.5 lakh per financial year." },
];

const howTo = [
  { name: "Enter your yearly deposit", text: "Up to ₹1.5 lakh per financial year qualifies under 80C." },
  { name: "Confirm the PPF rate", text: "Default is the current government rate (7.1%) — revised quarterly." },
  { name: "Set the tenure", text: "Default 15 years (lock-in); extend in 5-year blocks for higher maturity." },
  { name: "Review the chart", text: "Hover the area chart to see how your balance compounds year-by-year." },
];

const PPFCalculator = () => {
  const [yearly, setYearly] = useState(0);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const calc = useMemo(() => {
    if (yearly <= 0) return null;
    let bal = 0;
    const breakdown: { year: string; balance: number }[] = [];
    for (let y = 1; y <= years; y++) {
      bal = (bal + yearly) * (1 + rate / 100);
      breakdown.push({ year: `Y${y}`, balance: Math.round(bal) });
    }
    const invested = yearly * years;
    const interest = bal - invested;
    return { maturity: bal, invested, interest, breakdown };
  }, [yearly, rate, years]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="PPF Calculator – 15-Year Maturity & Returns" description="Plan your tax-free PPF savings: calculate maturity value, total interest, and year-wise growth at current PPF rates. Free and updated for 2025." path="/ppf-calculator" faq={faq} howTo={howTo} breadcrumbs={[{ name: "Home", path: "/" }, { name: "PPF Calculator", path: "/ppf-calculator" }]} />
        <PageHeading title={"PPF Calculator"} subtitle={"15-year PPF maturity projection with annual contribution view."} />
        <p className="text-base text-muted-foreground">Plan your Public Provident Fund investments</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Yearly Deposit (₹)</span>
          <input type="number" max="150000" value={yearly || ""} onChange={e => setYearly(+e.target.value)} placeholder="150000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Interest Rate (%)</span>
          <input type="number" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Tenure (years)</span>
          <input type="number" min="15" value={years} onChange={e => setYears(+e.target.value)} className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{Math.round(calc.maturity).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Maturity Amount</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="My PPF Maturity" text={`PPF Maturity: ₹${Math.round(calc.maturity).toLocaleString()} | Invested: ₹${calc.invested.toLocaleString()} | Interest: ₹${Math.round(calc.interest).toLocaleString()} over ${years} yrs @ ${rate}%`} /></div>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-foreground">₹{calc.invested.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Invested</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-safe">₹{Math.round(calc.interest).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Tax-Free Interest</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h2 className="text-sm text-muted-foreground font-medium mb-3">PPF Growth</h2>
            <ChartFrame height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calc.breakdown}>
                  <defs><linearGradient id="ppfG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient></defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => v >= 1e5 ? `₹${(v / 1e5).toFixed(1)}L` : `₹${v}`} />
                  <Tooltip content={<ChartTooltip titlePrefix="" formatValue={(v) => `₹${Math.round(v).toLocaleString()}`} labelMap={{ balance: "Balance" }} />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="balance" name="Balance" stroke="hsl(var(--primary))" fill="url(#ppfG)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFrame>
            <p className="text-[12px] text-muted-foreground mt-2 text-center">What this means: the curve steepens in later years — that's compound interest at work.</p>
          </div>
          <InsightGrid
            title="Live insights"
            insights={[
              { key: "mat", label: "Maturity", value: calc.maturity, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "good", hint: "Tax-free corpus at exit" },
              { key: "int", label: "Tax-free interest", value: calc.interest, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "good", hint: "Earnings you keep 100% of" },
              { key: "mult", label: "Money multiple", value: calc.maturity / Math.max(calc.invested, 1), format: (v) => `${v.toFixed(2)}×`, tone: "neutral", hint: "Maturity ÷ total invested" },
            ]}
          />
          <span className="insight-pill block">💡 PPF qualifies for EEE — your interest is 100% tax-free</span>
          <DownloadReport getData={() => ({
            title: "PPF Report",
            rows: [
              { label: "Yearly Deposit", value: `₹${yearly.toLocaleString()}` },
              { label: "Rate", value: `${rate}%` },
              { label: "Tenure", value: `${years} years` },
              { label: "Total Invested", value: `₹${calc.invested.toLocaleString()}` },
              { label: "Interest", value: `₹${Math.round(calc.interest).toLocaleString()}` },
              { label: "Maturity", value: `₹${Math.round(calc.maturity).toLocaleString()}` },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter yearly PPF deposit</div>}
      <AboutCalculator {...aboutContent.ppf} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/ppf-calculator" />
      <RelatedArticles cluster="investments" />
    </div>
  );
};

export default PPFCalculator;
