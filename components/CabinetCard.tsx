"use client";

import Link from "next/link";

type CabinetCardProps = {
  title: string;
  containerLabel: string;
  contents: string;
  metadata: string;
  href: string;
  /** Optional index for subtle vertical offset (e.g. index 1 = 4px lower) */
  index?: number;
};

export function CabinetCard({
  title,
  containerLabel,
  contents,
  metadata,
  href,
  index = 0,
}: CabinetCardProps) {
  const offsetY = index === 1 ? -4 : -8; // Second container 4px lower for realism

  return (
    <Link
      href={href}
      className="cabinet-card-container card-glow group relative flex min-w-0 flex-1 snap-start rounded-lg p-5 outline-none transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(79,70,229,0.35)] sm:min-w-[200px] md:p-5"
      style={{
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transform: `translateY(${offsetY}px)`,
      }}
    >
      <div className="flex min-w-0 flex-1 flex-col items-center text-center">
        {/* Sticker label — centered, pantry-style */}
        <span
          className="cabinet-sticker mb-3 inline-block shrink-0 rounded-[4px] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#374151]"
        >
          {containerLabel}
        </span>

        {/* Project title — slightly smaller, sticker is primary identity */}
        <h2
          className="cabinet-card-title min-w-0 font-semibold leading-tight text-[#111111]"
          style={{ fontSize: "clamp(15px, 1.35vw, 17px)" }}
        >
          {title}
        </h2>

        {/* Contents line — single line, muted */}
        <p className="mt-2 text-xs leading-snug text-[#6B7280]">
          Contents: {contents}
        </p>

        {/* Meta — 11–12px, very subtle */}
        <p className="mt-3 text-[11px] text-[#9CA3AF]">{metadata}</p>
      </div>
    </Link>
  );
}
