import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ollieSrc = `${basePath}/ollie.svg`;

export function ThreePathsDiagram() {
  const paths = [
    {
      label: "Surprise me",
      sub: "No idea yet",
      color: "border-[#BA7517] bg-[#FAEEDA] text-[#633806]",
    },
    {
      label: "Create with me",
      sub: "Partial idea",
      color: "border-[#0F6E56] bg-[#E1F5EE] text-[#04342C]",
    },
    {
      label: "Create manually",
      sub: "Full clarity",
      color: "border-[#5F5E5A] bg-[#F1EFE8] text-[#2C2C2A]",
    },
  ];

  const stroke = "#d4d4d0";

  return (
    <div className="flex flex-col items-center gap-0 my-8 w-full [container-type:inline-size]">
      <p className="text-xs text-center text-mid-gray mb-3 w-full">
        Three paths for three levels of readiness
      </p>

      <div className="flex flex-col items-center mb-[-8px] z-10">
        <Image
          src={ollieSrc}
          alt="Ollie — Owting's planning assistant"
          width={72}
          height={72}
          className="drop-shadow-sm"
        />
      </div>

      <div className="border border-[#534AB7] bg-[#EEEDFE] text-[#26215C] rounded-lg px-6 py-2 text-sm font-medium z-10">
        Tap Ollie in chat
      </div>

      {/* Height = (20/600)×diagram width — same ratio as vertical stems in merge SVG (20 of 600 viewBox units) */}
      <svg
        className="block w-0.5 shrink-0"
        style={{ height: "calc(100cqw * 20 / 600)" }}
        viewBox="0 0 2 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="20"
          stroke={stroke}
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="nonScalingStroke"
        />
      </svg>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
        {paths.map((p, i) => (
          <div
            key={i}
            className={`border rounded-lg px-3 py-3 text-center min-w-0 ${p.color}`}
          >
            <p className="text-sm font-medium">{p.label}</p>
            <p className="text-xs opacity-70 mt-0.5">{p.sub}</p>
          </div>
        ))}
      </div>

      <svg
        className="w-full h-auto overflow-visible text-[#d4d4d0] -mt-px"
        viewBox="0 0 600 44"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <marker
            id="three-paths-outcome-arrow"
            markerWidth="6"
            markerHeight="5"
            refX="5"
            refY="2.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0 0 L6 2.5 L0 5 Z" fill={stroke} />
          </marker>
        </defs>
        <line x1="100" y1="0" x2="100" y2="20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <line x1="300" y1="0" x2="300" y2="20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <line x1="500" y1="0" x2="500" y2="20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <line x1="100" y1="20" x2="500" y2="20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
        <line
          x1="300"
          y1="20"
          x2="300"
          y2="36"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          markerEnd="url(#three-paths-outcome-arrow)"
        />
      </svg>

      <div className="border border-[#534AB7] bg-[#EEEDFE] text-[#26215C] rounded-lg px-6 py-2 text-sm font-medium text-center -mt-1">
        Event created & shared in chat
      </div>
    </div>
  );
}
