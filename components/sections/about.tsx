import { portfolio } from "@/content/portfolio";
import SectionHeader from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="About Me"
          id="about-heading"
        />
        <div className="max-w-3xl space-y-5">
          {portfolio.about.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)}>
              <p className="text-base leading-relaxed text-fg sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
