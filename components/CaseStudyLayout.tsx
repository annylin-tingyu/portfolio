import Image from "next/image";
import { RevealSection } from "@/components/RevealSection";
import { PlatformShiftDiagram } from "@/components/PlatformShiftDiagram";
import { InflectionPointTimeline } from "@/components/InflectionPointTimeline";
import {
  CaseStudyHeader,
  caseStudyContentMax,
  caseStudySectionGap,
  caseStudyHeadingToBody,
} from "@/components/CaseStudyHeader";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const contentMax = caseStudyContentMax;
const sectionGap = caseStudySectionGap;
const inSectionGap = "clamp(16px, 2vw, 24px)";
const headingToBody = caseStudyHeadingToBody;

/** Paragraph labels for the Inflection Point section only */
const INFLECTION_POINT_LABELS = [
  "01 — The Realization",
  "02 — The Strategic Bet",
  "03 — The Repositioning",
] as const;

/** Paragraph labels for the Strategy (my-role) section */
const MY_ROLE_LABELS = [
  "01 — Design Patterns That Extend Across Verticals",
  "02 — Progressive Setup for Complex Campaign Logic",
  "03 — Real-Time Entitlement Governance Across Locations",
  "04 — Align Refund Responsibility with Offline Fulfillment",
] as const;

/** Section body copy by section id. Use string for paragraphs, { list: string[] } for bullet lists. */
const SECTION_CONTENT: Record<string, (string | { list: string[] })[]> = {
  context: [
    "The product began as a reservation and CRM tool serving beauty businesses. Merchants could offer loyalty bundles (e.g., buy 10 sessions, get 3 free) and stored-value credits, but these were managed largely through offline workflows. Promotions were configured manually, redeemed in person, and tracked by staff.",
    "As the company evaluated its long-term growth strategy, it became clear that a reservation-led model limited revenue expansion. While loyalty features demonstrated clear merchant demand, the value capture remained tied to in-store interactions.",
    "To support a broader monetization ambition and expand across fitness, lifestyle, and retail, the product needed to evolve beyond appointment management. The opportunity was to transform the CRM from an operational tool into a scalable commerce layer, enabling digital distribution, online purchase, and standardized loyalty infrastructure across industries.",
  ],
  "the-inflection-point-marketplace": [
    "Loyalty demand was already validated. Merchants were willing to sell bundles, credits, and prepaid packages. But value capture remained tied to offline workflows. Promotions required staff coordination, fulfillment happened in-store, and revenue was constrained by physical visits.\n\nScaling across industries would multiply this operational complexity.",
    "Instead of expanding loyalty features incrementally, the team chose to introduce a system-led marketplace layer. Promotion creation, payment processing, and redemption would move inside the product not remain dependent on manual distribution.\n\nThis shifted the system from supporting transactions to enabling them.",
    "Marketplace transformed the CRM from a reservation tool into a commerce infrastructure. Digital packages, e-tickets, and campaign-based offers could now be created, sold, and tracked end-to-end, unlocking online revenue and cross-vertical scalability.",
  ],
  "my-role": [
    "The platform expanded from beauty into fitness, lifestyle, and retail. Marketplace needed to support different campaign types without becoming industry-specific.\n\nInstead of designing custom logic for each vertical, we defined flexible product patterns that could adapt across industries.\n\nBundles, subscriptions, and vouchers shared a consistent structural model, allowing businesses with different operational models to use the same underlying system.\n\nThis ensured:\n- Cross-industry scalability\n- Reduced system fragmentation\n- Long-term extensibility\n\nThe goal was not rigid standardization, but reusable structure.",
    "Marketplace needed to support multiple campaign types with different rules and constraints. Some products could be transferred as gifts (e.g., vouchers), while others could not (e.g., stored-value credits). On top of that, promotions included stacked structures like Buy X Get Y with tiered thresholds (Buy 1 → A, Buy 3 → B) and different calculation bases (by order total vs quantity).\n\nThese rules are easy to describe but easy to misconfigure.\n\nInstead of exposing all logic at once, we designed a step-by-step setup flow that let merchants configure one decision at a time and validate outcomes as they went.\n\nKey decisions:",
    {
      list: [
        "Progressive disclosure (one rule per step)",
        "Clear eligibility constraints (e.g., giftable vs non-giftable)",
        '"What you see is what you get" preview to confirm final behavior',
        "Review state before publishing to catch conflicts",
      ],
    },
    "Goal: help operators build correct campaigns confidently, without needing to understand every rule upfront.",
    "Customers could redeem vouchers across multiple store locations. Although the CRM was not directly integrated with POS systems, redemption status updated in real time inside the CRM.\n\nThis required a clear entitlement governance model.\n\nStrategy decisions:",
    {
      list: [
        "Each purchase generated a uniquely tracked entitlement",
        "Redemption state updated instantly within CRM",
        "Entitlements were valid across all eligible store locations",
        "Exportable order reports supported financial reconciliation",
      ],
    },
    "Instead of tightly coupling to POS infrastructure, the system centralized truth within the CRM while allowing operational flexibility at the store level.\n\nThis ensured:",
    {
      list: [
        "Cross-location portability",
        "Real-time visibility",
        "Centralized audit trail",
        "Reduced dependency on external systems",
      ],
    },
    "Marketplace enabled online purchases, but fulfillment occurred in physical locations. This created edge cases such as partial redemption, cross-location usage, and service-based delivery.\n\nAutomating refunds directly inside the platform would introduce accounting complexity and platform-level liability.\n\nInstead of embedding automated refund flows, refund handling remained merchant-managed.\n\nStrategy decisions:",
    {
      list: [
        "Refund requests required direct merchant involvement",
        "No automatic reversal of entitlements without review",
        "Platform maintained transaction record but did not assume financial liability",
      ],
    },
    "This approach:",
    {
      list: [
        "Reduced systemic refund abuse",
        "Prevented accounting inconsistencies across locations",
        "Preserved merchant control over service-based fulfillment",
        "Aligned financial responsibility with the party delivering the service",
      ],
    },
    "The goal was not to block refunds, but to ensure accountability remained aligned with offline operations.",
  ],
  "constraints-that-shaped-the-design": [
    "Several constraints had a direct impact on design decisions:",
    {
      list: [
        "Transactions were irreversible within the system, as in-platform refunds were not supported.",
        "Misconfiguration could result in financial loss or trust issues for merchants and customers.",
        "Customer service teams relied on clear system states to resolve payment-related questions efficiently.",
      ],
    },
    "These constraints required careful attention to transparency, error prevention, and expectation-setting throughout the experience.",
  ],
  "design-strategy": [
    "Rather than relying on warnings or reactive fixes, I focused on preventing problems through structure:",
    {
      list: [
        "Merchant setup flows were designed with guardrails—using defaults, validation, and clear sequencing to reduce misconfiguration.",
        "Monetary information was made explicit in both merchant and customer experiences to ensure shared understanding.",
        "Status communication was designed to minimize ambiguity for customers and reduce investigation work for customer service teams.",
      ],
    },
    "Earlier in the product's evolution, I had worked on a deposit feature to address no-shows in appointment-based services. That experience informed my approach to payment UX, transparency, and trust in Marketplace.",
  ],
  "merchant-setup-guardrails": [
    "Marketplace needed to support different campaign types—bundles, stored-value credits, and subscriptions—without exposing merchants to unnecessary complexity. I designed structured setup flows that guided merchants into safe configurations using defaults and system constraints, rather than relying on warnings after errors occurred.",
  ],
  "customer-purchase-clarity": [
    "On the customer side, I focused on making purchases easy to understand and track. The experience clearly communicated what was purchased, how it could be used, and the current status of remaining value or sessions, reducing confusion and follow-up questions.",
  ],
  "designing-for-irreversible-actions": [
    "Because refunds were not supported in the system, irreversible actions required careful handling. Refund limitations and usage rules were surfaced at key decision points before purchase, setting expectations early and reducing post-transaction disputes.",
  ],
  outcome: [
    "Marketplace became foundational to supporting both cross-vertical expansion and scaling within existing industries.\n\nAs existing clients such as 夏沐妍 (Eartha Nature Skin Care, Taiwan-based multi-location skincare brand) expanded their operations, the structured commerce layer enabled standardized bundles, cross-location redemption, and centralized campaign management across stores.\n\nBeyond beauty, Marketplace expanded the platform into retail and service-based environments, including Cremia (premium soft-serve retail brand) and 勝利加油站 (Victory Gas Station, Taiwan-based fuel retail chain).\n\nThe system supported operators with 15+ locations under unified management, enabling digital purchase, real-time entitlement tracking, and cross-store redemption without POS dependency.\n\nThis shift expanded the platform’s addressable market and repositioned it from a vertical reservation tool to a scalable commerce infrastructure capable of supporting multi-location and multi-industry business models.",
  ],
  "what-i-learned": [
    "This project marked my shift from thinking like a UX designer to thinking like a product designer.\n\nAs a UX designer, I focused on clarity and reducing friction. Through Marketplace, I learned that product decisions must also account for revenue protection, liability, operational reality, and long-term scalability.\n\nA choice like limiting automated refunds may seem counter to conventional UX principles, but in an OMO system tied to real-world service fulfillment, it reflects responsible product governance.\n\nI now approach design by balancing usability with business impact, understanding that interface decisions shape financial and operational outcomes.",
  ],
};

const SECTIONS: { id: string; title: string; dominantVisual?: boolean; supportingVisual?: boolean }[] = [
  { id: "context", title: "Context", supportingVisual: true },
  { id: "the-inflection-point-marketplace", title: "The Inflection Point" },
  { id: "my-role", title: "Strategy", supportingVisual: true },
  { id: "outcome", title: "Outcome", supportingVisual: false },
  { id: "what-i-learned", title: "What I Learned", supportingVisual: false },
];

function TextPlaceholder() {
  return (
    <div className="space-y-2" aria-hidden>
      <div className="h-4 w-full max-w-[100%] rounded-sm bg-light-gray/60" style={{ maxWidth: "85%" }} />
      <div className="h-4 w-full max-w-[95%] rounded-sm bg-light-gray/50" />
      <div className="h-4 w-full max-w-[70%] rounded-sm bg-light-gray/40" />
    </div>
  );
}

function MarketplaceArchitectureDiagram() {
  // Geometry constants (in px) to keep spacing precise and repeatable
  const CORE_WIDTH = 330;
  const CORE_HEIGHT = 190;
  const LABEL_GAP = 120; // distance from core border to label anchor
  const LINE_CLEARANCE = 16; // space between line end and label
  const LINE_LENGTH = LABEL_GAP - LINE_CLEARANCE;
  const LINE_THICKNESS = 1;
  const LINE_COLOR = "#E0E0E0";
  const CORE_BORDER_COLOR = "#E5E5E5";
  // Constrain side labels so long names wrap predictably (e.g., "Service &" / "Experience")
  const SIDE_LABEL_MAX_WIDTH = 96;

  const monoLabelStyle = {
    fontFamily: "var(--font-plex-mono), monospace",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(107, 107, 107, 0.8)",
  };

  const centerCoreStyles = {
    left: "50%",
    top: "50%",
    width: CORE_WIDTH,
    height: CORE_HEIGHT,
    transform: "translate(-50%, -50%)",
  } as const;

  return (
    <div className="flex w-full justify-center">
      <div
        className="relative w-full max-w-[560px]"
        style={{ aspectRatio: "4/3", minHeight: 480 }}
      >
        {/* Core box at intersection of center axes */}
        <div
          className="absolute flex flex-col items-stretch rounded-lg border bg-white px-5 py-4"
          style={{
            ...centerCoreStyles,
            borderColor: CORE_BORDER_COLOR,
            fontFamily: "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <p className="mb-2 text-center text-[11px] font-medium tracking-[0.12em] text-[#6B6B6B] uppercase">
            Marketplace Core
          </p>
          <ul className="mt-1.5 space-y-1.5 text-[13px] text-[#3F3F3F]">
            <li>Product Types (Bundle / Subscription / Voucher)</li>
            <li>Pricing Logic</li>
            <li>Entitlement Model</li>
            <li>Redemption States</li>
          </ul>
        </div>

        {/* Center axes (implicit): connector lines run exactly along these axes */}
        {/* Vertical connectors */}
        <div
          className="absolute"
          style={{
            left: "50%",
            width: LINE_THICKNESS,
            backgroundColor: LINE_COLOR,
            top: `calc(50% - ${CORE_HEIGHT / 2 + LINE_LENGTH}px)`,
            height: LINE_LENGTH,
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "50%",
            width: LINE_THICKNESS,
            backgroundColor: LINE_COLOR,
            top: `calc(50% + ${CORE_HEIGHT / 2}px)`,
            height: LINE_LENGTH,
            transform: "translateX(-50%)",
          }}
        />

        {/* Horizontal connectors */}
        <div
          className="absolute"
          style={{
            top: "50%",
            height: LINE_THICKNESS,
            backgroundColor: LINE_COLOR,
            left: `calc(50% - ${CORE_WIDTH / 2 + LINE_LENGTH}px)`,
            width: LINE_LENGTH,
            transform: "translateY(-50%)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "50%",
            height: LINE_THICKNESS,
            backgroundColor: LINE_COLOR,
            left: `calc(50% + ${CORE_WIDTH / 2}px)`,
            width: LINE_LENGTH,
            transform: "translateY(-50%)",
          }}
        />

        {/* Vertical labels — placed so gap to connector equals LINE_CLEARANCE */}
        <span
          className="absolute"
          style={{
            ...monoLabelStyle,
            top: `calc(50% - ${CORE_HEIGHT / 2 + LINE_LENGTH + LINE_CLEARANCE}px)`,
            left: "50%",
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          Beauty
        </span>
        <span
          className="absolute block text-left"
          style={{
            ...monoLabelStyle,
            top: "50%",
            left: `calc(50% + ${CORE_WIDTH / 2 + LABEL_GAP}px)`,
            transform: "translateY(-50%)",
            maxWidth: SIDE_LABEL_MAX_WIDTH,
            whiteSpace: "normal",
            lineHeight: 1.15,
          }}
        >
          Fitness
        </span>
        <span
          className="absolute block text-center"
          style={{
            ...monoLabelStyle,
            top: "50%",
            left: `calc(50% - ${CORE_WIDTH / 2 + LABEL_GAP}px)`,
            transform: "translate(-100%, -50%)",
            maxWidth: SIDE_LABEL_MAX_WIDTH,
            whiteSpace: "normal",
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          Service & Experience
        </span>
        <span
          className="absolute"
          style={{
            ...monoLabelStyle,
            top: `calc(50% + ${CORE_HEIGHT / 2 + LABEL_GAP}px)`,
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          Retail
        </span>
      </div>
    </div>
  );
}

type CaseStudyLayoutProps = {
  category: string;
  title: string;
  description: string;
};

export function CaseStudyLayout({
  category,
  title,
  description,
}: CaseStudyLayoutProps) {
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
          <div className="relative pt-[40px] flex w-full justify-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[40px] mx-auto h-[320px] max-w-[880px] blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(15,23,42,0.14), transparent 60%)",
              }}
            />
            <Image
              src={`${basePath}/CRMhero.webp`}
              alt="CRM Marketplace Platform - Product management dashboard and mobile product detail view"
              width={1920}
              height={1230}
              className="relative z-10 h-auto w-full max-w-[960px]"
              unoptimized
            />
          </div>
        }
      />

      {/* Sections */}
      {SECTIONS.map((section, index) => (
        <RevealSection key={section.id}>
          <section
            id={section.id}
            style={{
              marginTop: section.dominantVisual ? "clamp(48px, 6vw, 72px)" : undefined,
              marginBottom: section.dominantVisual ? "clamp(96px, 14vw, 140px)" : sectionGap,
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
            {section.id === "the-inflection-point-marketplace" && <InflectionPointTimeline />}
            {SECTION_CONTENT[section.id] ? (
              <>
                {section.id === "my-role" ? (
                  <>
                    <div
                      className="text-black"
                      style={{
                        marginTop: headingToBody,
                        fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                        lineHeight: 1.6,
                      }}
                    >
                      {SECTION_CONTENT[section.id].slice(0, 1).map((block, idx) => {
                        const i = idx;
                        if (typeof block === "string") {
                          return (
                            <div key={i} style={{ marginTop: 0 }}>
                              <p
                                className="font-medium uppercase text-mid-gray"
                                style={{
                                  fontSize: "clamp(12px, 1.2vw, 14px)",
                                  letterSpacing: "0.1em",
                                  marginBottom: 14,
                                  color: "rgba(0,0,0,0.6)",
                                  fontFamily: "var(--font-plex-mono), monospace",
                                }}
                              >
                                {MY_ROLE_LABELS[i]}
                              </p>
                              <p style={{ whiteSpace: "pre-line" }}>{block}</p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div
                      className="mt-8"
                      style={{
                        marginTop: "calc(clamp(16px, 2vw, 24px) + 16px)",
                      }}
                    >
                      <MarketplaceArchitectureDiagram />
                    </div>
                    <div
                      className="text-black"
                      style={{
                        marginTop: 48,
                        fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                        lineHeight: 1.6,
                      }}
                    >
                      {SECTION_CONTENT[section.id].slice(1, 4).map((block, idx) => {
                        const i = idx + 1;
                        if (typeof block === "string") {
                          const label = i === 1 ? MY_ROLE_LABELS[1] : null;
                          return (
                            <div
                              key={i}
                              style={{
                                marginTop: i === 1 ? 0 : 24,
                              }}
                            >
                              {label != null && (
                                <p
                                  className="font-medium uppercase text-mid-gray"
                                  style={{
                                    fontSize: "clamp(12px, 1.2vw, 14px)",
                                    letterSpacing: "0.1em",
                                    marginBottom: 14,
                                    color: "rgba(0,0,0,0.6)",
                                    fontFamily: "var(--font-plex-mono), monospace",
                                  }}
                                >
                                  {label}
                                </p>
                              )}
                              <p
                                className={i > 1 ? "mt-6" : undefined}
                                style={i === 1 ? { whiteSpace: "pre-line" } : undefined}
                              >
                                {block}
                              </p>
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
                      })}
                    </div>
                    <div
                      className="text-black"
                      style={{
                        marginTop: 48,
                        fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                        lineHeight: 1.6,
                      }}
                    >
                      {SECTION_CONTENT[section.id].slice(4).map((block, idx) => {
                        const i = idx + 4;
                        if (typeof block === "string") {
                          const label =
                            i === 4 ? MY_ROLE_LABELS[2] : i === 8 ? MY_ROLE_LABELS[3] : null;
                          return (
                            <div
                              key={i}
                              style={{
                                marginTop: i === 4 ? 0 : i === 8 ? 48 : 24,
                              }}
                            >
                              {label != null && (
                                <p
                                  className="font-medium uppercase text-mid-gray"
                                  style={{
                                    fontSize: "clamp(12px, 1.2vw, 14px)",
                                    letterSpacing: "0.1em",
                                    marginBottom: 14,
                                    color: "rgba(0,0,0,0.6)",
                                    fontFamily: "var(--font-plex-mono), monospace",
                                  }}
                                >
                                  {label}
                                </p>
                              )}
                              <p
                                className={i === 6 || i === 10 || i === 12 ? "mt-6" : undefined}
                                style={
                                  (i === 4 || i === 6 || i === 8 || i === 10 || i === 12)
                                    ? { whiteSpace: "pre-line" }
                                    : undefined
                                }
                              >
                                {block}
                              </p>
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
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="text-black"
                      style={{
                        marginTop: section.id === "the-inflection-point-marketplace" ? 0 : headingToBody,
                        fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                        lineHeight: 1.6,
                      }}
                    >
                      {SECTION_CONTENT[section.id].map((block, i) => {
                        if (typeof block === "string") {
                          const isInflectionPoint = section.id === "the-inflection-point-marketplace";
                          const label = isInflectionPoint
                            ? INFLECTION_POINT_LABELS[i]
                            : section.id === "my-role" && i <= 1
                              ? MY_ROLE_LABELS[i]
                              : null;
                          return (
                            <div
                              key={i}
                              style={{
                                marginTop:
                                  i === 0 ? 0 : isInflectionPoint ? 48 : section.id === "my-role" && i === 1 ? 48 : 24,
                              }}
                            >
                              {section.id === "context" && i === 0 && (
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
                                      src={`${basePath}/crmstory.png`}
                                      alt="Customer and staff at counter with POS and product display in a beauty or retail setting"
                                      width={1600}
                                      height={1067}
                                      className="h-full w-full object-contain"
                                      unoptimized
                                    />
                                  </div>
                                </div>
                              )}
                              {label != null && (
                                <p
                                  className="font-medium uppercase text-mid-gray"
                                  style={{
                                    fontSize: "clamp(12px, 1.2vw, 14px)",
                                    letterSpacing: "0.1em",
                                    marginBottom: 14,
                                    color: "rgba(0,0,0,0.6)",
                                    fontFamily: "var(--font-plex-mono), monospace",
                                  }}
                                >
                                  {label}
                                </p>
                              )}
                              <p
                                className={!isInflectionPoint && i > 0 ? "mt-6" : undefined}
                                style={
                                  isInflectionPoint ||
                                  (section.id === "my-role" && (i === 0 || i === 1)) ||
                                  section.id === "outcome" ||
                                  section.id === "what-i-learned"
                                    ? { whiteSpace: "pre-line" }
                                    : undefined
                                }
                              >
                                {block}
                              </p>
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
                      })}
                    </div>
                    {section.id === "context" && <PlatformShiftDiagram />}
                  </>
                )}
              </>
            ) : (
              <>
                <div
                  className="mt-[14px]"
                  style={{ marginTop: headingToBody }}
                >
                  <TextPlaceholder />
                </div>
                <div
                  className="mt-6"
                  style={{ marginTop: inSectionGap }}
                >
                  <TextPlaceholder />
                </div>
              </>
            )}
          </section>
        </RevealSection>
      ))}
    </article>
  );
}
