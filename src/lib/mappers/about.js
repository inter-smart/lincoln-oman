import { GET_ENDPOINTS } from "../constants/api.js";
import { ABOUT_INFO_MEDIA, ABOUT_LABELS } from "../constants/about.js";
import { htmlMetaTags, htmlToText } from "./html.js";
import { mapModels, mapNews, need as needFrom } from "./shared.js";

// Turns the PHP about-us response into the shape the about page sections read.
// There is no static fallback: a missing block throws.

const SOURCE = { endpoint: GET_ENDPOINTS.ABOUT, label: "About" };
const need = (value, path) => needFrom(SOURCE, value, path);

export function mapAbout(payload) {
  const cms = need(payload?.about_cms, "about_cms");
  const section = (key) => need(cms[key], `about_cms.${key}`);
  const banner = need(payload.banner, "banner");

  

  const legacy = section("section_one");
  const info = section("section_two");
  const commitment = section("section_four");

  return {
    banner: {
      title: banner.banner_title,
      media: {
        url: need(banner.banner, "banner.banner"),
        alternativeText: banner.banner_alt_text ?? banner.banner_title,
      },
    },
    legacy: {
      title: legacy.title,
      text: htmlToText(legacy.description),
      cta: ABOUT_LABELS.LEGACY_CTA,
    },
    info: {
      title: info.title,
      description: htmlToText(info.description),
      media: {
        type: ABOUT_INFO_MEDIA,
        url: need(info.video, "about_cms.section_two.video"),
      },
    },
    models: mapModels(
      section("section_three").title,
      need(payload.featured_models, "featured_models"),
    ),
    commitment: {
      title: commitment.title,
      description: htmlToText(commitment.description),
      media: {
        url: need(commitment.image, "about_cms.section_four.image"),
        alternativeText: commitment.title,
      },
    },
    news: mapNews(
      SOURCE,
      section("section_five").title,
      need(payload.news, "news"),
    ),
    seo: {
      title: banner.meta_title ?? null,
      description: banner.meta_description ?? null,
      keywords: banner.meta_keywords ?? null,
      otherMetaTags: htmlMetaTags(banner.other_meta_tags),
    },
  };
}
