import assert from "node:assert/strict";
import { test } from "node:test";
import { message } from "./fields.js";

const rejected = {
  "empty field": "",
  "single space": " ",
  "multiple spaces": "     ",
  "multiple tabs": "\t\t\t",
  "multiple newlines": "\n\n\n",
  "single character": "H",
  "special characters only": "@#!$%^&*()",
  "basic script injection": "<script>alert('XSS')</script>",
  "image tag injection": "<img src=x onerror=alert('XSS')>",
  "SQL injection attempt": "'; DROP TABLE messages;--",
  "iframe injection": "<iframe src=\"javascript:alert('XSS')\">",
  "template injection": "{{constructor.constructor('alert(1)')()}}",
  "extremely long message": "A".repeat(5000),
};

const accepted = {
  "two characters": "Hi",
  "text with spaces": " Hello ",
  "various line endings":
    "Message with\nnew lines\rand\tdifferent line endings",
  "valid message with spaces": " This is a test message. ",
  "valid message": "This is a test message.",
  "long message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Arabic message": "مرحبا بكم",
};

for (const [title, value] of Object.entries(rejected))
  test(`message rejects: ${title}`, () => {
    assert.equal(message.safeParse(value).success, false);
  });

for (const [title, value] of Object.entries(accepted))
  test(`message accepts: ${title}`, () => {
    assert.equal(message.safeParse(value).success, true);
  });
