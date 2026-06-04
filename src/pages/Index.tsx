import { useState, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Zap, Star, Shield, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ToolCard from "@/components/ToolCard";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { mainTools, moreTools } from "@/lib/tools";
import { blogs } from "@/lib/blogs";

const allReviews = [
  { name: "Rahul S.", text: "Used the EMI calculator to plan my home loan — the amortisation chart made it easy to compare tenures.", rating: 5 },
  { name: "Priya M.", text: "The CGPA calculator is a lifesaver. I use it every semester to plan my grades.", rating: 5 },
  { name: "Amit K.", text: "The expense tracker finally made me realise how much I spend on food. Must-have.", rating: 4 },
  { name: "Sneha R.", text: "SIP calculator helped me decide a realistic monthly amount for my goals.", rating: 5 },
  { name: "Vikram D.", text: "BMI calculator and GST tool are super handy. Clean and fast — no clutter.", rating: 5 },
  { name: "Ananya P.", text: "The salary in-hand calculator matched my pay slip almost to the rupee.", rating: 5 },
  { name: "Kiran T.", text: "Rent vs buy calculator gave me the clarity I needed before signing my flat.", rating: 5 },
  { name: "Meera J.", text: "Compound interest projection is what finally convinced me to start early.", rating: 5 },
  { name: "Rohit B.", text: "Required marks calculator helped me set realistic exam targets.", rating: 5 },
];

const homeFaq = [
  { q: "What calculators are available on Online Calculators?", a: "Online Calculators offers 40+ tools: EMI, SIP, GST, Income Tax, Salary In-hand, BMI, CGPA, FD, PPF, Loan, Retirement, Step-up SIP, Compound Interest, Age, Attendance, Percentage, Rent vs Buy, Gratuity, Ovulation, Calorie and more. All free, no signup." },
  { q: "Are Online Calculators accurate?", a: "Yes. All calculators use standard Indian formulas — EMI uses the standard P×R×(1+R)^N formula, GST uses official Indian rates, Income Tax uses Finance Act 2025 slabs and BMI uses the WHO formula. Results are for estimation and planning." },
  { q: "Do I need to create an account to use these calculators?", a: "No. All 40+ calculators are free with no account, no signup and no credit card required. Open any calculator and start using it instantly." },
  { q: "Does Online Calculators work on mobile?", a: "Yes. Online Calculators is fully optimised for mobile and tablets. All calculators work on Android and iOS browsers without any app download." },
  { q: "What is the in-hand salary for ₹12 LPA?", a: "For ₹12 LPA CTC, approx monthly in-hand is ₹82,000–₹90,000 depending on tax regime, PF and allowance structure. Use our Salary In-hand Calculator for exact numbers." },
  { q: "How to calculate income tax in India 2025?", a: "FY 2025-26 New Regime — income up to ₹7 lakh is zero tax (rebate u/s 87A). Above ₹7L, apply slabs 5%, 10%, 15%, 20%, 30% progressively, then add 4% Health & Education Cess." },
  { q: "Do you store the values I enter?", a: "No. All calculations run inside your browser. Inputs and results are not uploaded or stored on any server." },
  { q: "Can I rely on these calculators for financial decisions?", a: "Use them as planning tools. They are accurate to the inputs provided, but for binding loan, tax or medical decisions consult a qualified professional." },
];


const getToolCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("emi") || t.includes("loan") || t.includes("rent vs buy")) return "Loans";
  if (t.includes("gst") || t.includes("tax") || t.includes("hra")) return "Tax";
  if (t.includes("sip") || t.includes("fd") || t.includes("ppf") || t.includes("compound")) return "Investment";
  if (t.includes("bmi") || t.includes("calorie") || t.includes("ovulation")) return "Health";
  if (t.includes("salary")) return "Salary";
  if (t.includes("attendance") || t.includes("marks") || t.includes("cgpa") || t.includes("backlog") || t.includes("bunk")) return "Student";
  return "Finance";
};

const getBlogImage = (cluster: string): string => {
  const map: Record<string, string> = {
    loans: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
    investments: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=60",
    tax: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?w=600&auto=format&fit=crop&q=60",
    health: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=60",
    salary: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60",
  };
  return map[cluster] || "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&auto=format&fit=crop&q=60";
};

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [percentageVal, setPercentageVal] = useState("10");
  const [amountVal, setAmountVal] = useState("1000");

  const quickResult = useMemo(() => {
    const p = parseFloat(percentageVal);
    const a = parseFloat(amountVal);
    if (isNaN(p) || isNaN(a)) return "0";
    return ((p / 100) * a).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }, [percentageVal, amountVal]);

  const allTools = useMemo(() => [...mainTools, ...moreTools], []);

  const filteredTools = useMemo(() => {
    let list = allTools;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.subtitle.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      list = list.filter(t => getToolCategory(t.title) === selectedCategory);
    }

    return list;
  }, [allTools, searchQuery, selectedCategory]);


  const latestBlogs = useMemo(() => blogs.slice(0, 3), []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const amount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const handleChipClick = (term: string) => {
    setSearchQuery(term);
    setSelectedCategory("All");
    document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page-container max-w-5xl mx-auto space-y-12 md:space-y-20 !px-0">
      <SEOHead
        title="Online Calculators – Free Finance, Tax & Health Calculators"
        description="Free online calculators for EMI, SIP, GST, BMI, FD, PPF, salary in-hand and more. Instant in-browser results, clear formulas, no sign-up."
        path="/"
        faq={homeFaq}
      />

      {/* Hero & Search Section */}
      <section className="text-center pt-2 sm:pt-6 pb-2 animate-fade-up max-w-2xl mx-auto space-y-6 px-4 sm:px-5">
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground text-[12px] font-bold">
          <Zap size={12} className="text-primary fill-primary" /> Free Premium Ecosystem
        </div>
        <h1 className="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-foreground leading-[1.15] px-2">
          Calculate Anything in Seconds
        </h1>
        <p className="hidden sm:block text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed px-4">
          Free, instant, in-browser financial and health tools.
        </p>

        {/* Search Bar - Maintained above the fold */}
        <div id="search-section" className="relative max-w-lg mx-auto w-full pt-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search 40+ calculators..."
            className="w-full h-[52px] pl-12 pr-4 text-[15px] rounded-xl bg-card border border-border/80 outline-none focus:border-primary/50 focus:bg-card focus:ring-2 focus:ring-primary/5 transition-all shadow-md"
          />
        </div>

        {/* Quick calculator chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
          {["GST", "EMI", "SIP", "FD", "PPF", "Salary", "BMI", "Income Tax"].map(term => (
            <button
              key={term}
              onClick={() => handleChipClick(term)}
              className="px-3.5 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-[12px] font-bold text-foreground border border-border/40 transition-colors flex-shrink-0"
            >
              {term}
            </button>
          ))}
        </div>
      </section>


      {/* Categories section inline under search */}

      {/* Tools Grid */}
      <section className="space-y-6 pt-3 px-4 sm:px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-foreground">
            {selectedCategory === "All" ? "Featured Calculators" : `${selectedCategory} Tools`}
          </h2>
          <span className="text-[13px] font-bold text-muted-foreground">
            {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
          </span>
        </div>


        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool.to} {...tool} index={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-dashed border-border/80">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-[15px] font-bold text-foreground">No calculators found</p>
            <p className="text-[13px] text-muted-foreground mt-0.5">Try searching with a different keyword</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-3.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold shadow-md shadow-primary/15"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="space-y-6 px-4 sm:px-5">
        <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-foreground">Platform Trust</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { stat: "50k+", title: "Monthly Runs", desc: "Calculations run globally" },
            { stat: "40+", title: "Free Tools", desc: "No usage restrictions" },
            { stat: "100%", title: "Privacy First", desc: "Data stays in-browser" },
            { stat: "Zero", title: "Signups", desc: "Instant free access" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border/80 rounded-[20px] p-3.5 text-center shadow-sm flex flex-col justify-center min-h-[85px]">
              <p className="text-[32px] font-extrabold text-primary tracking-tight leading-none">{item.stat}</p>
              <p className="text-[13px] font-extrabold text-foreground mt-1 leading-tight">{item.title}</p>
              <p className="text-[11px] text-muted-foreground leading-normal mt-0.5 hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Calculator Section (Homepage Spotlight) */}
      <section className="space-y-6 px-4 sm:px-5 animate-fade-up">
        <div>
          <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-foreground">Quick Calculator</h2>
          <p className="text-[12px] text-muted-foreground mt-0.5">Solve simple percentage math instantly without leaving the homepage</p>
        </div>
        <div className="bg-card border border-border/80 rounded-[20px] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[14px] font-bold text-muted-foreground shrink-0">What is</span>
              <input
                type="number"
                value={percentageVal}
                onChange={(e) => setPercentageVal(e.target.value)}
                className="w-full sm:w-20 h-10 px-3 text-[14px] text-center font-extrabold rounded-lg bg-secondary border-0 outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="10"
              />
              <span className="text-[14px] font-bold text-muted-foreground">%</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[14px] font-bold text-muted-foreground shrink-0">of</span>
              <input
                type="number"
                value={amountVal}
                onChange={(e) => setAmountVal(e.target.value)}
                className="w-full sm:w-32 h-10 px-3 text-[14px] text-center font-extrabold rounded-lg bg-secondary border-0 outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="1000"
              />
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto pt-2 sm:pt-0 sm:ml-auto">
              <span className="text-[14px] font-bold text-muted-foreground">=</span>
              <span className="text-[22px] font-extrabold text-primary tracking-tight">{quickResult}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="space-y-6 hidden sm:block">
        <div className="flex items-center justify-between px-4 sm:px-5">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-foreground">What Users Say</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Real feedback from students and professionals</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-card hover:bg-secondary text-foreground transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-card hover:bg-secondary text-foreground transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none px-4 sm:px-5 scroll-smooth w-full"
        >
          {allReviews.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[250px] sm:w-[320px] snap-start bg-card rounded-[20px] p-4.5 border border-border shadow-sm flex flex-col justify-between h-[155px] text-left"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={11} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-[13px] text-muted-foreground italic leading-relaxed line-clamp-3">
                  "{r.text}"
                </p>
              </div>
              <p className="text-[12px] font-bold text-foreground mt-2">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog System Guides - Premium Editorial Cards */}
      <section className="space-y-6 px-4 sm:px-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-foreground">Latest Guides</h2>
            <p className="text-[12px] text-muted-foreground mt-0.5">Master personal finance, tax exemptions and planning</p>
          </div>
          <Link to="/blog" className="text-[13px] font-bold text-primary hover:underline shrink-0">
            All Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogs.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card rounded-[20px] border border-border/85 hover:border-primary/40 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col min-h-[380px] text-left"
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden relative bg-secondary shrink-0">
                <img
                  src={getBlogImage(post.cluster)}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-350"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider bg-background/90 text-primary px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                  {post.cluster}
                </span>
              </div>

              {/* Editorial Description Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-[18px] sm:text-[20px] font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="text-[12px] text-muted-foreground pt-3 border-t border-border/40 flex justify-between items-center shrink-0">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">⏱️ {post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AdSense Placement */}
      <div className="px-4 sm:px-5">
        <AdSensePlaceholder type="leaderboard" slot="2001" />
        <AdSensePlaceholder type="mobile-banner" slot="2002" />
      </div>

      {/* FAQ Accordion */}
      <section className="px-4 sm:px-5">
        <FAQSection items={homeFaq} />
      </section>
    </div>
  );
};

export default Index;
