import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Shelf } from "@/components/Shelf";
import { films } from "@/lib/content";

export const metadata: Metadata = { title: "Director" };

export default function DirectorPage() {
  return (
    <>
      <main className="chrome">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between py-6 text-[15px]">
          <Link href="/#work" className="group -m-2 flex items-center gap-2 p-2 text-muted transition-colors hover:text-ink">
            <span aria-hidden className="transition-[translate] duration-150 group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </Link>
          <span className="text-[12px] uppercase tracking-[0.22em] text-muted">{films.length} films</span>
        </nav>

        <header className="mt-6 md:mt-10">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#c87046]">Director · Working volumes</p>
          <h1 className="shelf-heading mt-4 max-w-[14ch]">The director&apos;s shelf</h1>
        </header>

        <Shelf />
      </main>
      <Footer />
    </>
  );
}
