import { NextResponse } from "next/server";
import {
  defaultLocale,
  hasLocale,
  localeCookie,
  localeFromPath,
  negotiateLocale,
} from "@/i18n/config";
import { cleanQuery } from "@/lib/clean-query";

// The saved choice (cookie), then Accept-Language, then the default.
function preferredLocale(request) {
  const saved = request.cookies.get(localeCookie)?.value;
  return hasLocale(saved)
    ? saved
    : (negotiateLocale(request.headers.get("accept-language")) ??
        defaultLocale);
}

// One redirect fixes both: unprefixed URLs (/about) go to the visitor's language (/en/about),
// and unused query params (?s=) are removed from page requests (POSTs are Server Actions: untouched).
export function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  const prefixed = localeFromPath(pathname);
  const query = ["GET", "HEAD"].includes(request.method)
    ? cleanQuery(pathname, searchParams)
    : null;
  if (prefixed && !query) return;

  const url = request.nextUrl.clone();
  if (query) url.search = query.toString();
  if (!prefixed) {
    url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  }
  // Adding the language depends on the visitor, so only the query-only redirect is permanent.
  return NextResponse.redirect(url, prefixed ? 308 : 307);
}

export const config = {
  // Skip Next internals and any file with an extension (images, videos, robots.txt, /{lang}/sitemap.xml, icons).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
