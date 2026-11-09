import { unstable_rethrow } from "next/navigation";
import { send } from "./http";
import { currentLocale } from "./locale";

/**
 * Read from the PHP API with a GET, e.g. apiGet("/home") or apiGet(`/newsroom/${slug}`).
 * Never throws: returns { data, error }. On success `error` is null; on any failure (HTTP error,
 * timeout, bad config) `data` is null and `error` is the ApiError (see error.status / error.details).
 * Pages pass the result to `ensureData` (ensure.js): 404 -> notFound(), other errors -> error.js.
 * The locale (from the [lang] route, or the `lang` option) is sent as the `?lang=` query param, which the CMS uses to pick the language.
 * Not cached by default: every request goes to the CMS (cache: "no-store"), so routes render dynamically.
 * Pass `revalidate` (seconds) for rarely-changing data (e.g. layout settings) to cache it in the Data Cache.
 */
export async function apiGet(endpoint, { params, lang, revalidate } = {}) {
  try {
    const data = await send(endpoint, {
      method: "GET",
      params,
      lang: lang ?? (await currentLocale()),
      fetchOptions: revalidate
        ? { next: { revalidate } }
        : { cache: "no-store" },
    });
    return { data, error: null };
  } catch (error) {
    // Next signals "render this route dynamically" (revalidate: 0) by throwing; that must not become an API error.
    unstable_rethrow(error);
    console.error(`apiGet ${endpoint} failed:`, error.message);
    return { data: null, error };
  }
}
