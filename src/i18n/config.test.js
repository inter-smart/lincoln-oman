import assert from "node:assert/strict";
import { test } from "node:test";
import {
  dirOf,
  localizedHref,
  negotiateLocale,
  switchLocalePath,
} from "./config.js";

test("dirOf", () => {
  assert.equal(dirOf("ar"), "rtl");
  assert.equal(dirOf("en"), "ltr");
});

test("localizedHref prefixes internal paths only", () => {
  assert.equal(localizedHref("/", "ar"), "/ar");
  assert.equal(localizedHref("/about?x=1", "ar"), "/ar/about?x=1");
  assert.equal(localizedHref("/ar/about", "en"), "/ar/about");
  assert.equal(localizedHref("https://a.com", "ar"), "https://a.com");
  assert.equal(localizedHref("#top", "ar"), "#top");
  assert.equal(localizedHref("mailto:a@b.c", "ar"), "mailto:a@b.c");
});

test("switchLocalePath keeps the rest of the path", () => {
  assert.equal(switchLocalePath("/en", "ar"), "/ar");
  assert.equal(switchLocalePath("/en/newsroom/x", "ar"), "/ar/newsroom/x");
  assert.equal(switchLocalePath("/about", "ar"), "/ar/about");
});

test("negotiateLocale", () => {
  assert.equal(negotiateLocale("ar-OM,ar;q=0.9,en;q=0.8"), "ar");
  assert.equal(negotiateLocale("fr-FR,en;q=0.5"), "en");
  assert.equal(negotiateLocale("fr"), "en");
  assert.equal(negotiateLocale(null), "en");
});
