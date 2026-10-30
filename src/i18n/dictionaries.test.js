import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { format } from "./format.js";

const load = (name) =>
  JSON.parse(
    readFileSync(
      new URL(`../dictionaries/${name}.json`, import.meta.url),
      "utf8",
    ),
  );

function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

test("ar.json has exactly the keys of en.json", () => {
  assert.deepEqual(keys(load("ar")).sort(), keys(load("en")).sort());
});

test("format fills placeholders", () => {
  assert.equal(format("Go to {page}", { page: "Home" }), "Go to Home");
  assert.equal(format("Go to {page}"), "Go to {page}");
});
