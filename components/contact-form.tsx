"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { sendMessage, type ContactState } from "@/app/actions";
import { LIMITS } from "@/lib/contact";

const FIELD_ORDER = ["name", "email", "message"] as const;

export default function ContactForm() {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    sendMessage,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Move focus to the first invalid field, matching the old emailInput.focus().
  useEffect(() => {
    if (!state || state.ok || !state.errors) return;
    const first = FIELD_ORDER.find((f) => state.errors?.[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  }, [state]);

  const errors = state && !state.ok ? state.errors : undefined;
  const err = (field: (typeof FIELD_ORDER)[number]) => errors?.[field];

  const fieldClass = (field: (typeof FIELD_ORDER)[number]) =>
    `w-full rounded-lg border bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none ${
      err(field) ? "border-error" : "border-line"
    }`;

  return (
    <form ref={formRef} action={action} noValidate className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.nameMax}
          placeholder="Your name"
          aria-invalid={err("name") ? true : undefined}
          aria-describedby={err("name") ? "name-error" : undefined}
          className={fieldClass("name")}
        />
        {err("name") && (
          <p id="name-error" role="alert" className="mt-2 text-sm text-error">
            {err("name")}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.emailMax}
          placeholder="you@example.com"
          aria-invalid={err("email") ? true : undefined}
          aria-describedby={err("email") ? "email-error" : undefined}
          className={fieldClass("email")}
        />
        {err("email") && (
          <p id="email-error" role="alert" className="mt-2 text-sm text-error">
            {err("email")}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.messageMax}
          placeholder="What would you like to build?"
          aria-invalid={err("message") ? true : undefined}
          aria-describedby={err("message") ? "message-error" : undefined}
          className={`${fieldClass("message")} resize-y`}
        />
        {err("message") && (
          <p id="message-error" role="alert" className="mt-2 text-sm text-error">
            {err("message")}
          </p>
        )}
      </div>

      {/* display:none, not off-screen — screen readers skip it, naive bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Leave this empty</label>
        <input
          id="_gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isPending ? "Sending…" : "Send Message"}
      </button>

      {/* One region for both outcomes. No toast: an error the user must act on
          shouldn't auto-dismiss, and can vanish mid-announcement. */}
      <div role="status" aria-live="polite" className="min-h-6">
        {state?.ok && (
          <p className="inline-flex items-center gap-2 text-sm text-success">
            <CircleCheck className="size-4" aria-hidden="true" />
            Message sent — I&apos;ll get back to you soon.
          </p>
        )}
        {state && !state.ok && state.formError && (
          <p className="inline-flex items-center gap-2 text-sm text-error">
            <TriangleAlert className="size-4" aria-hidden="true" />
            {state.formError}
          </p>
        )}
      </div>
    </form>
  );
}
