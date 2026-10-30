import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate, formatExpiry } from "./format-date.js";

test("formatExpiry turns an ISO date into the design's label", () => {
  assert.deepEqual(formatExpiry("2027-01-07"), {
    label: "Jan 7, 2027",
    dateTime: "2027-01-07",
  });
  assert.deepEqual(formatExpiry("2026-12-31"), {
    label: "Dec 31, 2026",
    dateTime: "2026-12-31",
  });
});

test("formatExpiry accepts an ISO timestamp", () => {
  assert.equal(
    formatExpiry("2027-01-07T00:00:00.000000Z").label,
    "Jan 7, 2027",
  );
});

test("formatExpiry falls back to the raw text for anything else", () => {
  assert.deepEqual(formatExpiry("Soon"), {
    label: "Soon",
    dateTime: undefined,
  });
  assert.deepEqual(formatExpiry("2027-13-01"), {
    label: "2027-13-01",
    dateTime: undefined,
  });
  assert.deepEqual(formatExpiry(undefined), {
    label: undefined,
    dateTime: undefined,
  });
});

test("formatDate still handles the news format", () => {
  assert.deepEqual(formatDate("27 Oct 2026"), {
    label: "27.10.2026",
    dateTime: "2026-10-27",
  });
});

test("formatExpiry formats in the requested language with Latin digits", () => {
  assert.equal(formatExpiry("2027-01-07").label, "Jan 7, 2027");
  const ar = formatExpiry("2027-01-07", "ar").label;
  assert.match(ar, /2027/);
  assert.match(ar, /7/);
  assert.notEqual(ar, "Jan 7, 2027");
});
