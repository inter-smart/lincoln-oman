// Site routes for breadcrumbs, canonicals, redirects and sitemap entries.
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  NEWSROOM: "/newsroom",
  NEWS_DETAIL: (slug) => `/newsroom/${slug}`,
  SPECIAL_OFFERS: "/special-offers",
  OFFER_DETAIL: (slug) => `/special-offers/${slug}`,
  VEHICLE_DETAIL: (slug) => `/vehicles/${slug}`,
  CONTACT: "/contact-us",
  QUOTE: "/request-a-quote",
  TEST_DRIVE: "/book-a-test-drive",
  TEST_DRIVE_THANK_YOU: "/book-a-test-drive/thank-you",
};
