import assert from "node:assert/strict";
import { test } from "node:test";
import { home as staticHome } from "../../data/home.js";
import { ApiError } from "../api/request.js";
import { htmlListItems, htmlParagraphs, htmlToText } from "./html.js";
import { mapHome } from "./home.js";

const M = "https://lincoln.dev2.intersmarthosting.in/storage";
const li = (text, bullet = true) =>
  `<li class="flex items-center gap-[21px]">${bullet ? '<img alt="" width="10" src="x/bullet.svg">' : ""}${text}</li>`;

// Trimmed copy of the real GET /api/home data (sliders included to prove the hero is ignored).
const payload = {
  sliders: [{ id: 1, title: "Hero", video: `${M}/25/navigator.mp4` }],
  home_cms: {
    section_one: { title: "Explore Lincoln Line" },
    section_two: {
      title: "The Lincoln Legacy",
      description: "<p><span>At Arabian Car Marketing &amp; more.</span></p>",
      button_name: "Hear The Story!",
      link: "https://lincoln-oman.intersmarthosting.in/about",
    },
    section_three: {
      title: "The Lincoln Continental",
      subtitle: "Command the Road in Comfort",
      description: "<p><span>Crafted for those who expect more.</span></p>",
      banner_title: "Continental",
      alt_tag: "Continental card",
      banner_image: `${M}/36/continental-bg.webp`,
      image: `${M}/37/continental-card.webp`,
      video: `${M}/38/navigator.mp4`,
    },
    section_four: {
      title: "The Lincoln Navigator",
      subtitle: "Power Meets Prestige",
      description: "<p><span>Command attention.</span></p>",
      banner_title: "Navigator",
      alt_tag: "Navigator",
      banner_image: `${M}/39/navigator-bg.webp`,
      image: `${M}/40/navigator-card.webp`,
      video: `${M}/41/navigator.mp4`,
    },
    section_five: {
      title: "Upgrade to Lincoln Luxury",
      description:
        '<p class="mt-[12px]">Attractive exchange bonuses.</p>\r\n<p class="mt-[9px]">Offer ends on: August 31st 2025</p>',
      button_one_title: "Connect with Us",
      button_one_link: "/contact",
      button_two_title: "View More",
      button_two_link: "/about",
      alt_tag: "Lincoln Luxury",
      image: `${M}/42/offer.webp`,
    },
    section_six: {
      title: "Ownership Experience",
      description: `<ul class="mt-[24px]">\r\n${li("Vehicle Maintenance", false)}\r\n${li("Warranty Coverage")}\r\n${li("Lincoln Road Assist (RSA)")}\r\n</ul>`,
      button_title: "Learn More",
      button_link: "/contact",
      alt_tag: "Ownership Experience",
      image: `${M}/43/offer.webp`,
    },
    section_seven: { title: "Lincoln Newsroom" },
  },
  explore_lincoln_line: [
    {
      name: "Navigator",
      slug: "navigator",
      image: `${M}/73/banner.webp`,
      video: `${M}/76/navigator.mp4`,
      features: [
        { icon: `${M}/81/engine.webp`, title: "Powerful EcoBoost V6" },
        { icon: `${M}/82/interior.webp`, title: "Luxury Interior & 7-8 Seats" },
      ],
    },
    {
      name: "Aviator",
      slug: "aviator",
      image: `${M}/58/banner.webp`,
      video: `${M}/61/navigator.mp4`,
      features: [],
    },
  ],
  news: [
    {
      id: 4,
      title: "Extraordinary Lincoln",
      slug: "extraordinary-lincoln",
      short_description: null,
      published_on: "27 Oct 2026",
      media: { image: `${M}/117/news-4.webp`, alt: "Extraordinary Lincoln" },
    },
    {
      id: 1,
      title: "Nautilus nominated",
      slug: "nautilus-nominated",
      short_description: null,
      published_on: "9 Mar 2020",
      media: { image: `${M}/108/news-1.webp`, alt: "Nautilus nominated" },
    },
  ],
  banner: { meta_title: "Home", meta_description: null },
};

test("htmlToText flattens markup and decodes entities", () => {
  assert.equal(
    htmlToText(
      "<p><span>Tom &amp; Jerry&nbsp;&#39;s</span></p>\r\n<p>Next</p>",
    ),
    "Tom & Jerry 's Next",
  );
  assert.equal(htmlToText(null), "");
});

test("htmlParagraphs and htmlListItems return the text of each element", () => {
  assert.deepEqual(
    htmlParagraphs('<p class="a">One</p>\r\n<p> </p><p>Two</p>'),
    ["One", "Two"],
  );
  assert.deepEqual(htmlListItems(`<ul>${li("A", false)}${li("B")}</ul>`), [
    "A",
    "B",
  ]);
});

test("mapHome builds every home section except the hero", () => {
  const result = mapHome(payload);
  assert.deepEqual(Object.keys(result).sort(), [
    "continental",
    "legacy",
    "models",
    "navigator",
    "news",
    "offer",
    "ownership",
    "seo",
  ]);
  assert.equal("hero" in result, false);
});

test("mapHome keeps the same keys as the static home data", () => {
  const result = mapHome(payload);
  const keys = (object) => Object.keys(object).sort();
  for (const section of [
    "models",
    "legacy",
    "continental",
    "navigator",
    "offer",
    "ownership",
    "news",
  ]) {
    assert.deepEqual(keys(result[section]), keys(staticHome[section]), section);
  }
  assert.deepEqual(
    keys(result.models.items[0]),
    keys(staticHome.models.items[0]),
  );
  assert.deepEqual(keys(result.news.items[0]), keys(staticHome.news.items[0]));
  assert.deepEqual(
    keys(result.models.items[0].specs[0]),
    keys(staticHome.models.items[0].specs[0]),
  );
  assert.deepEqual(
    keys(result.models.items[0].specs[0].icon),
    keys(staticHome.models.items[0].specs[0].icon),
  );
});

test("models get an id, route href and specs; no features gives no specs", () => {
  const { models } = mapHome(payload);
  assert.equal(models.title, "Explore Lincoln Line");
  assert.equal(models.items[0].id, "navigator");
  assert.equal(models.items[0].href, "/vehicles/navigator");
  assert.deepEqual(models.items[0].specs[1], {
    id: "luxury-interior-7-8-seats",
    label: "Luxury Interior & 7-8 Seats",
    icon: { src: `${M}/82/interior.webp`, width: 28, height: 28 },
  });
  assert.deepEqual(models.items[1].specs, []);
});

test("legacy text is plain and the cta keeps its label and link", () => {
  const { legacy } = mapHome(payload);
  assert.equal(legacy.text, "At Arabian Car Marketing & more.");
  assert.deepEqual(legacy.cta, {
    label: "Hear The Story!",
    href: "https://lincoln-oman.intersmarthosting.in/about",
  });
});

test("showcases order their panels and reuse the card photo as the video poster", () => {
  const { continental, navigator } = mapHome(payload);
  assert.equal(continental.word, "Continental");
  assert.equal(continental.background, `${M}/36/continental-bg.webp`);
  assert.equal(continental.text, "Crafted for those who expect more.");
  assert.deepEqual(
    continental.media.map((item) => ("image" in item ? "image" : "video")),
    ["image", "video"],
  );
  assert.deepEqual(
    navigator.media.map((item) => ("image" in item ? "image" : "video")),
    ["video", "image"],
  );
  assert.equal(continental.media[1].poster, `${M}/37/continental-card.webp`);
  assert.equal(continental.media[0].alt, "Continental card");
});

test("offer splits the text from the note and fixes the contact link", () => {
  const { offer } = mapHome(payload);
  assert.equal(offer.text, "Attractive exchange bonuses.");
  assert.equal(offer.note, "Offer ends on: August 31st 2025");
  assert.deepEqual(offer.actions, [
    { id: "primary", label: "Connect with Us", href: "/contact-us" },
    { id: "secondary", label: "View More", href: "/about" },
  ]);
});

test("ownership lists come from the HTML list, not its markup", () => {
  const { ownership } = mapHome(payload);
  assert.deepEqual(ownership.items, [
    { id: "vehicle-maintenance", label: "Vehicle Maintenance" },
    { id: "warranty-coverage", label: "Warranty Coverage" },
    { id: "lincoln-road-assist-rsa", label: "Lincoln Road Assist (RSA)" },
  ]);
  assert.deepEqual(ownership.cta, { label: "Learn More", href: "/contact-us" });
});

test("news parses the date without timezone drift and builds links", () => {
  const { news } = mapHome(payload);
  assert.equal(news.title, "Lincoln Newsroom");
  assert.deepEqual(news.more, { label: "View More", href: "/newsroom" });
  assert.equal(news.readMore, "Read More");
  assert.deepEqual(news.items[0], {
    id: "4",
    title: "Extraordinary Lincoln",
    href: "/newsroom/extraordinary-lincoln",
    image: `${M}/117/news-4.webp`,
    position: "50% 50%",
    date: "27.10.2026",
    datetime: "2026-10-27",
  });
  assert.equal(news.items[1].date, "09.03.2020");
  assert.equal(news.items[1].datetime, "2020-03-09");
});

test("seo drops empty meta values", () => {
  assert.deepEqual(mapHome(payload).seo, {
    title: "Home",
    description: undefined,
  });
});

test("mapHome throws a 502 ApiError when a block is missing", () => {
  for (const broken of [
    null,
    {},
    { ...payload, home_cms: { ...payload.home_cms, section_five: null } },
    { ...payload, news: undefined },
    { ...payload, explore_lincoln_line: undefined },
  ]) {
    assert.throws(
      () => mapHome(broken),
      (error) => error instanceof ApiError && error.status === 502,
    );
  }
});

test("mapHome throws on an unreadable news date", () => {
  const bad = {
    ...payload,
    news: [{ ...payload.news[0], published_on: "soon" }],
  };
  assert.throws(() => mapHome(bad), ApiError);
});
