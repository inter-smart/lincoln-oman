// Every API path lives here — services and actions never write a path or URL themselves.
// Read (GET) and write (POST) endpoints are kept apart; each has its own function in src/lib/api.
// ponytail: the paths below are placeholders until the PHP team confirms the real endpoints.
export const GET_ENDPOINTS = {
  SITE_SETTINGS: "/site-settings",
  HOME: "/pages/home",
  ABOUT: "/pages/about",
  CERTIFIED: "/pages/lincoln-certified",
  OWNERS: "/pages/owners",
  GALLERY: "/pages/gallery",
  CONTACT: "/pages/contact-us",
  OFFERS_LIST: "/special-offers",
  OFFER_DETAIL: (slug) => `/special-offers/${slug}`,
  NEWS_LIST: "/newsroom",
  NEWS_DETAIL: (slug) => `/newsroom/${slug}`,
  VEHICLES_LIST: "/vehicles",
  VEHICLE_DETAIL: (slug) => `/vehicles/${slug}`,
  LEGAL: (slug) => `/legal/${slug}`,
};

export const POST_ENDPOINTS = {
  FORM_CONTACT: "/forms/contact",
  FORM_QUOTE: "/forms/request-a-quote",
  FORM_TEST_DRIVE: "/forms/book-a-test-drive",
  FORM_ENQUIRY: "/forms/enquiry",
};

export const HTTP_METHODS = { GET: "GET", POST: "POST" };

// One permanent bearer token is sent on every request (CMS_API_TOKEN, server-only).
export const AUTH = { HEADER: "Authorization", SCHEME: "Bearer" };

export const API_TIMEOUT_MS = 8000;

// Key the PHP response wraps its payload in. Set to null if it returns the bare object.
export const API_ENVELOPE_KEY = "data";
