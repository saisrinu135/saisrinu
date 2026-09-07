import { Reveal } from "@/components/reveal";

/**
 * Mono eyebrow + h2 + accent rule. The `id` is what each section's
 * aria-labelledby points at, so every section gets an accessible name.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        <span className="text-muted">{index}</span>
        <span aria-hidden="true" className="text-muted">
          {" "}
          —{" "}
        </span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-4 h-0.5 w-12 rounded-full bg-accent" />
    </Reveal>
  );
}
