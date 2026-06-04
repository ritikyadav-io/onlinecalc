import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { Slider } from "@/components/ui/slider";
import { Lightbulb, CheckCircle2, Flame, Calculator } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import RelatedCategory from "@/components/RelatedCategory";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import CopyResultButton from "@/components/CopyResultButton";
import { aboutContent } from "@/lib/aboutContent";

const faq = [
  { q: "What is the minimum attendance required in college?", a: "Most Indian colleges require at least 75% attendance per UGC guidelines; some require 80% or 85%. Falling below the minimum can result in detention (not allowed to sit exams) or being debarred." },
  { q: "How to calculate attendance percentage?", a: "Attendance % = (Classes Attended ÷ Total Classes Held) × 100. Example: 76 attended out of 100 = 76%." },
  { q: "How many classes can I miss with the 75% rule?", a: "Max bunks = Total Classes × 0.25. So in 100 classes you can miss 25; in 150 you can miss 37; in 200 you can miss 50." },
  { q: "Can I attend exams with 60% attendance?", a: "Depends on the university. Some allow exam appearance with a medical certificate; others enforce a strict 75% rule. Check with your administration — some colleges grant grace for medical/sports/NCC." },
  { q: "What should I do if my attendance is low?", a: "Options: (1) get a medical certificate for past absences, (2) speak to your class teacher/HOD for condonation, (3) attend makeup classes if offered, (4) check the detention cutoff, (5) apply for medical/sports/NCC exemption." },
  { q: "What happens if attendance drops below 75%?", a: "You may be marked 'detained' or 'debarred' from exams. Some colleges allow medical exemptions or condonation on case basis." },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface SeoOverride { title: string; description: string; path: string; h1: string; intro: string; faq: { q: string; a: string }[]; }
const AttendanceTracker = ({ seo }: { seo?: SeoOverride } = {}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear());
  const [attendance, setAttendance] = usePersistedState<Record<string, "present" | "absent">>("tml.attendance.v1", {});
  const [simDays, setSimDays] = useState(0);
  const [simAttend, setSimAttend] = useState(0);
  const [showCalc, setShowCalc] = useState(false);
  const [calcTotal, setCalcTotal] = usePersistedState<number>("tml.attendance.calcTotal", 0);
  const [calcAttended, setCalcAttended] = usePersistedState<number>("tml.attendance.calcAttended", 0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const toggleDay = (day: number) => {
    const key = `${currentYear}-${currentMonth}-${day}`;
    setAttendance(prev => {
      const current = prev[key];
      if (!current) return { ...prev, [key]: "present" };
      if (current === "present") return { ...prev, [key]: "absent" };
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  // Clamp calcAttended to calcTotal
  const safeCalcAttended = Math.min(calcAttended, calcTotal);

  const calc = useMemo(() => {
    const entries = Object.values(attendance);
    const total = entries.length;
    const attended = entries.filter(v => v === "present").length;
    const absent = entries.filter(v => v === "absent").length;
    const pct = total > 0 ? (attended / total) * 100 : 0;
    const status = total === 0 ? "none" : pct >= 75 ? "safe" : pct >= 60 ? "risk" : "danger";
    const neededFor75 = total > 0 ? Math.max(Math.ceil(0.75 * total - attended), 0) : 0;
    const canSkip = total > 0 ? Math.max(Math.floor(attended / 0.75 - total), 0) : 0;

    let streak = 0;
    for (let d = today.getDate(); d >= 1; d--) {
      const k = `${currentYear}-${currentMonth}-${d}`;
      if (attendance[k] === "present") streak++;
      else break;
    }

    const futureTotal = total + simDays;
    const futureAttended = attended + simAttend;
    const futurePct = futureTotal > 0 ? (futureAttended / futureTotal) * 100 : 0;

    return { total, attended, absent, pct, status, neededFor75, canSkip, streak, futurePct };
  }, [attendance, simDays, simAttend, currentMonth, currentYear]);

  const quickCalc = useMemo(() => {
    if (calcTotal <= 0) return null;
    const att = Math.min(safeCalcAttended, calcTotal);
    const pct = (att / calcTotal) * 100;
    const status = pct >= 75 ? "safe" : pct >= 60 ? "risk" : "danger";
    const neededFor75 = Math.max(Math.ceil(0.75 * calcTotal - att), 0);
    const canSkip = Math.max(Math.floor(att / 0.75 - calcTotal), 0);
    return { pct, status, neededFor75, canSkip };
  }, [calcTotal, safeCalcAttended]);

  const hasData = calc.total > 0;
  const statusColor = calc.status === "safe" ? "text-safe" : calc.status === "risk" ? "text-warning" : calc.status === "danger" ? "text-danger" : "text-muted-foreground";
  const statusBg = calc.status === "safe" ? "bg-safe/10 border-safe/30" : calc.status === "risk" ? "bg-warning/10 border-warning/30" : calc.status === "danger" ? "bg-danger/10 border-danger/30" : "bg-secondary border-border";

  const trendData = useMemo(() => {
    if (!hasData) return [];
    const data: { day: string; pct: number }[] = [];
    let cumTotal = 0, cumAttended = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const k = `${currentYear}-${currentMonth}-${d}`;
      if (attendance[k]) {
        cumTotal++;
        if (attendance[k] === "present") cumAttended++;
        data.push({ day: `${d}`, pct: Math.round((cumAttended / cumTotal) * 100) });
      }
    }
    return data;
  }, [attendance, currentMonth, currentYear, daysInMonth, hasData]);

  // Handler that clamps attended to total
  const handleCalcAttended = (val: number) => {
    setCalcAttended(Math.min(val, calcTotal > 0 ? calcTotal : val));
  };

  const handleCalcTotal = (val: number) => {
    setCalcTotal(val);
    if (calcAttended > val) setCalcAttended(val);
  };

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead
        title={seo?.title ?? "Attendance Calculator – Stay Above 75%"}
        description={seo?.description ?? "Track college attendance live, see your real percentage, and know exactly how many classes you can skip without falling below 75%. Free, instant, no sign-up."}
        path={seo?.path ?? "/attendance-tracker"}
        faq={seo?.faq ?? faq}
        howTo={[
          { name: "Enter classes attended & total", text: "In the Quick Calculator, type how many classes you've attended and how many were held." },
          { name: "Set your minimum target %", text: "Default is 75% — change it if your college needs a different threshold." },
          { name: "Read your current %", text: "Your live attendance percentage appears with a colour-coded status (safe, warning, danger)." },
          { name: "See bunk-safe count", text: "The Results card tells you how many classes you can skip — or must attend — to stay above target." },
          { name: "Track day-by-day in the calendar", text: "Mark Present/Absent per day in the Calendar to keep a running attendance log." },
        ]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: seo?.h1 ?? "Attendance Calculator", path: seo?.path ?? "/attendance-tracker" }]}
      />

      {seo ? (
        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{seo.h1}</h1>
          <p className="text-base text-muted-foreground leading-relaxed">{seo.intro}</p>
        </header>
      ) : (
        <div>
        <PageHeading title={"Attendance Calculator & Tracker"} subtitle={"Tap dates to mark present or absent — your % updates instantly."} />
        </div>
      )}

      {/* Quick Calculator Toggle */}
      <button onClick={() => setShowCalc(!showCalc)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary text-[15px] font-bold hover:bg-primary/20 transition-all">
        <Calculator size={18} /> {showCalc ? "Hide" : "Show"} Quick Attendance Calculator
      </button>

      {showCalc && (
        <motion.section aria-labelledby="quick-calc-h" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="guide-card space-y-4">
          <h2 id="quick-calc-h" className="text-[16px] font-bold text-foreground">🧮 Quick Calculator</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-2">
              <span className="text-[14px] font-semibold text-foreground">Total Classes</span>
              <input type="number" min={0} value={calcTotal || ""} onChange={e => handleCalcTotal(Math.max(0, +e.target.value))} placeholder="100" className="compact-input w-full" />
            </label>
            <label className="space-y-2">
              <span className="text-[14px] font-semibold text-foreground">Classes Attended</span>
              <input type="number" min={0} max={calcTotal} value={safeCalcAttended || ""} onChange={e => handleCalcAttended(Math.max(0, +e.target.value))} placeholder="75" className="compact-input w-full" />
            </label>
          </div>
          {safeCalcAttended > calcTotal && calcTotal > 0 && (
            <p className="text-[13px] text-danger font-medium">⚠️ Attended can't exceed total classes</p>
          )}
          {quickCalc && (
            <div className={`rounded-xl p-4 text-center ${quickCalc.status === "safe" ? "bg-safe/10" : quickCalc.status === "risk" ? "bg-warning/10" : "bg-danger/10"}`}>
              <p className={`text-[32px] font-extrabold ${quickCalc.status === "safe" ? "text-safe" : quickCalc.status === "risk" ? "text-warning" : "text-danger"}`}>
                {quickCalc.pct.toFixed(1)}%
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <span className="text-[13px] text-muted-foreground">Need <b className="text-foreground">{quickCalc.neededFor75}</b> more for 75%</span>
                <span className="text-[13px] text-muted-foreground">Can skip <b className="text-foreground">{quickCalc.canSkip}</b></span>
              </div>
            </div>
          )}
        </motion.section>
      )}

      {/* Calendar */}
      <section aria-labelledby="calendar-h" className="guide-card">
        <h2 id="calendar-h" className="sr-only">Attendance Calendar</h2>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentMonth(m => Math.max(m - 1, 0))} className="p-2 rounded-xl hover:bg-secondary text-[16px] font-bold text-foreground transition-colors">←</button>
          <p className="text-[17px] sm:text-[18px] font-bold text-foreground">{months[currentMonth]} {currentYear}</p>
          <button onClick={() => setCurrentMonth(m => Math.min(m + 1, 11))} className="p-2 rounded-xl hover:bg-secondary text-[16px] font-bold text-foreground transition-colors">→</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-center text-[12px] font-semibold text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const key = `${currentYear}-${currentMonth}-${day}`;
            const status = attendance[key];
            const isToday = day === today.getDate() && currentMonth === today.getMonth();
            return (
              <motion.button key={day} whileTap={{ scale: 0.9 }} onClick={() => toggleDay(day)}
                className={`aspect-square rounded-xl text-[14px] font-semibold flex items-center justify-center transition-all ${
                  status === "present" ? "bg-safe text-safe-foreground shadow-sm" :
                  status === "absent" ? "bg-danger text-danger-foreground shadow-sm" :
                  "bg-secondary/60 text-foreground hover:bg-secondary"
                } ${isToday ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}>
                {day}
              </motion.button>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground"><span className="w-3 h-3 rounded-full bg-safe" /> Present</span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground"><span className="w-3 h-3 rounded-full bg-danger" /> Absent</span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground"><span className="w-3 h-3 rounded-full bg-secondary" /> Unmarked</span>
        </div>
      </section>

      {/* Results */}
      {hasData && (
        <section aria-labelledby="results-h" className="space-y-3">
          <h2 id="results-h" className="sr-only">Your Attendance Summary</h2>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl p-4 sm:p-5 text-center border-2 ${statusBg}`}>
            <p className={`text-[22px] sm:text-[26px] font-extrabold leading-none ${statusColor}`}>{calc.pct.toFixed(1)}%</p>
            <p className={`text-[12px] font-bold uppercase mt-1.5 tracking-wide ${statusColor}`}>
              {calc.status === "safe" ? "✅ Safe" : calc.status === "risk" ? "⚠️ At Risk" : "🚨 Danger"}
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-[22px] sm:text-[26px] font-extrabold text-safe">{calc.attended}</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Present</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-[22px] sm:text-[26px] font-extrabold text-danger">{calc.absent}</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Absent</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-[22px] sm:text-[26px] font-extrabold text-primary flex items-center justify-center gap-1">
                {calc.streak} <Flame size={18} className="text-warning" />
              </p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Streak</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="insight-pill text-[14px]">Need <b>{calc.neededFor75}</b> more for 75%</span>
            <span className="insight-pill text-[14px]">Can skip <b>{calc.canSkip}</b> days</span>
            <CopyResultButton shareTitle="My Attendance" text={`Attendance: ${calc.pct.toFixed(1)}% (${calc.attended}/${calc.total}). Need ${calc.neededFor75} more for 75%, can skip ${calc.canSkip}.`} />
          </div>

          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <Lightbulb size={18} className="text-warning" /> What This Means
            </p>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
              {calc.status === "safe" ? `Great! You're at ${calc.pct.toFixed(1)}% — safely above 75%. You can skip ${calc.canSkip} more classes.` :
               calc.status === "risk" ? `Warning! At ${calc.pct.toFixed(1)}%, you're close to the 75% cutoff. Attend ${calc.neededFor75} more classes.` :
               `Critical! At ${calc.pct.toFixed(1)}%, you're below minimum. You need ${calc.neededFor75} consecutive days.`}
            </p>
          </div>

          {trendData.length > 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="guide-card">
              <p className="text-[16px] font-bold text-foreground mb-3">📈 Attendance Trend</p>
              <ChartFrame height={180}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: 600 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                  <ReferenceLine y={75} stroke="#22C55E" strokeDasharray="4 4" strokeWidth={2} />
                  <Tooltip contentStyle={{ fontSize: 14, borderRadius: 12, fontWeight: 600 }} formatter={(v: number) => [`${v}%`, "Attendance"]} />
                  <Area type="monotone" dataKey="pct" stroke="hsl(var(--primary))" fill="url(#attGrad)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
          </ChartFrame>
            </motion.div>
          )}

          <div className="guide-card space-y-4">
            <p className="text-[16px] font-bold text-foreground">🔮 Simulate Future</p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-semibold text-foreground">Future days</span>
                  <span className="text-[18px] font-extrabold text-primary">{simDays}</span>
                </div>
                <Slider value={[simDays]} onValueChange={v => { setSimDays(v[0]); setSimAttend(Math.min(simAttend, v[0])); }} max={30} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-semibold text-foreground">Days you'll attend</span>
                  <span className="text-[18px] font-extrabold text-accent">{simAttend}</span>
                </div>
                <Slider value={[simAttend]} onValueChange={v => setSimAttend(v[0])} max={simDays} />
              </div>
            </div>
            {simDays > 0 && (
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <p className="text-[14px] text-muted-foreground">Projected Attendance</p>
                <p className={`text-[28px] font-extrabold mt-1 ${calc.futurePct >= 75 ? "text-safe" : "text-danger"}`}>
                  {calc.futurePct.toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 size={18} className="text-safe" /> What You Should Do
            </p>
            <div className="space-y-2 mt-3">
              <p className="text-[15px] text-muted-foreground">📌 Attend next <b className="text-foreground">{calc.neededFor75}</b> consecutive days</p>
              <p className="text-[15px] text-muted-foreground">🚫 Never skip 2 days in a row</p>
              <p className="text-[15px] text-muted-foreground">⏰ Set daily morning reminders</p>
              <p className="text-[15px] text-muted-foreground">🎯 Target 80%+ as safety buffer</p>
            </div>
          </div>

          <DownloadReport getData={() => ({
            title: "Attendance Report",
            rows: [
              { label: "Total Days", value: `${calc.total}` },
              { label: "Present", value: `${calc.attended}` },
              { label: "Absent", value: `${calc.absent}` },
              { label: "Attendance %", value: `${calc.pct.toFixed(1)}%` },
              { label: "Status", value: calc.status.toUpperCase() },
              { label: "Streak", value: `${calc.streak} days` },
            ]
          })} />
        </section>
      )}

      {!hasData && (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">📅</p>
          <p className="text-[16px] font-semibold text-foreground">No attendance marked yet</p>
          <p className="text-[14px] text-muted-foreground mt-1">Tap on dates above to mark present or absent</p>
        </div>
      )}

      <AboutCalculator {...aboutContent.attendance} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/attendance" />
      <RelatedArticles />
      <RelatedCategory cluster="attendance" />
    </div>
  );
};

export default AttendanceTracker;
