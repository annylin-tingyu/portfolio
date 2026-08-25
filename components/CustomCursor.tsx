"use client";

import { useEffect, useState } from "react";

const SIZE = 22;

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        background: "transparent",
        // Two-tone outline so the ring stays visible on light and dark
        // backgrounds without mix-blend (which breaks over backdrop-filter).
        border: "1.5px solid rgba(17,17,17,0.7)",
        boxShadow: "0 0 0 1.5px rgba(255,255,255,0.55)",
      }}
    />
  );
}
