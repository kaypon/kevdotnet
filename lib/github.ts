const GITHUB_USERNAME = "kaypon";

type GitHubEvent = {
  type: string;
  created_at: string;
};

/**
 * Public, unauthenticated GitHub Events API — only surfaces activity on
 * public repos, not private ones. Revalidated on a schedule (not fetched
 * per-request) to stay well under GitHub's unauthenticated rate limit.
 */
export async function getLastPublicCommitAt(): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
      next: { revalidate: 1800 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;

    const events: GitHubEvent[] = await res.json();
    const lastPush = events.find((event) => event.type === "PushEvent");
    return lastPush?.created_at ?? null;
  } catch {
    return null;
  }
}
