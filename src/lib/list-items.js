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
