"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { photographs, site } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Horizontal photo strip that scrolls past a fixed playhead, with a month ruler underneath. */
export function PhotoTimeline() {
  const scroller = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const current = photographs[active];
  const shown = photographs[index];
  const step = (d: number) => setIndex((i) => (i + d + photographs.length) % photographs.length);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    // Vertical wheel / trackpad drives the strip sideways, like scrubbing a timeline.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    // Whichever photo sits under the playhead drives the caption.
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      const items = el.querySelectorAll<HTMLElement>("[data-photo]");
      let best = 0;
      items.forEach((item, i) => {
        const centre = item.offsetLeft + item.offsetWidth / 2;
        const prev = items[best];
        if (Math.abs(centre - mid) < Math.abs(prev.offsetLeft + prev.offsetWidth / 2 - mid)) best = i;
      });
      setActive(best);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden">
      <nav aria-label="Breadcrumb" className="relative z-20 flex items-start justify-between px-5 py-6 text-[15px] md:px-7">
        <Link href="/#work" className="group -m-2 flex items-center gap-2 p-2 text-muted transition-colors hover:text-ink">
          <span aria-hidden className="transition-[translate] duration-150 group-hover:-translate-x-1">
            ←
          </span>
          Back to home
        </Link>
        <p aria-live="polite" className="hidden text-right text-[13px] leading-snug tabular-nums sm:block">
          <span className="text-muted">
            {pad(active + 1)} / {pad(photographs.length)}
          </span>
          <br />
          {current.place}, {current.month.slice(0, 3)} {current.year}
        </p>
      </nav>

      <h1 className="pointer-events-none absolute inset-x-0 top-[9vh] z-10 text-center font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-ink">
        <span className="block text-[clamp(2.25rem,5vw,4.75rem)] normal-case">{site.name}</span>
        <span className="block text-[clamp(2.75rem,7.4vw,7rem)]">Photographs</span>
        <span className="block text-[clamp(2.75rem,7.4vw,7rem)]">(MS/{photographs[0].year})</span>
      </h1>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Photographs, newest first. Scroll sideways to move through time."
        className="no-scrollbar relative flex-1 overflow-x-auto overflow-y-hidden outline-none"
      >
        <ul className="relative flex h-full w-max pl-5 pr-[50vw] md:pl-7">
          {photographs.map((p, i) => {
            const firstOfMonth = i === 0 || photographs[i - 1].month !== p.month;
            return (
              <li key={p.id} data-photo className="relative flex h-full w-[min(62vw,360px)] flex-none flex-col pr-6 md:w-[min(19vw,380px)]">
                <div className="flex flex-1 items-center pb-28">
                  <button
                    onClick={() => {
                      setIndex(i);
                      dialog.current?.showModal();
                    }}
                    aria-label={`Open photo ${i + 1}, ${p.place}, ${p.month} ${p.year}`}
                    className="group block w-full overflow-hidden"
                  >
                    <Image
                      src={p.src}
                      alt=""
                      width={p.w}
                      height={p.h}
                      sizes="(min-width: 768px) 19vw, 62vw"
                      className="h-auto max-h-[52vh] w-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </button>
                </div>
                {firstOfMonth && (
                  <div aria-hidden className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
                    <span className="h-5 w-px bg-ink/50" />
                    <span className="text-[13px] font-medium uppercase tracking-[0.04em]">{p.month}</span>
                  </div>
                )}
              </li>
            );
          })}
          <li aria-hidden className="ruler pointer-events-none absolute inset-x-0 bottom-[60px] h-3" />
        </ul>
      </div>

      {/* Fixed playhead over the ruler */}
      <span aria-hidden className="pointer-events-none absolute bottom-[60px] left-1/2 z-10 h-12 w-px bg-ink" />

      <dialog
        ref={dialog}
        aria-label={`${shown.place}, ${shown.month} ${shown.year}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none flex-col overscroll-contain bg-white/95 p-4 text-ink backdrop-blur-sm open:flex md:p-8"
      >
        <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted">
          <span className="tabular-nums">
            {pad(index + 1)} / {pad(photographs.length)}
          </span>
          <button onClick={() => dialog.current?.close()} className="-m-2 p-2 hover:text-ink">
            Close <span aria-hidden>✕</span>
          </button>
        </div>
        <div className="relative my-4 flex-1">
          <Image src={shown.src} alt={`${shown.place}, ${shown.month} ${shown.year}`} fill sizes="100vw" className="object-contain" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-[15px]">
            {shown.place} <span className="text-muted">· {shown.month} {shown.year}</span>
          </p>
          <div className="flex gap-3">
            {(
              [
                [-1, "←", "Previous photo"],
                [1, "→", "Next photo"],
              ] as const
            ).map(([d, s, l]) => (
              <button
                key={l}
                aria-label={l}
                onClick={() => step(d)}
                className="grid size-11 place-items-center rounded-full border border-ink/15 transition-[background-color,border-color,scale] duration-150 hover:border-acid hover:bg-acid active:scale-[0.96]"
              >
                <span aria-hidden>{s}</span>
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </main>
  );
}
