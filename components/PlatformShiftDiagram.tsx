"use client";

import { useEffect, useRef, useState } from "react";

const PLATFORM_SHIFT = {
  before: {
    title: "BEFORE",
    items: [
      "Booking system",
      "Offline loyalty management",
      "Revenue captured in-store",
    ],
  },
  after: {
    title: "AFTER",
    items: [
      "Commerce platform",
      "Embedded loyalty in transaction flow",
      "Online revenue capture",
    ],
  },
} as const;

const CONTENT_MAX = "clamp(720px, 88vw, 880px)";
const DURATION_MS = 600;
const STAGGER_AFTER_MS = 120;
const STAGGER_ARROW_MS = 100;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export function PlatformShiftDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const blockOpacityTransition = reducedMotion ? "none" : `opacity ${DURATION_MS}ms ${EASE}`;
  const beforeTransition = reducedMotion
    ? "none"
    : `opacity ${DURATION_MS}ms ${EASE}, transform ${DURATION_MS}ms ${EASE}`;
  const afterTransition = reducedMotion
    ? "none"
    : `opacity ${DURATION_MS}ms ${EASE}, transform ${DURATION_MS}ms ${EASE}`;
  const afterDelay = visible ? STAGGER_AFTER_MS : 0;
  const arrowDelay = visible ? STAGGER_AFTER_MS + STAGGER_ARROW_MS : 0;

  return (
    <div
      ref={ref}
      className="w-full min-w-0 max-w-full"
      style={{
        marginTop: "clamp(48px, 8vw, 72px)",
        marginBottom: "clamp(48px, 6vw, 72px)",
        maxWidth: CONTENT_MAX,
        opacity: visible ? 1 : 0,
        transition: blockOpacityTransition,
      }}
    >
      <p
        className="text-[12px] font-medium uppercase tracking-[0.06em] text-mid-gray"
        style={{ letterSpacing: "0.06em" }}
      >
        Before vs After
      </p>
      <h3
        className="mt-2 font-medium"
        style={{
          fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
          lineHeight: 1.35,
          color: "#111",
        }}
      >
        From Scheduling Tool to Commerce Platform
      </h3>
      <div
        className="relative mt-6 grid min-w-0 max-w-full grid-cols-1 gap-6 overflow-visible rounded-xl border px-4 py-8 md:mt-8 md:grid-cols-2 md:gap-[88px] md:rounded-[18px] md:px-14 md:py-10"
        style={{
          backgroundColor: "#F7F7F7",
          borderColor: "#EAEAEA",
        }}
      >
        {/* Vertical divider + right arrow: desktop only (md+), between columns */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-px md:block"
          style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          aria-hidden
        />
        <span
          className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 select-none md:flex"
          style={{
            zIndex: 10,
            pointerEvents: "none",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "rgba(0,0,0,0.28)",
            backgroundColor: "#F7F7F7",
            opacity: visible ? 1 : 0,
            transition: reducedMotion ? "none" : `opacity ${DURATION_MS}ms ${EASE}`,
            transitionDelay: `${arrowDelay}ms`,
          }}
          aria-hidden
        >
          →
        </span>

        {/* Before column */}
        <div
          className="min-w-0 flex flex-col items-center justify-start"
          style={{
            transition: beforeTransition,
            transitionDelay: "0ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <h4
            className="text-center text-[12px] font-medium uppercase tracking-[0.06em]"
            style={{
              fontFamily: "var(--font-plex-mono), monospace",
              color: "#111",
              marginBottom: 8,
            }}
          >
            {PLATFORM_SHIFT.before.title}
          </h4>
          <ul
            className="list-none space-y-0 p-0 text-center"
            style={{ marginTop: 26, fontFamily: "var(--font-inter), sans-serif" }}
          >
            {PLATFORM_SHIFT.before.items.map((item, i) => (
              <li
                key={item}
                style={{
                  fontSize: "clamp(0.9375rem, 1.1vw, 1rem)",
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.6)",
                  paddingTop: i === 0 ? 0 : 22,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Horizontal divider + down arrow: mobile only, vertical flow between Before and After */}
        <div
          className="relative flex w-full items-center justify-center py-4 md:hidden"
          aria-hidden
        >
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-px"
            style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          />
          <span
            className="relative z-10 flex h-5 w-5 flex-shrink-0 select-none items-center justify-center bg-[#F7F7F7] text-[18px]"
            style={{
              pointerEvents: "none",
              color: "rgba(0,0,0,0.28)",
              opacity: visible ? 1 : 0,
              transition: reducedMotion ? "none" : `opacity ${DURATION_MS}ms ${EASE}`,
              transitionDelay: `${arrowDelay}ms`,
            }}
          >
            ↓
          </span>
        </div>

        {/* After column */}
        <div
          className="min-w-0 flex flex-col items-center justify-start"
          style={{
            transition: afterTransition,
            transitionDelay: `${afterDelay}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <h4
            className="text-center text-[12px] font-medium uppercase tracking-[0.06em]"
            style={{
              fontFamily: "var(--font-plex-mono), monospace",
              color: "#111",
              marginBottom: 8,
            }}
          >
            {PLATFORM_SHIFT.after.title}
          </h4>
          <ul className="list-none space-y-0 p-0 text-center" style={{ marginTop: 26 }}>
            {PLATFORM_SHIFT.after.items.map((item, i) => (
              <li
                key={item}
                style={{
                  fontSize: "clamp(0.9375rem, 1.1vw, 1rem)",
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.6)",
                  paddingTop: i === 0 ? 0 : 22,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
