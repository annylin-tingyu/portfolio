import Image from "next/image";
import { RevealSection } from "@/components/RevealSection";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const contentMax = "clamp(720px, 88vw, 880px)";
const sectionGap = "clamp(72px, 10vw, 110px)";
const headingToBody = "clamp(12px, 1.5vw, 18px)";

const SECTION_CONTENT: Record<string, (string | { list: string[] })[]> = {
  context: [
    "The product serves small and mid-sized restaurants operating in high-pressure, real-time environments. Staff members often manage reservations while simultaneously handling guests, seating, and service. Unlike enterprise operations teams, most users are not technical operators and do not have time to configure complex systems.\n\nTheir goal is not to run a “smart” system. It is to avoid costly mistakes, maximize table utilization, and keep service running smoothly.",
    "Before automation, table assignment was handled manually. Under time pressure, this frequently led to issues such as overbooking, incorrect table turnover timing, and inefficient use of available time gaps between reservations.\n\nRestaurants typically define a standard dining duration (e.g., two hours), but real service rarely follows fixed blocks. Parties may finish early, walk-ins may agree to shorter dining windows, and staff may temporarily adjust seating capacity (e.g., adding a chair to a four-person table). These real-world adjustments are normal, not exceptional.\n\nAny automation introduced into this environment needed to reduce workload and prevent common errors without restricting the flexibility that restaurants rely on to optimize capacity in real time.",
  ],
  "the-inflection-point": [
    "Table assignment presented a clear opportunity for automation. By systematically calculating capacity, reservation timing, and dining duration, the system could reduce overbooking errors and accelerate placement decisions during peak hours.",
    "However, full automation introduced a different risk: rigidity.",
    "Restaurants do not operate in perfect two-hour blocks. Guests may finish early. Walk-ins may agree to shorter dining windows. Staff may temporarily expand seating capacity by adding a chair to a four-person table. These adjustments are part of everyday service.",
    "Rather than enforcing strict optimization, the design centered on structured defaults with intentional override. The system enforces dining duration and capacity by default, while requiring manual confirmation when placing parties into shorter gaps or adjusting table capacity. This approach preserves operational flexibility while preventing accidental overbooking.",
  ],
  "my-role": [
    "Designing a Trustworthy Auto-Assignment System\n\nThe goal was not to “automate table assignment,” but to design a system that felt predictable, explainable, and operationally realistic. My responsibility was defining the interaction model and state transitions such as what the system should evaluate, when it should react, and how outcomes (success or failure) are communicated to staff.",
    "Auto-assignment is triggered only when required inputs are complete:\n\n• Date\n• Time\n• Party size\n\nEvaluation runs only when inputs are complete.\n\nEdits trigger debounced re-evaluation.",
    "When a party size increases during an edit, the system first evaluates whether the currently assigned table can expand using adjacent, mergeable tables.\n\nInstead of immediately searching the entire floor, the system attempts to preserve spatial stability.\n\nThis reduces operational confusion and avoids unnecessary movement of other reservations.",
    "Assignment follows a clear priority:\n\n1. Exact capacity match\n2. Smallest sufficient capacity (within configured min/max limits)\n\nThis ensures seat efficiency without over-allocating tables.",
    "Every evaluation resolves into a clear state:\n\n• Assigned successfully\n• Cannot assign (with explanation)\n• Manual assignment required\n\nIf the system cannot satisfy headcount, it does not silently fail. It communicates why and transitions the user into a guided manual resolution path.",
    "Restaurants operate with nuance. Staff may:\n\n• Fit a group into a shorter gap\n• Add an extra chair\n• Accept slight overcapacity\n\nThe system warns but does not block these actions.\n\nAutomation provides guardrails, not rigid control.",
  ],
  "constraints-that-shaped-the-design": [
    "Several constraints shaped the final design:",
    {
      list: [
        "Hosts needed to remain in control — the system could never auto-seat without confirmation.",
        "The model had to work within existing floor plans and POS data; adding hardware sensors was out of scope.",
        "Any mis-assignment that hurt turn times or server tips would erode trust quickly.",
      ],
    },
  ],
  "design-strategy": [
    "Rather than chasing a perfectly optimal algorithm, we optimized for reliability and explainability:",
    {
      list: [
        "Make recommendations fast and visible, never buried behind filters.",
        "Make reasons legible, so hosts can course-correct when local context matters more than the model.",
        "Keep failure modes safe — the worst outcome should resemble current manual behavior, not something worse.",
      ],
    },
  ],
  outcome: [
    "After rollout, hosts reported feeling less rushed during peak periods, and managers saw fewer sections running consistently behind.\n\nThe system didn’t replace judgment; it absorbed the repetitive decision-making so people could focus on exceptions and hospitality.",
  ],
  "what-i-learned": [
    "Working on auto table assignment changed how I think about automation in operational tools.\n\nAt first, it’s tempting to treat automation as a way to eliminate manual work. But in restaurants, seating decisions often depend on things the system can’t fully see, such as guest preferences, walk-ins, or small adjustments staff make on the floor.\n\nWhat became more important was designing automation that supports decision-making rather than replacing it. The system could quickly suggest placements, but staff still needed the ability to adjust or override those suggestions when real-world conditions changed.\n\nThis project also taught me how important clear system states are. When the system can’t assign a table, simply failing isn’t helpful. Staff need to understand why it failed and what they should do next.\n\nWhat mattered most was defining when the system should act, and when it should step back for human judgment.",
  ],
};

function AutomationSpectrumDiagram() {
  return (
    <div className="mt-10 mb-10 w-full">
      <p
        className="mb-4 text-[12px] uppercase tracking-[0.16em]"
        style={{ color: "rgba(0,0,0,0.55)" }}
      >
        AUTOMATION SPECTRUM
      </p>
      <div className="mt-4 flex flex-col items-stretch gap-6 md:flex-row md:items-stretch md:gap-4">
        {/* Left: rigid automation */}
        <div
          className="flex-1 rounded-2xl border px-5 py-6 sm:px-6 sm:py-7"
          style={{ borderColor: "rgba(0,0,0,0.08)", borderRadius: 16, minWidth: 0 }}
        >
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.12em]"
          style={{
            color: "rgba(0,0,0,0.55)",
            fontFamily: "var(--font-plex-mono), monospace",
          }}
        >
            RIGID AUTOMATION
          </p>
          <ul className="mt-4 space-y-1.5 text-[15px]" style={{ color: "rgba(0,0,0,0.78)" }}>
            <li>Fixed 2-hour blocks</li>
            <li>Hard capacity limits</li>
            <li>Auto-fill all gaps</li>
            <li>No manual adjustment</li>
          </ul>
        </div>

        {/* Center: tension label */}
        <div className="flex shrink-0 flex-col items-center justify-center px-1 text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            TENSION
          </p>
        <div
          className="mt-1 text-[16px]"
          style={{ color: "rgba(0,0,0,0.45)", lineHeight: 1 }}
        >
          →
        </div>
        </div>

        {/* Right: assistive automation */}
        <div
          className="flex-1 rounded-2xl border px-5 py-6 sm:px-6 sm:py-7"
          style={{ borderColor: "rgba(0,0,0,0.08)", borderRadius: 16, minWidth: 0 }}
        >
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.12em]"
          style={{
            color: "rgba(0,0,0,0.72)",
            fontFamily: "var(--font-plex-mono), monospace",
          }}
        >
            ASSISTIVE AUTOMATION
          </p>
          <ul className="mt-4 space-y-1.5 text-[15px]" style={{ color: "rgba(0,0,0,0.84)" }}>
            <li>Structured default duration</li>
            <li>Intentional manual override for short gaps</li>
            <li>Guardrails prevent overbooking</li>
            <li>Flexible real-time capacity adjustment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const cardBorder = "rgba(0,0,0,0.08)";
const cardRadius = 16;

function StrategyPillarGrid() {
  return (
    <div
      className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2"
      style={{ maxWidth: "100%" }}
    >
      {/* Pillar 1 — When Automation Runs */}
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: cardBorder, borderRadius: cardRadius }}
      >
        <h3 className="font-semibold text-black" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)" }}>
          When Automation Runs
        </h3>
        <div className="my-4 h-px w-full" style={{ backgroundColor: cardBorder }} aria-hidden />
        <p className="mb-3 text-[15px] leading-snug" style={{ color: "rgba(0,0,0,0.85)" }}>
          Triggered only when required inputs are complete:
        </p>
        <ul className="flex w-full list-none flex-wrap justify-between gap-y-1 pl-0 text-[15px]" style={{ color: "rgba(0,0,0,0.8)" }}>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="text-[14px]" style={{ color: "rgba(0,0,0,0.7)" }}>✓</span>
            Date
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="text-[14px]" style={{ color: "rgba(0,0,0,0.7)" }}>✓</span>
            Time
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="text-[14px]" style={{ color: "rgba(0,0,0,0.7)" }}>✓</span>
            Party size
          </li>
        </ul>
        <p className="mt-4 text-[13px]" style={{ color: "rgba(0,0,0,0.65)" }}>
          This prevents premature failure states while staff are still entering information.
        </p>
      </div>

      {/* Pillar 2 — Stability Before Reallocation */}
      <div
        className="group rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: cardBorder, borderRadius: cardRadius }}
      >
        <h3 className="font-semibold text-black" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)" }}>
          Stability Before Reallocation
        </h3>
        <div className="my-4 h-px w-full" style={{ backgroundColor: cardBorder }} aria-hidden />
        <p className="text-[15px] leading-snug" style={{ color: "rgba(0,0,0,0.85)" }}>
          The system first attempts to preserve the current table.
        </p>
        <p className="mt-2 text-[15px] leading-snug" style={{ color: "rgba(0,0,0,0.85)" }}>
          If the party size increases, it first checks whether adjacent tables can be merged before searching for a completely new placement.
        </p>
        <p className="mt-2 text-[13px]" style={{ color: "rgba(0,0,0,0.7)" }}>
          This minimizes floor disruption and preserves intentional seating choices.
        </p>
      </div>

      {/* Pillar 3 — Capacity Efficiency Rules */}
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: cardBorder, borderRadius: cardRadius }}
      >
        <h3 className="font-semibold text-black" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)" }}>
          Capacity Efficiency Rules
        </h3>
        <div className="my-4 h-px w-full" style={{ backgroundColor: cardBorder }} aria-hidden />
        <ol className="list-decimal space-y-1.5 pl-5 text-[15px]" style={{ color: "rgba(0,0,0,0.8)" }}>
          <li>Exact capacity match</li>
          <li>Smallest sufficient capacity</li>
        </ol>
        <p className="mt-4 text-[13px]" style={{ color: "rgba(0,0,0,0.6)" }}>
          Uses configured min/max capacity ranges.
        </p>
      </div>

      {/* Pillar 4 — Clear States & Overrides */}
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ borderColor: cardBorder, borderRadius: cardRadius }}
      >
        <h3 className="font-semibold text-black" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)" }}>
          Clear States & Overrides
        </h3>
        <div className="my-4 h-px w-full" style={{ backgroundColor: cardBorder }} aria-hidden />
        <ul className="list-disc space-y-1 pl-5 text-[15px]" style={{ color: "rgba(0,0,0,0.8)" }}>
          <li>Assigned</li>
          <li>Cannot assign (with explanation)</li>
          <li>Manual required</li>
        </ul>
        <p className="mt-4 text-[13px]" style={{ color: "rgba(0,0,0,0.6)" }}>
          System warns but does not block manual overrides.
        </p>
      </div>
    </div>
  );
}

function AutoAssignmentFlowDiagram() {
  const stroke = "#E5E7EB";
  const textColor = "#111111";

  return (
    <section className="mt-12 w-full flex justify-center">
      <figure
        className="w-full"
        aria-label="Flow of auto-assignment evaluation from input change to assigned or manual required."
      >
        <p
          className="text-[11px] uppercase tracking-[0.16em] mb-1"
          style={{ color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-plex-mono), monospace" }}
        >
          Flow
        </p>
        <p
          className="mb-4 text-[14px]"
          style={{ color: "rgba(0,0,0,0.9)" }}
        >
          Auto-assignment evaluation
        </p>
        <div className="w-full max-w-[960px] overflow-x-auto">
          <Image
            src={`${basePath}/table assign logic.svg`}
            alt="Auto-assignment evaluation flow from input change through availability checks to tables assigned or manual handling."
            width={1920}
            height={1080}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </figure>
    </section>
  );
}

const SECTIONS: { id: string; title: string }[] = [
  { id: "context", title: "Context" },
  { id: "the-inflection-point", title: "The Core Tension" },
  { id: "my-role", title: "Strategy" },
  { id: "outcome", title: "Outcome" },
  { id: "what-i-learned", title: "What I Learned" },
];

type AutoTableCaseStudyLayoutProps = {
  category: string;
  title: string;
  description: string;
};

export function AutoTableCaseStudyLayout({
  category,
  title,
  description,
}: AutoTableCaseStudyLayoutProps) {
  return (
    <article
      className="mx-auto w-full bg-white px-6 pb-[clamp(96px,12vw,140px)]"
      style={{ maxWidth: contentMax, marginLeft: "auto", marginRight: "auto" }}
    >
      <header
        className="pt-[clamp(72px,10vw,100px)]"
        style={{ paddingBottom: sectionGap }}
      >
        <p
          className="mb-3 text-[12px] font-medium uppercase tracking-[0.06em] text-mid-gray"
          style={{ letterSpacing: "0.06em", fontFamily: "var(--font-plex-mono), monospace" }}
        >
          {category}
        </p>
        <h1
          className="font-bold leading-tight text-black"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.4px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          className="mt-[14px] text-mid-gray"
          style={{
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
        <div className="pt-[40px] flex w-full justify-center">
          <Image
            src={`${basePath}/autotablehero.webp`}
            alt="Auto Table Assignment System – live seating recommendations across the dining room"
            width={1920}
            height={1080}
            className="h-auto w-full max-w-[960px]"
            unoptimized
          />
        </div>
      </header>

      <div
        className="h-px w-full bg-accent opacity-20"
        style={{ marginBottom: sectionGap }}
        aria-hidden
      />

      {SECTIONS.map((section, index) => (
        <RevealSection key={section.id}>
          <section
            id={section.id}
            style={{
              marginBottom: section.id === "my-role" ? "90px" : sectionGap,
              paddingTop: index === 0 ? 0 : undefined,
            }}
          >
            <h2
              className="font-semibold text-black"
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              {section.title}
            </h2>
            <div
              className="text-black"
              style={{
                marginTop: headingToBody,
                fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                lineHeight: 1.6,
              }}
            >
              {section.id === "outcome" ? (
                <>
                  <div>
                    <p
                      className="mb-1 text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-plex-mono), monospace" }}
                    >
                      System Capability
                    </p>
                    <p>
                      The final design enabled automatic table suggestions once the required inputs including date, time, and party size were provided.
                    </p>
                    <p className="mt-4">
                      The system evaluates available tables using capacity rules and adjacency checks, and either assigns tables automatically or clearly communicates when manual intervention is required.
                    </p>
                    <p className="mt-4">
                      This allows staff to move quickly when creating reservations while still retaining full control when needed.
                    </p>
                  </div>
                  <div className="mt-7 flex w-full flex-col items-center">
                    <Image
                      src={`${basePath}/tableassignstate.svg`}
                      alt="State diagram showing how reservations move between assigned, cannot assign, and manual handling."
                      width={1440}
                      height={900}
                      className="h-auto w-full max-w-[720px]"
                      unoptimized
                    />
                    <p
                      className="mt-3 max-w-[720px] text-[13px] text-mid-gray"
                      style={{ lineHeight: 1.6 }}
                    >
                      The system evaluates table availability once date, time, and party size are provided. When a suitable table is found, the reservation is assigned automatically. If no suitable table can be found, the system prompts staff to assign a table manually.
                    </p>
                  </div>
                  <div className="mt-10">
                    <p
                      className="mb-1 text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-plex-mono), monospace" }}
                    >
                      Operational Impact
                    </p>
                    <p>
                      The system reduces the need for manual seat planning during reservation creation and editing.
                    </p>
                    <p className="mt-4">
                      Instead of scanning the floor for available tables, staff receive immediate placement suggestions while still being able to override the system when operational judgment is required.
                    </p>
                    <p className="mt-4">
                      This balances speed with flexibility in environments where real-world conditions often change.
                    </p>
                    <div className="mt-8 flex w-full flex-col items-center">
                      <Image
                        src={`${basePath}/manualoverride.webp`}
                        alt="Illustration of how staff can manually override auto-assigned tables when needed."
                        width={1440}
                        height={900}
                        className="h-auto w-full max-w-[540px]"
                        unoptimized
                      />
                      <p
                        className="mt-3 max-w-[540px] text-[13px] text-mid-gray"
                        style={{ lineHeight: 1.6 }}
                      >
                        Staff can manually assign a table when operational judgment is required.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                SECTION_CONTENT[section.id]?.map((block, i) => {
                  if (typeof block === "string") {
                    const paragraphs = block.split(/\n{2,}/);

                    // Special formatting for the Strategy section (my-role)
                    const isStrategy = section.id === "my-role";
                    const strategyLabels = [
                      "01 — Define When Automation Runs",
                      "02 — Preserve Stability Before Reallocation",
                      "03 — Encode Capacity Efficiency as a Rule",
                      "04 — Design Clear System States",
                      "05 — Enable Intentional Overrides",
                    ] as const;

                    // Strategy pillars now live in the grid; hide the numbered text blocks
                    if (isStrategy && i > 0) {
                      return null;
                    }

                    return (
                      <div key={i} className={i > 0 ? "mt-6" : undefined}>
                        {paragraphs.map((para, idx) => {
                          const trimmed = para.trim();
                          const isTimingParagraph =
                            section.id === "context" &&
                            trimmed.startsWith(
                              "Restaurants typically define a standard dining duration",
                            );
                          const isAutomationSpectrumIntro =
                            section.id === "the-inflection-point" &&
                            trimmed ===
                              "However, full automation introduced a different risk: rigidity.";

                          return (
                            <div key={idx} className={idx > 0 ? "mt-4" : undefined}>
                              {isTimingParagraph && (
                                <div className="mb-6 flex w-full justify-center">
                                  <div
                                    className="overflow-hidden rounded-sm bg-white"
                                    style={{
                                      maxWidth: 560,
                                      aspectRatio: "16/10",
                                      maxHeight: 320,
                                      minHeight: 220,
                                      borderRadius: "0.125rem",
                                    }}
                                  >
                                    <Image
                                      src={`${basePath}/autotablestory.png`}
                                      alt="Host managing reservations under time pressure with guests waiting"
                                      width={1600}
                                      height={1067}
                                      className="h-full w-full object-contain"
                                      unoptimized
                                    />
                                  </div>
                                </div>
                              )}
                              <p>{trimmed}</p>
                              {isAutomationSpectrumIntro && <AutomationSpectrumDiagram />}
                            </div>
                          );
                        })}
                        {section.id === "my-role" && i === 0 && (
                          <>
                            <StrategyPillarGrid />
                            <AutoAssignmentFlowDiagram />
                          </>
                        )}
                      </div>
                    );
                  }
                  return (
                    <ul key={i} className="mt-6 list-disc pl-6 space-y-2">
                      {block.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                })
              )}
            </div>
          </section>
        </RevealSection>
      ))}
    </article>
  );
}

