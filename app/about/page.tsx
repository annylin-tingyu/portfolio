"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillsBoard from "@/components/SkillsBoard";

// On mobile, keep 20px gutters: maxWidth = 100vw - 40px.
// On larger screens, cap at 880px.
const contentMax = "min(880px, calc(100vw - 40px))";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const STACK_OFFSETS = [
  { x: -12, y: -12, rotate: -4 },
  { x: -6, y: -6, rotate: 2 },
  { x: 0, y: 0, rotate: 0 },
] as const;

type StackItem =
  | { type: "image"; src: string; alt: string }
  | { type: "placeholder"; label: string };

const SHUFFLE_DURATION_MS = 900;

function StackCard({
  item,
  stackPosition,
  isFront,
  isLeaving,
  shuffleActive,
}: {
  item: StackItem;
  stackPosition: 0 | 1 | 2;
  isFront: boolean;
  isLeaving: boolean;
  shuffleActive: boolean;
}) {
  const { x, y, rotate } = STACK_OFFSETS[stackPosition];
  // While dealing, z-index is driven by keyframes (high for peel-out, then rear slot for tuck-in)
  const zIndex = stackPosition + 1;

  const showFrontChrome = isFront || isLeaving;

  const motionStyle = isLeaving
    ? ({
        willChange: "transform, z-index",
        animation: `stack-card-deal-to-back ${SHUFFLE_DURATION_MS}ms ease-in-out forwards`,
      } as CSSProperties)
    : ({
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`,
        zIndex,
        willChange: "transform",
      } as CSSProperties);

  const motionClassName = isLeaving
    ? "stack-card-deal-origin stack-card-dealing"
    : `stack-card-stack-base${shuffleActive ? " stack-card-stack-follow" : ""}`;

  return (
    <div
      className={`absolute inset-0 ${motionClassName}`}
      style={motionStyle}
      aria-hidden={!showFrontChrome}
    >
      <div
        className={`flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] ${showFrontChrome ? "shadow-md" : "shadow-sm"}`}
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            width={450}
            height={600}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="text-[13px] text-[#9CA3AF]"
            style={{ fontFamily: "var(--font-plex-mono), monospace" }}
          >
            {item.label}
          </span>
        )}
      </div>
    </div>
  );
}

const SHUFFLE_INTERVAL_MS = 2400;

function ShufflingImageStack({ items }: { items: StackItem[] }) {
  const [frontIndex, setFrontIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const frontRef = useRef(frontIndex);
  frontRef.current = frontIndex;
  const n = items.length;

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => {
      setLeavingIndex(frontRef.current);
      setFrontIndex((prev) => (prev + 1) % n);
    }, SHUFFLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [n]);

  // After deal-to-back animation ends, clear leaving state so z-index matches stack order
  useEffect(() => {
    if (leavingIndex === null) return;
    const t = setTimeout(() => setLeavingIndex(null), SHUFFLE_DURATION_MS);
    return () => clearTimeout(t);
  }, [leavingIndex]);

  return (
    <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
      {items.map((item, i) => {
        const pos = (i - frontIndex + n) % n;
        const stackPosition = (2 - Math.min(pos, 2)) as 0 | 1 | 2;
        return (
          <StackCard
            key={i}
            item={item}
            stackPosition={stackPosition}
            isFront={stackPosition === 2}
            isLeaving={leavingIndex === i}
            shuffleActive={leavingIndex !== null}
          />
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  return (
    <article
      className="mx-auto flex w-full flex-col gap-[40px] bg-white px-0 sm:px-6 pb-[clamp(96px,12vw,140px)] pt-[clamp(48px,8vw,72px)]"
      style={{ maxWidth: contentMax, marginLeft: "auto", marginRight: "auto" }}
    >
      {/* Hero — greeting + statement block */}
      <header>
        <p
          className="mb-[60px] w-full text-center text-[13px] text-[#6B6B6B] sm:text-[14px]"
          style={{ fontFamily: "var(--font-plex-mono), monospace" }}
        >
          I am curious. I enjoy working with people. I am motivated to make an impact.
        </p>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
          <div className="min-w-0" style={{ maxWidth: "calc(100% - 0.2px)" }}>
            <p
              className="mb-2 text-[14px] text-[#6B6B6B]"
              style={{ fontFamily: "var(--font-plex-mono), monospace" }}
            >
              Hey there!
            </p>
            <h1
              className="font-bold text-black"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              I&apos;m Anny
            </h1>
            <p
              className="mt-5 text-[16px] leading-relaxed text-[#3a3a3a]"
              style={{ maxWidth: "52ch" }}
            >
              A Product Designer specializing in B2B2C platforms and operational systems, turning complex workflows into simple, reliable experiences.
            </p>
            <p
              className="mt-6 text-[13px] text-[#6B6B6B]"
              style={{ fontFamily: "var(--font-plex-mono), monospace" }}
            >
              Currently working at
            </p>
            <a
              href="https://www.owting.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 transition-colors hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              aria-label="Owting - Where Friends Meet"
            >
              <Image
                src={`${basePath}/owting%20logo.svg`}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <span className="text-[15px] font-medium text-[#3a3a3a]">Owting</span>
            </a>
          </div>
          <div className="shrink-0 scale-90 md:scale-100 origin-top md:w-[225px]">
            <ShufflingImageStack
              items={[
                { type: "image", src: `${basePath}/about/about-1.png`, alt: "Anny with puppy" },
                { type: "image", src: `${basePath}/about/about-2.png`, alt: "Anny" },
                { type: "image", src: `${basePath}/about/about-3.png`, alt: "Golden Gate Bridge" },
                { type: "image", src: `${basePath}/about/about-4.png`, alt: "Anny at UC Davis" },
              ]}
            />
          </div>
        </div>
      </header>

      <section id="about-me" className="about-me-section">
        <div className="about-between-divider" aria-hidden>
          <span className="about-between-rule" />
          <svg viewBox="0 0 24 24" className="about-between-cup" aria-hidden>
            <path
              d="M6 10 H16 L15 18 Q14.5 20 13 20 H9 Q7.5 20 7 18 Z M16 12 Q20 12 20 15 Q20 18 16 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="about-between-rule" />
        </div>
      </section>

      <section className="about-skills-board-section" aria-label="Skills and tools">
        <SkillsBoard />
      </section>

      {/* Body copy */}
      <section className="space-y-6 text-[15px] leading-relaxed text-[#3a3a3a]">
      <p className="font-medium text-[#2a2a2a] text-xl md:text-2xl mb-6 md:text-left">
        I design systems that stay simple for users while supporting complex real-world needs.
      </p>

      <div className="mb-6">
        <h3 className="font-semibold text-[#2a2a2a] mb-2">What I Specialize In</h3>
        <p>
        B2B2C platforms and operational products such as reservations, payments, and service
        workflows, serving businesses from independent operators to enterprise clients managing
        multi-location operations, where clarity, speed, and reliability are
        requirements, not nice-to-haves.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-[#2a2a2a] mb-2">How I Work</h3>
        <p>
        I collaborate closely with product managers and engineers to move from
        ambiguous goals to clear, shippable solutions.
        </p>
      </div>
      </section>
      <style jsx>{`
        .about-me-section {
          margin-bottom: 0;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .about-skills-board-section {
          width: 100%;
        }

        .about-between-divider {
          position: relative;
          z-index: 1;
          width: fit-content;
          max-width: 100%;
          margin: 16px auto 16px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          color: rgba(196, 122, 91, 0.9);
        }

        .about-between-rule {
          width: min(210px, 28vw);
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(17, 17, 17, 0.18),
            transparent
          );
        }

        .about-between-cup {
          width: 14px;
          height: 14px;
          color: rgba(196, 122, 91, 0.78);
        }

      `}</style>
    </article>
  );
}
