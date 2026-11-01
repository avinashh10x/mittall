import Image from "next/image";
import Link from "next/link";
import { nav, roles, site } from "@/lib/content";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="chrome flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Logo className="h-[22px] w-auto" />
        <span className="hidden text-[12.5px] font-medium uppercase tracking-[0.24em] sm:inline">{site.name}</span>
      </Link>
      <nav aria-label="Main" className="flex gap-6 text-[12px] uppercase tracking-[0.2em] text-muted md:gap-9">
        {nav.map((n) => (
          <a key={n.label} href={n.href} className="py-2 transition-colors hover:text-ink">
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap rounded-[5px] bg-chip px-1.5 py-0.5 font-medium text-ink">{children}</span>;
}

/** Fills the viewport below the 80px header: intro centred, roles on the bottom edge. */
export function Hero() {
  return (
    <section className="page flex min-h-[calc(100svh-5rem)] flex-col gap-16 pb-12 pt-10 md:pb-16">
      {/* lg+: copy and cutout share one grid cell. The photo's left ~23% is empty for its top 60%
          (measured from the PNG alpha), so the copy runs 18% of the photo's width into it. */}
      <div className="my-auto flex flex-col-reverse gap-12 md:flex-row md:items-start md:justify-between md:gap-16 lg:grid lg:grid-cols-1 lg:gap-0 lg:*:[grid-area:1/1]">
        {/* negative top margin cancels the leading so the first line sits on the photo's top edge */}
        <h1 className="relative z-10 max-w-[46ch] text-pretty text-[clamp(1.125rem,1.45vw,1.3rem)] font-normal leading-[1.8] text-ink/85 md:-mt-[0.5em] lg:w-[calc(42%+58%*0.18)] lg:max-w-none lg:self-start">
          Hi, I&apos;m {site.name.split(" ")[0]}, a <Chip>director</Chip>, <Chip>cinematographer</Chip> and{" "}
          <Chip>photographer</Chip>. Through <Chip>Mittal Studio</Chip> I make films and music videos, and{" "}
          <Chip>supervise shoots</Chip> from brief to final cut. I learned the craft as a camera assistant on feature
          films, and between projects I make <Chip>art</Chip>: prints, collages and zines.
        </h1>
        <Image
          src="/hero/mittal-camera.png"
          alt={`${site.name} setting up a cinema camera on a tripod`}
          width={1254}
          height={1045}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 768px) 560px, 100vw"
          className="h-auto w-full max-w-[600px] shrink-0 md:w-[52%] lg:w-[58%] lg:max-w-none lg:justify-self-end"
        />
      </div>

      <ul aria-label="What I do" className="grid grid-cols-2 gap-x-8 gap-y-10 md:flex md:justify-between md:gap-10">
        {roles.map((r, i) => (
          <li key={r.title}>
            {/* <p className="text-[15px] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p> */}
            <p className="mt-1.5 text-[17px] font-medium uppercase">{r.title}</p>
            {/* <p className="mt-2 text-pretty text-[14.5px] italic leading-[1.55] text-ink/75">
              <span aria-hidden className="not-italic">
                {r.icon}
              </span>{" "}
              {r.note}
            </p> */}
          </li>
        ))}
      </ul>
    </section>
  );
}
