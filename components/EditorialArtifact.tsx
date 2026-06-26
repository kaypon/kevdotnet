import type { CoverArtifact } from "@/lib/data";
import { EditorialCard } from "./EditorialCard";

type EditorialArtifactProps = {
  artifact: CoverArtifact;
  className?: string;
};

export function EditorialArtifact({
  artifact,
  className = "",
}: EditorialArtifactProps) {
  return (
    <EditorialCard
      eyebrow={artifact.eyebrow}
      title={artifact.title}
      body={artifact.body}
      meta={artifact.meta}
      href={artifact.href}
      linkLabel={artifact.linkLabel}
      tone={artifact.tone}
      className={`cover-artifact artifact-${artifact.kind} ${className}`}
    />
  );
}
