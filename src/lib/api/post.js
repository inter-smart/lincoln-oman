import { send } from "./http";
import { currentLocale } from "./locale";

/**
 * Write to the PHP API with a POST (JSON body). Never cached.
 * e.g. apiPost("/forms/contact", payload).
 * Server Actions cannot read the route locale, so they pass `{ lang }` explicitly.
 * A rejected submission throws ApiError; `error.details` holds the PHP validation errors.
 */
export async function apiPost(endpoint, body, { lang } = {}) {
  return send(endpoint, {
    method: "POST",
    body,
    lang: lang ?? (await currentLocale()),
    fetchOptions: { cache: "no-store" },
  });
}
