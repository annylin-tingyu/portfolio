"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    if (isLanding) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLanding]);

  if (isLanding) {
    return (
      <div className="flex h-[calc(100vh-56px)] flex-col overflow-hidden">
        <PageTransition className="min-h-0 flex-1 flex flex-col">
          {children}
        </PageTransition>
      </div>
    );
  }

  return (
    <>
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
