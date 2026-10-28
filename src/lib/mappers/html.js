// The PHP API sends rich-text fields as HTML. These helpers pull plain text out of it
// so the section components keep rendering strings, not markup.
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
const BLOCK_TAGS = /<\/?(?:p|li|ul|ol|div|br)\b[^>]*>/gi;

function decode(text) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] !== "#") return ENTITIES[entity.toLowerCase()] ?? match;
    const hex = entity[1].toLowerCase() === "x";
    const code = parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
    return Number.isNaN(code) ? match : String.fromCodePoint(code);
  });
}

function clean(fragment) {
  return decode(fragment.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function texts(html, tag) {
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  return [...(html ?? "").matchAll(pattern)]
    .map((match) => clean(match[1]))
    .filter(Boolean);
}

/** All the text in an HTML fragment as one line (block elements become spaces). */
export function htmlToText(html) {
  return clean((html ?? "").replace(BLOCK_TAGS, " "));
}

/** The text of each <p>, empty ones dropped. */
export function htmlParagraphs(html) {
  return texts(html, "p");
}

/** The text of each <li>, empty ones dropped (bullet <img> tags and classes are ignored). */
export function htmlListItems(html) {
  return texts(html, "li");
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
const LINK_RELS = new Set(["canonical", "alternate"]);

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
 * Only <meta>, <link rel=canonical|alternate> and valid JSON-LD scripts survive; anything else
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
