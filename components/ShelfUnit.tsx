"use client";

type ShelfUnitProps = {
  children: React.ReactNode;
};

export function ShelfUnit({ children }: ShelfUnitProps) {
  return (
    <div
      className="shelf-unit-outer relative w-full overflow-hidden rounded-none bg-[#FAFAFA]"
      style={{
        height: "clamp(580px, 72vh, 800px)",
        boxShadow:
          "4px 6px 24px rgba(17,17,17,0.04), 8px 12px 40px rgba(17,17,17,0.03)",
      }}
    >
      {/* Very subtle light — 606 is quiet, minimal drama */}
      <div
        className="shelf-unit-lighting pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* E-profile rails — anodised aluminium, two vertical grooves for shelf insertion */}
      <div
        className="shelf-unit-rail absolute top-0 bottom-0"
        style={{ left: 32, width: 8 }}
        aria-hidden
      />
      <div
        className="shelf-unit-rail absolute top-0 bottom-0 -translate-x-1/2"
        style={{ left: "33.33%", width: 8 }}
        aria-hidden
      />
      <div
        className="shelf-unit-rail absolute top-0 bottom-0 -translate-x-1/2"
        style={{ left: "66.67%", width: 8 }}
        aria-hidden
      />
      <div
        className="shelf-unit-rail absolute top-0 bottom-0"
        style={{ right: 32, width: 8 }}
        aria-hidden
      />

      {/* Content area — shelf edges align with rails (32px = rail inset) */}
      <div className="relative flex h-full flex-col px-[32px] py-10 lg:py-16">
        {/* Shelves (empty) */}
        <div className="shelf-slab-wrapper mb-10 shrink-0" aria-hidden>
          <div className="shelf-unit-slab" />
        </div>
        <div className="shelf-slab-wrapper mb-10 shrink-0" aria-hidden>
          <div className="shelf-unit-slab" />
        </div>
        <div className="shelf-slab-wrapper mb-10 shrink-0" aria-hidden>
          <div className="shelf-unit-slab" />
        </div>

        {/* Main shelf slab — case study boxes sit on top */}
        <div className="shrink-0">
          <div className="shelf-slab-wrapper mb-0" aria-hidden>
            <div className="shelf-unit-slab" />
          </div>
          {/* Cards sitting on shelf — pulled up to rest on slab surface */}
          <div
            className="shelf-unit-cards flex gap-6 overflow-x-auto px-0 pt-2 snap-x snap-mandatory md:gap-8"
            style={{ transform: "translateY(-8px)" }}
          >
            {children}
          </div>
        </div>

        {/* Empty shelves below cards */}
        <div className="shelf-slab-wrapper mt-10 mb-10 shrink-0" aria-hidden>
          <div className="shelf-unit-slab" />
        </div>
        <div className="shelf-slab-wrapper mb-10 shrink-0" aria-hidden>
          <div className="shelf-unit-slab" />
        </div>

        {/* Empty growth area */}
        <div className="min-h-[120px] flex-1" aria-hidden />
      </div>
    </div>
  );
}
