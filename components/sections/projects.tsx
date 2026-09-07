import { portfolio } from "@/content/portfolio";
import SectionHeader from "@/components/section-header";
import { RevealGroup, RevealItem } from "@/components/reveal";
import ProjectCard from "@/components/project-card";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 bg-card px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          eyebrow="Projects"
          title="Featured Work"
          id="projects-heading"
        />
        <RevealGroup className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
          {portfolio.projects.map((project, i) => (
            <RevealItem key={project.title} className="flex">
              <ProjectCard project={project} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
