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
import { aboutContent } from "@/lib/aboutContent";

const faq = [
  { q: "How is gratuity calculated in India?", a: "Gratuity = (Last drawn salary × 15 × Years of service) / 26, as per the Payment of Gratuity Act, 1972." },
  { q: "Who is eligible for gratuity?", a: "Employees who have completed 5 or more years of continuous service in an organisation with 10+ employees." },
  { q: "Is gratuity tax-free?", a: "Up to ₹20 lakh of gratuity is tax-exempt for non-government employees." },
  { q: "What counts as last drawn salary?", a: "Basic salary plus dearness allowance (DA) drawn in the last month of service." },
];

const GratuityCalculator = () => {
  const [salary, setSalary] = useState(0);
  const [years, setYears] = useState(0);

  const calc = useMemo(() => {
    if (salary <= 0 || years < 5) return null;
    const gratuity = (salary * 15 * years) / 26;
    const taxFree = Math.min(gratuity, 2000000);
    return { gratuity, taxFree };
  }, [salary, years]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Gratuity Calculator – End-of-Service Payout" description="Calculate your gratuity payout under the Payment of Gratuity Act 1972. See the full formula, taxable portion, and tax-free amount in seconds. Free." path="/gratuity-calculator" faq={faq} howTo={[
        { name: "Enter last drawn monthly salary", text: "Type your last basic + DA (not gross CTC). Gratuity uses only basic + dearness allowance." },
        { name: "Enter years of continuous service", text: "Add total completed years with the same employer. Anything ≥ 5 years qualifies." },
        { name: "Read the gratuity amount", text: "We apply the formula (15 × salary × years) / 26 instantly and show the payout." },
        { name: "Check tax-free vs taxable split", text: "See how much of your gratuity is exempt under section 10(10) and what portion is taxable." },
      ]} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Gratuity Calculator", path: "/gratuity-calculator" }]} />
        <PageHeading title={"Gratuity Calculator"} subtitle={"End-of-service gratuity payout as per Payment of Gratuity Act."} />
        <p className="text-base text-muted-foreground">Estimate your gratuity payout in seconds</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Last Drawn Salary (Basic + DA, ₹)</span>
          <input type="number" value={salary || ""} onChange={e => setSalary(+e.target.value)} placeholder="50000" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Years of Service</span>
          <input type="number" value={years || ""} onChange={e => setYears(+e.target.value)} placeholder="7" className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{Math.round(calc.gratuity).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Gratuity Payable</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="My Gratuity" text={`Gratuity: ₹${Math.round(calc.gratuity).toLocaleString()} | Tax-free: ₹${Math.round(calc.taxFree).toLocaleString()} | ${years} yrs @ ₹${salary.toLocaleString()}/mo`} /></div>
          </motion.div>
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <p className="text-xl font-bold text-safe">₹{Math.round(calc.taxFree).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Tax-free portion (max ₹20 L)</p>
          </div>
          <span className="insight-pill block">💡 Formula: (Salary × 15 × Years) / 26</span>
          <DownloadReport getData={() => ({
            title: "Gratuity Report",
            rows: [
              { label: "Last Drawn Salary", value: `₹${salary.toLocaleString()}` },
              { label: "Years of Service", value: `${years}` },
              { label: "Gratuity Payable", value: `₹${Math.round(calc.gratuity).toLocaleString()}` },
              { label: "Tax-Free Portion", value: `₹${Math.round(calc.taxFree).toLocaleString()}` },
            ]
          })} />
        </>
      )}
      {!calc && (
        <div className="text-center py-12 text-base text-muted-foreground">
          {years > 0 && years < 5 ? "Minimum 5 years of service required" : "Enter your details to calculate gratuity"}
        </div>
      )}
      <AboutCalculator {...aboutContent.gratuity} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/gratuity-calculator" />
      <RelatedArticles cluster="salary" />
    </div>
  );
};

export default GratuityCalculator;
