import type { ReactNode } from "react";
import { EditorialCard } from "./EditorialCard";

type NumberedItem = {
  title: string;
  note?: string;
};

type NumberedListProps = {
  items: NumberedItem[];
  label: string;
  variant?: "default" | "rules";
  lead?: ReactNode;
};

export function NumberedList({
  items,
  label,
  variant = "default",
  lead,
}: NumberedListProps) {
  const tones = ["sand", "paper", "ink", "paper"] as const;

  return (
    <div className={`editorial-card-grid numbered-cluster numbered-cluster-${variant}`}>
      {lead}
      <ol
        className={`numbered-card-grid numbered-card-grid-${variant}`}
        aria-label={label}
      >
        {items.map((item, index) => (
          <li key={item.title}>
            <EditorialCard
              eyebrow={`${String(index + 1).padStart(2, "0")} / ${variant === "rules" ? "Rule" : "Current fixation"}`}
              title={item.title}
              body={item.note}
              meta={variant === "rules" ? "Operating system" : "Still investigating"}
              tone={tones[index % tones.length]}
              className="numbered-editorial-card"
              headingLevel={3}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
