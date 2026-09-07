"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 1800;
const PAUSE_MS = 220;

/**
 * Types each role, holds, erases, moves on. The old site had the caret CSS and
 * the markup for this but no script — renderBanner() overwrote it.
 *
 * `len` starts at the first role's full length so the server-rendered markup
 * shows a complete role rather than an empty line that fills in after hydration.
 */
export default function RoleRotator({ roles }: { roles: readonly string[] }) {
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(roles[0]?.length ?? 0);
  const [erasing, setErasing] = useState(false);

  const current = roles[index] ?? "";

  useEffect(() => {
    if (reduced || roles.length < 2) return;

    let timer: ReturnType<typeof setTimeout>;

    if (!erasing && len < current.length) {
      timer = setTimeout(() => setLen(len + 1), TYPE_MS);
    } else if (!erasing) {
      timer = setTimeout(() => setErasing(true), HOLD_MS);
    } else if (len > 0) {
      timer = setTimeout(() => setLen(len - 1), ERASE_MS);
    } else {
      // Also in a timer, not the effect body: a synchronous setState here would
      // cascade a render, and the short pause between roles reads better anyway.
      timer = setTimeout(() => {
        setErasing(false);
        setIndex((i) => (i + 1) % roles.length);
      }, PAUSE_MS);
    }

    return () => clearTimeout(timer);
  }, [len, erasing, current, reduced, roles.length]);

  return (
    <>
      <span aria-hidden="true" className="text-accent">
        <span className={reduced ? undefined : "caret"}>
          {reduced ? roles[0] : current.slice(0, len)}
        </span>
      </span>
      {/* Screen readers get the full list once, not a character-by-character stream. */}
      <span className="sr-only">{roles.join(", ")}</span>
    </>
  );
}
