import { allowIndexing, siteUrl } from "@/data/seo";
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

// Empty while indexing is blocked, so a staging build never advertises its URLs.
export default async function sitemap() {
  if (!allowIndexing) return [];

  const [models, news, offers] = await Promise.all([
    apiGet("/vehicle-models", { revalidate: REVALIDATE }),
    allPages("/news", "news"),
    allPages("/special-offers", "special_offers"),
  ]);

  const pageUrl = (base, item) =>
    absolute(`${base}/${encodeURIComponent(item.slug)}`);
  const published = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  };

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absolute(path),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority,
    })),
    ...(models.data ?? []).map((model) => ({
      url: pageUrl("/vehicles", model),
      changeFrequency: "monthly",
      priority: 0.9,
    })),
    ...news.map((item) => ({
      url: pageUrl("/newsroom", item),
      lastModified: published(item.published_on),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
    ...offers.map((item) => ({
      url: pageUrl("/special-offers", item),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];
}
