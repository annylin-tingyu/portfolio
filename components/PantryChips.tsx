"use client";

import { useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "platform", label: "Platform" },
  { id: "operations", label: "Operations" },
  { id: "growth", label: "Growth" },
  { id: "foundations", label: "Foundations" },
] as const;

export function PantryChips() {
  const [activeId, setActiveId] = useState<string>("all");

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pantry categories">
      {CATEGORIES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={activeId === id}
          className={`pantry-chip rounded-lg px-4 py-2 text-[13px] font-medium ${
            activeId === id ? "pantry-chip--active" : ""
          }`}
          onClick={() => setActiveId(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
