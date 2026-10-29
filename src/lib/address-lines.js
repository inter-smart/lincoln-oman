const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/**
 * Turns the CMS address HTML (site-settings `address`) into plain text lines, e.g. for JSON-LD.
 * Closing block tags and <br> end a line; other tags are dropped; blank lines are removed.
 * Returns [] when there is no address.
 */
export function addressLines(html) {
  return (html ?? "")
    .replace(/<\/(p|span|div|li)>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(
      /&([a-z]+);/gi,
      (match, name) => ENTITIES[name.toLowerCase()] ?? match,
    )
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
