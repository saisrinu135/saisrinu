"use server";

import { parseContact, type ContactErrors } from "@/lib/contact";

export type ContactState =
  | { ok: true }
  | { ok: false; errors?: ContactErrors; formError?: string }
  | null;

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: silent fake success. Nothing is forwarded, the Formspree quota is
  // untouched, and the bot sees a win. Enforced server-side so disabling JS
  // doesn't skip it.
  if (formData.get("_gotcha")) return { ok: true };

  const parsed = parseContact(Object.fromEntries(formData));
  if (!parsed.ok) return { ok: false, errors: parsed.errors };

  // ponytail: full UI happy path with zero submissions. Doubles as demo mode.
  if (process.env.CONTACT_DRY_RUN) return { ok: true };

  // A full URL rather than just the form id, so it can be pointed at a local
  // echo server to verify the payload without spending a Formspree submission.
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    // Without this you get a baffling 404 from /f/undefined.
    return { ok: false, formError: "Contact form is not configured." };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // All three fields, assembled here. The old markup silently sent only
      // the email address, because the name input had no `name` attribute and
      // the textarea's was malformed.
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      // The old code never read the body, discarding Formspree's field errors.
      const body = await response.json().catch(() => null);
      return {
        ok: false,
        formError:
          body?.errors?.[0]?.message ??
          "Failed to send message. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, formError: "Something went wrong. Please try again." };
  }
}
