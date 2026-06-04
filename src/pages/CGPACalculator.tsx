import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { Plus, Trash2, Lightbulb, CheckCircle2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import RelatedCategory from "@/components/RelatedCategory";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import { aboutContent } from "@/lib/aboutContent";

interface Subject { id: number; name: string; credits: number; grade: string; }
const gradePoints: Record<string, number> = { "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "D": 4, "F": 0 };
const gradeColors: Record<string, string> = { "O": "#22C55E", "A+": "#16A34A", "A": "#4F46E5", "B+": "#3B82F6", "B": "#F59E0B", "C": "#F97316", "D": "#EF4444", "F": "#DC2626" };
const grades = Object.keys(gradePoints);
let nextId = 1;

const faq = [
  { q: "What is CGPA?", a: "CGPA (Cumulative Grade Point Average) is a grading system used by Indian universities on a 10-point scale. It is the average of Grade Points obtained across all subjects, weighted by credits." },
  { q: "How to convert CGPA to percentage?", a: "Common formulas — CBSE: % = CGPA × 9.5; VTU: % = (CGPA − 0.75) × 10; GTU/Anna University: % = CGPA × 10 − 7.5; RTU: % = CGPA × 9.5. Always confirm your university's formula." },
  { q: "What is 7.5 CGPA in percentage?", a: "CBSE: 7.5 × 9.5 = 71.25%. VTU: (7.5 − 0.75) × 10 = 67.5%. GTU: 7.5 × 10 − 7.5 = 67.5%. The result varies with the formula." },
  { q: "What is 8.5 CGPA in percentage?", a: "CBSE: 8.5 × 9.5 = 80.75%. VTU: (8.5 − 0.75) × 10 = 77.5%. GTU: 8.5 × 10 − 7.5 = 77.5%." },
  { q: "Is 7 CGPA good for placements?", a: "Most companies have cutoffs — TCS/Infosys/Wipro: 6.0+; Accenture/Capgemini: 6.5+; Amazon/Microsoft/Google: no strict cutoff but prefer 7.5+. Many top firms weight DSA and interview skills more than CGPA." },
  { q: "How can I improve my CGPA?", a: "Focus on the current semester (recent grades carry more weight), study previous year papers, improve attendance to boost internals, form study groups for hard subjects and use supplementary exams if available." },
];

interface SeoOverride { title: string; description: string; path: string; h1: string; intro: string; faq: { q: string; a: string }[]; }
const CGPACalculator = ({ seo }: { seo?: SeoOverride } = {}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [prevCGPA, setPrevCGPA] = useState(0);
  const [prevCredits, setPrevCredits] = useState(0);

  const sgpa = useMemo(() => {
    const tc = subjects.reduce((s, sub) => s + sub.credits, 0);
    if (!tc) return 0;
    return subjects.reduce((s, sub) => s + sub.credits * (gradePoints[sub.grade] ?? 0), 0) / tc;
  }, [subjects]);

  const cgpa = useMemo(() => {
    const sc = subjects.reduce((s, sub) => s + sub.credits, 0);
    const total = prevCredits + sc;
    if (!total) return sgpa;
    return (prevCGPA * prevCredits + sgpa * sc) / total;
  }, [sgpa, prevCGPA, prevCredits, subjects]);

  const barData = useMemo(() => subjects.map(s => ({
    name: s.name || "Sub",
    gp: gradePoints[s.grade] ?? 0,
    grade: s.grade,
  })), [subjects]);

  const hasData = subjects.length > 0;
  const totalCredits = subjects.reduce((s, sub) => s + sub.credits, 0);
  const improved = prevCGPA > 0 && cgpa > prevCGPA;
  const declined = prevCGPA > 0 && cgpa < prevCGPA;

  const addSubject = () => setSubjects(p => [...p, { id: nextId++, name: "", credits: 3, grade: "A" }]);
  const removeSubject = (id: number) => setSubjects(p => p.filter(s => s.id !== id));
  const updateSubject = (id: number, field: keyof Subject, value: string | number) =>
    setSubjects(p => p.map(s => s.id === id ? { ...s, [field]: value } : s));

  const cgpaColor = cgpa >= 8.5 ? "text-safe" : cgpa >= 7 ? "text-primary" : cgpa >= 5 ? "text-warning" : "text-danger";
  const sgpaColor = sgpa >= 8.5 ? "text-safe" : sgpa >= 7 ? "text-primary" : sgpa >= 5 ? "text-warning" : "text-danger";

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead
        title={seo?.title ?? "CGPA Calculator – Free GPA & Grade Tool"}
        description={seo?.description ?? "Calculate CGPA and SGPA in seconds. Add subjects with credits, see grades on a live chart, and convert SGPA to CGPA — free, accurate, no sign-up."}
        path={seo?.path ?? "/cgpa-calculator"}
        faq={seo?.faq ?? faq}
        howTo={[
          { name: "Add each subject", text: "Tap 'Add subject' and enter the subject name, credits, and grade for every paper this semester." },
          { name: "Review the live chart", text: "Watch the grade-distribution chart update as you edit — spot weak subjects instantly." },
          { name: "Read your SGPA", text: "Your semester GPA appears at the top, recalculated on every change." },
          { name: "Convert SGPA to CGPA", text: "Use the SGPA→CGPA panel to combine semesters and project your final CGPA." },
        ]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: seo?.h1 ?? "CGPA Calculator", path: seo?.path ?? "/cgpa-calculator" }]}
      />

      {seo ? (
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{seo.h1}</h1>
          <p className="text-base text-muted-foreground leading-relaxed">{seo.intro}</p>
        </header>
      ) : (
        <div>
        <PageHeading title={"CGPA Calculator"} subtitle={"Add subjects to calculate GPA and CGPA instantly."} />
        </div>
      )}

      {/* Previous CGPA */}
      <div className="guide-card">
        <p className="text-[16px] sm:text-[17px] font-bold text-foreground mb-3">Previous Semester (Optional)</p>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1.5">
            <span className="text-[14px] font-semibold text-muted-foreground">Previous CGPA</span>
            <input type="number" step="0.1" value={prevCGPA || ""} onChange={e => setPrevCGPA(+e.target.value)} placeholder="0.0" className="compact-input text-[16px]" />
          </label>
          <label className="space-y-1.5">
            <span className="text-[14px] font-semibold text-muted-foreground">Previous Credits</span>
            <input type="number" value={prevCredits || ""} onChange={e => setPrevCredits(+e.target.value)} placeholder="0" className="compact-input text-[16px]" />
          </label>
        </div>
      </div>

      {/* Subjects */}
      <div className="guide-card space-y-3">
        <p className="text-[16px] sm:text-[17px] font-bold text-foreground">Current Semester Subjects</p>
        <div className="space-y-2.5">
          {subjects.map(sub => (
            <motion.div key={sub.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-secondary/50 rounded-xl p-3">
              <input value={sub.name} onChange={e => updateSubject(sub.id, "name", e.target.value)} placeholder="Subject" className="compact-input flex-1 min-w-0 text-[15px] font-medium" />
              <input type="number" value={sub.credits || ""} onChange={e => updateSubject(sub.id, "credits", +e.target.value)} placeholder="Cr" className="compact-input w-16 text-center text-[15px] font-bold" />
              <select value={sub.grade} onChange={e => updateSubject(sub.id, "grade", e.target.value)} className="compact-input w-20 text-[15px] font-bold">
                {grades.map(g => <option key={g}>{g}</option>)}
              </select>
              <button onClick={() => removeSubject(sub.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 size={16} className="text-destructive" /></button>
            </motion.div>
          ))}
          <button onClick={addSubject} className="flex items-center gap-2 text-[15px] text-primary font-semibold hover:opacity-80 transition-opacity">
            <Plus size={18} /> Add Subject
          </button>
        </div>
      </div>

      {hasData && totalCredits > 0 && (
        <>
          {/* SGPA & CGPA Results */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-primary/10 rounded-2xl p-5 sm:p-6 text-center border-2 border-primary/20">
              <p className={`text-[34px] sm:text-[42px] font-extrabold ${sgpaColor}`}>{sgpa.toFixed(2)}</p>
              <p className="text-[14px] sm:text-[15px] font-bold text-muted-foreground mt-1">SGPA</p>
            </motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-accent/10 rounded-2xl p-5 sm:p-6 text-center border-2 border-accent/20">
              <p className={`text-[34px] sm:text-[42px] font-extrabold ${cgpaColor}`}>{cgpa.toFixed(2)}</p>
              <p className="text-[14px] sm:text-[15px] font-bold text-muted-foreground mt-1">CGPA</p>
              {improved && <p className="text-[12px] font-bold text-safe mt-1 flex items-center justify-center gap-1"><TrendingUp size={12} /> Improved!</p>}
              {declined && <p className="text-[12px] font-bold text-danger mt-1">↓ Declined</p>}
            </motion.div>
          </div>
          <div className="flex justify-center"><CopyResultButton shareTitle="My CGPA" text={`SGPA: ${sgpa.toFixed(2)} | CGPA: ${cgpa.toFixed(2)} (~${(cgpa * 9.5).toFixed(1)}%) across ${totalCredits} credits`} /></div>

          {/* Percentage & Credits */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-[22px] sm:text-[26px] font-extrabold text-foreground">{(cgpa * 9.5).toFixed(1)}%</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Approx Percentage</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-[22px] sm:text-[26px] font-extrabold text-primary">{totalCredits}</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Total Credits</p>
            </div>
          </div>

          {/* What This Means */}
          <div className="guide-card">
            <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2">
              <Lightbulb size={18} className="text-warning" /> What This Means
            </p>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
              {cgpa >= 8.5 ? "🌟 Excellent performance! You're in the top tier. Keep it up!" :
               cgpa >= 7 ? "👍 Good performance. Focus on weaker subjects to push higher." :
               cgpa >= 5 ? "⚠️ Average. Identify weak subjects from the chart below and improve them." :
               "🚨 Below average. Consider revising your study plan and seek help."}
            </p>
          </div>

          {/* Subject Performance Chart */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="guide-card">
            <p className="text-[16px] sm:text-[17px] font-bold text-foreground mb-4">📊 Subject Performance</p>
            <ChartFrame height={Math.max(160, barData.length * 45)}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 12, fontWeight: 600 }} domain={[0, 10]} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fontWeight: 600 }} width={80} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 14, borderRadius: 12, fontWeight: 600 }} formatter={(v: number) => [`${v} GP`, "Grade"]} />
                <Bar dataKey="gp" radius={[0, 8, 8, 0]} barSize={24}>
                  {barData.map((d, i) => <Cell key={i} fill={gradeColors[d.grade] || "#4F46E5"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
          </motion.div>

          {/* What You Should Do */}
          <div className="guide-card">
            <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 size={18} className="text-safe" /> What You Should Do
            </p>
            <div className="space-y-2 mt-3">
              {barData.some(b => b.gp <= 5) && <p className="text-[15px] text-muted-foreground">🔴 Focus on subjects with grade C or below</p>}
              <p className="text-[15px] text-muted-foreground">📈 Aim for A+ in subjects you're close to improving</p>
              <p className="text-[15px] text-muted-foreground">📚 Consistent study is better than last-minute cramming</p>
              {cgpa < 8 && prevCGPA > 0 && (
                <p className="text-[15px] text-muted-foreground">🎯 To reach <b className="text-foreground">8.0 CGPA</b>, you need SGPA of <b className="text-foreground">{((8.0 * (prevCredits + totalCredits) - prevCGPA * prevCredits) / totalCredits).toFixed(2)}</b> this semester</p>
              )}
            </div>
          </div>

          <DownloadReport getData={() => ({
            title: "CGPA Report",
            rows: [
              ...subjects.map(s => ({ label: s.name || "Subject", value: `Grade: ${s.grade} | Credits: ${s.credits}` })),
              { label: "SGPA", value: sgpa.toFixed(2) },
              { label: "CGPA", value: cgpa.toFixed(2) },
              { label: "Percentage (approx)", value: `${(cgpa * 9.5).toFixed(1)}%` },
            ]
          })} />
        </>
      )}

      {!hasData && (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">🎓</p>
          <p className="text-[16px] font-semibold text-foreground">No subjects added yet</p>
          <p className="text-[14px] text-muted-foreground mt-1">Add your current semester subjects to calculate SGPA & CGPA</p>
        </div>
      )}

      <AboutCalculator {...aboutContent.cgpa} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/cgpa" />
      <RelatedArticles />
      <RelatedCategory cluster="cgpa" />
    </div>
  );
};

export default CGPACalculator;
