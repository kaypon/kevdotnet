import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/SubPageShell";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Kevin van der Poll",
  description: "A running list of what Kevin van der Poll is building.",
};

export default function ProjectsPage() {
  return (
    <SubPageShell title="Projects">
      <p>Work in progress — a running list that will keep growing as things ship.</p>
      {projects.map((project) => (
        <p key={project.slug}>
          <strong className="project-title">
            {project.href ? (
              <Link href={`/projects/${project.slug}`}>{project.name}</Link>
            ) : (
              project.name
            )}
            .
          </strong>{" "}
          {project.description}
        </p>
      ))}
    </SubPageShell>
  );
}
