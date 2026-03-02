"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = ["Proven Demand", "Scaling Tension", "Platform Bet"] as const;

const EMPHASIS_INDEX = 2; // Platform Bet

const LINE_COLOR = "rgba(0,0,0,0.14)";
const NODE_BORDER = "rgba(0,0,0,0.18)";
const DURATION_MS = 600;
const STAGGER_MS = 80;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export function InflectionPointTimeline() {
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
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lineTransition = reducedMotion ? "none" : `opacity ${DURATION_MS}ms ${EASE}`;
  const nodeTransition = reducedMotion ? "none" : `opacity ${DURATION_MS}ms ${EASE}`;

  return (
    <div
      ref={ref}
      className="w-full max-w-full"
      style={{
        marginTop: 28,
        marginBottom: 56,
      }}
    >
      {/* Panel: subtle surface wrapping timeline + caption (no panel animation) */}
      <div
        className="w-full overflow-hidden rounded-[18px] border p-6 md:p-10"
        style={{
          backgroundColor: "rgba(0,0,0,0.025)",
          borderColor: "rgba(0,0,0,0.06)",
        }}
      >
        {/* Caption: above the timeline */}
        <p
          className="mb-[18px] w-full font-normal text-center"
          style={{
            fontSize: "clamp(13px, 1.2vw, 14px)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.4,
            textAlign: "center",
          }}
        >
          Marketplace embedded transactions directly into the CRM.
        </p>

        {/* Line row: line + 3 nodes evenly spaced, centered vertically */}
        <div className="relative flex w-full items-center" style={{ minHeight: 28 }}>
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-px"
            style={{
              backgroundColor: LINE_COLOR,
              opacity: visible ? 1 : 0,
              transition: lineTransition,
            }}
          />
          <div className="relative z-10 flex w-full items-center gap-1">
            {STEPS.map((label, i) => {
              const isEmphasis = i === EMPHASIS_INDEX;
              const delay = visible ? i * STAGGER_MS : 0;
              return (
                <span
                  key={label}
                  className="flex flex-1 justify-center"
                >
                  <span
                    className="flex shrink-0 rounded-full border bg-white"
                    style={{
                      width: isEmphasis ? 11 : 9,
                      height: isEmphasis ? 11 : 9,
                      borderWidth: isEmphasis ? 2 : 1,
                      borderColor: NODE_BORDER,
                      opacity: visible ? 1 : 0,
                      transition: nodeTransition,
                      transitionDelay: `${delay}ms`,
                    }}
                  />
                </span>
              );
            })}
          </div>
        </div>

        {/* Labels row: under each node; wrap cleanly on small screens */}
        <div className="mt-2 flex w-full gap-1">
          {STEPS.map((label) => (
            <span
              key={label}
              className="flex flex-1 justify-center px-0.5 text-center font-medium md:px-1"
              style={{
                fontSize: "clamp(11px, 1.15vw, 14px)",
                lineHeight: 1.3,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
