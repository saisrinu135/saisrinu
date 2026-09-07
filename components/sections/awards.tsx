import { Award } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { RevealGroup, RevealItem } from "@/components/reveal";

/**
 * No SectionHeader — this rides directly under Experience as a compact strip,
 * so a full eyebrow + h2 + rule would out-weigh two lines of content.
 */
export default function Awards() {
  return (
    <section
      aria-labelledby="awards-heading"
      className="px-6 pb-24 sm:-mt-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="awards-heading"
          className="font-mono text-xs tracking-[0.2em] text-muted uppercase"
        >
          Awards &amp; Recognition
        </h2>
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2" stagger={0.1}>
          {portfolio.awards.map((award) => (
            <RevealItem
              key={award.title}
              className="flex gap-4 rounded-xl border border-line bg-card p-5"
            >
              <Award
                className="size-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-ink">{award.title}</h3>
                <p className="mt-0.5 text-sm text-accent">{award.issuer}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {award.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
