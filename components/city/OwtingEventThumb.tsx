"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Work-section thumbnail for the Owting (AI event planning) case study.
 * Ollie's generated suggestions as a gentle horizontal carousel — one full
 * event card plus the edge of the next, auto-advancing and looping. Mirrors
 * the app's real scrollable suggestion strip (public consumer app); all type
 * is Poppins, per the product's brand.
 */

type OwtingEvent = {
  month: string;
  day: string;
  time: string;
  title: string;
  emoji: string;
  tags: string[];
  photo: string; // gradient stand-in; swap for a real image URL later
};

const EVENTS: OwtingEvent[] = [
  {
    month: "SEP",
    day: "19",
    time: "8:00PM – 2:00AM",
    title: "Thursday Night Top Golf",
    emoji: "⛳",
    tags: ["Physical", "Intermediate", "Free"],
    photo: "linear-gradient(150deg, #bfe3a6 0%, #8fc47f 55%, #6fae72 100%)",
  },
  {
    month: "AUG",
    day: "7",
    time: "6:00PM – 7:30PM",
    title: "PCH Run Club",
    emoji: "🏃",
    tags: ["Running", "Beach", "Casual"],
    photo: "linear-gradient(150deg, #a7d8ee 0%, #cfe1e0 50%, #ecdcb2 100%)",
  },
  {
    month: "SEP",
    day: "24",
    time: "6:30PM – 9:00PM",
    title: "Rooftop Sunset Drinks",
    emoji: "🍸",
    tags: ["Social", "Chill", "21+"],
    photo: "linear-gradient(150deg, #f6c9a3 0%, #ec9fb0 55%, #c9a0d8 100%)",
  },
];

const NAVY = "#151E52";
const CARD_W = 214;
const CARD_H = 168;
const GAP = 14;
const PAGE = CARD_W + GAP;
const REVEAL_PX = (EVENTS.length - 1) * PAGE; // scroll from card 0 to the last card
const VIEW_H = CARD_H + 28; // card height + vertical room for the shadow
const TYPING_MS = 1200; // Ollie "generating" beat
const CARDS_MS = 6800; // scroll through the suggestions, then loop back to typing

function OllieAvatar() {
  // Reconstructed from the Figma geometry (32×32): blue disc, white peanut
  // "eyes" with a navy outline, navy pupils, yellow beak.
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden style={{ flex: "none" }}>
      <circle cx="16" cy="16" r="16" fill="#6FC9E8" />
      <circle cx="11" cy="15.25" r="7.75" fill="#161D4F" />
      <circle cx="21" cy="15.25" r="7.75" fill="#161D4F" />
      <circle cx="11" cy="15.25" r="6.4" fill="#FAFAFC" />
      <circle cx="21" cy="15.25" r="6.4" fill="#FAFAFC" />
      <circle cx="11" cy="14.7" r="2.3" fill="#161D4F" />
      <circle cx="21" cy="14.7" r="2.3" fill="#161D4F" />
      <ellipse cx="16" cy="20.4" rx="1.7" ry="2.05" fill="#FFCB47" stroke="#161D4F" strokeWidth="1" />
    </svg>
  );
}

function TypingBubble() {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full"
      style={{ padding: "8px 16px", backgroundColor: "#FAFAFA", border: "1px solid rgba(129,141,154,0.2)" }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="owting-dot"
          style={{
            width: i === 0 ? 8 : 6,
            height: i === 0 ? 8 : 6,
            borderRadius: "50%",
            backgroundColor: i === 0 ? "#484849" : "#939393",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

function EventCard({ event }: { event: OwtingEvent }) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        flex: "none",
        width: CARD_W,
        height: CARD_H,
        padding: 4,
        gap: 8,
        backgroundColor: "#FFFFFF",
        border: "1px solid #F4F4F4",
        boxShadow: "0 5px 18px rgba(0,0,0,0.09)",
        borderRadius: 12,
      }}
    >
      {/* Photo header with date + activity badges */}
      <div
        className="relative flex items-start justify-between"
        style={{ height: 96, padding: 8, background: event.photo, borderRadius: 10 }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{ width: 38, height: 38, backgroundColor: "#FAFAFA", borderRadius: 10 }}
        >
          <span style={{ fontSize: 8.5, letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)", lineHeight: 1.2 }}>
            {event.month}
          </span>
          <span style={{ fontSize: 17, fontWeight: 700, color: NAVY, lineHeight: 1 }}>{event.day}</span>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "#D2FBB9",
            border: `1.2px solid ${NAVY}`,
            borderRadius: "50%",
            fontSize: 15,
          }}
        >
          <span aria-hidden>{event.emoji}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col" style={{ padding: "0 4px 4px", gap: 5 }}>
        <span style={{ fontSize: 10.5, color: "#5B5B5B", lineHeight: 1.3 }}>{event.time}</span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: NAVY,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {event.title}
        </span>
        <div className="flex flex-wrap" style={{ gap: 3, marginTop: 1 }}>
          {event.tags.map((t) => (
            <span
              key={t}
              style={{
                padding: "2px 6px",
                backgroundColor: "#DEF8FF",
                borderRadius: 10,
                fontSize: 9,
                fontWeight: 600,
                color: "#5B5B5B",
                lineHeight: 1.3,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OwtingEventThumb() {
  const [phase, setPhase] = useState<"typing" | "cards">("typing");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setPhase("cards"); // rest on the suggestions, no loop
      return;
    }
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      threshold: 0.2,
    });
    const el = containerRef.current;
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  // Loop: typing beat → scroll through the cards → back to typing.
  useEffect(() => {
    if (reduced || paused) return;
    const ms = phase === "typing" ? TYPING_MS : CARDS_MS;
    const t = setTimeout(() => setPhase((p) => (p === "typing" ? "cards" : "typing")), ms);
    return () => clearTimeout(t);
  }, [phase, paused, reduced]);

  return (
    <div
      ref={containerRef}
      className="flex w-full items-start gap-2"
      style={{ fontFamily: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif" }}
      aria-hidden
    >
      <style>{`
        @keyframes owtingReveal {
          0%   { transform: translateX(0) scale(0.88); opacity: 0; animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
          8%   { transform: translateX(0) scale(1); opacity: 1; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
          100% { transform: translateX(-${REVEAL_PX}px) scale(1); opacity: 1; }
        }
        @keyframes owtingDot { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .owting-reveal { animation: owtingReveal ${CARDS_MS}ms forwards; transform-origin: left center; }
        .owting-dot { animation: owtingDot 1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .owting-reveal { animation: none !important; }
          .owting-dot { animation: none; opacity: 0.7; }
        }
      `}</style>

      <OllieAvatar />

      {phase === "typing" ? (
        // Typing bubble — vertically centered on Ollie's axis (32px avatar), fully visible.
        <div className="min-w-0 flex-1" style={{ height: VIEW_H }}>
          <div className="flex items-center" style={{ height: 32 }}>
            <TypingBubble />
          </div>
        </div>
      ) : (
        // Suggestions scroll through; right edge fades to signal "more".
        <div
          className="min-w-0 flex-1 overflow-hidden"
          style={{
            height: VIEW_H,
            paddingTop: 12,
            paddingBottom: 16,
            WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 6%, #000 82%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0, #000 6%, #000 82%, transparent 100%)",
          }}
        >
          <div
            className={reduced ? "flex" : "owting-reveal flex"}
            style={{
              gap: GAP,
              width: "max-content",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {EVENTS.map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
