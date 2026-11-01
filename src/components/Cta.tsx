import type { CSSProperties } from "react";
import { site } from "@/lib/content";
import "./cta-folder.css";

const icon = { width: 12, height: 12, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const folders = [
  {
    label: "Instagram",
    value: site.instagram.handle,
    href: site.instagram.href,
    external: true,
    color: "#3f9ddc",
    icon: (
      <svg viewBox="0 0 24 24" {...icon}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Call",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    color: "#4aa4e0",
    icon: (
      <svg viewBox="0 0 24 24" {...icon}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    color: "#54abe4",
    icon: (
      <svg viewBox="0 0 24 24" {...icon}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export function Cta() {
  return (
    <section id="contact" className="page pt-28 md:pt-36">
      <div className="grid items-center gap-20 md:grid-cols-[1fr_auto] md:gap-12">
        {/* copy */}
        <div>
          <p className="text-[12px] uppercase tracking-[0.22em] text-muted">Booking shoots for 2027</p>
          <h2 className="mt-5 text-balance font-serif text-[clamp(3.2rem,7vw,5.6rem)] leading-[0.95] tracking-[-0.02em]">
            Let&apos;s make
            <br />
            something <em className="bg-[linear-gradient(transparent_52%,var(--color-acid)_52%,var(--color-acid)_80%,transparent_80%)] px-1">real.</em>
          </h2>
          <p className="mt-6 max-w-[40ch] text-pretty text-[16px] leading-[1.7] text-muted">
            Films, music videos, campaigns or a single roll of film. Tell me what you&apos;re working on and I&apos;ll
            reply within two days, usually one.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-[14px] font-medium text-white transition-[background-color,color,scale] duration-150 hover:bg-acid hover:text-ink active:scale-[0.96]"
            >
              Start a project
              <span aria-hidden className="grid size-8 place-items-center rounded-full bg-acid text-ink transition-[background-color,color,translate] duration-150 group-hover:translate-x-0.5 group-hover:bg-ink group-hover:text-acid">
                →
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="py-2 text-[14px] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-acid">
              {site.email}
            </a>
          </div>
        </div>

        {/* one Finder-style folder; each contact is a sheet behind the front whose tab peeks out */}
        <nav aria-label="Contact" className="relative mx-auto mt-10 h-[264px] w-[340px] md:mr-6 md:mt-0">
          {folders.map((f, i) => (
            <a
              key={f.label}
              href={f.href}
              aria-label={`${f.label}: ${f.value}`}
              title={f.value}
              {...(f.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="cta-sheet"
              style={{ "--c": f.color, "--x": `${[6, 116, 222][i]}px`, zIndex: i } as CSSProperties}
            >
              <span aria-hidden className="cta-sheet-body" />
              <span className="cta-tab">
                <span aria-hidden className="cta-tab-icon">{f.icon}</span>
                {f.label}
                <span aria-hidden className="cta-tab-slope" />
              </span>
            </a>
          ))}

          <a
            href={`mailto:${site.email}`}
            aria-label={`Pen a note: ${site.email}`}
            className="cta-front group absolute inset-x-0 bottom-0 top-[40px] z-10 flex flex-col items-center justify-center gap-3 rounded-[24px]"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="cta-engrave size-14" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="m3.5 7 8.5 6 8.5-6" />
            </svg>
            <span className="cta-engrave text-[13px] font-semibold tracking-[0.01em]">Pen a note</span>
          </a>
        </nav>
      </div>
    </section>
  );
}
