"use client";

import type { ComponentProps } from "react";
import { PosterGrid } from "./PosterGrid";
import { useScrambleCycle, withHeaderLetters } from "./useScrambleCycle";

/** Client wrapper so the server-rendered /kev page keeps the header letters
 * cycling after the hand-off from the home poster. */
export function ScramblingPosterGrid({ tiles, ...props }: ComponentProps<typeof PosterGrid>) {
  const letters = useScrambleCycle();
  return <PosterGrid tiles={withHeaderLetters(tiles, letters)} {...props} />;
}
