// Page metadata from a mapper's `seo` block. The API can leave a field empty, so nulls pass through.
export function buildMetadata({ title, description, keywords }, path) {
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      siteName: "Lincoln Oman",
      locale: "en_OM",
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
