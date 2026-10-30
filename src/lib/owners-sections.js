import { splitMediaHtml } from "./split-media-html.js";

/*
 * Turns GET /owners (owners_services + owners_cms.top_image) into the `sections` OwnersContent renders:
 *   { id, label, title, image?, blocks }
 * where `blocks` are the ContentBlocks types (text, title, subtitle, heading, feature, list, media).
 * The CMS rich text is read by the Tailwind classes it already carries (text-fluid-30 = title, text-fluid-25 =
 * heading, text-fluid-22 = subtitle) so the blocks render with ContentBlocks' own styles.
 */

const TOP_RATIO = "1166/440";
// The API sends no image size, so the Figma crops are kept (by service id); other images use the first one
const MEDIA_FRAMES = {
  4: { ratio: "455/275" },
  5: { ratio: "455/363", position: "50% 6%" },
};
const DEFAULT_FRAME = MEDIA_FRAMES[4];

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
};

const decode = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, name) => {
    if (name[0] === "#") {
      const code =
        name[1].toLowerCase() === "x"
          ? parseInt(name.slice(2), 16)
          : parseInt(name.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITIES[name.toLowerCase()] ?? whole;
  });

const VOID_TAGS = new Set(["br", "img", "hr"]);

// Small tolerant HTML tree: { tag, className, children } and { text } nodes
function parseHtml(html) {
  const root = { tag: "root", className: "", children: [] };
  const stack = [root];
  const token = /<(\/?)([a-z][a-z0-9]*)([^>]*)>|([^<]+)/gi;
  for (let m = token.exec(html ?? ""); m; m = token.exec(html ?? "")) {
    const parent = stack[stack.length - 1];
    if (m[4] !== undefined) {
      parent.children.push({ text: m[4] });
      continue;
    }
    const tag = m[2].toLowerCase();
    if (m[1]) {
      const at = stack.map((node) => node.tag).lastIndexOf(tag);
      if (at > 0) stack.length = at;
      continue;
    }
    const node = {
      tag,
      className: m[3].match(/\bclass\s*=\s*"([^"]*)"/i)?.[1] ?? "",
      children: [],
    };
    parent.children.push(node);
    if (!VOID_TAGS.has(tag) && !m[3].trim().endsWith("/")) stack.push(node);
  }
  return root;
}

function textOf(node) {
  if (node.text !== undefined) return decode(node.text).replace(/\s+/g, " ");
  if (node.tag === "br") return "\n";
  return node.children.map(textOf).join("");
}

const clean = (text) =>
  text
    .replace(/ *\n */g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();

const elements = (node) =>
  node.children.filter((child) => child.tag || child.text?.trim());

function blocksFromNodes(nodes) {
  const blocks = [];
  for (const node of nodes) {
    if (node.text !== undefined) {
      const text = clean(textOf(node));
      if (text) blocks.push({ type: "text", text });
      continue;
    }
    const { tag, className } = node;
    if (tag === "p") {
      const text = clean(textOf(node));
      if (text) {
        blocks.push({
          type: className.includes("fluid-22") ? "subtitle" : "text",
          text,
        });
      }
    } else if (/^h[1-6]$/.test(tag)) {
      const text = clean(textOf(node));
      if (text) {
        blocks.push({
          type: className.includes("fluid-30") ? "title" : "heading",
          text,
        });
      }
    } else if (tag === "ul" || tag === "ol") {
      const items = node.children
        .filter((child) => child.tag === "li")
        .map((item) => clean(textOf(item)))
        .filter(Boolean);
      if (items.length) {
        blocks.push({
          type: "list",
          items,
          ...(className.includes("columns-2") && { columns: 2 }),
        });
      }
    } else if (tag === "div") {
      const inner = elements(node);
      // A heading with its paragraph is a "feature"; any other wrapper is flattened
      if (inner.length === 2 && inner[0].tag === "h3" && inner[1].tag === "p") {
        blocks.push({
          type: "feature",
          title: clean(textOf(inner[0])),
          text: clean(textOf(inner[1])),
        });
      } else {
        blocks.push(...blocksFromNodes(inner));
      }
    } else if (tag !== "br") {
      const text = clean(textOf(node));
      if (text) blocks.push({ type: "text", text });
    }
  }
  return blocks;
}

export const htmlToBlocks = (html) =>
  blocksFromNodes(elements(parseHtml(html)));

const hasText = (html) => Boolean(clean(textOf(parseHtml(html))));

export const slugOf = (service) =>
  service.title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `service-${service.id}`;

// `description_two` sits beside the service's photo when it has one, otherwise it just follows `description_one`
function blocksOf(service) {
  const { description_one: one, description_two: two, image } = service;
  const blocks = htmlToBlocks(one);
  if (!hasText(two)) return blocks;
  if (!image?.path) return [...blocks, ...htmlToBlocks(two)];

  const { side, after } = splitMediaHtml(two);
  return [
    ...blocks,
    {
      type: "media",
      image: {
        src: image.path,
        alt: image.alt,
        ...(MEDIA_FRAMES[service.id] ?? DEFAULT_FRAME),
      },
      blocks: htmlToBlocks(side),
    },
    ...htmlToBlocks(after),
  ];
}

export function ownersSections(services, topImage) {
  return (services ?? []).map((service, index) => {
    // A service's own photo sits beside its second text; with no second text it leads the section instead.
    // The first section otherwise gets the page's top photo.
    const lead =
      service.image?.path && !hasText(service.description_two)
        ? service.image
        : index === 0 && topImage?.path
          ? topImage
          : null;
    const id = slugOf(service);

    return {
      id,
      label: service.title || "More",
      title: service.title,
      ...(lead && {
        image: { src: lead.path, alt: lead.alt, ratio: TOP_RATIO },
      }),
      blocks: blocksOf(service),
    };
  });
}
