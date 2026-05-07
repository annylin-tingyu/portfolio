"use client";

import Link from "next/link";

type CaseStudyCardProps = {
  title: string;
  descriptor: string;
  metadata: string;
  shelfLabel: string;
  href: string;
};

export function CaseStudyCard({
  title,
  descriptor,
  metadata,
  shelfLabel,
  href,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="card-glow group relative block rounded-2xl border border-[#E5E7EB] bg-white p-6 text-left outline-none transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(196,122,91,0.35)]"
      style={{
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="card-label-strip absolute left-0 right-0 top-0 rounded-t-2xl"
        aria-hidden
      />
      <p
        className="mb-2 text-[12px] font-medium uppercase tracking-[0.04em] text-[#6B7280]"
        style={{ letterSpacing: "0.06em" }}
      >
        {shelfLabel}
      </p>
      <h2 className="link-underline font-semibold text-[#111111] transition-colors duration-200 group-hover:text-[#C47A5B]">
        {title}
      </h2>
      <p className="mt-2 text-[15px] leading-[1.5] text-[#6B7280]">
        {descriptor}
      </p>
      <p className="mt-4 text-[12px] text-[#6B7280]">{metadata}</p>
    </Link>
  );
}
