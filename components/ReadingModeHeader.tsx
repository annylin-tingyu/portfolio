"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CHAPTERS: { label: string; targetId: string }[] = [
  { label: "Overview", targetId: "context" },
  { label: "Inflection Point", targetId: "the-inflection-point-marketplace" },
  { label: "Strategy", targetId: "constraints-that-shaped-the-design" },
  { label: "Decisions", targetId: "key-decisions" },
  { label: "Outcome", targetId: "outcome" },
];

/** Offset from viewport top so the section heading has breathing room below the header */
const SCROLL_TOP_OFFSET = 140;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_TOP_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export function ReadingModeHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const targets = CHAPTERS.map((c) => document.getElementById(c.targetId)).filter(Boolean);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          const idx = CHAPTERS.findIndex((c) => c.targetId === id);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className="sticky top-6 z-50 mx-6 mt-6 flex items-center justify-between bg-white px-4 py-3 md:px-6"
    >
      {/* Return — top-left */}
      <button
        type="button"
        onClick={handleBack}
        className="flex shrink-0 items-center gap-1.5 text-[13px] text-mid-gray transition-colors duration-[120ms] hover:text-accent-hover-text"
        aria-label="Back to home"
      >
        <span aria-hidden>←</span>
        <span>Back</span>
      </button>

      {/* Section indicator — top-center */}
      <nav
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
        aria-label="Current section"
      >
        <div
          className="flex items-center gap-1 rounded-lg border border-light-gray bg-white px-2 py-1.5 md:gap-2 md:px-3 md:py-2"
          style={{
            borderColor: "#EDEDED",
            borderRadius: 10,
          }}
        >
          {/* Desktop: inline labels; mobile: horizontal scroll */}
          <div className="flex max-w-[min(60vw,320px)] gap-1 overflow-x-auto py-0.5 md:max-w-none md:overflow-visible md:gap-2">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={ch.targetId}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToSection(ch.targetId);
                  }}
                  className={`shrink-0 whitespace-nowrap rounded px-2 py-1 text-[12px] transition-colors duration-[120ms] hover:text-accent-hover-text md:text-[13px] ${
                    isActive ? "text-black" : "text-mid-gray"
                  }`}
                >
                  <span className="relative inline-block">
                    {ch.label}
                    {isActive && (
                      <span
                        className="absolute left-0 right-0 bottom-0 h-0.5"
                        style={{ backgroundColor: "#3B245C" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer so center nav is truly centered */}
      <div className="w-14 shrink-0 md:w-20" aria-hidden />
    </header>
  );
}
