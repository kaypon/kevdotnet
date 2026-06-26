import type { Project } from "@/lib/data";
import { EditorialCard } from "./EditorialCard";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const tones = ["ink", "paper", "sand", "paper"] as const;

  return (
    <EditorialCard
      eyebrow={`${String(index + 1).padStart(2, "0")} / ${project.status ?? "Project"}`}
      title={project.title}
      body={project.description}
      meta={project.href ? "Live project" : "Archive entry / link forthcoming"}
      href={project.href}
      linkLabel="Open project"
      tone={tones[index % tones.length]}
      className={`magazine-project-card magazine-project-${index + 1}`}
      headingLevel={3}
    >
      <ul className="card-tag-list" aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </EditorialCard>
  );
}
