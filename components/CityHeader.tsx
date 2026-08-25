"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESUME_PDF_HREF } from "@/lib/resume";

type NavItem = { label: string; href: string; external?: boolean };

const FULL_NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Resume", href: RESUME_PDF_HREF, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/atylin/", external: true },
];

// On /about the grid already surfaces Resume + LinkedIn (and About is the current
// page), so the nav drops those and offers a single way back to the work.
const ABOUT_NAV: NavItem[] = [{ label: "Work", href: "/#menu" }];

/**
 * Floating pill nav for the /city home page. Fixed and centered so it overlays
 * the hero (reclaiming vertical space), hugs its content, and uses the rounded
 * floating treatment of the case-study reading indicator with a 24px radius.
 */
export function CityHeader() {
  const pathname = usePathname();
  const nav = pathname === "/about" ? ABOUT_NAV : FULL_NAV;
  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-[100] flex cursor-none justify-center px-4">
      <nav
        className="pointer-events-auto flex w-full items-center justify-between border px-6 py-2.5 md:w-1/2"
        style={{
          borderRadius: 40,
          borderColor: "rgba(117,115,114,0.15)",
          backgroundColor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "none",
          fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
        }}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="shrink-0 cursor-none text-[15px] font-semibold tracking-[-0.01em] text-charcoal transition-colors hover:text-sky"
          style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif" }}
        >
          Anny Lin<span className="text-sky"> ·</span>
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="cursor-none text-[13px] font-medium text-charcoal/70 transition-colors hover:text-sky"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
