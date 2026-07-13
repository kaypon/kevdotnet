import type { CSSProperties } from "react";
import type { PosterTileData } from "@/lib/data";

type PosterTileProps = {
  tile: PosterTileData;
  fadedCount?: number;
  nextPhotoUrl?: string;
  switchedIds?: Set<string>;
  /** Intro mode: when provided, controls per-tile visibility by id.
   * Overrides fadedCount for photo opacity; bare cells get opacity 0
   * until their id appears in the set. */
  revealedIds?: Set<string>;
};

const COLUMN_OFFSET = ["-7.2cqh", "-37.06cqh", "-58.06cqh"];
const ROW_OFFSET = ["0", "-28.27cqh", "-54.16cqh", "-74.11cqh"];

export function PosterTile({ tile, fadedCount, nextPhotoUrl, switchedIds, revealedIds }: PosterTileProps) {
  const isPhoto = !tile.bare;
  const hasSwitched = switchedIds?.has(tile.id) ?? false;

  // Intro mode takes precedence; falls back to fadedCount for the hold sequence.
  let fadeOpacity: 0 | 1 = 1;
  if (revealedIds !== undefined) {
    fadeOpacity = revealedIds.has(tile.id) ? 1 : 0;
  } else if (fadedCount !== undefined && tile.fadeOrder !== undefined) {
    fadeOpacity = tile.fadeOrder < fadedCount ? 0 : 1;
  }

  // Bare cells (A, N, empty gaps) are hidden in intro until their id is revealed.
  const bareHidden = revealedIds !== undefined && tile.bare && !revealedIds.has(tile.id);

  const style = {
    gridColumn: tile.colStart,
    gridRow: tile.rowStart,
    ...(bareHidden ? { opacity: 0 } : {}),
    ...(isPhoto
      ? {
          "--ox": COLUMN_OFFSET[tile.colStart - 1],
          "--oy": ROW_OFFSET[tile.rowStart - 1],
          "--fade-opacity": fadeOpacity,
          ...(hasSwitched && nextPhotoUrl ? { "--photo-url": `url(${nextPhotoUrl})` } : {}),
        }
      : {}),
  } as unknown as CSSProperties;

  const classes = [
    "poster-cell",
    tile.bare ? "poster-cell--bare" : `poster-cell--tone-${tile.tone}`,
    tile.letter ? "poster-cell--letter" : "",
    // Photo gone ⇒ a paper-colored letter (the V) would sit invisible on the
    // paper page; this flips it to ink for the beat before the invert.
    isPhoto && fadeOpacity === 0 ? "poster-cell--cleared" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style} aria-hidden={isPhoto || undefined}>
      {tile.letter ? (
        <span className="poster-cell__letter" aria-hidden="true">
          {tile.letter}
        </span>
      ) : null}
    </div>
  );
}
