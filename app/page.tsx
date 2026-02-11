import { CaseSection } from "@/components/CaseSection";
import { FadeInSection } from "@/components/FadeInSection";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero — text only, no image */}
      <section
        className="mx-auto w-full px-6 pt-[clamp(96px,12vw,140px)] pb-[clamp(72px,10vw,110px)]"
        style={{ maxWidth: "clamp(760px, 88vw, 880px)", marginLeft: "auto", marginRight: "auto" }}
      >
        <h1
          className="font-semibold leading-tight text-black"
          style={{
            fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Designing products where{" "}
          <span className="details-underline">details</span> matter.
        </h1>
        <p
          className="mt-[clamp(16px,2vw,22px)] font-normal text-mid-gray"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
            lineHeight: 1.45,
          }}
        >
          For complex systems and imperfect conditions.
        </p>
      </section>

      {/* Pause: whitespace only */}
      <div aria-hidden className="h-0" />

      {/* Case 01 — dominant / entry point */}
      <FadeInSection>
        <section
          id="work"
          className="mx-auto w-full px-6 py-[clamp(72px,10vw,110px)]"
          style={{ maxWidth: "clamp(760px, 88vw, 880px)", marginLeft: "auto", marginRight: "auto" }}
        >
          <CaseSection
            label="CASE 01"
            title="Auto Table Assignment System"
            descriptor="Automation under operational and monetary constraints"
            href="/projects/auto-table-assignment"
            variant="dominant"
          >
          <div
            className="bg-light-gray/50"
            style={{ aspectRatio: "2.4/1", maxHeight: "100px" }}
          />
          </CaseSection>
        </section>
      </FadeInSection>

      {/* Case 02 — same style as Case 01 */}
      <FadeInSection>
        <section
          className="mx-auto w-full px-6 pb-[clamp(96px,12vw,140px)]"
          style={{ maxWidth: "clamp(760px, 88vw, 880px)", marginLeft: "auto", marginRight: "auto" }}
        >
          <CaseSection
            label="CASE 02"
            title="CRM Marketplace Platform"
            descriptor="Scaling a CRM from Reservations to a Loyalty and Commerce Platform"
            href="/projects/crm-marketplace"
            variant="dominant"
          >
            <div
              className="bg-light-gray/50"
              style={{ aspectRatio: "2.4/1", maxHeight: "100px" }}
            />
          </CaseSection>
        </section>
      </FadeInSection>
    </div>
  );
}
