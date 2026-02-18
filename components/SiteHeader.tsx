"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { ReadingModeHeader } from "@/components/ReadingModeHeader";
const CASE_STUDY_PATHS = ["/projects/crm-marketplace"];

export function SiteHeader() {
  const pathname = usePathname();
  const isCaseStudy = pathname != null && CASE_STUDY_PATHS.includes(pathname);

  if (isCaseStudy) {
    return <ReadingModeHeader />;
  }

  return <Header />;
}
