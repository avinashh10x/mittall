import Image from "next/image";
import Link from "next/link";
import { work } from "@/lib/content";
import { SectionTitle } from "./SectionTitle";

/** Three role posters, bottoms lined up on a shared floor. Each opens its page. */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="page py-28 md:py-36">
      <div id="work-heading">
        <SectionTitle eyebrow={`The work · ${work.length} roles`}>
          One story, <em>three lenses</em>
        </SectionTitle>
      </div>
      <ul className="mt-14 md:mt-20 flex flex-col items-center gap-16 lg:flex-row lg:items-end lg:justify-center lg:gap-12 xl:gap-24">
        {work.map((w) => (
          <li key={w.title} className="w-[min(78vw,260px)]">
            <Link href={w.href} className="group block outline-offset-8 focus-visible:outline-2 focus-visible:outline-ink">
              <Image
                src={w.src}
                alt={`${w.title}: see the work`}
                width={w.w}
                height={w.h}
                sizes="(min-width: 1024px) 260px, 78vw"
                className="h-auto w-full mix-blend-multiply transition-[translate] duration-500 ease-out group-hover:-translate-y-1.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
