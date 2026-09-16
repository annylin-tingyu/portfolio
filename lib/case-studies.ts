export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  /** May contain inline HTML (rendered via dangerouslySetInnerHTML). */
  tagline: string;
  tags: string[];
};

/** Featured case studies for the city home page menu. Slugs map to /projects/[slug]. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "auto-table-assignment",
    title: "Auto table assignment system",
    year: "2025",
    tagline:
      "Automated table logic for 30+ restaurants, reducing manual seating errors.",
    tags: ["B2B", "Workflow", "Operations"],
  },
  {
    slug: "crm-marketplace",
    title: "CRM marketplace",
    year: "2023",
    tagline:
      "A manual loyalty tool rebuilt into a commerce layer, now running across beauty, retail, and fuel.",
    tags: ["CRM", "Commerce", "B2B"],
  },
  {
    slug: "ai-event-planning",
    title: "AI Event Creation",
    year: "2025",
    tagline:
      "Conversational event planner that surfaces personalized suggestions and coordinates group plans without leaving the chat.",
    tags: ["AI", "Social Community", "Chat UX"],
  },
];
