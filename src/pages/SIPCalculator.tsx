import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import ChartTooltip from "@/components/ChartTooltip";
import InsightGrid, { Insight } from "@/components/InsightGrid";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import ComparisonTable from "@/components/ComparisonTable";
import { Link } from "react-router-dom";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import AnimatedNumber from "@/components/AnimatedNumber";
import { inr, inrCompact } from "@/lib/format";

const faq = [
  { q: "What is SIP?", a: "SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds — monthly, quarterly or weekly. It builds wealth through rupee-cost averaging and compounding." },
  { q: "What is the minimum SIP amount?", a: "Most mutual funds allow SIP starting from ₹100 to ₹500/month. Popular funds like HDFC Top 100, Axis Bluechip and Mirae Asset allow ₹500 minimum SIP." },
  { q: "How much will ₹5,000 SIP give in 10 years?", a: "₹5,000/month SIP for 10 years at 12% annual return: total invested ₹6,00,000, estimated gains ₹5,53,033, maturity ≈ ₹11,61,695. Returns are estimated, not guaranteed." },
  { q: "How much will ₹10,000 SIP give in 20 years?", a: "₹10,000/month SIP for 20 years at 12%: total invested ₹24,00,000, estimated gains ₹75,91,479, maturity ≈ ₹99,91,479 (nearly ₹1 crore)." },
  { q: "Is SIP better than FD?", a: "Historically yes for long term (5+ years). SIP average: 10–14% (equity). FD: 6.5–7.5% (fixed, guaranteed). FD wins for short-term or guaranteed returns; SIP wins for long-term wealth creation." },
  { q: "Can I stop SIP anytime?", a: "Yes. SIP can be paused or stopped anytime online through your broker or AMC portal with no penalty. The already invested amount stays in the fund." },
  { q: "What is Step-up SIP?", a: "Step-up SIP increases your SIP amount by a fixed % every year (typically 10%). If you start at ₹5,000 today and step up 10% yearly, next year it's ₹5,500, then ₹6,050. This dramatically grows the final corpus." },
  { q: "Which SIP gives the highest return in India?", a: "Top SIP funds (5-year returns as of 2025): Quant Small Cap 35%+, Nippon Small Cap 28%+, HDFC Mid Cap 25%+, Parag Parikh Flexi Cap 22%+. Past returns do not guarantee future performance." },
];

const SIPCalculator = () => {
  const [monthly, setMonthly] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);

  const calc = useMemo(() => {
    if (monthly <= 0 || years <= 0 || rate < 0) return null;
    const i = rate / 12 / 100;
    const n = years * 12;
    // Zero-rate guard.
    const fv = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    if (!isFinite(fv)) return null;
    const invested = monthly * n;
    const gains = fv - invested;
    return { fv, invested, gains, n };
  }, [monthly, rate, years]);

  const data = useMemo(() => {
    if (!calc) return [];
    const i = rate / 12 / 100;
    const out: { year: string; value: number; invested: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const n = y * 12;
      const fv = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      out.push({ year: `Y${y}`, value: Math.round(fv), invested: monthly * n });
    }
    return out;
  }, [calc, monthly, rate, years]);

  const insights: Insight[] = calc ? [
    { key: "fv", label: "Maturity Value", value: calc.fv, format: inr, tone: "good", hint: `Projected at the end of ${years} years` },
    { key: "inv", label: "You Invest", value: calc.invested, format: inr, tone: "neutral", hint: `${inr(monthly)} × ${calc.n} months` },
    { key: "gain", label: "Wealth Gained", value: calc.gains, format: inr, tone: "good", hint: `${(calc.fv / calc.invested).toFixed(1)}× your contribution` },
  ] : [];

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="SIP Calculator – Mutual Fund Returns 2025" description="Plan your wealth: calculate SIP returns, maturity value, and total invested for any mutual fund. Free, instant, with growth chart and yearly breakdown." path="/sip-calculator" faq={faq} image="/og/sip.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "SIP Calculator", path: "/sip-calculator" }]} />
        <PageHeading title={"SIP Calculator"} subtitle={"Project mutual fund SIP returns with a clear year-by-year breakup."} />
        <p className="text-base text-muted-foreground">Plan your monthly mutual fund investments</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Monthly Investment (₹)</span>
          <input type="number" min={0} value={monthly || ""} onChange={e => setMonthly(Math.max(0, +e.target.value))} placeholder="5000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Expected Return (%)</span>
          <input type="number" step="0.1" min={0} max={50} value={rate || ""} onChange={e => setRate(Math.max(0, +e.target.value))} placeholder="12" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Duration (years)</span>
          <input type="number" min={1} max={50} value={years || ""} onChange={e => setYears(Math.max(0, +e.target.value))} placeholder="10" className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹<AnimatedNumber value={calc.fv} /></p>
            <p className="text-sm text-muted-foreground mt-1">Maturity Value</p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton text={`SIP maturity: ${inr(calc.fv)} • Invested: ${inr(calc.invested)} • Gains: ${inr(calc.gains)}`} shareTitle="My SIP" />
            </div>
          </motion.div>

          <InsightGrid title="Live insights" insights={insights} />

          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="text-sm text-muted-foreground font-medium mb-1">Wealth Growth — Investment vs Returns</h3>
            <p className="text-[12px] text-muted-foreground mb-3">Hover the chart to compare what you put in vs what it grew to.</p>
            <ChartFrame height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 6, right: 6, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sipG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sipInv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={inrCompact} width={50} />
                  <Tooltip cursor={{ stroke: "hsl(var(--primary))", strokeOpacity: 0.4 }} content={<ChartTooltip titlePrefix="Year" formatValue={(v) => inr(v)} labelMap={{ value: "Projected value", invested: "Total invested" }} />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} formatter={(v) => v === "value" ? "Projected value" : "Total invested"} />
                  <Area type="monotone" dataKey="invested" stroke="hsl(var(--muted-foreground))" fill="url(#sipInv)" strokeWidth={1.5} strokeDasharray="4 3" />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#sipG)" strokeWidth={2.2} activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFrame>
            <p className="text-[12px] text-muted-foreground mt-2 text-center">
              The widening gap is your compounded gains — it grows fastest in the final years.
            </p>
          </div>

          <span className="insight-pill block">💡 Your money grows {((calc.fv / calc.invested) || 0).toFixed(1)}× over {years} years</span>
          <DownloadReport getData={() => ({
            title: "SIP Report",
            rows: [
              { label: "Monthly SIP", value: inr(monthly) },
              { label: "Rate", value: `${rate}%` },
              { label: "Duration", value: `${years} years` },
              { label: "Total Invested", value: inr(calc.invested) },
              { label: "Maturity Value", value: inr(calc.fv) },
              { label: "Estimated Gains", value: inr(calc.gains) },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter SIP details to estimate returns</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="A SIP Calculator shows what a recurring monthly mutual-fund investment can grow into. It uses compounding so you see the long-term effect of small, disciplined contributions."
        formula={{
          label: "Future Value of a SIP",
          expression: "FV = P × [((1 + i)^n − 1) / i] × (1 + i)",
          explanation: "P is the monthly investment, i is the monthly rate (annual % ÷ 12 ÷ 100), n is the number of months."
        }}
        howToUse={[
          "Enter how much you can invest every month.",
          "Enter an expected annual return — equity SIPs average 10-14%.",
          "Enter the duration in years.",
          "See maturity value, total invested, and projected gains.",
        ]}
        whatItMeans={[
          "Maturity Value = the projected corpus at the end of the tenure.",
          "Gains = compounded returns above what you actually invested.",
          "Doubling tenure usually more than doubles the maturity value.",
        ]}
        tips={[
          "Start early — 5 extra years can double your final corpus.",
          "Step up your SIP by 5–10% every year as your salary grows.",
          "Don't pause SIPs in market dips — that's when units are cheapest.",
        ]}
        alsoAsk={[
          { q: "Are SIP returns guaranteed?", a: "No. Mutual fund returns depend on the market. The calculator shows an estimate based on the rate you assume." },
          { q: "Which is better, SIP or lump sum?", a: "SIP suits salaried investors and beats lump sum in volatile markets thanks to rupee-cost averaging." },
          { q: "Can I withdraw a SIP anytime?", a: "Yes for most funds. ELSS funds have a 3-year lock-in per installment." },
        ]}
      />
      <ComparisonTable
        title="SIP vs FD vs PPF"
        headers={["Feature", "SIP (Equity MF)", "FD", "PPF"]}
        rows={[
          ["Typical Returns", "10–14% (market-linked)", "6.5–7.5% (fixed)", "7.1% (govt-set)"],
          ["Risk", "Moderate to High", "Very Low", "Very Low"],
          ["Lock-in", "None (ELSS: 3 yrs)", "7 days – 10 yrs", "15 years"],
          ["Tax on Returns", "LTCG 10% above ₹1L", "Slab rate", "Fully tax-free"],
          ["Best For", "Long-term wealth", "Capital protection", "Tax-free retirement corpus"],
        ]}
        caption="Indicative only. Actual returns vary by fund, bank and year."
      />
      <RelatedTools currentPath="/sip-calculator" />
      <RelatedArticles cluster="investments" />
      <p className="text-xs text-muted-foreground mt-6">
        New to investing terms? See our <Link to="/glossary" className="underline">glossary</Link>.
      </p>
    </div>
  );
};

export default SIPCalculator;
