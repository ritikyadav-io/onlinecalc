import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { blogs } from "@/lib/blogs";

const clusterLabels: Record<string, string> = {
  loans: "Loans & EMI",
  investments: "Investments & Savings",
  tax: "Tax & GST",
  health: "Health Calculators",
  salary: "Salary & Gratuity",
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

const Blog = () => {
  const navigate = useNavigate();
  const clusters = Array.from(new Set(blogs.map((b) => b.cluster)));

  return (
    <div className="page-container max-w-4xl mx-auto space-y-10 animate-fade-up px-3.5 py-6">
      <SEOHead
        title="Student Blog - Tips on Attendance, CGPA, Study & Exams"
        description="Free guides for college students: attendance calculation, CGPA improvement, study plans, exam strategies, and productivity tips."
        path="/blog"
      />
      <header className="space-y-2 text-center sm:text-left max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Online Calculators Blog</h1>
        <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed">
          Honest, practical guides for college students — attendance, CGPA, study plans, exam strategy, and beating procrastination.
        </p>
      </header>

      {clusters.map((cluster) => (
        <section key={cluster} className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight">{clusterLabels[cluster]}</h2>
            <button
              onClick={() => navigate(`/blog/category/${cluster}`)}
              className="text-xs font-bold text-primary hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs
              .filter((b) => b.cluster === cluster)
              .map((b) => (
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
                        {clusterLabels[b.cluster]}
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
      ))}
    </div>
  );
};

export default Blog;
