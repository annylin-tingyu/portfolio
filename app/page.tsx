import { CatalogShelf } from "@/components/CatalogShelf";

const CASE_STUDIES = [
  {
    title: "Auto Table Assignment System",
    description: "Streamlining restaurant operations with smart automation.",
    containerLabel: "OPERATIONS",
    contents: "Automation · Constraints · Strategy",
    tags: ["operational scalability", "automation"],
    metadata: "B2B SaaS · 2025",
    href: "/projects/auto-table-assignment",
  },
  {
    title: "CRM Marketplace Platform",
    description: "From manual workflows to digital campaigns.",
    containerLabel: "PLATFORM",
    contents: "Strategy · IA · Workflow",
    tags: ["operational scalability", "cross-industry expansion"],
    metadata: "B2B SaaS · 2025",
    href: "/projects/crm-marketplace",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fafafa]">
      <div className="relative min-h-0 w-full flex-1">
        <CatalogShelf caseStudies={CASE_STUDIES} />
      </div>
      {/* System footer — catalog style, overlay */}
      <footer className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-10 items-end justify-between px-6 pb-2 md:px-12">
        <div className="flex items-center gap-4 text-[8px] font-light uppercase tracking-[0.4em] text-neutral-300 md:text-[9px]">
          <div className="h-px w-8 bg-neutral-200" />
          Portfolio · Anny Lin
        </div>
        <div className="hidden rotate-90 origin-bottom-right whitespace-nowrap text-[7px] font-black uppercase tracking-[0.5em] text-neutral-200 md:mb-4 md:block lg:text-[8px]">
          Product Designer
        </div>
      </footer>
    </div>
  );
}
