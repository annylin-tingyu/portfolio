import Link from "next/link";
import { CityFog } from "@/components/city/CityFog";
import { TypewriterHeadline } from "@/components/city/TypewriterHeadline";
import { Footer } from "@/components/Footer";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CityPage() {
  return (
    <div style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif" }}>
      <section
        className="relative min-h-screen overflow-hidden text-charcoal"
        style={{
          backgroundColor: "#f8f9fa",
          backgroundImage:
            "linear-gradient(180deg, #a9ccec 0%, #c9def1 26%, #e8f0f7 52%, #f8f9fa 76%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Ambient fog drifting left → right */}
        <CityFog />

        {/* Golden Gate Bridge — bottom center, die-cut sticker style */}
        <div
          className="pointer-events-none absolute bottom-[-130px] left-1/2 w-[92%] max-w-[1100px] -translate-x-1/2 translate-y-[10%] opacity-90 max-md:bottom-[-40px] max-md:translate-y-0"
          style={{
            filter:
              "drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(1.5px 1.5px 0 #fff) drop-shadow(-1.5px 1.5px 0 #fff) drop-shadow(1.5px -1.5px 0 #fff) drop-shadow(-1.5px -1.5px 0 #fff) drop-shadow(0 6px 10px rgba(73,80,87,0.18))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/golden-gate-bridge.png`}
            alt="Golden Gate Bridge illustration"
            className="h-auto w-full"
          />
        </div>

        {/* Centered headline */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
          <div className="-mt-[160px]">
            <span className="mb-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-charcoal/60">
              <span className="size-1.5 rounded-full bg-sky" />
              Based in San Francisco
            </span>

            <h1 className="min-h-[2.4em] text-[2.7rem] font-extrabold leading-[1.2] tracking-tight text-balance sm:text-[3.375rem] md:text-[4.05rem]" style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif" }}>
              <TypewriterHeadline />
            </h1>

            <p className="mx-auto mt-[22px] max-w-[46ch] text-lg leading-relaxed text-charcoal/75 sm:text-xl">
              I&apos;m a systems thinker who designs for two sides at once, giving the
              business the reliability it runs on and the customer the simplicity they
              expect.
            </p>
          </div>

          {/* Scroll cue */}
          <a
            href="#work"
            className="absolute bottom-[20px] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 transition-colors hover:text-sky"
          >
            <span>Selected work</span>
            <span aria-hidden className="animate-bounce">↓</span>
          </a>
        </div>
      </section>

      <section id="work" className="border-t border-charcoal/10 bg-snow px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-5xl font-bold sm:text-6xl" style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif" }}>
            Menu
          </h2>

          <div className="flex flex-col">
            {CASE_STUDIES.map((cs) => (
              <MenuRow key={cs.slug} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* -------------------- Menu row -------------------- */
function MenuRow({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/projects/${cs.slug}`}
      className="group border-b border-charcoal/10 py-10 first:border-t first:border-charcoal/10 sm:py-12"
    >
      <div className="flex items-baseline gap-4">
        <h3 className="text-2xl font-semibold leading-tight transition-colors group-hover:text-sky sm:text-3xl" style={{ fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif" }}>
          {cs.title}
        </h3>
        <span
          aria-hidden
          className="hidden h-px flex-1 translate-y-[-2px] sm:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 6px)",
            color: "rgba(0,0,0,0.22)",
          }}
        />
        <span className="ml-auto font-mono text-sm text-charcoal/55 sm:ml-0">
          {`’${String(cs.year).slice(-2)}`}
        </span>
      </div>

      <p className="mt-3 max-w-[80ch] text-base italic leading-relaxed text-charcoal/70 sm:text-lg">
        <span dangerouslySetInnerHTML={{ __html: cs.tagline }} />
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {cs.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-charcoal/20 px-3 py-1 font-mono text-[11px] text-charcoal/65"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
