import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubPageShell } from "@/components/SubPageShell";
import { projects } from "@/lib/projects";

// Info pages only exist for projects with a live site — unlinked entries
// have nothing to preview and stay plain rows on the list.
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
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project || !project.href) {
    notFound();
  }

  return (
    <SubPageShell
      title={project.name}
      wide
      backHref="/projects"
      backLabel="← projects"
      titleTransition={`project-${project.slug}`}
    >
      <div className="project-info-meta">
        {project.year && <span className="project-year">{project.year}</span>}
        <ul className="project-tags project-tags--row">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <p className="project-info-desc">{project.description}</p>
      <a
        className="project-info-visit"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        visit site ↗
      </a>
      <div className="project-preview">
        {project.embeddable === false ? (
          <div className="project-preview__blocked">
            <p>live preview blocked by this site&apos;s security headers</p>
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              open {project.name} directly ↗
            </a>
          </div>
        ) : (
          <iframe
            className="project-preview__frame"
            src={project.href}
            title={`${project.name} preview`}
            loading="lazy"
          />
        )}
      </div>
    </SubPageShell>
  );
}
