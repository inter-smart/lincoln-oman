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
