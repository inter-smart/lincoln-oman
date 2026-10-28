import { cache } from "react";
import { GET_ENDPOINTS } from "@/lib/constants/api";
import { mapAbout } from "@/lib/mappers/about";
import { apiGet } from "../get";

/**
 * About page content from the PHP API, in the shape the about sections read. Throws on any API error.
 * Cached per request so the page and generateMetadata share one fetch and one mapping.
 */
export const getAbout = cache(async () =>
  mapAbout(await apiGet(GET_ENDPOINTS.ABOUT)),
);
