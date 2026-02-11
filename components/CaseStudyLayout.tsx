const contentMax = "clamp(720px, 88vw, 880px)";
const sectionGap = "clamp(72px, 10vw, 110px)";
const inSectionGap = "clamp(16px, 2vw, 24px)";
const headingToBody = "clamp(12px, 1.5vw, 18px)";

/** Section body copy by section id. Use string for paragraphs, { list: string[] } for bullet lists. */
const SECTION_CONTENT: Record<string, (string | { list: string[] })[]> = {
  context: [
    "The product started as a reservation tool for beauty businesses. Merchants could offer loyalty bundles (e.g., buy 10 sessions, get 3 free) and stored-value credits, but these required manual promotion and in-person setup. This worked at a small scale but didn't support the company's expansion into fitness, lifestyle, and retail.",
    "Manual workflows became a constraint. The team needed digital campaigns, online sales, and scalable loyalty mechanics that worked across industries without fragmenting the product.",
  ],
  "the-scaling-problem": [
    "Existing loyalty features technically met merchant needs, but they were operationally expensive. Promotions lived in conversations, posters, or social posts, and tracking required staff effort. These workflows limited scalability and made it difficult to support new business models or industries consistently.",
    "To continue growing, the product needed to shift from staff-led promotion toward system-led distribution, without overwhelming non-technical merchants or introducing financial risk.",
  ],
  "the-inflection-point-marketplace": [
    "Marketplace introduced a platform layer for creating, selling, and managing digital packages, subscriptions, and campaign-based offers directly within the system. Promotions shifted from manual, in-person processes to digitally created, sold, and tracked campaigns.",
    "This enabled new use cases such as e-ticket gifting and referral sharing (member-get-member), extending customer acquisition and retention beyond the physical store. More importantly, Marketplace repositioned the product from a reservation and operations tool to a multi-vertical loyalty and commerce platform.",
  ],
  "my-role": [
    "I led the experience design for Marketplace, focusing on how merchants create and publish items for sale and how customers purchase, receive, and use those items. I worked closely with the PM and engineers to translate product requirements into workflows that balanced flexibility with safety and clarity.",
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
    "Marketplace enabled the product to support digitally managed campaigns at scale. This unlocked expansion into fitness and retail and increased internal confidence in positioning the platform for enterprise clients. Marketplace became foundational infrastructure as the product evolved from reservation management into a multi-vertical loyalty and commerce system.",
  ],
  "what-i-learned": [
    "Designing for transactions requires prioritizing clarity and correctness over feature volume. Constraints force more deliberate information design, and platform decisions often outlive individual features. As the product expanded across industries, designing scalable patterns rather than one-off solutions became critical.",
  ],
};

const SECTIONS: { id: string; title: string; dominantVisual?: boolean; supportingVisual?: boolean }[] = [
  { id: "context", title: "Context", supportingVisual: true },
  { id: "the-scaling-problem", title: "The Scaling Problem", supportingVisual: true },
  { id: "the-inflection-point-marketplace", title: "The Inflection Point: Marketplace", dominantVisual: true },
  { id: "my-role", title: "My Role", supportingVisual: true },
  { id: "constraints-that-shaped-the-design", title: "Constraints That Shaped the Design", supportingVisual: true },
  { id: "design-strategy", title: "Design Strategy", supportingVisual: true },
  { id: "key-decisions", title: "Key Decisions", supportingVisual: true },
  { id: "merchant-setup-guardrails", title: "Merchant Setup & Guardrails", supportingVisual: true },
  { id: "customer-purchase-clarity", title: "Customer Purchase & Clarity", supportingVisual: true },
  { id: "designing-for-irreversible-actions", title: "Designing for Irreversible Actions", supportingVisual: true },
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

function VisualPlaceholder({
  dominant = false,
  comparison = false,
}: { dominant?: boolean; comparison?: boolean }) {
  if (comparison) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div
          className="w-full overflow-hidden rounded-sm border border-dashed border-light-gray bg-white"
          style={{ aspectRatio: "4/3", maxWidth: 280, maxHeight: 210 }}
        />
        <div
          className="w-full overflow-hidden rounded-sm border border-dashed border-light-gray bg-white"
          style={{ aspectRatio: "4/3", maxWidth: 280, maxHeight: 210 }}
        />
      </div>
    );
  }
  if (dominant) {
    return (
      <div
        className="w-full overflow-hidden rounded-sm border border-dashed border-light-gray bg-light-gray/30"
        style={{
          aspectRatio: "16/10",
          maxHeight: "clamp(360px, 50vw, 520px)",
          minHeight: 360,
        }}
      />
    );
  }
  return (
    <div
      className="w-full overflow-hidden rounded-sm border border-dashed border-light-gray bg-white"
      style={{
        maxWidth: 560,
        aspectRatio: "16/10",
        maxHeight: 320,
        minHeight: 220,
      }}
    />
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
      {/* Case header — text-first (return is in reading-mode header) */}
      <header
        className="pt-[clamp(72px,10vw,100px)]"
        style={{ paddingBottom: sectionGap }}
      >
        <p
          className="mb-3 text-[12px] font-medium uppercase tracking-[0.06em] text-mid-gray"
          style={{ letterSpacing: "0.06em" }}
        >
          {category}
        </p>
        <h1
          className="font-semibold leading-tight text-black"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          className="mt-[14px] max-w-[65ch] text-mid-gray"
          style={{
            fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </header>

      {/* Optional subtle divider */}
      <div
        className="h-px w-full bg-accent opacity-20"
        style={{ marginBottom: sectionGap }}
        aria-hidden
      />

      {/* Sections */}
      {SECTIONS.map((section, index) => (
        <section
          key={section.id}
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
          {SECTION_CONTENT[section.id] ? (
            <>
              <div
                className="max-w-[65ch] text-black"
                style={{
                  marginTop: headingToBody,
                  fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
                  lineHeight: 1.6,
                }}
              >
                {SECTION_CONTENT[section.id].map((block, i) => {
                  if (typeof block === "string") {
                    return (
                      <p key={i} className={i > 0 ? "mt-6" : undefined}>
                        {block}
                      </p>
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
                className="mt-[14px] max-w-[65ch]"
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
          {section.dominantVisual && (
            <div
              className="mt-8"
              style={{ marginTop: inSectionGap }}
            >
              <VisualPlaceholder dominant />
            </div>
          )}
          {section.supportingVisual && !section.dominantVisual && (
            <div
              className="mt-8"
              style={{ marginTop: inSectionGap }}
            >
              <VisualPlaceholder />
            </div>
          )}
        </section>
      ))}
    </article>
  );
}
