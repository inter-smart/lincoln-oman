// ponytail: set NEXT_PUBLIC_SITE_URL to the live domain before launch — canonical, OG, sitemap and robots read it.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Crawling and indexing stay blocked (robots.txt, meta robots, X-Robots-Tag) unless the
// deployment explicitly opts in with NEXT_PUBLIC_ALLOW_INDEXING=true — i.e. only on the live site.
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// Site-wide defaults; pages fall back to these when the CMS leaves a meta field empty.
export const defaultTitle = "Lincoln Oman — Arabian Car Marketing";
export const defaultDescription =
  "Explore the Lincoln line-up — Navigator, Aviator, Corsair and Nautilus — with ownership, offers and news from Arabian Car Marketing, Muscat.";
