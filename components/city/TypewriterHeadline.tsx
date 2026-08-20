"use client";

import { useEffect, useState } from "react";

export function TypewriterHeadline() {
  const lines = [
    {
      segments: [
        { text: "Hi, I" },
        { text: "\u2019m" },
        { text: " " },
        { text: "Anny", className: "text-[#569AEB]" },
        { text: "." },
      ] as { text: string; className?: string }[],
      break: true,
    },
    {
      segments: [{ text: "A designer & builder." }] as {
        text: string;
        className?: string;
      }[],
      break: false,
    },
  ];

  const [typed, setTyped] = useState<string>("");
  const [lineIndex, setLineIndex] = useState(0);
  const [segIndex, setSegIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = lines
    .map((line) => line.segments.map((s) => s.text).join(""))
    .join("\n");

  useEffect(() => {
    if (paused) {
      const pauseTimer = setTimeout(() => setPaused(false), 600);
      return () => clearTimeout(pauseTimer);
    }

    const line = lines[lineIndex];
    if (!line) {
      const blink = setInterval(() => setShowCursor((v) => !v), 530);
      return () => clearInterval(blink);
    }

    const segment = line.segments[segIndex];
    if (!segment) {
      if (line.break) setPaused(true);
      setLineIndex((i) => i + 1);
      setSegIndex(0);
      setCharIndex(0);
      return;
    }

    const text = segment.text;
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setTyped((prev) => prev + text[charIndex]);
        setCharIndex((i) => i + 1);
      }, 80);
      return () => clearTimeout(timer);
    }

    setSegIndex((i) => i + 1);
    setCharIndex(0);
  }, [lineIndex, segIndex, charIndex, paused]);

  const rendered: React.ReactNode[] = [];
  let consumed = 0;
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    for (const segment of line.segments) {
      const segText = segment.text;
      if (typed.length > consumed) {
        const visible = segText.slice(0, Math.max(0, typed.length - consumed));
        rendered.push(
          <span key={`${li}-${segText}`} className={segment.className || ""}>
            {visible}
          </span>
        );
      }
      consumed += segText.length;
    }
    if (li < lines.length - 1 && typed.length > consumed) {
      rendered.push(<br key={`br-${li}`} />);
    }
  }

  return (
    <span aria-label={fullText}>
      {rendered}
      <span
        className={`inline-block w-[0.08em] bg-current align-middle transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "1em" }}
        aria-hidden="true"
      />
    </span>
  );
}
