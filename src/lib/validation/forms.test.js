import assert from "node:assert/strict";
import { test } from "node:test";
import {
  contactSchema,
  offerSchema,
  pageEnquirySchema,
  quoteSchema,
  testDriveSchema,
} from "./forms.js";
import { containsCode, containsMarkup } from "./patterns.js";

const good = {
  name: "  Ahmed   Al-Said ",
  email: "Ahmed@Example.com",
  phone: "+968 9123-4567",
  message: "I would like more information about the Navigator.",
};

test("valid contact data is cleaned and normalised", () => {
  const r = contactSchema.safeParse(good);
  assert.equal(r.success, true);
  assert.deepEqual(r.data, {
    name: "Ahmed Al-Said",
    email: "ahmed@example.com",
    phone: "+96891234567",
    message: good.message,
  });
});

test("unicode and Arabic names are accepted", () => {
  for (const n of ["أحمد السعيد", "José O'Brien", "Anne-Marie", "Dr. Smith"]) {
    assert.equal(
      contactSchema.safeParse({ ...good, name: n }).success,
      true,
      n,
    );
  }
});

test("names reject digits, symbols and markup", () => {
  for (const n of [
    "",
    "A",
    "John3",
    "<b>John</b>",
    "Bob; DROP TABLE x",
    "x".repeat(61),
    "Jo$hn",
  ]) {
    assert.equal(
      contactSchema.safeParse({ ...good, name: n }).success,
      false,
      n,
    );
  }
});

test("emails reject bad formats and markup", () => {
  for (const e of [
    "",
    "a",
    "a@b",
    "a..b@c.com",
    "a b@c.com",
    "<x>@c.com",
    "a@c.com<script>",
  ]) {
    assert.equal(
      contactSchema.safeParse({ ...good, email: e }).success,
      false,
      e,
    );
  }
});

test("phones: E.164 style only", () => {
  for (const p of ["91234567", "+14155552671", "(968) 9123 4567"]) {
    assert.equal(
      contactSchema.safeParse({ ...good, phone: p }).success,
      true,
      p,
    );
  }
  for (const p of [
    "",
    "123",
    "abcdefgh",
    "+0123456789",
    "1111111111",
    "+968 9123 456 78901234",
    "12345<script>",
  ]) {
    assert.equal(
      contactSchema.safeParse({ ...good, phone: p }).success,
      false,
      p,
    );
  }
});

test("messages reject markup, code, SQL and template injection", () => {
  const bad = [
    "<script>alert(1)</script> hello world",
    "hello <img src=x onerror=alert(1)> world",
    "click javascript:alert(1) please now",
    "&lt;script&gt;alert(1)&lt;/script&gt;",
    "%3Cscript%3Ealert(1)%3C/script%3E hi",
    "＜script＞alert(1)＜/script＞ hello",
    "x' OR 1=1 -- and more text",
    "1; DROP TABLE users; -- bye bye",
    "a UNION SELECT password FROM users",
    "hello {{7*7}} world there",
    "hello ${process.env.KEY} world",
    "const a = require('fs') nothing",
    "function () { return 1 } now",
    "../../etc/passwd read this please",
    "hello\u0000world with a null byte",
  ];
  for (const m of bad) {
    assert.equal(
      contactSchema.safeParse({ ...good, message: m }).success,
      false,
      m,
    );
  }
});

test("normal sentences are not flagged", () => {
  const ok = [
    "Hi, I'd like to select a time from the list. Thanks!",
    "Can you update me on the price? It's 5 < 10 for me.",
    "Please call me - I'm available 9am-5pm.",
    "I want to drop by the showroom and see the Navigator, Aviator & Corsair.",
  ];
  for (const m of ok) {
    assert.equal(
      contactSchema.safeParse({ ...good, message: m }).success,
      true,
      m,
    );
    assert.equal(containsMarkup(m) || containsCode(m), false, m);
  }
});

test("contact message is optional but still validated when filled", () => {
  const { message: _omit, ...noMessage } = good;
  assert.equal(contactSchema.safeParse(noMessage).success, true);
  assert.equal(
    contactSchema.safeParse({ ...good, message: "   " }).success,
    true,
  );
  assert.equal(
    contactSchema.safeParse({ ...good, message: "short" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...good, message: "<script>alert(1)</script>" })
      .success,
    false,
  );
});

test("message length, links and repeats", () => {
  assert.equal(
    contactSchema.safeParse({ ...good, message: "short" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...good, message: "a ".repeat(501) }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      ...good,
      message: "see http://a.com http://b.com http://c.com ok",
    }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      ...good,
      message: "aaaaaaaaaaaaaaaa hello there",
    }).success,
    false,
  );
});

test("offer needs model and interested labels", () => {
  const base = { ...good, model: "Navigator", interested: "Test drive" };
  assert.equal(offerSchema.safeParse(base).success, true);
  assert.equal(offerSchema.safeParse({ ...base, model: "" }).success, false);
  assert.equal(
    offerSchema.safeParse({ ...base, interested: "<b>x</b>" }).success,
    false,
  );
});

test("quote needs numeric vehicle, marketing choice and accepted terms", () => {
  const base = { ...good, vehicle: "3", marketing: "yes", agree: true };
  assert.equal(quoteSchema.safeParse(base).success, true);
  assert.equal(
    quoteSchema.safeParse({ ...base, vehicle: "abc" }).success,
    false,
  );
  assert.equal(quoteSchema.safeParse({ ...base, agree: false }).success, false);
  assert.equal(
    quoteSchema.safeParse({ ...base, marketing: undefined }).success,
    false,
  );
});

test("test drive validates the date window and optional time", () => {
  const d = (offset) => {
    const t = new Date();
    t.setDate(t.getDate() + offset);
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  };
  const base = {
    ...good,
    vehicle: "1",
    date: d(5),
    time: "",
    marketing: "no",
    agree: true,
  };
  assert.equal(testDriveSchema.safeParse(base).success, true);
  assert.equal(
    testDriveSchema.safeParse({ ...base, time: "Morning" }).success,
    true,
  );
  assert.equal(
    testDriveSchema.safeParse({ ...base, time: "<b>" }).success,
    false,
  );
  assert.equal(
    testDriveSchema.safeParse({ ...base, date: d(-5) }).success,
    false,
  );
  assert.equal(
    testDriveSchema.safeParse({ ...base, date: d(400) }).success,
    false,
  );
  assert.equal(
    testDriveSchema.safeParse({ ...base, date: "2026-02-31" }).success,
    false,
  );
  assert.equal(testDriveSchema.safeParse({ ...base, date: "" }).success, false);
});

test("page enquiry (owners / offers) needs a plain subject and has no phone", () => {
  const base = {
    name: good.name,
    email: good.email,
    subject: "Service enquiry",
    message: "",
  };
  assert.equal(pageEnquirySchema.safeParse(base).success, true);
  assert.equal(
    pageEnquirySchema.safeParse({ ...base, subject: "" }).success,
    false,
  );
  assert.equal(
    pageEnquirySchema.safeParse({ ...base, subject: "Hi" }).success,
    false,
  );
  assert.equal(
    pageEnquirySchema.safeParse({ ...base, subject: "x".repeat(101) }).success,
    false,
  );
  for (const s of [
    "<b>Sale</b>",
    "x' OR 1=1 --",
    "{{7*7}} hello",
    "see http://spam.com now",
  ]) {
    assert.equal(
      pageEnquirySchema.safeParse({ ...base, subject: s }).success,
      false,
      s,
    );
  }
  assert.equal(
    pageEnquirySchema.safeParse({ ...base, message: "short" }).success,
    false,
  );
});
