import Image from "next/image";
import { PrototypeFrame } from "@/components/PrototypeFrame";
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

const SECTION_CONTENT: Record<string, (string | { list: string[] })[]> = {
  "the-inflection-point": [
    "One operator framed it directly:",
    "\"On-site coordination still needs to be manual.\"",
    "The obvious solution was full automation. Feed in party size, date, and time, the system assigns a table. No manual scanning, no guesswork, no mistakes from a staff member handling three things at once. That's what the product instinct pushed toward.",
    "But restaurants don't operate in perfect blocks. Consider a walk-in during peak hours. The system scans availability and returns nothing. Every open slot conflicts with an upcoming reservation within the standard two-hour dining window. From the system's perspective, the restaurant is full. But a staff member can see something the system can't: this walk-in is willing to finish in an hour. That table is available if both parties agree. A rigid system turns that revenue away. A staff member doesn't have to.",
    "Full automation handles the predictable cases cleanly and fails silently on everything else. I designed toward a different model: the system evaluates what it can verify. Staff handle what happens in conversation, not in a database.",
    "That's not a limitation to design around. It's the constraint that defined the system.",
  ],
  "my-role": [
    "The goal wasn't automation. It was a system staff could trust. Predictable enough that they'd rely on it during peak hours. Explainable enough that when it failed, they'd know why. Flexible enough that when they disagreed with it, they could act.",
    "My responsibility was defining the interaction model and state transitions: what the system should evaluate, when it should react, and how outcomes are communicated to staff. Four rules shaped everything that followed.",
  ],
  outcome: [
    "After rollout, hosts reported feeling less rushed during peak periods, and managers saw fewer sections running consistently behind.\n\nThe system didn’t replace judgment; it absorbed the repetitive decision-making so people could focus on exceptions and hospitality.",
  ],
  "what-i-learned": [
    "The biggest reframe wasn’t a design decision. It was understanding what the override was actually for.\n\nGoing in, I thought of override as a safety net. A way for staff to correct the system when it got something wrong. But the cases where staff actually used it weren’t system failures. They were judgment calls the system had no visibility into. A walk-in willing to take a shorter dining window, a party of five willing to squeeze into a four-top. The system would turn that business away. The staff member didn’t have to.\n\nThat reframe changed how I thought about the whole feature. The system’s job wasn’t to make decisions. It was to make the right information visible so staff could.\n\nThe other thing this project reinforced: going back to users before building caught edge cases I would have missed at my desk. My first model felt complete until I tested it against how staff actually work. Getting that feedback early, before anything was built, is what changed the direction.",
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
          style={{ borderColor: "rgba(168,95,62,0.12)", borderRadius: 16, minWidth: 0 }}
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
          style={{ borderColor: "rgba(168,95,62,0.12)", borderRadius: 16, minWidth: 0 }}
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

const cardBorder = "rgba(168,95,62,0.12)";
const cardRadius = 16;

function StrategyPillarGrid() {
  const rules = [
    {
      label: "Rule 01",
      title: "Only run when the information is complete",
      body: "Date, time, and party size are all required before the system attempts an assignment. Each input is load-bearing. Without all three, the system is guessing, and a guess in a live dining room creates exactly the kind of error automation was meant to prevent.",
    },
    {
      label: "Rule 02",
      title: "Preserve continuity before optimizing",
      body: "When party size increases, the system first checks whether adjacent tables can be merged before searching for a new placement. A party growing from four to six doesn't necessarily want to move. Stability comes before efficiency.",
    },
    {
      label: "Rule 03",
      title: "Every table should earn its space",
      body: "The system prioritizes exact capacity match first, then smallest sufficient capacity. Seating two guests at a six-top leaves revenue on the floor. When no ideal match exists, the system flags the mismatch so staff can make an informed call rather than an accidental one.",
    },
    {
      label: "Rule 04",
      title: "Never fail silently",
      body: "When the system cannot assign, it communicates why. Assigned, cannot assign with explanation, or manual required. A failure without context is noise. A failure with context is a handoff.",
    },
  ];

  return (
    <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2" style={{ maxWidth: "100%" }}>
      {rules.map((rule) => (
        <div
          key={rule.label}
          className="rounded-2xl border p-6 sm:p-8"
          style={{ borderColor: cardBorder, borderRadius: cardRadius }}
        >
          <p
            className="mb-2 text-[11px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-plex-mono), monospace" }}
          >
            {rule.label}
          </p>
          <h3 className="font-semibold" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)", color: "var(--accent)" }}>
            {rule.title}
          </h3>
          <p className="mt-4 text-[15px]" style={{ color: "rgba(0,0,0,0.75)", lineHeight: 1.6 }}>
            {rule.body}
          </p>
        </div>
      ))}
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
  { id: "context", title: "Long Story Short" },
  { id: "the-inflection-point", title: "Automate the Predictable, Protect the Rest" },
  { id: "early-design", title: "Where the Design Got Pressure-Tested" },
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
      <CaseStudyHeader
        category={category}
        title={title}
        description={description}
        bottomGap="clamp(56px, 8vw, 80px)"
        showDivider={false}
        media={
          <div className="pt-[40px] w-full">
            <PrototypeFrame
              src={`${basePath}/prototypes/hero-demo-loop.html`}
              title="Table assignment product demo"
              initialHeight={656}
              style={{ maxWidth: 1080, marginLeft: "auto", marginRight: "auto", pointerEvents: "none" }}
            />
          </div>
        }
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
            {section.id === "my-role" ? (
              <h2
                className="font-bold"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--accent)" }}
              >
                I designed the rules before I{" "}
                <em style={{ fontStyle: "italic" }}>designed</em>{" "}
                the screens.
              </h2>
            ) : (
              <h2
                className="font-semibold"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.875rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  color: "var(--accent)",
                }}
              >
                {section.title}
              </h2>
            )}
            <div
              className="text-black"
              style={{
                marginTop: headingToBody,
                fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                lineHeight: 1.6,
              }}
            >
              {section.id === "context" ? (
                <>
                  {/* Opening scene */}
                  <p className="mt-4">
                    Independent restaurants run lean. During peak hours, the same staff member greeting guests at the door is also scanning the floor for open tables, checking reservation times, and making split-second seating decisions. Manual table assignment in that environment regularly led to overbooking, poor gap utilization, and missed revenue.
                  </p>

                  {/* Illustration */}
                  <div className="mb-6 mt-8 flex w-full justify-center">
                    <div className="overflow-hidden rounded-sm bg-white" style={{ maxWidth: 560, aspectRatio: "16/10", maxHeight: 320, minHeight: 220, borderRadius: "0.125rem" }}>
                      <Image
                        src={`${basePath}/autotablestory.webp`}
                        alt="A restaurant host managing reservations under pressure while guests wait to be seated"
                        width={1600}
                        height={1000}
                        className="h-full w-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Summary line */}
                  <p className="mt-6 font-semibold">
                    I designed an automatic table assignment system to help staff move faster without losing the flexibility real service requires.
                  </p>

                  {/* Role cards */}
                  <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3" style={{ marginBottom: "clamp(56px, 8vw, 88px)" }}>
                    {[
                      "I designed the auto-assignment logic, state model, and override flow for a staff-facing reservation system used by 30+ restaurants.",
                      "I ran research with restaurant operators to understand where automation earns trust and where human judgment has to take over.",
                      "I collaborated with the PM through multiple rounds of review, pressure-testing edge cases before anything shipped.",
                    ].map((text, i) => (
                      <div key={i} className="relative overflow-hidden" style={{ borderTop: "3px solid var(--accent)", paddingTop: "40px" }}>
                        <span
                          className="pointer-events-none absolute"
                          aria-hidden
                          style={{ top: "-6px", right: "4px", fontSize: "88px", fontWeight: 700, lineHeight: 1, color: "rgba(0,0,0,0.08)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="relative" style={{ lineHeight: 1.6 }}>{text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quotes */}
                  <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
                    <p className="text-mid-gray" style={{ marginBottom: "8px", lineHeight: 1.7 }}>
                      One restaurant manager put it plainly during early research:
                    </p>
                    <blockquote className="mb-8 border-l-[3px] pl-6" style={{ borderColor: "var(--accent)" }}>
                      <p className="font-medium italic" style={{ fontSize: "clamp(1.0625rem, 1.75vw, 1.25rem)", lineHeight: 1.5 }}>
                        "If there are enough open tables, just assign it automatically. That's already a big improvement."
                      </p>
                    </blockquote>

                    <p className="text-mid-gray" style={{ marginBottom: "8px", lineHeight: 1.7 }}>
                      But in the same conversation, the other half of the problem surfaced:
                    </p>
                    <blockquote className="border-l-[3px] pl-6" style={{ borderColor: "var(--accent)" }}>
                      <p className="font-medium italic" style={{ fontSize: "clamp(1.0625rem, 1.75vw, 1.25rem)", lineHeight: 1.5 }}>
                        "On-site coordination still needs to be manual."
                      </p>
                    </blockquote>
                  </div>

                  {/* Closing statement */}
                  <p className="text-center italic text-mid-gray" style={{ fontSize: "clamp(1.0625rem, 1.75vw, 1.25rem)", lineHeight: 1.6 }}>
                    That distinction became the foundation of everything that followed.
                  </p>
                </>
              ) : section.id === "the-inflection-point" ? (
                <>
                  {/* Body paragraphs */}
                  <p className="mt-4">
                    The obvious solution was full automation. Feed in party size, date, and time, the system assigns a table. No manual scanning, no guesswork, no mistakes from a staff member handling three things at once. That's what the product instinct pushed toward.
                  </p>
                  <p className="mt-4">
                    But restaurants don't operate in perfect blocks. Consider a walk-in during peak hours. The system scans availability and returns nothing. Every open slot conflicts with an upcoming reservation within the standard two-hour dining window. From the system's perspective, the restaurant is full. But a staff member can see something the system can't: this walk-in is willing to finish in an hour. That table is available if both parties agree. A rigid system turns that revenue away. A staff member doesn't have to.
                  </p>
                  <p className="mt-4">
                    Full automation handles the predictable cases cleanly and fails silently on everything else. I designed toward a different model: the system evaluates what it can verify. Staff handle what happens in conversation, not in a database.
                  </p>

                  <p className="mt-8" style={{ lineHeight: 1.6 }}>
                    That's not a limitation to design around. It's the constraint that defined the system.
                  </p>
                </>
              ) : section.id === "early-design" ? (
                <>
                  {/* Intro */}
                  <p style={{ marginBottom: "20px" }}>
                    A restaurant running on faulty table information doesn't just slow down service. It creates double-booked tables, staff making assignment decisions without the full picture, and a system that looks functional while quietly producing conflicts. The design had to account for those operational failures, not just in the happy path, but in the moments where the system's view of availability and reality stopped matching.
                  </p>
                  <p className="font-semibold" style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
                    If staff were going to make the calls the system couldn't, the system had to give them the full picture. Two decisions followed.
                  </p>

                  {/* Decision cards */}
                  <div className="grid grid-cols-1 gap-12 md:grid-cols-2" style={{ marginBottom: "clamp(56px, 8vw, 88px)" }}>
                    <div style={{ borderTop: "3px solid var(--accent)", paddingTop: "24px" }}>
                      <p
                        className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: "var(--accent)", fontFamily: "var(--font-plex-mono), monospace" }}
                      >
                        Decision 01
                      </p>
                      <h3
                        className="font-semibold"
                        style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", lineHeight: 1.35, marginBottom: "14px", color: "var(--accent)" }}
                      >
                        What "upcoming" needed to say
                      </h3>
                      <p style={{ color: "var(--mid-gray)", lineHeight: 1.75 }}>
                        That operator's point, that on-site coordination still needs to be manual, stuck with me: if staff make the call, the system owes them the full picture. My early design showed a table that was open now but reserved in 45 minutes as simply "available," so staff would seat a walk-in and the conflict only surfaced when both parties arrived. I made "upcoming" carry a specific arrival time, so the system stopped answering "is this table free" and started answering "what is true about this table right now."
                      </p>
                    </div>

                    <div style={{ borderTop: "3px solid var(--accent)", paddingTop: "24px" }}>
                      <p
                        className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: "var(--accent)", fontFamily: "var(--font-plex-mono), monospace" }}
                      >
                        Decision 02
                      </p>
                      <h3
                        className="font-semibold"
                        style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", lineHeight: 1.35, marginBottom: "14px", color: "var(--accent)" }}
                      >
                        The X that hid the problem
                      </h3>
                      <p style={{ color: "var(--mid-gray)", lineHeight: 1.75 }}>
                        My first version let staff dismiss a conflict warning with an X. Testing it against real scenarios, I saw the problem: dismissing didn't resolve the conflict, it just hid it. So I reframed what the alert should be. Instead of a dismissible warning, it became a persistent system state that clears only when the conflict is actually resolved. If staff override intentionally, the alert stays. The risk they accepted stays in front of them.
                      </p>
                    </div>
                  </div>

                  {/* Pull quote */}
                  <div className="mx-auto text-center" style={{ maxWidth: "720px", padding: "8px 0" }}>
                    <div
                      className="mx-auto mb-8"
                      style={{ width: "40px", height: "3px", background: "var(--accent)" }}
                      aria-hidden
                    />
                    <p
                      className="font-medium"
                      style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", lineHeight: 1.45, letterSpacing: "-0.005em", color: "var(--accent)" }}
                    >
                      Both decisions came from the same principle: the interface should reflect what's actually true about the system, not give staff a way to move past something that hasn't been resolved.
                    </p>
                  </div>
                </>
              ) : section.id === "outcome" ? (
                <>
                  <div>
                    <p
                      className="mb-1 text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-plex-mono), monospace" }}
                    >
                      How It Runs in Practice
                    </p>
                    <p>
                      Staff open a reservation, confirm the party size, date, and time, and the system assigns a table. No floor scanning, no mental math, no conflicts from a table that looked available but wasn't.
                    </p>
                    <p className="mt-4">
                      When the system can't find a match, it says why and gives staff the option to step in. They see the conflict, make the call, and move on. The whole interaction stays in one place.
                    </p>
                    <p className="mt-4">
                      What changed: staff move faster on the straightforward cases and have the information they need to handle the ones that aren't.
                    </p>
                  </div>
                  <div className="mt-7 w-full">
                    <PrototypeFrame
                      src={`${basePath}/prototypes/outcome-states.html`}
                      title="Table assignment result states"
                      initialHeight={1560}
                    />
                  </div>
                </>
              ) : (
                SECTION_CONTENT[section.id]?.map((block, i) => {
                  if (typeof block === "string") {
                    const paragraphs = block.split(/\n{2,}/);

                    return (
                      <div key={i} className={i > 0 ? "mt-6" : undefined}>
                        {paragraphs.map((para, idx) => {
                          const trimmed = para.trim();
                          const isAutomationSpectrumIntro =
                            section.id === "the-inflection-point" &&
                            trimmed ===
                              "Table assignment presented a clear opportunity for automation, but full automation introduced a different risk: rigidity.";

                          const isEarlyDesignStates =
                            section.id === "early-design" &&
                            trimmed.startsWith("The model expanded to four states");

                          return (
                            <div key={idx} className={idx > 0 ? "mt-4" : undefined}>
                              <p>{trimmed}</p>
                              {isAutomationSpectrumIntro && <AutomationSpectrumDiagram />}
                              {isEarlyDesignStates && (
                                <div
                                  className="mt-6 flex w-full items-center justify-center rounded-lg"
                                  style={{
                                    aspectRatio: "16/9",
                                    maxHeight: 360,
                                    backgroundColor: "rgba(0,0,0,0.05)",
                                  }}
                                >
                                  <p
                                    className="text-[13px]"
                                    style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-plex-mono), monospace" }}
                                  >
                                    Image coming soon
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {section.id === "my-role" && i === 0 && (
                          <StrategyPillarGrid />
                        )}
                        {section.id === "my-role" && i === 1 && (
                          <AutoAssignmentFlowDiagram />
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

