import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, CheckCircle2, HeartPulse, TrendingUp } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";

const faq = [
  { q: "What is BMI?", a: "BMI (Body Mass Index) measures body fat based on height and weight. Formula: BMI = Weight(kg) ÷ Height(m)². It classifies a person as underweight, normal, overweight or obese." },
  { q: "What is the normal BMI range?", a: "WHO categories — Below 18.5: Underweight; 18.5–24.9: Normal; 25.0–29.9: Overweight; 30.0–34.9: Obese I; 35.0–39.9: Obese II; 40+: Obese III (morbid)." },
  { q: "What is normal BMI for Indians?", a: "For South Asians including Indians, WHO recommends lower cutoffs — Below 18.0: Underweight; 18.0–22.9: Normal; 23.0–24.9: Overweight risk; 25+: Obese risk. Indians tend to have higher body fat at lower BMI." },
  { q: "What is BMI of a 70 kg, 5'8\" person?", a: "Height 5'8\" = 172.7 cm = 1.727 m. BMI = 70 ÷ (1.727)² = 23.5 — Normal weight (WHO), borderline overweight by Indian standards." },
  { q: "Is BMI accurate?", a: "BMI is a useful screening tool but has limits. It doesn't measure body fat directly, can misclassify athletes (muscle is denser than fat), and underestimate fat in older adults with muscle loss. Use it with waist circumference for better accuracy." },
  { q: "How to reduce BMI?", a: "Create a calorie deficit (eat less, move more), strength train 3–4×/week, 150–300 min cardio/week, sleep 7–8 hrs, reduce processed foods and sugar. Target 0.5–1 kg loss per week — safe and sustainable." },
];

const howTo = [
  { name: "Enter your weight in kg", text: "Use a recent reading — morning weight without clothes is most consistent." },
  { name: "Enter your height in cm", text: "Stand straight; convert from feet if needed (1 ft = 30.48 cm)." },
  { name: "Read your BMI", text: "The big number is your Body Mass Index — colour-coded by category." },
  { name: "Use the simulator", text: "Drag the slider to see what BMI you'd reach at a different weight." },
];

const zones = [
  { label: "Underweight", min: 0, max: 18.5, color: "#3B82F6", emoji: "🔵" },
  { label: "Normal", min: 18.5, max: 24.9, color: "#22C55E", emoji: "🟢" },
  { label: "Overweight", min: 25, max: 29.9, color: "#F59E0B", emoji: "⚠️" },
  { label: "Obese", min: 30, max: 50, color: "#EF4444", emoji: "🔴" },
];

const BMICalculator = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [simWeight, setSimWeight] = useState(0);

  const calc = useMemo(() => {
    if (weight <= 0 || height <= 0) return null;
    const hm = height / 100;
    const bmi = weight / (hm * hm);
    const zone = bmi < 18.5 ? zones[0] : bmi < 25 ? zones[1] : bmi < 30 ? zones[2] : zones[3];
    const idealMin = 18.5 * hm * hm;
    const idealMax = 24.9 * hm * hm;
    return { bmi, zone, idealMin, idealMax, hm };
  }, [weight, height]);

  const simBmi = useMemo(() => {
    if (!calc || simWeight <= 0) return null;
    const bmi = simWeight / (calc.hm * calc.hm);
    const zone = bmi < 18.5 ? zones[0] : bmi < 25 ? zones[1] : bmi < 30 ? zones[2] : zones[3];
    return { bmi, zone };
  }, [calc, simWeight]);

  const hasData = calc !== null;
  const scalePosition = hasData ? Math.min(100, Math.max(0, ((calc.bmi - 10) / 35) * 100)) : 0;

  return (
    <div className="page-container max-w-2xl mx-auto space-y-5 animate-fade-up">
      <SEOHead title="Free BMI Calculator – Instant Health Insights" description="Check your BMI in seconds. Get your body mass index, category, ideal weight range, and personalised health tips — free, accurate, no sign-up." path="/bmi-calculator" faq={faq} howTo={howTo} image="/og/bmi.png" breadcrumbs={[{ name: "Home", path: "/" }, { name: "BMI Calculator", path: "/bmi-calculator" }]} />

      <div>
        <PageHeading title={"BMI Calculator"} subtitle={"Check your Body Mass Index and get a personalised health guide."} />
        </div>

      {/* Inputs */}
      <div className="guide-card">
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2">
            <span className="text-[14px] font-semibold text-foreground">Weight (kg)</span>
            <input type="number" value={weight || ""} onChange={e => setWeight(+e.target.value)} placeholder="65" className="compact-input w-full" />
          </label>
          <label className="space-y-2">
            <span className="text-[14px] font-semibold text-foreground">Height (cm)</span>
            <input type="number" value={height || ""} onChange={e => setHeight(+e.target.value)} placeholder="170" className="compact-input w-full" />
          </label>
        </div>
      </div>

      {hasData && calc && (
        <>
          {/* Big Result */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl p-6 text-center border-2" style={{ backgroundColor: `${calc.zone.color}15`, borderColor: `${calc.zone.color}40` }}>
            <p className="text-[44px] sm:text-[52px] font-extrabold" style={{ color: calc.zone.color }}>{calc.bmi.toFixed(1)}</p>
            <p className="text-[18px] font-bold mt-1" style={{ color: calc.zone.color }}>
              {calc.zone.emoji} {calc.zone.label}
            </p>
          </motion.div>

          {/* BMI Scale */}
          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground mb-3">📊 BMI Scale</p>
            <div className="relative h-6 rounded-full overflow-hidden flex">
              {zones.map((z, i) => (
                <div key={i} className="h-full flex-1" style={{ backgroundColor: z.color + "40" }} />
              ))}
              <div className="absolute top-0 h-full w-1 bg-foreground rounded-full transition-all" style={{ left: `${scalePosition}%` }} />
            </div>
            <div className="flex justify-between mt-2">
              {zones.map((z, i) => (
                <span key={i} className="text-[11px] font-semibold text-muted-foreground flex-1 text-center">{z.label}</span>
              ))}
            </div>
          </div>

          {/* Ideal Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-[22px] font-extrabold text-safe">{calc.idealMin.toFixed(1)} kg</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Ideal Min</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-[22px] font-extrabold text-safe">{calc.idealMax.toFixed(1)} kg</p>
              <p className="text-[13px] font-semibold text-muted-foreground mt-1">Ideal Max</p>
            </div>
          </div>

          {/* What This Means */}
          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <Lightbulb size={18} className="text-warning" /> What This Means
            </p>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
              {calc.bmi < 18.5 && `At BMI ${calc.bmi.toFixed(1)}, you're underweight. You need to gain ${(calc.idealMin - weight).toFixed(1)} kg to reach the healthy range. Focus on nutrition and strength.`}
              {calc.bmi >= 18.5 && calc.bmi < 25 && `Great! Your BMI ${calc.bmi.toFixed(1)} is in the healthy range. Maintain your current lifestyle with balanced diet and regular activity.`}
              {calc.bmi >= 25 && calc.bmi < 30 && `At BMI ${calc.bmi.toFixed(1)}, you're overweight. Losing ${(weight - calc.idealMax).toFixed(1)} kg will bring you to the healthy range.`}
              {calc.bmi >= 30 && `At BMI ${calc.bmi.toFixed(1)}, you're in the obese category. Losing ${(weight - calc.idealMax).toFixed(1)} kg gradually is recommended for better health.`}
            </p>
          </div>

          {/* Improvement Plan */}
          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <TrendingUp size={18} className="text-safe" /> 🚀 Improvement Plan
            </p>
            <div className="space-y-4 mt-3">
              {calc.bmi < 18.5 && (
                <>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 1</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Increase calorie intake by 300-500 cal/day</p>
                    <p className="text-[14px] text-muted-foreground">• Eat 3-4 meals daily + snacks</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 2</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Add protein: milk, eggs, dal, paneer</p>
                    <p className="text-[14px] text-muted-foreground">• Start light strength exercises</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 3</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Maintain routine consistently</p>
                    <p className="text-[14px] text-muted-foreground">• Track weight weekly</p>
                  </div>
                </>
              )}
              {calc.bmi >= 18.5 && calc.bmi < 25 && (
                <div className="bg-safe/10 rounded-xl p-4">
                  <p className="text-[15px] text-foreground font-semibold">✅ You're doing great! Maintain with:</p>
                  <p className="text-[14px] text-muted-foreground mt-2">• Balanced diet with all food groups</p>
                  <p className="text-[14px] text-muted-foreground">• 30 min daily activity or walking</p>
                  <p className="text-[14px] text-muted-foreground">• Avoid excess junk food</p>
                  <p className="text-[14px] text-muted-foreground">• Stay hydrated: 8 glasses/day</p>
                </div>
              )}
              {calc.bmi >= 25 && calc.bmi < 30 && (
                <>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 1</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Reduce junk food and sugary drinks</p>
                    <p className="text-[14px] text-muted-foreground">• Walk 30 min daily</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 2</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Add 20 min workouts 3x/week</p>
                    <p className="text-[14px] text-muted-foreground">• Control sugar and oil intake</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 3</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Reach healthy BMI range</p>
                    <p className="text-[14px] text-muted-foreground">• Maintain active lifestyle</p>
                  </div>
                </>
              )}
              {calc.bmi >= 30 && (
                <>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 1</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Daily walking 30-45 min</p>
                    <p className="text-[14px] text-muted-foreground">• Strict junk food reduction</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 2</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Build exercise routine</p>
                    <p className="text-[14px] text-muted-foreground">• Portion control at every meal</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <p className="text-[14px] font-bold text-foreground">📅 Month 3</p>
                    <p className="text-[14px] text-muted-foreground mt-1">• Stay consistent with plan</p>
                    <p className="text-[14px] text-muted-foreground">• Consult doctor if needed</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Daily Actions */}
          <div className="guide-card">
            <p className="text-[16px] font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 size={18} className="text-safe" /> Daily Actions
            </p>
            <div className="space-y-2 mt-3">
              <p className="text-[15px] text-muted-foreground">🚶 Walk 8,000–10,000 steps</p>
              <p className="text-[15px] text-muted-foreground">🥗 Eat balanced meals</p>
              <p className="text-[15px] text-muted-foreground">🚫 Avoid sugary drinks</p>
              <p className="text-[15px] text-muted-foreground">💧 Drink 2-3 liters of water</p>
            </div>
          </div>

          {/* Simulator */}
          <div className="guide-card space-y-4">
            <p className="text-[16px] font-bold text-foreground">🔮 If My Weight Becomes...</p>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-semibold text-foreground">Simulated Weight (kg)</span>
                <span className="text-[20px] font-extrabold text-primary">{simWeight || weight}</span>
              </div>
              <Slider value={[simWeight || weight]} onValueChange={v => setSimWeight(v[0])} min={Math.max(30, weight - 30)} max={weight + 30} step={0.5} />
            </div>
            {simBmi && simWeight > 0 && simWeight !== weight && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="rounded-xl p-4 text-center" style={{ backgroundColor: `${simBmi.zone.color}15` }}>
                <p className="text-[28px] font-extrabold" style={{ color: simBmi.zone.color }}>{simBmi.bmi.toFixed(1)}</p>
                <p className="text-[14px] font-semibold mt-1" style={{ color: simBmi.zone.color }}>{simBmi.zone.emoji} {simBmi.zone.label}</p>
              </motion.div>
            )}
          </div>

          <DownloadReport getData={() => ({
            title: "BMI Report",
            rows: [
              { label: "Weight", value: `${weight} kg` },
              { label: "Height", value: `${height} cm` },
              { label: "BMI", value: calc.bmi.toFixed(1) },
              { label: "Category", value: calc.zone.label },
              { label: "Ideal Weight", value: `${calc.idealMin.toFixed(1)} – ${calc.idealMax.toFixed(1)} kg` },
            ]
          })} />
        </>
      )}

      {!hasData && (
        <div className="text-center py-12">
          <p className="text-[40px] mb-3">💪</p>
          <p className="text-[16px] font-semibold text-foreground">Enter your weight and height</p>
          <p className="text-[14px] text-muted-foreground mt-1">Get BMI, health category, and improvement plan</p>
        </div>
      )}

      <FAQSection items={faq} />
      <RelatedTools currentPath="/bmi-calculator" />
      <RelatedArticles cluster="health" />
    </div>
  );
};

export default BMICalculator;
