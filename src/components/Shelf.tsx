"use client";

import { useRef, useState } from "react";
import { films, site, type Film } from "@/lib/content";

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
/** Cover width — what the book shows once it turns face-on. */
const DEPTH = 200;

function Book({ film, index, open, onToggle }: { film: Film; index: number; open: boolean; onToggle: () => void }) {
  const vars = {
    "--w": `${film.thick}px`,
    "--h": `${film.tall}px`,
    "--d": `${DEPTH}px`,
    "--bind": film.binding,
    "--ink": film.ink,
  } as React.CSSProperties;

  return (
    <li className="shelf-slot" style={{ ...vars, width: open ? DEPTH : film.thick }} data-open={open || undefined}>
      <button
        type="button"
        className="shelf-hit"
        aria-pressed={open}
        aria-label={`${film.title}, ${film.kind}, ${film.year}`}
        onClick={onToggle}
      >
        <span className="book">
          {/* spine — faces the room until the book is pulled */}
          <span className="book-face book-spine">
            <span className="text-[9px] tracking-[0.18em]">{roman[index]}</span>
            <span className="book-rule" />
            <span className="book-spine-title">{film.title}</span>
            <span className="book-rule" />
            <span className="text-[8.5px] tabular-nums tracking-[0.12em]">{film.year}</span>
            <span className="font-blackletter text-[13px] leading-none">{site.initials}</span>
          </span>

          {/* front cover */}
          <span className="book-face book-cover">
            <span className="text-[9px] uppercase tracking-[0.24em] opacity-75">
              Vol. {roman[index]} · {film.kind}
            </span>
            <span aria-hidden className="book-motif">
              <span />
            </span>
            <span className="book-cover-title">{film.title}</span>
            <span className="mt-auto flex items-end justify-between text-[9px] uppercase tracking-[0.2em] opacity-75">
              <span>Dir. {site.name}</span>
              <span className="tabular-nums">{film.year}</span>
            </span>
          </span>

          <span className="book-face book-back" />
          <span className="book-face book-top" />
        </span>
      </button>
    </li>
  );
}

export function Shelf() {
  const [open, setOpen] = useState<number | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const film = open === null ? null : films[open];

  function select(i: number | null) {
    setOpen(i);
    if (i === null) return;
    const slot = list.current?.children[i] as HTMLElement | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // wait a frame so the slot has started widening before we centre it
    requestAnimationFrame(() =>
      slot?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" }),
    );
  }

  function step(dir: 1 | -1) {
    const next = open === null ? (dir === 1 ? 0 : films.length - 1) : (open + dir + films.length) % films.length;
    select(next);
    (list.current?.children[next]?.querySelector("button") as HTMLButtonElement | null)?.focus({ preventScroll: true });
  }

  return (
    <section aria-label="Films" className="mt-12 md:mt-16">
      <div className="relative">
        <ul
          ref={list}
          className="shelf-row"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            else if (e.key === "ArrowLeft") step(-1);
            else if (e.key === "Escape") select(null);
            else return;
            e.preventDefault();
          }}
        >
          {films.map((f, i) => (
            <Book key={f.title} film={f} index={i} open={open === i} onToggle={() => select(open === i ? null : i)} />
          ))}
        </ul>
        <div aria-hidden className="shelf-plank" />
      </div>

      <div className="mt-6 flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted">
        <p className="tabular-nums">
          {open === null ? "Pick a volume" : `${String(open + 1).padStart(2, "0")} / ${String(films.length).padStart(2, "0")}`}
        </p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              aria-label={d === -1 ? "Previous film" : "Next film"}
              className="grid size-10 place-items-center rounded-full border border-black/15 text-[15px] text-ink transition-colors hover:border-ink"
            >
              <span aria-hidden>{d === -1 ? "←" : "→"}</span>
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="mt-14 min-h-[220px] border-t border-black/10 pt-10 md:mt-16">
        {film && open !== null ? (
          <article key={film.title} className="shelf-detail grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
            <div>
              <p className="text-[12px] uppercase tracking-[0.22em] text-[#c87046]">
                Volume {roman[open]} · {film.kind}
              </p>
              <h2 className="shelf-heading mt-4">{film.title}</h2>
            </div>
            <div>
              <p className="max-w-[46ch] text-pretty text-[16px] leading-[1.7] text-ink/85">{film.logline}</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-[12px]">
                {[
                  ["Year", film.year],
                  ["Runtime", film.runtime],
                  ["Format", film.format],
                  ["Role", film.role],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-black/10 pt-3">
                    <dt className="uppercase tracking-[0.2em] text-muted">{k}</dt>
                    <dd className="mt-1.5 text-[14px] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ) : (
          <p className="max-w-[46ch] text-pretty text-[15px] leading-[1.7] text-muted">
            Every film I&apos;ve directed, bound as a book. Pull one off the shelf to turn it to its cover and read the
            notes. Arrow keys work too.
          </p>
        )}
      </div>
    </section>
  );
}
