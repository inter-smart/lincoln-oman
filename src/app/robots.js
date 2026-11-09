import { allowIndexing, siteUrl } from "@/data/seo";
import { locales } from "@/i18n/config";

export default function robots() {
  if (!allowIndexing) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: locales.map((locale) => `${siteUrl}/${locale}/sitemap.xml`),
  };
}
