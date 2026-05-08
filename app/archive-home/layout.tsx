import type { ReactNode } from "react";
import { ArchiveHomeShell } from "./ArchiveHomeShell";

/**
 * Fixed viewport + no footer (via globals.css body:has) for the archived mono home.
 * Overflow locks run in the client shell; pathname is not read (avoids hydration mismatches).
 */
export default function ArchiveHomeLayout({ children }: { children: ReactNode }) {
  return <ArchiveHomeShell>{children}</ArchiveHomeShell>;
}
