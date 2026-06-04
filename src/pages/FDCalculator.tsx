import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import AnimatedNumber from "@/components/AnimatedNumber";
import InsightGrid from "@/components/InsightGrid";

const faq = [
  { q: "How is FD interest calculated?", a: "Most banks compound quarterly: A = P × (1 + r/4)^(4t). This calculator uses quarterly compounding by default." },
  { q: "Is FD interest taxable?", a: "Yes. Interest is added to your income and taxed per slab. Banks deduct 10% TDS if interest exceeds ₹40,000/year." },
  { q: "Can I break an FD early?", a: "Yes, but most banks charge a 0.5–1% penalty on the applicable rate." },
];

const howTo = [
  { name: "Enter the deposit amount", text: "Type the principal you'll park, e.g. ₹1,00,000." },
  { name: "Add the bank's annual rate", text: "Use the contractual rate — typically 6.5–7.5% for general public." },
  { name: "Set the tenure", text: "Enter years (can be fractional for 9-month, 18-month FDs)." },
  { name: "Read maturity & interest", text: "See the final amount and exact interest earned at maturity." },
];

const FDCalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);

  const calc = useMemo(() => {
    if (principal <= 0 || rate <= 0 || years <= 0) return null;
    const n = 4; // quarterly compounding
    const maturity = principal * Math.pow(1 + rate / 100 / n, n * years);
    const interest = maturity - principal;
    return { maturity, interest };
  }, [principal, rate, years]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="FD Calculator – Maturity & Interest in Seconds" description="Calculate fixed deposit maturity, interest earned, and total returns with quarterly compounding. Plan smarter savings with this free FD calculator." path="/fd-calculator" faq={faq} howTo={howTo} breadcrumbs={[{ name: "Home", path: "/" }, { name: "FD Calculator", path: "/fd-calculator" }]} />
        <PageHeading title={"FD Calculator"} subtitle={"Estimate fixed deposit maturity, interest earned and tax impact."} />
        <p className="text-base text-muted-foreground">Estimate fixed deposit maturity</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Deposit (₹)</span>
          <input type="number" value={principal || ""} onChange={e => setPrincipal(+e.target.value)} placeholder="100000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Interest Rate (%)</span>
          <input type="number" step="0.1" value={rate || ""} onChange={e => setRate(+e.target.value)} placeholder="7.0" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Tenure (years)</span>
          <input type="number" step="0.1" value={years || ""} onChange={e => setYears(+e.target.value)} placeholder="5" className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹<AnimatedNumber value={calc.maturity} /></p>
            <p className="text-sm text-muted-foreground mt-1">Maturity Amount</p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton text={`FD maturity: ₹${Math.round(calc.maturity).toLocaleString()} • Interest earned: ₹${Math.round(calc.interest).toLocaleString()}`} shareTitle="My FD" />
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-foreground">₹{principal.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Principal</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold text-safe">₹{Math.round(calc.interest).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Interest Earned</p>
            </div>
          </div>
          <InsightGrid
            title="Live insights"
            insights={[
              { key: "mult", label: "Money multiple", value: calc.maturity / principal, format: (v) => `${v.toFixed(2)}×`, tone: "good", hint: "Maturity ÷ principal" },
              { key: "int", label: "Interest earned", value: calc.interest, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "good", hint: "Compounded quarterly" },
              { key: "tds", label: "TDS likely?", text: calc.interest > 40000 ? "Yes — file 15G/H" : "No", tone: calc.interest > 40000 ? "warn" : "neutral", hint: "Banks deduct 10% if interest > ₹40k/yr" },
            ]}
          />
          <span className="insight-pill block">💡 Quarterly compounding at {rate}% — your money grows {(calc.maturity / principal).toFixed(2)}×</span>
          <DownloadReport getData={() => ({
            title: "FD Report",
            rows: [
              { label: "Principal", value: `₹${principal.toLocaleString()}` },
              { label: "Rate", value: `${rate}%` },
              { label: "Tenure", value: `${years} years` },
              { label: "Interest", value: `₹${Math.round(calc.interest).toLocaleString()}` },
              { label: "Maturity Amount", value: `₹${Math.round(calc.maturity).toLocaleString()}` },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter FD details to see maturity</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="The FD Calculator estimates how much a fixed deposit will grow into at maturity. It uses quarterly compounding — the standard followed by most Indian banks."
        formula={{
          label: "FD Maturity (quarterly compounding)",
          expression: "A = P × (1 + r/4)^(4t)",
          explanation: "P is principal, r is annual interest rate (decimal), t is tenure in years."
        }}
        howToUse={[
          "Enter the deposit amount.",
          "Enter the bank's annual interest rate.",
          "Enter tenure in years.",
          "See maturity amount and total interest earned.",
        ]}
        whatItMeans={[
          "Maturity Amount = principal + compounded interest at the end of tenure.",
          "Quarterly compounding earns slightly more than yearly compounding.",
          "Senior citizens usually get a 0.5% rate bonus.",
        ]}
        tips={[
          "Laddering FDs (1, 2, 3, 5 years) gives liquidity without sacrificing rate.",
          "Interest above ₹40,000/year is subject to 10% TDS.",
          "Avoid breaking an FD early — most banks charge 0.5–1% penalty.",
        ]}
      />
      <RelatedTools currentPath="/fd-calculator" />
      <RelatedArticles cluster="investments" />
    </div>
  );
};

export default FDCalculator;
