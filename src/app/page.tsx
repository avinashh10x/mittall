import { Artwork } from "@/components/Artwork";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Hero, SiteHeader } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Artwork />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
