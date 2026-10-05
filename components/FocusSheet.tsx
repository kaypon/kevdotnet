"use client";

import { useRef } from "react";
import { NowEntries } from "@/components/NowEntries";

/* Depth-of-field text, after Lucas Bebber's CodePen. The editable sheet is
   stacked with faint copies, each rotated a hair more or less than the
   original. Where the copies line up the text stays sharp; where they fan
   apart it smears. No blur filter involved. */

const STEPS = 2;
const DEVIATION = 0.4; // degrees between the original and the outermost copy
const BASE = "scale(0.75) perspective(1200px)";
const ROTATE_Y = 8;
const ROTATE_X = 45;

const copies = Array.from({ length: STEPS }, (_, i) => (DEVIATION / STEPS) * (i + 1)).flatMap(
  (d) => [d, -d]
);

const transform = (offset: number) =>
  `${BASE} rotateY(${ROTATE_Y + offset}deg) rotateX(${ROTATE_X + offset}deg)`;

export function FocusSheet() {
  const originalRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mirror typing into the copies by hand so React never re-renders the
  // contentEditable node and steals the caret.
  const sync = () => {
    const html = originalRef.current?.innerHTML ?? "";
    copyRefs.current.forEach((el) => {
      if (el) el.innerHTML = html;
    });
  };

  return (
    <main className="focus-page">
      <div className="focus-stage">
        {copies.map((offset, i) => (
          <div
            key={offset}
            ref={(el) => {
              copyRefs.current[i] = el;
            }}
            className="focus-sheet focus-sheet--copy"
            style={{ transform: transform(offset) }}
            aria-hidden
          >
            <SheetText />
          </div>
        ))}
        <div
          ref={originalRef}
          className="focus-sheet"
          style={{ transform: transform(0) }}
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onInput={sync}
        >
          <SheetText />
        </div>
      </div>
      <div className="focus-haze" />
    </main>
  );
}

function SheetText() {
  return (
    <>
      <h1>Now</h1>
      <NowEntries />
      <p>Blur effect by Lucas Bebber (@lbebber on CodePen). Click anywhere and type.</p>
    </>
  );
}
