import assert from "node:assert/strict";
import { test } from "node:test";
import { cn } from "./utils.js";

test("cn keeps text-fluid-* as a font size alongside text colours", () => {
  assert.equal(cn("p-2 text-sm text-white text-fluid-16"), "p-2 text-white text-fluid-16");
  assert.equal(cn("text-fluid-16 text-ink"), "text-fluid-16 text-ink");
});
