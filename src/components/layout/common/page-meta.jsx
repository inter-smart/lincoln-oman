// Extra head tags from the API's `other_meta_tags`. React 19 hoists <meta> and <link> into <head>.
export default function PageMeta({ tags }) {
  if (!tags) return null;

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
