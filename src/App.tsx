import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import FooterGate from "@/components/FooterGate";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";

const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const MoreTools = lazy(() => import("./pages/MoreTools"));
const AttendanceTracker = lazy(() => import("./pages/AttendanceTracker"));
const CGPACalculator = lazy(() => import("./pages/CGPACalculator"));
const MarksheetScanner = lazy(() => import("./pages/MarksheetScanner"));
const MarksAnalyzer = lazy(() => import("./pages/MarksAnalyzer"));
const ExpenseTracker = lazy(() => import("./pages/ExpenseTracker"));
const WeeklyReport = lazy(() => import("./pages/WeeklyReport"));
const BacklogPlanner = lazy(() => import("./pages/BacklogPlanner"));
const RequiredMarks = lazy(() => import("./pages/RequiredMarks"));
const BunkTool = lazy(() => import("./pages/BunkTool"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const ProgrammaticTool = lazy(() => import("./pages/ProgrammaticTool"));
const GSTCalculator = lazy(() => import("./pages/GSTCalculator"));
const BMICalculator = lazy(() => import("./pages/BMICalculator"));
const EMICalculator = lazy(() => import("./pages/EMICalculator"));
const PercentageCalculator = lazy(() => import("./pages/PercentageCalculator"));
const AgeCalculator = lazy(() => import("./pages/AgeCalculator"));
const SIPCalculator = lazy(() => import("./pages/SIPCalculator"));
const GratuityCalculator = lazy(() => import("./pages/GratuityCalculator"));
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const RentVsBuyCalculator = lazy(() => import("./pages/RentVsBuyCalculator"));
const FDCalculator = lazy(() => import("./pages/FDCalculator"));
const PPFCalculator = lazy(() => import("./pages/PPFCalculator"));
const CalorieCalculator = lazy(() => import("./pages/CalorieCalculator"));
const CompoundInterestCalculator = lazy(() => import("./pages/CompoundInterestCalculator"));
const SalaryCalculator = lazy(() => import("./pages/SalaryCalculator"));
const IncomeTaxCalculator = lazy(() => import("./pages/IncomeTaxCalculator"));
const TipCalculator = lazy(() => import("./pages/TipCalculator"));
const DiscountCalculator = lazy(() => import("./pages/DiscountCalculator"));
const HRACalculator = lazy(() => import("./pages/HRACalculator"));
const OvulationCalculator = lazy(() => import("./pages/OvulationCalculator"));
const DocumentReader = lazy(() => import("./pages/DocumentReader"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Glossary = lazy(() => import("./pages/Glossary"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-label="Loading" />
  </div>
);

if (typeof window !== "undefined") {
  const prefetch = () => {
    const mods = [
      () => import("./pages/EMICalculator"),
      () => import("./pages/SIPCalculator"),
      () => import("./pages/BMICalculator"),
      () => import("./pages/GSTCalculator"),
      () => import("./pages/PercentageCalculator"),
      () => import("./pages/AgeCalculator"),
      () => import("./pages/LoanCalculator"),
      () => import("./pages/FDCalculator"),
      () => import("./pages/PPFCalculator"),
      () => import("./pages/CompoundInterestCalculator"),
      () => import("./pages/SalaryCalculator"),
      () => import("./pages/CalorieCalculator"),
      () => import("./pages/OvulationCalculator"),
      () => import("./pages/GratuityCalculator"),
      () => import("./pages/RentVsBuyCalculator"),
      () => import("./pages/MoreTools"),
    ];
    mods.forEach((m, i) => setTimeout(() => m().catch(() => {}), 200 + i * 80));
  };
  const ric = (window as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1500));
  ric(prefetch);
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/more" element={<MoreTools />} />

              {/* 15 primary calculators (canonical SEO URLs) */}
              <Route path="/emi-calculator" element={<EMICalculator />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/sip-calculator" element={<SIPCalculator />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/gratuity-calculator" element={<GratuityCalculator />} />
              <Route path="/gst-calculator" element={<GSTCalculator />} />
              <Route path="/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/loan-calculator" element={<LoanCalculator />} />
              <Route path="/rent-vs-buy-calculator" element={<RentVsBuyCalculator />} />
              <Route path="/fd-calculator" element={<FDCalculator />} />
              <Route path="/ppf-calculator" element={<PPFCalculator />} />
              <Route path="/calorie-calculator" element={<CalorieCalculator />} />
              <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
              <Route path="/salary-calculator" element={<SalaryCalculator />} />
              <Route path="/ovulation-calculator" element={<OvulationCalculator />} />
              <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
              <Route path="/income-tax" element={<Navigate to="/income-tax-calculator" replace />} />
              <Route path="/tax-calculator" element={<Navigate to="/income-tax-calculator" replace />} />
              <Route path="/tip-calculator" element={<TipCalculator />} />
              <Route path="/discount-calculator" element={<DiscountCalculator />} />
              <Route path="/hra-calculator" element={<HRACalculator />} />
              <Route path="/hra-exemption-calculator" element={<Navigate to="/hra-calculator" replace />} />

              {/* Supporting student tools */}
              <Route path="/attendance-tracker" element={<AttendanceTracker />} />
              <Route path="/cgpa-calculator" element={<CGPACalculator />} />
              <Route path="/required-marks-calculator" element={<RequiredMarks />} />
              <Route path="/marksheet" element={<MarksheetScanner />} />
              <Route path="/marks-analyzer" element={<MarksAnalyzer />} />
              <Route path="/expense-tracker" element={<ExpenseTracker />} />
              <Route path="/weekly-report" element={<WeeklyReport />} />
              <Route path="/backlog-planner" element={<BacklogPlanner />} />
              <Route path="/bunk-tool" element={<BunkTool />} />
              <Route path="/document-reader" element={<DocumentReader />} />

              {/* Removed tools — redirect to All Tools so old links don't 404 */}
              <Route path="/focus-score" element={<Navigate to="/more" replace />} />
              <Route path="/date-calc" element={<Navigate to="/more" replace />} />
              <Route path="/time-estimate" element={<Navigate to="/more" replace />} />

              {/* Alias redirects → canonical SEO URLs (kills duplicate metadata) */}
              <Route path="/attendance" element={<Navigate to="/attendance-tracker" replace />} />
              <Route path="/attendance-calculator" element={<Navigate to="/attendance-tracker" replace />} />
              <Route path="/cgpa" element={<Navigate to="/cgpa-calculator" replace />} />
              <Route path="/required-marks" element={<Navigate to="/required-marks-calculator" replace />} />
              <Route path="/receipt-scan" element={<Navigate to="/marksheet" replace />} />
              <Route path="/expenses" element={<Navigate to="/expense-tracker" replace />} />
              <Route path="/backlog" element={<Navigate to="/backlog-planner" replace />} />
              <Route path="/doc-reader" element={<Navigate to="/document-reader" replace />} />

              {/* Static pages */}
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
              <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
              <Route path="/glossary" element={<Glossary />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/category/:cluster" element={<BlogCategory />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Programmatic SEO variants */}
              <Route path="/aktu-cgpa-calculator" element={<ProgrammaticTool />} />
              <Route path="/vtu-cgpa-calculator" element={<ProgrammaticTool />} />
              <Route path="/engineering-cgpa-calculator" element={<ProgrammaticTool />} />
              <Route path="/college-attendance-calculator" element={<ProgrammaticTool />} />
              <Route path="/how-many-classes-can-i-miss-calculator" element={<ProgrammaticTool />} />
              <Route path="/semester-percentage-calculator" element={<ProgrammaticTool />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <FooterGate />
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
