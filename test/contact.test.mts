// .mts + explicit extension on the import: the Next scaffold has no
// "type":"module", so a plain .ts test would be treated as CJS and the import
// would fail, and bare Node can't resolve the "@/" alias.
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { LIMITS, parseContact } from "../lib/contact.ts";

const valid = {
  name: "  Saisrinu  ",
  email: "  saisrinugampa135@gmail.com ",
  message: "  Hello, I would like to talk about a backend role.  ",
};

test("accepts a valid payload and trims every field", () => {
  const result = parseContact(valid);
  assert.equal(result.ok, true);
  assert.deepEqual(result.ok && result.data, {
    name: "Saisrinu",
    email: "saisrinugampa135@gmail.com",
    message: "Hello, I would like to talk about a backend role.",
  });
});

test("rejects a missing name", () => {
  const result = parseContact({ ...valid, name: "   " });
  assert.equal(result.ok, false);
  assert.ok(!result.ok && result.errors.name);
});

test("rejects malformed emails", () => {
  for (const email of ["a@b", "no-at-sign", "a b@c.com", "@c.com", "a@.com"]) {
    const result = parseContact({ ...valid, email });
    assert.equal(result.ok, false, `expected ${email} to be rejected`);
    assert.ok(!result.ok && result.errors.email);
  }
});

test("accepts a minimal well-formed email", () => {
  assert.equal(parseContact({ ...valid, email: "a@b.co" }).ok, true);
});

test("rejects messages that are too short or too long", () => {
  assert.equal(parseContact({ ...valid, message: "too short" }).ok, false);
  assert.equal(
    parseContact({ ...valid, message: "x".repeat(LIMITS.messageMax + 1) }).ok,
    false,
  );
  assert.equal(
    parseContact({ ...valid, message: "x".repeat(LIMITS.messageMax) }).ok,
    true,
  );
});

test("drops the honeypot and any other unknown key", () => {
  const result = parseContact({
    ...valid,
    _gotcha: "i am a bot",
    role: "admin",
  });
  assert.equal(result.ok, true);
  assert.deepEqual(
    result.ok && Object.keys(result.data).sort(),
    ["email", "message", "name"],
  );
});

test("reports every invalid field at once", () => {
  const result = parseContact({ name: "", email: "nope", message: "" });
  assert.equal(result.ok, false);
  assert.deepEqual(
    !result.ok && Object.keys(result.errors).sort(),
    ["email", "message", "name"],
  );
});
