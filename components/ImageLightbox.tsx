"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Inline image that opens a full-screen, readable overlay on click.
 * Used for wide diagrams (e.g. the auto-assignment flow) that are legible
 * at full size but too small in the article column.
 */
export function ImageLightbox({ src, alt, width, height }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-none border-0 bg-transparent p-0"
        aria-label={`Enlarge diagram: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" unoptimized />
        <span
          className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            fontFamily: "var(--font-plex-mono), monospace",
            color: "#6B6B6B",
            backgroundColor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(117,115,114,0.15)",
          }}
        >
          <span aria-hidden>⤢</span> Click to enlarge
        </span>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex cursor-none items-center justify-center p-4 md:p-10"
            style={{ backgroundColor: "rgba(255,255,255,0.82)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-10 cursor-none items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: "rgba(17,17,17,0.06)", color: "#3a3a3a", border: "1px solid rgba(117,115,114,0.15)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="max-h-[90vh] max-w-[95vw] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-auto"
                style={{ width: "min(1600px, 95vw)", maxWidth: "none" }}
                priority
                unoptimized
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
