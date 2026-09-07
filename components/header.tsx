"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import MobileNav from "@/components/mobile-nav";
import ThemeToggle from "@/components/theme-toggle";

const { navLinks } = portfolio;
const { name, resumeUrl } = portfolio.personal;
const initials = name
  .split(" ")
  .map((w) => w[0])
  .join("");

/**
 * ponytail: one client component rather than a server shell plus islands.
 * Scroll-spy and the scrolled-state border both need client JS, so splitting
 * three ways to keep six static <a> tags off the client saves ~1KB and costs
 * two files. Revisit if the header grows real content.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy. Observing the sections beats a scroll handler doing maths.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* A div, not a heading — the hero name is the page's only h1. */}
        <a
          href="#main"
          className="font-mono text-lg font-bold tracking-tight text-ink"
          aria-label={`${name} — home`}
        >
          {initials}
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href} className="relative">
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {link.label}
                    </a>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href={resumeUrl}
            download
            className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>

          <ThemeToggle />
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
