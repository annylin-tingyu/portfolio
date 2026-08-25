"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "builtWithBadgeDismissed";

/**
 * Small frosted-glass credit pill, bottom-right of the /city home page.
 * Honest attribution (links to Claude Code), not a vendor-injected badge:
 * it matches the site's own glass styling and is dismissible (persisted).
 */
export function BuiltWithBadge() {
  // Start hidden so nothing flashes before we've read the dismissal state.
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setHidden(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      <div
        className="inline-flex items-center gap-2 rounded-full border py-1.5 pl-3 pr-2 text-[13px] font-medium text-charcoal/70 shadow-sm"
        style={{
          borderColor: "rgba(117,115,114,0.15)",
          backgroundColor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <a
          href="https://claude.com/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-none items-center gap-1.5 transition-colors hover:text-charcoal"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-sky">
            <path d="M12 0c.5 5.6 5.9 11 11.5 11.5v.9C17.9 12.9 12.5 18.4 12 24c-.5-5.6-5.9-11-11.5-11.6v-.9C6.1 11 11.5 5.6 12 0Z" />
          </svg>
          Built with Claude Code
        </a>
        <span className="h-3.5 w-px" style={{ backgroundColor: "rgba(73,80,87,0.2)" }} aria-hidden />
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="inline-flex size-4 cursor-none items-center justify-center rounded-full text-charcoal/45 transition-colors hover:text-charcoal"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
