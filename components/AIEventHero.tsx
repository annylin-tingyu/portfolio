import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ollieSrc = `${basePath}/ollie-computer.svg`;

const bubbles = [
  {
    id: "golf",
    title: "Thursday Night Golf",
    sub: "8:00PM · Los Angeles",
    tag: "Physical · Free",
    tagColor: "bg-[#E1F5EE] text-[#0F6E56]",
    style: "top-[10%] left-[4%]",
    animationClass: "ai-event-hero-float-1",
  },
  {
    id: "run",
    title: "PCH Run Club",
    sub: "8:00AM · Beach · Casual",
    tag: "Running · Casual",
    tagColor: "bg-[#EEEDFE] text-[#534AB7]",
    style: "top-[8%] right-[4%]",
    animationClass: "ai-event-hero-float-2",
  },
  {
    id: "hiking",
    title: "Hiking at Griffith Park",
    sub: "7:00AM · Los Angeles",
    tag: "Outdoors · Free",
    tagColor: "bg-[#EAF3DE] text-[#3B6D11]",
    style: "bottom-[18%] left-[5%]",
    animationClass: "ai-event-hero-float-1",
  },
  {
    id: "surprise",
    title: "Surprise me!",
    sub: "Let Ollie pick for you",
    tag: "AI-powered",
    tagColor: "bg-[#FAEEDA] text-[#BA7517]",
    style: "bottom-[18%] right-[5%]",
    animationClass: "ai-event-hero-float-3",
  },
];

export function AIEventHero() {
  return (
    <div
      className="relative mx-auto w-full max-w-[800px] overflow-hidden rounded-2xl bg-[#F0F8FF] h-[min(574px,85svh)] min-h-[320px] sm:h-[574px] sm:min-h-0"
    >
      <div
        className="absolute left-1/2 top-1/2 size-[min(400px,88vw)] max-h-[88vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6FC9E8] opacity-10"
        aria-hidden
      />

      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`absolute ${b.style} ${b.animationClass} w-[min(200px,42vw)] rounded-2xl border border-[#e8e8e4] bg-white p-4 shadow-sm`}
        >
          <p className="mb-0.5 text-xs font-semibold text-[#151E52]">{b.title}</p>
          <p className="mb-2 text-xs text-[#888780]">{b.sub}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${b.tagColor}`}>
            {b.tag}
          </span>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 w-[min(320px,72vw)] -translate-x-1/2 -translate-y-[55%]">
        <Image
          src={ollieSrc}
          alt="Ollie planning events at a computer"
          width={320}
          height={320}
          className="h-auto w-full"
          priority
        />
      </div>
    </div>
  );
}
