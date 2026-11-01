/* Handshake between a subpage's back link and the /kev nav: records which
   section the user is returning from, so that one link can skip its blink-in
   and slide back into place via the view-transition morph while the rest
   blink in as usual. Module state survives client-side navigation only —
   a hard load resets it, which is correct (no morph happens then either). */
let returningFrom: string | null = null;

export function setReturningFrom(section: string) {
  returningFrom = section;
}

export function peekReturningFrom() {
  return returningFrom;
}

export function clearReturningFrom() {
  returningFrom = null;
}

/* Track the two most-recent internal paths so back links can return to
   wherever the user actually came from rather than a hardcoded default. */
let previousPath: string | null = null;
let currentPath: string | null = null;

export function recordNavigation(path: string) {
  if (currentPath === path) return;
  previousPath = currentPath;
  currentPath = path;
}

export function getPreviousPath() {
  return previousPath;
}
