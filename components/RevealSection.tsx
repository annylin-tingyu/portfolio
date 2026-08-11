"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
};

export function RevealSection({ children, className = "" }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    // threshold 0 so the reveal fires when the section's top edge enters the
    // viewport, independent of section height. A percentage threshold delays
    // tall sections (their 12% is a large scroll distance) and leaves a blank gap.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
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
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity var(--motion-duration-medium) var(--motion-ease-out), transform var(--motion-duration-medium) var(--motion-ease-out)`,
      }}
    >
      {children}
    </div>
  );
}

