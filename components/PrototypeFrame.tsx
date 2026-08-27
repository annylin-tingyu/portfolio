"use client";

import { CSSProperties, useCallback, useEffect, useRef } from "react";

type PrototypeFrameProps = {
  src: string;
  title: string;
  /** Fallback height used before the content reports its real size. */
  initialHeight?: number;
  /** Extra styles merged onto the iframe (e.g. maxWidth, pointerEvents). */
  style?: CSSProperties;
  /**
   * When set, the embedded document is rendered at this fixed pixel width and
   * uniformly scaled down (transform: scale) whenever the container is narrower,
   * so the demo never reflows — it just shrinks to fit. Above this width it
   * behaves normally (full-width, no transform).
   */
  scaleToFitWidth?: number;
};

/**
 * Same-origin iframe that keeps its height in sync with the embedded
 * document, so responsive fragments never clip or leave dead space as
 * the viewport or the content (fonts, icons) changes.
 */
export function PrototypeFrame({
  src,
  title,
  initialHeight = 800,
  style,
  scaleToFitWidth,
}: PrototypeFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const sync = useCallback(() => {
    const frame = frameRef.current;
    const wrap = wrapRef.current;
    const body = frame?.contentDocument?.body;
    if (!frame || !wrap || !body) return;

    if (scaleToFitWidth) {
      const containerW = wrap.clientWidth;
      const scale = Math.min(1, containerW / scaleToFitWidth);
      if (scale < 1) {
        // Fixed-width, uniformly scaled to fit (no reflow).
        frame.style.width = `${scaleToFitWidth}px`;
        frame.style.marginLeft = "0";
        frame.style.marginRight = "0";
        frame.style.transformOrigin = "top left";
        frame.style.transform = `scale(${scale})`;
        frame.style.height = `${body.scrollHeight}px`;
        // Collapse the wrapper to the scaled height so there's no dead space.
        wrap.style.height = `${Math.ceil(body.scrollHeight * scale)}px`;
        return;
      }
      // Wide enough: reset to normal, full-width behavior.
      frame.style.width = "100%";
      frame.style.marginLeft = "";
      frame.style.marginRight = "";
      frame.style.transform = "none";
      frame.style.transformOrigin = "";
      wrap.style.height = "";
    }

    frame.style.height = `${body.scrollHeight}px`;
  }, [scaleToFitWidth]);

  const attach = useCallback(() => {
    const frame = frameRef.current;
    const wrap = wrapRef.current;
    const body = frame?.contentDocument?.body;
    if (!frame || !wrap || !body) return;

    observerRef.current?.disconnect();
    const observer = new ResizeObserver(() => sync());
    observer.observe(body);
    observer.observe(wrap); // re-sync when the container width changes
    observerRef.current = observer;
    sync();
  }, [sync]);

  useEffect(() => {
    attach();
    return () => observerRef.current?.disconnect();
  }, [attach]);

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", ...(scaleToFitWidth ? { overflow: "hidden" } : null) }}
    >
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        style={{ width: "100%", height: initialHeight, border: 0, display: "block", ...style }}
        scrolling="no"
        onLoad={attach}
      />
    </div>
  );
}
