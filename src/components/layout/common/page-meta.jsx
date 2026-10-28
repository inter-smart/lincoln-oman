import { htmlMetaTags } from "@/lib/meta-tags";

// Extra head tags from the API's `banner.other_meta_tags` (a raw HTML string).
// htmlMetaTags keeps only safe <meta>, canonical/alternate <link> and valid JSON-LD. React 19 hoists them into <head>.
export default function PageMeta({ html }) {
  const tags = htmlMetaTags(html);

  return (
    <>
      {tags.meta.map((attrs, index) => (
        <meta key={`meta-${index}`} {...attrs} />
      ))}
      {tags.links.map((attrs, index) => (
        <link key={`link-${index}`} {...attrs} />
      ))}
      {tags.jsonLd.map((json, index) => (
        <script
          key={`ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
