"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Work-section thumbnail for the CRM Marketplace case study.
 * One Marketplace core serving many industries — the verticals light up in
 * sequence around the hub, a NDA-safe motif for the project's actual thesis
 * (a reusable commerce structure that plugs into any vertical).
 */

const INDUSTRIES = [
  { label: "Beauty", emoji: "💅", x: 18, y: 24 },
  { label: "Fitness", emoji: "💪", x: 82, y: 24 },
  { label: "Retail", emoji: "🛍️", x: 18, y: 72 },
  { label: "Service & Experience", emoji: "🛎️", x: 82, y: 72 },
] as const;

const CYCLE_MS = 1150;

export function CrmMarketplaceThumb() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useRef(true);

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
      if (inView.current) setActive((a) => (a + 1) % INDUSTRIES.length);
    }, CYCLE_MS);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        maxWidth: 340,
        height: 184,
        fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
      }}
      aria-hidden
    >
      {/* Connectors from core to each vertical */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {INDUSTRIES.map((ind, i) => {
          // Stop the line short of the badge so it never runs under the icon.
          const t = 0.72;
          const ex = 50 + t * (ind.x - 50);
          const ey = 50 + t * (ind.y - 50);
          return (
            <line
              key={ind.label}
              x1="50"
              y1="50"
              x2={ex}
              y2={ey}
              stroke={active === i ? "#64b5f6" : "rgba(73,80,87,0.16)"}
              strokeWidth={active === i ? 1.6 : 1}
              strokeLinecap="round"
              style={{
                vectorEffect: "non-scaling-stroke",
                transition: "stroke 320ms ease, stroke-width 320ms ease",
              }}
            />
          );
        })}
      </svg>

      {/* Core hub */}
      <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
        <span
          style={{
            display: "inline-block",
            padding: "6px 13px",
            borderRadius: 999,
            backgroundColor: "#495057",
            color: "#ffffff",
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(17,17,17,0.16)",
          }}
        >
          Marketplace
        </span>
      </div>

      {/* Verticals — emoji badge + label, anchored at the badge centre */}
      {INDUSTRIES.map((ind, i) => {
        const on = active === i;
        return (
          <div
            key={ind.label}
            className="absolute"
            style={{
              left: `${ind.x}%`,
              top: `${ind.y}%`,
              transform: `translate(-50%,-50%) scale(${on ? 1.08 : 1})`,
              transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
              zIndex: 2,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                fontSize: 18,
                lineHeight: 1,
                backgroundColor: on ? "rgba(144,202,249,0.22)" : "#ffffff",
                border: `1.5px solid ${on ? "#64b5f6" : "rgba(73,80,87,0.16)"}`,
                boxShadow: on
                  ? "0 5px 14px rgba(100,181,246,0.30)"
                  : "0 2px 8px rgba(17,17,17,0.06)",
                transition: "background-color 320ms ease, border-color 320ms ease, box-shadow 320ms ease",
              }}
            >
              <span aria-hidden>{ind.emoji}</span>
            </div>
            <span
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: 88,
                textAlign: "center",
                lineHeight: 1.15,
                fontSize: 10.5,
                fontWeight: 600,
                color: on ? "#2b3138" : "rgba(73,80,87,0.6)",
                transition: "color 320ms ease",
              }}
            >
              {ind.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
