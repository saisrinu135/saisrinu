"use client";

import { motion, useReducedMotion } from "motion/react";
import { inView, riseVariants, staggerVariants } from "@/lib/motion";

/**
 * The single client boundary for scroll animation. Server sections nest their
 * markup inside it as `children`, so the content itself stays server-rendered
 * and only this wrapper ships JS.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "section";
  delay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={riseVariants(reduced)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its `<RevealItem>` children as the group enters. */
export function RevealGroup({
  children,
  className,
  stagger,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={staggerVariants(reduced, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];

  return (
    <Tag className={className} variants={riseVariants(reduced)}>
      {children}
    </Tag>
  );
}
