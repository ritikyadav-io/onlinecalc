import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import { aboutContent } from "@/lib/aboutContent";
import CopyResultButton from "@/components/CopyResultButton";
import InsightGrid from "@/components/InsightGrid";

const faq = [
  { q: "What is BMR vs TDEE?", a: "BMR is calories burned at rest. TDEE multiplies BMR by your activity level — the actual calories you burn in a day." },
  { q: "Which formula does this use?", a: "We use the Mifflin-St Jeor equation, considered the most accurate modern BMR formula." },
  { q: "How do I lose weight?", a: "Eat 300–500 calories below your TDEE. Aim for 0.5–1 kg loss per week — faster is unsustainable." },
];

const howTo = [
  { name: "Enter age, weight & height", text: "Use metric units (kg, cm) for accurate Mifflin-St Jeor output." },
  { name: "Pick gender", text: "BMR formulas differ slightly by biological sex." },
  { name: "Choose activity level", text: "Sedentary (desk) to very active (twice-a-day training)." },
  { name: "Use the targets", text: "TDEE is maintenance. Subtract 500 to lose, add 300 to gain weight steadily." },
];

const activityFactors = [
  { label: "Sedentary (little exercise)", value: 1.2 },
  { label: "Light (1-3 days/week)", value: 1.375 },
  { label: "Moderate (3-5 days/week)", value: 1.55 },
  { label: "Active (6-7 days/week)", value: 1.725 },
  { label: "Very active (twice a day)", value: 1.9 },
];

const CalorieCalculator = () => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activity, setActivity] = useState(1.55);

  const calc = useMemo(() => {
    if (age <= 0 || weight <= 0 || height <= 0) return null;
    // Mifflin-St Jeor
    const bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = bmr * activity;
    return { bmr, tdee, lose: tdee - 500, gain: tdee + 300 };
  }, [age, gender, weight, height, activity]);

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Calorie Calculator – Daily Needs (BMR + TDEE)" description="Find your true daily calorie needs using the trusted Mifflin-St Jeor formula. Get BMR, TDEE, and personalised targets for weight loss, gain, or maintenance." path="/calorie-calculator" faq={faq} howTo={howTo} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Calorie Calculator", path: "/calorie-calculator" }]} />
        <PageHeading title={"Calorie Calculator"} subtitle={"Find your daily calorie needs (BMR + TDEE) for any goal."} />
        <p className="text-base text-muted-foreground">Find your daily calorie target</p>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Age</span>
          <input type="number" value={age || ""} onChange={e => setAge(+e.target.value)} placeholder="25" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Gender</span>
          <select value={gender} onChange={e => setGender(e.target.value as "male" | "female")} className="compact-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Weight (kg)</span>
          <input type="number" value={weight || ""} onChange={e => setWeight(+e.target.value)} placeholder="70" className="compact-input" /></label>
        <label className="space-y-2"><span className="text-sm text-muted-foreground">Height (cm)</span>
          <input type="number" value={height || ""} onChange={e => setHeight(+e.target.value)} placeholder="175" className="compact-input" /></label>
      </div>
      <label className="space-y-2 block"><span className="text-sm text-muted-foreground">Activity Level</span>
        <select value={activity} onChange={e => setActivity(+e.target.value)} className="compact-input">
          {activityFactors.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select></label>

      {calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-primary">{Math.round(calc.tdee)} kcal</p>
            <p className="text-sm text-muted-foreground mt-1">Maintenance Calories (TDEE)</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="My Daily Calories" text={`TDEE: ${Math.round(calc.tdee)} kcal | BMR: ${Math.round(calc.bmr)} | Lose: ${Math.round(calc.lose)} | Gain: ${Math.round(calc.gain)}`} /></div>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-lg font-bold text-foreground">{Math.round(calc.bmr)}</p>
              <p className="text-xs text-muted-foreground mt-1">BMR</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-lg font-bold text-safe">{Math.round(calc.lose)}</p>
              <p className="text-xs text-muted-foreground mt-1">Lose weight</p>
            </div>
            <div className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
              <p className="text-lg font-bold text-warning">{Math.round(calc.gain)}</p>
              <p className="text-xs text-muted-foreground mt-1">Gain weight</p>
            </div>
          </div>
          <InsightGrid
            title="Live insights"
            insights={[
              { key: "tdee", label: "Maintenance (TDEE)", value: calc.tdee, format: (v) => `${Math.round(v)} kcal`, tone: "neutral", hint: "Eat this to stay the same weight" },
              { key: "lose", label: "Cut to lose", value: calc.lose, format: (v) => `${Math.round(v)} kcal`, tone: "good", hint: "~0.5 kg/week sustainable loss" },
              { key: "gain", label: "Surplus to gain", value: calc.gain, format: (v) => `${Math.round(v)} kcal`, tone: "warn", hint: "Lean bulk territory" },
            ]}
          />
          <span className="insight-pill block">💡 Subtract 500 kcal/day to lose ~0.5 kg/week sustainably</span>
          <DownloadReport getData={() => ({
            title: "Calorie Report",
            rows: [
              { label: "Age", value: `${age}` },
              { label: "Gender", value: gender },
              { label: "Weight", value: `${weight} kg` },
              { label: "Height", value: `${height} cm` },
              { label: "BMR", value: `${Math.round(calc.bmr)} kcal` },
              { label: "TDEE", value: `${Math.round(calc.tdee)} kcal` },
              { label: "Weight loss", value: `${Math.round(calc.lose)} kcal` },
              { label: "Weight gain", value: `${Math.round(calc.gain)} kcal` },
            ]
          })} />
        </>
      )}
      {!calc && <div className="text-center py-12 text-base text-muted-foreground">Enter your details</div>}
      <AboutCalculator {...aboutContent.calorie} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/calorie-calculator" />
      <RelatedArticles cluster="health" />
    </div>
  );
};

export default CalorieCalculator;
