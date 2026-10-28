import { send } from "./http";

/**
 * Write to the PHP API with a POST (JSON body). Never cached.
 * e.g. apiPost("/forms/contact", payload).
 * A rejected submission throws ApiError; `error.details` holds the PHP validation errors.
 */
export function apiPost(endpoint, body) {
  return send(endpoint, {
    method: "POST",
    body,
    fetchOptions: { cache: "no-store" },
  });
}
