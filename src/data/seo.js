// NEXT_PUBLIC_SITE_URL is required (live domain): canonical, OG, sitemap and robots read it.
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not set");
}
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Only the live deployment (NEXT_PUBLIC_APP_ENV=production) may be indexed.
export const allowIndexing = process.env.NEXT_PUBLIC_APP_ENV === "production";
