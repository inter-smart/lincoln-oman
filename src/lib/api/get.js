import { unstable_rethrow } from "next/navigation";
import { send } from "./http";
import { currentLocale } from "./locale";

/**
 * Read from the PHP API with a GET, e.g. apiGet("/home") or apiGet(`/newsroom/${slug}`).
 * Never throws: returns { data, error }. On success `error` is null; on any failure (HTTP error,
 * timeout, bad config) `data` is null and `error` is the ApiError (see error.status / error.details).
 * Pages pass the result to `ensureData` (ensure.js): 404 -> notFound(), other errors -> error.js.
 * The locale (from the [lang] route, or the `lang` option) is sent as the `?lang=` query param, which the CMS uses to pick the language.
 * Cached and refreshed every `revalidate` seconds (default 60; 0 = always fresh).
 * A positive value makes the route prerender at build time, and the CMS host answers 508 (resource limit) when
 * the build's parallel workers hit it; next.config.mjs serialises static generation for that reason.
 */
export async function apiGet(endpoint, { params, revalidate = 60, lang } = {}) {
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
