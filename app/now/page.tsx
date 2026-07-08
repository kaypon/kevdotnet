import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";
import { getLastPublicCommitAt } from "@/lib/github";

export const metadata: Metadata = {
  title: "Now — Kevin van der Poll",
  description: "What Kevin van der Poll is currently working on.",
};

function formatRelativeCommitTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMinutes = Math.round(diffMs / 60_000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(diffMinutes) < 60) return rtf.format(-diffMinutes, "minute");
  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) return rtf.format(-diffHours, "hour");
  const diffDays = Math.round(diffHours / 24);
  return rtf.format(-diffDays, "day");
}

export default async function NowPage() {
  const lastCommitAt = await getLastPublicCommitAt();

  return (
    <SubPageShell title="Now">
      <p>Right now: completing the brand image and getting this site out into the world.</p>
      <p>
        {lastCommitAt
          ? `Last public commit: ${formatRelativeCommitTime(lastCommitAt)}.`
          : "No recent public commit activity to show."}
      </p>
    </SubPageShell>
  );
}
