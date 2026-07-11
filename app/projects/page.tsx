import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/SubPageShell";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Kevin van der Poll",
  description: "A running list of what Kevin van der Poll is building.",
};

export default function ProjectsPage() {
  // Live projects lead the list; the data file stays in canonical year order,
  // so this is a stable partition — relative order within each group holds.
  const ordered = [
    ...projects.filter((project) => project.href),
    ...projects.filter((project) => !project.href),
  ];

  return (
    <SubPageShell title="Projects" wide>
      <p className="projects-intro">
        Things I&apos;ve shipped — tools, experiments, and whatever else caught my attention.
      </p>
      <ol className="projects-list">
        {ordered.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isLinked = !!project.href;
          const inner = (
            <div className="project-row-inner">
              <span className="project-num">{num}</span>
              <div className="project-content">
                <span className="project-name">
                  {project.name}
                  {isLinked && <span className="project-arrow"> ↗</span>}
                </span>
                <span className="project-desc">{project.description}</span>
              </div>
              <div className="project-meta">
                {project.year && <span className="project-year">{project.year}</span>}
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          );

          return (
            <li key={project.slug} className="project-row">
              {isLinked ? (
                <Link href={`/projects/${project.slug}`}>{inner}</Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>
    </SubPageShell>
  );
}
