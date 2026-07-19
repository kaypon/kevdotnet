"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";

type Filter = "all" | "art" | "tech";

function projectLink(project: Project): string | null {
  if (project.route) return project.route;
  if (project.href) return `/projects/${project.slug}`;
  return null;
}


export function ProjectsList() {
  const [filter, setFilter] = useState<Filter>("all");

  const ordered = projects.filter(
    (p) => filter === "all" || p.category.includes(filter)
  );

  return (
    <>
      <div className="projects-filter">
        {(["all", "art", "tech"] as Filter[]).map((f) => (
          <button
            key={f}
            className={`projects-filter__btn${filter === f ? " projects-filter__btn--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <ol className="projects-list">
        {ordered.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          const link = projectLink(project);
          const inner = (
            <div className="project-row-inner">
              <span className="project-num">{num}</span>
              <div className="project-content">
                <span className="project-name">
                  {project.name}
                  {link && <span className="project-arrow">↗</span>}
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
              {link ? <Link href={link}>{inner}</Link> : inner}
            </li>
          );
        })}
      </ol>
    </>
  );
}
