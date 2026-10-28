import assert from "node:assert/strict";
import { test } from "node:test";
import { ApiError, buildUrl, parseBody, unwrapEnvelope } from "./request.js";

test("buildUrl joins base and endpoint without doubling slashes", () => {
  assert.equal(
    buildUrl("https://cms.test/api/", "/newsroom").href,
    "https://cms.test/api/newsroom",
  );
  assert.equal(
    buildUrl("https://cms.test/api", "/newsroom").href,
    "https://cms.test/api/newsroom",
  );
});

test("buildUrl adds params and skips null or undefined values", () => {
  const url = buildUrl("https://cms.test/api", "/newsroom", {
    page: 2,
    q: null,
    x: undefined,
  });
  assert.equal(url.search, "?page=2");
});

test("unwrapEnvelope returns the payload, or the bare object when there is no wrapper", () => {
  assert.deepEqual(unwrapEnvelope({ data: { title: "Home" } }), {
    title: "Home",
  });
  assert.deepEqual(unwrapEnvelope({ title: "Home" }), { title: "Home" });
});

test("ApiError carries status and endpoint, and details default to null", () => {
  const error = new ApiError("failed", { status: 404, endpoint: "/x" });
  assert.equal(error.status, 404);
  assert.equal(error.endpoint, "/x");
  assert.equal(error.details, null);
  assert.ok(error instanceof Error);
});

test("ApiError keeps the response body as details", () => {
  const details = { errors: { email: "Invalid email" } };
  const error = new ApiError("rejected", {
    status: 422,
    endpoint: "/x",
    details,
  });
  assert.deepEqual(error.details, details);
});

test("parseBody parses JSON and returns null for empty or non-JSON bodies", () => {
  assert.deepEqual(parseBody('{"data":{"a":1}}'), { data: { a: 1 } });
  assert.equal(parseBody(""), null);
  assert.equal(parseBody("<html>502 Bad Gateway</html>"), null);
});
