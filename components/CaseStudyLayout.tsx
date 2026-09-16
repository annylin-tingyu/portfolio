import Image from "next/image";
import { RevealSection } from "@/components/RevealSection";
import {
  CaseStudyHeader,
  caseStudyContentMax,
  caseStudySectionGap,
  caseStudyHeadingToBody,
} from "@/components/CaseStudyHeader";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const contentMax = caseStudyContentMax;
const sectionGap = caseStudySectionGap;
const headingToBody = caseStudyHeadingToBody;

const MONO = "var(--font-plex-mono), monospace";
const HAIRLINE = "rgba(0,0,0,0.12)";
const CHARCOAL = "#3a3a3a";
const CARD_BORDER = "rgba(0,0,0,0.12)";
const WELL = "#f4f4f3";
const INK = "#111111";

const SECTIONS: { id: string; title: string; kicker: string }[] = [
  { id: "context", title: "Loyalty That Lived at the Counter", kicker: "Overview" },
  { id: "the-inflection-point-marketplace", title: "Sell Online, Serve in Person", kicker: "The Shift" },
  { id: "my-role", title: "Designing the Commerce Layer", kicker: "Strategy" },
  { id: "outcome", title: "One System, Many Industries", kicker: "Outcome" },
  { id: "what-i-learned", title: "What I Learned", kicker: "Reflection" },
];

/* -------------------- Small inline icons (editorial, monochrome) -------------------- */
function StoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9l1-5h14l1 5" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function DiagLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: "rgba(0,0,0,0.55)", fontFamily: MONO }}>
      {children}
    </p>
  );
}

/* -------------------- Diagrams -------------------- */

// Section 2: the shift, shown as a flow. Before = a manual staff relay;
// after = one hub the business and customer both connect to.
function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: INK, color: "#fff" }}>
      {children}
    </span>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </svg>
  );
}
function UserPlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M4 20c0-3.3 2.5-5.2 5.5-5.2 1 0 1.9.2 2.7.6" />
      <path d="M17.5 14.5v5M15 17h5" />
    </svg>
  );
}

function FlowKicker({ strong, muted }: { strong: string; muted: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: MONO }}>
      <span style={{ color: INK }}>{strong}</span>{"  "}
      <span className="font-medium" style={{ color: "rgba(0,0,0,0.35)" }}>{muted}</span>
    </p>
  );
}

function FlowTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-2 font-semibold text-black" style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.75rem)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
      {children}
    </h4>
  );
}

// Field that mimics a product input, with optional trailing affordance.
function Field({ placeholder, trailing, muted = false }: { placeholder: string; trailing?: React.ReactNode; muted?: boolean }) {
  return (
    <span className="flex flex-1 items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2.5 text-[13px]" style={{ borderColor: "rgba(0,0,0,0.14)" }}>
      <span className="truncate" style={{ color: muted ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0.72)" }}>{placeholder}</span>
      {trailing}
    </span>
  );
}

// A before-state step card: STAFF label + step number, title, product-ish body.
function StepCard({ n, title, children }: { n: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-white p-4" style={{ borderColor: CARD_BORDER, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: MONO }}>Staff</span>
        <span className="text-[11px] font-medium tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.28)", fontFamily: MONO }}>{n}</span>
      </div>
      <p className="mt-3 text-[16px] font-semibold" style={{ color: INK }}>{title}</p>
      <div className="mt-auto pt-5">{children}</div>
    </div>
  );
}

// "By hand" connector between the manual steps.
function HandConnector({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 self-center ${vertical ? "flex-row py-1" : "flex-col px-1"}`}>
      <span className="text-center text-[9.5px] font-medium uppercase leading-[1.25] tracking-[0.12em]" style={{ color: "rgba(0,0,0,0.32)", fontFamily: MONO }}>
        By<br />Hand
      </span>
      <svg width={vertical ? 12 : 34} height={vertical ? 34 : 12} viewBox="0 0 44 12" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={vertical ? "rotate-90" : ""} aria-hidden>
        <path d="M1 6h38" />
        <path d="M35 2l5 4-5 4" />
      </svg>
    </div>
  );
}

// Solid arrow used in the after-state; className controls direction per breakpoint.
function SolidArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center self-center ${className}`} style={{ color: INK }} aria-hidden>
      <svg width="46" height="12" viewBox="0 0 56 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6h50" />
        <path d="M46 2l5 4-5 4" />
      </svg>
    </span>
  );
}

function SideLabel({ role, children, align }: { role: string; children: React.ReactNode; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "text-center sm:text-right" : "text-center sm:text-left"}>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: MONO }}>{role}</p>
      <p className="mt-1.5 whitespace-nowrap text-[16px] font-semibold" style={{ color: INK }}>{children}</p>
    </div>
  );
}

// Card bodies, reused across the desktop grid and the mobile stack.
function Body1() {
  return (
    <div className="flex min-h-[60px] items-center gap-3 rounded-xl px-3" style={{ backgroundColor: WELL }}>
      <IconBadge><BriefcaseIcon /></IconBadge>
      <span className="whitespace-nowrap text-[14px]" style={{ color: INK }}>Buy 10 get 2 free</span>
    </div>
  );
}
function Body2() {
  return (
    <div className="flex min-h-[60px] items-center gap-3">
      <IconBadge><UserPlusIcon /></IconBadge>
      <Field placeholder="Buy 10 get 2 free" trailing={<span style={{ color: "rgba(0,0,0,0.35)" }}>+</span>} />
    </div>
  );
}
function Body3() {
  return (
    <div className="flex min-h-[60px] items-center gap-2">
      <Field placeholder="Enter a number" muted />
      <span className="shrink-0 rounded-lg px-4 py-2.5 text-[13px] font-medium text-white" style={{ backgroundColor: "#2e2e2e" }}>Confirm</span>
    </div>
  );
}

function ShiftFlow() {
  return (
    <div className="mt-12">
      {/* BEFORE: manual staff relay */}
      <FlowKicker strong="BEFORE" muted="Manual handoff" />
      <FlowTitle>The offer lived outside the experience.</FlowTitle>

      {/* Desktop: cards + dashed connectors, notes aligned beneath each card */}
      <div className="mt-8 hidden sm:grid" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr", columnGap: "6px" }}>
        <StepCard n="01" title="Create a set"><Body1 /></StepCard>
        <HandConnector />
        <StepCard n="02" title="Find the user, add a set"><Body2 /></StepCard>
        <HandConnector />
        <StepCard n="03" title="Deduct the visit"><Body3 /></StepCard>
      </div>

      {/* Mobile: stacked cards with vertical connectors */}
      <div className="mt-6 flex flex-col gap-4 sm:hidden">
        <StepCard n="01" title="Create a set"><Body1 /></StepCard>
        <HandConnector vertical />
        <StepCard n="02" title="Find the user, add a set"><Body2 /></StepCard>
        <HandConnector vertical />
        <StepCard n="03" title="Deduct the visit"><Body3 /></StepCard>
      </div>

      <div className="mt-14 sm:mt-16" aria-hidden />

      {/* AFTER: one connected hub */}
      <FlowKicker strong="AFTER" muted="Connected in-product" />
      <FlowTitle>The product connects both sides.</FlowTitle>
      <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
        <SideLabel role="Business" align="right">Build + promote</SideLabel>
        <SolidArrow className="rotate-90 sm:rotate-0" />
        <div className="relative w-full max-w-[340px] shrink-0 rounded-2xl border-2 bg-white px-5 py-5 text-left sm:w-[340px]" style={{ borderColor: INK, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: MONO }}>Staff</span>
            <span className="text-[11px] font-medium tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.28)", fontFamily: MONO }}>01</span>
          </div>
          <p className="mt-3 text-[16px]" style={{ color: INK }}>
            <span className="font-semibold">Create a set</span>{" "}
            <span style={{ color: "rgba(0,0,0,0.5)" }}>on Marketplace</span>
          </p>
          <div className="mt-4 flex min-h-[60px] items-center gap-3 rounded-xl px-3" style={{ backgroundColor: WELL }}>
            <IconBadge><StoreIcon /></IconBadge>
            <span className="whitespace-nowrap text-[14px]" style={{ color: INK }}>Buy 10 get 2 free</span>
          </div>
        </div>
        <SolidArrow className="-rotate-90 sm:rotate-180" />
        <SideLabel role="Customer" align="left">Buy on Marketplace</SideLabel>
      </div>
      <p className="mt-8 text-center text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: MONO }}>
        One offer &middot; Live in the product
      </p>
    </div>
  );
}

// Section 2: the shift as a chain of reasoning, on a numbered spine.
function ShiftBeats() {
  const beats: { label: string; body: React.ReactNode }[] = [
    {
      label: "The gap",
      body: (
        <>
          This wasn&apos;t one business improvising. Every business ran loyalty by hand because the product left no other way. A workaround everyone reinvents the same way isn&apos;t an edge case, it&apos;s the product telling you what&apos;s missing.
        </>
      ),
    },
    {
      label: "The decision",
      body: (
        <>
          The easy fix was to smooth the manual flow. But that keeps loyalty one-sided: the business deducts, the customer just watches a number drop. So the team went further, bringing the whole loop, selling, promoting, redeeming, inside the product and making it work for both sides.
        </>
      ),
    },
    {
      label: "What it changed",
      body: (
        <>
          That changed what the product was: not a booking tool with a manual pass tracker, but a commerce layer. Every decision after answered one question: how do you let customers browse and choose the offer that fits them, instead of deciding on the spot mid-conversation, while taking the manual work off both sides?
        </>
      ),
    },
  ];
  return (
    <div className="mt-4">
      {beats.map((beat, i) => {
        const isLast = i === beats.length - 1;
        return (
          <div key={beat.label} className="flex gap-5 sm:gap-6">
            {/* Left rail: number marker + connecting line */}
            <div className="flex flex-col items-center">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                style={{ backgroundColor: CHARCOAL, color: "#fff", fontFamily: MONO }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {!isLast && <span className="w-px flex-1" style={{ backgroundColor: "rgba(0,0,0,0.16)" }} />}
            </div>
            {/* Beat content */}
            <div className={isLast ? "pt-1" : "pt-1 pb-9"}>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: "rgba(0,0,0,0.55)", fontFamily: MONO }}>
                {beat.label}
              </p>
              <p className="mt-2">{beat.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Pillar 1: four building blocks, recombined per business.
// Industry glyphs for the building-block examples.
function DumbbellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4l1.8 5.2L19 11l-5.2 1.8L12 18l-1.8-5.2L5 11l5.2-1.8L12 4Z" />
    </svg>
  );
}
function LotusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19c-1.8-4-1.8-9.5 0-13.5 1.8 4 1.8 9.5 0 13.5Z" />
      <path d="M12 19c-4.2-2-7.2-6-7.2-10 4 .6 6.8 3.9 7.2 10Z" />
      <path d="M12 19c4.2-2 7.2-6 7.2-10-4 .6-6.8 3.9-7.2 10Z" />
    </svg>
  );
}
function CoffeeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
      <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 3v2M12 3v2" />
    </svg>
  );
}

// Pillar 1: define the four building blocks, each with a real example from a
// different vertical (so the same four visibly cover very different businesses).
function BuildingBlocks() {
  const blocks: { n: string; name: string; what: string; example: string; icon: React.ReactNode }[] = [
    { n: "01", name: "Bundle", what: "Prepaid sessions, as a set", example: "A studio: buy 10 classes, get 2 free", icon: <DumbbellIcon /> },
    { n: "02", name: "Voucher", what: "Redeem for one thing", example: "A nail salon: free gel removal", icon: <SparkleIcon /> },
    { n: "03", name: "Account credit", what: "A prepaid balance", example: "A spa: add $500, get $50", icon: <LotusIcon /> },
    { n: "04", name: "Subscription", what: "Recurring, auto-renews", example: "A cafe: 30 cups a month", icon: <CoffeeIcon /> },
  ];
  return (
    <div className="mt-8 w-full">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.55)", fontFamily: MONO }}>The system</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {blocks.map((b) => (
          <div key={b.name} className="flex flex-col rounded-2xl border bg-white p-4" style={{ borderColor: CARD_BORDER, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-[0.16em]" style={{ color: "rgba(0,0,0,0.28)", fontFamily: MONO }}>{b.n}</span>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>{b.icon}</span>
            </div>
            <h5 className="mt-2 text-[15px] font-bold uppercase tracking-[0.01em]" style={{ color: INK }}>{b.name}</h5>
            <p className="mt-2 text-[13px] font-medium" style={{ color: "rgba(0,0,0,0.7)" }}>{b.what}</p>
            <p className="mt-1.5 text-[12px] leading-snug" style={{ color: "rgba(0,0,0,0.45)" }}>{b.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pillar 2: setup as a sequence; the preview is the safety gate before a
// misconfigured rule can lose real money in a live store.
function StepArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center self-center ${className}`} style={{ color: "rgba(0,0,0,0.3)" }} aria-hidden>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 6h16" /><path d="M13 2l4 4-4 4" />
      </svg>
    </span>
  );
}
function TypeUI() {
  const opt = (label: string) => (
    <span className="rounded-md border px-1.5 py-2 text-center text-[10px]" style={{ borderColor: HAIRLINE, color: "rgba(0,0,0,0.5)" }}>{label}</span>
  );
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <span className="relative rounded-md border px-1.5 py-2 text-center text-[10px] font-semibold" style={{ borderColor: INK, borderWidth: 1.5, color: INK }}>
        Bundle
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full" style={{ background: INK }} />
      </span>
      {opt("Voucher")}
      {opt("Account credit")}
      {opt("Subscription")}
    </div>
  );
}
function RuleUI() {
  const pill = (n: string) => (
    <span className="rounded border px-2 py-0.5 text-[11px] font-semibold" style={{ borderColor: "rgba(0,0,0,0.18)", color: INK }}>{n}</span>
  );
  return (
    <>
      <span className="w-fit rounded px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: INK }}>BUNDLE</span>
      <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(0,0,0,0.7)" }}><span>Buy</span>{pill("10")}<span>classes</span></span>
      <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(0,0,0,0.7)" }}><span>Get</span>{pill("2")}<span>free</span></span>
      <span className="h-1 rounded-full" style={{ width: "70%", background: "#ededed" }} />
    </>
  );
}
function PreviewUI() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1 border-b px-2.5 py-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />)}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <span className="rounded-md" style={{ height: 40, background: "repeating-linear-gradient(45deg,#f4f4f4,#f4f4f4 6px,#fafafa 6px,#fafafa 12px)" }} />
        <span className="text-[11px] font-bold" style={{ color: INK }}>10 classes + 2 free</span>
        <span className="h-1 rounded-full" style={{ width: "60%", background: "#ededed" }} />
        <span className="mt-0.5 w-fit rounded px-2.5 py-1 text-[10px] text-white" style={{ background: INK }}>Buy now</span>
      </div>
    </div>
  );
}
function PublishUI() {
  const check = (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border text-[8px]" style={{ borderColor: INK, borderWidth: 1.5, color: INK }}>&#10003;</span>
  );
  return (
    <>
      <span className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(0,0,0,0.7)" }}>{check}<span>Rule saved</span></span>
      <span className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(0,0,0,0.7)" }}>{check}<span>Preview reviewed</span></span>
      <span className="mt-1 flex items-center gap-2">
        <span className="relative inline-block h-4 w-7 rounded-full" style={{ background: INK }}>
          <span className="absolute right-[2px] top-[2px] h-3 w-3 rounded-full bg-white" />
        </span>
        <span className="text-[11px] font-semibold" style={{ color: INK }}>Live</span>
      </span>
    </>
  );
}
function StepCardFrame({ emphasis = false, flush = false, children }: { emphasis?: boolean; flush?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col rounded-xl bg-white ${flush ? "overflow-hidden" : "justify-center gap-2.5 p-3.5"}`}
      style={{ minHeight: 168, border: `${emphasis ? 1.5 : 1}px solid ${emphasis ? INK : CARD_BORDER}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      {children}
    </div>
  );
}
function StepLabel({ n, label, emphasis = false }: { n: string; label: string; emphasis?: boolean }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.08em]" style={{ fontFamily: MONO, color: emphasis ? INK : "rgba(0,0,0,0.5)", fontWeight: emphasis ? 600 : 500 }}>
      {n} &middot; {label}
    </p>
  );
}
const STEPS: { n: string; label: string; Ui: () => React.ReactElement; emphasis: boolean; flush: boolean }[] = [
  { n: "01", label: "Choose a type", Ui: TypeUI, emphasis: false, flush: false },
  { n: "02", label: "Set the rule", Ui: RuleUI, emphasis: false, flush: false },
  { n: "03", label: "Preview", Ui: PreviewUI, emphasis: false, flush: true },
  { n: "04", label: "Publish", Ui: PublishUI, emphasis: false, flush: false },
];
function SetupStepper() {
  return (
    <div className="mt-8 w-full">
      <DiagLabel>Building an offer, one decision at a time</DiagLabel>

      {/* Desktop: four steps in a row, arrows between, labels beneath */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", columnGap: "6px", rowGap: "12px" }}>
        {STEPS.flatMap((s, i) => {
          const Ui = s.Ui;
          const cells = [<StepCardFrame key={s.n} emphasis={s.emphasis} flush={s.flush}><Ui /></StepCardFrame>];
          if (i < STEPS.length - 1) cells.push(<StepArrow key={s.n + "a"} />);
          return cells;
        })}
        {STEPS.flatMap((s, i) => {
          const cells = [<StepLabel key={s.n + "l"} n={s.n} label={s.label} emphasis={s.emphasis} />];
          if (i < STEPS.length - 1) cells.push(<span key={s.n + "s"} />);
          return cells;
        })}
      </div>

      {/* Mobile/tablet: stacked with down arrows */}
      <div className="flex flex-col gap-3 md:hidden">
        {STEPS.flatMap((s, i) => {
          const Ui = s.Ui;
          const items = [
            <div key={s.n} className="flex flex-col gap-2.5">
              <StepCardFrame emphasis={s.emphasis} flush={s.flush}><Ui /></StepCardFrame>
              <StepLabel n={s.n} label={s.label} emphasis={s.emphasis} />
            </div>,
          ];
          if (i < STEPS.length - 1) items.push(<StepArrow key={s.n + "a"} className="rotate-90" />);
          return items;
        })}
      </div>
    </div>
  );
}

// Pillar: where the work lives. Frequent, safe moves stay inline in Marketplace;
// the one risky move, editing a definition, goes back to the module.
function SurfaceRisk() {
  const pill = (label: string) => (
    <span key={label} className="rounded-full border px-3 py-1.5 text-[13px]" style={{ borderColor: HAIRLINE, color: INK }}>{label}</span>
  );
  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-4">
        {/* Marketplace: selling, all inline */}
        <div className="rounded-2xl border bg-white p-5 md:flex-[1.4]" style={{ borderColor: INK, borderWidth: 1.5 }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: INK, fontFamily: MONO }}>Marketplace &middot; Selling</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Create", "Select", "Activate", "Price"].map((p) => pill(p))}
          </div>
          <p className="mt-3 text-[12px]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: MONO }}>all inline, no leaving the flow</p>
        </div>
        {/* Connector */}
        <div className="flex flex-col items-center justify-center gap-1 md:px-1">
          <span className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: MONO }}>edit definition</span>
          <StepArrow className="rotate-90 md:rotate-0" />
          <span className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: MONO }}>ripples to every offer</span>
        </div>
        {/* Module: defining, kept separate on purpose */}
        <div className="rounded-2xl border border-dashed p-5 md:flex-1" style={{ borderColor: "rgba(0,0,0,0.3)", background: "rgba(0,0,0,0.015)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: MONO }}>Module &middot; Defining</p>
          <span className="mt-3 inline-block rounded-full border px-4 py-1.5 text-[13px] font-semibold" style={{ borderColor: INK, color: INK }}>Edit definition</span>
          <p className="mt-3 text-[12px] leading-snug" style={{ color: "rgba(0,0,0,0.5)" }}>changes ripple to every offer that uses it, and can&apos;t touch what a customer already bought</p>
        </div>
      </div>
    </div>
  );
}

// Industry glyphs for the Outcome client roster.
function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z" />
      <path d="M5 19c5-5 9-8 13-10" />
    </svg>
  );
}
function HangerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 9.2c0-1 .7-1.7 1.7-1.7s1.6.7 1.6 1.6" />
      <path d="M12 9.2 4.8 15c-.7.6-.3 1.8.6 1.8h13.2c.9 0 1.3-1.2.6-1.8L12 9.2Z" />
    </svg>
  );
}
function IceCreamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7.5 11a4.5 4.5 0 0 1 9 0Z" />
      <path d="M8 11l4 9 4-9" />
    </svg>
  );
}
function FuelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="4" width="8" height="16" rx="1.5" />
      <path d="M4 20.5h10" />
      <rect x="7.5" y="7" width="3" height="2.5" rx="0.4" />
      <path d="M13 11h2.3a1.2 1.2 0 0 1 1.2 1.2v3.6a1.4 1.4 0 0 0 2.8 0V10l-2-2" />
    </svg>
  );
}

// Outcome: the real client roster, proof of range across industries.
function OutcomeClients() {
  const clients: { industry: string; name: string; use: string; icon: React.ReactNode }[] = [
    { industry: "Skincare", name: "Eartha", use: "Session bundles", icon: <LeafIcon /> },
    { industry: "Dry cleaning", name: "SparKlean", use: "Account credit", icon: <HangerIcon /> },
    { industry: "Soft-serve", name: "Cremia", use: "Retail offers", icon: <IceCreamIcon /> },
    { industry: "Fuel", name: "Victory", use: "Points per liter", icon: <FuelIcon /> },
  ];
  return (
    <div className="mt-8 w-full">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {clients.map((c) => (
          <div key={c.name} className="flex flex-col rounded-2xl border bg-white p-4" style={{ borderColor: CARD_BORDER, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: "rgba(0,0,0,0.45)", fontFamily: MONO }}>{c.industry}</span>
              <span style={{ color: "rgba(0,0,0,0.4)" }}>{c.icon}</span>
            </div>
            <p className="mt-2 text-[15px] font-bold" style={{ color: INK }}>{c.name}</p>
            <p className="mt-1 text-[12px]" style={{ color: "rgba(0,0,0,0.5)" }}>{c.use}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Strategy pillars -------------------- */
function PillarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-semibold text-black"
      style={{ fontSize: "clamp(1rem, 1.3vw, 1.0625rem)", lineHeight: 1.35 }}
    >
      {children}
    </h3>
  );
}

function Strategy() {
  return (
    <div className="mt-2">
      {/* Pillar 1 */}
      <div>
        <PillarTitle>One set of building blocks</PillarTitle>
        <p className="mt-4">
          Every business sold something different, and I couldn&apos;t build a separate product for each. So I broke every offer into four building blocks that recombine.
        </p>
        <BuildingBlocks />
        <p className="mt-6">
          Adding a new business is configuration, not new code.
        </p>
      </div>

      {/* Pillar: create/edit surface */}
      <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
        <PillarTitle>Build without leaving Marketplace</PillarTitle>
        <p className="mt-4">
          Marketplace pulls every kind of item into one place to sell, and the plan had operators leave for every gap. I pushed to keep the frequent moves inline, and to keep one out on purpose: editing a definition ripples to every offer it&apos;s in, so it stays in the module.
        </p>
        <SurfaceRisk />
      </div>

      {/* Pillar 2 */}
      <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
        <PillarTitle>Building offers without breaking them</PillarTitle>
        <p className="mt-4">
          Combined into promotions, buy a bundle get a voucher, buy three for a better tier, these rules are easy to misconfigure, and a mistake loses real money in a live store. So I built setup as a sequence: one decision at a time, a preview of exactly what the customer will see, and a review before it goes live.
        </p>
        <SetupStepper />
      </div>

      {/* A standalone thesis: digital sale, physical settlement, kept in agreement. */}
      <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
        <p
          className="font-medium italic"
          style={{ fontSize: "clamp(1.0625rem, 1.75vw, 1.25rem)", lineHeight: 1.5, color: "#111", borderLeft: `3px solid ${CHARCOAL}`, paddingLeft: "1rem" }}
        >
          The sale is digital, the settlement is physical, and the system&apos;s only job is to keep the two in agreement.
        </p>
      </div>

      {/* Pillar 4 */}
      <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
        <PillarTitle>Why refunds stayed manual</PillarTitle>
        <p className="mt-4">
          The obvious move was a one-click refund. I argued against it: a refund is part of the offline settlement, so it stays with the business, not the platform. The platform kept the record, not the liability.
        </p>
      </div>
    </div>
  );
}

// Hero: the real consumer app (My Purchases + pass detail) paired with an
// NDA-safe recreation of the operator's product builder. Desktop shows the full
// composite; mobile falls back to the real consumer wallet alone.
function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[960px]">
      {/* Full composite — recreated operator console + real consumer screens */}
      <Image
        src={`${basePath}/crm_hero.png`}
        alt="A business creates the Signature Skin Bundle in the operator console while the customer holds it in their My Purchases wallet and opens the pass to redeem"
        width={2672}
        height={2067}
        className="h-auto w-full"
        priority
        unoptimized
      />
      {/* NDA note — refers to the operator console on the left */}
      <p className="mt-2 pr-1 text-right text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: "rgba(0,0,0,0.4)", fontFamily: MONO }}>
        Operator console &middot; recreated for confidentiality
      </p>
    </div>
  );
}

type CaseStudyLayoutProps = {
  category: string;
  title: string;
  description: string;
};

export function CaseStudyLayout({ category, title, description }: CaseStudyLayoutProps) {
  return (
    <article
      className="mx-auto w-full bg-white px-6 pb-[clamp(96px,12vw,140px)]"
      style={{ maxWidth: contentMax, marginLeft: "auto", marginRight: "auto" }}
    >
      <CaseStudyHeader
        category={category}
        title={title}
        description={description}
        media={
          <div className="relative flex w-full justify-center pt-[40px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[40px] mx-auto h-[320px] max-w-[880px] blur-3xl"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(47,111,237,0.12), transparent 60%)" }}
            />
            <div className="relative z-10 w-full">
              <HeroMockup />
            </div>
          </div>
        }
      />

      {SECTIONS.map((section, index) => (
        <RevealSection key={section.id}>
          <section
            id={section.id}
            style={{ marginBottom: sectionGap, paddingTop: index === 0 ? 0 : undefined }}
          >
            {section.kicker && (
              <p
                className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-plex-mono), monospace" }}
              >
                {section.kicker}
              </p>
            )}
            <h2
              className="font-semibold text-black"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", letterSpacing: "-0.01em", lineHeight: 1.3 }}
            >
              {section.title}
            </h2>

            <div
              className="text-black"
              style={{ marginTop: headingToBody, fontSize: "clamp(1rem, 1.25vw, 1.125rem)", lineHeight: 1.6 }}
            >
              {section.id === "context" ? (
                <>
                  <p className="mt-4">
                    The product began as a booking and CRM tool for appointment businesses. Loyalty existed, but barely.
                  </p>
                  <div className="mb-6 mt-8 flex w-full justify-center">
                    <div className="overflow-hidden rounded-sm bg-white" style={{ maxWidth: 560, aspectRatio: "16/10", maxHeight: 320, minHeight: 220, borderRadius: "0.125rem" }}>
                      <Image
                        src={`${basePath}/crmstory.png`}
                        alt="Customer and staff at a counter with a POS and product display in a beauty or retail setting"
                        width={1600}
                        height={1067}
                        className="h-full w-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="mt-6">
                    Staff set up a prepaid bundle on a customer&apos;s profile, then deducted each visit by hand at the counter while the customer waited. Both selling and redeeming happened in conversation, tracked in someone&apos;s head.
                  </p>
                  <p className="mt-4">
                    Businesses sold prepaid because it put cash in the register before a service was delivered. The demand was never in doubt; what was missing was a system to carry it.
                  </p>
                </>
              ) : section.id === "the-inflection-point-marketplace" ? (
                <>
                  <ShiftBeats />
                  <ShiftFlow />
                </>
              ) : section.id === "my-role" ? (
                <Strategy />
              ) : section.id === "outcome" ? (
                <>
                  <p className="mt-4">
                    The same four building blocks carried businesses that share almost nothing, one account spanning 15+ locations, with no POS integration.
                  </p>
                  <OutcomeClients />
                  <p className="mt-8">
                    It grew past the first release, too. Because offers were building blocks, not fixed rules, the system took on earned rewards without a rebuild, points and cashback, switched on per business.
                  </p>
                  <p className="mt-4">
                    That is the payoff of designing structure instead of features: one commerce layer running a cafe&apos;s subscription, a studio&apos;s bundles, and a gas station&apos;s points, without splitting into separate products.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-4">
                    The biggest lesson: in an online-to-offline product, the design that matters most happens before the screen. Reducing a messy catalog to four building blocks did more for usability than any layout, and the least frictionless choice, not automating refunds, was the right one once I weighed liability, revenue, and who delivers the service.
                  </p>
                  <p className="mt-4">
                    That is how I approach product design: start with the model, the incentives, and the offline reality, then design the screen that fits.
                  </p>
                </>
              )}
            </div>
          </section>
        </RevealSection>
      ))}
    </article>
  );
}
