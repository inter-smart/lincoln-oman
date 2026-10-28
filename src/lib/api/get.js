import { HTTP_METHODS } from "@/lib/constants/api";
import { REVALIDATE } from "@/lib/constants/cache";
import { send } from "./http";

/**
 * Read from the PHP API with a GET. Cached, and refreshed every `revalidate` seconds.
 * Pass an entry from GET_ENDPOINTS, e.g. apiGet(GET_ENDPOINTS.NEWS_DETAIL(slug)).
 * A 404 throws ApiError with status 404, so a page can call notFound().
 */
export function apiGet(
  endpoint,
  { params, revalidate = REVALIDATE.CONTENT } = {},
) {
  return send(endpoint, {
    method: HTTP_METHODS.GET,
    params,
    fetchOptions: { next: { revalidate } },
  });
}
