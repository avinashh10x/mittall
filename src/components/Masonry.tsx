"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { artworks } from "@/lib/content";
import { tile } from "./tile";

type Art = (typeof artworks)[number];

const masonryTile = `${tile} mb-4 break-inside-avoid md:mb-5`;

export function Masonry({ items, interactive = false }: { items: Art[]; interactive?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = items[index];
  const step = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 md:gap-5">
        {items.map((a, i) => {
          const img = (
            <span className="block overflow-hidden rounded-[11px] bg-neutral-100">
            <Image
              src={a.src}
              alt={a.title}
              width={a.w}
              height={a.h}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full transition-[scale] duration-700 ease-out group-hover:scale-[1.02]"
            />
            </span>
          );
          return interactive ? (
            <button key={a.id} onClick={() => open(i)} aria-label={`Open ${a.title}`} className={`group ${masonryTile}`}>
              {img}
              <span
                aria-hidden
                className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[12px] font-medium leading-none text-ink opacity-0 backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {a.title}, {a.year}
              </span>
            </button>
          ) : (
            <figure key={a.id} className={masonryTile}>
              {img}
            </figure>
          );
        })}
      </div>

      {interactive && (
        <dialog
          ref={dialog}
          aria-label={current.title}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
          className="m-0 h-dvh max-h-none w-screen max-w-none flex-col overscroll-contain bg-white/95 p-4 text-ink backdrop-blur-sm open:flex md:p-8"
        >
          <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button onClick={() => dialog.current?.close()} className="-m-2 p-2 hover:text-ink">
              Close <span aria-hidden>✕</span>
            </button>
          </div>
          <div className="relative my-4 flex-1">
            <Image src={current.src} alt={current.title} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="font-serif text-2xl md:text-3xl">
              {current.title}, <span className="text-muted">{current.year}</span>
            </p>
            <div className="flex gap-3">
              {(
                [
                  [-1, "←", "Previous artwork"],
                  [1, "→", "Next artwork"],
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
      )}
    </>
  );
}
