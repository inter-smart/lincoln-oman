import { siteUrl } from "@/data/seo";
import { defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { currentLocale } from "./api/locale";
import { metadataFromTags } from "./meta-tags";

const ogLocale = { en: "en_OM", ar: "ar_OM" };

const urlFor = (path, locale) =>
  new URL(`/${locale}${path === "/" ? "" : path}`, siteUrl).href;

// Page metadata from the API banner block (meta_title, meta_description, meta_keywords, other_meta_tags). A null field passes through.
// `otherMetaTags` is the CMS's raw HTML string; metadataFromTags maps what Next can render (name= metas, og:*, twitter:*, hreflang).
// The CMS's og:* and twitter:* values replace the defaults below; a tag the CMS doesn't send keeps the default.
// The tags Next can't write (property=, itemprop, http-equiv, media) are rendered by <MetaTags> in the page.
// `path` is the page's own route without the language ("/", "/about"); it becomes the absolute, language-prefixed
// canonical and og:url, plus an hreflang alternate for every language.
export async function buildMetadata(
  { title, description, keywords, otherMetaTags },
  path,
) {
  const locale = await currentLocale();
  const { common } = await getDictionary(locale);
  const url = urlFor(path, locale);
  const { other, openGraph, twitter, languages } =
    metadataFromTags(otherMetaTags);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        ...Object.fromEntries(locales.map((l) => [l, urlFor(path, l)])),
        "x-default": urlFor(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      siteName: common.siteName,
      locale: ogLocale[locale],
      url,
      title,
      description,
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title, description, ...twitter },
    ...(other && { other }),
  };
}
