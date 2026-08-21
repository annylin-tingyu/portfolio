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
    "The goal wasn't automation. It was a system staff could trust. Predictable enough that they'd rely on it during peak hours. Explainable enough that when it failed, they'd know why. Flexible enough that when they disagreed with it, they could act.\n\nThree rules shaped everything that followed.",
  ],
  outcome: [
    "After rollout, hosts reported feeling less rushed during peak periods, and managers saw fewer sections running consistently behind.\n\nThe system didn’t replace judgment; it absorbed the repetitive decision-making so people could focus on exceptions and hospitality.",
  ],
  "what-i-learned": [
    "The biggest reframe wasn’t a design decision. It was understanding what the override was actually for.\n\nGoing in, I thought of override as a safety net. A way for staff to correct the system when it got something wrong. But the cases where staff actually used it weren’t system failures. They were judgment calls the system had no visibility into. A walk-in willing to take a shorter dining window, a party of five willing to squeeze into a four-top. The system would turn that business away. The staff member didn’t have to.\n\nThat reframe changed how I thought about the whole feature. The system’s job wasn’t to make decisions. It was to make the right information visible so staff could.\n\nThe other thing this project reinforced: going back to users before building caught edge cases I would have missed at my desk. My first model felt complete until I tested it against how staff actually work. Getting that feedback early, before anything was built, is what changed the direction.\n\nOne thing I’d do differently: this shipped without usage instrumentation, so I can’t point to how often staff override or how many assignments resolve cleanly. Next time I’d build those signals in from the start, so the model could be validated against real behavior, not just my read of it.",
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
      title: "Assign automatically once the inputs are complete",
      body: "Date, time, and party size are all required before the system attempts an assignment. Each input is load-bearing. Without all three, the system is guessing, and a guess in a live dining room creates exactly the kind of error automation was meant to prevent.",
    },
    {
      label: "Rule 02",
      title: "Match each party to the right-sized table",
      body: "The system prioritizes exact capacity match first, then smallest sufficient capacity. Seating two guests at a six-top leaves revenue on the floor. When no ideal match exists, the system flags the mismatch so staff can make an informed call rather than an accidental one.",
    },
    {
      label: "Rule 03",
      title: "Explain every outcome, including failure",
      body: "When the system cannot assign, it communicates why. Assigned, cannot assign with explanation, or manual required. A failure without context is noise. A failure with context is a handoff.",
    },
  ];

  return (
    <div className="mt-12 grid w-full grid-cols-1 gap-8" style={{ maxWidth: "100%" }}>
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
        aria-label="Auto-assignment evaluation flow. Reservation details are entered and checked for completeness, then the system checks table availability. If a table can be assigned, it is assigned automatically. If not, the system shows no available table and hands off to staff, who review the floor and either assign a table manually while the system flags the risk, or inform the customer when no table can be found."
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
            src={`${basePath}/table_assign_flow.png`}
            alt="Auto-assignment evaluation flow. Reservation details entered, then a check for complete inputs, then table availability. If a table can be assigned the system assigns it automatically. If not, it shows no available table and hands off to staff, who review the floor and either assign a table manually while the system flags the risk, or inform the customer when no table can be found."
            width={5080}
            height={2066}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </figure>
    </section>
  );
}

function StateModelDiagram() {
  const label = "#3a3a3a";
  const faint = "rgba(0,0,0,0.3)";
  const mono = "var(--font-inter), system-ui, sans-serif";
  // tier colours echo the Outcome board (available / upcoming / occupied)
  const states = [
    { name: "Available", cx: 52, color: "#4bbf87" },
    { name: "Upcoming", cx: 150, color: "#e0a23c" },
    { name: "Occupied", cx: 248, color: "#98a2ad" },
  ];
  const r = 30;

  return (
    <figure
      className="w-full"
      aria-label="The state model changed from a single 'available' state to three: available, upcoming, and occupied."
    >
      <svg viewBox="0 0 300 250" role="img" className="h-auto w-full" style={{ maxWidth: 300 }}>
        <defs>
          <marker id="sm-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={faint} />
          </marker>
        </defs>

        {/* Before: the single naive state (dashed = incomplete) */}
        <circle cx={150} cy={36} r={r} fill="none" stroke={faint} strokeWidth={1.5} strokeDasharray="4 5" />
        <text x={150} y={82} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600} fill={label} fontFamily={mono}>
          Available
        </text>

        {/* Arrow down */}
        <line x1={150} y1={100} x2={150} y2={138} stroke={faint} strokeWidth={2} markerEnd="url(#sm-arrow)" />

        {/* After: three honest states, labels below each */}
        {states.map((s) => (
          <g key={s.name}>
            <circle cx={s.cx} cy={176} r={r} fill={s.color} fillOpacity={0.07} stroke={s.color} strokeWidth={2} />
            <text x={s.cx} y={224} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600} fill={label} fontFamily={mono}>
              {s.name}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

function AlertComparisonDiagram() {
  const amber = "#e0a23c";
  const amberText = "#b97e28";
  const label = "#3a3a3a";
  const faint = "rgba(0,0,0,0.3)";
  const mono = "var(--font-inter), system-ui, sans-serif";

  // one warning bar; showX renders the dismiss control
  function Bar(y: number, showX: boolean) {
    return (
      <>
        <rect x={8} y={y} width={284} height={46} rx={11} fill={amber} fillOpacity={0.09} stroke={amber} strokeWidth={2} />
        <path d={`M32 ${y + 14} L43 ${y + 33} L21 ${y + 33} Z`} fill="none" stroke={amberText} strokeWidth={1.8} strokeLinejoin="round" />
        <line x1={32} y1={y + 21} x2={32} y2={y + 27} stroke={amberText} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={32} cy={y + 30.5} r={1.1} fill={amberText} />
        <text x={58} y={y + 24} dominantBaseline="central" fontSize={13} fontWeight={600} fill={amberText} fontFamily={mono}>
          Reserved 7:00 PM
        </text>
        {showX && (
          <text x={272} y={y + 23} textAnchor="middle" dominantBaseline="central" fontSize={17} fill={faint} fontFamily={mono}>
            &times;
          </text>
        )}
      </>
    );
  }

  return (
    <figure
      className="w-full"
      aria-label="The conflict warning changed from a dismissible alert with a close button to a persistent state that cannot be dismissed."
    >
      <svg viewBox="0 0 300 250" role="img" className="h-auto w-full" style={{ maxWidth: 300 }}>
        <defs>
          <marker id="ac-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={faint} />
          </marker>
        </defs>
        {Bar(8, true)}
        <text x={150} y={76} textAnchor="middle" fontSize={12} fontWeight={600} fill={label} fontFamily={mono}>Dismissible</text>
        <line x1={150} y1={94} x2={150} y2={130} stroke={faint} strokeWidth={2} markerEnd="url(#ac-arrow)" />
        {Bar(150, false)}
        <text x={150} y={218} textAnchor="middle" fontSize={12} fontWeight={600} fill={label} fontFamily={mono}>Persistent</text>
      </svg>
    </figure>
  );
}

const SECTIONS: { id: string; title: string }[] = [
  { id: "context", title: "Long Story Short" },
  { id: "the-inflection-point", title: "Automate the Predictable, Protect the Rest" },
  { id: "early-design", title: "Making the System Match Reality" },
  { id: "my-role", title: "Strategy" },
  { id: "outcome", title: "How the System Behaves" },
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
                      "I designed the auto-assignment rules, state model, and override flow for a staff-facing reservation system used by 30+ restaurants.",
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
                    The hard part was the gap between what the system believed about a table and what was actually true on the floor.
                  </p>
                  <p className="font-semibold" style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
                    If staff were going to make the calls the system couldn't, they needed the full picture. Two decisions closed the gap.
                  </p>

                  {/* Decision cards */}
                  <div className="grid grid-cols-1 gap-16" style={{ marginBottom: "clamp(56px, 8vw, 88px)" }}>
                    <div style={{ borderTop: "3px solid var(--accent)", paddingTop: "24px" }}>
                      <p
                        className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: "var(--accent)", fontFamily: "var(--font-plex-mono), monospace" }}
                      >
                        Decision 01
                      </p>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_7fr] md:items-start md:gap-10">
                        <div className="md:pt-1">
                          <StateModelDiagram />
                        </div>
                        <div>
                          <h3
                            className="font-semibold"
                            style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", lineHeight: 1.35, marginBottom: "14px", color: "var(--accent)" }}
                          >
                            Why &quot;available&quot; isn&apos;t enough
                          </h3>
                          <p style={{ color: "var(--mid-gray)", lineHeight: 1.75 }}>
                            Research with five operators showed that a flat "available" hid too much. It only marked a table free if it could seat a full two-hour party, missing the real cases: a party that leaves early with no one updating the floor, or a guest willing to finish before the next reservation. The state had to show what was true right now, not just whether a table looked free.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: "3px solid var(--accent)", paddingTop: "24px" }}>
                      <p
                        className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: "var(--accent)", fontFamily: "var(--font-plex-mono), monospace" }}
                      >
                        Decision 02
                      </p>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_7fr] md:items-start md:gap-10">
                        <div className="md:pt-1">
                          <AlertComparisonDiagram />
                        </div>
                        <div>
                          <h3
                            className="font-semibold"
                            style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", lineHeight: 1.35, marginBottom: "14px", color: "var(--accent)" }}
                          >
                            The X that hid the problem
                          </h3>
                          <p style={{ color: "var(--mid-gray)", lineHeight: 1.75 }}>
                            My first design let staff dismiss a conflict warning with an X, and they did, on reflex, without reading it. Three reports and a few overbookings later, I made the alert un-dismissable: a persistent state that clears only when the conflict is actually resolved, so the risk stays in front of staff.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </>
              ) : section.id === "outcome" ? (
                <>
                  <div className="w-full">
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

