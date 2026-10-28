// Turns the API's `other_meta_tags` HTML string (banner.other_meta_tags) into safe head tags for <PageMeta>.
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
  "twitter:title",
  "twitter:description",
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
 * The head tags in the API's `other_meta_tags` string, as safe attribute objects.
 * Only <meta>, <link rel=alternate> and valid JSON-LD scripts survive; anything else
 * (other scripts, http-equiv) is dropped because the HTML comes from the CMS.
 */
export function htmlMetaTags(html) {
  const tags = { meta: [], links: [], jsonLd: [] };
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

  for (const [, head, body] of source.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
  )) {
    if (!/\btype\s*=\s*["']?application\/ld\+json/i.test(head)) continue;
    try {
      tags.jsonLd.push(JSON.stringify(JSON.parse(body)));
    } catch {
      // Invalid JSON-LD is dropped rather than shipped to search engines.
    }
  }

  return tags;
}
