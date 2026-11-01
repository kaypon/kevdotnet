"use client";

import { useEffect, useState } from "react";
import type { PosterTileData } from "@/lib/data";

const WORDS = ["KEV", "DOT", "NET"];
const MIN_TICKS = 11;
const MAX_TICKS = 22;
const MIN_TICK_MS = 28;
const MAX_TICK_MS = 72;
const HOLD_MS = 3000;
// Spread, not indexed: an emoji is two UTF-16 units, so a plain string index
// would hand back half a character. No M or W: they clip in the narrow middle
// column of the poster.
const GLYPHS = [..."ABCDEFGHIJKLNOPQRSTUVXYZ0123456789%$&?@#+=!*/~^<>{}|☠🜂ʘ⊙↯ϟ꩜֍⚀⚁⚂⚃⚄⚅⦿"];
// Module-level on purpose: it outlives client-side navigation, so the cycle
// carries on from the same word across pages instead of snapping back to the
// start. The server never advances it, so first render always hydrates on the
// first word.
let currentIndex = 0;
let landedAt = 0;

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffled(items: string[]): string[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Dealt like a deck: true random draws streak and read as repeats, so every
// glyph has to come up once before any comes up again.
let deck: string[] = [];

function nextGlyph(): string {
  if (deck.length === 0) deck = shuffled(GLYPHS);
  return deck.pop() as string;
}

/** Endlessly scrambles between KEV, DOT and NET, and returns the current
 * characters one per slot. Each change gets its own length, pace and landing
 * order, so no two look alike. Reduced-motion visitors stay on the first
 * word. */
export function useScrambleCycle(enabled = true): string[] {
  const [letters, setLetters] = useState(() => [...WORDS[currentIndex]]);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timeout: ReturnType<typeof setTimeout>;

    const scrambleTo = (index: number) => {
      const word = [...WORDS[index]];
      const totalTicks = randomInt(MIN_TICKS, MAX_TICKS);
      // Any slot can land first; one always lands on the final tick.
      const landsAt = word.map(() => randomInt(3, totalTicks));
      landsAt[randomInt(0, word.length - 1)] = totalTicks;
      let tick = 0;
      const step = () => {
        tick += 1;
        setLetters(word.map((char, i) => (tick >= landsAt[i] ? char : nextGlyph())));
        if (tick < totalTicks) {
          timeout = setTimeout(step, randomInt(MIN_TICK_MS, MAX_TICK_MS));
          return;
        }
        currentIndex = index;
        landedAt = Date.now();
        timeout = setTimeout(() => scrambleTo((index + 1) % WORDS.length), HOLD_MS);
      };
      step();
    };

    // Whatever's left of the current word's hold, so a page change doesn't
    // restart the 3 seconds.
    const remaining = Math.max(0, HOLD_MS - (Date.now() - landedAt));
    timeout = setTimeout(() => scrambleTo((currentIndex + 1) % WORDS.length), remaining);
    return () => clearTimeout(timeout);
  }, [enabled]);

  return letters;
}

/** The header letters sit in row 1, so colStart doubles as the letter index. */
export function withHeaderLetters(tiles: PosterTileData[], letters: string[]): PosterTileData[] {
  return tiles.map((tile) =>
    tile.letter ? { ...tile, letter: letters[tile.colStart - 1] } : tile
  );
}
