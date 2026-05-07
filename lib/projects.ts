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
    title: "CRM Marketplace Platform",
    category: "Case 02",
    description:
      "Scaling a CRM from Reservations to a Loyalty and Commerce Platform",
    image: "https://picsum.photos/800/400?random=11",
    year: "—",
  },
  {
    slug: "brand-identity-acme",
    title: "Acme Brand Identity",
    category: "Branding",
    description:
      "Full visual identity and brand system for a sustainable fashion startup.",
    image: "https://picsum.photos/800/600?random=1",
    year: "2024",
  },
  {
    slug: "app-redesign",
    title: "Finance App Redesign",
    category: "UI/UX",
    description:
      "End-to-end redesign of a mobile banking app focused on clarity and trust.",
    image: "https://picsum.photos/800/600?random=2",
    year: "2024",
  },
  {
    slug: "editorial-magazine",
    title: "Editorial & Art Direction",
    category: "Editorial",
    description:
      "Art direction and layout design for an independent culture magazine.",
    image: "https://picsum.photos/800/600?random=3",
    year: "2023",
  },
  {
    slug: "packaging-craft",
    title: "Craft Beer Packaging",
    category: "Packaging",
    description:
      "Label and packaging design for a local craft brewery series.",
    image: "https://picsum.photos/800/600?random=4",
    year: "2023",
  },
  {
    slug: "website-saas",
    title: "SaaS Marketing Site",
    category: "Web Design",
    description:
      "Marketing website and design system for a B2B productivity tool.",
    image: "https://picsum.photos/800/600?random=5",
    year: "2023",
  },
  {
    slug: "motion-reel",
    title: "Motion & Title Sequence",
    category: "Motion",
    description:
      "Opening titles and motion graphics for a documentary series.",
    image: "https://picsum.photos/800/600?random=6",
    year: "2022",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
