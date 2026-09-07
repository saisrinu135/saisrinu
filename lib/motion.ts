import type { Transition, Variants } from "motion/react";

export const EASE = [0.22, 0.61, 0.24, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
};

/**
 * Every variant here is built by a factor that takes `reduced`, so a single
 * useReducedMotion() read at the component collapses the whole set to an
 * opacity-only crossfade. No transform ever survives reduced motion.
 */
export function riseVariants(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 16, filter: reduced ? "none" : "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "none",
      transition: { duration: reduced ? 0 : 0.55, ease: EASE },
    },
  };
}

export function staggerVariants(reduced: boolean, stagger = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };
}

/** Shared whileInView config so every section enters at the same point. */
export const inView = { once: true, margin: "-80px" } as const;
