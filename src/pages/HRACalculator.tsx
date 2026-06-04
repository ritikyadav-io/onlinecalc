import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeading from "@/components/PageHeading";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import AnimatedNumber from "@/components/AnimatedNumber";
import InsightGrid from "@/components/InsightGrid";

const faq = [
  { q: "What is HRA exemption?", a: "House Rent Allowance (HRA) exemption under Sec 10(13A) is the tax-free portion of the HRA your employer pays you, provided you live in rented accommodation. The exempt amount is the minimum of three rules; the rest is taxed as salary." },
  { q: "What is the HRA exemption formula?", a: "HRA exemption = least of: (1) Actual HRA received, (2) 50% of basic salary (metro: Delhi/Mumbai/Kolkata/Chennai) or 40% (non-metro), (3) Rent paid − 10% of basic salary. Whichever is smallest is your tax-free amount." },
  { q: "Which cities count as metro for HRA?", a: "Only Delhi, Mumbai, Kolkata, and Chennai are 'metro' for HRA purposes. Bengaluru, Hyderabad, Pune, etc. are treated as non-metro — so HRA exemption is capped at 40% of basic instead of 50%." },
  { q: "Can I claim HRA without rent receipts?", a: "Up to ₹3,000/month rent (₹36,000/year), no proof is needed. Above that, you must submit rent receipts; above ₹1 lakh/year rent, also submit your landlord's PAN." },
  { q: "Can I claim HRA if I pay rent to my parents?", a: "Yes — rent paid to parents is allowed, but it must be genuine: have a rent agreement, transfer rent via bank, and your parents must declare it as rental income in their ITR." },
  { q: "Is HRA exemption available in the new tax regime?", a: "No. HRA exemption is only available under the old tax regime. If you opt for the new regime (default from FY 2023-24), you lose HRA, 80C, 80D and most other deductions." },
  { q: "What if my employer doesn't pay HRA?", a: "You can claim a rent deduction under Sec 80GG instead — up to ₹60,000/year, subject to conditions. But Sec 80GG is also disallowed under the new regime." },
];

const howTo = [
  { name: "Enter your basic salary", text: "Type your annual basic + DA component (not your total CTC)." },
  { name: "Enter HRA received", text: "Look at your salary slip — annual HRA component." },
  { name: "Enter annual rent paid", text: "Total rent you actually paid in the year." },
  { name: "Pick metro / non-metro", text: "Metro = Delhi, Mumbai, Kolkata, Chennai only. Everywhere else is non-metro." },
];

const HRACalculator = () => {
  const [basic, setBasic] = useState(600000);
  const [hra, setHra] = useState(300000);
  const [rent, setRent] = useState(240000);
  const [metro, setMetro] = useState(true);

  const calc = useMemo(() => {
    if (!basic || basic <= 0) return null;
    const r1 = hra;
    const r2 = basic * (metro ? 0.5 : 0.4);
    const r3 = Math.max(0, rent - basic * 0.1);
    const exempt = Math.max(0, Math.min(r1, r2, r3));
    const taxable = Math.max(0, hra - exempt);
    return { r1, r2, r3, exempt, taxable };
  }, [basic, hra, rent, metro]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead
        title="HRA Calculator — House Rent Allowance Exemption Calculator India"
        description="Free HRA Calculator India: compute House Rent Allowance exemption under Sec 10(13A) using the 3-rule formula. Metro / non-metro toggle. FY 2025-26 ready."
        path="/hra-calculator"
        faq={faq}
        howTo={howTo}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "HRA Calculator", path: "/hra-calculator" },
        ]}
      />
      <PageHeading
        title="HRA Calculator"
        subtitle="Find your tax-free House Rent Allowance under Sec 10(13A) in one tap."
      />

      <div className="flex gap-2 p-1 bg-secondary rounded-2xl">
        {[
          { v: true, label: "Metro (Delhi/Mum/Kol/Che)" },
          { v: false, label: "Non-Metro" },
        ].map((opt) => (
          <button
            key={String(opt.v)}
            onClick={() => setMetro(opt.v)}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              metro === opt.v ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <h2 className="sr-only">Enter salary and rent details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">Annual Basic + DA (₹)</span>
          <input
            type="number"
            value={basic || ""}
            onChange={(e) => setBasic(+e.target.value)}
            placeholder="600000"
            className="compact-input"
            aria-label="Annual basic salary"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">HRA Received Annually (₹)</span>
          <input
            type="number"
            value={hra || ""}
            onChange={(e) => setHra(+e.target.value)}
            placeholder="300000"
            className="compact-input"
            aria-label="Annual HRA received"
          />
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm text-muted-foreground">Annual Rent Paid (₹)</span>
          <input
            type="number"
            value={rent || ""}
            onChange={(e) => setRent(+e.target.value)}
            placeholder="240000"
            className="compact-input"
            aria-label="Annual rent paid"
          />
        </label>
      </div>

      {calc && (
        <>
          <h2 className="sr-only">Your HRA exemption</h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary/10 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-primary">
              ₹<AnimatedNumber value={calc.exempt} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">HRA Exempt (tax-free)</p>
            <p className="text-xs text-warning mt-1">
              Taxable HRA: ₹{Math.round(calc.taxable).toLocaleString()}
            </p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton
                text={`HRA exempt: ₹${Math.round(calc.exempt).toLocaleString()} of ₹${hra.toLocaleString()} (${metro ? "Metro" : "Non-Metro"})`}
                shareTitle="HRA exemption"
              />
            </div>
          </motion.div>

          <InsightGrid
            title="3-Rule Comparison (least is exempt)"
            insights={[
              { key: "r1", label: "Rule 1 — Actual HRA", value: calc.r1, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: calc.exempt === calc.r1 ? "good" : "neutral", hint: "HRA your employer pays" },
              { key: "r2", label: `Rule 2 — ${metro ? "50%" : "40%"} of basic`, value: calc.r2, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: calc.exempt === calc.r2 ? "good" : "neutral", hint: metro ? "Metro cap" : "Non-metro cap" },
              { key: "r3", label: "Rule 3 — Rent − 10% basic", value: calc.r3, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: calc.exempt === calc.r3 ? "good" : "neutral", hint: "Excess of rent over 10% of basic" },
            ]}
          />

          <span className="insight-pill block">
            💡 HRA exemption is only available under the OLD tax regime. New regime opt-in disables it.
          </span>
        </>
      )}

      {!calc && (
        <div className="text-center py-12 text-base text-muted-foreground">
          Enter your basic salary to calculate HRA exemption
        </div>
      )}

      <FAQSection items={faq} />

      <AboutCalculator
        intro="The HRA Calculator computes the tax-free portion of your House Rent Allowance under Section 10(13A) of the Income Tax Act. Enter basic salary, HRA, rent and your city type — we apply the 3-rule formula and show the least, which is your exempt amount."
        formula={{
          label: "HRA Exemption Formula",
          expression: "Exempt = MIN( HRA received, 50%/40% of basic, Rent − 10% of basic )",
          explanation: "The least of the three is tax-free; the rest of HRA is added to taxable salary. Metro cities use 50%; non-metros use 40%.",
        }}
        howToUse={[
          "Enter your annual basic + DA (not gross CTC).",
          "Enter HRA received from the salary slip.",
          "Enter total annual rent you actually paid.",
          "Toggle metro vs non-metro — only Delhi, Mumbai, Kolkata, Chennai are metros.",
        ]}
        whatItMeans={[
          "If your rent is less than 10% of basic, your HRA exemption is zero — Rule 3 dominates.",
          "Maxing out HRA exemption can save 30%+ tax for high earners in the old regime.",
          "Salaried taxpayers in the new regime cannot claim HRA; choose your regime in the Income Tax Calculator.",
        ]}
        tips={[
          "Submit rent receipts to your employer by January to lower TDS — don't wait for ITR-time refunds.",
          "If rent > ₹1 lakh/year, collect your landlord's PAN — mandatory disclosure.",
          "Pay rent via bank transfer, not cash, to keep an audit trail.",
        ]}
      />

      <RelatedTools currentPath="/hra-calculator" />
      <RelatedArticles cluster="tax" />
    </div>
  );
};

export default HRACalculator;
