const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Decorative fog layer for the /city hero. Several cloud images drift left→right
 * at different sizes, speeds, and depths (staggered via negative delays so fog is
 * always crossing). Purely ambient — pointer-events-none, behind the content.
 */
const CLOUDS = [
  { top: "10%", width: "46vw", maxWidth: 640, duration: "64s", delay: "-4s", opacity: 0.5, blur: 2 },
  { top: "30%", width: "34vw", maxWidth: 460, duration: "48s", delay: "-26s", opacity: 0.38, blur: 1 },
  { top: "20%", width: "40vw", maxWidth: 560, duration: "82s", delay: "-52s", opacity: 0.45, blur: 3 },
];

export function CityFog() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {CLOUDS.map((c, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`${basePath}/cloud.avif`}
          alt=""
          className="city-fog-cloud absolute left-0 h-auto"
          style={{
            top: c.top,
            width: c.width,
            maxWidth: c.maxWidth,
            opacity: c.opacity,
            filter: `blur(${c.blur}px)`,
            animationDuration: c.duration,
            animationDelay: c.delay,
          }}
        />
      ))}
    </div>
  );
}
