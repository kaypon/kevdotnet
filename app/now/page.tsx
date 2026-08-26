import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/SubPageShell";
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
      <p>Currently:</p>
      <p>
        Building small physics toys for the browser. Latest: <Link href="/cables">/cables</Link>,
        a bare utility pole you can drag around while the wires sag and settle.
      </p>
      <p>
        Scrubbing video frame-by-frame with the scrollbar on{" "}
        <Link href="/demo_scroll">/demo_scroll</Link>, and fighting iOS Safari for every
        single frame of it.
      </p>
      <p>
        Wrote up a real case study on <Link href="/projects/phoebe">/projects/phoebe</Link>,
        the AI agent running on my old laptop: why it exists, how it's wired, and the token
        bottleneck that almost killed it.
      </p>
      <p>
        Trimmed the resume, added remote availability, and folded in recent client and agent
        work.
      </p>
      <p>Still hunting down a proper domain. And a hidden page or two remains. Keep an eye out.</p>
      <p>
        {lastActivityAt
          ? `Last public GitHub activity: ${formatRelativeCommitTime(lastActivityAt)}.`
          : "No recent public GitHub activity to show."}
      </p>
      <p>updated august 2026.</p>
    </SubPageShell>
  );
}
