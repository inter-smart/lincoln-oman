import { NextResponse } from "next/server";
import {
  defaultLocale,
  hasLocale,
  localeCookie,
  localeFromPath,
  negotiateLocale,
} from "@/i18n/config";

// Unprefixed URLs (/about) redirect to the visitor's language (/en/about):
// saved choice (cookie), then Accept-Language, then the default.
export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (localeFromPath(pathname)) return;

  const saved = request.cookies.get(localeCookie)?.value;
  const locale = hasLocale(saved)
    ? saved
    : (negotiateLocale(request.headers.get("accept-language")) ??
      defaultLocale);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any file with an extension (images, videos, robots.txt, sitemap.xml, icons).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
