export default function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-line bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
      {children}
    </li>
  );
}
