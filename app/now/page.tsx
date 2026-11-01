import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";
import { NowEntries } from "@/components/NowEntries";
import { getLastPublicActivityAt } from "@/lib/github";

export const metadata: Metadata = {
  title: "Now — Kevin van der Poll",
  description: "What Kevin van der Poll is currently working on.",
  alternates: { canonical: "/now" },
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
    <SubPageShell title="Now" titleTransition="now">
      <NowEntries />
      <p>
        {lastActivityAt
          ? `Last public GitHub activity: ${formatRelativeCommitTime(lastActivityAt)}.`
          : "No recent public GitHub activity to show."}
      </p>
      <p>updated november 2026.</p>
    </SubPageShell>
  );
}
