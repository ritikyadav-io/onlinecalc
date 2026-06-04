import { useParams, useNavigate, Link } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import FAQSection from "@/components/FAQSection";
import RelatedArticles from "@/components/RelatedArticles";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";

// Lightweight markdown renderer for our controlled blog content (headings, lists, blockquotes, tables, links, bold)
const renderMarkdown = (md: string) => {
  const lines = md.trim().split("\n");
  const out: JSX.Element[] = [];
  let listBuf: string[] = [];
  let tableBuf: string[] = [];

  const inline = (text: string) => {
    // links [text](url)
    const parts: (string | JSX.Element)[] = [];
    let rest = text;
    let key = 0;
    const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
    while (true) {
      const m = rest.match(linkRe);
      if (!m) break;
      const before = rest.slice(0, m.index);
      parts.push(before);
      const [, label, href] = m;
      const isInternal = href.startsWith("/");
      parts.push(
        isInternal ? (
          <Link key={`l${key++}`} to={href} className="text-primary font-semibold underline underline-offset-2">
            {label}
          </Link>
        ) : (
          <a key={`l${key++}`} href={href} className="text-primary font-semibold underline underline-offset-2" target="_blank" rel="noopener">
            {label}
          </a>
        )
      );
      rest = rest.slice((m.index ?? 0) + m[0].length);
    }
    parts.push(rest);
    // bold **
    return parts.map((p, i) =>
      typeof p === "string"
        ? p.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
            seg.startsWith("**") && seg.endsWith("**") ? (
              <strong key={`b${i}-${j}`} className="font-bold text-foreground">{seg.slice(2, -2)}</strong>
            ) : (
              <span key={`s${i}-${j}`}>{seg}</span>
            )
          )
        : p
    );
  };

  const flushList = () => {
    if (!listBuf.length) return;
    out.push(
      <ul key={`ul${out.length}`} className="list-disc pl-6 space-y-1.5 text-base text-muted-foreground leading-relaxed">
        {listBuf.map((l, i) => <li key={i}>{inline(l.replace(/^[-*]\s+/, ""))}</li>)}
      </ul>
    );
    listBuf = [];
  };

  const flushTable = () => {
    if (!tableBuf.length) return;
    const rows = tableBuf.filter((r) => !/^\|\s*-/.test(r)).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
    const [head, ...body] = rows;
    out.push(
      <div key={`t${out.length}`} className="overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg">
          <thead className="bg-muted">
            <tr>{head.map((h, i) => <th key={i} className="text-left p-2 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {body.map((r, i) => (
              <tr key={i} className="border-t border-border">
                {r.map((c, j) => <td key={j} className="p-2 text-muted-foreground">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuf = [];
  };

  for (const raw of lines) {
    const line = raw;
    if (/^\|.*\|$/.test(line.trim())) { flushList(); tableBuf.push(line.trim()); continue; }
    if (tableBuf.length) flushTable();
    if (/^\s*$/.test(line)) { flushList(); continue; }
    if (line.startsWith("## ")) { flushList(); out.push(<h2 key={out.length} className="text-2xl font-bold text-foreground mt-8 mb-2">{inline(line.slice(3))}</h2>); continue; }
    if (line.startsWith("### ")) { flushList(); out.push(<h3 key={out.length} className="text-xl font-bold text-foreground mt-5 mb-2">{inline(line.slice(4))}</h3>); continue; }
    if (line.startsWith("> ")) { flushList(); out.push(<blockquote key={out.length} className="border-l-4 border-primary bg-primary/5 px-4 py-2 italic text-foreground rounded">{inline(line.slice(2))}</blockquote>); continue; }
    if (/^[-*]\s+/.test(line)) { listBuf.push(line); continue; }
    flushList();
    out.push(<p key={out.length} className="text-base text-muted-foreground leading-relaxed">{inline(line)}</p>);
  }
  flushList();
  flushTable();
  return out;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="page-container max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
        <button onClick={() => navigate("/blog")} className="text-primary mt-3 font-semibold">Back to blog</button>
      </div>
    );
  }

  const related = getRelatedBlogs(post.related);

  return (
    <article className="page-container max-w-3xl mx-auto animate-fade-up px-4 py-6 space-y-5">
      <SEOHead
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        faq={post.faq}
        type="article"
        image={`/og/${post.cluster}.svg`}
        datePublished={new Date(post.date).toISOString()}
        author="Online Calculators Editorial"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <button onClick={() => navigate("/blog")} className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
        <ArrowLeft size={14} /> All articles
      </button>

      <header className="space-y-2">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock size={14} /> {post.readTime} · {post.date}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.description}</p>
      </header>

      <AdSensePlaceholder type="leaderboard" slot="1001" />
      <AdSensePlaceholder type="mobile-banner" slot="1002" />

      <div className="space-y-3">{renderMarkdown(post.content)}</div>

      <AdSensePlaceholder type="rectangle" slot="1003" />

      {post.toolLinks.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mt-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Try the Tools</p>
          <div className="flex flex-wrap gap-2">
            {post.toolLinks.map((t) => (
              <Link key={t.to} to={t.to} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
                {t.label} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sitewide High-Value Calculator Interlinks */}
      <div className="bg-secondary/40 border border-border/80 rounded-2xl p-5 mt-6 space-y-3">
        <p className="text-sm font-extrabold uppercase tracking-wider text-foreground">Popular Free Tools</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: "EMI Calculator", to: "/emi-calculator" },
            { label: "SIP Calculator", to: "/sip-calculator" },
            { label: "GST Calculator", to: "/gst-calculator" },
            { label: "Income Tax Calculator", to: "/income-tax-calculator" },
            { label: "BMI Calculator", to: "/bmi-calculator" },
            { label: "All Tools", to: "/more" },
          ].map((t) => (
            <Link key={t.to} to={t.to} className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/40 text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/20 transition-all">
              <span>{t.label}</span>
              <span>→</span>
            </Link>
          ))}
        </div>
      </div>

      <FAQSection items={post.faq} />

      {related.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">More Reading</p>
          <div className="space-y-2">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="block bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow">
                <p className="text-base font-bold text-foreground">{r.title}</p>
                <p className="text-sm text-muted-foreground">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <RelatedArticles cluster={post.cluster} />
    </article>
  );
};

export default BlogPost;
