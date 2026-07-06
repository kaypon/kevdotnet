import type { CSSProperties } from "react";
import type { PosterTileData } from "@/lib/data";

type PosterTileProps = {
  tile: PosterTileData;
  /** Set once the hidden hold-to-reveal sequence starts fading tiles out.
   * Only fades each tile's photo background — never the letter — so V/A/N
   * stay put after their containers are gone. */
  fadedCount?: number;
  /** The upcoming halftone treatment's URL, while a tap-to-cycle swap is
   * sweeping across the grid (see PosterExperience.tsx's cycleImage). */
  nextPhotoUrl?: string;
  /** Tile ids that have already switched to nextPhotoUrl this sweep — a
   * fresh random order every tap (see PosterExperience.tsx's `shuffled`),
   * so cycling treatments reads as a quick block-by-block flip rather than
   * a hard cut. */
  switchedIds?: Set<string>;
};

// Cumulative negative offsets (container-query units, relative to
// .poster-grid) so every photo tile windows into the exact same
// consistently-scaled image — derived from the column/row fr-ratios on
// .poster-grid in app/globals.css, which were measured off inspo/her.jpg.
//
// The source photo is square, but the grid is portrait (648:757), so the
// shared background is sized 100cqh x 100cqh (a true square, no stretching)
// and only the taller dimension (height) maps 1:1 onto the grid. The wider
// square necessarily overflows the grid's 648-unit width by (757-648)=109
// units — centered, i.e. 54.5 units / 7.2% of the image hidden on each
// side — so column offsets are expressed in cqh (not cqw) and include that
// base centering shift; row offsets need no such correction.
const COLUMN_OFFSET = ["-7.2cqh", "-37.06cqh", "-58.06cqh"];
const ROW_OFFSET = ["0", "-28.27cqh", "-54.16cqh", "-74.11cqh"];

export function PosterTile({ tile, fadedCount, nextPhotoUrl, switchedIds }: PosterTileProps) {
  const isPhoto = !tile.bare;
  const isFaded =
    fadedCount !== undefined && tile.fadeOrder !== undefined && tile.fadeOrder < fadedCount;
  const hasSwitched = switchedIds?.has(tile.id) ?? false;

  const style = {
    gridColumn: tile.colStart,
    gridRow: tile.rowStart,
    ...(isPhoto
      ? {
          "--ox": COLUMN_OFFSET[tile.colStart - 1],
          "--oy": ROW_OFFSET[tile.rowStart - 1],
          "--fade-opacity": isFaded ? 0 : 1,
          // Overrides the grid-level --photo-url (see PosterGrid.tsx) for
          // just this tile, once its turn in the sweep comes up — CSS custom
          // properties set inline always win over an inherited value.
          ...(hasSwitched && nextPhotoUrl ? { "--photo-url": `url(${nextPhotoUrl})` } : {}),
        }
      : {}),
  } as unknown as CSSProperties;

  const classes = [
    "poster-cell",
    tile.bare ? "poster-cell--bare" : `poster-cell--tone-${tile.tone}`,
    tile.letter ? "poster-cell--letter" : "",
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
