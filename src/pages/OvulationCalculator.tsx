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
  { q: "What is the fertile window?", a: "The 6 days ending on ovulation day. Sperm survives up to 5 days, the egg ~24 hours." },
  { q: "How accurate is this calculator?", a: "It's an estimate. For irregular cycles, also track basal body temperature or use ovulation strips." },
  { q: "When is the best day to conceive?", a: "1-2 days before ovulation gives the highest chance of pregnancy." },
];

const howTo = [
  { name: "Enter first day of last period", text: "Pick the start date of your most recent menstrual cycle." },
  { name: "Set cycle length", text: "Average is 28 days — adjust if you track yours and know it differs." },
  { name: "Read your fertile window", text: "The 6-day window ending on ovulation day is your highest-chance period." },
  { name: "Plan ahead", text: "Use next-period and due-date predictions to plan around the cycle." },
];

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

const OvulationCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  const calc = useMemo(() => {
    if (!lastPeriod) return null;
    const lp = new Date(lastPeriod);
    if (isNaN(lp.getTime())) return null;
    const ovulation = new Date(lp);
    ovulation.setDate(lp.getDate() + cycleLength - 14);
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 5);
    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 1);
    const nextPeriod = new Date(lp);
    nextPeriod.setDate(lp.getDate() + cycleLength);
    const dueDate = new Date(ovulation);
    dueDate.setDate(ovulation.getDate() + 266); // ~38 weeks from conception
    return { ovulation, fertileStart, fertileEnd, nextPeriod, dueDate };
  }, [lastPeriod, cycleLength]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Ovulation Calculator – Fertile Window Tracker" description="Predict ovulation day, fertile window, next period, and possible due date with this private, accurate ovulation calculator. Free — no sign-up required." path="/ovulation-calculator" faq={faq} howTo={howTo} image="/og/ovulation.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Ovulation Calculator", path: "/ovulation-calculator" }]} />
        <PageHeading title={"Ovulation Calculator"} subtitle={"Predict your fertile window and most likely ovulation day."} />
        <p className="text-base text-muted-foreground">Predict your fertile window in seconds</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">First Day of Last Period</span>
          <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Cycle Length (days)</span>
          <input type="number" min="20" max="45" value={cycleLength} onChange={e => setCycleLength(+e.target.value)} className="compact-input" /></label>
      </div>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-primary">{fmt(calc.ovulation)}</p>
            <p className="text-sm text-muted-foreground mt-1">Estimated Ovulation Day</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="My Fertile Window" text={`Ovulation: ${fmt(calc.ovulation)} | Fertile: ${fmt(calc.fertileStart)}–${fmt(calc.fertileEnd)} | Next period: ${fmt(calc.nextPeriod)}`} /></div>
          </motion.div>
          <div className="bg-card rounded-2xl p-4 border border-border text-center">
            <p className="text-lg font-bold text-foreground">{fmt(calc.fertileStart)} – {fmt(calc.fertileEnd)}</p>
            <p className="text-xs text-muted-foreground mt-1">Fertile Window (highest chance of conceiving)</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-base font-bold text-foreground">{fmt(calc.nextPeriod)}</p>
              <p className="text-xs text-muted-foreground mt-1">Next Period</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-base font-bold text-safe">{fmt(calc.dueDate)}</p>
              <p className="text-xs text-muted-foreground mt-1">If conceived: Due Date</p>
            </div>
          </div>
          <span className="insight-pill block">💡 Highest chance of conception is 1-2 days before ovulation</span>
          <DownloadReport getData={() => ({
            title: "Ovulation Report",
            rows: [
              { label: "Last Period", value: lastPeriod },
              { label: "Cycle Length", value: `${cycleLength} days` },
              { label: "Ovulation Day", value: fmt(calc.ovulation) },
              { label: "Fertile Window", value: `${fmt(calc.fertileStart)} – ${fmt(calc.fertileEnd)}` },
              { label: "Next Period", value: fmt(calc.nextPeriod) },
              { label: "Due Date (if conceived)", value: fmt(calc.dueDate) },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter the first day of your last period</div>}
      <AboutCalculator {...aboutContent.ovulation} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/ovulation-calculator" />
      <RelatedArticles cluster="health" />
    </div>
  );
};

export default OvulationCalculator;
