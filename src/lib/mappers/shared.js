import { ApiError } from "../api/request.js";
import {
  CMS_PATH_ALIASES,
  HOME_LABELS,
  MODEL_CARD_POSITION,
  MONTHS,
  NEWS_CARD_POSITION,
  SPEC_ICON_SIZE,
} from "../constants/home.js";
import { ROUTES } from "../constants/routes.js";

// Mapping pieces the home and about responses have in common. `source` is
// { endpoint, label } (e.g. { endpoint: GET_ENDPOINTS.HOME, label: "Home" }) and only names the page in errors.

export function fail(source, message) {
  return new ApiError(`${source.label} API ${message}`, {
    status: 502,
    endpoint: source.endpoint,
  });
}

export function need(source, value, path) {
  if (value === undefined || value === null) {
    throw fail(source, `response is missing "${path}"`);
  }
  return value;
}

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Absolute links pass through; relative ones the CMS spelled differently from our routes are corrected.
export const link = (href) => CMS_PATH_ALIASES[href] ?? href;

export const cta = (label, href) => ({ label, href: link(href) });

// "27 Oct 2026" -> { date: "27.10.2026", datetime: "2026-10-27" }, without Date so the day never shifts with timezone.
function parsePublishedOn(source, value) {
  const match = /^(\d{1,2})\s+([A-Za-z]{3})[A-Za-z]*\s+(\d{4})$/.exec(
    String(value).trim(),
  );
  const month = match && MONTHS[match[2].toLowerCase()];
  if (!month) throw fail(source, `news has an unreadable date "${value}"`);
  const day = match[1].padStart(2, "0");
  return {
    date: `${day}.${month}.${match[3]}`,
    datetime: `${match[3]}-${month}-${day}`,
  };
}

export function mapModels(title, list) {
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

export function mapNews(source, title, list) {
  return {
    title,
    more: { label: HOME_LABELS.VIEW_MORE, href: ROUTES.NEWSROOM },
    readMore: HOME_LABELS.READ_MORE,
    items: list.map((item) => ({
      id: String(item.id),
      title: item.title,
      href: ROUTES.NEWS_DETAIL(item.slug),
      image: need(source, item.media, `news[${item.id}].media`).image,
      position: NEWS_CARD_POSITION,
      ...parsePublishedOn(source, item.published_on),
    })),
  };
}
