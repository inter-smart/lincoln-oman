import assert from "node:assert/strict";
import test from "node:test";
import { htmlMetaTags } from "./html.js";

test("keeps property, name and itemprop meta tags", () => {
  const { meta } = htmlMetaTags(
    `<meta property="og:image" content="https://x.test/a.jpg"><meta name="author" content='Lincoln &amp; Co'><meta itemprop="image" content="b.jpg" />`,
  );
  assert.deepEqual(meta, [
    { property: "og:image", content: "https://x.test/a.jpg" },
    { name: "author", content: "Lincoln & Co" },
    { itemprop: "image", content: "b.jpg" },
  ]);
});

test("drops tags the page already sets, robots and http-equiv", () => {
  const { meta } = htmlMetaTags(
    `<meta name="description" content="d"><meta name="Robots" content="index"><meta property="og:title" content="t"><meta http-equiv="refresh" content="0;url=x"><meta name="keywords" content="k">`,
  );
  assert.deepEqual(meta, []);
});

test("keeps only canonical and alternate links", () => {
  const { links } = htmlMetaTags(
    `<link rel="canonical" href="https://x.test/"><link rel="stylesheet" href="a.css"><link rel="alternate" hreflang="ar" href="https://x.test/ar">`,
  );
  assert.deepEqual(links, [
    { rel: "canonical", href: "https://x.test/" },
    { rel: "alternate", hreflang: "ar", href: "https://x.test/ar" },
  ]);
});

test("keeps valid JSON-LD and drops invalid JSON-LD and other scripts", () => {
  const { jsonLd } = htmlMetaTags(
    `<script type="application/ld+json">{ "@type": "AutoDealer" }</script><script type="application/ld+json">{oops</script><script>alert(1)</script>`,
  );
  assert.deepEqual(jsonLd, ['{"@type":"AutoDealer"}']);
});

test("empty input gives empty lists", () => {
  const empty = { meta: [], links: [], jsonLd: [] };
  assert.deepEqual(htmlMetaTags(null), empty);
  assert.deepEqual(htmlMetaTags(""), empty);
});
