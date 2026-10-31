import { unstable_rethrow } from "next/navigation";
import { send } from "./http";
import { currentLocale } from "./locale";

/**
 * Read from the PHP API with a GET, e.g. apiGet("/home") or apiGet(`/newsroom/${slug}`).
 * Never throws: returns { data, error }. On success `error` is null; on any failure (HTTP error,
 * timeout, bad config) `data` is null and `error` is the ApiError (see error.status / error.details).
 * The page decides what to do, e.g. `if (error) notFound()`.
 * The locale (from the [lang] route, or the `lang` option) is sent as the `?lang=` query param, which the CMS uses to pick the language.
 * Refreshed every `revalidate` seconds (0 = always fresh; go-live values: 3600 site, 900 content, 300 listings).
 */
export async function apiGet(endpoint, { params, revalidate = 0, lang } = {}) {
  try {
    const data = await send(endpoint, {
      method: "GET",
      params,
      lang: lang ?? (await currentLocale()),
      fetchOptions: { next: { revalidate } },
    });
    return { data, error: null };
  } catch (error) {
    // Next signals "render this route dynamically" (revalidate: 0) by throwing; that must not become an API error.
    unstable_rethrow(error);
    console.error(`apiGet ${endpoint} failed:`, error.message);
    return { data: null, error };
  }
}
