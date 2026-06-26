import type { Metadata } from "next";
import { EditorialCard } from "@/components/EditorialCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteMasthead } from "@/components/SiteMasthead";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work — VAN",
  description: "Selected systems, experiments, and practical digital work.",
};

export default function WorkPage() {
  return (
    <main className="editorial-page magazine-page" id="top">
      <SiteMasthead
        current="work"
        descriptor="Selected evidence / projects / experiments"
        railCopy="Systems, experiments, and useful things. New work gets added when it earns its place."
        railMeta="Four files / more in progress"
      />
      <div className="magazine-canvas work-magazine">
        <section className="magazine-section project-magazine-section">
          <div className="editorial-card-grid work-opening-grid">
            <EditorialCard
              eyebrow="File 01 / Work archive"
              title="The work."
              body="Systems, experiments, and useful things. New work gets added when it earns its place."
              meta="VAN / selected evidence / 2026"
              tone="ink"
              className="work-intro-card"
            />
            <EditorialCard
              eyebrow="Archive index"
              title="Projects"
              body="Some useful. Some strange. All of them made instead of merely discussed."
              meta={`${projects.length} files / links added when earned`}
              tone="sand"
              className="section-title-card"
            />
          </div>
          <div className="editorial-card-grid project-card-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>
        <section className="editorial-card-grid work-exit-grid" aria-label="More from VAN">
          <EditorialCard
            eyebrow="Next file"
            title="Who the fuck is VAN?"
            body="Things made, pressure survived, current obsessions, and a few rules."
            meta="Identity file"
            href="/van"
            linkLabel="Meet VAN"
            tone="sand"
            className="work-van-card"
          />
          <EditorialCard
            eyebrow="Open channel"
            title="Start something."
            body="Bring a useful problem, a strange idea, or both."
            meta="you@example.com"
            href="mailto:you@example.com"
            linkLabel="Email VAN"
            tone="paper"
            className="work-contact-card"
          />
        </section>
      </div>
    </main>
  );
}
