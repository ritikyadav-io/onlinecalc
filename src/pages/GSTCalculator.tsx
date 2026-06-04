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
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";

const gstRates = [5, 12, 18, 28];
const faq = [
  { q: "What is GST?", a: "GST (Goods and Services Tax) is India's unified indirect tax system that replaced VAT, Service Tax and Excise Duty. Implemented 1 July 2017, it has 4 main slabs: 5%, 12%, 18% and 28%." },
  { q: "How to calculate GST on a price?", a: "To ADD GST: GST = Price × GST% ÷ 100; Final = Price + GST. Example: ₹1,000 + 18% = ₹1,180. To REMOVE GST: Original = Final ÷ (1 + GST%/100). Example: ₹1,180 ÷ 1.18 = ₹1,000." },
  { q: "What items fall under 18% GST?", a: "AC restaurants, hair salons, mobile phones, computers, washing machines, most services (IT, financial, telecom) and most manufactured goods." },
  { q: "What items are exempt from GST?", a: "Fresh vegetables and fruits, milk, eggs, bread, salt, education services (schools), healthcare (hospitals), books and newspapers." },
  { q: "What is CGST and SGST?", a: "For intra-state sales: CGST goes to the Central Government and SGST goes to the State Government — each is half the total GST rate. Example: 18% GST = 9% CGST + 9% SGST." },
  { q: "What is IGST?", a: "IGST (Integrated GST) applies when goods or services move between two different states. The full GST rate is charged as IGST instead of being split into CGST + SGST." },
  { q: "What items have 28% GST?", a: "Luxury cars, tobacco, pan masala, aerated drinks, cement, dishwashers, ACs, washing machines above 10 kg and casino/gambling services." },
  { q: "What is HSN code in GST?", a: "HSN (Harmonised System of Nomenclature) is a 6–8 digit code that classifies goods for GST purposes. Each product's HSN code determines which GST slab applies." },
];

const howTo = [
  { name: "Enter the amount", text: "Type the base price (exclusive) or full bill total (inclusive)." },
  { name: "Pick the GST slab", text: "Choose 5%, 12%, 18% or 28% based on the product or service." },
  { name: "Toggle Exclusive / Inclusive", text: "Exclusive adds GST on top. Inclusive extracts GST from the total." },
  { name: "Read CGST + SGST split", text: "Intra-state bills split GST equally — useful for invoice generation." },
];

const GSTCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);

  const calc = useMemo(() => {
    if (amount <= 0) return { gst: 0, base: 0, total: 0, cgst: 0, sgst: 0 };
    if (isInclusive) {
      const base = amount / (1 + rate / 100);
      const gst = amount - base;
      return { gst, base, total: amount, cgst: gst / 2, sgst: gst / 2 };
    }
    const gst = (amount * rate) / 100;
    return { gst, base: amount, total: amount + gst, cgst: gst / 2, sgst: gst / 2 };
  }, [amount, rate, isInclusive]);

  const hasData = amount > 0;
  const pieData = hasData ? [
    { name: "Base", value: Math.round(calc.base) },
    { name: "CGST", value: Math.round(calc.cgst) },
    { name: "SGST", value: Math.round(calc.sgst) },
  ] : [];
  const colors = ["#4F46E5", "#22C55E", "#F59E0B"];

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="GST Calculator – Add or Remove GST Instantly" description="Calculate GST in seconds: add GST, remove GST, and get CGST + SGST breakdown for any amount and slab. Free online GST calculator for India 2025." path="/gst-calculator" faq={faq} howTo={howTo} image="/og/gst.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "GST Calculator", path: "/gst-calculator" }]} />
      <div>
        <PageHeading title={"GST Calculator"} subtitle={"Add or remove GST instantly using official Indian rates."} />
        <p className="text-base text-muted-foreground mt-1">Enter amount and rate</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Amount (₹)</span>
          <input type="number" value={amount || ""} onChange={e => setAmount(+e.target.value)} placeholder="0" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">GST Rate (%)</span>
          <select value={rate} onChange={e => setRate(+e.target.value)} className="compact-input">
            {gstRates.map(r => <option key={r} value={r}>{r}%</option>)}
          </select></label>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setIsInclusive(false)} className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all ${!isInclusive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Exclusive</button>
        <button onClick={() => setIsInclusive(true)} className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all ${isInclusive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Inclusive</button>
      </div>

      {hasData && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{calc.total.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Amount</p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton text={`Base: ₹${calc.base.toFixed(2)} • GST ${rate}%: ₹${calc.gst.toFixed(2)} • Total: ₹${calc.total.toFixed(2)}`} shareTitle="GST" />
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-lg font-bold text-foreground">₹{calc.base.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground mt-1">Base Price</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-lg font-bold text-safe">₹{calc.cgst.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground mt-1">CGST ({rate / 2}%)</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-lg font-bold text-warning">₹{calc.sgst.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground mt-1">SGST ({rate / 2}%)</p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 border border-border">
            <h2 className="text-sm text-muted-foreground font-medium mb-3">Tax Breakdown</h2>
            <ChartFrame height={200}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={65} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
              </Pie><Tooltip content={<ChartTooltip formatValue={(v) => `₹${v.toFixed(2)}`} />} /><Legend wrapperStyle={{ fontSize: 12 }} /></PieChart>
            </ResponsiveContainer>
          </ChartFrame>
          <p className="text-[12px] text-muted-foreground mt-2 text-center">What this means: base price is what the seller keeps; CGST + SGST go to the government.</p>
          </motion.div>

          <InsightGrid
            title="Live insights"
            insights={[
              { key: "tax", label: "Tax %", value: rate, format: (v) => `${v}%`, tone: rate >= 18 ? "warn" : "neutral", hint: isInclusive ? "Extracted from total" : "Added on top" },
              { key: "gst", label: "Total GST", value: calc.gst, format: (v) => `₹${v.toFixed(0)}`, tone: "warn", hint: `${rate / 2}% CGST + ${rate / 2}% SGST` },
              { key: "share", label: "GST share of total", value: (calc.gst / Math.max(calc.total, 1)) * 100, format: (v) => `${v.toFixed(1)}%`, tone: "neutral", hint: "How much of the bill is tax" },
            ]}
          />

          <span className="insight-pill block">💡 GST Amount: ₹{calc.gst.toFixed(2)} ({rate}% on ₹{calc.base.toFixed(2)})</span>

          <DownloadReport getData={() => ({
            title: "GST Calculation Report",
            rows: [
              { label: "Amount Entered", value: `₹${amount}` },
              { label: "GST Rate", value: `${rate}%` },
              { label: "Type", value: isInclusive ? "Inclusive" : "Exclusive" },
              { label: "Base Price", value: `₹${calc.base.toFixed(2)}` },
              { label: "CGST", value: `₹${calc.cgst.toFixed(2)}` },
              { label: "SGST", value: `₹${calc.sgst.toFixed(2)}` },
              { label: "Total GST", value: `₹${calc.gst.toFixed(2)}` },
              { label: "Total Amount", value: `₹${calc.total.toFixed(2)}` },
            ]
          })} />
        </>
      )}

      {!hasData && <div className="text-center py-12 text-base text-muted-foreground">Enter an amount to calculate GST</div>}
      <FAQSection items={faq} />
      <AboutCalculator
        intro="Quickly add or remove GST on any amount and see the CGST/SGST split. Use it for invoices, MRP planning, refunds, or to verify GST on a bill before paying."
        formula={{
          label: "GST",
          expression: "GST Amount = (Base × Rate) / 100   •   Total = Base + GST",
          explanation: "For inclusive prices: Base = Total / (1 + Rate/100)."
        }}
        howToUse={[
          "Enter the amount.",
          "Pick the GST slab (5%, 12%, 18%, 28%).",
          "Toggle Exclusive (add GST) or Inclusive (remove GST).",
          "See the base, CGST, SGST, and total.",
        ]}
        whatItMeans={[
          "Exclusive: the amount you entered is the base price; GST is added on top.",
          "Inclusive: the amount already includes GST; the calculator backs out the base.",
          "Intra-state sales split GST equally into CGST and SGST.",
        ]}
        tips={[
          "Use Inclusive mode when reading a bill total to find what tax you actually paid.",
          "Inter-state sales use IGST (full rate), not split into CGST/SGST.",
          "Most services in India use the 18% slab — start there if unsure.",
        ]}
        alsoAsk={[
          { q: "Is GST refundable?", a: "GST input credits are claimable by registered businesses against their output GST liability." },
          { q: "What's the difference between CGST and IGST?", a: "CGST + SGST applies within a state. IGST applies across states and replaces both." },
          { q: "Are all goods taxed at the same GST rate?", a: "No. India has 0%, 5%, 12%, 18%, and 28% slabs. Some items (petrol, alcohol) sit outside GST." },
        ]}
      />
      <RelatedTools currentPath="/gst-calculator" />
      <RelatedArticles cluster="tax" />
    </div>
  );
};

export default GSTCalculator;
