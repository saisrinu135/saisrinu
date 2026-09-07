import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import RoleRotator from "@/components/role-rotator";

const { name, roles, location, email, resumeUrl, social } = portfolio.personal;

/**
 * A server component: the entrance is a CSS `rise` animation with staggered
 * delays, so nothing here needs client JS and the hero paints immediately.
 * Only RoleRotator (a client child) ships any script.
 */
export default function Hero() {
  // Inline delays beat eight one-off delay classes.
  const step = (i: number) => ({ animationDelay: `${i * 80}ms` });

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="relative flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Decorative accent wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p
          style={step(0)}
          className="rise-in font-mono text-sm tracking-[0.2em] text-accent uppercase"
        >
          Hello, I&apos;m
        </p>

        <h1
          id="hero-name"
          style={step(1)}
          className="rise-in mt-4 text-4xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          {name}
        </h1>

        <p
          style={step(2)}
          className="rise-in mt-4 min-h-[1.5em] text-xl font-medium sm:text-3xl"
        >
          <RoleRotator roles={roles} />
        </p>

        <p
          style={step(3)}
          className="rise-in mt-6 max-w-2xl text-base leading-relaxed text-fg sm:text-lg"
        >
          I build AI-powered APIs, automation pipelines, and cloud-integrated
          systems — turning AI capabilities into backend services that hold up
          in production.
        </p>

        <p
          style={step(4)}
          className="rise-in mt-5 inline-flex items-center gap-2 text-sm text-muted"
        >
          <MapPin className="size-4 text-accent" aria-hidden="true" />
          {location}
        </p>

        <div style={step(5)} className="rise-in mt-9 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            View Work
          </a>
          <a
            href={resumeUrl}
            download
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>
        </div>

        <ul style={step(6)} className="rise-in mt-8 flex items-center gap-1">
          <li>
            <a
              href={`mailto:${email}`}
              aria-label={`Email ${name}`}
              className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <Mail className="size-5" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <GithubIcon className="size-5" />
            </a>
          </li>
          <li>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </li>
          <li>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in a new tab)"
              className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              <InstagramIcon className="size-5" />
            </a>
          </li>
        </ul>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent sm:block"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
