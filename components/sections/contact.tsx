import { Mail, MapPin } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import SectionHeader from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import ContactForm from "@/components/contact-form";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";

const { email, location, social } = portfolio.personal;

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-card px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="06"
          eyebrow="Contact"
          title="Get In Touch"
          id="contact-heading"
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-base leading-relaxed text-fg">
              I&apos;m open to backend and AI engineering roles, freelance work,
              and interesting problems. Drop a message and I&apos;ll reply.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <dt className="sr-only">Email</dt>
                <Mail className="size-4 text-accent" aria-hidden="true" />
                <dd>
                  <a
                    href={`mailto:${email}`}
                    className="text-ink transition-colors hover:text-accent"
                  >
                    {email}
                  </a>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">Location</dt>
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                <dd className="text-muted">{location}</dd>
              </div>
            </dl>

            <ul className="mt-8 flex items-center gap-1">
              <li>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in a new tab)"
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
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
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
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
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-line bg-bg p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
