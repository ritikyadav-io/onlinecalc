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
import CopyResultButton from "@/components/CopyResultButton";
import AboutCalculator from "@/components/AboutCalculator";

const faq = [
  { q: "What is the compound interest formula?", a: "A = P × (1 + r/n)^(n×t), where P is principal, r is annual rate, n is compounding frequency, t is years." },
  { q: "Why is compound interest powerful?", a: "Because you earn interest on your interest. Over decades, this is what builds wealth." },
  { q: "Annual vs monthly compounding?", a: "Monthly compounding gives slightly higher returns. The more frequent the compounding, the better." },
];

const howTo = [
  { name: "Enter the principal", text: "Type your starting investment, e.g. ₹1,00,000." },
  { name: "Set expected annual rate", text: "Use a realistic figure — 7% for FD, 12% for equity index funds." },
  { name: "Choose tenure & compounding", text: "Pick the holding period in years and how often interest compounds." },
  { name: "Inspect the growth curve", text: "Hover the chart to see your balance for any year." },
];

const freqs = [
  { label: "Annually", value: 1 },
  { label: "Half-Yearly", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [n, setN] = useState(12);

  const calc = useMemo(() => {
    if (principal <= 0 || rate <= 0 || years <= 0) return null;
    const amount = principal * Math.pow(1 + rate / 100 / n, n * years);
    const interest = amount - principal;
    const data = [];
    for (let y = 1; y <= years; y++) {
      data.push({ year: `Y${y}`, value: Math.round(principal * Math.pow(1 + rate / 100 / n, n * y)) });
    }
    return { amount, interest, data };
  }, [principal, rate, years, n]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Compound Interest Calculator – Growth Chart" description="See the real power of compounding: calculate compound interest daily, monthly, or yearly with an instant growth chart and full breakdown. Free and accurate." path="/compound-interest-calculator" faq={faq} howTo={howTo} image="/og/compound.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Compound Interest", path: "/compound-interest-calculator" }]} />
        <PageHeading title={"Compound Interest Calculator"} subtitle={"See the true power of compounding over any tenure."} />
        <p className="text-base text-muted-foreground">Watch your money compound over time</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Principal (₹)</span>
          <input type="number" value={principal || ""} onChange={e => setPrincipal(+e.target.value)} placeholder="100000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Annual Rate (%)</span>
          <input type="number" step="0.1" value={rate || ""} onChange={e => setRate(+e.target.value)} placeholder="10" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Years</span>
          <input type="number" value={years || ""} onChange={e => setYears(+e.target.value)} placeholder="10" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Compounding</span>
          <select value={n} onChange={e => setN(+e.target.value)} className="compact-input">
            {freqs.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{Math.round(calc.amount).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Final Amount</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-foreground">₹{principal.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Principal</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-safe">₹{Math.round(calc.interest).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Interest</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h2 className="text-sm text-muted-foreground font-medium mb-3">Growth Curve</h2>
            <ChartFrame height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calc.data}>
                  <defs><linearGradient id="ciG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient></defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => v >= 1e5 ? `₹${(v / 1e5).toFixed(1)}L` : `₹${v}`} />
                  <Tooltip content={<ChartTooltip formatValue={(v) => `₹${Math.round(v).toLocaleString()}`} labelMap={{ value: "Balance" }} />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" name="Balance" stroke="hsl(var(--primary))" fill="url(#ciG)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFrame>
            <p className="text-[12px] text-muted-foreground mt-2 text-center">What this means: the curve bends upward — later years add far more than the first.</p>
          </div>
          <InsightGrid
            title="Live insights"
            insights={[
              { key: "mult", label: "Money multiple", value: calc.amount / principal, format: (v) => `${v.toFixed(2)}×`, tone: "good", hint: "Final ÷ principal" },
              { key: "int", label: "Interest earned", value: calc.interest, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "good", hint: "Reinvested gains" },
              { key: "cagr", label: "Effective rate", value: rate, format: (v) => `${v.toFixed(2)}%`, tone: "neutral", hint: `Compounded ${n}×/yr` },
            ]}
          />
          <span className="insight-pill block">💡 Your money grew {(calc.amount / principal).toFixed(2)}× over {years} years</span>
          <CopyResultButton
            shareTitle="Compound interest result"
            text={`₹${principal.toLocaleString()} @ ${rate}% for ${years}y (compounded ${n}/yr) → ₹${Math.round(calc.amount).toLocaleString()} (interest ₹${Math.round(calc.interest).toLocaleString()})`}
          />
          <DownloadReport getData={() => ({
            title: "Compound Interest Report",
            rows: [
              { label: "Principal", value: `₹${principal.toLocaleString()}` },
              { label: "Rate", value: `${rate}%` },
              { label: "Years", value: `${years}` },
              { label: "Compounding", value: `${n}/yr` },
              { label: "Interest", value: `₹${Math.round(calc.interest).toLocaleString()}` },
              { label: "Final Amount", value: `₹${Math.round(calc.amount).toLocaleString()}` },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter principal and rate</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="Calculate how much an investment grows when interest is reinvested. Choose your compounding frequency — annual, monthly, daily — and see the impact of time, rate, and principal on the final corpus."
        formula={{ label: "Compound Interest", expression: "A = P × (1 + r/n)^(n×t)", explanation: "P = principal, r = annual rate (decimal), n = times compounded per year, t = years." }}
        howToUse={["Enter your starting principal", "Add the expected annual rate of return", "Choose tenure in years and compounding frequency", "Try doubling the years to feel how compounding accelerates"]}
        whatItMeans={["A 10× multiple over 25 years implies roughly a 10% CAGR — realistic for equity index funds", "Daily vs annual compounding adds only marginal returns at the same rate", "The last 10 years of a long horizon usually contribute more than the first 20"]}
        tips={["Start early — time matters more than amount in compounding", "Reinvest dividends; partial withdrawals break the curve", "Inflation-adjust the final value (subtract ~6%/yr in India) to know real wealth"]}
        alsoAsk={[
          { q: "Is monthly or annual compounding better?", a: "Higher frequency wins, but the gap is small. ₹1L @ 10% for 10y = ₹2.59L annually vs ₹2.71L monthly — a ~5% difference." },
          { q: "What's a realistic compounding rate?", a: "FDs: 6–7%. PPF: 7.1%. Index funds (long-term): 10–12%. Don't model above 15% for planning." },
        ]}
      />
      <RelatedTools currentPath="/compound-interest-calculator" />
      <RelatedArticles cluster="investments" />
    </div>
  );
};

export default CompoundInterestCalculator;
