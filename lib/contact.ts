/**
 * Pure contact-form validation. No `next` imports and erasable syntax only, so
 * `node --test --experimental-strip-types` can run it with zero devDependencies.
 *
 * ponytail: ~30 lines of checks instead of zod. Revisit at >3 endpoints or
 * nested payloads.
 */

export type ContactField = "name" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type Contact = { name: string; email: string; message: string };

export type ParseResult =
  | { ok: true; data: Contact }
  | { ok: false; errors: ContactErrors };

// Carried over verbatim from the old script.js.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  nameMax: 80,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
} as const;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContact(input: Record<string, unknown>): ParseResult {
  const name = str(input.name);
  const email = str(input.email);
  const message = str(input.message);

  const errors: ContactErrors = {};

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > LIMITS.nameMax) {
    errors.name = `Please keep your name under ${LIMITS.nameMax} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > LIMITS.emailMax || !EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < LIMITS.messageMin) {
    errors.message = `Please write at least ${LIMITS.messageMin} characters.`;
  } else if (message.length > LIMITS.messageMax) {
    errors.message = `Please keep your message under ${LIMITS.messageMax} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  // Only whitelisted keys are returned, so _gotcha can never leak downstream.
  return { ok: true, data: { name, email, message } };
}
