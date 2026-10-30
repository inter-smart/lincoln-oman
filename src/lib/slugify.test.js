import assert from "node:assert/strict";
import { test } from "node:test";
import { locationBySlug, slugify } from "./slugify.js";

test("slugify keeps Latin names as before", () => {
  assert.equal(slugify("Abu Dhabi"), "abu-dhabi");
  assert.equal(slugify("Café Ruwi"), "cafe-ruwi");
});

test("slugify keeps Arabic letters, so Arabic locations never get an empty slug", () => {
  assert.equal(slugify("مسقط"), "مسقط");
  assert.notEqual(slugify("صلالة"), "");
  const locations = [{ name: "مسقط" }, { name: "صلالة" }];
  assert.equal(locationBySlug(locations, slugify("صلالة")), locations[1]);
});
