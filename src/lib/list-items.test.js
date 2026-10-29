import test from "node:test";
import assert from "node:assert/strict";
import { listItems, textBeforeList } from "./list-items.js";

const html =
  '<p>Intro</p>\r\n<ul>\r\n<li>One</li>\r\n<li><img src="x.svg">Two</li>\r\n</ul>';

test("listItems returns each <li> content without the CMS bullet image", () => {
  assert.deepEqual(listItems(html), ["One", "Two"]);
  assert.deepEqual(listItems(null), []);
});

test("textBeforeList keeps only what precedes the list", () => {
  assert.equal(textBeforeList(html), "<p>Intro</p>");
  assert.equal(textBeforeList("<p>No list</p>"), "<p>No list</p>");
  assert.equal(textBeforeList(undefined), "");
});
