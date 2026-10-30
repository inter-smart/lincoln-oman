import assert from "node:assert/strict";
import test from "node:test";
import { locationBySlug, slugify } from "./slugify.js";

const locations = [
  { id: 2, name: "India" },
  { id: 1, name: "UAE" },
  { id: 3, name: "Abu Dhabi" },
];

test("slugify lowercases and joins words with dashes", () => {
  assert.equal(slugify("UAE"), "uae");
  assert.equal(slugify("Abu Dhabi"), "abu-dhabi");
});

test("slugify strips accents, symbols and edge dashes", () => {
  assert.equal(slugify("  Café & Bar! "), "cafe-bar");
  assert.equal(slugify(null), "");
});

test("locationBySlug finds the location by its slug", () => {
  assert.equal(locationBySlug(locations, "abu-dhabi").id, 3);
  assert.equal(locationBySlug(locations, "uae").id, 1);
});

test("locationBySlug ignores an empty or unknown slug", () => {
  assert.equal(locationBySlug(locations, ""), undefined);
  assert.equal(locationBySlug(locations, "nonsense"), undefined);
  assert.equal(locationBySlug(undefined, "uae"), undefined);
});
