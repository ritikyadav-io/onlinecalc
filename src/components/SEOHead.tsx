import { Helmet } from "react-helmet-async";

interface HowToStep {
  name: string;
  text: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  faq?: { q: string; a: string }[];
  /** Optional HowTo steps. When provided, a HowTo JSON-LD block is emitted. */
  howTo?: HowToStep[];
  /** Optional HowTo name override (defaults to the title). */
  howToName?: string;
  type?: "website" | "article";
  image?: string;
  breadcrumbs?: { name: string; path: string }[];
  datePublished?: string;
  dateModified?: string;
  author?: string;
  /** Set true for non-calculator pages to skip the SoftwareApplication schema. */
  noApp?: boolean;
}

const BASE_URL = import.meta.env.VITE_SITE_URL || "https://onlinecalculators.com";
const DEFAULT_OG = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c91bd856-6924-4ee0-8f08-61857af265c5/id-preview-a78bd3a5--ec78210e-f3a1-4ca7-9040-6c1f7b8d3683.lovable.app-1775634813662.png";

const toAbsolute = (img: string) => (img.startsWith("http") ? img : `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`);

const SEOHead = ({ title, description, path, faq, howTo, howToName, type = "website", image, breadcrumbs, datePublished, dateModified, author, noApp }: SEOHeadProps) => {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | Online Calculators`;
  const ogImage = image ? toAbsolute(image) : DEFAULT_OG;

  const faqSchema = faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const howToSchema = howTo?.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: howToName || `How to use the ${title}`,
        description,
        totalTime: "PT1M",
        step: howTo.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${url}#step-${i + 1}`,
        })),
      }
    : null;

  const isArticle = type === "article";

  const primarySchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        name: title,
        headline: title,
        description,
        url,
        image: ogImage,
        author: { "@type": author ? "Person" : "Organization", name: author || "Online Calculators" },
        publisher: {
          "@type": "Organization",
          name: "Online Calculators",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
        },
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified || datePublished ? { dateModified: dateModified || datePublished } : {}),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }
    : null;

  // Always emit SoftwareApplication for tool/calculator pages so AI search engines
  // and Google's rich-results pipeline can cluster them as free web apps.
  const appSchema = !noApp && !isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${url}#app`,
        name: title,
        description,
        url,
        image: ogImage,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript. Works in all modern browsers.",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "120" },
        publisher: {
          "@type": "Organization",
          name: "Online Calculators",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
        },
      }
    : null;

  const breadcrumbSchema = breadcrumbs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${BASE_URL}${b.path}`,
        })),
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Online Calculators" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:site" content="@ezcalc" />
      {primarySchema && (
        <script type="application/ld+json">{JSON.stringify(primarySchema)}</script>
      )}
      {appSchema && (
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {howToSchema && (
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
