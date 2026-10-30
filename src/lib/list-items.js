/**
 * Returns the inner HTML of every <li> in a CMS rich-text string.
 * Any <img> or empty <span> inside an item (the CMS's own bullet) is stripped: the component draws the bullet.
 * Returns [] when there is no list.
 */
export function listItems(html) {
  return [...(html ?? "").matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map(([, item]) =>
      item.replace(/<img[^>]*>|<span[^>]*>\s*<\/span>/gi, "").trim(),
    )
    .filter(Boolean);
}

/**
 * Returns the rich-text that comes before the first <ul>/<ol>, so a CMS blob of "paragraph + list" can render
 * the paragraph and let the component draw the list itself (see listItems). Without a list it is the whole string.
 */
export function textBeforeList(html) {
  return (html ?? "").split(/<[uo]l\b/i)[0].trim();
}
