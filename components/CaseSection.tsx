"use client";

import Link from "next/link";

type CaseSectionProps = {
  label: string;
  title: string;
  descriptor: string;
  href: string;
  variant: "dominant" | "secondary";
  children?: React.ReactNode;
};

export function CaseSection({
  label,
  title,
  descriptor,
  href,
  variant,
  children,
}: CaseSectionProps) {
  const isDominant = variant === "dominant";

  return (
    <Link
      href={href}
      className="group block text-left"
    >
      <span
        className="mb-3 block text-[12px] font-medium uppercase tracking-[0.06em] text-mid-gray"
        style={{ letterSpacing: "0.06em" }}
      >
        {label}
      </span>
      <h2
        className="font-semibold text-black transition-colors duration-[120ms] group-hover:text-accent-hover-text"
        style={{
          fontSize: isDominant
            ? "clamp(1.25rem, 4vw, 2rem)"
            : "clamp(1.125rem, 3.5vw, 1.5rem)",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h2>
      <p
        className="mt-2 text-mid-gray"
        style={{
          fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
          lineHeight: 1.5,
        }}
      >
        {descriptor}
      </p>
      {children && (
        <div className="mt-4 overflow-hidden rounded border border-light-gray bg-light-gray/40">
          {children}
        </div>
      )}
    </Link>
  );
}
