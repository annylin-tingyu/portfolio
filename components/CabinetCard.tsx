"use client";

import Link from "next/link";

type CabinetCardProps = {
  title: string;
  containerLabel: string;
  contents: string;
  metadata: string;
  href: string;
};

export function CabinetCard({
  title,
  containerLabel,
  contents,
  metadata,
  href,
}: CabinetCardProps) {

  return (
    <Link
      href={href}
      className="cabinet-card-container card-glow group relative flex min-w-0 flex-1 snap-start rounded-sm outline-none transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(79,70,229,0.35)] sm:min-w-[200px]"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <div className="cabinet-card-inner flex min-w-0 flex-1 flex-col items-center text-center pt-5 pb-5 px-5">
        {/* Label — banker box style */}
        <span
          className="cabinet-sticker mb-3 inline-block shrink-0 rounded-sm px-3 py-1.5 text-xs font-medium uppercase tracking-wide"
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

        {/* Meta */}
        <p className="mt-3 text-[11px] text-[#9CA3AF]">{metadata}</p>
      </div>
    </Link>
  );
}
