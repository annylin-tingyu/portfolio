import { AIEventHero } from "@/components/AIEventHero";
import { BeforeAfterFlow, KeyInsightCallout } from "@/components/AiEventCaseStudyEmbeds";
import {
  CreateManuallyCard,
  CreateWithMeCard,
  SurpriseMeCard,
} from "@/components/SolutionCards";
import { ThreePathsDiagram } from "@/components/ThreePathsDiagram";
import { RevealSection } from "@/components/RevealSection";

const contentMax = "clamp(720px, 88vw, 880px)";
const sectionGap = "clamp(72px, 10vw, 110px)";
const headingToBody = "clamp(12px, 1.5vw, 18px)";

type SectionBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metrics"; items: { label: string; value: string }[] }
  | { type: "numbered"; items: { label: string; body: string }[] }
  | { type: "before-after-flow" }
  | { type: "key-insight-callout" }
  | { type: "three-paths-diagram" }
  | { type: "surprise-me-card" }
  | { type: "create-with-me-card" }
  | { type: "create-manually-card" };

const SECTIONS: { id: string; title: string }[] = [
  { id: "problem", title: "Problem" },
  { id: "friction-points", title: "Friction Points" },
  { id: "key-insight", title: "Key Insight" },
  { id: "solution", title: "Solution" },
  { id: "metrics", title: "Metrics" },
  { id: "design-decisions", title: "Design Decisions" },
  { id: "outcome", title: "Outcome" },
  { id: "what-i-learned", title: "What I Learned" },
];

const SECTION_CONTENT: Record<string, SectionBlock[]> = {
  problem: [
    {
      type: "p",
      text:
        "Owting helps people coordinate real-world activities together. But when someone wanted to turn a group conversation into an actual plan, they had to leave the chat, navigate to a separate creation page, fill in all the details manually, and then return to share it with the group.\n\nSix steps across multiple screens, for what should have been a single moment of spontaneity.",
    },
  ],
  "friction-points": [
    {
      type: "numbered",
      items: [
        {
          label: "01 — Disconnected entry point",
          body: "The intent to plan lived in the chat. The tools to act on it were somewhere else entirely.",
        },
        {
          label: "02 — Context loss",
          body: "Leaving the conversation broke the group's momentum. By the time the host returned with an event, the energy had moved on.",
        },
        {
          label: "03 — No starting point for undecided hosts",
          body:
            'The original creation page offered no guidance. A host with only a vague idea: "let\'s do something this weekend", had nowhere to start. The blank form required decisions before the host was ready to make them.',
        },
        {
          label: "04 — Planning overhead",
          body: "One plan, multiple screens, too many decisions. Coordinating required navigating different sections of the app for what should have been a single flow.",
        },
      ],
    },
    { type: "before-after-flow" },
  ],
  "key-insight": [{ type: "key-insight-callout" }],
  solution: [
    {
      type: "p",
      text:
        "The creation flow was redesigned and moved entirely into the chat. When a host is ready to plan, Ollie, Owting's character, appears inline within the conversation with three paths forward:",
    },
    { type: "three-paths-diagram" },
    { type: "surprise-me-card" },
    { type: "create-with-me-card" },
    { type: "create-manually-card" },
    {
      type: "p",
      text:
        "All three paths end in the same place: event created and shared within the chat, without the host ever navigating away.",
    },
  ],
  metrics: [
    {
      type: "metrics",
      items: [
        { value: "30% fewer", label: "steps to plan an outing" },
        { value: "40% reduction", label: "in app switching during event planning" },
        { value: "2× faster", label: "time to first event suggestion" },
      ],
    },
  ],
  "design-decisions": [
    {
      type: "numbered",
      items: [
        {
          label: "01 — The conversation is the product",
          body:
            "Moving creation inline wasn't a feature addition, it was a reframing of where the product lives. The chat is where group intent forms. Keeping creation there meant zero context switching and no momentum loss.",
        },
        {
          label: "02 — Three paths, three levels of readiness",
          body:
            "Not every host arrives with the same amount of information. Surprise Me, Create With Me, and Create Manually each meet a different starting point, so undecided hosts have somewhere to begin, and decisive hosts aren't slowed down.",
        },
        {
          label: "03 — Reducing steps isn't the goal, reducing the moment of hesitation is",
          body:
            'The original flow had six steps. The redesign compressed creation to a single screen. But the more important reduction was eliminating the moment where a host thinks "this is too much effort" and drops off. Every design decision was made against that moment.',
        },
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text:
        "Reduced event creation from 6 steps across multiple screens to a single in-chat interaction, eliminating the need to leave the conversation at any point in the planning flow.",
    },
  ],
  "what-i-learned": [
    {
      type: "p",
      text:
        "Working on this project changed how I think about AI as a design material.\n\nIt's easy to treat AI as a feature and think as it something you add to make a product feel modern. What became more important here was asking what the AI should actually do for the user at the right moment. Surprise Me and Create With Me aren't just two modes, they're two different answers to the question of how much the user wants to decide right now.\n\nThe bigger lesson was about conversation as a design surface. Most creation flows assume users are ready to leave their context and focus on a task. This project made clear that the best interaction is often the one that doesn't interrupt what the user is already doing.\n\nKeeping the planning inside the chat wasn't a technical constraint, it was the design decision that everything else followed from.",
    },
  ],
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-6 rounded-2xl border px-6 py-6 sm:px-8"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
    >
      <p
        className="text-[12px] font-semibold uppercase tracking-[0.12em]"
        style={{
          color: "rgba(0,0,0,0.55)",
          fontFamily: "var(--font-plex-mono), monospace",
        }}
      >
        {title}
      </p>
      <div className="mt-4 text-[15px]" style={{ color: "rgba(0,0,0,0.88)", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

type AiEventCaseStudyLayoutProps = {
  category: string;
  title: string;
  description: string;
};

export function AiEventCaseStudyLayout({
  category,
  title,
  description,
}: AiEventCaseStudyLayoutProps) {
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

        <div className="relative pt-[34px]">
          <AIEventHero />
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
              marginBottom: sectionGap,
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
              {(SECTION_CONTENT[section.id] ?? []).map((block, i) => {
                if (block.type === "p") {
                  return (
                    <div key={i} className={i > 0 ? "mt-6" : undefined}>
                      {block.text.split(/\n{2,}/).map((para, idx) => (
                        <p key={idx} className={idx > 0 ? "mt-4" : undefined} style={{ whiteSpace: "pre-line" }}>
                          {para.trim()}
                        </p>
                      ))}
                    </div>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={i} className="mt-6 list-disc pl-6 space-y-2">
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "metrics") {
                  return (
                    <div key={i} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {block.items.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-2xl border bg-white px-5 py-5"
                          style={{ borderColor: "rgba(0,0,0,0.08)" }}
                        >
                          <p
                            className="text-[11px] uppercase tracking-[0.16em]"
                            style={{
                              color: "rgba(0,0,0,0.55)",
                              fontFamily: "var(--font-plex-mono), monospace",
                            }}
                          >
                            {m.label}
                          </p>
                          <p className="mt-2 text-[20px] font-semibold" style={{ color: "rgba(0,0,0,0.9)" }}>
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (block.type === "numbered") {
                  return (
                    <div key={i}>
                      {block.items.map((it, idx) => (
                        <Card key={it.label} title={it.label}>
                          <p className={idx > 0 ? "mt-0" : undefined}>{it.body}</p>
                        </Card>
                      ))}
                    </div>
                  );
                }

                if (block.type === "before-after-flow") {
                  return <BeforeAfterFlow key={i} />;
                }

                if (block.type === "key-insight-callout") {
                  return <KeyInsightCallout key={i} />;
                }

                if (block.type === "three-paths-diagram") {
                  return <ThreePathsDiagram key={i} />;
                }

                if (block.type === "surprise-me-card") {
                  return <SurpriseMeCard key={i} />;
                }

                if (block.type === "create-with-me-card") {
                  return <CreateWithMeCard key={i} />;
                }

                if (block.type === "create-manually-card") {
                  return <CreateManuallyCard key={i} />;
                }

                return null;
              })}
            </div>
          </section>
        </RevealSection>
      ))}
    </article>
  );
}

