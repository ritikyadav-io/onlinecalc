import SEOHead from "@/components/SEOHead";

const About = () => (
  <div className="page-container max-w-2xl mx-auto animate-fade-up">
    <SEOHead
      title="About Online Calculators - Free Student Productivity Tools"
      description="Learn about Online Calculators, an all-in-one student productivity platform with attendance tracker, CGPA calculator, study planner, expense tracker and more."
      path="/about"
    />
    <h1 className="text-2xl font-bold text-foreground mb-4">About Online Calculators</h1>
    <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border space-y-4 text-[14px] text-muted-foreground leading-relaxed">
      <p>
        <strong>Online Calculators</strong> is an all-in-one student productivity platform designed to help students manage their academic and daily life more effectively.
      </p>
      <p>
        We provide tools like the Attendance Tracker, CGPA Calculator, Study Planner, Expense Tracker, Required Marks Calculator and many more to help students make better decisions every day.
      </p>

      <h2 className="text-base font-semibold text-foreground">Our Goal</h2>
      <p>
        Our goal is simple: <strong>make student life more organized, productive and stress-free.</strong> We believe every student deserves clean, fast tools that just work — no signups, no clutter.
      </p>

      <h2 className="text-base font-semibold text-foreground">What Makes Us Different</h2>
      <ul className="list-disc pl-5 space-y-1.5">
        <li>30+ free student tools in one place</li>
        <li>Privacy-friendly: most data stays on your device</li>
        <li>Mobile-first, fast, and ad-light interface</li>
        <li>Built and improved with real student feedback</li>
      </ul>

      <h2 className="text-base font-semibold text-foreground">Trusted by Students</h2>
      <p>
        50,000+ students use Online Calculators to plan attendance, predict CGPA, beat procrastination, manage budgets and stay consistent during exams.
      </p>

      <p>
        We continuously improve our tools based on real student needs. Have a suggestion? We’d love to hear from you on our <a className="text-primary underline" href="/contact">Contact</a> page.
      </p>
    </div>
  </div>
);

export default About;
