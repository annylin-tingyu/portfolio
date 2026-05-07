"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logo = (f: string) => `${bp}/tools%20logo/${f.replace(/ /g, "%20")}`;

/* Design width: inner chips/tiles use absolute px; keep ≥ rightmost content + margins */
const SKILL_BOARD_DESIGN_W = 1040;
/** Brown frame outer height: 11+11 border + 13+13 padding + 460 white board. */
const SKILL_BOARD_DESIGN_OUTER_H = 508;
const SKILL_BOARD_SECTION_PAD_X = 0;
/** Multiply fit-to-column scale so the board reads wider than strict fit (capped to avoid runaway zoom). */
const SKILL_BOARD_VISUAL_WIDTH_MULT = 1.155; // 1.1 × 1.05
const SKILL_BOARD_MAX_SCALE = 1.155;
/** Inner skills/tools layer: slight shrink so chips clear the frame (1 − 0.05). */
const SKILL_BOARD_INNER_CONTENT_SCALE = 0.95;
/** Horizontal nudge for inner layer (px, negative = left). */
const SKILL_BOARD_INNER_NUDGE_X = -15;

/* ─────────────────────────────────────────────────────────────────
   Inline SVG doodle primitives
───────────────────────────────────────────────────────────────── */
function Sparkle({
  size = 22,
  color = "#f5c518",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", ...style }}
      aria-hidden
    >
      <path
        d="M12 1 L13.8 10.2 L23 12 L13.8 13.8 L12 23 L10.2 13.8 L1 12 L10.2 10.2 Z"
        fill={color}
      />
    </svg>
  );
}

function SmallStar({
  size = 14,
  color = "#f5c518",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", ...style }}
      aria-hidden
    >
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={color}
      />
    </svg>
  );
}

function Heart({
  size = 20,
  color = "#ff8ab4",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", ...style }}
      aria-hidden
    >
      <path
        d="M12 21.5C12 21.5 2 14 2 7.5A5 5 0 0 1 12 5.5A5 5 0 0 1 22 7.5C22 14 12 21.5 12 21.5Z"
        fill={color}
      />
    </svg>
  );
}

function CurvedArrow({
  style,
  color = "#b8a090",
  flip = false,
}: {
  style?: React.CSSProperties;
  color?: string;
  flip?: boolean;
}) {
  return (
    <svg
      width="51"
      height="35"
      viewBox="0 0 64 44"
      style={{ display: "block", ...style }}
      aria-hidden
    >
      <g transform={flip ? "scale(-1,1) translate(-64,0)" : undefined}>
        <path
          d="M6 36 Q 30 4 58 20"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M54 13 L60 21 L48 21 Z"
          fill={color}
          transform="rotate(-18 54 17)"
        />
      </g>
    </svg>
  );
}

function Pencil({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="28"
      height="86"
      viewBox="0 0 28 88"
      style={{ display: "block", ...style }}
      aria-hidden
    >
      {/* Eraser */}
      <rect x="8" y="0" width="12" height="8" rx="2" fill="#f4b8c1" />
      <rect x="7" y="7" width="14" height="3" rx="1" fill="#c0c0c0" />
      {/* Body */}
      <rect x="7" y="10" width="14" height="58" fill="#f5c842" />
      {/* Stripe at top of body */}
      <rect x="7" y="10" width="14" height="7" fill="#d4a832" />
      {/* Wood tip */}
      <rect x="7" y="68" width="14" height="10" fill="#f0d8b0" />
      {/* Tip */}
      <polygon points="7,78 21,78 14,88" fill="#4a2f1a" />
      {/* Lead */}
      <polygon points="11,83 17,83 14,88" fill="#222" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Tape strip (for sticky-note style chips)
───────────────────────────────────────────────────────────────── */
function Tape({ color = "#e8d8b8", angle = -2 }: { color?: string; angle?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: -10,
        left: "50%",
        transform: `translateX(-50%) rotate(${angle}deg)`,
        width: 42,
        height: 17,
        background: color,
        opacity: 0.82,
        borderRadius: 2,
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        zIndex: 2,
      }}
    />
  );
}

function PushPin({ color = "#e8501e" }: { color?: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: -10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 17,
        height: 17,
        borderRadius: "50%",
        background: `radial-gradient(circle at 38% 35%, #ff9a70, ${color})`,
        boxShadow: "0 2px 5px rgba(0,0,0,0.30)",
        zIndex: 2,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   Skill chip shapes & data
───────────────────────────────────────────────────────────────── */
type ChipVariant =
  | "rect"          // plain rounded rectangle (sticky)
  | "oval"          // full pill
  | "blob"          // organic blob via border-radius
  | "cloud"         // irregular bumpy cloud
  | "torn"          // torn-paper asymmetric corners
  | "circle-outline"// just a border, no fill
  | "notepad"       // rect with left accent stripe
  | "bracket";      // outlined with { } decorators

interface Chip {
  text: string;
  variant: ChipVariant;
  bg: string;
  fg?: string;
  border?: string;
  rotate: number;
  left: string;
  top: string;
  tape?: boolean;
  tapeColor?: string;
  pin?: boolean;
  multiline?: boolean;
  maxWidth?: number;
  accentColor?: string; // for notepad stripe
}

const skills: Chip[] = [
  // ── Dense skills field: keep the top row ~20px from the board edge
  {
    text: "Product Design",
    variant: "rect",
    bg: "#fde8c8",
    border: "1.5px solid #e0b87a",
    rotate: -3,
    left: "150px",
    top: "24px",
    tape: true,
    tapeColor: "#f0d0a0",
  },
  {
    text: "Cross-functional Collaboration",
    variant: "torn",
    bg: "#fff3b0",
    rotate: 2,
    left: "340px",
    top: "11px",
    pin: true,
    multiline: true,
    maxWidth: 170,
  },
  {
    text: "Design Systems",
    variant: "cloud",
    bg: "#c5e8ff",
    rotate: -1,
    left: "525px",
    top: "26px",
  },

  {
    text: "Rapid Prototyping",
    variant: "rect",
    bg: "#c8f0d8",
    rotate: -4,
    left: "602px",
    top: "100px",
    tape: true,
    tapeColor: "#9fdcc0",
  },
  {
    text: "Wireframing",
    variant: "circle-outline",
    bg: "transparent",
    border: "2.5px solid #2a2a2a",
    rotate: 1,
    left: "434px",
    top: "152px",
  },
  {
    text: "User Journey Mapping",
    variant: "oval",
    bg: "#e2d8ff",
    rotate: 0,
    left: "360px",
    top: "94px",
  },
  {
    text: "Information Architecture",
    variant: "bracket",
    bg: "transparent",
    border: "2px solid #5a5a5a",
    rotate: 2,
    left: "209px",
    top: "117px",
    multiline: true,
    maxWidth: 155,
  },
  {
    text: "Interaction Design",
    variant: "blob",
    bg: "#ffc8d6",
    rotate: 3,
    left: "24px",
    top: "76px",
    multiline: true,
  },

  {
    text: "User Research",
    variant: "blob",
    bg: "#c8f0d8",
    rotate: -5,
    left: "28px",
    top: "145px",
  },
  {
    text: "Usability Testing",
    variant: "notepad",
    bg: "#ead8ff",
    accentColor: "#b794f4",
    rotate: 1,
    left: "120px",
    top: "190px",
    multiline: true,
  },
  {
    text: "Business Analytics",
    variant: "oval",
    bg: "#b0ece4",
    rotate: -2,
    left: "262px",
    top: "200px",
  },
  {
    text: "A/B Testing",
    variant: "circle-outline",
    bg: "white",
    border: "2.5px solid #f472b6",
    fg: "#c0507a",
    rotate: 4,
    left: "490px",
    top: "220px",
  },
  {
    text: "Agile / Sprint-based Design",
    variant: "rect",
    bg: "#fff0a8",
    border: "1.5px solid #d4b82a",
    rotate: 3,
    left: "620px",
    top: "166px",
    multiline: true,
    maxWidth: 205,
  },
];

/* ─────────────────────────────────────────────────────────────────
   borderRadius map per variant
───────────────────────────────────────────────────────────────── */
function chipRadius(variant: ChipVariant): string {
  switch (variant) {
    case "rect":          return "10px";
    case "oval":          return "999px";
    case "blob":          return "62% 38% 46% 54% / 56% 44% 56% 44%";
    case "cloud":         return "50% 46% 50% 50% / 40% 40% 60% 60%";
    case "torn":          return "2px 11px 5px 13px / 11px 3px 11px 4px";
    case "circle-outline":return "999px";
    case "notepad":       return "8px";
    case "bracket":       return "10px";
  }
}

/* ─────────────────────────────────────────────────────────────────
   Single chip renderer
───────────────────────────────────────────────────────────────── */
function SkillChip({ chip, isHovered }: { chip: Chip; isHovered: boolean }) {
  const hw = "var(--font-skills, 'Architects Daughter', cursive)";

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    left: chip.left,
    top: chip.top,
    transform: isHovered ? `translateY(-8px) rotate(${chip.rotate + 3}deg)` : `rotate(${chip.rotate}deg)`,
    transition: "transform 0.2s ease",
    willChange: "transform",
    zIndex: isHovered ? 20 : 1,
  };

  const baseShadow =
    chip.bg !== "transparent" && chip.bg !== "white"
      ? "0 2px 8px rgba(0,0,0,0.10)"
      : chip.bg === "white"
      ? "0 2px 8px rgba(0,0,0,0.08)"
      : "none";

  const innerStyle: React.CSSProperties = {
    position: "relative",
    background: chip.bg,
    borderRadius: chipRadius(chip.variant),
    border: chip.border ?? "none",
    color: chip.fg ?? "#1a1a1a",
    padding: "12px 20px",
    fontSize: "18px",
    fontFamily: hw,
    fontWeight: 600,
    letterSpacing: "0.02em",
    whiteSpace: chip.multiline ? "normal" : "nowrap",
    maxWidth: chip.maxWidth ?? (chip.multiline ? 115 : undefined),
    textAlign: chip.multiline ? "center" : undefined,
    lineHeight: chip.multiline ? 1.25 : undefined,
    boxShadow: isHovered
      ? "0 12px 24px rgba(0,0,0,0.22), 0 4px 8px rgba(0,0,0,0.12)"
      : baseShadow,
    transition: "box-shadow 0.2s ease",
    willChange: "box-shadow",
    ...(chip.variant === "notepad"
      ? { borderLeft: `3px solid ${chip.accentColor}` }
      : {}),
  };

  let content: React.ReactNode = chip.text;
  if (chip.text === "Agile / Sprint-based Design") {
    content = (
      <>
        Agile / Sprint-
        <br />
        based Design
      </>
    );
  }
  if (chip.variant === "bracket") {
    content = (
      <>
        <span style={{ color: "#aaa", marginRight: 4, fontWeight: 400 }}>{"{"}</span>
        {chip.text}
        <span style={{ color: "#aaa", marginLeft: 4, fontWeight: 400 }}>{"}"}</span>
      </>
    );
  }

  return (
    <div
      data-skills-board-hover-id={`skill-${chip.text}`}
      style={wrapStyle}
    >
      <div
        className="skills-board-chip"
        style={innerStyle}
      >
        {chip.tape && <Tape color={chip.tapeColor} />}
        {chip.pin && <PushPin />}
        {content}
        {chip.variant === "notepad" && (
          <div style={{ marginTop: 4, opacity: 0.2 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ height: 1, background: chip.accentColor, marginBottom: 3 }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Tool logo data
───────────────────────────────────────────────────────────────── */
const toolRow1 = [
  { name: "Figma",       src: logo("figma.svg"),                                           bg: "white"   },
  { name: "Cursor",      src: logo("cursor.png"),                                          bg: "white"   },
  { name: "Lovable",     src: logo("lovable-color.svg"),                                   bg: "white", iconSize: 34 },
  { name: "Pencil",      src: logo("pencil-logo-new.svg"),                                 bg: "white"   },
];

const toolRow2 = [
  { name: "Miro",  src: logo("miro.svg"),          bg: "#FFDD33" },
  { name: "Jira",  src: logo("Jira Logomark.svg"), bg: "white"   },
  { name: "HTML5", src: logo("html.svg"),          bg: "white"   },
  { name: "CSS",   src: logo("css.svg"),           bg: "white"   },
];

const TOOL_TILE_SIZE = 70;

const toolLayout = [...toolRow1, ...toolRow2].map((tool, i) => {
  const rotations = [-6, 5, -4, 3, 5, -4, 4, -5];

  return {
    ...tool,
    rotate: rotations[i],
    rowOffset: 0,
  };
});

/* ─────────────────────────────────────────────────────────────────
   Tool tile
───────────────────────────────────────────────────────────────── */
function ToolTile({
  name,
  src,
  bg,
  iconSize,
  odd,
  isHovered,
  style,
}: {
  name: string;
  src: string;
  bg: string;
  iconSize?: number;
  odd: boolean;
  isHovered: boolean;
  style?: React.CSSProperties;
}) {
  const { transform: styleTransform, boxShadow: styleBoxShadow, ...restStyle } = style ?? {};
  const baseTransform =
    typeof styleTransform === "string" ? styleTransform : odd ? "rotate(-5deg)" : "rotate(5deg)";
  const baseShadow =
    typeof styleBoxShadow === "string"
      ? styleBoxShadow
      : "0 4px 12px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.08)";

  return (
    <div
      className="skills-board-tool"
      data-skills-board-hover-id={`tool-${name}`}
      title={name}
      style={{
        width: TOOL_TILE_SIZE,
        height: TOOL_TILE_SIZE,
        borderRadius: 16,
        background: bg,
        padding: 9,
        boxShadow: isHovered
          ? "0 12px 24px rgba(0,0,0,0.22), 0 4px 8px rgba(0,0,0,0.12)"
          : baseShadow,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: isHovered ? `translateY(-8px) rotate(3deg) ${baseTransform}` : baseTransform,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        willChange: "transform, box-shadow",
        flexShrink: 0,
        ...restStyle,
        zIndex: isHovered ? 20 : 1,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        style={{
          width: iconSize,
          height: iconSize,
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Badge (SKILLS / TOOLS label)
───────────────────────────────────────────────────────────────── */
function Badge({
  label,
  rotate,
  style,
}: {
  label: string;
  rotate: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a1a",
        color: "#fff",
        borderRadius: 999,
        padding: "6px 22px",
        fontFamily: "var(--font-handwritten, 'Caveat', cursive)",
        fontSize: "1.36rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 3px 10px rgba(0,0,0,0.22)",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export default function SkillsBoard() {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const scaleShellRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const resize = () => {
    const outerEl = outerRef.current;
    if (!outerEl) return;

    const inner = scaleShellRef.current;
    /**
     * IMPORTANT:
     * `scrollWidth` gets inflated by absolutely-positioned chips/tiles that intentionally overflow
     * the frame. That makes the measured width huge on mobile and shrinks the whole board too far.
     * For scaling the *board*, we want the frame's real width.
     */
    const measuredDesignW = inner?.clientWidth ?? SKILL_BOARD_DESIGN_W;

    const available = Math.max(0, outerEl.clientWidth - SKILL_BOARD_SECTION_PAD_X * 2);
    const fitScale = available > 0 ? available / measuredDesignW : 1;
    const next = Math.min(1, fitScale);
    setScale(next);
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[SkillsBoard] scale", next, { available, measuredDesignW });
    }
  };

  useLayoutEffect(() => {
    resize();
  }, []);

  useEffect(() => {
    const outerEl = outerRef.current;
    if (!outerEl) return;

    const ro = new ResizeObserver(() => resize());
    ro.observe(outerEl);
    window.addEventListener("resize", resize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const framedBoardStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top center",
    width: SKILL_BOARD_DESIGN_W,
    pointerEvents: "auto" as const,
  };

  const sectionSx: CSSProperties = {
    width: "100%",
    margin: "0 auto",
    padding: 0,
    overflow: "visible",
  };

  const framedBoardSx: CSSProperties = framedBoardStyle;

  return (
    <section style={sectionSx}>
      <div
        ref={outerRef}
        style={{
          width: "100%",
          /* Prevent horizontal scrollbars while keeping vertical overflow (shadows) visible. */
          overflowX: "clip",
          overflowY: "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          /* Scaled board doesn’t shrink layout flow; match visible height */
          height: SKILL_BOARD_DESIGN_OUTER_H * scale,
        }}
      >
        {/* Solid board frame (fixed design width → scaled down to fit viewport) */}
        <div ref={scaleShellRef} style={framedBoardSx}>
      <div
        style={{
          borderRadius: 22,
          padding: 13,
          background: "#8a522d",
          border: "11px solid #8a522d",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.15)",
        }}
      >
        {/* Board surface */}
        <div
          onPointerMove={(event) => {
            const target = event.target as HTMLElement;
            const hoverTarget = target.closest<HTMLElement>("[data-skills-board-hover-id]");
            const nextHoverId = hoverTarget?.dataset["skillsBoardHoverId"] ?? null;

            if (nextHoverId !== hoverId) {
              setHoverId(nextHoverId);
            }
          }}
          onPointerLeave={() => {
            setHoverId(null);
          }}
          style={{
            position: "relative",
            height: 460,
            background: "#ffffff",
            borderRadius: 11,
            overflow: "visible",
            padding: 26,
          }}
        >
          {/* ── Subtle dot-grid texture ─────────────────── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, #d8d0c8 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              opacity: 0.18,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${SKILL_BOARD_INNER_NUDGE_X}px, 20px) scale(${SKILL_BOARD_INNER_CONTENT_SCALE})`,
              transformOrigin: "top center",
            }}
          >
          {/* ── Decorative doodles ──────────────────────── */}

          {/* Pencil – top right */}
          <div style={{ position: "absolute", right: "4%", top: "1%", transform: "rotate(18deg)" }}>
            <Pencil />
          </div>

          {/* Stars scattered */}
          <div style={{ position: "absolute", right: "10%", top: "1.5%" }}>
            <Sparkle size={22} color="#f5c518" />
          </div>
          <div style={{ position: "absolute", right: "17%", top: "calc(4% - 5px)" }}>
            <SmallStar size={14} color="#f5c518" />
          </div>
          <div style={{ position: "absolute", left: "calc(54% - 40px)", top: "calc(31% + 20px)" }}>
            <SmallStar size={15} color="#f5c518" />
          </div>
          <div style={{ position: "absolute", left: "78%", top: "calc(55% + 5px)" }}>
            <SmallStar size={12} color="#f5c518" />
          </div>
          <div style={{ position: "absolute", left: "57%", top: "6%" }}>
            <SmallStar size={11} color="#f5c518" />
          </div>

          {/* Hearts */}
          <div style={{ position: "absolute", left: "calc(18% - 20px)", top: "calc(52% + 40px)" }}>
            <Heart size={20} color="#74b0e0" />
          </div>
          <div style={{ position: "absolute", left: "9%", bottom: 88 }}>
            <Heart size={14} color="#ff8ab4" />
          </div>

          {/* Checkmark */}
          <div
            style={{
              position: "absolute",
              left: "calc(44% - 55px)",
              top: "calc(24% - 25px)",
              fontSize: 22,
              color: "#48bb78",
              fontWeight: 800,
              fontFamily: "system-ui",
            }}
          >
            ✓
          </div>

          {/* Arrow near TOOLS badge */}
          <div style={{ position: "absolute", left: "calc(17% - 60px)", top: "calc(73% - 20px)" }}>
            <CurvedArrow color="#a08060" />
          </div>

          {/* Arrow bottom right — inside tools area */}
          <div style={{ position: "absolute", right: "3%", bottom: 18, opacity: 0.45 }}>
            <CurvedArrow color="#8898a8" flip />
          </div>

          {/* Squiggly line — between rows 1 and 2 */}
          <svg
            width="40"
            height="16"
            viewBox="0 0 40 16"
            style={{ position: "absolute", left: "26%", top: "calc(26% - 30px)", opacity: 0.35 }}
            aria-hidden
          >
            <path
              d="M2 8 Q 8 2 14 8 Q 20 14 26 8 Q 32 2 38 8"
              stroke="#888"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* ── SKILLS badge ─────────────────────────────── */}
          <div style={{ position: "absolute", left: "3%", top: "3%" }}>
            <Badge label="SKILLS" rotate={-6} />
          </div>

          {/* ── All skill chips ──────────────────────────── */}
          {skills.map((chip) => (
            <SkillChip key={chip.text} chip={chip} isHovered={hoverId === `skill-${chip.text}`} />
          ))}

          {/* ── TOOLS badge ──────────────────────────────── */}
          <div style={{ position: "absolute", left: "3%", top: 350 }}>
            <Badge label="TOOLS" rotate={3} />
          </div>

          {/* ── Wrapped tool grid — fixed-size tiles with a soft stagger ── */}
          <div
            style={{
              position: "absolute",
              left: 142,
              top: 337,
              width: 780,
              display: "flex",
              flexWrap: "wrap",
              columnGap: 13,
              rowGap: 4,
              alignItems: "center",
            }}
          >
            {toolLayout.map((t, i) => (
              <ToolTile
                key={t.name}
                {...t}
                odd={i % 2 === 0}
                isHovered={hoverId === `tool-${t.name}`}
                style={{
                  marginLeft: t.rowOffset,
                  transform: `rotate(${t.rotate}deg)`,
                }}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}
