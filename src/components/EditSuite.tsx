"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { reel, scenes } from "@/lib/content";

const FPS = 24;
const starts = scenes.reduce<number[]>((acc, s, i) => [...acc, i === 0 ? 0 : acc[i - 1] + scenes[i - 1].dur], []);
const total = scenes.reduce((sum, s) => sum + s.dur, 0);
const pad = (n: number) => String(n).padStart(2, "0");

function timecode(t: number) {
  const f = Math.floor(t * FPS);
  return `${pad(Math.floor(f / (FPS * 3600)))}:${pad(Math.floor(f / (FPS * 60)) % 60)}:${pad(Math.floor(f / FPS) % 60)}:${pad(f % FPS)}`;
}
const motionQuery = "(prefers-reduced-motion: reduce)";
function onMotionChange(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function sceneAt(t: number) {
  let i = 0;
  while (i < scenes.length - 1 && t >= starts[i + 1]) i++;
  return i;
}

export function EditSuite() {
  const [scene, setScene] = useState(0);
  // null = follow the reduced-motion setting until the viewer toggles it
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(onMotionChange, () => window.matchMedia(motionQuery).matches, () => false);
  const playing = choice ?? !reduced;
  const toggle = () => setChoice(!playing);
  const t = useRef(0);
  const sceneRef = useRef(0);
  const tc = useRef<HTMLSpanElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const scrubbing = useRef(false);

  // Timecode + playhead are written straight to the DOM every frame; React
  // only re-renders when the scene actually changes.
  function paint() {
    if (tc.current) tc.current.textContent = timecode(t.current);
    if (head.current) head.current.style.left = `${(t.current / total) * 100}%`;
    const i = sceneAt(t.current);
    if (i !== sceneRef.current) {
      sceneRef.current = i;
      setScene(i);
    }
  }
  function seek(to: number) {
    t.current = Math.min(Math.max(to, 0), total - 0.001);
    paint();
  }
  function jump(i: number) {
    seek(starts[i]);
    grid.current
      ?.querySelector(`[data-scene="${i}"]`)
      ?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      if (playing && !scrubbing.current) {
        t.current = (t.current + (now - last) / 1000) % total;
        paint();
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("a, button, input")) return;
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowRight") jump((sceneRef.current + 1) % scenes.length);
      else if (e.key === "ArrowLeft") jump((sceneRef.current - 1 + scenes.length) % scenes.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function scrubTo(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - r.left) / r.width) * total);
  }

  return (
    <div className="suite fixed inset-0 flex flex-col overflow-hidden">
      {/* viewfinder corners */}
      <span aria-hidden className="suite-corner left-3 top-3 border-l-2 border-t-2 md:left-5 md:top-5" />
      <span aria-hidden className="suite-corner right-3 top-3 border-r-2 border-t-2 md:right-5 md:top-5" />
      <span aria-hidden className="suite-corner bottom-[92px] left-3 border-b-2 border-l-2 md:left-5" />
      <span aria-hidden className="suite-corner bottom-[92px] right-3 border-b-2 border-r-2 md:right-5" />

      <header className="suite-label relative z-10 flex h-20 shrink-0 items-center justify-between gap-6 px-8 md:px-[68px]">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause reel" : "Play reel"}
          className="-m-2 flex items-center gap-3 p-2"
        >
          <span aria-hidden className={`size-2 rounded-full bg-[#ff3b30] ${playing ? "suite-rec" : "opacity-40"}`} />
          <span className="text-[#ededea]">{playing ? "Rec" : "Paused"}</span>
          <span className="hidden sm:inline">— {reel.meta.camera}</span>
        </button>
        <span aria-hidden className="absolute left-1/2 top-5 hidden h-3 w-px bg-white/40 md:block" />
        <nav aria-label="Reel" className="flex items-center gap-8">
          <span className="hidden lg:inline">{reel.meta.specs}</span>
          <Link href="/#work" className="transition-colors hover:text-[#ededea]">
            Home
          </Link>
          <span aria-current="page" className="border-b border-current pb-1 text-[var(--suite-green)]">
            Scenes
          </span>
        </nav>
      </header>

      <h1 className="sr-only">Cinematographer — reel</h1>

      <div ref={grid} className="suite-grid min-h-0 flex-1 overflow-y-auto px-8 pb-10 pt-6 md:px-[68px] xl:px-[120px]">
        <div className="grid gap-5 md:grid-cols-[1.8fr_1.2fr_1fr]">
          {reel.columns.map((col, c) => (
            <div key={c} className="flex flex-col gap-5">
              {col.map((still) => (
                <button
                  key={still.src}
                  type="button"
                  data-scene={still.scene}
                  data-active={still.scene === scene || undefined}
                  onPointerEnter={(e) => e.pointerType === "mouse" && seek(starts[still.scene])}
                  onFocus={() => seek(starts[still.scene])}
                  onClick={() => seek(starts[still.scene])}
                  aria-label={`Scene ${pad(still.scene)}, ${scenes[still.scene].title}`}
                  className="suite-still group relative block w-full overflow-hidden bg-white/5"
                  style={{ aspectRatio: still.ratio }}
                >
                  <Image src={still.src} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  <span className="suite-label absolute bottom-3 left-3 bg-black/55 px-2 py-1 text-[#ededea] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    Sc {pad(still.scene)} · {scenes[still.scene].title}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* timeline */}
      <footer className="suite-label relative z-10 flex h-[72px] shrink-0 items-stretch border-t border-white/10 bg-[#0d0e0d]">
        <div className="flex w-[124px] shrink-0 items-center px-4 md:w-[200px] md:px-7">
          <span className="text-[12px] tracking-[0.14em] text-[#ededea] md:text-[15px]">
            <span className="hidden md:inline">Tc </span>
            <span ref={tc} className="tabular-nums">
              00:00:00:00
            </span>
          </span>
        </div>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Reel timeline"
          aria-valuemin={0}
          aria-valuemax={scenes.length - 1}
          aria-valuenow={scene}
          aria-valuetext={`Scene ${pad(scene)}, ${scenes[scene].title}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") jump((scene + 1) % scenes.length);
            else if (e.key === "ArrowLeft") jump((scene - 1 + scenes.length) % scenes.length);
            else return;
            e.preventDefault();
          }}
          onPointerDown={(e) => {
            scrubbing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scrubTo(e);
          }}
          onPointerMove={(e) => scrubbing.current && scrubTo(e)}
          onPointerUp={() => {
            scrubbing.current = false;
            jump(sceneRef.current);
          }}
          onPointerCancel={() => (scrubbing.current = false)}
          className="relative flex min-w-0 flex-1 cursor-ew-resize touch-none gap-px py-2 outline-none focus-visible:bg-white/5"
        >
          {scenes.map((s, i) => (
            <div
              key={s.title}
              style={{ flexGrow: s.dur }}
              data-active={i === scene || undefined}
              className="suite-seg relative basis-0 overflow-hidden px-2 pt-2"
            >
              <span className={i === scene ? "" : "max-md:hidden"}>{pad(i)}</span>
            </div>
          ))}
          <div ref={head} aria-hidden className="suite-head pointer-events-none absolute inset-y-0 left-0" />
        </div>

        <div className="hidden w-[236px] shrink-0 flex-col items-end justify-center gap-1.5 px-7 md:flex">
          <span className="text-[var(--suite-green)]">
            Sc {pad(scene)} / {pad(scenes.length - 1)}
          </span>
          <span className="truncate text-[#ededea]">{scenes[scene].title}</span>
        </div>
      </footer>
    </div>
  );
}
