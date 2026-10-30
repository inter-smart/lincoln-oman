import { siteUrl } from "@/data/seo";
import { metadataFromTags } from "./meta-tags";

// Page metadata from the API banner block (meta_title, meta_description, meta_keywords, other_meta_tags). A null field passes through.
// `otherMetaTags` is the CMS's raw HTML string; metadataFromTags maps what Next can render (name= metas, og/twitter images, og:locale, hreflang).
// The tags Next can't write (property=, itemprop, http-equiv, media) are rendered by <MetaTags> in the page.
// `path` is the page's own route ("/", "/about"); it becomes the absolute canonical and og:url.
export function buildMetadata(
  { title, description, keywords, otherMetaTags },
  path,
) {
  const url = new URL(path, siteUrl).href;
  const { other, openGraph, twitter, languages } =
    metadataFromTags(otherMetaTags);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url, ...(languages && { languages }) },
    openGraph: {
      type: "website",
      siteName: "Lincoln Oman",
      locale: "en_OM",
      url,
      title,
      description,
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title, description, ...twitter },
    ...(other && { other }),
  };
}
