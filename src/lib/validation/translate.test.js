import assert from "node:assert/strict";
import { test } from "node:test";
import { translateMessage } from "./translate.js";

test("translateMessage maps known messages and passes unknown ones through", () => {
  const messages = { "Please enter your name": "الرجاء إدخال اسمك" };
  assert.equal(
    translateMessage(messages, "Please enter your name"),
    "الرجاء إدخال اسمك",
  );
  assert.equal(translateMessage(messages, "Something else"), "Something else");
  assert.equal(translateMessage(undefined, "Hello"), "Hello");
});
