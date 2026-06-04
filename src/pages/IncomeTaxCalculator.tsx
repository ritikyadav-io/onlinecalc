import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeading from "@/components/PageHeading";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import AnimatedNumber from "@/components/AnimatedNumber";
import InsightGrid from "@/components/InsightGrid";

type Regime = "new" | "old";

// FY 2025-26 (AY 2026-27) — New Regime slabs (Budget 2025).
const NEW_SLABS: { upto: number; rate: number }[] = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.10 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.20 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.30 },
];

// Old Regime slabs (unchanged — < 60 years).
const OLD_SLABS: { upto: number; rate: number }[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.20 },
  { upto: Infinity, rate: 0.30 },
];

function slabTax(taxable: number, slabs: typeof NEW_SLABS) {
  let tax = 0;
  let lower = 0;
  for (const s of slabs) {
    if (taxable > s.upto) {
      tax += (s.upto - lower) * s.rate;
      lower = s.upto;
    } else {
      tax += (taxable - lower) * s.rate;
      return tax;
    }
  }
  return tax;
}

function surcharge(taxable: number, tax: number, regime: Regime) {
  // Surcharge on tax amount above income thresholds (simplified, no marginal relief).
  let pct = 0;
  if (taxable > 50000000) pct = regime === "new" ? 0.25 : 0.37;
  else if (taxable > 20000000) pct = 0.25;
  else if (taxable > 10000000) pct = 0.15;
  else if (taxable > 5000000) pct = 0.10;
  return tax * pct;
}

const faq = [
  { q: "Which is better — old or new tax regime in 2026?", a: "For salaried employees with limited deductions (< ₹2 lakh), the new regime is almost always better thanks to the ₹12.75 lakh tax-free ceiling. The old regime wins only if you claim heavy 80C + HRA + home-loan interest deductions together." },
  { q: "What is the tax-free income limit for FY 2025-26?", a: "Under the new regime, income up to ₹12 lakh is fully tax-free for resident individuals (rebate u/s 87A). After the ₹75,000 standard deduction, a salaried person earning up to ₹12.75 lakh pays zero tax." },
  { q: "Is the standard deduction available in the new regime?", a: "Yes. From FY 2024-25 onwards, salaried taxpayers and pensioners get ₹75,000 standard deduction under the new regime (₹50,000 under the old regime)." },
  { q: "How is Health & Education Cess calculated?", a: "4% of (income tax + surcharge). It funds health and education schemes and is mandatory on every tax payable amount." },
  { q: "Does this calculator include 80C, 80D, HRA?", a: "Only under the old regime. The new regime removes most deductions (80C, 80D, HRA, LTA etc.) in exchange for lower slabs and the ₹12 lakh rebate." },
  { q: "Is the calculator accurate for FY 2025-26?", a: "Yes — slabs follow Budget 2025 (announced Feb 1, 2025) for the new regime. Calculations match the Income Tax Department's e-filing portal for standard salary cases." },
  { q: "How do I save more tax under the new regime?", a: "Maximise employer NPS contribution (14% under Sec 80CCD(2) is still allowed), use the ₹75,000 standard deduction, and structure perks (food coupons, reimbursements) that remain exempt." },
];

const howTo = [
  { name: "Enter your annual income", text: "Type your gross annual salary or income (CTC minus employer PF if salaried)." },
  { name: "Pick a tax regime", text: "Toggle between new and old regime to see which saves more." },
  { name: "Add deductions (old regime only)", text: "Enter 80C, 80D, HRA and home-loan interest if you opted for the old regime." },
  { name: "Read your final tax", text: "See tax payable, monthly TDS, and effective tax rate at a glance." },
];

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<Regime>("new");
  const [deductions, setDeductions] = useState(0);

  const calc = useMemo(() => {
    if (!income || income <= 0) return null;

    const standardDeduction = regime === "new" ? 75000 : 50000;
    const totalDeductions = regime === "old" ? standardDeduction + (deductions || 0) : standardDeduction;
    const taxable = Math.max(0, income - totalDeductions);

    const slabs = regime === "new" ? NEW_SLABS : OLD_SLABS;
    let tax = slabTax(taxable, slabs);

    // Sec 87A rebate
    if (regime === "new" && taxable <= 1200000) tax = 0;
    if (regime === "old" && taxable <= 500000) tax = 0;

    const sur = surcharge(taxable, tax, regime);
    const cess = (tax + sur) * 0.04;
    const total = tax + sur + cess;
    const monthly = total / 12;
    const effective = income > 0 ? (total / income) * 100 : 0;

    // Always compute the other regime so we can show the better choice.
    const otherRegime: Regime = regime === "new" ? "old" : "new";
    const oStd = otherRegime === "new" ? 75000 : 50000;
    const oTotalDed = otherRegime === "old" ? oStd + (deductions || 0) : oStd;
    const oTaxable = Math.max(0, income - oTotalDed);
    let oTax = slabTax(oTaxable, otherRegime === "new" ? NEW_SLABS : OLD_SLABS);
    if (otherRegime === "new" && oTaxable <= 1200000) oTax = 0;
    if (otherRegime === "old" && oTaxable <= 500000) oTax = 0;
    const oSur = surcharge(oTaxable, oTax, otherRegime);
    const oCess = (oTax + oSur) * 0.04;
    const oTotal = oTax + oSur + oCess;

    return { taxable, tax, sur, cess, total, monthly, effective, otherRegime, otherTotal: oTotal };
  }, [income, regime, deductions]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead
        title="Income Tax Calculator FY 2025-26 (AY 2026-27) — New vs Old Regime"
        description="Free Income Tax Calculator India for FY 2025-26. Compare new vs old tax regime, see slab-wise tax, surcharge, cess, and monthly TDS instantly. Zero signup."
        path="/income-tax-calculator"
        faq={faq}
        howTo={howTo}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Income Tax Calculator", path: "/income-tax-calculator" },
        ]}
      />
      <PageHeading
        title="Income Tax Calculator"
        subtitle="FY 2025-26 (AY 2026-27) — compare new vs old regime, see slab-wise tax, surcharge & cess."
      />

      <div className="flex gap-2 p-1 bg-secondary rounded-2xl">
        {(["new", "old"] as Regime[]).map((r) => (
          <button
            key={r}
            onClick={() => setRegime(r)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              regime === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {r === "new" ? "New Regime (default)" : "Old Regime"}
          </button>
        ))}
      </div>

      <h2 className="sr-only">Enter your details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">Annual Income (₹)</span>
          <input
            type="number"
            value={income || ""}
            onChange={(e) => setIncome(+e.target.value)}
            placeholder="1200000"
            className="compact-input"
            aria-label="Annual income in rupees"
          />
        </label>
        {regime === "old" && (
          <label className="space-y-2">
            <span className="text-sm text-muted-foreground">Deductions (80C+80D+HRA, ₹)</span>
            <input
              type="number"
              value={deductions || ""}
              onChange={(e) => setDeductions(+e.target.value)}
              placeholder="200000"
              className="compact-input"
              aria-label="Total deductions in rupees"
            />
          </label>
        )}
      </div>

      {calc && (
        <>
          <h2 className="sr-only">Your tax breakdown</h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary/10 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-primary">
              ₹<AnimatedNumber value={calc.total} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Tax Payable (incl. cess)</p>
            <p className="text-xs text-muted-foreground mt-1">
              ≈ ₹{Math.round(calc.monthly).toLocaleString()}/month TDS
            </p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton
                text={`Income tax FY25-26 (${regime} regime): ₹${Math.round(
                  calc.total
                ).toLocaleString()} on ₹${income.toLocaleString()}`}
                shareTitle="My Income Tax"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-lg font-bold text-foreground">₹{Math.round(calc.taxable).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Taxable Income</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-lg font-bold text-foreground">₹{Math.round(calc.tax).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Slab Tax</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-lg font-bold text-warning">₹{Math.round(calc.sur).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Surcharge</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-lg font-bold text-accent">₹{Math.round(calc.cess).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">4% Cess</p>
            </div>
          </div>

          <InsightGrid
            title="Live insights"
            insights={[
              {
                key: "eff",
                label: "Effective tax rate",
                value: calc.effective,
                format: (v) => `${v.toFixed(2)}%`,
                tone: calc.effective < 10 ? "good" : calc.effective < 20 ? "neutral" : "warn",
                hint: "Total tax ÷ gross income",
              },
              {
                key: "month",
                label: "Monthly TDS",
                value: calc.monthly,
                format: (v) => `₹${Math.round(v).toLocaleString()}`,
                tone: "neutral",
                hint: "What your employer will deduct each month",
              },
              {
                key: "better",
                label: `${calc.otherRegime === "new" ? "New" : "Old"} regime tax`,
                value: calc.otherTotal,
                format: (v) => `₹${Math.round(v).toLocaleString()}`,
                tone: calc.otherTotal < calc.total ? "good" : "warn",
                hint:
                  calc.otherTotal < calc.total
                    ? `Switching saves ₹${Math.round(calc.total - calc.otherTotal).toLocaleString()}`
                    : `Current regime is better by ₹${Math.round(calc.otherTotal - calc.total).toLocaleString()}`,
              },
            ]}
          />

          <span className="insight-pill block">
            💡 {regime === "new"
              ? "New regime — slabs are wider, but no 80C/80D/HRA deductions."
              : "Old regime — claim 80C (₹1.5L), 80D, HRA & home-loan interest to beat the new regime."}
          </span>

          <DownloadReport
            getData={() => ({
              title: `Income Tax Report — FY 2025-26 (${regime} regime)`,
              rows: [
                { label: "Annual Income", value: `₹${income.toLocaleString()}` },
                { label: "Regime", value: regime === "new" ? "New" : "Old" },
                { label: "Standard Deduction", value: `₹${(regime === "new" ? 75000 : 50000).toLocaleString()}` },
                ...(regime === "old"
                  ? [{ label: "Other Deductions", value: `₹${(deductions || 0).toLocaleString()}` }]
                  : []),
                { label: "Taxable Income", value: `₹${Math.round(calc.taxable).toLocaleString()}` },
                { label: "Slab Tax", value: `₹${Math.round(calc.tax).toLocaleString()}` },
                { label: "Surcharge", value: `₹${Math.round(calc.sur).toLocaleString()}` },
                { label: "Health & Education Cess (4%)", value: `₹${Math.round(calc.cess).toLocaleString()}` },
                { label: "Total Tax Payable", value: `₹${Math.round(calc.total).toLocaleString()}` },
                { label: "Monthly TDS", value: `₹${Math.round(calc.monthly).toLocaleString()}` },
                { label: "Effective Tax Rate", value: `${calc.effective.toFixed(2)}%` },
              ],
            })}
          />
        </>
      )}

      {!calc && (
        <div className="text-center py-12 text-base text-muted-foreground">
          Enter your annual income to see tax payable
        </div>
      )}

      <FAQSection items={faq} />

      <AboutCalculator
        intro="The Income Tax Calculator computes your tax liability for FY 2025-26 (AY 2026-27) under both the new and old regimes. It auto-applies the latest Budget 2025 slabs, the ₹75,000 standard deduction, 87A rebate, surcharge slabs and 4% health & education cess."
        formula={{
          label: "Total Tax",
          expression: "Total = (Slab Tax + Surcharge) × 1.04",
          explanation: "Slab tax is the sum of marginal tax on each slab band of your taxable income; surcharge applies above ₹50 lakh; 4% cess applies to (tax + surcharge).",
        }}
        howToUse={[
          "Enter your annual gross income.",
          "Toggle between new and old regime.",
          "If old regime, enter total deductions (80C + 80D + HRA + home-loan interest).",
          "Read total tax, monthly TDS and effective tax rate.",
        ]}
        whatItMeans={[
          "Under the new regime, income up to ₹12 lakh is tax-free (₹12.75 lakh for salaried) thanks to Sec 87A rebate.",
          "Surcharge applies above ₹50 lakh — 10% (₹50L+), 15% (₹1Cr+), 25% (₹2Cr+); old regime adds 37% above ₹5Cr.",
          "Effective rate is always lower than your slab rate because the first slabs are taxed at lower percentages.",
        ]}
        tips={[
          "If your deductions are less than ₹4.25 lakh, the new regime almost always wins.",
          "Maximise employer NPS — Sec 80CCD(2) deduction (up to 14% of basic) is allowed in the new regime too.",
          "Pay advance tax in 4 instalments (15 Jun, 15 Sep, 15 Dec, 15 Mar) if total tax exceeds ₹10,000 to avoid interest u/s 234B/234C.",
        ]}
      />

      <RelatedTools currentPath="/income-tax-calculator" />
      <RelatedArticles cluster="tax" />
    </div>
  );
};

export default IncomeTaxCalculator;
