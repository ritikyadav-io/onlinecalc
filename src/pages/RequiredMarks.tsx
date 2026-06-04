import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, CheckCircle2, Target, TrendingUp, AlertTriangle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedCategory from "@/components/RelatedCategory";
import DownloadReport from "@/components/DownloadReport";

const faq = [
  { q: "How to calculate required marks?", a: "Required = Target marks - Marks already obtained. If required > remaining, it's not achievable." },
  { q: "What is a realistic target?", a: "Aim for 60-75% if struggling. If strong, aim for 80%+. Always check remaining marks availability." },
];

interface SeoOverride { title: string; description: string; path: string; h1: string; intro: string; faq: { q: string; a: string }[]; }
const RequiredMarks = ({ seo }: { seo?: SeoOverride } = {}) => {
  const [totalMarks, setTotalMarks] = useState(0);
  const [obtained, setObtained] = useState(0);
  const [targetPct, setTargetPct] = useState(75);
  const [simScore, setSimScore] = useState(0);

  const calc = useMemo(() => {
    if (totalMarks <= 0) return null;
    const remaining = Math.max(0, totalMarks - obtained);
    const targetMarks = Math.ceil((targetPct / 100) * totalMarks);
    const required = Math.max(0, targetMarks - obtained);
    const achievable = required <= remaining;
    const requiredPct = remaining > 0 ? (required / remaining) * 100 : 0;
    const currentPct = (obtained / totalMarks) * 100;
    const difficulty = !achievable ? "impossible" : requiredPct > 85 ? "hard" : requiredPct > 60 ? "moderate" : "easy";
    return { remaining, targetMarks, required, achievable, requiredPct, currentPct, difficulty };
  }, [totalMarks, obtained, targetPct]);

  const simCalc = useMemo(() => {
    if (!calc || totalMarks <= 0) return null;
    const newObtained = obtained + simScore;
    const newPct = (newObtained / totalMarks) * 100;
    const newRemaining = Math.max(0, totalMarks - newObtained);
    const newRequired = Math.max(0, calc.targetMarks - newObtained);
    return { newPct, newRemaining, newRequired, achieved: newPct >= targetPct };
  }, [calc, simScore, obtained, totalMarks, targetPct]);

  const hasData = calc !== null;

  const barData = hasData ? [
    { name: "Obtained", value: obtained, color: "#22C55E" },
    { name: "Required", value: calc.required, color: calc.difficulty === "easy" ? "#22C55E" : calc.difficulty === "moderate" ? "#F59E0B" : "#EF4444" },
    { name: "Remaining", value: Math.max(0, calc.remaining - calc.required), color: "#94A3B8" },
  ] : [];

  const diffColor = !hasData ? "" : calc.difficulty === "easy" ? "text-safe" : calc.difficulty === "moderate" ? "text-warning" : "text-danger";
  const diffBg = !hasData ? "" : calc.difficulty === "easy" ? "bg-safe/10 border-safe/30" : calc.difficulty === "moderate" ? "bg-warning/10 border-warning/30" : "bg-danger/10 border-danger/30";

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead
        title={seo?.title ?? "Required Marks Calculator – Pass or Top"}
        description={seo?.description ?? "Find out exactly how many marks you need in your final exam to pass, hit a target percentage, or reach top grade. Free, instant, accurate marks calculator."}
        path={seo?.path ?? "/required-marks-calculator"}
        faq={seo?.faq ?? faq}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: seo?.h1 ?? "Required Marks Calculator", path: seo?.path ?? "/required-marks-calculator" }]}
      />

      {seo ? (
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{seo.h1}</h1>
          <p className="text-base text-muted-foreground leading-relaxed">{seo.intro}</p>
        </header>
      ) : (
        <div>
        <PageHeading title={"Required Marks Calculator"} subtitle={"Find out exactly what you need to score in the next exam."} />
        </div>
      )}

      {/* Inputs */}
      <div className="guide-card space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2">
            <span className="text-[14px] font-semibold text-foreground">Total Marks</span>
            <input type="number" value={totalMarks || ""} onChange={e => setTotalMarks(+e.target.value)} placeholder="500" className="compact-input w-full" />
          </label>
          <label className="space-y-2">
            <span className="text-[14px] font-semibold text-foreground">Marks Obtained</span>
            <input type="number" value={obtained || ""} onChange={e => setObtained(+e.target.value)} placeholder="150" className="compact-input w-full" />
          </label>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-semibold text-foreground">Target Percentage</span>
            <span className="text-[20px] font-extrabold text-primary">{targetPct}%</span>
          </div>
          <Slider value={[targetPct]} onValueChange={v => setTargetPct(v[0])} min={30} max={100} step={1} />
        </div>
      </div>

      {hasData && calc && (
        <>
          {/* Big Result */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-6 text-center border-2 ${diffBg}`}>
            {calc.achievable ? (
              <>
                <p className={`text-[40px] sm:text-[48px] font-extrabold ${diffColor}`}>{calc.required}</p>
                <p className="text-[16px] font-bold text-foreground mt-1">
                  🎯 You need <span className={diffColor}>{calc.required}</span> out of <span className="text-muted-foreground">{calc.remaining}</span> remaining marks
                </p>
                <p className={`text-[14px] font-semibold mt-2 uppercase ${diffColor}`}>
                  {calc.difficulty === "easy" ? "✅ Easy Target" : calc.difficulty === "moderate" ? "⚠️ Moderate Challenge" : "🔴 Hard Target"}
                </p>
              </>
            ) : (
              <>
                <p className="text-[40px] font-extrabold text-danger">❌</p>
                <p className="text-[18px] font-bold text-danger mt-2">Target Not Achievable</p>
                <p className="text-[14px] text-muted-foreground mt-1">
                  You need {calc.required} marks but only {calc.remaining} remain
                </p>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-[22px] font-extrabold text-primary">{calc.currentPct.toFixed(1)}%</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Current</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-[22px] font-extrabold text-foreground">{targetPct}%</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Target</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className={`text-[22px] font-extrabold ${diffColor}`}>{calc.requiredPct.toFixed(0)}%</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Need from Rest</p>
            </div>
          </div>

          {/* Progress */}
          <div className="guide-card space-y-3">
            <p className="text-[16px] font-bold text-foreground">📊 Progress</p>
            <div className="space-y-2">
              <div className="flex justify-between text-[13px] font-semibold">
                <span className="text-muted-foreground">Current → Target</span>
                <span className="text-foreground">{calc.currentPct.toFixed(0)}% → {targetPct}%</span>
              </div>
              <Progress value={Math.min(100, (calc.currentPct / targetPct) * 100)} className="h-3" />
            </div>
          </div>

          {/* Visual Bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="guide-card">
            <p className="text-[16px] font-bold text-foreground mb-3">📈 Marks Breakdown</p>
            <ChartFrame height={120}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fontWeight: 600 }} width={80} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 14, borderRadius: 12, fontWeight: 600 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {barData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
          </motion.div>

          {/* What This Means */}
          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <Lightbulb size={18} className="text-warning" /> What This Means
            </p>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
              {!calc.achievable
                ? "Your target percentage is not achievable with the remaining marks. Consider lowering your target or focusing on maximizing what you can get."
                : calc.difficulty === "easy"
                ? `You're close to your target! You only need ${calc.requiredPct.toFixed(0)}% of remaining marks — very achievable with basic revision.`
                : calc.difficulty === "moderate"
                ? `You need a solid ${calc.requiredPct.toFixed(0)}% of remaining marks. This requires consistent effort and focused study.`
                : `This is tough — you need ${calc.requiredPct.toFixed(0)}% of remaining marks. You must score very high on everything left.`}
            </p>
          </div>

          {/* How to Reach Goal */}
          {calc.achievable && (
            <div className="guide-card">
              <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
                <TrendingUp size={18} className="text-safe" /> 🚀 How to Reach Your Goal
              </p>
              <div className="space-y-2 mt-3">
                {calc.difficulty === "easy" && (
                  <>
                    <p className="text-[15px] text-muted-foreground">📖 Revise important topics thoroughly</p>
                    <p className="text-[15px] text-muted-foreground">✅ Focus on accuracy over speed</p>
                    <p className="text-[15px] text-muted-foreground">📝 Practice previous year questions</p>
                  </>
                )}
                {calc.difficulty === "moderate" && (
                  <>
                    <p className="text-[15px] text-muted-foreground">📝 Practice previous papers daily</p>
                    <p className="text-[15px] text-muted-foreground">🎯 Improve weak areas first</p>
                    <p className="text-[15px] text-muted-foreground">⏰ Study at least 3-4 hours daily</p>
                    <p className="text-[15px] text-muted-foreground">🧠 Use active recall techniques</p>
                  </>
                )}
                {calc.difficulty === "hard" && (
                  <>
                    <p className="text-[15px] text-muted-foreground">🔥 Focus on high-weightage topics first</p>
                    <p className="text-[15px] text-muted-foreground">📅 Study daily without skipping</p>
                    <p className="text-[15px] text-muted-foreground">🚫 Eliminate all distractions</p>
                    <p className="text-[15px] text-muted-foreground">💪 Use Pomodoro: 25 min study, 5 min break</p>
                    <p className="text-[15px] text-muted-foreground">📊 Take mock tests to track progress</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Simulation Slider */}
          <div className="guide-card space-y-4">
            <p className="text-[16px] font-bold text-foreground">🔮 What If I Score...</p>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-semibold text-foreground">Score in next exam</span>
                <span className="text-[20px] font-extrabold text-primary">{simScore}</span>
              </div>
              <Slider value={[simScore]} onValueChange={v => setSimScore(v[0])} min={0} max={calc.remaining} step={1} />
            </div>
            {simCalc && simScore > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`rounded-xl p-4 text-center ${simCalc.achieved ? "bg-safe/10" : "bg-warning/10"}`}>
                <p className={`text-[28px] font-extrabold ${simCalc.achieved ? "text-safe" : "text-warning"}`}>
                  {simCalc.newPct.toFixed(1)}%
                </p>
                <p className="text-[14px] text-muted-foreground mt-1">
                  {simCalc.achieved ? "✅ Target Achieved!" : `Still need ${simCalc.newRequired} more marks`}
                </p>
              </motion.div>
            )}
          </div>

          <DownloadReport getData={() => ({
            title: "Required Marks Report",
            rows: [
              { label: "Total Marks", value: `${totalMarks}` },
              { label: "Obtained", value: `${obtained}` },
              { label: "Target", value: `${targetPct}%` },
              { label: "Required Marks", value: `${calc.required}` },
              { label: "Difficulty", value: calc.difficulty.toUpperCase() },
              { label: "Current %", value: `${calc.currentPct.toFixed(1)}%` },
            ]
          })} />
        </>
      )}

      {!hasData && (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">🎯</p>
          <p className="text-[16px] font-semibold text-foreground">Enter your marks data</p>
          <p className="text-[14px] text-muted-foreground mt-1">Set total marks and obtained to see what you need</p>
        </div>
      )}

      <FAQSection items={faq} />
      <RelatedTools currentPath="/required-marks" />
      <RelatedCategory cluster="exams" />
    </div>
  );
};

export default RequiredMarks;
