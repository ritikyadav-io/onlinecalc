import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import ChartFrame from "@/components/ChartFrame";
import ChartTooltip from "@/components/ChartTooltip";
import InsightGrid, { Insight } from "@/components/InsightGrid";
import { aboutContent } from "@/lib/aboutContent";
import { calcRentVsBuy, outstandingBalance, calcEmi } from "@/lib/finance";
import { inr, inrCompact } from "@/lib/format";

const faq = [
  { q: "Is renting always cheaper than buying?", a: "No. Over long horizons (10+ years) and in slow-rent-growth areas, buying often wins because of equity build-up." },
  { q: "What costs does this calculator include?", a: "Buying: down payment, EMI paid during your horizon, 1%/yr maintenance, plus any outstanding loan balance. Renting: monthly rent with annual hike." },
  { q: "Why is loan tenure separate from time horizon?", a: "You may hold the property for 10 years but have taken a 20-year loan. We pay EMI for the horizon, then count the remaining outstanding balance as a cost against equity." },
  { q: "Should I count property appreciation?", a: "Yes — equity at sale (appreciated value minus outstanding loan) reduces effective ownership cost." },
];

const RentVsBuyCalculator = () => {
  const [propPrice, setPropPrice] = useState(0);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(20);
  const [horizon, setHorizon] = useState(10);
  const [rent, setRent] = useState(0);
  const [rentHike, setRentHike] = useState(7);
  const [appreciation, setAppreciation] = useState(5);

  const calc = useMemo(() => calcRentVsBuy({
    propertyPrice: propPrice,
    downPaymentPct: downPct,
    loanRatePct: rate,
    loanYears,
    horizonYears: horizon,
    monthlyRent: rent,
    rentHikePct: rentHike,
    appreciationPct: appreciation,
  }), [propPrice, downPct, rate, loanYears, horizon, rent, rentHike, appreciation]);

  // Year-by-year comparison curve for the chart
  const chartData = useMemo(() => {
    if (!calc) return [];
    const rows: { year: string; buy: number; rent: number }[] = [];
    let cumRent = 0;
    let yearRent = rent * 12;
    const emiInfo = calcEmi(calc.loanAmount, rate, loanYears);
    const maintenanceYearly = propPrice * 0.01;
    for (let y = 1; y <= horizon; y++) {
      cumRent += yearRent;
      yearRent *= 1 + rentHike / 100;

      const monthsPaidByY = Math.min((emiInfo?.months ?? 0), y * 12);
      const emiPaid = (emiInfo?.emi ?? 0) * monthsPaidByY;
      const outstandingY = outstandingBalance(calc.loanAmount, rate, loanYears, monthsPaidByY);
      const fvY = propPrice * Math.pow(1 + appreciation / 100, y);
      const equityY = Math.max(0, fvY - outstandingY);
      const outOfPocketY = calc.downPayment + emiPaid + maintenanceYearly * y;
      const netBuyY = outOfPocketY - equityY;

      rows.push({ year: `Y${y}`, buy: Math.round(netBuyY), rent: Math.round(cumRent) });
    }
    return rows;
  }, [calc, propPrice, rate, loanYears, horizon, rent, rentHike, appreciation]);

  const insights: Insight[] = calc ? [
    { key: "emi", label: "Monthly EMI", value: calc.emi, format: inr, tone: "neutral", hint: calc.loanAmount === 0 ? "You're paying cash — no EMI" : `Paid for ${calc.monthsPaid} months in your ${horizon}-yr horizon` },
    { key: "outstanding", label: "Loan outstanding at exit", value: calc.outstandingAtHorizon, format: inr, tone: calc.outstandingAtHorizon > 0 ? "warn" : "good", hint: calc.outstandingAtHorizon > 0 ? "Remaining principal you still owe at year " + horizon : "Loan fully paid off within your horizon" },
    { key: "equity", label: "Equity at exit", value: calc.equityAtHorizon, format: inr, tone: "good", hint: "Property value minus outstanding loan" },
    { key: "netbuy", label: "Net cost of buying", value: calc.netBuyCost, format: inr, tone: calc.netBuyCost < calc.totalRent ? "good" : "danger", hint: "Total spent minus equity gained" },
    { key: "rent", label: "Total rent paid", value: calc.totalRent, format: inr, tone: "neutral", hint: `Over ${horizon} years with ${rentHike}%/yr hike` },
    { key: "diff", label: calc.better === "BUY" ? "You save by buying" : calc.better === "RENT" ? "You save by renting" : "Roughly the same", value: Math.abs(calc.difference), format: inr, tone: calc.better === "EVEN" ? "neutral" : "good", hint: "Difference between net buy cost and total rent" },
  ] : [];

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Rent vs Buy Calculator – Best Housing Choice" description="Should you rent or buy a home? Compare full EMI, down payment, appreciation, rent hikes, and total cost over years — make a smarter housing decision." path="/rent-vs-buy-calculator" faq={faq} howTo={[
        { name: "Enter home price and down payment", text: "Type the property's purchase price and how much you can pay upfront." },
        { name: "Set loan rate and tenure", text: "Add your expected home-loan interest rate and tenure in years." },
        { name: "Add current monthly rent + hike %", text: "Enter the rent for an equivalent home today and an expected annual rent-hike rate." },
        { name: "Tune appreciation & horizon", text: "Set the property's expected appreciation rate and the number of years you'll stay." },
        { name: "Compare net cost", text: "Read the side-by-side chart and verdict — which option costs less over your horizon." },
      ]} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Rent vs Buy", path: "/rent-vs-buy-calculator" }]} />
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Rent vs Buy Calculator</h1>
        <p className="text-base text-muted-foreground">Compare the true cost over your time horizon — including outstanding loan, equity, and rent hikes.</p>
      </header>

      <section aria-labelledby="buy-inputs" className="bg-card rounded-2xl p-4 border border-border space-y-3">
        <h2 id="buy-inputs" className="text-sm font-bold text-foreground">If you BUY</h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2"><span className="text-xs text-muted-foreground">Property Price (₹)</span>
            <input type="number" min={0} value={propPrice || ""} onChange={e => setPropPrice(Math.max(0, +e.target.value))} placeholder="5000000" className="compact-input" aria-label="Property price in rupees" /></label>
          <label className="space-y-2"><span className="text-xs text-muted-foreground">Down Payment (%)</span>
            <input type="number" min={0} max={100} value={downPct} onChange={e => setDownPct(Math.min(100, Math.max(0, +e.target.value)))} className="compact-input" aria-label="Down payment percentage" /></label>
          <label className="space-y-2"><span className="text-xs text-muted-foreground">Loan Rate (% p.a.)</span>
            <input type="number" step="0.1" min={0} value={rate} onChange={e => setRate(Math.max(0, +e.target.value))} className="compact-input" aria-label="Annual loan interest rate" /></label>
          <label className="space-y-2"><span className="text-xs text-muted-foreground">Loan Tenure (yrs)</span>
            <input type="number" min={1} max={40} value={loanYears} onChange={e => setLoanYears(Math.max(1, +e.target.value))} className="compact-input" aria-label="Loan tenure in years" /></label>
          <label className="space-y-2 col-span-2"><span className="text-xs text-muted-foreground">Appreciation (%/yr)</span>
            <input type="number" step="0.1" min={0} value={appreciation} onChange={e => setAppreciation(Math.max(0, +e.target.value))} className="compact-input" aria-label="Annual property appreciation rate" /></label>
        </div>
      </section>

      <section aria-labelledby="rent-inputs" className="bg-card rounded-2xl p-4 border border-border space-y-3">
        <h2 id="rent-inputs" className="text-sm font-bold text-foreground">If you RENT</h2>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2"><span className="text-xs text-muted-foreground">Monthly Rent (₹)</span>
            <input type="number" min={0} value={rent || ""} onChange={e => setRent(Math.max(0, +e.target.value))} placeholder="20000" className="compact-input" aria-label="Monthly rent in rupees" /></label>
          <label className="space-y-2"><span className="text-xs text-muted-foreground">Annual Hike (%)</span>
            <input type="number" step="0.1" min={0} value={rentHike} onChange={e => setRentHike(Math.max(0, +e.target.value))} className="compact-input" aria-label="Annual rent hike percentage" /></label>
        </div>
      </section>

      <label className="space-y-2 block"><span className="text-sm text-muted-foreground">Time Horizon — how long you'll keep the home (years)</span>
        <input type="number" min={1} max={50} value={horizon} onChange={e => setHorizon(Math.max(1, +e.target.value))} className="compact-input" aria-label="Time horizon in years" /></label>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-primary">{calc.better === "EVEN" ? "It's a toss-up" : `${calc.better} is better`}</p>
            <p className="text-sm text-muted-foreground mt-1">over {horizon} years · saves you {inr(Math.abs(calc.difference))}</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="Rent vs Buy" text={`Over ${horizon} yrs ${calc.better} is better by ${inr(Math.abs(calc.difference))}. Net buy: ${inr(calc.netBuyCost)} | Total rent: ${inr(calc.totalRent)}`} /></div>
          </motion.div>

          <InsightGrid insights={insights} />

          <section aria-labelledby="chart-heading" className="bg-card rounded-2xl p-4 border border-border space-y-3">
            <h2 id="chart-heading" className="text-sm font-bold text-foreground">Year-by-year cost comparison</h2>
            <p className="text-xs text-muted-foreground">What you'd have spent net by each year — buying becomes cheaper once the curves cross.</p>
            <ChartFrame height={260}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="buyG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rentG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={inrCompact} tick={{ fontSize: 12 }} width={60} />
                  <Tooltip content={<ChartTooltip formatValue={inr} />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="buy" name="Net cost (buy)" stroke="hsl(var(--primary))" fill="url(#buyG)" strokeWidth={2} />
                  <Area type="monotone" dataKey="rent" name="Total rent paid" stroke="hsl(var(--destructive))" fill="url(#rentG)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartFrame>
          </section>

          <DownloadReport getData={() => ({
            title: "Rent vs Buy Report",
            rows: [
              { label: "Property Price", value: inr(propPrice) },
              { label: "Down Payment", value: inr(calc.downPayment) },
              { label: "Loan Amount", value: inr(calc.loanAmount) },
              { label: "EMI", value: inr(calc.emi) },
              { label: "EMI Paid (in horizon)", value: inr(calc.emiPaidTotal) },
              { label: "Outstanding at exit", value: inr(calc.outstandingAtHorizon) },
              { label: "Property FV", value: inr(calc.propertyFutureValue) },
              { label: "Equity at exit", value: inr(calc.equityAtHorizon) },
              { label: "Net Cost (Buy)", value: inr(calc.netBuyCost) },
              { label: "Total Rent", value: inr(calc.totalRent) },
              { label: "Better Option", value: calc.better },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter property and rent details to compare.</div>}
      <AboutCalculator {...aboutContent.rentbuy} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/rent-vs-buy-calculator" />
      <RelatedArticles cluster="loans" />
    </div>
  );
};

export default RentVsBuyCalculator;
