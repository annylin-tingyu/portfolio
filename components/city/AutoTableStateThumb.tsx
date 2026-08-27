"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Work-section thumbnail for the Auto Table case study.
 * A status bar that slot-machine-rolls through the system's real outcome
 * states — a NDA-safe preview of the "How the System Behaves" board, and a
 * visual for a project whose story is logic (states), not surface (UI).
 */

type Tone = "success" | "caution" | "error";
type State = { table?: string; text: string; tone: Tone };

const STATES: State[] = [
  { table: "A1", text: "Table Assigned", tone: "success" },
  { table: "B1", text: "Larger than needed", tone: "caution" },
  { table: "A5", text: "Override · reserved 7:00 PM", tone: "caution" },
  { text: "No available table", tone: "error" },
];

const TONES: Record<Tone, { fg: string; bg: string }> = {
  success: { fg: "#1f9d63", bg: "rgba(75,191,135,0.12)" },
  caution: { fg: "#b97e28", bg: "rgba(224,162,60,0.16)" },
  error: { fg: "#cf5045", bg: "rgba(207,80,69,0.12)" },
};

const ROW_H = 52;
const INTERVAL = 2100;
const ROLL_MS = 440;

function ToneIcon({ tone }: { tone: Tone }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (tone === "success") {
    return (
      <svg {...common} strokeWidth={2.4}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
  if (tone === "error") {
    return (
      <svg {...common} strokeWidth={2.2}>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg {...common} strokeWidth={2}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function StateRow({ state }: { state: State }) {
  const tone = TONES[state.tone];
  return (
    <div
      className="flex items-center gap-2.5 px-3.5"
      style={{ height: ROW_H, backgroundColor: tone.bg }}
    >
      <span style={{ color: tone.fg }} className="flex shrink-0 items-center">
        <ToneIcon tone={state.tone} />
      </span>
      {state.table && (
        <span
          className="shrink-0 text-[13px] font-semibold"
          style={{ color: "#111", fontFamily: "var(--font-plex-mono), monospace" }}
        >
          {state.table}
        </span>
      )}
      <span className="truncate text-[13px] font-medium" style={{ color: tone.fg }}>
        {state.text}
      </span>
    </div>
  );
}

export function AutoTableStateThumb() {
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useRef(true);

  // Advance the roll only while on-screen and motion is allowed.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    const el = containerRef.current;
    if (el) io.observe(el);
    const timer = window.setInterval(() => {
      if (inView.current) setI((x) => x + 1);
    }, INTERVAL);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  // Infinite roll: a clone of the first state sits at the end. When we land on
  // it, snap back to 0 with animation off so the loop never rolls backward.
  useEffect(() => {
    if (i === STATES.length) {
      const t = setTimeout(() => {
        setAnimate(false);
        setI(0);
      }, ROLL_MS + 20);
      return () => clearTimeout(t);
    }
    if (!animate) {
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [i, animate]);

  const track = [...STATES, STATES[0]];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[320px] overflow-hidden rounded-xl border md:w-[300px]"
      style={{
        height: ROW_H,
        borderColor: "rgba(117,115,114,0.18)",
        backgroundColor: "#fff",
        boxShadow: "0 6px 18px rgba(17,17,17,0.10)",
      }}
      aria-hidden
    >
      <div
        style={{
          transform: `translateY(-${i * ROW_H}px)`,
          transition: animate ? `transform ${ROLL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : "none",
        }}
      >
        {track.map((s, idx) => (
          <StateRow key={idx} state={s} />
        ))}
      </div>
    </div>
  );
}
