// Programmatic SEO variants — each renders an existing calculator with custom metadata,
// H1, intro copy, and FAQs targeted at high-intent long-tail queries.

export type VariantTool = "cgpa" | "attendance" | "percentage" | "required-marks";

export interface SeoVariant {
  slug: string;
  tool: VariantTool;
  title: string;
  description: string;
  h1: string;
  intro: string;
  faq: { q: string; a: string }[];
}

export const seoVariants: SeoVariant[] = [
  {
    slug: "aktu-cgpa-calculator",
    tool: "cgpa",
    title: "AKTU CGPA Calculator (B.Tech, MBA, MCA)",
    description: "Free AKTU CGPA Calculator for B.Tech, MBA & MCA students. Convert SGPA to CGPA using the official AKTU 10-point grading system instantly.",
    h1: "AKTU CGPA Calculator",
    intro: "Calculate your AKTU CGPA accurately using the official Dr. A.P.J. Abdul Kalam Technical University 10-point grading scale (O = 10, A+ = 9, A = 8...). Add your subjects with credits and grades to see your SGPA and cumulative CGPA in seconds.",
    faq: [
      { q: "How is AKTU CGPA calculated?", a: "AKTU uses CGPA = Σ(Credits × Grade Points) / Σ(Credits) on a 10-point scale. Add each subject's credits and grade — the calculator does the rest." },
      { q: "How to convert AKTU CGPA to percentage?", a: "AKTU formula: Percentage = (CGPA − 0.75) × 10. For a 7.5 CGPA, percentage = (7.5 − 0.75) × 10 = 67.5%." },
      { q: "What is the AKTU passing CGPA?", a: "You need a minimum of 5.0 CGPA to pass and earn the AKTU degree, with no active backlog at the end of the program." },
    ],
  },
  {
    slug: "vtu-cgpa-calculator",
    tool: "cgpa",
    title: "VTU CGPA Calculator (CBCS Scheme)",
    description: "VTU CGPA Calculator for CBCS scheme students. Compute SGPA and CGPA on the official 10-point grading system used by Visvesvaraya Technological University.",
    h1: "VTU CGPA Calculator",
    intro: "Free VTU CGPA Calculator built for the CBCS / Outcome Based Education scheme. Enter each course's credits and grade points to instantly get your SGPA and overall CGPA.",
    faq: [
      { q: "How does VTU calculate CGPA?", a: "CGPA = Σ(Ci × Si) / Σ(Ci), where Ci = credits and Si = SGPA of semester i. Each grade maps to a fixed grade point on a 10-point scale." },
      { q: "How to convert VTU CGPA to percentage?", a: "Official VTU formula: Percentage = (CGPA − 0.75) × 10." },
      { q: "What is a good CGPA in VTU?", a: "A CGPA above 8.0 is considered first class with distinction; 6.5+ is first class; 5.0 is the minimum passing CGPA." },
    ],
  },
  {
    slug: "engineering-cgpa-calculator",
    tool: "cgpa",
    title: "Engineering CGPA Calculator (B.Tech / B.E.)",
    description: "Free Engineering CGPA Calculator for B.Tech and B.E. students. Works with any Indian university 10-point grading system.",
    h1: "Engineering CGPA Calculator",
    intro: "An all-purpose Engineering CGPA Calculator that works for B.Tech and B.E. students across Indian universities using a 10-point grading scale. Add subjects, credits, and grades to compute SGPA and CGPA.",
    faq: [
      { q: "What is the formula for engineering CGPA?", a: "CGPA = Σ(Credits × Grade Points) / Σ(Credits). Grade points typically range from 0 (F) to 10 (O)." },
      { q: "Is 7.5 CGPA good in engineering?", a: "Yes — a 7.5 CGPA equals roughly 71% and is generally considered first class, and is eligible for most placements and higher studies." },
      { q: "How many credits are in a B.Tech?", a: "Most B.Tech programs total around 160–180 credits across 8 semesters, depending on the university." },
    ],
  },
  {
    slug: "college-attendance-calculator",
    tool: "attendance",
    title: "College Attendance Calculator (75% Rule)",
    description: "Free College Attendance Calculator. Check attendance percentage, see exactly how many classes you can miss while staying above 75%.",
    h1: "College Attendance Calculator",
    intro: "Find out your current attendance percentage and exactly how many classes you can safely skip while staying above the mandatory 75% threshold most colleges require.",
    faq: [
      { q: "How is college attendance calculated?", a: "Attendance % = (Classes Attended ÷ Total Classes) × 100." },
      { q: "Why is 75% attendance required?", a: "Most Indian colleges and universities (AICTE, UGC, AKTU, VTU, Anna University) require a minimum 75% attendance to be eligible to sit for end-semester exams." },
      { q: "What if my attendance falls below 75%?", a: "You may be marked as a detained student and barred from semester exams. Some colleges allow medical exemptions or condonation up to 65%." },
    ],
  },
  {
    slug: "how-many-classes-can-i-miss-calculator",
    tool: "attendance",
    title: "How Many Classes Can I Miss? Calculator",
    description: "Find out exactly how many classes you can bunk while staying above 75% attendance. Free, instant calculator for college students.",
    h1: "How Many Classes Can I Miss Calculator",
    intro: "Stop guessing. Enter your attended and total classes — this calculator tells you precisely how many lectures you can skip without falling below the 75% attendance rule.",
    faq: [
      { q: "How many classes can I bunk if I have 80% attendance?", a: "If you have 80% on 100 classes attended, you can miss roughly 1 class for every 4 future classes and stay above 75%. Use the calculator above for an exact number based on your real data." },
      { q: "Does medical leave count as absent?", a: "Officially yes — but most colleges grant medical condonation up to 10% if you submit a valid certificate." },
      { q: "Is 75% strictly enforced?", a: "Yes, in most Indian universities (AICTE, UGC, AKTU, VTU). Falling below it usually means being detained from semester exams." },
    ],
  },
  {
    slug: "semester-percentage-calculator",
    tool: "percentage",
    title: "Semester Percentage Calculator",
    description: "Free Semester Percentage Calculator for college students. Compute your overall semester % from marks across subjects instantly.",
    h1: "Semester Percentage Calculator",
    intro: "Quickly compute your overall semester percentage by entering marks obtained and total marks. Useful for B.Tech, B.Sc, B.Com, and any university semester result.",
    faq: [
      { q: "How is semester percentage calculated?", a: "Semester % = (Total Marks Obtained ÷ Total Maximum Marks) × 100." },
      { q: "How to convert SGPA to percentage?", a: "For most universities: Percentage = (SGPA − 0.75) × 10. AKTU and VTU use this formula officially." },
      { q: "What is a first class percentage?", a: "60%–75% is first class. Above 75% is usually first class with distinction." },
    ],
  },
];

export const getVariantBySlug = (slug?: string) =>
  seoVariants.find((v) => v.slug === slug);
