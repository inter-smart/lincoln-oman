import { allowIndexing, siteUrl } from "@/data/seo";
import { locales } from "@/i18n/config";

// Empty while indexing is blocked, so a staging build never advertises its URLs.
export default function sitemap() {
  if (!allowIndexing) return [];
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])),
    },
  }));
}
