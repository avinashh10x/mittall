/** Centred title with a small tracked eyebrow above it. <em> renders upright, like the rest. */
export function SectionTitle({
  eyebrow,
  children,
  as: Tag = "h2",
}: {
  eyebrow: React.ReactNode;
  children: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">{eyebrow}</p>
      <Tag className="mt-4 text-balance font-sans text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink [&_em]:not-italic">
        {children}
      </Tag>
    </div>
  );
}
