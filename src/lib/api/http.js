import "server-only"; // a client-component import fails the build, so the token cannot leak
import { ApiError, buildUrl, parseBody, unwrapEnvelope } from "./request";

// Read lazily: a missing value fails that request with an ApiError, not module import.
function config() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (!baseUrl || !token) {
    throw new ApiError(
      "NEXT_PUBLIC_API_URL / NEXT_PUBLIC_API_TOKEN are not set",
      {
        status: 500,
        endpoint: "",
      },
    );
  }
  return { baseUrl, token };
}

// The CMS answers in 2-6 s and slows down sharply under concurrent requests, so 8 s was timing out healthy responses.
const TIMEOUT_MS = 20000;

// Only GETs are retried (idempotent): on a timeout, a network error or a 5xx, after a short pause.
// The CMS host answers 508 (resource limit) when it gets too many parallel requests; retrying at once would hit the same limit.
const GET_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const attempts = method === "GET" ? GET_ATTEMPTS : 1;

  // The CMS picks the language from the `?lang=` query param (it ignores the header).
  const request = () =>
    fetch(buildUrl(baseUrl, endpoint, { ...params, lang }), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(lang && { lang }),
        ...(body && { "Content-Type": "application/json" }),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      ...fetchOptions,
    });

  let res;
  for (let attempt = 1; ; attempt++) {
    try {
      res = await request();
    } catch (error) {
      if (attempt >= attempts) throw error; // timeout / network error
      await wait(RETRY_DELAY_MS * attempt);
      continue;
    }
    if (res.status < 500 || attempt >= attempts) break;
    await wait(RETRY_DELAY_MS * attempt);
  }

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
