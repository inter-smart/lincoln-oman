// Pure (no server-only, no @/ imports) so node --test can run it.
// Only the query params a page reads (plus campaign tracking) are allowed; proxy.js redirects the rest away.
import { localeFromPath } from "../i18n/config.js";

// Next's RSC cache key and the ad / analytics click ids.
const anyRoute = new Set([
  "_rsc",
  "_gl",
  "dclid",
  "fbclid",
  "gad_campaignid",
  "gad_source",
  "gbraid",
  "gclid",
  "li_fat_id",
  "mc_cid",
  "mc_eid",
  "msclkid",
  "srsltid",
  "ttclid",
  "twclid",
  "wbraid",
]);

// Keyed by path without the language. A page that starts reading `searchParams` must be added here.
const byRoute = new Map([
  ["/gallery", new Set(["page"])],
  ["/special-offers", new Set(["location", "location_id", "page"])],
]);

/** The allowed part of the query, or null when nothing has to be removed. */
export function cleanQuery(pathname, searchParams) {
  const path = localeFromPath(pathname)
    ? pathname.replace(/^\/[^/]+/, "")
    : pathname;
  const own = byRoute.get(path);
  const all = [...searchParams];
  const kept = all.filter(
    ([key]) => key.startsWith("utm_") || anyRoute.has(key) || own?.has(key),
  );
  return kept.length === all.length ? null : new URLSearchParams(kept);
}
