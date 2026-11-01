import Image from "next/image";
import Link from "next/link";
import { photoId, site } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <>
      {/* Fades the body's dot grid out to white so it doesn't stop dead at the footer edge */}
      <div aria-hidden className="pointer-events-none h-24 bg-linear-to-b from-transparent to-white md:h-32" />
      <footer className="relative min-h-[540px] overflow-hidden text-white md:min-h-[620px]">
        <Image src={photoId(1067, 2000, 1100, true)} alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-linear-to-b from-white from-5% via-white/10 via-50% to-black/75" />

        <div className="chrome absolute inset-x-0 bottom-0 pb-8 md:pb-9">
          <div className="flex items-end justify-between">
            <Link
              href="/"
              aria-label="Home"
              className="-m-2 p-2 transition-colors hover:text-acid"
            >
              <Logo className="h-8 w-auto" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 py-2 text-[13px] font-medium uppercase tracking-[0.2em]"
            >
              <span aria-hidden className="transition-[translate] duration-150 group-hover:translate-x-1">
                ✎
              </span>
              <span className="transition-colors group-hover:text-acid">Pen a note</span>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-[12px] uppercase tracking-[0.2em] text-white/75">
            <div className="flex gap-7 md:gap-10">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="py-2 transition-colors hover:text-acid">
                  {s.label}
                </a>
              ))}
            </div>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}
