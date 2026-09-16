import type { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
  {
    slug: "auto-table-assignment",
    title: "Auto Table Assignment System",
    category: "Case 01",
    description:
      "Designing flexible automation for real-time restaurant seating.",
    image: "https://picsum.photos/800/400?random=10",
    year: "—",
  },
  {
    slug: "ai-event-planning",
    title: "AI Event Planning",
    category: "Case 03",
    description:
      "Designing an AI event planner that kept users in the conversation and turned group intent into a coordinated outing.",
    image: "https://picsum.photos/800/400?random=12",
    year: "—",
  },
  {
    slug: "crm-marketplace",
    title: "CRM Marketplace",
    category: "Case 02",
    description:
      "Designing a commerce layer for businesses that sell online and serve in person.",
    image: "https://picsum.photos/800/400?random=11",
    year: "—",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
