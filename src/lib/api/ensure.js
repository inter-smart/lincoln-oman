import { notFound } from "next/navigation";

/**
 * Turns an apiGet result into its data, or stops the render:
 * - API answered 404 (or an empty success body) -> the 404 page
 * - any other failure (503, timeout, network, config) -> rethrown, so error.js shows "Service temporarily unavailable"
 */
export function ensureData({ data, error }) {
  if (error) {
    if (error.status === 404) notFound();
    throw error;
  }
  if (!data) notFound();
  return data;
}
