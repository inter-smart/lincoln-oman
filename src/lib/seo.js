import { siteUrl } from "@/data/seo";

// Page metadata from the API banner block (meta_title, meta_description, meta_keywords). A null field passes through.
// `path` is the page's own route ("/", "/about"); it becomes the absolute canonical and og:url.
export function buildMetadata({ title, description, keywords }, path) {
  const url = new URL(path, siteUrl).href;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Lincoln Oman",
      locale: "en_OM",
      url,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
