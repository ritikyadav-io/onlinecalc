import { useState, useMemo } from "react";
import PageHeading from "@/components/PageHeading";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import ChartFrame from "@/components/ChartFrame";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedArticles from "@/components/RelatedArticles";
import DownloadReport from "@/components/DownloadReport";
import AboutCalculator from "@/components/AboutCalculator";
import { aboutContent } from "@/lib/aboutContent";
import CopyResultButton from "@/components/CopyResultButton";

const faq = [
  { q: "How is age calculated?", a: "Age is calculated as the difference between your birth date and today in years, months, and days." },
  { q: "How many days have I lived?", a: "This tool calculates total days, weeks, months, and even hours you've been alive." },
];

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");

  const calc = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    if (birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext };
  }, [birthDate]);

  const hasData = calc !== null;

  const barData = hasData ? [
    { name: "Years", value: calc.years, color: "#4F46E5" },
    { name: "Months", value: calc.months, color: "#22C55E" },
    { name: "Days", value: calc.days, color: "#F59E0B" },
  ] : [];

  return (
    <div className="page-container max-w-2xl mx-auto space-y-6 animate-fade-up">
      <SEOHead title="Age Calculator – Years, Months & Days Exact" description="Calculate your exact age in years, months, days, weeks, hours, and minutes — plus next birthday countdown. Free instant age calculator, no sign-up." path="/age-calculator" faq={faq} howTo={[
        { name: "Pick your date of birth", text: "Use the date picker to select the day, month, and year you were born." },
        { name: "Set the 'age on' date", text: "Defaults to today, but you can choose any future or past date to calculate age on that day." },
        { name: "Read your exact age", text: "See your age in years, months, days, total weeks, hours, and minutes — recomputed instantly." },
        { name: "Check the next birthday countdown", text: "Scroll to the countdown card to see days left until your next birthday." },
      ]} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Age Calculator", path: "/age-calculator" }]} />
      <div>
        <PageHeading title={"Age Calculator"} subtitle={"Calculate your age in years, months, weeks and days."} />
        <p className="text-base text-muted-foreground mt-1">Enter your birth date</p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-muted-foreground">Date of Birth</span>
        <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="compact-input" />
      </label>

      {hasData && calc && (
        <>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-primary/10 rounded-2xl p-6 text-center">
            <p className="text-5xl font-bold text-primary">{calc.years}</p>
            <p className="text-base text-muted-foreground mt-2">Years, {calc.months} months, {calc.days} days</p>
            <div className="flex justify-center mt-3"><CopyResultButton shareTitle="My Age" text={`I'm ${calc.years} years, ${calc.months} months, ${calc.days} days old (${calc.totalDays.toLocaleString()} days lived). Next birthday in ${calc.daysToNext} days.`} /></div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Days", value: calc.totalDays.toLocaleString() },
              { label: "Total Weeks", value: calc.totalWeeks.toLocaleString() },
              { label: "Total Months", value: calc.totalMonths.toString() },
              { label: "Total Hours", value: calc.totalHours.toLocaleString() },
            ].map(s => (
              <div key={s.label} className="bg-card rounded-2xl p-2.5 sm:p-4 border border-border text-center">
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="text-sm text-muted-foreground font-medium mb-3">Age Breakdown</h3>
            <ChartFrame height={160}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ fontSize: 13, borderRadius: 12 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
          </motion.div>

          <span className="insight-pill block">🎂 Your next birthday is in {calc.daysToNext} days!</span>

          <DownloadReport getData={() => ({
            title: "Age Report",
            rows: [
              { label: "Date of Birth", value: birthDate },
              { label: "Age", value: `${calc.years} years, ${calc.months} months, ${calc.days} days` },
              { label: "Total Days Lived", value: calc.totalDays.toLocaleString() },
              { label: "Total Weeks", value: calc.totalWeeks.toLocaleString() },
              { label: "Total Hours", value: calc.totalHours.toLocaleString() },
              { label: "Next Birthday In", value: `${calc.daysToNext} days` },
            ]
          })} />
        </>
      )}

      {!hasData && <div className="text-center py-12 text-base text-muted-foreground">Enter your birth date to calculate age</div>}
      <AboutCalculator {...aboutContent.age} />
      <FAQSection items={faq} />
      <RelatedTools currentPath="/age-calculator" />
      <RelatedArticles cluster="health" />
    </div>
  );
};

export default AgeCalculator;
