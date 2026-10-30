import { rawMetaTags } from "@/lib/meta-tags";

// React's names for the attributes that differ from HTML.
const REACT_PROPS = { "http-equiv": "httpEquiv", itemprop: "itemProp" };

// CMS meta tags Next's metadata can't write (property=, itemprop, http-equiv, name= with media).
// Attributes keep the order the CMS wrote them in.
// React hoists <meta> into <head>, except itemProp ones, which stay where they are rendered.
export default function MetaTags({ html }) {
  return rawMetaTags(html).map((attrs, index) => (
    <meta
      key={index}
      {...Object.fromEntries(
        Object.entries(attrs).map(([key, value]) => [
          REACT_PROPS[key] ?? key,
          value,
        ]),
      )}
    />
  ));
}
