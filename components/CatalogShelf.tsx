"use client";

import Link from "next/link";

type CaseStudy = {
  title: string;
  description?: string;
  containerLabel: string;
  contents: string;
  tags?: string[];
  metadata: string;
  href: string;
};

type CatalogShelfProps = {
  caseStudies: CaseStudy[];
};

function HeadlineBay() {
  return (
    <div className="absolute left-[2%] top-0 z-30 flex h-full w-[48%] items-center justify-center">
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
            <span className="text-[#C47A5B]">clarity</span>
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
      className="absolute top-0 bottom-0 z-0 w-[10px] border-x border-[#c5c5c5] bg-[#e0e0e0] shadow-[inset_1px_0_2px_rgba(0,0,0,0.06),2px_0_4px_rgba(0,0,0,0.04)]"
      style={{ left }}
    >
      <div className="flex h-full w-full flex-col justify-around py-8">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="mx-auto h-[4px] w-[1.5px] rounded-full bg-[#b0b0b0] shadow-[0_0_1px_rgba(0,0,0,0.15)]"
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
      style={{ top, left, width, height: "10px" }}
    >
      <div
        className="absolute top-0 left-0 h-[3px] w-full border border-[#c8c8c8] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]"
      />
      <div
        className="absolute -left-[1.5px] -top-4 h-[18px] w-[1.5px] bg-[#b8b8b8] shadow-[1px_1px_2px_rgba(0,0,0,0.08)]"
      />
      <div
        className="absolute -right-[1.5px] -top-4 h-[18px] w-[1.5px] bg-[#b8b8b8] shadow-[1px_1px_2px_rgba(0,0,0,0.08)]"
      />
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
    "absolute z-10 flex flex-col border border-[#d0d0d0] bg-white shadow-sm transition-colors duration-200 hover:border-[#C47A5B]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A5B]";

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

function CaseStudyBox({
  top,
  left,
  width,
  height,
  title,
  description,
  tags,
  href,
}: {
  top: string;
  left: string;
  width: string;
  height: string;
  title: string;
  description?: string;
  tags?: string[];
  href: string;
}) {
  const tagList = tags ?? [];
  return (
    <Link
      href={href}
      className="group absolute z-40 flex cursor-pointer flex-col overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-[0_2px_8px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(17,17,17,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A5B]"
      style={{ top, left, width, height }}
    >
      {/* Lid — thin strip at top, overlaps body */}
      <div
        className="relative z-10 h-3 w-full shrink-0 rounded-t-md border-b border-[#e8e8e8] bg-[#f0f0f0] shadow-[0_1px_2px_rgba(17,17,17,0.04)]"
        aria-hidden
      />
      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2 text-left">
        <h3 className="text-sm font-bold leading-tight text-[#111111]">
          {title}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-[#4a4a4a]">
            {description}
          </p>
        )}
        {tagList.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-0.5 text-[9px] text-[#6b6b6b]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function CatalogShelf({ caseStudies }: CatalogShelfProps) {
  const [first, second] = caseStudies;

  return (
    <div className="relative h-full w-full select-none">
      {/* Bay 1: Headline (50% width) */}
      <HeadlineBay />

      {/* E-tracks — 50% | 30% | 20% */}
      <ETrack left="0%" />
      <ETrack left="50%" />
      <ETrack left="80%" />
      <ETrack left="99%" />

      {/* Bay 2: Middle (30%) — shelves + case study boxes */}
      <Shelf top="24%" left="50%" width="30%" />
      <Shelf top="48%" left="50%" width="30%" />
      <Shelf top="72%" left="50%" width="30%" />

      {/* Desk unit (Middle) */}
      <div
        className="absolute top-[78%] left-[50%] z-20 h-[18%] w-[30%] group"
      >
        <div className="absolute top-0 left-0 h-[3px] w-full border border-[#d0d0d0] bg-white" />
        <div className="absolute top-[3px] left-0 h-[calc(100%-3px)] w-full border-x border-b border-[#e0e0e0] bg-[#fdfdfd]/80 backdrop-blur-sm transition-colors group-hover:bg-white" />
        <div className="absolute bottom-4 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-[#eeeeee]" />
      </div>

      {/* Bay 3: Right (20%) — shelves + cabinet */}
      <Shelf top="24%" left="80%" width="19%" />
      <Shelf top="48%" left="80%" width="19%" />
      <Shelf top="72%" left="80%" width="19%" />
      <Cabinet
        top="78%"
        left="80%"
        width="19%"
        height="18%"
        drawers={2}
        label={first?.containerLabel ?? "Operations"}
        href={first?.href}
      />

      {/* Shelf items — case study boxes (middle column, 2nd bay) */}
      {first && (
        <CaseStudyBox
          top="calc(24% - 140px)"
          left="calc(50% + 16px)"
          width="165px"
          height="140px"
          title={first.title}
          description={first.description}
          tags={first.tags}
          href={first.href}
        />
      )}
      {second && (
        <CaseStudyBox
          top="calc(48% - 140px)"
          left="calc(80% - 165px - 16px)"
          width="165px"
          height="140px"
          title={second.title}
          description={second.description}
          tags={second.tags}
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
