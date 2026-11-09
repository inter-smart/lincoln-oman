import { siteUrl } from "@/data/seo";
import { hasLocale } from "@/i18n/config";
import { apiGet } from "@/lib/api/get";

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

// Rendered per request: the language comes from the URL and the CMS is queried live.
export const dynamic = "force-dynamic";

const absolute = (path) => new URL(path, siteUrl).href;

// This file is served per language (/en/sitemap.xml, /ar/sitemap.xml): every URL carries the current language prefix. No `alternates`: the xhtml:link tags make Chrome show the file as flat text, and hreflang is already in each page's metadata.
const localized = (locale, path, entry) => [
  {
    url: absolute(`/${locale}${path === "/" ? "" : path}`),
    ...entry,
  },
];

// Every item of a paginated list endpoint ({ [key]: [...], pagination: { last_page } }).
// A failed request (already logged by apiGet) ends the list instead of failing the sitemap.
async function allPages(endpoint, key) {
  const first = await apiGet(endpoint);
  if (first.error || !first.data) return [];

  const lastPage = first.data.pagination?.last_page ?? 1;
  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      apiGet(endpoint, { params: { page: index + 2 } }),
    ),
  );
  return [first, ...rest].flatMap(({ data }) => data?.[key] ?? []);
}

async function entries(locale) {
  const [models, news, offers] = await Promise.all([
    apiGet("/vehicle-models"),
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
      localized(locale, path, {
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority,
      }),
    ),
    ...(models.data ?? []).flatMap((model) =>
      localized(locale, pagePath("/vehicles", model), {
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
    ...news.flatMap((item) =>
      localized(locale, pagePath("/newsroom", item), {
        lastModified: published(item.published_on),
        changeFrequency: "yearly",
        priority: 0.5,
      }),
    ),
    ...offers.flatMap((item) =>
      localized(locale, pagePath("/special-offers", item), {
        changeFrequency: "weekly",
        priority: 0.6,
      }),
    ),
  ];
}

const escapeXml = (value) =>
  String(value).replace(
    /[<>&'"]/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[char],
  );

// A route handler (not the sitemap.js convention): metadata files inside a root-param segment are emitted at "/-/sitemap.xml" instead of "/{lang}/sitemap.xml".
export async function GET(_request, { params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response(null, { status: 404 });
  const locale = lang;
  const urls = (await entries(locale))
    .map(({ url, lastModified, changeFrequency, priority }) =>
      [
        "<url>",
        `<loc>${escapeXml(url)}</loc>`,
        lastModified && `<lastmod>${lastModified.toISOString()}</lastmod>`,
        changeFrequency && `<changefreq>${changeFrequency}</changefreq>`,
        priority != null && `<priority>${priority}</priority>`,
        "</url>",
      ]
        .filter(Boolean)
        .join(""),
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
