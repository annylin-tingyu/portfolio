"use client";

import { CSSProperties, useCallback, useEffect, useRef } from "react";

type PrototypeFrameProps = {
  src: string;
  title: string;
  /** Fallback height used before the content reports its real size. */
  initialHeight?: number;
  /** Extra styles merged onto the iframe (e.g. maxWidth, pointerEvents). */
  style?: CSSProperties;
};

/**
 * Same-origin iframe that keeps its height in sync with the embedded
 * document, so responsive fragments never clip or leave dead space as
 * the viewport or the content (fonts, icons) changes.
 */
export function PrototypeFrame({ src, title, initialHeight = 800, style }: PrototypeFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const attach = useCallback(() => {
    const frame = frameRef.current;
    const body = frame?.contentDocument?.body;
    if (!frame || !body) return;

    const sync = () => {
      frame.style.height = `${body.scrollHeight}px`;
    };
    sync();

    observerRef.current?.disconnect();
    const observer = new ResizeObserver(sync);
    observer.observe(body);
    observerRef.current = observer;
  }, []);

  useEffect(() => {
    attach();
    return () => observerRef.current?.disconnect();
  }, [attach]);

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      style={{ width: "100%", height: initialHeight, border: 0, display: "block", ...style }}
      scrolling="no"
      onLoad={attach}
    />
  );
}
