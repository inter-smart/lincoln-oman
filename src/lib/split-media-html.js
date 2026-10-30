/**
 * Splits a CMS rich-text string into the part that sits beside an image and anything after it.
 * The CMS sometimes wraps the text column in its own grid <div> (Owners "Lincoln Protect"), followed by more content.
 * `side` is that wrapper's inner HTML and `after` is what follows it; without a wrapper `side` is the whole string.
 * Unbalanced markup falls back to the whole string as `side`, so this never throws.
 */
export function splitMediaHtml(html) {
  const source = html ?? "";
  const open = source.match(
    /^\s*<div\b[^>]*\bclass="[^"]*\bgrid\b[^"]*"[^>]*>/i,
  );
  if (!open) return { side: source, after: "" };

  const tag = /<(\/?)div\b[^>]*>/gi;
  tag.lastIndex = open[0].length;
  let depth = 1;
  for (let match = tag.exec(source); match; match = tag.exec(source)) {
    depth += match[1] ? -1 : 1;
    if (depth === 0) {
      return {
        side: source.slice(open[0].length, match.index),
        after: source.slice(match.index + match[0].length),
      };
    }
  }
  return { side: source, after: "" };
}
