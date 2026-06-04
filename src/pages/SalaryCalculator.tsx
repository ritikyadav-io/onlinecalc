import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import CopyResultButton from "@/components/CopyResultButton";
import AboutCalculator from "@/components/AboutCalculator";
import InsightGrid from "@/components/InsightGrid";

const faq = [
  { q: "What is CTC?", a: "CTC (Cost to Company) is the total yearly cost an employer bears for an employee: basic + HRA + allowances + employer PF + gratuity + bonus + insurance + perks. CTC is always greater than in-hand salary." },
  { q: "What is the in-hand salary for ₹4 LPA?", a: "Approx ₹4 LPA CTC → monthly CTC ₹33,333. PF (12% of basic) ≈ ₹1,800, professional tax ≈ ₹200, income tax ≈ ₹0–₹500. In-hand ≈ ₹30,000–₹32,000/month." },
  { q: "What is the in-hand salary for ₹6 LPA?", a: "₹6 LPA CTC → monthly CTC ₹50,000. PF ≈ ₹1,800, PT ≈ ₹200, income tax ≈ ₹500–₹1,500. In-hand ≈ ₹43,000–₹47,000/month." },
  { q: "What is the in-hand salary for ₹10 LPA?", a: "₹10 LPA CTC → monthly CTC ₹83,333. PF ≈ ₹1,800, PT ≈ ₹200, income tax (new regime) ≈ ₹4,000–₹6,000. In-hand ≈ ₹70,000–₹75,000/month." },
  { q: "What is the in-hand salary for ₹15 LPA?", a: "₹15 LPA CTC → in-hand ≈ ₹1,00,000–₹1,10,000/month depending on tax regime, HRA and allowance structure." },
  { q: "What percentage of CTC is in-hand salary?", a: "In India, in-hand is typically 70%–85% of annual CTC depending on tax slab, PF applicability, company structure, bonus frequency and allowance design." },
  { q: "Is PF deduction mandatory?", a: "PF is mandatory for employees with basic salary below ₹15,000/month; optional above that. Employee contributes 12% of basic and the employer matches 12%." },
  { q: "Why is in-hand much less than CTC?", a: "CTC includes employer-side costs (employer PF, gratuity, insurance, bonus) that never hit your bank account. In-hand = CTC − employer PF − gratuity − employee PF − professional tax − income tax." },
];

const howTo = [
  { name: "Enter your annual CTC", text: "Use the total cost to company from your offer letter." },
  { name: "Separate variable / bonus", text: "Splitting this out keeps PF and gratuity from being inflated." },
  { name: "Review the breakdown", text: "See PF, gratuity, professional tax and new-regime income tax line-by-line." },
  { name: "Read monthly take-home", text: "The highlighted number is what actually hits your bank account." },
];

// New regime FY 2024-25
const taxNewRegime = (income: number) => {
  const taxable = Math.max(0, income - 75000);
  if (taxable <= 300000) return 0;
  let tax = 0;
  const slabs: [number, number][] = [
    [300000, 0.05],
    [600000, 0.10],
    [900000, 0.15],
    [1200000, 0.20],
    [1500000, 0.30],
  ];
  let prev = 300000;
  let remaining = taxable - 300000;
  for (const [upto, rate] of slabs) {
    const span = upto - prev;
    const taxedHere = Math.min(remaining, span);
    if (taxedHere <= 0) break;
    tax += taxedHere * rate;
    remaining -= taxedHere;
    prev = upto;
  }
  if (remaining > 0) tax += remaining * 0.30;
  return tax + tax * 0.04; // + 4% cess
};

const SalaryCalculator = () => {
  const [ctc, setCtc] = useState(0);
  const [bonus, setBonus] = useState(0);

  const calc = useMemo(() => {
    if (ctc <= 0) return null;
    const fixed = ctc - bonus;
    const basic = fixed * 0.4;
    const employerPF = Math.min(basic * 0.12, 21600);
    const gratuity = basic * 0.0481;
    const grossSalary = fixed - employerPF - gratuity;
    const employeePF = Math.min(basic * 0.12, 21600);
    const proTax = 2500;
    const taxable = grossSalary + bonus - employeePF;
    const incomeTax = taxNewRegime(taxable);
    const inHandYearly = grossSalary + bonus - employeePF - proTax - incomeTax;
    return {
      basic, employerPF, gratuity, grossSalary, employeePF, proTax, incomeTax, inHandYearly,
      monthly: inHandYearly / 12,
    };
  }, [ctc, bonus]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Salary Calculator – In-hand Pay FY 2024-25" description="Convert CTC to monthly take-home pay instantly. Auto-applies PF, gratuity, professional tax, and new-regime income tax for accurate in-hand salary." path="/salary-calculator" faq={faq} howTo={howTo} image="/og/salary.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Salary Calculator", path: "/salary-calculator" }]} />
        <PageHeading title={"Salary In-hand Calculator"} subtitle={"Convert CTC to monthly in-hand pay across old & new tax regimes."} />
        <p className="text-base text-muted-foreground">Find out your real monthly take-home</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Annual CTC (₹)</span>
          <input type="number" value={ctc || ""} onChange={e => setCtc(+e.target.value)} placeholder="1200000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Variable / Bonus (₹/yr)</span>
          <input type="number" value={bonus || ""} onChange={e => setBonus(+e.target.value)} placeholder="100000" className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{Math.round(calc.monthly).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Monthly In-hand Salary</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-lg font-bold text-foreground">₹{Math.round(calc.inHandYearly).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Yearly Take-home</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-lg font-bold text-danger">₹{Math.round(calc.incomeTax).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Income Tax (yr)</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
            <p className="text-sm font-bold text-foreground mb-2">Yearly Breakdown</p>
            {[
              ["Basic + DA (40% of fixed)", calc.basic],
              ["Employer PF", calc.employerPF],
              ["Gratuity reserve", calc.gratuity],
              ["Employee PF", calc.employeePF],
              ["Professional Tax", calc.proTax],
              ["Income Tax (new regime)", calc.incomeTax],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground font-medium">₹{Math.round(v as number).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <InsightGrid
            title="Live insights"
            insights={[
              { key: "monthly", label: "Monthly take-home", value: calc.monthly, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "good", hint: "Hits your bank each month" },
              { key: "retain", label: "CTC retained", value: (calc.inHandYearly / ctc) * 100, format: (v) => `${v.toFixed(0)}%`, tone: (calc.inHandYearly / ctc) > 0.75 ? "good" : (calc.inHandYearly / ctc) > 0.6 ? "warn" : "danger", hint: "Share of CTC reaching you" },
              { key: "tax", label: "Income tax (yr)", value: calc.incomeTax, format: (v) => `₹${Math.round(v).toLocaleString()}`, tone: "warn", hint: "New regime + 4% cess" },
            ]}
          />
          <span className="insight-pill block">💡 Around {((calc.inHandYearly / ctc) * 100).toFixed(0)}% of your CTC reaches your bank</span>
          <CopyResultButton
            shareTitle="Salary in-hand result"
            text={`CTC ₹${ctc.toLocaleString()} → In-hand ₹${Math.round(calc.monthly).toLocaleString()}/month (₹${Math.round(calc.inHandYearly).toLocaleString()}/yr) — Income tax ₹${Math.round(calc.incomeTax).toLocaleString()}`}
          />
          <DownloadReport getData={() => ({
            title: "Salary Report",
            rows: [
              { label: "CTC", value: `₹${ctc.toLocaleString()}` },
              { label: "Bonus", value: `₹${bonus.toLocaleString()}` },
              { label: "Income Tax", value: `₹${Math.round(calc.incomeTax).toLocaleString()}` },
              { label: "Yearly Take-home", value: `₹${Math.round(calc.inHandYearly).toLocaleString()}` },
              { label: "Monthly In-hand", value: `₹${Math.round(calc.monthly).toLocaleString()}` },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter your annual CTC</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="Convert annual CTC into your real monthly take-home using the FY 2024-25 new tax regime. Automatically deducts PF (employer + employee), gratuity reserve, professional tax, and income tax with 4% cess."
        formula={{ label: "In-hand pay", expression: "In-hand = (CTC − Employer PF − Gratuity) + Bonus − Employee PF − Prof. Tax − Income Tax" }}
        howToUse={["Enter your total annual CTC (cost to company)", "Add variable / bonus separately so PF & gratuity aren't computed on it", "Read monthly in-hand from the highlighted card", "Compare offers by entering different CTC values"]}
        whatItMeans={["In-hand below 70% of CTC usually means high variable + insurance components", "Income tax above ₹1L/year means moving to ₹12L+ slab — verify with HR's actual breakdown", "Employer PF is your money but locked till retirement / job switch"]}
        tips={["Negotiate fixed pay, not CTC — variable is uncertain", "Higher Basic → higher PF (forced savings, less in-hand)", "Reimbursements (LTA, telephone, meal) reduce taxable income legally"]}
        alsoAsk={[
          { q: "Does this use old or new tax regime?", a: "New regime FY 2024-25 with ₹75,000 standard deduction. Old-regime users typically pay more if they don't claim 80C/HRA/home-loan deductions." },
          { q: "Is gratuity included in in-hand?", a: "No. Gratuity is paid only after 5 years of continuous service — it's deducted from your fixed pay but not received monthly." },
        ]}
      />
      <RelatedTools currentPath="/salary-calculator" />
      <RelatedArticles cluster="salary" />
    </div>
  );
};

export default SalaryCalculator;
