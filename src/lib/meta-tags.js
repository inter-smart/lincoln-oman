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

// Tags the page already sets itself (or must not let the CMS override, like robots).
const OWNED_META = new Set([
  "title",
  "description",
  "keywords",
  "robots",
  "og:title",
  "og:description",
  "og:url",
  "og:site_name",
  "og:locale",
  "og:type",
  "twitter:title",
  "twitter:description",
  "twitter:card",
]);
const META_ATTRS = ["name", "property", "content", "itemprop"];
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
export function htmlMetaTags(html) {
  const tags = { meta: [], links: [] };
  const source = html ?? "";

  for (const [, body] of source.matchAll(/<meta\b([^>]*)>/gi)) {
    const attrs = attributes(body, META_ATTRS);
    const key = (attrs.name ?? attrs.property ?? "").toLowerCase();
    const hasKey = key || attrs.itemprop;
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

/**
 * `other_meta_tags` as the Metadata fields Next can render: { other, openGraph, twitter, languages }.
 * Only the fields the CMS filled are present. Tags Next has no field for (JSON-LD, itemprop, other
 * `property=` tags) are dropped; metadata `other` only writes `name=` tags.
 *   <meta name=X>                 -> other[X] (identical repeats collapsed)
 *   og:image, og:image:alt/w/h    -> openGraph.images
 *   twitter:image/site/creator    -> twitter.images / site / creator
 *   <link rel=alternate hreflang> -> languages
 */
export function metadataFromTags(html) {
  const { meta, links } = htmlMetaTags(html);
  const other = {};
  const images = [];
  const twitter = {};
  const languages = {};

  for (const attrs of meta) {
    const { name, property, content } = attrs;
    if (name === undefined && property === undefined) continue;

    if (name === undefined) {
      const key = property.toLowerCase();
      if (key === "og:image") images.push({ url: content });
      else if (IMAGE_FIELDS[key] && images.length)
        images[images.length - 1][IMAGE_FIELDS[key]] = content;
      continue;
    }

    switch (name.toLowerCase()) {
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
  if (images.length) fields.openGraph = { images };
  if (Object.keys(twitter).length) fields.twitter = twitter;
  if (Object.keys(languages).length) fields.languages = languages;
  return fields;
}
