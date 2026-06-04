import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, CartesianGrid, Legend } from "recharts";
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
import { inr, inrCompact, pct } from "@/lib/format";

const faq = [
  { q: "What is EMI?", a: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It includes both principal repayment and interest charged by the bank." },
  { q: "What is the EMI formula?", a: "EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P = Principal, R = Monthly interest rate (Annual ÷ 12 ÷ 100), N = Tenure in months. Example: ₹10 lakh loan at 9% for 20 years = EMI of ₹8,997." },
  { q: "What is EMI for 20 lakh home loan?", a: "For ₹20 lakh home loan at 8.5% for 20 years, EMI ≈ ₹17,356/month. Total interest ≈ ₹21.65 lakh. Total payment ≈ ₹41.65 lakh." },
  { q: "What is EMI for 50 lakh home loan?", a: "For ₹50 lakh home loan at 8.5% for 20 years, EMI ≈ ₹43,391/month. Use the calculator above for your exact figures." },
  { q: "Which bank has the lowest home loan interest rate in 2025?", a: "As of 2025: SBI 8.40%, PNB 8.40%, HDFC 8.45%, Kotak 8.70%. Rates vary by credit score and loan amount." },
  { q: "Does prepaying a loan reduce EMI or tenure?", a: "Both options are available. Reducing tenure saves more interest overall; reducing EMI improves monthly cash flow. Most experts recommend reducing tenure." },
  { q: "What happens if I miss an EMI payment?", a: "Missing an EMI attracts a 1–2% penalty, damages your CIBIL score, and may trigger late-payment charges. Always pay on or before the due date." },
  { q: "How can I reduce my EMI amount?", a: "Four ways: (1) Increase down payment, (2) Choose a longer tenure, (3) Negotiate a lower interest rate, (4) Improve your credit score before applying." },
];

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [tenure, setTenure] = useState(0);

  const calc = useMemo(() => {
    if (principal <= 0 || tenure <= 0 || rate < 0) return null;
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    // Zero-rate guard — formula divides by 0 when r = 0.
    const emi = monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    if (!isFinite(emi) || emi <= 0) return null;
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    return { emi, totalPayment, totalInterest, months };
  }, [principal, rate, tenure]);

  const hasData = calc !== null;

  const pieData = hasData ? [
    { name: "Principal", value: Math.round(principal) },
    { name: "Interest", value: Math.round(calc.totalInterest) },
  ] : [];

  const yearlyData = useMemo(() => {
    if (!hasData || !calc) return [];
    const monthlyRate = rate / 12 / 100;
    let balance = principal;
    const data: { year: string; balance: number; paid: number; interest: number }[] = [];
    for (let yr = 1; yr <= tenure; yr++) {
      let yearInterest = 0;
      let yearPrincipal = 0;
      for (let m = 0; m < 12; m++) {
        const interest = balance * monthlyRate;
        const principalPart = calc.emi - interest;
        yearInterest += interest;
        yearPrincipal += principalPart;
        balance -= principalPart;
      }
      data.push({
        year: `Y${yr}`,
        balance: Math.max(0, Math.round(balance)),
        paid: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
      });
    }
    return data;
  }, [hasData, calc, principal, rate, tenure]);

  const interestRatio = hasData ? (calc.totalInterest / principal) * 100 : 0;
  const insights: Insight[] = hasData && calc ? [
    { key: "emi", label: "Monthly EMI", value: calc.emi, format: inr, tone: "neutral", hint: "Auto-debited from your account each month" },
    { key: "interest", label: "Total Interest", value: calc.totalInterest, format: inr, tone: interestRatio > 50 ? "danger" : "warn", hint: `${interestRatio.toFixed(0)}% of the principal — extra you pay to borrow` },
    { key: "total", label: "Total Payable", value: calc.totalPayment, format: inr, tone: "neutral", hint: `Over ${calc.months} months` },
  ] : [];

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="EMI Calculator – Smart Loan Planner Online" description="Calculate monthly EMI for home, car, and personal loans with full interest, principal split, and amortisation chart. Free, accurate, and instant." path="/emi-calculator" faq={faq} image="/og/emi.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "EMI Calculator", path: "/emi-calculator" }]} />
      <div>
        <PageHeading title={"EMI Calculator"} subtitle={"Calculate your loan EMI, total interest and amortisation schedule."} />
        <p className="text-base text-muted-foreground mt-1">Enter loan details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Loan Amount (₹)</span>
          <input type="number" min={0} value={principal || ""} onChange={e => setPrincipal(Math.max(0, +e.target.value))} placeholder="500000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Interest Rate (%)</span>
          <input type="number" step="0.1" min={0} max={50} value={rate || ""} onChange={e => setRate(Math.max(0, +e.target.value))} placeholder="8.5" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Tenure (years)</span>
          <input type="number" min={1} max={40} value={tenure || ""} onChange={e => setTenure(Math.max(0, +e.target.value))} placeholder="5" className="compact-input" /></label>
      </div>

      {hasData && calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">
              ₹<AnimatedNumber value={calc.emi} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Monthly EMI</p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton text={`Monthly EMI: ${inr(calc.emi)} • Total interest: ${inr(calc.totalInterest)} • Total payable: ${inr(calc.totalPayment)}`} shareTitle="My EMI" />
            </div>
          </motion.div>

          <InsightGrid title="Live insights" insights={insights} />

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-sm text-muted-foreground font-medium mb-1">Payment Split</h3>
              <p className="text-[12px] text-muted-foreground mb-3">Hover any slice to see exact rupee share</p>
              <ChartFrame height={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={2} stroke="hsl(var(--background))" strokeWidth={2} label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false} isAnimationActive>
                      <Cell fill="hsl(var(--primary))" /><Cell fill="hsl(var(--danger))" />
                    </Pie>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                    <Tooltip content={<ChartTooltip formatValue={(v) => inr(v)} />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartFrame>
              <p className="text-[12px] text-muted-foreground mt-2 text-center">
                You pay <b className="text-foreground">{((calc.totalInterest / calc.totalPayment) * 100).toFixed(0)}%</b> of every EMI as interest on average.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-sm text-muted-foreground font-medium mb-1">Loan Balance over Time</h3>
              <p className="text-[12px] text-muted-foreground mb-3">Drag across to see year-by-year outstanding</p>
              <ChartFrame height={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearlyData} margin={{ top: 6, right: 6, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="emiG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={inrCompact} width={50} />
                    <Tooltip cursor={{ stroke: "hsl(var(--primary))", strokeOpacity: 0.4, strokeWidth: 1 }} content={<ChartTooltip titlePrefix="Year" formatValue={(v) => inr(v)} labelMap={{ balance: "Remaining loan", interest: "Interest paid", paid: "Principal paid" }} />} />
                    <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" fill="url(#emiG)" strokeWidth={2.2} activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartFrame>
              <p className="text-[12px] text-muted-foreground mt-2 text-center">
                Balance falls slowly at first because early EMIs are interest-heavy.
              </p>
            </div>
          </motion.div>

          <span className="insight-pill block">💡 You'll pay {inr(calc.totalInterest)} as interest ({interestRatio.toFixed(0)}% of loan)</span>

          <DownloadReport getData={() => ({
            title: "EMI Report",
            rows: [
              { label: "Loan Amount", value: inr(principal) },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Tenure", value: `${tenure} years (${calc.months} months)` },
              { label: "Monthly EMI", value: inr(calc.emi) },
              { label: "Total Payment", value: inr(calc.totalPayment) },
              { label: "Total Interest", value: inr(calc.totalInterest) },
            ]
          })} />
        </>
      )}

      {!hasData && <div className="text-center py-12 text-base text-muted-foreground">Enter loan details to calculate EMI</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="The EMI Calculator turns any loan offer into a clear monthly figure so you can compare lenders, plan your budget, and avoid taking on more debt than you can comfortably repay."
        formula={{
          label: "Equated Monthly Installment (EMI)",
          expression: "EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]",
          explanation: "P is principal, r is monthly interest rate (annual rate ÷ 12 ÷ 100), and n is total number of months."
        }}
        howToUse={[
          "Enter the loan amount you want to borrow.",
          "Enter the lender's annual interest rate.",
          "Enter the tenure in years.",
          "Read the EMI, total interest, and full payable amount on the chart.",
        ]}
        whatItMeans={[
          "Monthly EMI = the fixed amount auto-debited each month.",
          "Total interest = the real cost of borrowing the principal.",
          "A long tenure lowers EMI but raises total interest sharply.",
        ]}
        tips={[
          "Keep total EMIs under 40% of your monthly take-home pay.",
          "A 0.5% lower interest rate on a 20-year home loan can save lakhs.",
          "Even one extra EMI per year can shorten the tenure by months.",
        ]}
        alsoAsk={[
          { q: "Is EMI the same for all loans?", a: "The formula is the same. Only principal, rate, and tenure differ between home, car, education, and personal loans." },
          { q: "Does prepayment reduce EMI?", a: "Most banks let you choose: lower the EMI or shorten the tenure. Shortening the tenure usually saves more interest." },
          { q: "Why is initial EMI mostly interest?", a: "EMIs are front-loaded with interest. The principal portion grows slowly through the tenure." },
        ]}
      />
      <ComparisonTable
        title="EMI Tips: Tenure vs Interest Trade-off"
        headers={["Tenure", "Monthly EMI", "Total Interest", "Best For"]}
        rows={[
          ["Short (5–7 yrs)", "Higher", "Lowest overall", "Lower lifetime cost"],
          ["Medium (10–15 yrs)", "Balanced", "Moderate", "Most home/car loans"],
          ["Long (20–30 yrs)", "Lowest", "Highest overall", "Affordability today"],
        ]}
        caption="Lower EMIs feel easier but compound into much higher total interest. Prepay when possible."
      />
      <RelatedTools currentPath="/emi-calculator" />
      <RelatedArticles cluster="loans" />
      <p className="text-xs text-muted-foreground mt-6">
        Confused by a term? See the <Link to="/glossary" className="underline">glossary</Link>.
      </p>
    </div>
  );
};

export default EMICalculator;
