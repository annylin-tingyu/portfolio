import Link from "next/link";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[880px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-[15px] font-medium text-black transition-colors duration-[120ms] hover:text-accent-hover-text"
        >
          Portfolio
        </Link>
        <nav className="flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-normal text-charcoal transition-colors duration-[120ms] hover:text-accent-hover-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
