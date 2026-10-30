// Turns the API's `other_meta_tags` HTML string (banner.other_meta_tags) into Next `generateMetadata` fields (see buildMetadata).
const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  reg: "®",
  copy: "©",
  trade: "™",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  ndash: "–",
  mdash: "—",
  hellip: "…",
};

function decode(text) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] !== "#") return ENTITIES[entity.toLowerCase()] ?? match;
    const hex = entity[1].toLowerCase() === "x";
    const code = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
    return Number.isNaN(code) ? match : String.fromCodePoint(code);
  });
}

// Tags the page owns: title/description/keywords come from the dedicated meta_* fields,
// and robots must not be overridden by the CMS (noindex). The CMS's og:* and twitter:*
// replace the page's defaults (see metadataFromTags).
const OWNED_META = new Set(["title", "description", "keywords", "robots"]);
// http-equiv can redirect (refresh) or change security (set-cookie, CSP), so only these two pass.
const HTTP_EQUIV = new Set(["x-ua-compatible", "content-language"]);
const META_ATTRS = [
  "name",
  "property",
  "content",
  "itemprop",
  "http-equiv",
  "media",
];
const LINK_ATTRS = ["rel", "href", "hreflang"];
// canonical is not allowed: the page sets its own (buildMetadata), so the CMS cannot add a second one.
const LINK_RELS = new Set(["alternate"]);

function attributes(source, allowed) {
  const found = {};
  for (const [, key, quoted, single, bare] of source.matchAll(
    /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
  )) {
    const name = key.toLowerCase();
    if (allowed.includes(name))
      found[name] = decode(quoted ?? single ?? bare ?? "");
  }
  return found;
}

/**
 * The <meta> and <link rel=alternate> tags in the API's `other_meta_tags` string, as safe attribute objects.
 * Anything else (scripts, JSON-LD, http-equiv) is dropped because the HTML comes from the CMS.
 */
function htmlMetaTags(html) {
  const tags = { meta: [], links: [] };
  const source = html ?? "";

  for (const [, body] of source.matchAll(/<meta\b([^>]*)>/gi)) {
    const attrs = attributes(body, META_ATTRS);
    const key = (attrs.name ?? attrs.property ?? "").toLowerCase();
    const httpEquiv = attrs["http-equiv"]?.toLowerCase();
    const hasKey = key || attrs.itemprop || httpEquiv;
    if (httpEquiv && !HTTP_EQUIV.has(httpEquiv)) continue;
    if (hasKey && attrs.content !== undefined && !OWNED_META.has(key))
      tags.meta.push(attrs);
  }

  for (const [, body] of source.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = attributes(body, LINK_ATTRS);
    if (attrs.href && LINK_RELS.has((attrs.rel ?? "").toLowerCase()))
      tags.links.push(attrs);
  }

  return tags;
}

const IMAGE_FIELDS = {
  "og:image:alt": "alt",
  "og:image:width": "width",
  "og:image:height": "height",
};
// `property=` tags metadataFromTags turns into Metadata fields; every other one goes to rawMetaTags.
const OPEN_GRAPH_FIELDS = {
  "og:title": "title",
  "og:description": "description",
  "og:url": "url",
  "og:site_name": "siteName",
  "og:type": "type",
  "og:locale": "locale",
};
const METADATA_PROPERTIES = new Set([
  "og:image",
  ...Object.keys(OPEN_GRAPH_FIELDS),
  ...Object.keys(IMAGE_FIELDS),
]);

/**
 * `other_meta_tags` as the Metadata fields Next can render: { other, openGraph, twitter, languages }.
 * Only the fields the CMS filled are present. Next's metadata `other` only writes plain `name=` tags,
 * so everything else (other `property=`, itemprop, http-equiv, `name=` with media) is left to rawMetaTags.
 *   <meta name=X>                 -> other[X] (identical repeats collapsed)
 *   og:image, og:image:alt/w/h    -> openGraph.images
 *   og:title/description/url/site_name/type/locale -> openGraph.* (replace the page defaults)
 *   twitter:title/description/card/site/creator    -> twitter.* (replace the page defaults)
 *   twitter:image                 -> twitter.images
 *   <link rel=alternate hreflang> -> languages
 */
export function metadataFromTags(html) {
  const { meta, links } = htmlMetaTags(html);
  const other = {};
  const images = [];
  const twitter = {};
  const openGraph = {};
  const languages = {};

  for (const attrs of meta) {
    const { name, property, content, media } = attrs;
    if (name === undefined && property === undefined) continue;

    if (name === undefined) {
      const key = property.toLowerCase();
      if (key === "og:image") images.push({ url: content });
      else if (OPEN_GRAPH_FIELDS[key])
        openGraph[OPEN_GRAPH_FIELDS[key]] = content;
      else if (IMAGE_FIELDS[key] && images.length)
        images[images.length - 1][IMAGE_FIELDS[key]] = content;
      continue;
    }
    if (media !== undefined) continue;

    switch (name.toLowerCase()) {
      case "twitter:title":
        twitter.title = content;
        break;
      case "twitter:description":
        twitter.description = content;
        break;
      case "twitter:card":
        twitter.card = content;
        break;
      case "twitter:image":
        (twitter.images ??= []).push(content);
        break;
      case "twitter:site":
        twitter.site = content;
        break;
      case "twitter:creator":
        twitter.creator = content;
        break;
      default: {
        const values = (other[name] ??= []);
        if (!values.includes(content)) values.push(content);
      }
    }
  }

  for (const { hreflang, href } of links) {
    if (hreflang) languages[hreflang] = href;
  }

  const fields = {};
  const otherNames = Object.keys(other);
  if (otherNames.length) {
    fields.other = Object.fromEntries(
      otherNames.map((key) => [
        key,
        other[key].length > 1 ? other[key] : other[key][0],
      ]),
    );
  }
  if (images.length) openGraph.images = images;
  if (Object.keys(openGraph).length) fields.openGraph = openGraph;
  if (Object.keys(twitter).length) fields.twitter = twitter;
  if (Object.keys(languages).length) fields.languages = languages;
  return fields;
}

/**
 * The `<meta>` tags in `other_meta_tags` that Next's metadata can't write, as attribute objects for <MetaTags>:
 * other `property=` (fb:app_id, article:*), `itemprop`, allowlisted `http-equiv`, and `name=` with `media` (theme-color).
 * Plain `name=` tags, og:image*, og:locale and twitter fields are left to metadataFromTags so nothing renders twice.
 */
export function rawMetaTags(html) {
  const seen = new Set();
  const tags = [];

  for (const attrs of htmlMetaTags(html).meta) {
    const { name, property, media } = attrs;
    const raw =
      name !== undefined
        ? media !== undefined
        : property === undefined ||
          !METADATA_PROPERTIES.has(property.toLowerCase());
    const id = JSON.stringify(attrs);
    if (!raw || seen.has(id)) continue;
    seen.add(id);
    tags.push(attrs);
  }

  return tags;
}
