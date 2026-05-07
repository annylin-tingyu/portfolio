"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Files in /public/owting/ (spaces encoded for URLs). */
const surpriseMeSrc = `${basePath}/owting/surprise%20me.png`;
const createWithMeSrc = `${basePath}/owting/let%27s%20get%20planning.png`;

function FadeInOnScroll({
  delayMs,
  className,
  children,
}: {
  delayMs: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionProperty: "opacity, transform",
        transitionDuration: "0.55s",
        transitionTimingFunction: "ease-out",
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export function SurpriseMeCard() {
  return (
    <FadeInOnScroll
      delayMs={0}
      className="flex flex-col items-center gap-8 rounded-xl border border-[#d4d4d0] p-6 my-6 md:flex-row"
    >
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#BA7517]">Surprise me</p>
        <p className="text-sm text-[#2a2a2a]">
          For hosts who want a starting point without deciding anything. Ollie instantly surfaces trending
          events based on the group&apos;s location and context. One tap to select, then browse and share —
          without leaving the chat.
        </p>
      </div>
      <div className="flex flex-1 justify-center">
        <Image
          src={surpriseMeSrc}
          alt="Surprise Me — two AI-suggested event cards"
          width={340}
          height={260}
          className="max-h-[min(45vh,320px)] w-full max-w-[340px] rounded-lg object-contain"
          sizes="(max-width: 880px) 100vw, 340px"
        />
      </div>
    </FadeInOnScroll>
  );
}

export function CreateWithMeCard() {
  return (
    <FadeInOnScroll
      delayMs={100}
      className="flex flex-col items-center gap-8 rounded-xl border border-[#d4d4d0] p-6 my-6 md:flex-row"
    >
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#0F6E56]">Create with me</p>
        <p className="text-sm text-[#2a2a2a]">
          For hosts with a partial idea. Ollie asks for any available inputs — activity type, location, or
          time. Any combination of inputs, alongside user preference data, generates a curated set of
          AI-driven suggestions. The more context provided, the more personalized the result.
        </p>
      </div>
      <div className="flex flex-1 justify-center">
        <Image
          src={createWithMeSrc}
          alt="Create With Me — Ollie chat bubble and Location, Time, Activity input fields"
          width={300}
          height={320}
          className="max-h-[min(50vh,360px)] w-full max-w-[300px] rounded-lg object-contain"
          sizes="(max-width: 880px) 100vw, 300px"
        />
      </div>
    </FadeInOnScroll>
  );
}

export function CreateManuallyCard() {
  return (
    <FadeInOnScroll
      delayMs={200}
      className="my-6 flex flex-col rounded-xl border border-[#d4d4d0] p-6"
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#5F5E5A]">Create manually</p>
      <p className="text-sm text-[#2a2a2a]">
        For hosts who know exactly what they want. Full creation control, same screen, same conversation.
      </p>
    </FadeInOnScroll>
  );
}
