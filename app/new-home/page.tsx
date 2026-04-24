"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedAvatar } from "@/components/AnimatedAvatar";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type MenuProject = {
  id: string;
  title: string;
  href: string;
  year: string;
  flavorNotes: string;
  badges: string[];
};

const MENU_PROJECTS: MenuProject[] = [
  {
    id: "01",
    title: "Auto table assignment system",
    href: "/projects/auto-table-assignment",
    year: "2025",
    flavorNotes: "Adaptive table assignment to balance staff load.",
    badges: ["Systems", "Workflow", "B2B"],
  },
  {
    id: "02",
    title: "CRM marketplace platform",
    href: "/projects/crm-marketplace",
    year: "2023",
    flavorNotes: "Configurable deposit rules for B2B merchants.",
    badges: ["Platform", "Rules", "UX"],
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(Boolean(mql.matches));
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollRevealStagger(count: number) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState(() => Array.from({ length: count }, () => false));

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(Array.from({ length: count }, () => true));
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(Array.from({ length: count }, () => true));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idxAttr = (e.target as HTMLElement).dataset["idx"];
          const idx = idxAttr ? Number(idxAttr) : -1;
          if (idx >= 0 && e.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of itemRefs.current) {
      if (el) obs.observe(el);
    }

    return () => obs.disconnect();
  }, [count, prefersReducedMotion]);

  return { itemRefs, visible };
}

function CoffeeCup() {
  return (
    <div className="nh-cupWrap" aria-hidden>
      <div className="nh-steam nh-steam--a" />
      <div className="nh-steam nh-steam--b" />
      <div className="nh-steam nh-steam--c" />
      <svg
        width="104"
        height="96"
        viewBox="0 0 104 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="nh-cupSvg"
      >
        <path
          d="M22 30H70L64 54C62.8 59.2 58.2 63 52.9 63H39.1C33.8 63 29.2 59.2 28 54L22 30Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
        />
        <path d="M70 35H82C88 35 92 40 92 46C92 52 88 57 82 57H67" stroke="currentColor" strokeWidth="2" />
        <path
          d="M31 63H73L78 92H26L31 63Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
        />
        <path
          d="M35 30C39 25 45 22 52 22C59 22 65 25 69 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function EspressoMachine() {
  return (
    <svg
      width="170"
      height={129}
      viewBox="0 0 180 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-75 origin-bottom translate-x-[16px]"
      aria-hidden
    >
      <rect x="20" y="40" width="140" height="40" rx="10" fill="black" />
      <rect x="20" y="110" width="140" height="25" rx="8" fill="black" />
      <line x1="28" y1="80" x2="28" y2="110" stroke="black" strokeWidth="1.5" />
      <line x1="152" y1="80" x2="152" y2="110" stroke="black" strokeWidth="1.5" />
      <circle cx="60" cy="85" r="8" fill="black" />
      <circle cx="100" cy="85" r="8" fill="black" />
      <rect x="38" y="80" width="4" height="27" rx="2" fill="none" stroke="black" strokeWidth="1.5" />
      <circle cx="40" cy="125" r="2.5" fill="black" />
      <path d="M45 20H65V35C65 38 45 38 45 35V20Z" fill="black" />
      <path d="M65 25C68 25 68 30 65 30" stroke="black" strokeWidth="1.5" />
      <path d="M115 20H130V35C130 38 115 38 115 35V20Z" fill="black" />
      <path d="M132 20H147V35C147 38 132 38 132 35V20Z" fill="black" />
      <path d="M58 95H82V110C82 115 58 115 58 110V95Z" fill="black" />
      <path d="M82 100C86 100 86 105 82 105" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}

function BarCup() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-[0.65] origin-bottom"
      aria-hidden
    >
      <path
        d="M10 10H50L45 30L35 45H25L15 30L10 10Z"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
      <path d="M50 15H55V30H45" stroke="black" strokeWidth="2" />
      <rect x="25" y="45" width="10" height="4" fill="black" />
      <path
        d="M22 49H38L45 80H15L22 49Z"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
    </svg>
  );
}

function BarSteamingCup({ className = "" }: { className?: string }) {
  return (
    <div className={`nh-barSteamCup relative ${className}`.trim()} aria-hidden="true">
      <div className="nh-barSteam">
        <span className="nh-steamWisp nh-animateSteam" style={{ animationDelay: "0s" }}>
          <svg viewBox="0 0 20 64" className="nh-steamSvg" aria-hidden>
            <path
              d="M10 2 C4 10,16 18,10 26 C4 34,16 42,10 50 C4 58,16 62,10 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="nh-steamWisp nh-animateSteam" style={{ animationDelay: "1.2s" }}>
          <svg viewBox="0 0 20 64" className="nh-steamSvg" aria-hidden>
            <path
              d="M10 2 C16 10,4 18,10 26 C16 34,4 42,10 50 C16 58,4 62,10 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <svg
        viewBox="0 0 100 90"
        className="w-full h-full"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden
      >
        <path
          d="M15 35 H75 L70 78 Q68 85 60 85 H30 Q22 85 20 78 Z"
          fill="none"
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M75 42 Q90 42 90 55 Q90 68 75 68"
          fill="none"
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx="45" cy="38" rx="28" ry="3" className="nh-coffeeFill" opacity="0.85" />
        <path
          d="M30 50 Q35 55 40 50"
          stroke="#111111"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-8" aria-hidden>
      <span className="nh-doodle" />
      <span
        className="text-[11px] tracking-[0.28em] uppercase text-black/65"
        style={{ fontFamily: "var(--font-plex-mono), monospace" }}
      >
        {label}
      </span>
      <div className="h-px flex-1 bg-black/10" />
    </div>
  );
}

export default function NewHomePage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const { itemRefs, visible } = useScrollRevealStagger(MENU_PROJECTS.length);

  const typedHeadline = useMemo(() => "Hi, I’m Anny. A designer & developer.", []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = parallaxRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        el.style.setProperty("--nh-parallax", `${Math.min(24, y * 0.04)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <main ref={parallaxRef} className="nh-page">
      <div className="nh-grain" aria-hidden />

      {/* HERO */}
      <section className="nh-hero">
        <div className="nh-heroFrame" aria-hidden />
        <div className="nh-heroStain" aria-hidden />
        <div className="nh-heroTop">
          <div className="nh-heroInnerCentered">
            <div className="nh-heroStack">
              <h1 className="nh-heroTitle">
                <span
                  className="nh-heroType"
                  style={{
                    ["--nh-ch" as never]: Math.max(18, typedHeadline.length),
                    ["--nh-delay" as never]: "80ms",
                    ["--nh-steps" as never]: Math.max(26, Math.min(72, typedHeadline.length)),
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  <span className="nh-heroTypeInner">{typedHeadline}</span>
                </span>
              </h1>

              <p className="nh-heroSub">
                I build small, warm corners of the internet — the kind you linger in. Think slow mornings, good light, and
                software that doesn’t shout.
              </p>

              <p className="nh-preHours" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                Pull up a chair. Let’s turn complexity into clarity.
              </p>

              <div className="nh-hours" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                <span className="nh-hoursRule" aria-hidden />
                <span className="nh-hoursText">CURRENTLY OPEN</span>
                <span className="nh-hoursRule" aria-hidden />
              </div>

              <a className="nh-scrollCue" href="#menu" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                <span className="nh-scrollArrow" aria-hidden>
                  ↓
                </span>
                <span>today’s menu</span>
              </a>
            </div>
          </div>
        </div>

        {/* Coffee bar (copied from current home) */}
        <div className="nh-heroCoffeeBar">
          <div className="nh-coffeeBarTop">
            <div className="nh-coffeeBarRig">
              <Link href="/" className="flex items-end" aria-label="Anny Lin – Home">
                <div className="relative h-[150px] w-[150px] overflow-visible flex items-start pt-0 md:pt-1">
                  <AnimatedAvatar
                    src={`${basePath}/animatedavatar.json`}
                    speed={1.0}
                    className="w-[150px] h-[360px] pointer-events-none"
                    style={{ width: 150, height: 360, transform: "translateY(-80px)" }}
                  />
                </div>
              </Link>
              <EspressoMachine />
              <div className="flex gap-0 -space-x-3">
                <BarCup />
                <BarCup />
              </div>
              <BarSteamingCup className="ml-2 h-10 w-10 text-black/80" />
            </div>
          </div>
          <div className="nh-coffeeBarCounter" aria-hidden />
        </div>
      </section>

      {/* PROJECTS / MENU */}
      <section id="menu" className="nh-menuSection">
        <div className="nh-container">
          <div className="nh-menuHeader">
            <h2 className="text-[20px] tracking-tight" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              Projects — today’s menu
            </h2>
            <p className="mt-2 text-[14px] text-black/75 max-w-[62ch]">
              Each project is a dish: the headline is the item, the one-liner is the flavor notes, and the badges are the
              “loyalty stamps.”
            </p>
          </div>

          <div className="nh-menuBoard">
            <div className="nh-ringStain" aria-hidden />
            <ol className="divide-y divide-black/10">
              {MENU_PROJECTS.map((p, idx) => (
                <li
                  key={p.id}
                  data-idx={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`nh-menuItem ${visible[idx] ? "nh-menuItem--in" : ""}`}
                  style={{ transitionDelay: `${prefersReducedMotion ? 0 : idx * 90}ms` }}
                >
                  <Link href={p.href} className="nh-menuLink">
                    <div className="nh-menuLeft">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="nh-menuTitle">
                          <span className="nh-menuId">{p.id}</span> {p.title}
                        </span>
                        <span className="nh-menuYear">{p.year}</span>
                      </div>
                      <div className="nh-flavor">{p.flavorNotes}</div>
                    </div>
                    <div className="nh-badges">
                      {p.badges.map((b) => (
                        <span key={b} className="nh-badge">
                          {b}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="nh-container">
        <SectionDivider label="deeper hang" />
      </div>

      {/* ABOUT / CONTACT */}
      <section id="hang" className="nh-hangSection">
        <div className="nh-container">
          <div className="nh-hangGrid">
            <div className="nh-card">
              <h3 className="text-[16px]" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                About
              </h3>
              <p className="mt-3 text-[14px] text-black/80 leading-relaxed max-w-[68ch]">
                I design B2B products that feel calm in the hand: clear IA, good defaults, sturdy systems, and just enough
                motion to guide the eye. The café theme is the personality layer; the craft is the grid, whitespace, and
                polish.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["UX systems", "Product strategy", "Design ops", "Prototyping", "Motion"].map((s) => (
                  <span key={s} className="nh-badge nh-badge--soft">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="nh-card">
              <h3 className="text-[16px]" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                Contact
              </h3>
              <p className="mt-3 text-[14px] text-black/80 leading-relaxed">
                If you’d like to talk shop (or just swap notes), send a message.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <a className="nh-contactLink" href="mailto:hello@annylin.design">
                  hello@annylin.design
                </a>
                <a className="nh-contactLink" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="nh-contactLink" href="https://github.com" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>

              <div className="mt-6">
                <Link href="/" className="nh-pill" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                  Back to current home
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-12 pb-10 text-[12px] text-black/55" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
            Tip: open this page at <span className="text-black/80">/new-home</span> while you iterate on the design.
          </footer>
        </div>
      </section>

      <style jsx>{`
        .nh-page {
          --nh-cream: #fbfaf7;
          --nh-paper: #fffdf8;
          --nh-espresso: #2a1d16;
          --nh-ink: rgba(17, 17, 17, 0.92);
          --nh-rose: #b56a77;
          --nh-sage: #58726a;
          --nh-shadow: 0 12px 34px rgba(26, 16, 10, 0.12);
          --nh-parallax: 0px;
          color: var(--nh-ink);
          background: linear-gradient(180deg, var(--nh-paper) 0%, var(--nh-cream) 55%, #ffffff 100%);
        }

        .nh-container {
          width: min(980px, 92vw);
          margin: 0 auto;
        }

        /* Soft parallax texture (no image) */
        .nh-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.34;
          transform: translate3d(0, calc(var(--nh-parallax) * -1), 0);
          background-image: radial-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1px),
            radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 18px 18px, 26px 26px;
          background-position: 0 0, 13px 9px;
          mix-blend-mode: multiply;
        }

        .nh-hero {
          position: relative;
          z-index: 1;
          /* Full visible viewport under the fixed site header (h-14 = 56px) */
          /* Header also has a 1px bottom border; subtract it to avoid 1px overflow/scroll */
          height: calc(100vh - 56px - 1px);
          padding: 34px 0 0;
          display: grid;
          grid-template-rows: 1fr auto;
          overflow: hidden;
        }

        .nh-heroTop {
          display: grid;
          place-items: center;
          min-height: 0;
        }

        .nh-heroFrame {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 18px;
          opacity: 0.65;
          box-shadow: inset 0 0 0 1px rgba(17, 17, 17, 0.06);
        }

        /* Large stain in top-right like reference */
        .nh-heroStain {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 460px;
          height: 460px;
          border-radius: 999px;
          opacity: 0.18;
          pointer-events: none;
          background: radial-gradient(closest-side, transparent 63%, rgba(42, 29, 22, 0.28) 66%, transparent 72%),
            radial-gradient(closest-side, transparent 74%, rgba(42, 29, 22, 0.18) 76%, transparent 82%);
          filter: blur(0.3px);
          transform: rotate(8deg);
        }

        .nh-heroInnerCentered {
          width: min(980px, 92vw);
          margin: 0 auto;
          padding-top: 10px;
          padding-bottom: 14px;
          text-align: center;
        }

        .nh-heroStack {
          max-width: 74ch;
          margin: 0 auto;
        }

        .nh-heroTitle {
          margin-top: 14px;
          font-size: clamp(34px, 4.4vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: rgba(42, 29, 22, 0.92);
        }

        .nh-heroSub {
          margin: 22px auto 0;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(17, 17, 17, 0.65);
          max-width: 64ch;
        }

        .nh-preHours {
          margin: 18px auto 0;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(17, 17, 17, 0.72);
          max-width: 58ch;
        }

        .nh-hours {
          margin: 20px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(17, 17, 17, 0.5);
          letter-spacing: 0.24em;
          font-size: 11px;
          text-transform: uppercase;
        }

        .nh-hoursRule {
          height: 1px;
          width: 72px;
          background: rgba(17, 17, 17, 0.12);
        }

        .nh-scrollCue {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(17, 17, 17, 0.6);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(17, 17, 17, 0.1);
          background: rgba(255, 255, 255, 0.68);
          backdrop-filter: blur(10px);
          margin: 16px auto 0;
        }

        .nh-scrollArrow {
          display: inline-block;
          transform: translateY(-1px);
          opacity: 0.8;
          animation: nh-bob 1.8s ease-in-out infinite;
        }

        @keyframes nh-bob {
          0%,
          100% {
            transform: translateY(-1px);
          }
          50% {
            transform: translateY(2px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nh-scrollArrow {
            animation: none;
          }
        }

        /* Chalkboard typing */
        .nh-typeLine {
          font-size: 14px;
          line-height: 1.35;
          color: rgba(17, 17, 17, 0.82);
          white-space: nowrap;
          overflow: hidden;
          border-right: 1px solid rgba(17, 17, 17, 0.35);
          width: 0;
          animation: nh-type 900ms steps(24, end) var(--nh-delay) forwards, nh-caret 900ms step-end var(--nh-delay) 1;
        }

        .nh-heroType {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          width: calc(var(--nh-ch) * 1ch);
          max-width: 100%;
        }

        .nh-heroTypeInner {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          vertical-align: bottom;
          clip-path: inset(0 100% 0 0);
          animation: nh-reveal 2000ms steps(var(--nh-steps), end) var(--nh-delay) forwards;
        }

        .nh-heroType::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0.12em;
          bottom: 0.12em;
          width: 2px;
          background: rgba(42, 29, 22, 0.28);
          transform: translateX(2px);
          opacity: 0;
          animation: nh-caret 900ms step-end var(--nh-delay) 6;
        }

        @keyframes nh-reveal {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes nh-type {
          from {
            width: 0;
          }
          to {
            width: calc(var(--nh-ch) * 1ch);
          }
        }

        @keyframes nh-caret {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nh-typeLine,
          .nh-heroType {
            width: auto;
            animation: none;
            white-space: normal;
          }
          .nh-heroTypeInner {
            clip-path: none;
            animation: none;
            white-space: normal;
          }
          .nh-heroType::after {
            display: none;
          }
        }

        .nh-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(17, 17, 17, 0.12);
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset;
          transition: transform 160ms cubic-bezier(0.4, 0, 0.2, 1), border-color 160ms cubic-bezier(0.4, 0, 0.2, 1),
            background 160ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nh-pill:hover {
          transform: translateY(-1px);
          border-color: rgba(17, 17, 17, 0.22);
          background: rgba(255, 255, 255, 0.84);
        }

        .nh-pill--primary {
          border-color: rgba(42, 29, 22, 0.28);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.84) 0%, rgba(255, 255, 255, 0.68) 100%);
        }

        /* Steam animation (CSS-only, very light) */
        .nh-cupWrap {
          position: relative;
          width: 132px;
          height: 124px;
          display: grid;
          place-items: center;
          color: rgba(42, 29, 22, 0.92);
        }

        .nh-cupSvg {
          filter: drop-shadow(0 8px 18px rgba(26, 16, 10, 0.12));
        }

        .nh-steam {
          position: absolute;
          top: 6px;
          left: 50%;
          width: 20px;
          height: 48px;
          opacity: 0.28;
          --nh-x: 0px;
          transform: translateX(calc(-50% + var(--nh-x)));
          background: radial-gradient(closest-side, rgba(42, 29, 22, 0.18), transparent 70%);
          filter: blur(0.3px);
          border-radius: 999px;
          animation: nh-steam 4.6s ease-in-out infinite;
        }

        .nh-steam--a {
          --nh-x: -20px;
          animation-duration: 5.2s;
          animation-delay: 0ms;
        }
        .nh-steam--b {
          --nh-x: 0px;
          animation-duration: 4.6s;
          animation-delay: 400ms;
        }
        .nh-steam--c {
          --nh-x: 14px;
          animation-duration: 5.8s;
          animation-delay: 200ms;
        }

        @keyframes nh-steam {
          0% {
            opacity: 0;
            transform: translate3d(calc(-50% + var(--nh-x)), 18px, 0) scale(0.9);
          }
          20% {
            opacity: 0.24;
          }
          60% {
            opacity: 0.18;
          }
          100% {
            opacity: 0;
            transform: translate3d(calc(-50% + var(--nh-x)), -28px, 0) scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nh-steam {
            display: none;
          }
        }

        /* Divider doodle */
        .nh-doodle {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          border: 1px solid rgba(42, 29, 22, 0.18);
          background: radial-gradient(circle at 35% 35%, rgba(181, 106, 119, 0.22), transparent 55%),
            radial-gradient(circle at 70% 70%, rgba(88, 114, 106, 0.18), transparent 55%);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset;
        }

        .nh-menuSection {
          position: relative;
          z-index: 1;
          padding: 10px 0 12px;
        }

        .nh-menuHeader {
          padding-bottom: 14px;
        }

        .nh-menuBoard {
          position: relative;
          border: 1px solid rgba(17, 17, 17, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.76);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 50px rgba(26, 16, 10, 0.09);
          overflow: hidden;
        }

        /* Ring stain watermark */
        .nh-ringStain {
          position: absolute;
          top: -24px;
          right: 10%;
          width: 180px;
          height: 180px;
          border-radius: 999px;
          opacity: 0.12;
          pointer-events: none;
          background: radial-gradient(closest-side, transparent 62%, rgba(42, 29, 22, 0.35) 64%, transparent 70%),
            radial-gradient(closest-side, transparent 72%, rgba(42, 29, 22, 0.22) 74%, transparent 80%);
          filter: blur(0.2px);
        }

        .nh-menuItem {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
          transition: opacity 520ms cubic-bezier(0.4, 0, 0.2, 1), transform 520ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nh-menuItem--in {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .nh-menuLink {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          padding: 16px;
          align-items: center;
          transition: background 160ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nh-menuLink:hover {
          background: rgba(181, 106, 119, 0.06);
        }

        @media (max-width: 720px) {
          .nh-menuLink {
            grid-template-columns: 1fr;
          }
        }

        .nh-menuTitle {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          font-size: 15px;
          font-family: var(--font-inter), system-ui, sans-serif;
          color: rgba(17, 17, 17, 0.9);
        }

        .nh-menuId {
          font-family: var(--font-plex-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          color: rgba(88, 114, 106, 0.92);
        }

        .nh-menuYear {
          font-family: var(--font-plex-mono), monospace;
          font-size: 12px;
          color: rgba(17, 17, 17, 0.55);
        }

        .nh-flavor {
          margin-top: 6px;
          font-size: 13px;
          color: rgba(17, 17, 17, 0.7);
          line-height: 1.45;
          max-width: 70ch;
        }

        .nh-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-end;
        }

        @media (max-width: 720px) {
          .nh-badges {
            justify-content: flex-start;
          }
        }

        .nh-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(17, 17, 17, 0.12);
          background: rgba(255, 255, 255, 0.75);
          font-size: 12px;
          font-family: var(--font-plex-mono), monospace;
          color: rgba(17, 17, 17, 0.72);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset;
        }

        .nh-badge--soft {
          background: rgba(88, 114, 106, 0.07);
          border-color: rgba(88, 114, 106, 0.18);
        }

        .nh-hangSection {
          position: relative;
          z-index: 1;
          padding: 4px 0 20px;
        }

        .nh-hangGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        @media (max-width: 860px) {
          .nh-hangGrid {
            grid-template-columns: 1fr;
          }
        }

        .nh-card {
          border: 1px solid rgba(17, 17, 17, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
          box-shadow: 0 12px 30px rgba(26, 16, 10, 0.08);
          padding: 18px 18px 16px;
        }

        .nh-contactLink {
          display: inline-flex;
          align-items: center;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(17, 17, 17, 0.12);
          background: rgba(255, 255, 255, 0.72);
          transition: transform 160ms cubic-bezier(0.4, 0, 0.2, 1), border-color 160ms cubic-bezier(0.4, 0, 0.2, 1);
          font-family: var(--font-plex-mono), monospace;
          font-size: 13px;
          color: rgba(17, 17, 17, 0.82);
        }

        .nh-contactLink:hover {
          transform: translateY(-1px);
          border-color: rgba(181, 106, 119, 0.35);
        }

        /* Coffee bar (homepage carry-over) */
        .nh-heroCoffeeBar {
          z-index: 1;
          width: 100%;
          padding: 0;
          overflow: visible;
          pointer-events: none;
        }

        .nh-coffeeBarTop {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 16px;
          pointer-events: none;
          overflow: visible;
        }

        .nh-coffeeBarRig {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 32px;
          flex-wrap: nowrap;
          transform-origin: bottom center;
          transform: scale(0.78);
          pointer-events: auto;
        }

        @media (max-width: 520px) {
          .nh-coffeeBarRig {
            transform: scale(0.58);
          }
        }

        @media (min-width: 900px) {
          .nh-coffeeBarRig {
            transform: scale(0.88);
          }
        }

        .nh-coffeeBarCounter {
          position: relative;
          width: min(980px, 92vw);
          margin: 0 auto;
          height: 160px;
          border-left: 2px solid rgba(17, 17, 17, 0.85);
          border-right: 2px solid rgba(17, 17, 17, 0.85);
          border-top: 4px solid rgba(17, 17, 17, 0.92);
          border-bottom: 2px solid rgba(17, 17, 17, 0.85);
          background-color: #fafafa;
          background-image: linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          overflow: hidden;
          border-radius: 0 0 18px 18px;
        }

        .nh-barSteamCup {
          color: rgba(17, 17, 17, 0.9);
        }

        .nh-barSteam {
          z-index: 2;
          pointer-events: none;
        }

        .nh-coffeeFill {
          fill: rgba(181, 106, 119, 0.78);
        }

      `}</style>
    </main>
  );
}

