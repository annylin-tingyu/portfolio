"use client";

import { Footer } from "@/components/Footer";

/** Stable markup for SSR/client — avoid client-only wrappers (see PageTransition removal) that mismatch Next’s client page boundary. */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
