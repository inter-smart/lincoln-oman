import { GET_ENDPOINTS } from "../constants/api.js";
import {
  CMS_PATH_ALIASES,
  HOME_LABELS,
  MODEL_CARD_POSITION,
  MONTHS,
  NEWS_CARD_POSITION,
  SHOWCASE_MEDIA,
  SHOWCASE_PANEL_ORDER,
  SPEC_ICON_SIZE,
} from "../constants/home.js";
import { ROUTES } from "../constants/routes.js";
import { ApiError } from "../api/request.js";
import { htmlListItems, htmlParagraphs, htmlToText } from "./html.js";

// Turns the PHP home response into the shape the home section components read (src/data/home.js).
// There is no static fallback: a missing block throws.

function need(value, path) {
  if (value === undefined || value === null) {
    throw new ApiError(`Home API response is missing "${path}"`, {
      status: 502,
      endpoint: GET_ENDPOINTS.HOME,
    });
  }
  return value;
}

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Absolute links pass through; relative ones the CMS spelled differently from our routes are corrected.
const link = (href) => CMS_PATH_ALIASES[href] ?? href;

const cta = (label, href) => ({ label, href: link(href) });

// "27 Oct 2026" -> { date: "27.10.2026", datetime: "2026-10-27" }, without Date so the day never shifts with timezone.
function parsePublishedOn(value) {
  const match = /^(\d{1,2})\s+([A-Za-z]{3})[A-Za-z]*\s+(\d{4})$/.exec(
    String(value).trim(),
  );
  const month = match && MONTHS[match[2].toLowerCase()];
  if (!month) {
    throw new ApiError(`Home API news has an unreadable date "${value}"`, {
      status: 502,
      endpoint: GET_ENDPOINTS.HOME,
    });
  }
  const day = match[1].padStart(2, "0");
  return {
    date: `${day}.${month}.${match[3]}`,
    datetime: `${match[3]}-${month}-${day}`,
  };
}

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
      throw new ApiError(
        `Home API slider ${slide.id} has an unknown media_type "${slide.media_type}"`,
        { status: 502, endpoint: GET_ENDPOINTS.HOME },
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

function mapModels(title, list) {
  return {
    title,
    items: list.map((model) => ({
      id: model.slug,
      name: model.name,
      href: ROUTES.VEHICLE_DETAIL(model.slug),
      video: model.video,
      image: model.image,
      position: MODEL_CARD_POSITION,
      specs: (model.features ?? []).map((feature) => ({
        id: slugify(feature.title),
        label: feature.title,
        icon: { src: feature.icon, ...SPEC_ICON_SIZE },
      })),
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

function mapNews(title, list) {
  return {
    title,
    more: { label: HOME_LABELS.VIEW_MORE, href: ROUTES.NEWSROOM },
    readMore: HOME_LABELS.READ_MORE,
    items: list.map((item) => ({
      id: String(item.id),
      title: item.title,
      href: ROUTES.NEWS_DETAIL(item.slug),
      image: need(item.media, `news[${item.id}].media`).image,
      position: NEWS_CARD_POSITION,
      ...parsePublishedOn(item.published_on),
    })),
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
    news: mapNews(section("section_seven").title, need(payload.news, "news")),
    seo: {
      title: payload.banner?.meta_title ?? null,
      description: payload.banner?.meta_description ?? null,
      keywords: payload.banner?.meta_keywords ?? null,
    },
  };
}
