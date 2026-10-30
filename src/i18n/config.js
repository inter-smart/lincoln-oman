// Pure (no server-only, no @/ imports) so node --test can run it.
export const locales = ["en", "ar"];
export const defaultLocale = "en";
export const localeCookie = "NEXT_LOCALE";

export function hasLocale(value) {
  return locales.includes(value);
}

export function dirOf(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

/** First path segment if it is a supported locale, else null. */
export function localeFromPath(pathname) {
  const first = pathname.split("/")[1];
  return hasLocale(first) ? first : null;
}

/** "/about" + "ar" -> "/ar/about"; already-prefixed, file ("/sitemap.xml"), external/hash/mailto links come back untouched. */
export function localizedHref(href, locale) {
  if (
    typeof href !== "string" ||
    !href.startsWith("/") ||
    href.startsWith("//")
  )
    return href;
  const path = href.split(/[?#]/)[0];
  if (localeFromPath(path) || /\.[a-z0-9]+$/i.test(path)) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/** Same page in another language: swaps (or adds) the locale segment, keeping the rest. */
export function switchLocalePath(pathname, locale) {
  const rest = localeFromPath(pathname)
    ? pathname.replace(/^\/[^/]+/, "")
    : pathname;
  return `/${locale}${rest === "/" ? "" : rest}`;
}

/** Picks the best supported locale from an Accept-Language header. */
export function negotiateLocale(acceptLanguage) {
  if (!acceptLanguage) return defaultLocale;
  const wanted = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return wanted.find((w) => hasLocale(w.tag))?.tag ?? defaultLocale;
}
