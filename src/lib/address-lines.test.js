import assert from "node:assert/strict";
import { test } from "node:test";
import { addressLines } from "./address-lines.js";

test("returns no lines for empty or missing input", () => {
  assert.deepEqual(addressLines(null), []);
  assert.deepEqual(addressLines(""), []);
});

test("splits the CMS block spans into one line each", () => {
  const html =
    '<p><span class="block">Arabian Car Marketing Co. LLC</span><span class="block">134 Al Romelah Street</span><span class="block">Wattayah Muscat</span></p>';
  assert.deepEqual(addressLines(html), [
    "Arabian Car Marketing Co. LLC",
    "134 Al Romelah Street",
    "Wattayah Muscat",
  ]);
});

test("<br> and paragraphs also end a line, and blank lines are dropped", () => {
  assert.deepEqual(
    addressLines("<p>Line one<br/>Line two</p><p>&nbsp;</p><p>Line three</p>"),
    ["Line one", "Line two", "Line three"],
  );
});

test("decodes common entities", () => {
  assert.deepEqual(addressLines("<p>Smith &amp; Sons</p>"), ["Smith & Sons"]);
});
