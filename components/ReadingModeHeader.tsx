"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Chapter = { label: string; targetId: string };
type SectionToChapter = Record<string, number>;

const CRM_CHAPTERS: Chapter[] = [
  { label: "Overview", targetId: "context" },
  { label: "Inflection Point", targetId: "the-inflection-point-marketplace" },
  { label: "Strategy", targetId: "my-role" },
  { label: "Outcome", targetId: "outcome" },
];

const CRM_SECTION_TO_CHAPTER: SectionToChapter = {
  context: 0,
  "the-inflection-point-marketplace": 1,
  "my-role": 2,
  outcome: 3,
  "what-i-learned": 3,
};

const AUTO_TABLE_CHAPTERS: Chapter[] = [
  { label: "Overview", targetId: "context" },
  { label: "The Core Tension", targetId: "the-inflection-point" },
  { label: "Strategy", targetId: "my-role" },
  { label: "Outcome", targetId: "outcome" },
];

const AUTO_TABLE_SECTION_TO_CHAPTER: SectionToChapter = {
  context: 0,
  "the-inflection-point": 1,
  "my-role": 2,
  outcome: 3,
  "what-i-learned": 3,
};

/** Offset from viewport top so the section heading has breathing room below the header */
const SCROLL_TOP_OFFSET = 140;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_TOP_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

const MONO = {
  borderColor: "#EDEDED",
  bg: "#ffffff",
  text: "#111111",
  textMuted: "#6B6B6B",
} as const;

export function ReadingModeHeader() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  /** When user clicks a chapter, we pin the indicator here until scroll reaches that section (avoids jump through intermediate sections). */
  const scrollTargetIndexRef = useRef<number | null>(null);

  const { chapters, sectionToChapter } = useMemo(() => {
    if (pathname === "/projects/auto-table-assignment") {
      return {
        chapters: AUTO_TABLE_CHAPTERS,
        sectionToChapter: AUTO_TABLE_SECTION_TO_CHAPTER,
      };
    }
    return {
      chapters: CRM_CHAPTERS,
      sectionToChapter: CRM_SECTION_TO_CHAPTER,
    };
  }, [pathname]);

  const handleChapterSelect = (idx: number) => {
    scrollTargetIndexRef.current = idx;
    setActiveIndex(idx);
    scrollToSection(chapters[idx].targetId);
    setMenuOpen(false);
  };

  useEffect(() => {
    const sectionIds = Object.keys(sectionToChapter);
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const pending = scrollTargetIndexRef.current;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          const chapterIdx = sectionToChapter[id];
          if (chapterIdx === undefined) continue;
          if (pending !== null) {
            if (chapterIdx === pending) {
              setActiveIndex(chapterIdx);
              scrollTargetIndexRef.current = null;
            }
          } else {
            setActiveIndex(chapterIdx);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, sectionToChapter]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      className="sticky top-6 z-[100] mx-6 mt-6 flex min-h-[44px] cursor-none items-center justify-between overflow-visible px-4 py-3 md:px-6"
    >
      {/* Back — always goes to home (consistent when opening case study via direct URL) */}
      <Link
        href="/"
        className="link-underline link-underline--lift flex min-h-[44px] min-w-[44px] shrink-0 cursor-none items-center justify-center gap-1 text-[13px] text-[#6B6B6B] hover:text-accent-hover-text md:min-h-0 md:min-w-0 md:justify-start"
        style={{ fontFamily: "var(--font-plex-mono), monospace", display: "flex" }}
        aria-label="Back to home"
      >
        <span aria-hidden>←</span>
        <span className="hidden md:inline">Back</span>
      </Link>

      {/* Center: mobile = label + menu; desktop = tab bar */}
      <nav
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
        aria-label="Current section"
      >
        {/* Mobile: compact label + popover */}
        <div ref={menuRef} className="relative md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] cursor-none items-center gap-1 rounded-lg border px-3 py-2 text-left text-[13px]"
            style={{
              border: `1px solid ${MONO.borderColor}`,
              backgroundColor: MONO.bg,
              color: MONO.text,
              borderRadius: 10,
              fontFamily: "var(--font-plex-mono), monospace",
            }}
            aria-expanded={menuOpen}
            aria-haspopup="listbox"
            aria-label={`Reading: ${chapters[activeIndex].label}. Open chapter menu`}
          >
            <span className="whitespace-nowrap">
              Reading: {chapters[activeIndex].label} ▾
            </span>
          </button>
          {menuOpen && (
            <ul
              role="listbox"
              className="absolute left-1/2 top-full z-50 mt-1 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border"
              style={{
                border: `1px solid ${MONO.borderColor}`,
                backgroundColor: MONO.bg,
                borderRadius: 10,
              }}
            >
              {chapters.map((ch, idx) => (
                <li key={ch.targetId} role="option" aria-selected={activeIndex === idx}>
                  <button
                    type="button"
                    onClick={() => handleChapterSelect(idx)}
                    className="w-full min-h-[44px] cursor-none border-b border-[#EDEDED] px-4 py-3 text-left text-[13px] last:border-b-0"
                    style={{
                      color: idx === activeIndex ? MONO.text : MONO.textMuted,
                      fontFamily: "var(--font-plex-mono), monospace",
                    }}
                  >
                    {ch.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop: centered tab bar */}
        <div
          className="hidden md:flex md:items-center md:gap-2 md:rounded-lg md:border md:px-3 md:py-2"
          style={{
            borderColor: "#EDEDED",
            borderRadius: 10,
            backgroundColor: MONO.bg,
            fontFamily: "var(--font-plex-mono), monospace",
          }}
        >
          {chapters.map((ch, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={ch.targetId}
                type="button"
                onClick={() => handleChapterSelect(idx)}
                className={`shrink-0 cursor-none whitespace-nowrap rounded px-2 py-1 text-[13px] transition-colors duration-[120ms] hover:text-accent-hover-text ${
                  isActive ? "text-[#111111]" : "text-[#6B6B6B]"
                }`}
              >
                <span className="relative inline-block">
                  {ch.label}
                  <span
                    className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 origin-left"
                    style={{
                      backgroundColor: "#4F46E5",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform var(--motion-duration-medium) var(--motion-ease-out)",
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for center alignment */}
      <div className="w-14 shrink-0 md:w-20" aria-hidden />
    </header>
  );
}
