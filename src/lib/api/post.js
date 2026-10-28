import { HTTP_METHODS } from "@/lib/constants/api";
import { send } from "./http";

/**
 * Write to the PHP API with a POST (JSON body). Never cached.
 * Pass an entry from POST_ENDPOINTS, e.g. apiPost(POST_ENDPOINTS.FORM_CONTACT, payload).
 * A rejected submission throws ApiError; `error.details` holds the PHP validation errors.
 */
export function apiPost(endpoint, body) {
  return send(endpoint, {
    method: HTTP_METHODS.POST,
    body,
    fetchOptions: { cache: "no-store" },
  });
}
