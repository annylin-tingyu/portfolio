import Link from "next/link";
import Image from "next/image";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-border/60 bg-background transition-all hover:border-border hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
          {project.category} · {project.year}
        </p>
        <h3 className="link-underline link-underline--lift font-display text-xl font-semibold text-foreground group-hover:text-accent-hover-text">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
