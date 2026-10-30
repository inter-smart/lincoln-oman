import "server-only"; // a client-component import fails the build, so the token cannot leak
import { ApiError, buildUrl, parseBody, unwrapEnvelope } from "./request";

// Read lazily: a missing value fails that request with an ApiError, not module import.
function config() {
  const baseUrl = process.env.CMS_API_URL;
  const token = process.env.CMS_API_TOKEN;
  if (!baseUrl || !token) {
    throw new ApiError("CMS_API_URL / CMS_API_TOKEN are not set", {
      status: 500,
      endpoint: "",
    });
  }
  return { baseUrl, token };
}

/**
 * Shared core behind apiGet and apiPost — not used directly. It is the only place that
 * talks to the PHP API and the only place the token is read.
 * Returns API data only: a failure throws ApiError and never substitutes static data.
 */
export async function send(
  endpoint,
  { method, params, body, fetchOptions, lang },
) {
  const { baseUrl, token } = config();

  const res = await fetch(buildUrl(baseUrl, endpoint, params), {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...(lang && { lang }),
      ...(body && { "Content-Type": "application/json" }),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(8000),
    ...fetchOptions,
  });

  const json = parseBody(await res.text());

  if (!res.ok) {
    throw new ApiError(`API ${method} ${endpoint} failed with ${res.status}`, {
      status: res.status,
      endpoint,
      details: json,
    });
  }

  return json === null ? null : unwrapEnvelope(json);
}
