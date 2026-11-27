import assert from "node:assert/strict";
import { test } from "node:test";
import { cleanQuery } from "./clean-query.js";

const clean = (pathname, query) =>
  cleanQuery(pathname, new URLSearchParams(query))?.toString() ?? null;

test("leaves an allowed or empty query alone", () => {
  assert.equal(clean("/en/about", ""), null);
  assert.equal(clean("/en", "utm_source=a&gclid=b&_rsc=c"), null);
  assert.equal(clean("/en/gallery", "page=2"), null);
  assert.equal(
    clean("/ar/special-offers", "location=muscat&location_id=1&page=2"),
    null,
  );
});

test("drops unknown params and keeps the allowed ones", () => {
  assert.equal(clean("/en", "s=test"), "");
  assert.equal(clean("/en/about", "s="), "");
  assert.equal(
    clean("/en/gallery", "s=1&page=2&utm_medium=x"),
    "page=2&utm_medium=x",
  );
});

test("page params are allowed only on the route that reads them", () => {
  assert.equal(clean("/en/about", "page=2"), "");
  assert.equal(clean("/en/gallery", "location=muscat"), "");
  assert.equal(clean("/en/special-offers/summer", "page=2"), "");
});

test("matches routes with or without the language prefix", () => {
  assert.equal(clean("/special-offers", "page=2"), null);
  assert.equal(clean("/gallery", "page=2&s=1"), "page=2");
});
