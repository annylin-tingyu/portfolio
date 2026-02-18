"use client";

import Link from "next/link";

type CaseStudy = {
  title: string;
  containerLabel: string;
  contents: string;
  metadata: string;
  href: string;
};

type CatalogShelfProps = {
  caseStudies: CaseStudy[];
};

function HeadlineBay() {
  return (
    <div className="absolute left-[2%] top-0 z-30 flex h-full w-[46%] items-center justify-center">
      {/* Poster with corner tape */}
      <div
        className="hero-headline relative flex max-w-[90%] flex-col bg-white"
        style={{
          padding: "clamp(28px, 3.5vw, 44px)",
          boxShadow:
            "2px 4px 12px rgba(17,17,17,0.08), 4px 10px 24px rgba(17,17,17,0.05)",
        }}
      >
        {/* Corner tape — top-left */}
        <div
          className="absolute -left-0.5 -top-0.5 z-10 h-4 w-8 rotate-[-12deg] border border-[#e0e0e0] bg-[#f5f3ef] opacity-95"
          aria-hidden
        />
        {/* Corner tape — top-right */}
        <div
          className="absolute -right-0.5 -top-0.5 z-10 h-4 w-8 rotate-[12deg] border border-[#e0e0e0] bg-[#f5f3ef] opacity-95"
          aria-hidden
        />
        {/* Corner tape — bottom-left */}
        <div
          className="absolute -bottom-0.5 -left-0.5 z-10 h-4 w-8 rotate-[12deg] border border-[#e0e0e0] bg-[#f5f3ef] opacity-95"
          aria-hidden
        />
        {/* Corner tape — bottom-right */}
        <div
          className="absolute -bottom-0.5 -right-0.5 z-10 h-4 w-8 rotate-[-12deg] border border-[#e0e0e0] bg-[#f5f3ef] opacity-95"
          aria-hidden
        />
        {/* Content */}
        <div className="relative z-0 flex flex-1 flex-col">
          <div
            className="mb-5 h-px w-10 shrink-0 bg-[rgba(17,17,17,0.20)]"
            aria-hidden
          />
          <h1
            className="font-bold leading-[1.06] tracking-[-0.02em] text-[#111111]"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "clamp(32px, 3.5vw, 48px)",
            }}
          >
            Turning product complexity
            <br />
            into{" "}
            <span className="text-[#4F46E5]">clarity</span>
          </h1>
          <p
            className="mt-[52px] max-w-[560px] text-base font-normal leading-[1.6] text-[#6B7280]"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            Product Designer focused on B2B platforms and scalable systems.
          </p>
        </div>
      </div>
    </div>
  );
}

function ETrack({ left }: { left: string }) {
  return (
    <div
      className="absolute top-0 bottom-0 z-0 w-[6px] border-x border-[#e5e5e5] bg-[#f0f0f0]"
      style={{ left }}
    >
      <div className="flex h-full w-full flex-col justify-around py-8">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="mx-auto h-[2px] w-[2px] rounded-full bg-[#d5d5d5]"
          />
        ))}
      </div>
    </div>
  );
}

function Shelf({
  top,
  left,
  width,
}: {
  top: string;
  left: string;
  width: string;
}) {
  return (
    <div
      className="absolute z-10"
      style={{ top, left, width, height: "6px" }}
    >
      <div className="absolute top-0 left-0 h-[2px] w-full border border-[#e0e0e0] bg-white shadow-sm" />
      <div className="absolute -left-[1px] -top-3 h-[15px] w-[1.2px] bg-[#d0d0d0]" />
      <div className="absolute -right-[1px] -top-3 h-[15px] w-[1.2px] bg-[#d0d0d0]" />
    </div>
  );
}

function Cabinet({
  top,
  left,
  width,
  height,
  drawers,
  label,
  href,
}: {
  top: string;
  left: string;
  width: string;
  height: string;
  drawers: number;
  label: string;
  href?: string;
}) {
  const content = (
    <>
      {[...Array(drawers)].map((_, i) => (
        <div
          key={i}
          className="relative flex flex-1 items-center justify-center border-b border-[#f0f0f0] last:border-b-0"
        >
          <div className="h-1.5 w-12 rounded-[1px] border border-[#e8e8e8] bg-[#f9f9f9]" />
        </div>
      ))}
    </>
  );

  const baseClasses =
    "absolute z-10 flex flex-col border border-[#d0d0d0] bg-white shadow-sm transition-colors duration-200 hover:border-[#4F46E5]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]";

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        style={{ top, left, width, height }}
      >
        {content}
        <span className="sr-only">{label}</span>
      </Link>
    );
  }

  return (
    <div className={baseClasses} style={{ top, left, width, height }}>
      {content}
    </div>
  );
}

function ShelfBox({
  top,
  left,
  width,
  height,
  title,
  href,
}: {
  top: string;
  left: string;
  width: string;
  height: string;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="absolute z-40 flex cursor-pointer flex-col items-center justify-center rounded-[1px] border border-neutral-300 bg-[#f8f8f8] p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-neutral-400 hover:shadow-md group-hover:border-neutral-400"
      style={{ top, left, width, height }}
    >
      <div className="mb-1 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white">
        <span className="text-[7px] font-bold text-neutral-400">
          {title[0]}
        </span>
      </div>
      <p className="text-center text-[6px] font-bold uppercase tracking-tighter text-neutral-400">
        {title}
      </p>
    </Link>
  );
}

export function CatalogShelf({ caseStudies }: CatalogShelfProps) {
  const [first, second] = caseStudies;

  return (
    <div className="relative h-full w-full select-none">
      {/* Bay 1: Headline (50% width) */}
      <HeadlineBay />

      {/* E-tracks — left edge + 3 bays: 50% | 25% | 25% */}
      <ETrack left="0%" />
      <ETrack left="50%" />
      <ETrack left="75%" />
      <ETrack left="99%" />

      {/* Bay 2: Narrow — shelves span 50% to 75% (touch E-tracks) */}
      <Shelf top="18%" left="50%" width="25%" />
      <Shelf top="35%" left="50%" width="25%" />
      <Shelf top="52%" left="50%" width="25%" />

      {/* Desk unit (Narrow) */}
      <div
        className="absolute top-[65%] left-[50%] z-20 h-[20%] w-[25%] group"
      >
        <div className="absolute top-0 left-0 h-[3px] w-full border border-[#d0d0d0] bg-white" />
        <div className="absolute top-[3px] left-0 h-[calc(100%-3px)] w-full border-x border-b border-[#e0e0e0] bg-[#fdfdfd]/80 backdrop-blur-sm transition-colors group-hover:bg-white" />
        <div className="absolute bottom-4 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-[#eeeeee]" />
      </div>

      {/* Bay 3: Wide — shelves span 75% to 99% (touch E-tracks) */}
      <Shelf top="18%" left="75%" width="24%" />
      <Shelf top="35%" left="75%" width="24%" />
      <Shelf top="52%" left="75%" width="24%" />
      <Cabinet
        top="65%"
        left="75%"
        width="24%"
        height="22%"
        drawers={2}
        label={first?.containerLabel ?? "Operations"}
        href={first?.href}
      />

      {/* Shelf items — case study boxes (Wide Bay) */}
      {first && (
        <ShelfBox
          top="calc(18% - 69px)"
          left="75%"
          width="120px"
          height="52px"
          title={first.title.split(" ").slice(0, 2).join(" ")}
          href={first.href}
        />
      )}
      {second && (
        <ShelfBox
          top="calc(35% - 69px)"
          left="75%"
          width="120px"
          height="52px"
          title={second.title.split(" ").slice(0, 2).join(" ")}
          href={second.href}
        />
      )}

      {/* Subtle depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
