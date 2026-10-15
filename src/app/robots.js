import { allowIndexing, siteUrl } from "@/data/seo";

export default function robots() {
  if (!allowIndexing) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
