import { siteUrl } from "@/data/seo";
import { locales } from "@/i18n/config";
import { apiGet } from "@/lib/api/get";

const REVALIDATE = 3600;

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/lincoln-certified", priority: 0.8 },
  { path: "/owners", priority: 0.8 },
  { path: "/special-offers", priority: 0.8 },
  { path: "/newsroom", priority: 0.8 },
  { path: "/gallery", priority: 0.8 },
  { path: "/contact-us", priority: 0.8 },
  { path: "/request-a-quote", priority: 0.8 },
  { path: "/book-a-test-drive", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

const absolute = (path) => new URL(path, siteUrl).href;

// One entry per language for a language-less path ("/about"). No `alternates`: the xhtml:link tags make Chrome show the file as flat text, and hreflang is already in each page's metadata.
// ponytail: detail slugs are assumed to be the same in every language: confirm with the backend.
const localized = (path, entry) => {
  return locales.map((locale) => ({
    url: absolute(`/${locale}${path === "/" ? "" : path}`),
    ...entry,
  }));
};

// Every item of a paginated list endpoint ({ [key]: [...], pagination: { last_page } }).
// A failed request (already logged by apiGet) ends the list instead of failing the sitemap.
async function allPages(endpoint, key) {
  const first = await apiGet(endpoint, { revalidate: REVALIDATE });
  if (first.error || !first.data) return [];

  const lastPage = first.data.pagination?.last_page ?? 1;
  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      apiGet(endpoint, { params: { page: index + 2 }, revalidate: REVALIDATE }),
    ),
  );
  return [first, ...rest].flatMap(({ data }) => data?.[key] ?? []);
}

export default async function sitemap() {
  const [models, news, offers] = await Promise.all([
    apiGet("/vehicle-models", { revalidate: REVALIDATE }),
    allPages("/news", "news"),
    allPages("/special-offers", "special_offers"),
  ]);

  const pagePath = (base, item) => `${base}/${encodeURIComponent(item.slug)}`;
  const published = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  };

  return [
    ...staticRoutes.flatMap(({ path, priority }) =>
      localized(path, {
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority,
      }),
    ),
    ...(models.data ?? []).flatMap((model) =>
      localized(pagePath("/vehicles", model), {
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
    ...news.flatMap((item) =>
      localized(pagePath("/newsroom", item), {
        lastModified: published(item.published_on),
        changeFrequency: "yearly",
        priority: 0.5,
      }),
    ),
    ...offers.flatMap((item) =>
      localized(pagePath("/special-offers", item), {
        changeFrequency: "weekly",
        priority: 0.6,
      }),
    ),
  ];
}
