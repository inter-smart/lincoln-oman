import { GET_ENDPOINTS } from "../constants/api.js";
import {
  HOME_LABELS,
  SHOWCASE_MEDIA,
  SHOWCASE_PANEL_ORDER,
} from "../constants/home.js";
import { htmlListItems, htmlMetaTags, htmlParagraphs, htmlToText } from "./html.js";
import {
  cta,
  fail,
  link,
  mapModels,
  mapNews,
  need as needFrom,
  slugify,
} from "./shared.js";

// Turns the PHP home response into the shape the home section components read (src/data/home.js).
// There is no static fallback: a missing block throws.

const SOURCE = { endpoint: GET_ENDPOINTS.HOME, label: "Home" };
const need = (value, path) => needFrom(SOURCE, value, path);

function mapHeroMedia(slide) {
  const file = (field) => need(slide[field], `sliders[${slide.id}].${field}`);

  switch (slide.media_type) {
    case "video":
      return {
        type: "video",
        url: file("video"),
        poster: slide.video_thumbnail_image ?? undefined,
      };
    case "image":
      return {
        type: "image",
        url: file("image"),
        alt: slide.image_alt_text ?? "",
      };
    default:
      throw fail(
        SOURCE,
        `slider ${slide.id} has an unknown media_type "${slide.media_type}"`,
      );
  }
}

function mapHero(sliders) {
  return {
    title: HOME_LABELS.HERO,
    items: sliders.map((slide) => ({
      id: String(slide.id),
      title: slide.title,
      media: mapHeroMedia(slide),
      cta: cta(slide.action_title, slide.action_url),
    })),
  };
}

function mapShowcase(key, section) {
  const panels = {
    [SHOWCASE_MEDIA.IMAGE]: {
      id: `${key}-image`,
      image: section.image,
      alt: section.alt_tag,
    },
    // The API has no poster for the video panel, so the card photo stands in.
    [SHOWCASE_MEDIA.VIDEO]: {
      id: `${key}-video`,
      video: section.video,
      poster: section.image,
    },
  };
  return {
    title: section.title,
    subtitle: section.subtitle,
    text: htmlToText(section.description),
    word: section.banner_title,
    background: section.banner_image,
    video: section.video,
    media: SHOWCASE_PANEL_ORDER[key].map((type) => panels[type]),
  };
}

function mapOffer(section) {
  const [text, note] = htmlParagraphs(section.description);
  return {
    title: section.title,
    text,
    note,
    image: { src: section.image, alt: section.alt_tag },
    actions: [
      {
        id: "primary",
        label: section.button_one_title,
        href: link(section.button_one_link),
      },
      {
        id: "secondary",
        label: section.button_two_title,
        href: link(section.button_two_link),
      },
    ].filter((action) => action.label),
  };
}

function mapOwnership(section) {
  return {
    title: section.title,
    items: htmlListItems(section.description).map((label) => ({
      id: slugify(label),
      label,
    })),
    cta: cta(section.button_title, section.button_link),
    image: { src: section.image, alt: section.alt_tag },
  };
}

export function mapHome(payload) {
  const cms = need(payload?.home_cms, "home_cms");
  const section = (key) => need(cms[key], `home_cms.${key}`);

  const legacy = section("section_two");

  return {
    hero: mapHero(need(payload.sliders, "sliders")),
    models: mapModels(
      section("section_one").title,
      need(payload.explore_lincoln_line, "explore_lincoln_line"),
    ),
    legacy: {
      title: legacy.title,
      text: htmlToText(legacy.description),
      cta: cta(legacy.button_name, legacy.link),
    },
    continental: mapShowcase("section_three", section("section_three")),
    navigator: mapShowcase("section_four", section("section_four")),
    offer: mapOffer(section("section_five")),
    ownership: mapOwnership(section("section_six")),
    news: mapNews(
      SOURCE,
      section("section_seven").title,
      need(payload.news, "news"),
    ),
    seo: {
      title: payload.banner?.meta_title ?? null,
      description: payload.banner?.meta_description ?? null,
      keywords: payload.banner?.meta_keywords ?? null,
      otherMetaTags: htmlMetaTags(payload.banner?.other_meta_tags),
    },
  };
}
