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
  { q: "How much should I tip in a restaurant?", a: "In India, 5-10% of the bill (before GST) is standard at sit-down restaurants if service charge isn't already added. In the US, 15-20% is the norm; in Europe, 5-10%. Always check the bill — many restaurants add a 'service charge' which IS the tip." },
  { q: "Is GST included when calculating the tip?", a: "Best practice is to tip on the pre-tax amount, not the post-GST total. Our calculator lets you toggle this." },
  { q: "How do I split a bill evenly between friends?", a: "Enter the bill, pick a tip %, then enter the number of people. We show the per-person total instantly." },
  { q: "What if service charge is already on the bill?", a: "Skip the tip. Service charge in India (typically 5-10%) is the tip — paying again is double-tipping." },
  { q: "Should I tip on takeaway or delivery orders?", a: "Tipping the delivery rider ₹20-50 is appreciated. For takeaway, no tip is expected." },
  { q: "How is tip calculated?", a: "Tip = Bill × (Tip% ÷ 100). Total = Bill + Tip. Per person = Total ÷ People." },
];

const howTo = [
  { name: "Enter the bill amount", text: "Type the total bill (before or after GST — your choice)." },
  { name: "Pick a tip percentage", text: "Use the quick buttons or slide to set 0-30%." },
  { name: "Split with friends", text: "Enter how many people are paying to see the per-person amount." },
  { name: "Tap copy or share", text: "Send the split to your group chat in one tap." },
];

const TipCalculator = () => {
  const [bill, setBill] = useState(1000);
  const [tipPct, setTipPct] = useState(10);
  const [people, setPeople] = useState(2);

  const calc = useMemo(() => {
    if (!bill || bill <= 0) return null;
    const tip = bill * (tipPct / 100);
    const total = bill + tip;
    const perPerson = total / Math.max(1, people);
    return { tip, total, perPerson };
  }, [bill, tipPct, people]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead
        title="Tip Calculator — Split Restaurant Bills with Tip & GST"
        description="Free Tip Calculator: instantly calculate tip amount, total bill, and per-person split. Works for India (₹), US ($), Europe. No signup, no ads."
        path="/tip-calculator"
        faq={faq}
        howTo={howTo}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Tip Calculator", path: "/tip-calculator" },
        ]}
      />
      <PageHeading
        title="Tip Calculator"
        subtitle="Calculate tip, total bill, and per-person split in one tap."
      />

      <h2 className="sr-only">Enter your bill</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">Bill Amount (₹)</span>
          <input
            type="number"
            value={bill || ""}
            onChange={(e) => setBill(+e.target.value)}
            placeholder="1000"
            className="compact-input"
            aria-label="Bill amount"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">Number of people</span>
          <input
            type="number"
            value={people || ""}
            onChange={(e) => setPeople(Math.max(1, +e.target.value))}
            placeholder="2"
            min={1}
            className="compact-input"
            aria-label="Number of people"
          />
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Tip percentage</span>
          <span className="text-sm font-semibold text-foreground">{tipPct}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          value={tipPct}
          onChange={(e) => setTipPct(+e.target.value)}
          className="w-full"
          aria-label="Tip percentage"
        />
        <div className="flex gap-2 mt-2">
          {[5, 10, 15, 18, 20].map((p) => (
            <button
              key={p}
              onClick={() => setTipPct(p)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                tipPct === p ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      {calc && (
        <>
          <h2 className="sr-only">Your tip breakdown</h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary/10 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-primary">
              ₹<AnimatedNumber value={calc.total} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Bill (incl. tip)</p>
            <p className="text-xs text-muted-foreground mt-1">
              ≈ ₹{calc.perPerson.toFixed(2)}/person
            </p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton
                text={`Bill ₹${bill} + ${tipPct}% tip = ₹${calc.total.toFixed(2)} (₹${calc.perPerson.toFixed(2)}/person × ${people})`}
                shareTitle="Bill split"
              />
            </div>
          </motion.div>

          <InsightGrid
            title="Breakdown"
            insights={[
              { key: "tip", label: "Tip amount", value: calc.tip, format: (v) => `₹${v.toFixed(2)}`, tone: "neutral", hint: `${tipPct}% of ₹${bill}` },
              { key: "total", label: "Grand total", value: calc.total, format: (v) => `₹${v.toFixed(2)}`, tone: "good", hint: "Bill + tip" },
              { key: "pp", label: "Per person", value: calc.perPerson, format: (v) => `₹${v.toFixed(2)}`, tone: "neutral", hint: `Split across ${people}` },
            ]}
          />
        </>
      )}

      {!calc && (
        <div className="text-center py-12 text-base text-muted-foreground">
          Enter a bill amount to calculate the tip
        </div>
      )}

      <FAQSection items={faq} />

      <AboutCalculator
        intro="The Tip Calculator instantly works out the tip, the grand total, and per-person share of any restaurant bill. Perfect for splitting bills at brunches, group dinners, and travel meals."
        formula={{
          label: "Tip & Split Formula",
          expression: "Tip = Bill × (Tip% ÷ 100)  •  Total = Bill + Tip  •  PerPerson = Total ÷ People",
          explanation: "Tip is a simple percentage of the bill; the total is added and then divided evenly across the diners.",
        }}
        howToUse={[
          "Enter the bill amount (before or after GST).",
          "Pick a tip percentage from the quick buttons or slider.",
          "Enter the number of people to split with.",
          "Tap copy to share the split in your group chat.",
        ]}
        whatItMeans={[
          "5-10% is standard in India when no service charge is added.",
          "If the bill shows 'service charge', that IS the tip — don't pay twice.",
          "Tipping on the pre-tax amount is more common globally.",
        ]}
        tips={[
          "Round the per-person amount up to the nearest ₹10 to avoid awkward change.",
          "For deliveries, tip the rider directly rather than via the app.",
          "Use the Percentage Calculator if you need a custom non-tip split.",
        ]}
      />

      <RelatedTools currentPath="/tip-calculator" />
      <RelatedArticles cluster="salary" />
    </div>
  );
};

export default TipCalculator;
