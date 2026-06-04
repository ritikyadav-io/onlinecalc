import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
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
  { q: "What's the difference between EMI and Loan Calculator?", a: "Loan Calculator gives you full cost breakdown (interest, total payable). EMI Calculator focuses on monthly installments." },
  { q: "Does the calculator handle home, car, and personal loans?", a: "Yes — any reducing-balance loan with fixed rate and tenure works." },
  { q: "How can I lower my total interest?", a: "Choose a shorter tenure, make a larger down payment, or prepay whenever possible." },
];

const howTo = [
  { name: "Enter the loan amount", text: "Type the total principal the lender is offering, e.g. ₹10,00,000." },
  { name: "Add the interest rate", text: "Use the bank's annual rate (e.g. 9.5%) — reducing balance, not flat." },
  { name: "Set the tenure", text: "Enter the number of years to repay. Shorter tenure means lower total interest." },
  { name: "Read the results", text: "See monthly EMI, total interest, principal-vs-interest split, and full payable amount." },
];

const LoanCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);

  const calc = useMemo(() => {
    if (amount <= 0 || rate <= 0 || years <= 0) return null;
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - amount;
    return { emi, total, interest };
  }, [amount, rate, years]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Loan Calculator – Total Interest & EMI Cost" description="Estimate the true cost of any loan: monthly EMI, total interest, and full payable amount for home, car, education, or personal loans. Free and accurate." path="/loan-calculator" faq={faq} howTo={howTo} image="/og/loan.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Loan Calculator", path: "/loan-calculator" }]} />
        <PageHeading title={"Loan Calculator"} subtitle={"Total interest, total cost and EMI for any loan."} />
        <p className="text-base text-muted-foreground">See the full cost of any loan</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Loan Amount (₹)</span>
          <input type="number" value={amount || ""} onChange={e => setAmount(+e.target.value)} placeholder="1000000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Interest Rate (%)</span>
          <input type="number" step="0.1" value={rate || ""} onChange={e => setRate(+e.target.value)} placeholder="9.5" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Tenure (years)</span>
          <input type="number" value={years || ""} onChange={e => setYears(+e.target.value)} placeholder="10" className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{Math.round(calc.total).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Payable</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-foreground">₹{Math.round(calc.emi).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Monthly EMI</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-danger">₹{Math.round(calc.interest).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Interest</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h2 className="text-sm text-muted-foreground font-medium mb-3">Principal vs Interest</h2>
            <ChartFrame height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ name: "Principal", value: amount }, { name: "Interest", value: Math.round(calc.interest) }]} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    <Cell fill="hsl(var(--primary))" /><Cell fill="hsl(var(--destructive))" />
                  </Pie>
                  <Tooltip content={<ChartTooltip formatValue={(v) => `₹${Math.round(v).toLocaleString()}`} />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
            <p className="text-[12px] text-muted-foreground mt-2 text-center">What this means: the red slice is pure cost — money you pay for borrowing.</p>
          </div>
          <InsightGrid
            title="Live insights"
            insights={[
              { key: "emi", label: "Monthly EMI", value: calc.emi, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "neutral", hint: "What leaves your bank each month" },
              { key: "intpct", label: "Interest share", value: (calc.interest / amount) * 100, format: (v) => `${v.toFixed(0)}%`, tone: calc.interest / amount > 0.8 ? "danger" : calc.interest / amount > 0.5 ? "warn" : "good", hint: "% of principal paid as interest" },
              { key: "total", label: "Total payable", value: calc.total, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "warn", hint: "Principal + total interest" },
            ]}
          />
          <span className="insight-pill block">💡 You'll pay {((calc.interest / amount) * 100).toFixed(0)}% of the loan amount as interest</span>
          <CopyResultButton
            shareTitle="Loan cost breakdown"
            text={`Loan ₹${amount.toLocaleString()} @ ${rate}% for ${years}y → EMI ₹${Math.round(calc.emi).toLocaleString()}, Interest ₹${Math.round(calc.interest).toLocaleString()}, Total ₹${Math.round(calc.total).toLocaleString()}`}
          />
          <DownloadReport getData={() => ({
            title: "Loan Report",
            rows: [
              { label: "Loan Amount", value: `₹${amount.toLocaleString()}` },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Tenure", value: `${years} years` },
              { label: "EMI", value: `₹${Math.round(calc.emi).toLocaleString()}` },
              { label: "Total Interest", value: `₹${Math.round(calc.interest).toLocaleString()}` },
              { label: "Total Payable", value: `₹${Math.round(calc.total).toLocaleString()}` },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter loan details to see full cost</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="Use this loan calculator to see the true cost of any reducing-balance loan — home, car, education, or personal — including monthly EMI, total interest paid, and the full payable amount over the tenure."
        formula={{ label: "EMI (reducing balance)", expression: "EMI = P × r × (1+r)^n / ((1+r)^n − 1)", explanation: "P = principal, r = monthly rate (annual ÷ 12 ÷ 100), n = months." }}
        howToUse={["Enter the loan amount in rupees", "Add the annual interest rate offered by the lender", "Set tenure in years — shorter tenure = less interest paid", "Compare scenarios by changing one variable at a time"]}
        whatItMeans={["Total interest above 50% of principal means you're paying premium for time", "Lower EMI from longer tenure usually doubles or triples lifetime interest", "Even a 0.5% rate drop on a 20-year home loan can save lakhs"]}
        tips={["Always prepay in the first half of the tenure — that's when interest share is highest", "Use part-payment over tenure-extension if your lender allows both", "Compare reducing-balance vs flat rate; flat rate looks lower but costs more"]}
        alsoAsk={[
          { q: "Is EMI calculated on reducing balance?", a: "Most consumer loans (home, car, personal) use reducing balance. Some short-term and auto-finance products quote flat rate — always confirm before signing." },
          { q: "Does prepayment reduce EMI or tenure?", a: "Either, depending on your bank. Reducing tenure saves more total interest; reducing EMI improves monthly cash flow." },
        ]}
      />
      <RelatedTools currentPath="/loan-calculator" />
      <RelatedArticles cluster="loans" />
    </div>
  );
};

export default LoanCalculator;
