"use client";

import { useEffect, type ReactNode } from "react";

export function ArchiveHomeShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="archive-home-root flex h-[calc(100vh-56px)] flex-col overflow-hidden">
      <div className="min-h-0 flex-1 flex flex-col">{children}</div>
    </div>
  );
}
