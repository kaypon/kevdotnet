import type { ReactNode } from "react";
import type { EvidenceItem } from "@/lib/data";
import { EditorialCard } from "./EditorialCard";

type EvidenceLedgerProps = {
  items: EvidenceItem[];
  lead?: ReactNode;
};

export function EvidenceLedger({ items, lead }: EvidenceLedgerProps) {
  const tones = ["paper", "sand", "ink", "paper"] as const;

  return (
    <div className="editorial-card-grid evidence-card-grid">
      {lead}
      {items.map((item, index) => (
        <EditorialCard
          key={item.title}
          eyebrow={`${String(index + 1).padStart(2, "0")} / ${item.category}`}
          title={item.title}
          body={item.summary}
          meta="Selected evidence / VAN archive"
          tone={tones[index % tones.length]}
          className={`evidence-card evidence-card-${index + 1}`}
          headingLevel={3}
        >
          <p className="editorial-card-detail">{item.detail}</p>
        </EditorialCard>
      ))}
    </div>
  );
}
