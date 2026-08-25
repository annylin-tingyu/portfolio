"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

/** Routes that render full-viewport and manage their own bottom edge (no global footer). */
const NO_FOOTER_PATHS = ["/about"];

/** Stable markup for SSR/client — avoid client-only wrappers (see PageTransition removal) that mismatch Next’s client page boundary. */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname != null && NO_FOOTER_PATHS.includes(pathname);
  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
