import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  if (slug === "crm-marketplace") {
    return (
      <CaseStudyLayout
        category={project.category}
        title={project.title}
        description={project.description}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/#work"
        className="link-underline link-underline--lift mb-12 inline-block text-sm font-medium text-muted hover:text-accent-hover-text"
      >
        ← Back to work
      </Link>

      <header className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted">
          {project.category} · {project.year}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          {project.description}
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-zinc-200 dark:bg-zinc-800">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={800}
          className="w-full object-cover"
          priority
        />
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/#work"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          View all work
        </Link>
        <a
          href="/#contact"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
