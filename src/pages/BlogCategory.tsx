import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { Clock, ArrowRight, ArrowLeft, Wrench } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { blogs } from "@/lib/blogs";

const clusterMeta: Record<string, { label: string; title: string; description: string; tools: { label: string; to: string }[] }> = {
  loans: {
    label: "Loans & EMI",
    title: "Loan & EMI Guides",
    description: "Master EMI math, slash interest, and choose the right loan with proven tactics.",
    tools: [
      { label: "EMI Calculator", to: "/emi-calculator" },
      { label: "Loan Calculator", to: "/loan-calculator" },
      { label: "Rent vs Buy", to: "/rent-vs-buy-calculator" },
    ],
  },
  investments: {
    label: "Investments & Savings",
    title: "Investment & Savings Guides",
    description: "SIP, FD, PPF, compound interest — pick the right vehicle and project growth instantly.",
    tools: [
      { label: "SIP Calculator", to: "/sip-calculator" },
      { label: "FD Calculator", to: "/fd-calculator" },
      { label: "PPF Calculator", to: "/ppf-calculator" },
      { label: "Compound Interest", to: "/compound-interest-calculator" },
    ],
  },
  tax: {
    label: "Tax & GST",
    title: "Tax & GST Guides",
    description: "GST calculation, regime selection, and 80C planning made simple.",
    tools: [
      { label: "GST Calculator", to: "/gst-calculator" },
      { label: "Percentage Calculator", to: "/percentage-calculator" },
      { label: "Salary In-hand", to: "/salary-calculator" },
    ],
  },
  health: {
    label: "Health Calculators",
    title: "Health & Wellness Calculators",
    description: "BMI, calorie needs, ovulation — health planning backed by science and free tools.",
    tools: [
      { label: "BMI Calculator", to: "/bmi-calculator" },
      { label: "Calorie Calculator", to: "/calorie-calculator" },
      { label: "Ovulation Calculator", to: "/ovulation-calculator" },
      { label: "Age Calculator", to: "/age-calculator" },
    ],
  },
  salary: {
    label: "Salary & Gratuity",
    title: "Salary & Gratuity Guides",
    description: "From CTC breakdown to gratuity payout — know every rupee you earn.",
    tools: [
      { label: "Salary In-hand", to: "/salary-calculator" },
      { label: "Gratuity Calculator", to: "/gratuity-calculator" },
    ],
  },
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

const BlogCategory = () => {
  const { cluster } = useParams<{ cluster: string }>();
  const navigate = useNavigate();
  const meta = cluster ? clusterMeta[cluster] : undefined;

  if (!meta) return <Navigate to="/blog" replace />;

  const posts = blogs.filter((b) => b.cluster === cluster);

  return (
    <div className="page-container max-w-4xl mx-auto px-3.5 py-6 space-y-8 animate-fade-up">
      <SEOHead
        title={`${meta.label} – ${meta.title}`}
        description={meta.description}
        path={`/blog/category/${cluster}`}
        image={`https://ezcalcpro.lovable.app/og/${cluster}.svg`}
      />

      <button onClick={() => navigate("/blog")} className="text-xs font-bold text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
        <ArrowLeft size={13} /> All categories
      </button>

      <header className="space-y-2 text-center sm:text-left max-w-2xl">
        <p className="text-[11px] font-extrabold text-primary uppercase tracking-wider">{meta.label}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{meta.title}</h1>
        <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed">{meta.description}</p>
      </header>

      <section className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
          <Wrench size={13} /> Related Tools
        </p>
        <div className="flex flex-wrap gap-2">
          {meta.tools.map((t) => (
            <Link key={t.to} to={t.to} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
              {t.label} →
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <h2 className="text-lg font-extrabold text-foreground tracking-tight">Articles ({posts.length})</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((b) => (
            <button
              key={b.slug}
              onClick={() => navigate(`/blog/${b.slug}`)}
              className="group text-left bg-card rounded-xl border border-border/80 hover:border-primary/30 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row min-h-[160px]"
            >
              {/* Thumbnail Image */}
              <div className="w-full sm:w-36 h-36 sm:h-auto overflow-hidden relative bg-secondary shrink-0">
                <img
                  src={getBlogImage(b.cluster)}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-350"
                  loading="lazy"
                />
              </div>
              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-primary">
                    {meta.label}
                  </span>
                  <h3 className="text-[14px] font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-[12px] text-muted-foreground leading-normal line-clamp-2">
                    {b.description}
                  </p>
                </div>
                <div className="text-[11px] text-muted-foreground pt-2 border-t border-border/40 flex justify-between items-center shrink-0">
                  <span>{b.date}</span>
                  <span className="flex items-center gap-1">⏱️ {b.readTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogCategory;
