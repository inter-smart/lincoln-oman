import assert from "node:assert/strict";
import { test } from "node:test";
import { htmlToBlocks, ownersSections } from "./owners-sections.js";

const text =
  "mt-3 text-sm leading-6.5 whitespace-pre-line sm:text-[15px] xl:text-fluid-16";
const h30 = "mt-6 font-display xl:text-fluid-30";
const h25 = "mt-6 font-display xl:text-fluid-25";
const sub = "mt-2 text-lg xl:text-fluid-22";

test("unclassed paragraphs and spans become text, entities decoded", () => {
  assert.deepEqual(
    htmlToBlocks("<p><span>Lincoln&rsquo;s road &amp; assist</span></p>"),
    [{ type: "text", text: "Lincoln’s road & assist" }],
  );
});

test("the CMS classes pick the block type", () => {
  const html = [
    `<p class="${sub}">Precision.</p>`,
    `<p class="${text}">Body</p>`,
    `<h3 class="${h30}">Warranty &ndash; Market</h3>`,
    `<h3 class="${h25}">Heading</h3>`,
  ].join("\r\n");
  assert.deepEqual(htmlToBlocks(html), [
    { type: "subtitle", text: "Precision." },
    { type: "text", text: "Body" },
    { type: "title", text: "Warranty – Market" },
    { type: "heading", text: "Heading" },
  ]);
});

test("a heading with one paragraph in a div is a feature", () => {
  const html = `<div class="mt-4"><h3 class="x">Designed</h3>\r\n<p class="${text}">Fit.</p></div>`;
  assert.deepEqual(htmlToBlocks(html), [
    { type: "feature", title: "Designed", text: "Fit." },
  ]);
});

test("lists keep their items and the two-column flag", () => {
  const html =
    '<ul class="list-disc sm:columns-2"><li class="a">One</li>\r\n<li>Two &amp; three</li></ul><ul class="list-disc "><li>Solo</li></ul>';
  assert.deepEqual(htmlToBlocks(html), [
    { type: "list", items: ["One", "Two & three"], columns: 2 },
    { type: "list", items: ["Solo"] },
  ]);
});

test("empty and null give no blocks", () => {
  assert.deepEqual(htmlToBlocks(null), []);
  assert.deepEqual(htmlToBlocks("<p>&nbsp;</p>"), []);
});

const top = { path: "top.webp", alt: "Owners" };
const noImage = { path: null, alt: "x" };

test("the first section gets the top image, later ones none", () => {
  const sections = ownersSections(
    [
      { id: 1, title: "A B", description_one: "<p>One</p>", image: noImage },
      { id: 2, title: "C", description_one: "<p>Two</p>", image: noImage },
    ],
    top,
  );
  assert.equal(sections[0].id, "a-b");
  assert.deepEqual(sections[0].image, {
    src: "top.webp",
    alt: "Owners",
    ratio: "1166/440",
  });
  assert.equal(sections[1].image, undefined);
});

test("an image with a second text sits beside it, text after the wrapper follows", () => {
  const [section] = ownersSections(
    [
      {
        id: 5,
        title: "Protect",
        description_one: `<p class="${text}">Intro</p>`,
        description_two: `<div class="mt-8 grid md:grid-cols-2">\r\n<div class="*:first:mt-0">\r\n<h3 class="${h25}">Premium</h3>\r\n<p class="${text}">Side</p>\r\n<ul class="list-disc "><li>A</li></ul>\r\n</div>\r\n</div>\r\n<h3 class="${h25}">Transfer</h3>\r\n<p class="${text}">After</p>`,
        image: { path: "p.webp", alt: "Protect" },
      },
    ],
    null,
  );
  assert.equal(section.image, undefined);
  assert.deepEqual(section.blocks, [
    { type: "text", text: "Intro" },
    {
      type: "media",
      image: {
        src: "p.webp",
        alt: "Protect",
        ratio: "455/363",
        position: "50% 6%",
      },
      blocks: [
        { type: "heading", text: "Premium" },
        { type: "text", text: "Side" },
        { type: "list", items: ["A"] },
      ],
    },
    { type: "heading", text: "Transfer" },
    { type: "text", text: "After" },
  ]);
});

test("an image without a second text leads the section instead", () => {
  const [section] = ownersSections(
    [
      {
        id: 9,
        title: "Solo",
        description_one: "<p>Body</p>",
        description_two: null,
        image: { path: "s.webp", alt: "Solo" },
      },
    ],
    null,
  );
  assert.equal(section.image.src, "s.webp");
  assert.deepEqual(section.blocks, [{ type: "text", text: "Body" }]);
});
