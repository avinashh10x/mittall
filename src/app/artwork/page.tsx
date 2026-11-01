import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/SectionTitle";
import { Masonry } from "@/components/Masonry";
import { artworks } from "@/lib/content";

export const metadata: Metadata = { title: "Artwork" };

export default function ArtworkPage() {
  return (
    <>
      <main className="chrome">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between py-6 text-[15px]">
          <Link href="/#artwork" className="group -m-2 flex items-center gap-2 p-2 text-muted transition-colors hover:text-ink">
            <span aria-hidden className="transition-[translate] duration-150 group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </Link>
          <span className="text-[12px] uppercase tracking-[0.22em] text-muted">{artworks.length} pieces</span>
        </nav>

        <div className="mt-6 md:mt-2">
          <SectionTitle as="h1" eyebrow="Archive">
            My <em>artworks</em>
          </SectionTitle>
        </div>

        <div className="mt-14 md:mt-16 md:px-9">
          <Masonry items={artworks} interactive />
        </div>
      </main>
      <Footer />
    </>
  );
}
