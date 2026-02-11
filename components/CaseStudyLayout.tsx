import Link from "next/link";

const contentMax = "clamp(720px, 88vw, 880px)";
const sectionGap = "clamp(72px, 10vw, 110px)";
const inSectionGap = "clamp(16px, 2vw, 24px)";
const headingToBody = "clamp(12px, 1.5vw, 18px)";

/** Section body copy by section id. Omit for placeholder. */
const SECTION_CONTENT: Record<string, string[]> = {
  context: [
    "The product started as a reservation tool for beauty businesses. Merchants could offer loyalty bundles (e.g., buy 10 sessions, get 3 free) and stored-value credits, but these required manual promotion and in-person setup. This worked at a small scale but didn't support the company's expansion into fitness, lifestyle, and retail.",
    "Manual workflows became a constraint. The team needed digital campaigns, online sales, and scalable loyalty mechanics that worked across industries without fragmenting the product.",
  ],
  "the-inflection-point-marketplace": [
    "Marketplace introduced a platform layer for creating, selling, and managing digital packages, subscriptions, and campaign-based offers. Promotions shifted from manual, in-person processes to digitally created, sold, and tracked campaigns within the system. This enabled use cases like e-ticket gifting and referral sharing (member-get-member), expanding acquisition and retention beyond the physical store.",
    "This repositioned the product from a reservation and operations tool to a multi-vertical loyalty and commerce platform.",
  ],
  "my-role": [
    "I designed the merchant setup experience (creating and publishing items) and the customer purchase and e-ticket flows. I worked with the PM and engineers to translate requirements into workflows that balanced flexibility with error prevention.",
    "Key constraints shaped the design:",
    "No in-platform refunds — transactions were irreversible.",
    "Misconfiguration risked financial or trust issues for merchants and customers.",
    "Customer service teams needed clear system states to resolve payment questions efficiently.",
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
                {SECTION_CONTENT[section.id].map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-6" : undefined}>
                    {para}
                  </p>
                ))}
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

      {/* CTAs */}
      <footer
        className="flex flex-wrap gap-6 border-t border-light-gray pt-[clamp(48px,6vw,72px)]"
        style={{ marginTop: sectionGap }}
      >
        <Link
          href="/#work"
          className="text-[14px] font-medium text-charcoal transition-colors duration-[120ms] hover:text-accent-hover-text"
        >
          View all work
        </Link>
        <Link
          href="/#contact"
          className="text-[14px] font-medium text-charcoal transition-colors duration-[120ms] hover:text-accent-hover-text"
        >
          Get in touch
        </Link>
      </footer>
    </article>
  );
}
