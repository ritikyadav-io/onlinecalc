import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import RelatedTools from "@/components/RelatedTools";
import RelatedCategory from "@/components/RelatedCategory";

const BunkTool = () => {
  const [attended, setAttended] = useState(0);
  const [total, setTotal] = useState(0);
  const [threshold, setThreshold] = useState(75);

  const result = useMemo(() => {
    if (total === 0) return null;
    const pct = (attended / total) * 100;
    const canSkip = Math.max(0, Math.floor(attended / (threshold / 100) - total));
    const afterSkip = total > 0 ? (attended / (total + 1)) * 100 : 0;
    return { pct, canSkip, afterSkip, safe: pct >= threshold };
  }, [attended, total, threshold]);

  return (
    <div className="page-container space-y-5 max-w-lg mx-auto animate-fade-up">
      <SEOHead title="Bunk Decision Tool - Should You Skip?" description="Calculate if you can safely skip class without falling below attendance threshold." path="/bunk-tool" />

      <div>
        <PageHeading title={"Bunk Tool"} subtitle={"Can you skip today without breaking your attendance?"} />
        </div>

      <div className="grid grid-cols-3 gap-2.5">
        <label className="space-y-1.5"><span className="label-text">Attended</span>
          <input type="number" value={attended || ""} onChange={e => setAttended(+e.target.value)} placeholder="0" className="compact-input w-full" /></label>
        <label className="space-y-1.5"><span className="label-text">Total</span>
          <input type="number" value={total || ""} onChange={e => setTotal(+e.target.value)} placeholder="0" className="compact-input w-full" /></label>
        <label className="space-y-1.5"><span className="label-text">Min %</span>
          <input type="number" value={threshold} onChange={e => setThreshold(+e.target.value)} className="compact-input w-full" /></label>
      </div>

      {result && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-5 text-center ${result.canSkip > 0 ? "bg-safe/10" : "bg-danger/10"}`}>
            <p className={`result-number ${result.canSkip > 0 ? "text-safe" : "text-danger"}`}>
              {result.canSkip > 0 ? `Yes! Skip ${result.canSkip}` : "No! Don't skip"}
            </p>
            <p className="result-label">Current: {result.pct.toFixed(1)}% | After skip: {result.afterSkip.toFixed(1)}%</p>
          </motion.div>

          <div className="guide-card">
            <p className="guide-title"><Lightbulb size={16} className="text-warning" /> What This Means</p>
            <p className="guide-text">
              {result.canSkip > 0
                ? `Your attendance is at ${result.pct.toFixed(1)}% — you can safely miss ${result.canSkip} class${result.canSkip > 1 ? "es" : ""} and still stay above ${threshold}%.`
                : `Your attendance is at ${result.pct.toFixed(1)}% — skipping will drop you below the ${threshold}% requirement.`}
            </p>
          </div>

          <div className="guide-card">
            <p className="guide-title"><CheckCircle2 size={16} className="text-safe" /> What You Should Do</p>
            <div className="space-y-1.5 mt-1.5">
              {result.canSkip > 0 ? (
                <>
                  <p className="guide-text">• You can skip, but don't make it a habit</p>
                  <p className="guide-text">• Keep a buffer of 2-3% above the minimum</p>
                </>
              ) : (
                <>
                  <p className="guide-text">• Attend class today — every day counts now</p>
                  <p className="guide-text">• Attend the next {Math.ceil((threshold / 100 * (total + 5)) - attended)} classes to build a buffer</p>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {!result && <div className="text-center py-8 text-[14px] text-muted-foreground">Enter attendance to check</div>}
      <RelatedTools currentPath="/bunk-tool" />
      <RelatedCategory cluster="attendance" />
    </div>
  );
};

export default BunkTool;
