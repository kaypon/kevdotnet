/* Handshake between a subpage's back link and the /van nav: records which
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
