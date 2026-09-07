import Image from "next/image";
import { ExternalLink, TrendingUp } from "lucide-react";
import TechChip from "@/components/tech-chip";
import { GithubIcon } from "@/components/icons";

/**
 * The card's own contract rather than a type derived from the content const —
 * `image`, `live`, `github`, and `metric` are genuinely optional per project,
 * and the readonly arrays from `as const` satisfy this as-is.
 */
export type ProjectCardData = {
  title: string;
  subtitle: string;
  description: string;
  features: readonly string[];
  technologies: readonly string[];
  metric?: string;
  live?: string;
  github?: string;
  image?: string;
};

/**
 * Deterministic gradient angles per card index, used when a project has no
 * screenshot yet. ponytail: three hand-picked pairs beat a colour-generation
 * helper — supply real images and this branch stops running.
 */
const GRADIENTS = [
  "from-accent/25 via-accent/10 to-transparent",
  "from-accent/15 via-accent/25 to-transparent",
  "from-accent/10 via-accent/20 to-accent/5",
];

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const { image, live, github, metric } = project;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors hover:border-accent/50">
      <div className="relative aspect-video overflow-hidden border-b border-line">
        {image ? (
          <Image
            src={image}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div
            className={`flex size-full items-center justify-center bg-linear-to-br p-6 ${
              GRADIENTS[index % GRADIENTS.length]
            }`}
          >
            <span
              aria-hidden="true"
              className="font-mono text-2xl font-bold tracking-tight text-ink/70"
            >
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
            <p className="mt-0.5 font-mono text-xs text-accent">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-fg">
          {project.description}
        </p>

        {metric && (
          <p className="mt-4 inline-flex items-center gap-2 self-start rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            {metric}
          </p>
        )}

        <ul className="mt-4 space-y-2">
          {project.features.map((feature) => (
            <li
              key={feature.slice(0, 32)}
              className="relative pl-4 text-sm leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 size-1 rounded-full bg-accent"
              />
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechChip key={tech}>{tech}</TechChip>
          ))}
        </ul>

        {(live || github) && (
          <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Live site
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <GithubIcon className="size-4" />
                Code
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
