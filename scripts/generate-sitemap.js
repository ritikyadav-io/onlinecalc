import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.VITE_SITE_URL || "https://onlinecalculators.com";
const PUBLIC_DIR = path.resolve('public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 1. Static and Calculator Routes
const staticRoutes = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: '/more', priority: 0.8, changefreq: 'weekly' },
  // Primary calculators
  { path: '/emi-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/age-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/sip-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/bmi-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/gratuity-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/gst-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/percentage-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/loan-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/rent-vs-buy-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/fd-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/ppf-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/calorie-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/compound-interest-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/salary-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/ovulation-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/income-tax-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/tip-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/discount-calculator', priority: 0.9, changefreq: 'weekly' },
  { path: '/hra-calculator', priority: 0.9, changefreq: 'weekly' },
  // Supporting student tools
  { path: '/attendance-tracker', priority: 0.8, changefreq: 'weekly' },
  { path: '/cgpa-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/required-marks-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/marksheet', priority: 0.8, changefreq: 'weekly' },
  { path: '/marks-analyzer', priority: 0.8, changefreq: 'weekly' },
  { path: '/expense-tracker', priority: 0.8, changefreq: 'weekly' },
  { path: '/weekly-report', priority: 0.8, changefreq: 'weekly' },
  { path: '/backlog-planner', priority: 0.8, changefreq: 'weekly' },
  { path: '/bunk-tool', priority: 0.8, changefreq: 'weekly' },
  { path: '/document-reader', priority: 0.8, changefreq: 'weekly' },
  // Static pages
  { path: '/about', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' },
  { path: '/dashboard', priority: 0.6, changefreq: 'weekly' },
  { path: '/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/disclaimer', priority: 0.5, changefreq: 'monthly' },
  { path: '/glossary', priority: 0.7, changefreq: 'weekly' },
  // Programmatic SEO variants
  { path: '/aktu-cgpa-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/vtu-cgpa-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/engineering-cgpa-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/college-attendance-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/how-many-classes-can-i-miss-calculator', priority: 0.8, changefreq: 'weekly' },
  { path: '/semester-percentage-calculator', priority: 0.8, changefreq: 'weekly' },
  // Blog directory & categories
  { path: '/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/blog/category/loans', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/investments', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/tax', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/health', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/category/salary', priority: 0.7, changefreq: 'weekly' },
];

// 2. Extract Blog Post slugs
const blogFile = path.resolve('src/lib/blogs.ts');
let blogSlugs = [];

if (fs.existsSync(blogFile)) {
  const content = fs.readFileSync(blogFile, 'utf8');
  // Match slug: "..." or slug: '...'
  const regex = /slug:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    blogSlugs.push(match[1]);
  }
}

// Remove duplicates
blogSlugs = Array.from(new Set(blogSlugs));
console.log(`Extracted ${blogSlugs.length} blog slugs for sitemap.`);

// Add blog posts to routes list
const allRoutes = [
  ...staticRoutes,
  ...blogSlugs.map(slug => ({
    path: `/blog/${slug}`,
    priority: 0.8,
    changefreq: 'weekly'
  }))
];

// 3. Generate sitemap.xml
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

allRoutes.forEach(route => {
  xml += '  <url>\n';
  xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
console.log('Successfully generated public/sitemap.xml');

// 4. Generate robots.txt
let robots = 'User-agent: *\n';
robots += 'Allow: /\n';
robots += `Sitemap: ${SITE_URL}/sitemap.xml\n`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
console.log('Successfully generated public/robots.txt');
