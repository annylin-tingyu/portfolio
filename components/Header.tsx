"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "About", href: "/about" },
  { label: "Resume", href: "/2026%20Anny_Lin%20Resume.pdf", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/atylin/", external: true },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 cursor-none border-b border-light-gray bg-white/95 backdrop-blur-sm">
      <div className="layout-container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="group cursor-none rounded-sm text-[15px] font-medium text-[#111111] tracking-[-0.01em] transition-colors duration-200 hover:text-[#c47a5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(196,122,91,0.35)]"
          onClick={(event) => {
            if (typeof window === "undefined") return;
            if (pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span>Anny Lin </span>
          <span className="relative inline-block w-[0.7em] text-[#c47a5b]">
            <span className="block transition-opacity duration-[140ms] group-hover:opacity-0">
              ·
            </span>
            <span className="absolute inset-0 opacity-0 transition-opacity duration-[140ms] group-hover:opacity-100">
              —
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="link-underline link-underline--lift cursor-none rounded-sm text-[13px] font-normal text-[#3a3a3a] transition-colors duration-200 hover:text-[#c47a5b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(196,122,91,0.35)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
