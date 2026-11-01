import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/lib/content";
import { SectionTitle } from "./SectionTitle";
import { tile } from "./tile";

/* Each column holds one tall and one wide card, alternating order. The heights
 * add up the same, so the cards zigzag but every column ends on the same line. */
const shapes = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
} as const;
const columns: (keyof typeof shapes)[][] = [
  ["tall", "wide"],
  ["wide", "tall"],
  ["tall", "wide"],
  ["wide", "tall"],
];

export function Artwork() {
  let n = 0;
  return (
    <section id="artwork" className="chrome pt-28 md:pt-36">
      <SectionTitle eyebrow={`Selected works · ${artworks.length} pieces`}>
        My <em>artworks</em>
      </SectionTitle>

      <div className="mt-14 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-5">
        {columns.map((col, c) => (
          // two columns on phones, four from md up
          <div key={c} className={`flex-col gap-4 md:gap-5 ${c < 2 ? "flex" : "hidden md:flex"}`}>
            {col.map((shape) => {
              const a = artworks[n++];
              return (
                <Link key={a.id} href="/artwork" className={`group ${tile}`}>
                  <span className={`relative block overflow-hidden rounded-[11px] bg-neutral-100 ${shapes[shape]}`}>
                    <Image
                      src={a.src}
                      alt={a.title}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center md:mt-14">
        <Link
          href="/artwork"
          className="group inline-flex items-center gap-3 rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-[14px] font-medium text-white shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] transition-[background-color,scale] duration-150 hover:bg-[#2a2a2a] active:scale-[0.96]"
        >
          View all artworks
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-white/12 transition-[translate] duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
