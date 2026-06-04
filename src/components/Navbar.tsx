import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

const pageTitles: Record<string, string> = {
  // 15 calculators
  "/emi-calculator": "EMI Calculator",
  "/age-calculator": "Age Calculator",
  "/sip-calculator": "SIP Calculator",
  "/bmi-calculator": "BMI Calculator",
  "/gratuity-calculator": "Gratuity Calculator",
  "/gst-calculator": "GST Calculator",
  "/percentage-calculator": "Percentage Calculator",
  "/loan-calculator": "Loan Calculator",
  "/rent-vs-buy-calculator": "Rent vs Buy",
  "/fd-calculator": "FD Calculator",
  "/ppf-calculator": "PPF Calculator",
  "/calorie-calculator": "Calorie Calculator",
  "/compound-interest-calculator": "Compound Interest",
  "/salary-calculator": "Salary In-hand",
  "/income-tax-calculator": "Income Tax Calculator",
  "/ovulation-calculator": "Ovulation Calculator",
  // student tools
  "/attendance": "Attendance Tracker",
  "/attendance-tracker": "Attendance Tracker",
  "/attendance-calculator": "Attendance Calculator",
  "/cgpa": "CGPA Calculator",
  "/cgpa-calculator": "CGPA Calculator",
  "/marksheet": "Marksheet Scanner",
  "/marks-analyzer": "Marks Analyzer",
  "/expenses": "Expense Tracker",
  "/expense-tracker": "Expense Tracker",
  "/weekly-report": "Weekly Report",
  "/backlog": "Backlog Planner",
  "/backlog-planner": "Backlog Planner",
  "/more": "More Tools",
  "/required-marks": "Required Marks",
  "/required-marks-calculator": "Required Marks",
  "/receipt-scan": "Receipt Scanner",
  "/doc-reader": "Doc Reader",
  "/document-reader": "Document Reader",
  "/bunk-tool": "Bunk Tool",
  "/privacy": "Privacy Policy",
  "/contact": "Contact Us",
  "/about": "About",
  "/terms": "Terms",
  "/disclaimer": "Disclaimer",
  "/blog": "Blog",
  "/glossary": "Glossary",
  "/dashboard": "Dashboard",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith("/blog/") ? "Blog" : "");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border flex items-center px-3 sm:px-6"
      style={{ height: "var(--navbar-height)" }}
    >
      <div className="w-full max-w-6xl mx-auto flex items-center gap-2">
        <div className={`flex items-center shrink-0 ${isHome ? 'w-auto' : 'w-10'}`}>
          {!isHome ? (
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="p-2 rounded-xl hover:bg-secondary transition-colors text-foreground"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span
              className="text-[20px] sm:text-[24px] font-extrabold tracking-tight cursor-pointer whitespace-nowrap"
              onClick={() => navigate("/")}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Online
              </span>
              <span className="text-foreground"> Calculators</span>
            </span>
          )}
        </div>

        <div className="flex-1 text-center min-w-0 px-2">
          {!isHome ? (
            <span className="text-[15px] sm:text-[17px] font-bold text-foreground truncate inline-block max-w-full">
              {title}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-end shrink-0">
          <a
            href="https://buymeacoffee.com/ezcalc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[12px] sm:text-[14px] font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Heart size={14} className="fill-current" />
            <span className="hidden sm:inline">Donate</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
