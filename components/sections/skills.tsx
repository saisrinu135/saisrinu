import { portfolio } from "@/content/portfolio";
import SectionHeader from "@/components/section-header";
import { RevealGroup, RevealItem } from "@/components/reveal";
import TechChip from "@/components/tech-chip";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 bg-card px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title="Technical Expertise"
          id="skills-heading"
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills.map((group) => (
            <RevealItem
              key={group.group}
              className="rounded-xl border border-line bg-bg p-6"
            >
              <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechChip key={item}>{item}</TechChip>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
