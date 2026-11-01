import Image from "next/image";
import { testimonials } from "@/lib/content";
import { SectionTitle } from "./SectionTitle";

export function Testimonials() {
  return (
    <section id="kind-words" aria-labelledby="kind-words-title" className="page pt-28 md:pt-36">
      <SectionTitle eyebrow="Kind words">
        <span id="kind-words-title">
          From the <em>set</em>
        </span>
      </SectionTitle>

      <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t) => (
          <li key={t.name}>
            <figure className="flex h-full flex-col justify-between gap-10 rounded-2xl border border-black/[0.08] p-6 transition-colors duration-200 hover:border-black/20 md:p-7">
              <blockquote className="text-pretty text-[15.5px] leading-[1.7] text-ink/85">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-chip">
                  <Image src={t.avatar} alt="" fill sizes="32px" className="object-cover grayscale" />
                </span>
                <span className="min-w-0 text-[13px] leading-tight">
                  <span className="block truncate font-medium text-ink">{t.name}</span>
                  <span className="block truncate text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
