"use client";

import { useScrambleCycle } from "./useScrambleCycle";

/** The poster's KEV / DOT / NET cycle as inline lowercase text. The visible
 * word changes every tick, so screen readers get a steady one instead. */
export function ScrambleWord() {
  const letters = useScrambleCycle();
  return (
    <>
      <span className="sr-only">kev</span>
      <span className="scramble-word" aria-hidden="true">
        {letters.join("").toLowerCase()}
      </span>
    </>
  );
}
