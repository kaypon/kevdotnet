import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/SubPageShell";
import { getLastPublicActivityAt } from "@/lib/github";

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
  const lastActivityAt = await getLastPublicActivityAt();

  return (
    <SubPageShell title="Now">
      <p>Currently:</p>
      <p>
        — completing the brand image and getting this site out into the world (a proper
        domain included).
      </p>
      <p>
        — building <Link href="/projects/halftone-studio">Halftone Studio</Link>, the
        image-to-dot-screen tool behind this site&apos;s poster tiles.
      </p>
      <p>
        — prototyping AI tooling and agent workflows around day-to-day engineering work.
      </p>
      <p>— and a hidden page or two in the works. Keep an eye out.</p>
      <p>
        {lastActivityAt
          ? `Last public GitHub activity: ${formatRelativeCommitTime(lastActivityAt)}.`
          : "No recent public GitHub activity to show."}
      </p>
      <p>updated july 2026.</p>
    </SubPageShell>
  );
}
