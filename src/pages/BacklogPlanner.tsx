import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { motion } from "framer-motion";
import { Plus, Trash2, CalendarDays, Lightbulb, CheckCircle2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedCategory from "@/components/RelatedCategory";

const faq = [
  { q: "What is a backlog planner?", a: "Track pending subjects and get a day-wise study plan to clear backlogs before exams." },
  { q: "How to clear backlogs?", a: "Prioritize by difficulty, spend 2-3 focused hours daily on hard subjects first." },
];

interface Subject {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  currentMarks: number;
  targetMarks: number;
}

let sid = 1;
const diffMultiplier = { Easy: 1, Medium: 1.5, Hard: 2 };
const diffColors = { Easy: "#22C55E", Medium: "#F59E0B", Hard: "#EF4444" };

const BacklogPlanner = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [daysLeft, setDaysLeft] = useState(10);
  const [hoursPerDay, setHoursPerDay] = useState(4);

  const addSubject = () => setSubjects(p => [...p, { id: sid++, name: "", difficulty: "Medium", currentMarks: 0, targetMarks: 40 }]);
  const removeSubject = (id: number) => setSubjects(p => p.filter(s => s.id !== id));
  const updateSubject = (id: number, field: keyof Subject, val: string | number) =>
    setSubjects(p => p.map(s => s.id === id ? { ...s, [field]: val } : s));

  const plan = useMemo(() => {
    if (subjects.length === 0 || daysLeft <= 0 || hoursPerDay <= 0) return null;

    const effortData = subjects.map(s => {
      const gap = Math.max(0, s.targetMarks - s.currentMarks);
      const effort = gap * diffMultiplier[s.difficulty];
      return { ...s, gap, effort };
    });

    const totalEffort = effortData.reduce((s, e) => s + e.effort, 0);
    const totalHours = daysLeft * hoursPerDay;

    const allocated = effortData.map(s => ({
      ...s,
      hours: totalEffort > 0 ? Math.round((s.effort / totalEffort) * totalHours * 10) / 10 : 0,
    }));

    const schedule: { day: number; tasks: { name: string; hours: number }[] }[] = [];
    const remaining = allocated.map(s => ({ name: s.name || "Subject", hours: s.hours, difficulty: s.difficulty }));

    for (let d = 1; d <= daysLeft; d++) {
      const dayTasks: { name: string; hours: number }[] = [];
      let dayHoursLeft = hoursPerDay;
      const sorted = [...remaining].sort((a, b) => diffMultiplier[b.difficulty] - diffMultiplier[a.difficulty]);

      for (const sub of sorted) {
        if (dayHoursLeft <= 0 || sub.hours <= 0) continue;
        const alloc = Math.min(dayHoursLeft, sub.hours, Math.ceil(hoursPerDay / Math.max(subjects.length, 1) * 2));
        if (alloc > 0) {
          dayTasks.push({ name: sub.name, hours: Math.round(alloc * 10) / 10 });
          sub.hours -= alloc;
          dayHoursLeft -= alloc;
        }
      }
      if (dayTasks.length > 0) schedule.push({ day: d, tasks: dayTasks });
    }

    const feasible = totalHours >= totalEffort * 0.5;
    const status = totalHours >= totalEffort ? "comfortable" : feasible ? "tight" : "very-tight";

    return { allocated, schedule, totalHours, totalEffort, status, feasible };
  }, [subjects, daysLeft, hoursPerDay]);

  const chartData = plan?.allocated.map(s => ({
    name: s.name || "Sub",
    hours: s.hours,
    difficulty: s.difficulty,
  })) ?? [];

  const completionPct = plan ? Math.min(100, Math.round((plan.totalHours / Math.max(plan.totalEffort * 0.5, 1)) * 100)) : 0;
  const hasSubjects = subjects.length > 0 && subjects.some(s => s.name.trim());

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead title="Backlog Planner - Clear Pending Subjects" description="Smart backlog clearing plan with day-wise schedule based on difficulty and available time." path="/backlog" faq={faq} />

      <div>
        <PageHeading title={"Backlog Planner"} subtitle={"Create a smart plan to clear pending subjects."} />
        </div>

      {/* Step 1: Add Subjects */}
      <div className="guide-card space-y-4">
        <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-[13px] font-bold flex items-center justify-center">1</span>
          Add Your Backlog Subjects
        </p>

        <div className="space-y-2.5">
          {subjects.map(sub => (
            <motion.div key={sub.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-secondary/50 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input value={sub.name} onChange={e => updateSubject(sub.id, "name", e.target.value)} placeholder="Subject name" className="compact-input flex-1 min-w-0 text-[15px] font-medium" />
                <button onClick={() => removeSubject(sub.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 size={16} className="text-destructive" /></button>
              </div>
              <div className="flex items-center gap-2">
                <select value={sub.difficulty} onChange={e => updateSubject(sub.id, "difficulty", e.target.value)} className="compact-input flex-1">
                  <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
                <input type="number" value={sub.currentMarks || ""} onChange={e => updateSubject(sub.id, "currentMarks", +e.target.value)} placeholder="Current" className="compact-input w-20 text-center" />
                <input type="number" value={sub.targetMarks || ""} onChange={e => updateSubject(sub.id, "targetMarks", +e.target.value)} placeholder="Target" className="compact-input w-20 text-center" />
              </div>
            </motion.div>
          ))}
          <button onClick={addSubject} className="flex items-center gap-2 text-[15px] text-primary font-semibold hover:opacity-80 transition-opacity">
            <Plus size={18} /> Add Subject
          </button>
        </div>
      </div>

      {/* Step 2: Study Settings with Sliders */}
      <div className="guide-card space-y-4">
        <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-[13px] font-bold flex items-center justify-center">2</span>
          Study Settings
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] sm:text-[15px] font-semibold text-foreground">Days Left</span>
              <span className="text-[18px] sm:text-[20px] font-extrabold text-primary">{daysLeft}</span>
            </div>
            <Slider value={[daysLeft]} onValueChange={v => setDaysLeft(v[0])} min={1} max={60} step={1} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] sm:text-[15px] font-semibold text-foreground">Hours per Day</span>
              <span className="text-[18px] sm:text-[20px] font-extrabold text-accent">{hoursPerDay}</span>
            </div>
            <Slider value={[hoursPerDay]} onValueChange={v => setHoursPerDay(v[0])} min={1} max={12} step={1} />
          </div>
        </div>
      </div>

      {/* Results */}
      {hasSubjects && plan && (
        <>
          {/* Status Card */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-6 text-center ${plan.status === "comfortable" ? "bg-safe/10 border-2 border-safe/30" : plan.status === "tight" ? "bg-warning/10 border-2 border-warning/30" : "bg-danger/10 border-2 border-danger/30"}`}>
            <p className={`text-[32px] sm:text-[40px] font-extrabold ${plan.status === "comfortable" ? "text-safe" : plan.status === "tight" ? "text-warning" : "text-danger"}`}>
              {daysLeft}-Day Plan
            </p>
            <p className={`text-[16px] sm:text-[17px] font-bold mt-2 ${plan.status === "comfortable" ? "text-safe" : plan.status === "tight" ? "text-warning" : "text-danger"}`}>
              {plan.status === "comfortable" ? "✅ Comfortable — you have enough time" :
               plan.status === "tight" ? "⚠️ Tight but possible — stay consistent" :
               "🚨 Very tight — maximum focus needed"}
            </p>
            <p className="text-[14px] text-muted-foreground mt-2">
              Total available: <b>{plan.totalHours}h</b> across {daysLeft} days
            </p>
          </motion.div>

          {/* What This Means */}
          <div className="guide-card">
            <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2">
              <Lightbulb size={18} className="text-warning" /> What This Means
            </p>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
              You have <b className="text-foreground">{plan.totalHours} hours</b> total across {daysLeft} days.
              {plan.status === "comfortable"
                ? " That's plenty of time if you stay on track."
                : plan.status === "tight"
                ? " You need to study consistently every day without skipping."
                : " You'll need intense focus. Consider extending your study hours."}
            </p>
          </div>

          {/* What You Should Do */}
          <div className="guide-card">
            <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 size={18} className="text-safe" /> What You Should Do
            </p>
            <div className="space-y-2 mt-3">
              <p className="text-[15px] text-muted-foreground">📌 Study at least <b className="text-foreground">{hoursPerDay}h daily</b> — no skipping</p>
              <p className="text-[15px] text-muted-foreground">🔥 Focus on <b className="text-foreground">Hard subjects first</b> when energy is high</p>
              <p className="text-[15px] text-muted-foreground">✅ Review Easy subjects last — they need less time</p>
              {plan.status !== "comfortable" && <p className="text-[15px] text-muted-foreground">⏰ Consider increasing daily hours if possible</p>}
            </div>
          </div>

          {/* Time Allocation Chart */}
          {chartData.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="guide-card">
              <p className="text-[16px] sm:text-[17px] font-bold text-foreground mb-4">📊 Time Allocation</p>
              <ChartFrame height={Math.max(140, chartData.length * 45)}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12, fontWeight: 600 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fontWeight: 600 }} width={80} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 14, borderRadius: 12, fontWeight: 600 }} formatter={(v: number) => [`${v}h`, "Time"]} />
                  <Bar dataKey="hours" radius={[0, 8, 8, 0]} barSize={24}>
                    {chartData.map((d, i) => <Cell key={i} fill={diffColors[d.difficulty as keyof typeof diffColors]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
          </ChartFrame>
              <div className="flex gap-4 mt-3">
                {Object.entries(diffColors).map(([k, v]) => (
                  <span key={k} className="text-[13px] font-semibold text-muted-foreground flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: v }} />{k}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Completion Progress */}
          <div className="guide-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[15px] sm:text-[16px] font-bold text-foreground">Completion Feasibility</p>
              <span className={`text-[20px] font-extrabold ${completionPct >= 80 ? "text-safe" : completionPct >= 50 ? "text-warning" : "text-danger"}`}>
                {completionPct}%
              </span>
            </div>
            <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${completionPct}%` }} transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${completionPct >= 80 ? "bg-safe" : completionPct >= 50 ? "bg-warning" : "bg-danger"}`} />
            </div>
          </div>

          {/* Day-wise Schedule */}
          <div className="guide-card">
            <p className="text-[16px] sm:text-[17px] font-bold text-foreground flex items-center gap-2 mb-4">
              <CalendarDays size={18} className="text-primary" /> Daily Schedule
            </p>
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
              {plan.schedule.map((day) => (
                <motion.div key={day.day} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: day.day * 0.02 }}
                  className="bg-secondary/50 rounded-xl p-3.5">
                  <p className="text-[15px] font-bold text-foreground mb-2">📅 Day {day.day}</p>
                  <div className="space-y-1.5">
                    {day.tasks.map((t, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[14px] text-muted-foreground">{t.name}</span>
                        <span className="text-[14px] font-bold text-primary">{t.hours}h</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button onClick={() => setHoursPerDay(h => Math.min(h + 1, 12))} className="btn-primary flex-1 text-[15px]">
              ⏰ Add 1 More Hour/Day
            </button>
          </div>
        </>
      )}

      {!hasSubjects && (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">📚</p>
          <p className="text-[16px] font-semibold text-foreground">No subjects added yet</p>
          <p className="text-[14px] text-muted-foreground mt-1">Add your backlog subjects above to generate a study plan</p>
        </div>
      )}

      <FAQSection items={faq} />
      <RelatedTools currentPath="/backlog" />
      <RelatedCategory cluster="backlog" />
    </div>
  );
};

export default BacklogPlanner;
