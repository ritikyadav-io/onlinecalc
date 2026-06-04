import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedCategory from "@/components/RelatedCategory";
import DownloadReport from "@/components/DownloadReport";

const faq = [
  { q: "How to analyze my marks?", a: "Enter each subject's marks and total. The tool highlights weak and strong subjects." },
  { q: "What percentage is considered good?", a: "Above 75% is excellent, 60-75% is average, below 60% needs improvement." },
];

const MarksAnalyzer = () => {
  const [subjects, setSubjects] = useState<{ name: string; marks: number; total: number }[]>([]);

  const update = (i: number, field: string, val: string | number) =>
    setSubjects(p => p.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const chartData = useMemo(() => subjects.map(s => ({
    name: s.name || `Sub ${subjects.indexOf(s) + 1}`,
    pct: s.total > 0 ? (s.marks / s.total) * 100 : 0,
  })), [subjects]);

  const hasData = subjects.length > 0 && subjects.some(s => s.total > 0);
  const avg = chartData.length > 0 ? chartData.reduce((s, d) => s + d.pct, 0) / chartData.length : 0;

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Marks Analyzer – Improve Your Exam Performance" description="Analyze your marks across subjects and get smart insights to improve weak areas and boost scores." path="/marks-analyzer" faq={faq} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Marks Analyzer", path: "/marks-analyzer" }]} />
      <div>
        <PageHeading title={"Marks Analyzer"} subtitle={"Visualise your exam performance subject by subject."} />
        <p className="text-base text-muted-foreground mt-1">Add subjects to analyze</p>
      </div>

      <div className="space-y-3">
        {subjects.map((s, i) => (
          <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border animate-scale-in">
            <input value={s.name} onChange={e => update(i, "name", e.target.value)} placeholder="Subject" className="compact-input flex-1 min-w-0" />
            <input type="number" value={s.marks || ""} onChange={e => update(i, "marks", +e.target.value)} placeholder="Got" className="compact-input w-16 text-center" />
            <span className="text-sm text-muted-foreground">/</span>
            <input type="number" value={s.total || ""} onChange={e => update(i, "total", +e.target.value)} placeholder="Total" className="compact-input w-16 text-center" />
          </div>
        ))}
        <button onClick={() => setSubjects(p => [...p, { name: "", marks: 0, total: 0 }])} className="text-base text-primary font-medium">+ Add Subject</button>
      </div>

      {hasData && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">{avg.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">Average</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="text-sm text-muted-foreground font-medium mb-3">Subject Comparison</h3>
            <ChartFrame height={200}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 13, borderRadius: 12 }} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                  {chartData.map((d, i) => <Cell key={i} fill={d.pct >= 75 ? "#22C55E" : d.pct >= 60 ? "#F59E0B" : "#EF4444"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {chartData.length > 0 && <span className="insight-pill">🔴 Weakest: <b>{chartData.reduce((a, b) => a.pct < b.pct ? a : b).name}</b></span>}
            {chartData.length > 0 && <span className="insight-pill">🟢 Strongest: <b>{chartData.reduce((a, b) => a.pct > b.pct ? a : b).name}</b></span>}
          </div>

          <DownloadReport getData={() => ({
            title: "Marks Analysis Report",
            rows: [
              ...subjects.map(s => ({ label: s.name || "Subject", value: `${s.marks}/${s.total} (${s.total > 0 ? ((s.marks/s.total)*100).toFixed(1) : 0}%)` })),
              { label: "Average", value: `${avg.toFixed(1)}%` },
              { label: "Strongest", value: chartData.reduce((a, b) => a.pct > b.pct ? a : b).name },
              { label: "Weakest", value: chartData.reduce((a, b) => a.pct < b.pct ? a : b).name },
            ]
          })} />
        </>
      )}

      {!hasData && subjects.length === 0 && <div className="text-center py-12 text-base text-muted-foreground">Add subjects to see analysis</div>}
      <FAQSection items={faq} />
      <RelatedTools currentPath="/marks-analyzer" />
      <RelatedCategory cluster="cgpa" />
    </div>
  );
};

export default MarksAnalyzer;
