"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[880px] items-center justify-between px-6">
        <Link
          href="/"
          className="group text-[15px] font-medium text-black tracking-[-0.01em] hover:text-accent-hover-text"
          onClick={(event) => {
            if (typeof window === "undefined") return;
            // If we are already on the landing page, just scroll to the top/hero.
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span>Anny Lin </span>
          <span className="relative inline-block w-[0.7em] text-accent-hover-text">
            <span
              className="block transition-opacity duration-[140ms] group-hover:opacity-0"
            >
              ·
            </span>
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-[140ms] group-hover:opacity-100"
            >
              —
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline link-underline--lift text-[13px] font-normal text-charcoal hover:text-accent-hover-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
