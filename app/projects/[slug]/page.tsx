import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubPageShell } from "@/components/SubPageShell";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.filter((project) => project.href).map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug && project.href);
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return {
    title: project ? `${project.name} — Kevin van der Poll` : "Project — Kevin van der Poll",
    description: project?.description,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project || !project.href) {
    notFound();
  }

  return (
    <SubPageShell title={project.name}>
      <p>{project.description}</p>
      <p>
        <a href={project.href} target="_blank" rel="noopener noreferrer">
          Visit site →
        </a>
      </p>
    </SubPageShell>
  );
}
