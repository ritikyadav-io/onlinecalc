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
  { q: "How is discount calculated?", a: "Discount Amount = Original Price × (Discount % ÷ 100). Final Price = Original Price − Discount Amount. For example, 20% off ₹2,500 = ₹500 discount → ₹2,000 final price." },
  { q: "How do I calculate the original price from a sale price?", a: "Original Price = Sale Price ÷ (1 − Discount% / 100). E.g. an item on sale for ₹800 at 20% off was originally ₹800 ÷ 0.8 = ₹1,000." },
  { q: "How do stacked discounts (10% + 10%) work?", a: "Stacked discounts are NOT 20%. ₹1,000 with 10% off = ₹900; another 10% off = ₹810 — an effective discount of 19%, not 20%." },
  { q: "Does this calculator include GST?", a: "Yes — toggle the GST option to add 5%, 12%, 18% or 28% on top of the discounted price to see what you actually pay at checkout." },
  { q: "How much do I save?", a: "Savings = Original Price − Final Price. The calculator shows this both in rupees and as a percentage." },
  { q: "What is a 'flat ₹X off' coupon vs '%' off?", a: "Flat amount removes a fixed rupee value regardless of price; % off scales with price. On expensive items, % usually wins; on cheap items, flat amounts often win." },
];

const howTo = [
  { name: "Enter the original price", text: "Type the MRP or label price of the product." },
  { name: "Enter the discount %", text: "Use the slider or quick buttons (10%, 25%, 50%, 70%)." },
  { name: "Add GST if needed", text: "Toggle GST and pick a rate to see the actual checkout price." },
  { name: "Read your savings", text: "See discount amount, final price and total savings instantly." },
];

const GST_OPTIONS = [0, 5, 12, 18, 28];

const DiscountCalculator = () => {
  const [price, setPrice] = useState(2500);
  const [discount, setDiscount] = useState(20);
  const [gst, setGst] = useState(0);

  const calc = useMemo(() => {
    if (!price || price <= 0) return null;
    const discountAmt = price * (discount / 100);
    const afterDiscount = price - discountAmt;
    const gstAmt = afterDiscount * (gst / 100);
    const finalPrice = afterDiscount + gstAmt;
    const savings = price - afterDiscount;
    return { discountAmt, afterDiscount, gstAmt, finalPrice, savings };
  }, [price, discount, gst]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead
        title="Discount Calculator — Sale Price, Savings & GST in One Tap"
        description="Free Discount Calculator: enter the price and % off to see final price, total savings, and GST-inclusive checkout amount. Perfect for shopping sales."
        path="/discount-calculator"
        faq={faq}
        howTo={howTo}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Discount Calculator", path: "/discount-calculator" },
        ]}
      />
      <PageHeading
        title="Discount Calculator"
        subtitle="Calculate sale price, savings and GST in one tap."
      />

      <h2 className="sr-only">Enter price and discount</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">Original Price (₹)</span>
          <input
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(+e.target.value)}
            placeholder="2500"
            className="compact-input"
            aria-label="Original price"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-muted-foreground">Discount (%)</span>
          <input
            type="number"
            value={discount || ""}
            onChange={(e) => setDiscount(Math.min(100, Math.max(0, +e.target.value)))}
            placeholder="20"
            className="compact-input"
            aria-label="Discount percent"
          />
        </label>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={90}
          value={discount}
          onChange={(e) => setDiscount(+e.target.value)}
          className="w-full"
          aria-label="Discount slider"
        />
        <div className="flex gap-2 mt-2">
          {[10, 25, 40, 50, 70].map((p) => (
            <button
              key={p}
              onClick={() => setDiscount(p)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                discount === p ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm text-muted-foreground mb-2 block">Add GST (optional)</span>
        <div className="flex gap-2 flex-wrap">
          {GST_OPTIONS.map((g) => (
            <button
              key={g}
              onClick={() => setGst(g)}
              className={`flex-1 min-w-[60px] py-2 rounded-xl text-xs font-semibold transition-colors ${
                gst === g ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {g === 0 ? "No GST" : `${g}%`}
            </button>
          ))}
        </div>
      </div>

      {calc && (
        <>
          <h2 className="sr-only">Your discount breakdown</h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary/10 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-primary">
              ₹<AnimatedNumber value={calc.finalPrice} />
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Final Price {gst > 0 ? `(incl. ${gst}% GST)` : ""}
            </p>
            <p className="text-xs text-safe mt-1 font-semibold">
              You save ₹{calc.savings.toFixed(2)} ({discount}% off)
            </p>
            <div className="mt-3 flex justify-center">
              <CopyResultButton
                text={`₹${price} − ${discount}% = ₹${calc.afterDiscount.toFixed(2)}${gst ? ` + ${gst}% GST = ₹${calc.finalPrice.toFixed(2)}` : ""}`}
                shareTitle="Discount calc"
              />
            </div>
          </motion.div>

          <InsightGrid
            title="Breakdown"
            insights={[
              { key: "save", label: "You save", value: calc.savings, format: (v) => `₹${v.toFixed(2)}`, tone: "good", hint: `${discount}% off original` },
              { key: "after", label: "After discount", value: calc.afterDiscount, format: (v) => `₹${v.toFixed(2)}`, tone: "neutral", hint: "Pre-GST sale price" },
              { key: "gst", label: "GST amount", value: calc.gstAmt, format: (v) => `₹${v.toFixed(2)}`, tone: gst > 0 ? "warn" : "neutral", hint: gst > 0 ? `${gst}% on sale price` : "GST disabled" },
            ]}
          />
        </>
      )}

      {!calc && (
        <div className="text-center py-12 text-base text-muted-foreground">
          Enter the original price to calculate the discount
        </div>
      )}

      <FAQSection items={faq} />

      <AboutCalculator
        intro="The Discount Calculator helps you decode every sale — flat discounts, stacked offers, end-of-season sales — by showing the exact final price, GST impact, and rupee savings before you tap 'Buy'."
        formula={{
          label: "Discount Formula",
          expression: "Final = (Price × (1 − Discount%)) × (1 + GST%)",
          explanation: "Discount is taken off the MRP first, then GST is applied on the discounted price (as per Indian invoicing).",
        }}
        howToUse={[
          "Enter the MRP / original price.",
          "Pick a discount % from the slider or quick buttons.",
          "Toggle GST and pick a rate if applicable.",
          "Tap copy to share the final price with friends or your spreadsheet.",
        ]}
        whatItMeans={[
          "GST is charged on the post-discount price in India — never on the original MRP.",
          "Stacked offers (10% + 10%) effectively give 19% off, not 20%.",
          "A flat ₹500 off beats 20% off only when the price is below ₹2,500.",
        ]}
        tips={[
          "Always check the unit price during BOGO offers — bigger packs aren't always cheaper.",
          "Use the GST Calculator if the price you see is GST-inclusive and you need the base.",
          "Bookmark the Percentage Calculator for non-shopping percent math.",
        ]}
      />

      <RelatedTools currentPath="/discount-calculator" />
      <RelatedArticles cluster="salary" />
    </div>
  );
};

export default DiscountCalculator;
