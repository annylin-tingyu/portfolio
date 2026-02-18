"use client";

export function CatalogLandingHeader() {
  return (
    <header className="flex h-12 shrink-0 items-start justify-between text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-400">
      <div className="flex items-baseline gap-8 md:gap-12">
        <p className="font-bold text-[#111111]">Anny Lin</p>
        <p className="hidden opacity-60 md:block">Product Designer</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-[#111111]">Selected Work</p>
        <p className="hidden opacity-60 md:block">Case Studies</p>
      </div>
    </header>
  );
}
