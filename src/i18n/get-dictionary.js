import "server-only";
import { currentLocale } from "@/lib/api/locale";
import { defaultLocale, hasLocale } from "./config";

// ar.json mirrors en.json key for key (checked by dictionaries.test.js); the client supplies the Arabic copy.
const loaders = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ar: () => import("@/dictionaries/ar.json").then((m) => m.default),
};

export function getDictionary(locale) {
  return loaders[hasLocale(locale) ? locale : defaultLocale]();
}

/** Dictionary of the current route's language, for Server Components and generateMetadata. */
export async function getCurrentDictionary() {
  return getDictionary(await currentLocale());
}
