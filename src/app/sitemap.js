import { allowIndexing, siteUrl } from "@/data/seo";

// Empty while indexing is blocked, so a staging build never advertises its URLs.
export default function sitemap() {
  if (!allowIndexing) return [];
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
