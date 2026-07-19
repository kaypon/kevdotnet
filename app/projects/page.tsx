import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";
import { ProjectsList } from "@/components/ProjectsList";

export const metadata: Metadata = {
  title: "Projects — Kevin van der Poll",
  description: "A running list of what Kevin van der Poll is building.",
};

export default function ProjectsPage() {
  return (
    <SubPageShell title="Projects" wide>
      <p className="projects-intro">
        Things I&apos;ve shipped — tools, experiments, and whatever else caught my attention.
      </p>
      <ProjectsList />
    </SubPageShell>
  );
}
