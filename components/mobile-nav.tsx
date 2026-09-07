"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { NavLink } from "@/content/portfolio";

export default function MobileNav({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;

  // Scroll lock — the old site toggled a .no-scroll class that had no CSS rule.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-60 inline-flex size-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-line text-ink transition-colors hover:border-accent md:hidden"
      >
        {/* Three bars morphing to an X — the old .menu-toggle.active had no CSS. */}
        <span
          aria-hidden="true"
          className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          aria-hidden="true"
          className={`block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          aria-hidden="true"
          className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/*
        Conditionally rendered, not parked at right:-100%. The old stylesheet
        slid the panel off-screen while leaving it in the tab order, so keyboard
        users tabbed into an invisible menu.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: reduced ? 0 : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : "100%" }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 0.61, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-bg px-6 pt-28 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center rounded-lg px-3 text-lg font-medium text-ink transition-colors hover:bg-card hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
