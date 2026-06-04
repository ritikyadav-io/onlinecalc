import { Helmet } from "react-helmet-async";
import { BookOpen } from "lucide-react";
import { blogs } from "@/lib/blogs";

interface RelatedArticlesProps {
  cluster?: "loans" | "investments" | "tax" | "health" | "salary";
  count?: number;
}

const SITE = import.meta.env.VITE_SITE_URL || "https://onlinecalculators.com";

const RelatedArticles = ({ cluster, count = 3 }: RelatedArticlesProps) => {
  const pool = cluster ? blogs.filter((b) => b.cluster === cluster) : blogs;
  const picks = (pool.length ? pool : blogs).slice(0, count);

  // ItemList schema clusters the related articles for AI/search engines.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cluster ? `Related ${cluster} articles` : "Related articles",
    itemListElement: picks.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/blog/${b.slug}`,
      item: {
        "@type": "Article",
        "@id": `${SITE}/blog/${b.slug}#article`,
        headline: b.title,
        description: b.description,
        datePublished: b.date,
        url: `${SITE}/blog/${b.slug}`,
        articleSection: b.cluster,
        keywords: b.keyword,
      },
    })),
  };

  return (
    <section className="mt-6 pt-6 border-t border-border" aria-label="Related articles">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>
      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">
        Related Articles
      </p>
      <div className="space-y-2">
        {picks.map((b) => (
          <article
            key={b.slug}
            itemScope
            itemType="https://schema.org/Article"
            className="bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
          >
            <meta itemProp="datePublished" content={b.date} />
            <meta itemProp="articleSection" content={b.cluster} />
            <meta itemProp="keywords" content={b.keyword} />
            <a
              href={`/blog/${b.slug}`}
              itemProp="url"
              className="w-full flex items-start gap-3 p-4 text-left"
            >
              <BookOpen size={18} className="text-primary mt-0.5 shrink-0" aria-hidden />
              <div className="min-w-0">
                <h3 itemProp="headline" className="text-base font-semibold text-foreground">
                  {b.title}
                </h3>
                <p itemProp="description" className="text-sm text-muted-foreground line-clamp-2">
                  {b.description}
                </p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
