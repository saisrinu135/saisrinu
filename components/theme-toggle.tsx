"use client";

import { Moon, Sun } from "lucide-react";

/**
 * ponytail: no React state here at all. `.dark` already lives on <html>, so
 * CSS knows the current theme — both icons render and the `dark:` variant picks
 * one. That removes the mount effect, the hydration mismatch, and the cascading
 * render the linter (rightly) objected to.
 *
 * Light/dark only, no tri-state "System" picker — that's where hand-rolling
 * starts to hurt. Add next-themes if System is ever wanted.
 */
export default function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.theme = next ? "dark" : "light";
    } catch {
      // Private mode / blocked storage — the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      {/* Accessible name comes from whichever span is displayed — a
          display:none span is excluded from the accessibility tree. */}
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
