import { useState, useMemo, useEffect } from "react";
import PageHeading from "@/components/PageHeading";
import { usePersistedState } from "@/hooks/usePersistedState";
import { Plus, X, Lightbulb, AlertTriangle, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import DownloadReport from "@/components/DownloadReport";

const categories = ["Food", "Transport", "Study", "Entertainment", "Other"];
const catColors = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

interface Expense { id: number; amount: number; category: string; date: string; note: string; necessary: boolean; }
let eid = 1;

const faq = [
  { q: "How to track daily expenses?", a: "Add each expense with amount and category. Charts update instantly." },
  { q: "How to reduce spending?", a: "Review your category pie chart to identify biggest spending areas." },
];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = usePersistedState<Expense[]>("tml.expenses.v1", []);
  useEffect(() => { eid = Math.max(eid, ...expenses.map(e => e.id), 0) + 1; }, []);
  const [showAdd, setShowAdd] = useState(false);
  const [newAmt, setNewAmt] = useState("");
  const [newCat, setNewCat] = useState("Food");
  const [newNote, setNewNote] = useState("");
  const [newNecessary, setNewNecessary] = useState(true);

  const total = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const hasData = expenses.length > 0;

  const pieData = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach(e => map.set(e.category, (map.get(e.category) || 0) + e.amount));
    return categories.map(c => ({ name: c, value: map.get(c) || 0 })).filter(d => d.value > 0);
  }, [expenses]);

  const dailyData = useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach(e => map.set(e.date, (map.get(e.date) || 0) + e.amount));
    return Array.from(map.entries()).sort().slice(-7).map(([d, v]) => ({ day: d.slice(5), amt: v }));
  }, [expenses]);

  // Smart analysis
  const analysis = useMemo(() => {
    if (!hasData) return null;
    const unnecessary = expenses.filter(e => !e.necessary);
    const unnecessaryTotal = unnecessary.reduce((s, e) => s + e.amount, 0);
    const topCategory = pieData.length > 0 ? pieData.reduce((a, b) => a.value > b.value ? a : b) : null;
    const topCatPct = topCategory ? Math.round((topCategory.value / total) * 100) : 0;

    const today = new Date().toISOString().slice(0, 10);
    const todayTotal = expenses.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0);
    const avgDaily = total / Math.max(dailyData.length, 1);
    const overAvg = todayTotal > avgDaily * 1.3;

    const suggestions: string[] = [];
    if (topCategory && topCatPct > 40) suggestions.push(`Reduce ${topCategory.name} spending — it's ${topCatPct}% of your total`);
    if (unnecessaryTotal > total * 0.3) suggestions.push(`₹${Math.round(unnecessaryTotal)} spent on unnecessary items — try to cut back`);
    if (topCategory?.name === "Food" && topCatPct > 30) suggestions.push("Try home meals 2 more days/week to save on food");
    suggestions.push(`Set a daily limit of ₹${Math.round(avgDaily)}`);

    return { unnecessaryTotal, topCategory, topCatPct, todayTotal, avgDaily, overAvg, suggestions };
  }, [expenses, hasData, pieData, total, dailyData]);

  const addExpense = () => {
    if (!newAmt || +newAmt <= 0) return;
    setExpenses(p => [{ id: eid++, amount: +newAmt, category: newCat, date: new Date().toISOString().slice(0, 10), note: newNote || newCat, necessary: newNecessary }, ...p]);
    setNewAmt(""); setNewNote(""); setShowAdd(false);
  };

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 pb-24 animate-fade-up">
      <SEOHead title="Student Expense Tracker" description="Free expense tracker for students. Log daily spending, see category pie charts, and save more each month with smart insights." path="/expense-tracker" faq={faq} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Expense Tracker", path: "/expense-tracker" }]} />

      <div className="flex items-center justify-between">
        <div>
        <PageHeading title={"Expense Tracker"} subtitle={"Track and analyse your daily spending."} />
        </div>
        {hasData && <p className="text-[24px] font-bold text-foreground">₹{total}</p>}
      </div>

      {showAdd && (
        <div className="guide-card space-y-3 animate-scale-in">
          <div className="flex gap-2.5">
            <input type="number" placeholder="Amount" value={newAmt} onChange={e => setNewAmt(e.target.value)} className="compact-input flex-1" />
            <select value={newCat} onChange={e => setNewCat(e.target.value)} className="compact-input w-32">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2.5">
            <input placeholder="Note (optional)" value={newNote} onChange={e => setNewNote(e.target.value)} className="compact-input flex-1" />
            <button onClick={() => setNewNecessary(!newNecessary)}
              className={`px-3 py-2 rounded-xl text-[13px] font-medium ${newNecessary ? "bg-safe/10 text-safe" : "bg-danger/10 text-danger"}`}>
              {newNecessary ? "Needed" : "Not needed"}
            </button>
          </div>
          <button onClick={addExpense} className="btn-primary w-full">Add Expense</button>
        </div>
      )}

      {hasData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="guide-card">
            <p className="card-title mb-2">By Category</p>
            <ChartFrame height={150}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={55}>
                {pieData.map((d, i) => <Cell key={i} fill={catColors[categories.indexOf(d.name) % catColors.length]} />)}
              </Pie><Tooltip contentStyle={{ fontSize: 13, borderRadius: 12 }} /></PieChart>
            </ResponsiveContainer>
          </ChartFrame>
            <div className="flex flex-wrap gap-2 mt-2">
              {pieData.map((d) => (
                <span key={d.name} className="text-[12px] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: catColors[categories.indexOf(d.name) % catColors.length] }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
          <div className="guide-card">
            <p className="card-title mb-2">Daily Trend</p>
            <ChartFrame height={150}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs><linearGradient id="expG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.3} /><stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient></defs>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 13, borderRadius: 12 }} />
                <Area type="monotone" dataKey="amt" stroke="#4F46E5" fill="url(#expG)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
          </div>
        </motion.div>
      )}

      {/* Smart Analysis */}
      {hasData && analysis && (
        <>
          {analysis.overAvg && (
            <div className="guide-card bg-warning/5 border-warning/20">
              <p className="guide-title"><AlertTriangle size={16} className="text-warning" /> Alert</p>
              <p className="guide-text">You spent ₹{analysis.todayTotal} today — that's {Math.round((analysis.todayTotal / analysis.avgDaily - 1) * 100)}% more than your daily average of ₹{Math.round(analysis.avgDaily)}.</p>
            </div>
          )}

          <div className="guide-card">
            <p className="guide-title"><Lightbulb size={16} className="text-warning" /> What This Means</p>
            <p className="guide-text">
              {analysis.topCategory && `You spend most on ${analysis.topCategory.name} (${analysis.topCatPct}% of total). `}
              {analysis.unnecessaryTotal > 0 && `₹${Math.round(analysis.unnecessaryTotal)} was marked as unnecessary spending.`}
            </p>
          </div>

          <div className="guide-card">
            <p className="guide-title"><TrendingDown size={16} className="text-safe" /> What You Should Do</p>
            <div className="space-y-1.5 mt-1.5">
              {analysis.suggestions.map((s, i) => (
                <p key={i} className="guide-text">• {s}</p>
              ))}
            </div>
          </div>
        </>
      )}

      {hasData && (
        <div className="space-y-2">
          {expenses.map(e => (
            <div key={e.id} className="flex items-center justify-between bg-card rounded-xl p-3.5 border border-border">
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-foreground truncate">{e.note}</p>
                <p className="text-[13px] text-muted-foreground">{e.category} · {e.date} {!e.necessary && <span className="text-danger">• unnecessary</span>}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[15px] font-semibold text-foreground">₹{e.amount}</span>
                <button onClick={() => setExpenses(p => p.filter(x => x.id !== e.id))} className="p-1"><X size={15} className="text-muted-foreground" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasData && (
        <DownloadReport getData={() => ({
          title: "Expense Report",
          rows: [
            { label: "Total Expenses", value: `₹${total}` },
            { label: "Number of Entries", value: `${expenses.length}` },
            ...expenses.map(e => ({ label: `${e.note} (${e.category})`, value: `₹${e.amount} on ${e.date}` })),
          ]
        })} />
      )}

      {!hasData && !showAdd && <div className="text-center py-10 text-[14px] text-muted-foreground">Tap + to add your first expense</div>}

      <button onClick={() => setShowAdd(!showAdd)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center z-40">
        <Plus size={22} />
      </button>

      <FAQSection items={faq} />
      <RelatedTools currentPath="/expenses" />
    </div>
  );
};

export default ExpenseTracker;
