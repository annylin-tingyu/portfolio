"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedAvatar } from "@/components/AnimatedAvatar";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type MenuProject = {
  id: string;
  title: string;
  href: string;
  year: string;
  flavorNotes: string;
  badges: string[];
};

const MENU_PROJECTS: MenuProject[] = [
  {
    id: "01",
    title: "CRM marketplace feature",
    href: "/projects/crm-marketplace",
    year: "2023",
    flavorNotes: "Deposit rules, prepaid bundles, and loyalty features built within a B2B CRM.",
    badges: ["CRM", "B2B", "Enterprise"],
  },
  {
    id: "02",
    title: "Auto table assignment system",
    href: "/projects/auto-table-assignment",
    year: "2025",
    flavorNotes: "Automated table logic for 30+ restaurants, reducing manual seating errors.",
    badges: ["B2B", "Workflow", "Operations"],
  },
  {
    id: "03",
    title: "AI Event Creation",
    href: "/projects/ai-event-planning",
    year: "2025",
    flavorNotes: "Conversational event planner that surfaces personalized suggestions and coordinates group plans without leaving the chat.",
    badges: ["AI", "Social Community", "Chat UX"],
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(Boolean(mql.matches));
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollRevealStagger(count: number) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState(() => Array.from({ length: count }, () => false));

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(Array.from({ length: count }, () => true));
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(Array.from({ length: count }, () => true));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idxAttr = (e.target as HTMLElement).dataset["idx"];
          const idx = idxAttr ? Number(idxAttr) : -1;
          if (idx >= 0 && e.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of itemRefs.current) {
      if (el) obs.observe(el);
    }

    return () => obs.disconnect();
  }, [count, prefersReducedMotion]);

  return { itemRefs, visible };
}

function CoffeeCup() {
  return (
    <div className="nh-cupWrap" aria-hidden>
      <div className="nh-steam nh-steam--a" />
      <div className="nh-steam nh-steam--b" />
      <div className="nh-steam nh-steam--c" />
      <svg
        width="104"
        height="96"
        viewBox="0 0 104 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="nh-cupSvg"
      >
        <path
          d="M22 30H70L64 54C62.8 59.2 58.2 63 52.9 63H39.1C33.8 63 29.2 59.2 28 54L22 30Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
        />
        <path d="M70 35H82C88 35 92 40 92 46C92 52 88 57 82 57H67" stroke="currentColor" strokeWidth="2" />
        <path
          d="M31 63H73L78 92H26L31 63Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="white"
        />
        <path
          d="M35 30C39 25 45 22 52 22C59 22 65 25 69 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Lamp() {
  return (
    <div className="relative flex flex-col items-center my-2 w-full" aria-hidden>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <path d="M60 0V45" stroke="black" strokeWidth="2.5" />
        <path
          d="M30 75C30 52.5 90 52.5 90 75H30Z"
          stroke="black"
          strokeWidth="2.5"
          fill="white"
        />
        <path d="M30 75H90" stroke="black" strokeWidth="2.5" />
        <circle cx="60" cy="67.5" r="6" fill="#FDE68A" className="animate-pulse" />
      </svg>

      <div
        className="absolute left-1/2 top-[72px] -translate-x-1/2 w-[600px] h-[800px] bg-gradient-to-b from-yellow-100/30 via-yellow-50/10 to-transparent pointer-events-none z-0"
        style={{
          clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
          filter: "blur(60px)",
        }}
      />

      <div className="absolute left-1/2 top-[60px] -translate-x-1/2 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none z-0" />
    </div>
  );
}

function MyAvatar2() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      // max 6 SVG units (~1px rendered) in any direction
      const max = 6;
      const norm = Math.min(dist, 120) / 120;
      setEyeOffset({
        x: Math.max(-max, Math.min(max, (dx / dist) * max * norm)),
        y: Math.max(-max, Math.min(max, (dy / dist) * max * norm)),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[180px] w-[120px] overflow-visible flex items-end justify-center">
      <svg
        viewBox="132 0 264 528"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 120, height: 180, transform: "translateY(10px)" }}
        aria-hidden
      >
        {/* Body + hair + outfit */}
        <path fill="#000000" d="M130.458069,529.000000 C131.886597,515.858398 133.781479,502.718018 135.650696,489.573944 C135.925186,487.643829 135.512848,486.031189 133.678802,484.846710 C121.229004,476.806244 119.987053,464.834198 122.453918,451.781738 C123.438858,446.570312 124.960144,441.440887 126.523033,436.362061 C129.892853,425.411377 129.160538,414.790070 125.086868,404.118469 C121.834854,395.599304 118.499435,387.079620 117.601044,377.815125 C116.127281,362.617096 122.420708,349.903564 129.903183,337.510986 C132.916611,332.520111 136.049026,327.601135 139.117035,322.643097 C144.432144,314.053741 148.361633,304.950867 149.356186,294.775848 C149.628769,291.987091 150.461609,289.872986 153.376785,288.503815 C156.901505,286.848358 157.012070,281.523010 155.835403,280.344940 C151.891159,276.396149 152.962753,271.660980 152.184296,267.261536 C150.535706,257.944580 148.700317,248.625565 147.763245,239.225479 C146.080246,222.342651 152.450928,207.420013 160.866379,193.428696 C183.051834,156.543716 215.663956,134.763428 258.075531,127.660683 C261.267700,127.126076 262.675568,125.772583 262.706757,122.438583 C262.757050,117.060135 261.871429,111.856468 260.720062,106.647202 C259.987244,103.331619 258.557343,102.229454 255.114777,103.633659 C248.953125,106.146957 242.708603,108.500847 236.377914,110.547691 C217.616257,116.613762 199.688599,105.410522 196.831589,85.991936 C194.750412,71.846718 207.757843,56.586060 222.350311,55.610714 C233.509964,54.864815 242.591522,58.440582 249.677444,67.112175 C252.312012,70.336296 255.046509,73.478630 257.726227,76.666008 C260.215240,79.626556 262.420837,79.337692 264.437561,76.140419 C267.015137,72.053940 269.495789,67.898849 272.237885,63.924904 C282.469391,49.096966 302.337860,45.938164 316.067413,56.874359 C324.846802,63.867527 328.260193,75.318542 324.768250,86.063545 C320.747314,98.436272 310.374512,106.744957 298.494568,107.339828 C291.691315,107.680489 285.361298,105.449112 278.871826,104.097321 C276.291260,103.559761 273.778412,102.886086 270.480225,103.182915 C272.075562,110.550606 272.546326,117.780701 273.167969,125.484589 C279.305878,125.879265 285.577271,125.463539 291.423401,126.846001 C300.722809,129.045074 310.437439,128.576920 319.524231,131.703659 C328.610382,134.830185 336.059479,140.104553 341.484650,148.196838 C343.192627,150.744461 344.266296,153.340790 343.943878,157.590546 C350.136810,153.460663 353.944153,157.072052 357.939484,160.169891 C377.445709,175.294342 387.684814,195.819077 393.430328,219.329254 C396.925690,233.631958 394.367126,247.435638 391.952362,261.315063 C390.099487,271.964935 391.031403,282.514893 391.787231,293.109741 C392.844543,307.929596 390.114166,321.366394 377.902100,331.305267 C367.514435,339.759430 365.974457,350.615692 368.835724,362.871887 C371.063080,372.412964 374.501648,381.659546 375.797852,391.420746 C376.081390,393.555542 376.335266,395.746979 376.162811,397.876740 C375.929871,400.752808 374.587860,403.081696 371.303314,403.222382 C368.276611,403.352020 366.296661,401.245361 366.215729,398.702881 C365.998810,391.886719 361.801422,386.995331 358.763611,381.536011 C356.868195,378.129761 354.319427,375.173767 350.650970,373.655487 C342.577393,370.314026 337.012695,364.349030 332.468872,357.144257 C330.606659,354.191467 328.671478,351.218414 326.341858,348.641083 C322.099762,343.947906 317.050934,341.359802 310.323761,343.017334 C306.171143,344.040527 301.906677,344.905182 296.582001,344.609131 C303.817505,349.655365 310.280670,354.123810 317.008820,358.295807 C332.722504,368.039520 344.319305,381.976562 355.092468,396.744873 C371.421204,419.128998 378.584900,445.011963 384.276978,471.506256 C387.939606,488.554291 390.978973,505.711792 393.394836,522.981628 C393.646637,524.781677 394.265350,526.530334 394.856934,528.651428 C391.638702,529.000000 388.277435,529.000000 384.348389,528.596558 C380.483978,507.212616 376.914276,486.290985 372.420715,465.517426 C366.603180,438.623138 356.711090,413.721924 338.700592,392.517059 C337.157776,390.700592 335.910828,388.464935 332.427795,387.636047 C334.202362,398.110657 329.797699,406.499634 325.270447,414.784668 C321.500366,421.683929 320.715149,428.957550 323.828186,435.932831 C331.420929,452.945435 329.531403,469.848358 324.899963,487.068695 C321.149933,501.011993 316.621246,514.761475 314.000000,529.000000 C310.638702,529.000000 307.277435,529.000000 303.377563,528.585815 C298.676758,503.442596 294.005585,478.810669 287.460114,454.589691 C278.943878,423.076202 267.310883,392.919647 247.599136,366.455597 C242.553406,359.681458 237.287659,353.080811 229.975800,347.727112 C227.429138,354.054108 226.762772,360.327942 225.189941,366.359436 C222.876389,375.231537 220.358704,384.019135 224.990051,392.949738 C225.484787,393.903748 225.415817,395.255157 225.310440,396.394684 C225.042679,399.290222 226.186874,401.451538 228.140427,403.516876 C235.118439,410.894135 241.622437,418.758240 248.975143,425.732422 C257.089478,433.428955 259.329895,441.972931 255.560852,452.367035 C253.188400,458.909637 254.287201,465.172058 257.736084,471.056091 C259.753326,474.497681 261.901245,477.869263 264.124207,481.182556 C274.601440,496.798615 285.229126,512.318481 294.000000,529.000000 C289.975464,529.000000 285.950897,529.000000 281.419556,528.640015 C280.367767,527.077576 279.914276,525.822998 279.263763,524.680664 C271.432678,510.930542 262.669403,497.766937 253.553833,484.857605 C245.144928,472.949036 240.590958,460.571075 246.129578,446.060089 C247.150711,443.384766 247.342468,440.382782 245.206284,438.017426 C237.541962,429.531036 229.786606,421.126862 221.798019,412.399139 C219.609192,414.913696 217.948715,416.953491 216.149887,418.862915 C210.918503,424.416016 209.486786,430.877747 212.711273,437.694092 C215.088608,442.719543 215.418182,447.863678 215.667145,453.149750 C216.857635,478.428284 216.418991,503.714233 216.000000,529.000000 C212.969406,529.000000 209.938812,529.000000 206.342545,528.542358 C205.776871,508.447327 205.776871,488.809967 205.776871,468.023285 C200.847046,471.792877 197.023392,471.886169 192.589386,468.310394 C192.013168,476.271667 187.031723,476.687042 181.410599,476.323608 C174.746384,475.892700 168.652390,478.109436 162.733017,480.864655 C158.967133,482.617584 155.394547,485.023163 151.452240,486.094879 C147.265594,487.233063 145.985748,489.787445 145.481583,493.489410 C143.871506,505.311829 141.529007,517.041077 141.000000,529.000000 C137.638718,529.000000 134.277420,529.000000 130.458069,529.000000 M348.458832,305.944336 C355.498444,297.438873 358.831604,287.570801 359.808533,276.646271 C361.056519,262.690613 357.988464,249.536789 353.265656,236.605743 C351.469666,231.688431 348.401001,226.734955 354.409607,221.934296 C349.572052,220.667618 348.103088,217.674103 347.549530,213.671448 C346.917206,209.099167 344.980408,204.991043 340.956635,202.345993 C336.478088,199.401962 333.435699,195.352249 331.177979,190.599411 C329.012329,186.040390 325.690887,182.425262 320.919373,180.896927 C317.162170,179.693481 313.962219,178.082184 311.623352,174.514969 C308.970184,177.327026 305.986053,178.179062 302.536316,178.624252 C293.126953,179.838547 283.909637,182.042068 274.900421,185.115097 C260.488922,190.030807 250.361008,199.476303 244.435623,213.458633 C239.576416,224.925018 237.542786,237.053207 236.364624,249.335846 C234.747040,266.199432 234.029816,283.180725 229.230148,299.590088 C228.819534,300.993927 228.128036,302.358673 229.593964,303.715210 C236.471619,310.079773 238.137680,318.751740 240.276993,327.331085 C241.523804,332.331146 237.057892,337.571808 240.653610,341.937622 C243.908463,345.889526 247.887054,349.285706 251.118103,353.329041 C251.742081,354.109894 252.370956,354.886871 252.994125,355.668396 C261.089111,365.820282 273.804230,369.063416 285.694183,364.008209 C292.892975,360.947510 293.111755,360.374603 291.125854,352.919495 C290.524567,350.662140 290.201691,348.521545 287.988922,347.031311 C286.254639,345.863281 285.845978,343.747070 285.833099,341.663391 C285.800171,336.333679 285.667297,331.002716 285.745758,325.674774 C285.817963,320.771851 288.568024,318.323669 293.151031,319.702118 C300.697479,321.971954 308.167084,321.874390 315.841187,320.705780 C327.887512,318.871429 339.404175,316.046906 348.458832,305.944336 M312.733917,490.355957 C318.260925,472.584717 321.243744,454.987915 313.050781,436.917633 C309.528564,429.149109 310.625702,420.598022 314.298553,412.701843 C316.122314,408.780975 318.075470,404.919708 320.001678,401.047150 C322.268982,396.488708 322.688538,391.655640 320.996704,386.984619 C318.607880,380.389191 315.302551,374.192657 310.466125,368.989258 C309.309937,367.745270 308.369934,365.949890 306.224762,366.023895 C304.978271,371.733398 306.074249,377.363251 306.082184,382.981537 C306.130554,417.294403 306.238678,451.607147 306.339508,485.919952 C306.353455,490.666412 307.529572,495.158234 309.410706,500.898407 C310.753632,496.765717 311.668121,493.951569 312.733917,490.355957 M270.202026,381.488098 C280.466278,399.355560 287.453857,418.646423 294.636414,437.949188 C296.038391,416.209900 294.567139,394.628693 294.814972,372.142609 C285.629883,376.111084 277.283844,377.664429 268.107727,377.121674 C268.899628,378.841339 269.371338,379.865753 270.202026,381.488098 z" />
        <path fill="#000000" d="M359.460632,529.000000 C358.667053,517.851685 356.089020,507.008911 354.311462,496.072693 C351.516235,478.875824 348.053680,461.792267 344.028564,444.831635 C343.913574,444.347107 343.797272,443.857544 343.747681,443.363678 C343.405792,439.957123 343.830933,436.683502 347.803162,435.938446 C351.712494,435.205139 353.547516,437.875519 354.279724,441.312042 C356.665100,452.507202 359.190033,463.678192 361.281799,474.929047 C364.584198,492.691650 367.578735,510.511505 370.851807,528.653564 C367.307098,529.000000 363.614166,529.000000 359.460632,529.000000 z" />

        {/* Eyes — follow mouse direction */}
        <g
          transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}
          style={{ transition: "transform 80ms ease-out" }}
        >
          <path fill="#000000" d="M328.078217,238.218918 C332.105255,235.566116 335.182129,236.043655 337.331848,240.172775 C339.094269,243.557953 338.412201,246.594376 335.789703,249.191498 C333.817261,251.144836 331.482300,251.766327 329.134247,249.889557 C326.297791,247.622406 325.147125,244.692200 326.462830,241.119522 C326.800415,240.202881 327.364838,239.369797 328.078217,238.218918 z" />
          <path fill="#000000" d="M307.132446,252.113312 C303.824402,253.288651 301.549255,252.200592 299.978333,249.726303 C297.863953,246.396133 298.196503,243.025803 300.774933,240.129761 C302.643860,238.030640 305.224335,237.773849 307.542480,239.301590 C310.707977,241.387787 311.240143,244.565491 310.346619,248.067398 C309.918884,249.743698 308.924805,251.027405 307.132446,252.113312 z" />
        </g>
      </svg>
    </div>
  );
}

function EspressoMachine({ className = "" }: { className?: string }) {
  const bodyFill   = "#f5ede0";
  const bodyStroke = "#2a1a0e";
  const tray       = "#c4a278";
  const needleClr  = "#c8764a";
  const coffee     = "#6b3a1f";

  return (
    <svg
      width="170"
      height={129}
      viewBox="0 0 180 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`scale-75 origin-bottom translate-x-[16px] ${className}`.trim()}
      aria-hidden
    >
      {/* Drip tray / base */}
      <rect x="10" y="122" width="160" height="12" rx="6" fill={tray} />

      {/* Main body */}
      <rect x="14" y="10" width="152" height="114" rx="22" fill={bodyFill} stroke={bodyStroke} strokeWidth="5" />

      {/* Top lid / tab handle */}
      <rect x="76" y="3" width="28" height="13" rx="4" fill={bodyFill} stroke={bodyStroke} strokeWidth="3.5" />

      {/* Pressure gauge — left, r=11 (0.5× original), shifted up to cy=48 */}
      <circle cx="58" cy="48" r="11" fill={bodyFill} stroke={bodyStroke} strokeWidth="2" />
      {/* Scale arc — endpoints scaled 0.5× around original center (58,60), then shifted up 12 */}
      <path d="M49.5 53.5 A11 11 0 1 1 66.5 53.5" stroke={bodyStroke} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
      {/* Terracotta needle */}
      <line x1="58" y1="48" x2="64.5" y2="41.5" stroke={needleClr} strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="58" cy="48" r="2" fill={bodyStroke} />

      {/* Right oval knob — 75% of original (rx=7, ry=10.5), shifted up to cy=48 */}
      <ellipse cx="128" cy="48" rx="7" ry="10.5" fill={bodyFill} stroke={bodyStroke} strokeWidth="2" />
      <line x1="128" y1="43" x2="128" y2="53" stroke={bodyStroke} strokeWidth="1.5" strokeLinecap="round" />

      {/* Group head block */}
      <rect x="81" y="64" width="18" height="24" rx="3" fill={bodyStroke} />

      {/* Portafilter arm — extends right */}
      <rect x="97" y="70" width="28" height="8" rx="4" fill={bodyStroke} />

      {/* Espresso drip — spans from group head bottom (y=88) to cup top (y=105) */}
      <path className="animate-drip" d="M90 88V103" stroke={coffee} strokeWidth="2.5" strokeLinecap="round" />

      {/* Demitasse cup — base bottom aligns with body inner edge y=121.5 */}
      <path d="M77 105H103L100 118H80L77 105Z" fill={bodyFill} stroke={bodyStroke} strokeWidth="2" strokeLinejoin="round" />
      {/* Cup base — bottom at y=121.5 (body inner bottom) */}
      <rect x="75" y="118" width="30" height="3.5" rx="1.5" fill={bodyStroke} />
    </svg>
  );
}

function BarCup() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-[0.65] origin-bottom"
      aria-hidden
    >
      <path
        d="M10 10H50L45 30L35 45H25L15 30L10 10Z"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
      <path d="M50 15H55V30H45" stroke="black" strokeWidth="2" />
      <rect x="25" y="45" width="10" height="4" fill="black" />
      <path
        d="M22 49H38L45 80H15L22 49Z"
        stroke="black"
        strokeWidth="2"
        fill="white"
      />
    </svg>
  );
}

function BarSteamingCup({ className = "" }: { className?: string }) {
  return (
    <div className={`nh-barSteamCup relative ${className}`.trim()} aria-hidden="true">
      <div className="nh-barSteam">
        <span className="nh-steamWisp nh-animateSteam" style={{ animationDelay: "0s" }}>
          <svg viewBox="0 0 20 64" className="nh-steamSvg" aria-hidden>
            <path
              d="M10 2 C4 10,16 18,10 26 C4 34,16 42,10 50 C4 58,16 62,10 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="nh-steamWisp nh-animateSteam" style={{ animationDelay: "1.2s" }}>
          <svg viewBox="0 0 20 64" className="nh-steamSvg" aria-hidden>
            <path
              d="M10 2 C16 10,4 18,10 26 C16 34,4 42,10 50 C16 58,4 62,10 62"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <svg
        viewBox="0 0 100 90"
        className="w-full h-full"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden
      >
        <path
          d="M15 35 H75 L70 78 Q68 85 60 85 H30 Q22 85 20 78 Z"
          fill="none"
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M75 42 Q90 42 90 55 Q90 68 75 68"
          fill="none"
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx="45" cy="38" rx="28" ry="3" className="nh-coffeeFill" opacity="0.85" />
        <path
          d="M30 50 Q35 55 40 50"
          stroke="#111111"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export default function NewHomePage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const parallaxRef = useRef<HTMLElement | null>(null);

  const { itemRefs, visible } = useScrollRevealStagger(MENU_PROJECTS.length);

  const typedHeadlineLines = useMemo(() => ["Hi, I’m Anny.", "A designer & builder."], []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = parallaxRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        el.style.setProperty("--nh-parallax", `${Math.min(24, y * 0.04)}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <main ref={parallaxRef} className="nh-page">
      <div className="nh-grain" aria-hidden />

      {/* HERO */}
      <section className="nh-hero">
        <div className="nh-heroFrame" aria-hidden />
        <div className="nh-heroTop">
          <div className="nh-heroInnerCentered">
            <div className="nh-heroStack">
              <Lamp />

              <h1 className="nh-heroTitle">
                <span
                  className="nh-heroType"
                  style={{
                    ["--nh-ch" as never]: Math.max(18, ...typedHeadlineLines.map((line) => line.length)),
                    ["--nh-delay" as never]: "80ms",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  {typedHeadlineLines.map((line, idx) => (
                    <span
                      key={line}
                      className="nh-heroTypeLine"
                      style={{
                        ["--nh-line-ch" as never]: line.length,
                        ["--nh-line-delay" as never]: idx === 0 ? "80ms" : "1180ms",
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="nh-heroSub">
              Product Designer focused on B2B2C platforms and operational systems
              </p>

              <p className="nh-preHours" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
                Let’s turn complexity into clarity.
              </p>

              <button
                type="button"
                className="nh-scrollCue"
                style={{ fontFamily: "var(--font-plex-mono), monospace" }}
                aria-controls="menu"
                onClick={() => {
                  document.getElementById("menu")?.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start",
                  });
                }}
              >
                <span className="nh-scrollArrow" aria-hidden>
                  ↓
                </span>
                <span>today’s menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Coffee bar (copied from current home) */}
        <div className="nh-heroCoffeeBar">
          <div className="nh-coffeeBarTop">
            <div className="nh-coffeeBarRig">
              {/* myavatar2 — left of animated avatar, eyes track mouse */}
              <MyAvatar2 />

              
              <EspressoMachine />
              <div className="flex gap-0 -space-x-3">
                <BarCup />
                <BarCup />
              </div>
              <BarSteamingCup className="ml-2 h-10 w-10 text-black/80" />
            </div>
          </div>
          <div className="nh-coffeeBarCounter" aria-hidden />
        </div>
      </section>

      {/* PROJECTS / MENU */}
      <section id="menu" className="nh-menuSection">
        <div className="nh-container">
          <div className="nh-menuHeader">
            <div className="nh-betweenDivider" aria-hidden>
              <span className="nh-betweenRule" />
              <svg viewBox="0 0 24 24" className="nh-betweenCup" aria-hidden>
                <path
                  d="M6 10 H16 L15 18 Q14.5 20 13 20 H9 Q7.5 20 7 18 Z M16 12 Q20 12 20 15 Q20 18 16 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span className="nh-betweenRule" />
            </div>

            <p className="nh-menuKicker" style={{ fontFamily: "var(--font-plex-mono), monospace" }}>
              today’s
            </p>
            <h2 className="nh-menuTitleBig" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              Menu
            </h2>
          </div>

          <div className="nh-menuBoard">
            <ol className="nh-menuList">
              {MENU_PROJECTS.map((p, idx) => (
                <li
                  key={p.id}
                  data-idx={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`nh-menuItem ${visible[idx] ? "nh-menuItem--in" : ""}`}
                  style={{ transitionDelay: `${prefersReducedMotion ? 0 : idx * 90}ms` }}
                >
                  <Link href={p.href} className="nh-menuLink">
                    <div className="nh-menuRow">
                      <span className="nh-menuItemTitle">{p.title}</span>
                      <span className="nh-menuLeader" aria-hidden />
                      <span className="nh-menuYear">{`’${String(p.year).slice(-2)}`}</span>
                    </div>
                    <div className="nh-flavor">{p.flavorNotes}</div>
                    <div className="nh-tags">
                      {p.badges.map((b) => (
                        <span key={b} className="nh-tag">
                          {b}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

    </main>
  );
}

