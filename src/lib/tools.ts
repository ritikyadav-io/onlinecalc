import {
  Calculator, IndianRupee, HeartPulse, Percent, CreditCard, Cake,
  TrendingUp, Banknote, Home, PiggyBank, Landmark, Flame,
  LineChart, Briefcase, Baby, FileBarChart, BarChart3, Target,
  CalendarCheck, ScanLine, Receipt, MoreHorizontal,
  ListChecks, FileText, HelpCircle, BookOpen, Brain, Wallet,
  GraduationCap, Tag, Utensils, Building2
} from "lucide-react";

// Primary calculators — ordered as requested.
export const mainTools = [
  { icon: HeartPulse, title: "BMI Calculator", subtitle: "Body mass index", to: "/bmi-calculator", color: "text-danger" },
  { icon: TrendingUp, title: "SIP Calculator", subtitle: "Mutual fund returns", to: "/sip-calculator", color: "text-accent" },
  { icon: CreditCard, title: "EMI Calculator", subtitle: "Loan EMI in seconds", to: "/emi-calculator", color: "text-primary" },
  { icon: Calculator, title: "Loan Calculator", subtitle: "Interest + total cost", to: "/loan-calculator", color: "text-primary" },
  { icon: IndianRupee, title: "GST Calculator", subtitle: "Add or remove GST", to: "/gst-calculator", color: "text-warning" },
  { icon: Home, title: "Rent vs Buy", subtitle: "Smart housing decision", to: "/rent-vs-buy-calculator", color: "text-accent" },
  { icon: PiggyBank, title: "FD Calculator", subtitle: "Fixed deposit maturity", to: "/fd-calculator", color: "text-safe" },
  { icon: Flame, title: "Calorie Calculator", subtitle: "Daily calorie needs", to: "/calorie-calculator", color: "text-danger" },
  { icon: Landmark, title: "PPF Calculator", subtitle: "15-yr PPF returns", to: "/ppf-calculator", color: "text-primary" },
  { icon: LineChart, title: "Compound Interest", subtitle: "Power of compounding", to: "/compound-interest-calculator", color: "text-accent" },
  { icon: Briefcase, title: "Salary In-hand", subtitle: "Take-home pay", to: "/salary-calculator", color: "text-warning" },
  { icon: Receipt, title: "Income Tax", subtitle: "FY 2025-26 tax", to: "/income-tax-calculator", color: "text-primary" },
  { icon: Baby, title: "Ovulation Calculator", subtitle: "Fertile window", to: "/ovulation-calculator", color: "text-danger" },
  { icon: Percent, title: "Percentage Calculator", subtitle: "All percentage math", to: "/percentage-calculator", color: "text-accent" },
  { icon: GraduationCap, title: "CGPA Calculator", subtitle: "Calculate grades", to: "/cgpa-calculator", color: "text-warning" },
  { icon: Cake, title: "Age Calculator", subtitle: "Years, months, days", to: "/age-calculator", color: "text-warning" },
  { icon: Banknote, title: "Gratuity Calculator", subtitle: "End-of-service payout", to: "/gratuity-calculator", color: "text-safe" },
];

export const viewMoreCard = {
  icon: MoreHorizontal, title: "View More", subtitle: "More tools", to: "/more", color: "text-muted-foreground"
};

// Supporting student tools.
export const moreTools = [
  { icon: Utensils, title: "Tip Calculator", subtitle: "Split bills + tip", to: "/tip-calculator", color: "text-warning" },
  { icon: Tag, title: "Discount Calculator", subtitle: "Sale price + GST", to: "/discount-calculator", color: "text-danger" },
  { icon: Building2, title: "HRA Calculator", subtitle: "House Rent exemption", to: "/hra-calculator", color: "text-primary" },
  { icon: CalendarCheck, title: "Attendance", subtitle: "Track your presence", to: "/attendance-tracker", color: "text-primary" },
  { icon: Target, title: "Required Marks", subtitle: "What you need", to: "/required-marks-calculator", color: "text-danger" },
  { icon: BarChart3, title: "Marks Analyzer", subtitle: "Analyze performance", to: "/marks-analyzer", color: "text-accent" },
  { icon: Wallet, title: "Expenses", subtitle: "Track spending", to: "/expense-tracker", color: "text-safe" },
  { icon: ScanLine, title: "Marksheet", subtitle: "Scan & extract", to: "/marksheet", color: "text-primary" },
  { icon: FileBarChart, title: "Weekly Report", subtitle: "Your week summary", to: "/weekly-report", color: "text-accent" },
  { icon: ListChecks, title: "Backlog Plan", subtitle: "Clear pending subjects", to: "/backlog-planner", color: "text-warning" },
  { icon: HelpCircle, title: "Bunk Tool", subtitle: "Should you skip?", to: "/bunk-tool", color: "text-warning" },
  { icon: FileText, title: "Doc Reader", subtitle: "Read documents", to: "/document-reader", color: "text-primary" },
  { icon: BookOpen, title: "Blog", subtitle: "Calculator guides", to: "/blog", color: "text-accent" },
  { icon: Brain, title: "All Tools", subtitle: "Browse everything", to: "/more", color: "text-muted-foreground" },
];
