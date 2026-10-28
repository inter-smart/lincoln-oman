import { ROUTES } from "./routes.js";

// Home values the PHP API does not send. The mapper reads them from here instead of hard-coding them.
export const HOME_LABELS = {
  VIEW_MORE: "View More",
  READ_MORE: "Read More",
};

// Object-position for cards whose crop the API does not describe.
export const MODEL_CARD_POSITION = "50% 50%";
export const NEWS_CARD_POSITION = "50% 50%";

// The API sends spec icons as bare URLs; next/image needs a size.
export const SPEC_ICON_SIZE = { width: 28, height: 28 };

// The API has one image and one video per showcase; the order of the two panels lives here.
export const SHOWCASE_MEDIA = { IMAGE: "image", VIDEO: "video" };
export const SHOWCASE_PANEL_ORDER = {
  section_three: [SHOWCASE_MEDIA.IMAGE, SHOWCASE_MEDIA.VIDEO],
  section_four: [SHOWCASE_MEDIA.VIDEO, SHOWCASE_MEDIA.IMAGE],
};

// Relative paths the CMS editors typed that differ from the site's real routes.
export const CMS_PATH_ALIASES = {
  "/contact": ROUTES.CONTACT,
};

// "27 Oct 2026" -> month number, for the dd.mm.yyyy label and the ISO datetime.
export const MONTHS = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};
