import Link from "next/link";
import { CabinetCard } from "@/components/CabinetCard";
import { ShelfUnit } from "@/components/ShelfUnit";

const CASE_STUDIES = [
  {
    title: "Auto Table Assignment System",
    containerLabel: "OPERATIONS",
    contents: "Automation · Constraints · Strategy",
    metadata: "B2B SaaS · 2025",
    href: "/projects/auto-table-assignment",
  },
  {
    title: "CRM Marketplace Platform",
    containerLabel: "PLATFORM",
    contents: "Strategy · IA · Workflow",
    metadata: "B2B SaaS · 2025",
    href: "/projects/crm-marketplace",
  },
];

export default function Home() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <section
        id="work"
        className="flex min-h-0 flex-1 flex-col justify-center items-center py-12"
      >
        <div className="mx-auto w-full max-w-[1280px] shrink-0 px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* Hero text (left column on lg+) */}
            <div className="min-w-0">
            <div
              className="mb-6 h-0.5 w-14 bg-[#4F46E5]"
              aria-hidden
            />
            <h1
              className="font-extrabold leading-[1.05] text-[#111111]"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "clamp(44px, 4.6vw, 72px)",
                letterSpacing: "-0.02em",
              }}
            >
              Turning product complexity
              <br />
              into{" "}
              <span className="text-[#4F46E5]">clarity</span>
            </h1>
            <p
              className="mt-12 max-w-[520px] font-normal text-[#6B7280] md:mt-14"
              style={{
                fontSize: "16px",
                lineHeight: 1.5,
              }}
            >
              Product Designer focused on B2B platforms and scalable systems.
            </p>
            <nav
              className="mt-10 flex flex-wrap gap-6"
              aria-label="Primary"
            >
              <Link
                href="/#work"
                className="link-underline text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:text-[#4F46E5]"
              >
                Work
              </Link>
              <Link
                href="/#about"
                className="link-underline text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:text-[#4F46E5]"
              >
                About
              </Link>
              <Link
                href="/resume"
                className="link-underline text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:text-[#4F46E5]"
              >
                Resume
              </Link>
            </nav>
            </div>

            {/* Shelf unit (right column on lg+) */}
            <div className="min-w-0">
              <ShelfUnit>
                {CASE_STUDIES.map((study, i) => (
                  <CabinetCard
                    key={study.href}
                    title={study.title}
                    containerLabel={study.containerLabel}
                    contents={study.contents}
                    metadata={study.metadata}
                    href={study.href}
                    index={i}
                  />
                ))}
              </ShelfUnit>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
