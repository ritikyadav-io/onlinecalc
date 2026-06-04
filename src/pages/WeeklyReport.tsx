import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import PageHeading from "@/components/PageHeading";
import ChartFrame from "@/components/ChartFrame";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";

const attendanceData = [
  { d: "Mon", v: 100 }, { d: "Tue", v: 85 }, { d: "Wed", v: 90 },
  { d: "Thu", v: 0 }, { d: "Fri", v: 95 }, { d: "Sat", v: 80 }, { d: "Sun", v: 0 },
];
const studyData = [
  { d: "Mon", v: 3 }, { d: "Tue", v: 4 }, { d: "Wed", v: 2 },
  { d: "Thu", v: 5 }, { d: "Fri", v: 1 }, { d: "Sat", v: 6 }, { d: "Sun", v: 3 },
];
const spendData = [
  { d: "Mon", v: 150 }, { d: "Tue", v: 80 }, { d: "Wed", v: 200 },
  { d: "Thu", v: 50 }, { d: "Fri", v: 300 }, { d: "Sat", v: 120 }, { d: "Sun", v: 90 },
];

const faq = [
  { q: "What does the weekly report show?", a: "A summary of your attendance, study hours, and spending patterns for the week." },
  { q: "How often is data updated?", a: "Data updates in real-time as you use other tools in the app." },
];

const MiniChart = ({ data, color, label, unit, gradient }: { data: typeof attendanceData; color: string; label: string; unit: string; gradient: string }) => {
  const avg = (data.reduce((s, d) => s + d.v, 0) / data.length).toFixed(0);
  return (
    <div className="bg-card rounded-2xl p-5 border border-border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm text-muted-foreground font-medium">{label}</h3>
        <span className="text-sm font-semibold text-foreground">Avg: {avg}{unit}</span>
      </div>
      <ChartFrame height={120}>
            <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="d" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={{ fontSize: 13, borderRadius: 12 }} />
          <Area type="monotone" dataKey="v" stroke={color} fill={`url(#${gradient})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
          </ChartFrame>
    </div>
  );
};

const WeeklyReport = () => (
  <div className="page-container max-w-2xl mx-auto space-y-6">
    <SEOHead title="Weekly Report - Student Dashboard Summary" description="View your weekly attendance, study, and spending trends." path="/weekly-report" faq={faq} />

    <div>
        <PageHeading title={"Weekly Report"} subtitle={"Your week at a glance — attendance, marks and habits."} />
        <p className="text-base text-muted-foreground mt-1">Your week at a glance</p>
    </div>

    <div className="space-y-4">
      <MiniChart data={attendanceData} color="hsl(var(--primary))" label="Attendance" unit="%" gradient="wrAtt" />
      <MiniChart data={studyData} color="hsl(var(--safe))" label="Study Hours" unit="h" gradient="wrStudy" />
      <MiniChart data={spendData} color="hsl(var(--warning))" label="Spending" unit="₹" gradient="wrSpend" />
    </div>

    <div className="space-y-2">
      <h2 className="text-lg font-bold text-foreground">Insights</h2>
      <span className="insight-pill block">📉 Skipped classes on Thu — attendance dropped</span>
      <span className="insight-pill block">📈 Study consistency improved — avg 3.4h/day</span>
      <span className="insight-pill block">💸 Friday spending spike: ₹300 (+87% vs avg)</span>
    </div>

    <FAQSection items={faq} />
    <RelatedTools currentPath="/weekly-report" />
  </div>
);

export default WeeklyReport;
