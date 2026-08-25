/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { RESUME_PDF_HREF } from "@/lib/resume";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Plain <a> below, so basePath is applied manually (unlike next/link elsewhere).
const RESUME_URL = `${basePath}${RESUME_PDF_HREF}`;
const LINKEDIN_URL = "https://www.linkedin.com/in/atylin/";

// Core stack shown in the auto-scrolling marquee.
const TOOLS: { src: string; alt: string }[] = [
  { src: "figma.svg", alt: "Figma" },
  { src: "lovable-color.svg", alt: "Lovable" },
  { src: "claude.svg", alt: "Claude" },
  { src: "cursor.png", alt: "Cursor" },
  { src: "miro.svg", alt: "Miro" },
  { src: "Jira Logomark.svg", alt: "Jira" },
  { src: "tableau-software.svg", alt: "Tableau" },
];

const PHOTOS: { src: string; alt: string }[] = [
  { src: "yoga-puppy.jpg", alt: "Anny holding a puppy at a yoga class" },
  { src: "portrait-film.jpg", alt: "Anny, film portrait" },
  { src: "golden-gate.jpg", alt: "Cyclist crossing the Golden Gate Bridge" },
  { src: "uc-davis.jpg", alt: "The UC Davis water tower" },
];

const QUOTES = [
  "Automating everything isn't the answer. I keep users in control and clear on what the system is doing, even when AI runs it.",
  "I keep the screen simple, so what matters is easy to find and act on.",
  "I design the logic underneath before the screen on top.",
];

function ExternalLinkIcon() {
  return (
    <svg
      className="bento-open-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" role="img" aria-label="LinkedIn">
      <rect width="24" height="24" rx="5" fill="#3E6DC1" />
      <path
        fill="#ffffff"
        d="M8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"
      />
    </svg>
  );
}

function QuoteCard({ text, className }: { text: string; className: string }) {
  return (
    <section className={`bento-card bento-quote ${className}`}>
      <span className="quote-mark" aria-hidden>
        &ldquo;
      </span>
      <p className="quote-text">{text}</p>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="about-bento-wrap">
      <div className="about-bento">
        {/* Intro */}
        <section className="bento-card bento-intro bento-col-2">
          <Image
            src={`${basePath}/myavatar2.svg`}
            alt="Illustration of Anny"
            width={130}
            height={130}
            className="intro-avatar"
            unoptimized
          />
          <div>
            <p className="intro-eyebrow">Hey there!</p>
            <p className="intro-name">I&apos;m Anny</p>
          </div>
        </section>

        {/* Resume */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card bento-link bento-col-1"
          aria-label="Open Anny's resume (PDF, new tab)"
        >
          <ExternalLinkIcon />
          <span className="link-label">Resume</span>
        </a>

        {/* Tools marquee */}
        <section className="bento-card bento-tools bento-col-1" aria-label="Tools I work with">
          <div className="bento-marquee" style={{ ["--marquee-duration" as string]: "20s" }}>
            <div className="bento-marquee-track">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <img
                  key={i}
                  src={`${basePath}/tools logo/${t.src}`}
                  alt={t.alt}
                  className="tool-logo"
                  aria-hidden={i >= TOOLS.length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quote 1 */}
        <QuoteCard text={QUOTES[0]} className="bento-col-2" />

        {/* Quote 2 */}
        <QuoteCard text={QUOTES[1]} className="bento-col-2" />

        {/* Photo marquee */}
        <section className="bento-card bento-photo bento-col-1" aria-label="Photos of Anny">
          <div className="bento-marquee">
            <div className="bento-marquee-track">
              {[...PHOTOS, ...PHOTOS].map((p, i) => (
                <img
                  key={i}
                  src={`${basePath}/about/${p.src}`}
                  alt={p.alt}
                  className="photo-item"
                  aria-hidden={i >= PHOTOS.length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* LinkedIn */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card bento-link bento-col-1"
          aria-label="Anny's LinkedIn profile (new tab)"
        >
          <ExternalLinkIcon />
          <LinkedInLogo />
        </a>

        {/* Quote 3 */}
        <QuoteCard text={QUOTES[2]} className="bento-col-2" />
      </div>
    </main>
  );
}
