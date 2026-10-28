import assert from "node:assert/strict";
import test from "node:test";
import { formatDate } from "./format-date.js";

test("formats '27 Oct 2026' as 27.10.2026 with an ISO dateTime", () => {
  assert.deepEqual(formatDate("27 Oct 2026"), {
    label: "27.10.2026",
    dateTime: "2026-10-27",
  });
});

test("pads single-digit days and accepts long month names", () => {
  assert.deepEqual(formatDate("9 March 2020"), {
    label: "09.03.2020",
    dateTime: "2020-03-09",
  });
});

test("returns the raw text when the format is not recognised", () => {
  assert.deepEqual(formatDate("soon"), { label: "soon", dateTime: undefined });
  assert.deepEqual(formatDate(undefined), {
    label: undefined,
    dateTime: undefined,
  });
});
