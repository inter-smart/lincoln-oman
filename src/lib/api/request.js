import { API_ENVELOPE_KEY } from "../constants/api.js";

// Pure request helpers, kept apart from http.js so `npm test` can run them (no server-only, no @/ alias).

export class ApiError extends Error {
  // `details` is the parsed error body (e.g. PHP validation errors from a form POST), or null.
  constructor(message, { status, endpoint, details = null }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.endpoint = endpoint;
    this.details = details;
  }
}

export function buildUrl(baseUrl, endpoint, params) {
  const url = new URL(`${baseUrl.replace(/\/+$/, "")}${endpoint}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value != null) url.searchParams.set(key, value);
  }
  return url;
}

export function unwrapEnvelope(json) {
  return API_ENVELOPE_KEY ? (json?.[API_ENVELOPE_KEY] ?? json) : json;
}

// Empty bodies (204) and non-JSON error pages come back as null instead of throwing.
export function parseBody(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
