import { Mail } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";

const { name, email, social } = portfolio.personal;

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          {/* Was hardcoded to 2023 in the old footer. */}
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <ul className="flex items-center gap-1">
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
    </footer>
  );
}
