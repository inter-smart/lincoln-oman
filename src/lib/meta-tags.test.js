import assert from "node:assert/strict";
import { test } from "node:test";
import { metadataFromTags } from "./meta-tags.js";

test("returns no fields for empty or missing input", () => {
  assert.deepEqual(metadataFromTags(null), {});
  assert.deepEqual(metadataFromTags(""), {});
});

test("name= metas go to `other`, identical repeats collapse, distinct repeats become an array", () => {
  const html = `<meta name="author" content="John Doe">\r\n<meta name="author" content="John Doe"><meta name="author" content="John Doe">
    <meta name="theme-color" content="#111"><meta name="theme-color" content="#222">`;
  assert.deepEqual(metadataFromTags(html), {
    other: { author: "John Doe", "theme-color": ["#111", "#222"] },
  });
});

test("og:image and its alt/size attach to openGraph.images", () => {
  const html = `<meta property="og:image" content="/a.jpg"><meta property="og:image:alt" content="A">
    <meta property="og:image:width" content="1200"><meta property="og:image" content="/b.jpg">`;
  assert.deepEqual(metadataFromTags(html).openGraph, {
    images: [{ url: "/a.jpg", alt: "A", width: "1200" }, { url: "/b.jpg" }],
  });
});

test("twitter image/site/creator map to the twitter fields; other twitter names stay in `other`", () => {
  const html = `<meta name="twitter:image" content="/t.jpg"><meta name="twitter:site" content="@lincoln">
    <meta name="twitter:creator" content="@me"><meta name="twitter:image:alt" content="T">`;
  assert.deepEqual(metadataFromTags(html), {
    twitter: { images: ["/t.jpg"], site: "@lincoln", creator: "@me" },
    other: { "twitter:image:alt": "T" },
  });
});

test("alternate links with hreflang map to languages", () => {
  const html = `<link rel="alternate" hreflang="ar" href="https://x.test/ar"><link rel="alternate" href="https://x.test/feed">`;
  assert.deepEqual(metadataFromTags(html), {
    languages: { ar: "https://x.test/ar" },
  });
});

test("tags the page owns or Next cannot render are dropped", () => {
  const html = `<meta name="robots" content="index"><meta name="description" content="x">
    <meta property="og:title" content="x"><meta property="og:url" content="x"><meta name="twitter:card" content="x">
    <meta property="article:author" content="x"><meta itemprop="name" content="x">
    <link rel="canonical" href="https://x.test/"><script type="application/ld+json">{"@type":"Organization"}</script>
    <script>alert(1)</script>`;
  assert.deepEqual(metadataFromTags(html), {});
});
