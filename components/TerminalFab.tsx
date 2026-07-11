"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Floating circular shortcut pinned bottom-right on every page (rendered
 * from the root layout) — the mouse-first sibling of the backtick keyboard
 * shortcut in TerminalShortcut.tsx. Everywhere it's `{}` into /terminal;
 * on /terminal itself it flips into a halftone mugshot that takes you back
 * to /van. */
export function TerminalFab() {
  const onTerminal = usePathname() === "/terminal";

  if (onTerminal) {
    return (
      <Link
        href="/van"
        className="terminal-fab terminal-fab--face"
        aria-label="Back to van"
        style={{ backgroundImage: "url(/photos/halftones/micro.png)" }}
      />
    );
  }

  return (
    <Link href="/terminal" className="terminal-fab" aria-label="Terminal">
      {"{}"}
    </Link>
  );
}
