import { GraduationCap } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import SectionHeader from "@/components/section-header";
import { RevealGroup, RevealItem } from "@/components/reveal";

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-20 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          eyebrow="Education"
          title="Education"
          id="education-heading"
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
          {portfolio.education.map((entry) => (
            <RevealItem
              key={entry.degree}
              className="rounded-xl border border-line bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <GraduationCap
                  className="size-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-semibold text-ink">{entry.degree}</h3>
                  <p className="mt-1 text-sm text-fg">{entry.institute}</p>
                  <p className="mt-0.5 text-sm text-muted">{entry.location}</p>
                  <p className="mt-3 font-mono text-xs text-accent">
                    {entry.year}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
