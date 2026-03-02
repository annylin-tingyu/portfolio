"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function Lamp() {
  return (
    <div className="relative flex flex-col items-center my-2 w-full">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <path d="M60 0V45" stroke="black" strokeWidth="2.5" />
        <path
          d="M30 75C30 52.5 90 52.5 90 75H30Z"
          stroke="black"
          strokeWidth="2.5"
          fill="white"
        />
        <path d="M30 75H90" stroke="black" strokeWidth="2.5" />
        {/* Bulb glow inside */}
        <circle cx="60" cy="67.5" r="6" fill="#FDE68A" className="animate-pulse" />
      </svg>

      {/* Natural Light Beam */}
      <div
        className="absolute left-1/2 top-[72px] -translate-x-1/2 w-[600px] h-[800px] bg-gradient-to-b from-yellow-100/30 via-yellow-50/10 to-transparent pointer-events-none z-0"
        style={{
          clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary soft glow */}
      <div className="absolute left-1/2 top-[60px] -translate-x-1/2 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none z-0" />
    </div>
  );
}

function TabletopMenu() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-44">
        {/* Translucent panel - borderless, sharp corners, frosted */}
        <div
          className="absolute inset-0 rounded-none overflow-hidden backdrop-blur-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 50%, rgba(250,250,250,0.45) 100%)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.4) inset",
          }}
        >
          {/* Content - same words and format */}
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="text-[10px] font-bold text-center border-b-2 border-black pb-1 mb-4 w-full tracking-[0.2em]">
              SPECIAL MENU
            </div>
            <div className="space-y-2.5 w-full">
              <div className="text-[9px] flex justify-between font-medium">
                <span>FIGMA</span>
                <span>••••</span>
              </div>
              <div className="text-[9px] flex justify-between font-medium">
                <span>REACT</span>
                <span>••••</span>
              </div>
              <div className="text-[9px] flex justify-between font-medium">
                <span>UX DESIGN</span>
                <span>••••</span>
              </div>
              <div className="text-[9px] flex justify-between font-medium">
                <span>MOTION</span>
                <span>••••</span>
              </div>
            </div>
            <div className="text-[9px] font-bold pt-4 mt-4 border-t-2 border-black text-center w-full tracking-tighter">
              ESTABLISHED 2019
            </div>
          </div>
        </div>

        {/* Stand base - black */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-52 h-4 rounded-t-md bg-black shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}

function EspressoMachine() {
  return (
    <svg
      width="170"
      height={129}
      viewBox="0 0 180 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="40" width="140" height="40" rx="10" fill="black" />
      <rect x="20" y="110" width="140" height="25" rx="8" fill="black" />
      <line x1="28" y1="80" x2="28" y2="110" stroke="black" strokeWidth="1.5" />
      <line x1="152" y1="80" x2="152" y2="110" stroke="black" strokeWidth="1.5" />
      <circle cx="60" cy="85" r="8" fill="black" />
      <circle cx="100" cy="85" r="8" fill="black" />
      <rect x="38" y="80" width="4" height="27" rx="2" fill="none" stroke="black" strokeWidth="1.5" />
      <circle cx="40" cy="125" r="2.5" fill="black" />
      <path d="M45 20H65V35C65 38 45 38 45 35V20Z" fill="black" />
      <path d="M65 25C68 25 68 30 65 30" stroke="black" strokeWidth="1.5" />
      <path d="M115 20H130V35C130 38 115 38 115 35V20Z" fill="black" />
      <path d="M132 20H147V35C147 38 132 38 132 35V20Z" fill="black" />
      <path d="M58 95H82V110C82 115 58 115 58 110V95Z" fill="black" />
      <path d="M82 100C86 100 86 105 82 105" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

function Cup() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10H50L45 30L35 45H25L15 30L10 10Z"
        stroke="black"
        strokeWidth="1.5"
        fill="white"
      />
      <path d="M50 15H55V30H45" stroke="black" strokeWidth="1.5" />
      <rect x="25" y="45" width="10" height="4" fill="black" />
      <path
        d="M22 49H38L45 80H15L22 49Z"
        stroke="black"
        strokeWidth="1.5"
        fill="white"
      />
    </svg>
  );
}

const CASE_STUDIES = [
  {
    id: "01",
    title: "auto table assignment system",
    year: "2025",
    href: "/projects/auto-table-assignment",
    previewImage: "https://picsum.photos/600/400?1",
    caption: "Adaptive table assignment to balance staff load",
  },
  {
    id: "02",
    title: "CRM marketplace platform",
    year: "2023",
    href: "/projects/crm-marketplace",
    previewImage: "https://picsum.photos/600/400?2",
    caption: "Configurable deposit rules for B2B merchants",
  },
];

function HeadlineSection() {
  const [hoveredCase, setHoveredCase] = useState<(typeof CASE_STUDIES)[number] | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = () => setIsPreviewEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  const showPreview = isPreviewEnabled && hoveredCase && hoveredCase.previewImage;

  return (
    <section
      className="w-full shrink-0 text-left"
      style={{ cursor: "none" }}
    >
      <h1
        className="text-[24px] tracking-tight"
        style={{ fontFamily: "var(--font-plex-mono), monospace", fontWeight: 500 }}
      >
        Turning product complexity into clarity
      </h1>
      <p
        className="mt-2 text-[16px] text-black/90 font-normal"
        style={{ fontFamily: "var(--font-plex-mono), monospace" }}
      >
        Product Designer focused on B2B platforms and scalable systems
      </p>
      <div className="mt-8 space-y-0">
        {CASE_STUDIES.map((cs) => (
          <Link
            key={cs.id}
            href={cs.href}
            className="flex justify-between items-center py-4 border-b border-black text-sm hover:opacity-60 transition-opacity cursor-none"
            onMouseEnter={() => {
              if (!isPreviewEnabled) return;
              setHoveredCase(cs);
            }}
            onMouseMove={(event) => {
              if (!isPreviewEnabled) return;

              const cardWidth = 360;
              const cardHeight = 240;
              const edgeMargin = 16;
              const offsetX = -180;
              const offsetY = -30;

              const { clientX, clientY } = event;
              const viewportWidth = window.innerWidth ?? 0;
              const viewportHeight = window.innerHeight ?? 0;

              let x = clientX + offsetX;
              let y = clientY + offsetY;

              x = Math.min(
                Math.max(edgeMargin, x),
                viewportWidth - edgeMargin - cardWidth,
              );
              y = Math.min(
                Math.max(edgeMargin, y),
                viewportHeight - edgeMargin - cardHeight,
              );

              setCursorPos({ x, y });
              setHoveredCase(cs);
            }}
            onMouseLeave={() => {
              if (!isPreviewEnabled) return;
              setHoveredCase(null);
            }}
          >
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              case study {cs.id} – {cs.title}
            </span>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
              {cs.year}
            </span>
          </Link>
        ))}
      </div>

      {showPreview && (
        <div
          className="pointer-events-none fixed z-40"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            width: 360,
            height: 240,
            borderRadius: 14,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 14px 40px rgba(15, 23, 42, 0.28)",
            opacity: hoveredCase ? 1 : 0,
            transform: hoveredCase
              ? "translate3d(0,0,0)"
              : "translate3d(0,8px,0)",
            transition:
              "opacity 180ms cubic-bezier(0.4,0,0.2,1), transform 180ms cubic-bezier(0.4,0,0.2,1)",
          }}
          aria-hidden
        >
          <div className="h-[160px] w-full bg-[#e5e7eb]">
            <img
              src={hoveredCase!.previewImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex h-[80px] flex-col justify-between px-4 py-3">
            <p className="text-[12px] leading-snug text-black">
              {hoveredCase!.caption}
            </p>
            <span
              className="text-[11px] text-mid-gray"
              style={{ fontFamily: "var(--font-plex-mono), monospace" }}
            >
              {hoveredCase!.year}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default function AltHome() {
  return (
    <div className="relative h-full min-h-0 overflow-hidden flex flex-col items-center bg-white pt-2 px-6 text-black w-[95vw] max-w-full md:w-[90vw] lg:w-[60vw] min-[1601px]:w-[40vw] mx-auto font-mono">
      {/* Light, then headline, then menu (footer) */}
      <div className="shrink-0 flex flex-col w-full overflow-hidden relative z-10">
        <Lamp />
        <HeadlineSection />
      </div>

      {/* Spacer — pushes footer (coffee bar) to bottom only */}
      <div className="flex-1 min-h-0 w-full shrink-0" aria-hidden />

      {/* Coffee bar — sticks to bottom of page */}
      <footer className="w-full h-[35vh] min-h-0 flex-shrink-0 flex flex-col items-center overflow-hidden">
        <div className="w-full h-4 bg-black mb-2 shrink-0" />
        <div className="flex items-end justify-center shrink-0 min-h-0 w-full">
          <div className="flex items-end gap-8 flex-nowrap shrink-0 origin-bottom scale-[0.495] sm:scale-[0.765] md:scale-[0.855] lg:scale-90">
            <Link
              href="/"
              className="flex items-end"
              aria-label="Anny Lin – Home"
            >
              <Image
                src="/my avatar.png"
                alt="Anny Lin"
                width={140}
                height={175}
                className="object-contain object-bottom h-40 md:h-48 w-auto"
              />
            </Link>
            <EspressoMachine />
            <div className="flex gap-1">
              <Cup />
              <Cup />
            </div>
          </div>
        </div>
        <div
          className="relative z-10 w-full flex-1 min-h-0 border-x-2 border-t-4 border-black mt-0 overflow-hidden"
          style={{
            backgroundColor: "#fafafa",
            backgroundImage:
              "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </footer>
    </div>
  );
}
