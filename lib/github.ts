const GITHUB_USERNAME = "kaypon";

type GitHubEvent = {
  type: string;
  created_at: string;
};

/**
 * Public, unauthenticated GitHub Events API — only surfaces activity on
 * public repos, not private ones. Revalidated on a schedule (not fetched
 * per-request) to stay well under GitHub's unauthenticated rate limit.
 *
 * Prefers the latest PushEvent (an actual commit), but falls back to the
 * latest public event of any type: most day-to-day work happens in private
 * repos, so public PushEvents are rare enough that the stricter reading
 * left /now saying "no recent activity" indefinitely.
 */
export async function getLastPublicActivityAt(): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
      next: { revalidate: 1800 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;

    const events: GitHubEvent[] = await res.json();
    const lastPush = events.find((event) => event.type === "PushEvent");
    return lastPush?.created_at ?? events[0]?.created_at ?? null;
  } catch {
    return null;
  }
}
