"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const contentMax = "clamp(720px, 88vw, 880px)";
const sectionGap = "clamp(48px, 8vw, 80px)";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const STACK_OFFSETS = [
  { x: -12, y: -12, rotate: -4 },
  { x: -6, y: -6, rotate: 2 },
  { x: 0, y: 0, rotate: 0 },
] as const;

type StackItem =
  | { type: "image"; src: string; alt: string }
  | { type: "placeholder"; label: string };

function StackCard({
  item,
  stackPosition,
  isFront,
  isLeaving,
}: {
  item: StackItem;
  stackPosition: 0 | 1 | 2;
  isFront: boolean;
  isLeaving: boolean;
}) {
  const { x, y, rotate } = STACK_OFFSETS[stackPosition];
  // Keep leaving card on top so it slides back smoothly, then drops behind
  const zIndex = isLeaving ? 10 : stackPosition + 1;
  return (
    <div
      className="absolute inset-0 transition-transform duration-[900ms]"
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        zIndex,
        willChange: "transform",
        transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
      }}
      aria-hidden={!isFront}
    >
      <div
        className={`flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] ${isFront ? "shadow-md" : "shadow-sm"}`}
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

const SHUFFLE_DURATION_MS = 900;
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

  // After slide-back animation ends, stop treating the card as "leaving" so z-index drops
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
          />
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  return (
    <article
      className="mx-auto w-full bg-white px-6 pb-[clamp(96px,12vw,140px)] pt-[clamp(48px,8vw,72px)]"
      style={{ maxWidth: contentMax, marginLeft: "auto", marginRight: "auto" }}
    >
      {/* Hero — greeting + statement block */}
      <header className="mb-[clamp(56px,10vw,88px)]">
        <p
          className="mb-10 w-full text-center text-[13px] text-[#6B6B6B] sm:text-[14px]"
          style={{ fontFamily: "var(--font-plex-mono), monospace" }}
        >
          I am curious. I enjoy working with people. I am motivated to make an impact.
        </p>
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
          <div className="shrink-0 md:w-[225px]">
            <ShufflingImageStack
              items={[
                { type: "image", src: `${basePath}/about/about-1.png`, alt: "Anny with puppy" },
                { type: "image", src: `${basePath}/about/about-2.png`, alt: "Anny" },
                { type: "image", src: `${basePath}/about/about-3.png`, alt: "Golden Gate Bridge" },
                { type: "image", src: `${basePath}/about/about-4.png`, alt: "Anny at UC Davis" },
              ]}
            />
          </div>
          <div className="min-w-0">
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
              A Product Designer working across both B2B operational tools and consumer-facing social products.
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
        </div>
      </header>

      <div
        className="h-px w-full bg-[#E5E7EB]"
        style={{ marginBottom: sectionGap }}
        aria-hidden
      />

      {/* Body copy */}
      <section className="space-y-6 text-[15px] leading-relaxed text-[#3a3a3a]">
        <p>
          Much of my work focuses on products used by small business owners and frontline staff managing day-to-day operations such as reservations, tables, payments, and service workflows. Designing for these environments requires clarity, speed, and reliability, since the interface is often used while staff are multitasking during busy service hours.
        </p>
        <p>
          Alongside operational products, I&apos;ve also designed social features aimed at helping people coordinate real-world activities with friends. These experiences involve a different set of challenges: group dynamics, flexible planning, and interactions that feel lightweight and conversational rather than task-driven.
        </p>
        <p>
          Working across these two contexts has shaped how I approach product design. Operational tools require strong structure and predictable systems, while consumer social products demand adaptability and fluid interaction patterns.
        </p>
        <p>
          In practice, my role involves translating product goals into interaction models, interface systems, and implementation-ready design. I collaborate closely with product managers and engineers to define flows, document UI behavior, and structure components that teams can build consistently.
        </p>
        <p>
          My focus is on designing systems that remain simple for users while supporting complex real-world needs.
        </p>
      </section>
    </article>
  );
}
