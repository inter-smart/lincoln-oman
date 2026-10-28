import { cache } from "react";
import { GET_ENDPOINTS } from "@/lib/constants/api";
import { mapHome } from "@/lib/mappers/home";
import { apiGet } from "../get";

/**
 * Home page content from the PHP API, in the shape the home sections read. Throws on any API error.
 * Cached per request so the page and generateMetadata share one fetch and one mapping.
 */
export const getHome = cache(async () => mapHome(await apiGet(GET_ENDPOINTS.HOME)));
