import "server-only";
import { unstable_rethrow } from "next/navigation";
import { lang } from "next/root-params";
import { defaultLocale, hasLocale } from "@/i18n/config";

/** Locale of the current route ([lang] segment), sent to the CMS as the `lang` header. */
export async function currentLocale() {
  try {
    const value = await lang();
    return hasLocale(value) ? value : defaultLocale;
  } catch (error) {
    unstable_rethrow(error);
    return defaultLocale; // outside a [lang] route (e.g. a Server Action)
  }
}
