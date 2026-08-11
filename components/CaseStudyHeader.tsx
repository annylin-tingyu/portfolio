import type { ReactNode } from "react";

export const caseStudyContentMax = "clamp(720px, 88vw, 880px)";
export const caseStudySectionGap = "clamp(72px, 10vw, 110px)";
export const caseStudyHeadingToBody = "clamp(12px, 1.5vw, 18px)";

type CaseStudyHeaderProps = {
  category: string;
  title: string;
  description: string;
  /** Hero visual for this case study (Image, custom component, etc.) */
  media: ReactNode;
  /** Override the space below the hero before the divider (defaults to caseStudySectionGap). */
  bottomGap?: string;
  /** Show the accent divider below the hero (defaults to true). */
  showDivider?: boolean;
};

/** Shared header markup (eyebrow, title, description, hero, divider) used across case study layouts. */
export function CaseStudyHeader({ category, title, description, media, bottomGap = caseStudySectionGap, showDivider = true }: CaseStudyHeaderProps) {
  return (
    <>
      <header
        className="pt-[clamp(72px,10vw,100px)]"
        style={{ paddingBottom: bottomGap }}
      >
        <p
          className="mb-3 text-[12px] font-medium uppercase tracking-[0.06em] text-mid-gray"
          style={{ letterSpacing: "0.06em", fontFamily: "var(--font-plex-mono), monospace" }}
        >
          {category}
        </p>
        <h1
          className="font-bold leading-tight text-black"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.4px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          className="mt-[14px] text-mid-gray"
          style={{
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {media}
      </header>

      {showDivider && (
        <div
          className="h-px w-full bg-accent opacity-20"
          style={{ marginBottom: caseStudySectionGap }}
          aria-hidden
        />
      )}
    </>
  );
}
