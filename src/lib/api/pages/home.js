import { GET_ENDPOINTS } from "@/lib/constants/api";
import { mapHome } from "@/lib/mappers/home";
import { apiGet } from "../get";

/** Home page content from the PHP API, in the shape the home sections read. Throws on any API error. */
export async function getHome() {
  return mapHome(await apiGet(GET_ENDPOINTS.HOME));
}
