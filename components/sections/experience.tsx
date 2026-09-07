import { portfolio } from "@/content/portfolio";
import SectionHeader from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import TechChip from "@/components/tech-chip";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          eyebrow="Experience"
          title="Where I've Worked"
          id="experience-heading"
        />
        <div className="space-y-8">
          {portfolio.experience.map((role) => (
            <Reveal
              key={`${role.company}-${role.title}`}
              as="article"
              className="relative rounded-xl border border-line bg-card p-6 pl-8 sm:p-8 sm:pl-10"
            >
              {/* Accent rail. */}
              <span
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-0 w-0.5 rounded-full bg-accent"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-ink">{role.title}</h3>
                <p className="font-mono text-sm text-muted">{role.duration}</p>
              </div>
              <p className="mt-1 text-sm text-accent">
                Working as {role.workingTitle}
              </p>
              <p className="mt-2 text-sm text-muted">
                {role.company} · {role.location}
              </p>

              <ul className="mt-6 space-y-3">
                {role.responsibilities.map((item) => (
                  <li
                    key={item.slice(0, 32)}
                    className="relative pl-5 text-sm leading-relaxed text-fg"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2 left-0 size-1.5 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {role.technologies.map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
