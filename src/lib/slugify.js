// "Abu Dhabi" -> "abu-dhabi"; Arabic names keep their letters ("مسقط" -> "مسقط") so every location still gets its own slug. The CMS sends no slug for locations, so the URL slug is derived from the name.
export function slugify(name) {
  return String(name ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

// The location whose name slugifies to `slug`, or undefined (also for an empty slug).
export function locationBySlug(locations, slug) {
  if (!slug) return undefined;
  return locations?.find((location) => slugify(location.name) === slug);
}
