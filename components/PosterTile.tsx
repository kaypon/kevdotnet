import type { CSSProperties } from "react";
import type { PosterTileData } from "@/lib/data";

type PosterTileProps = {
  tile: PosterTileData;
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

export function PosterTile({ tile }: PosterTileProps) {
  const isPhoto = !tile.bare && Boolean(tile.src);

  const style = {
    gridColumn: tile.colStart,
    gridRow: tile.rowStart,
    ...(isPhoto
      ? {
          "--ox": COLUMN_OFFSET[tile.colStart - 1],
          "--oy": ROW_OFFSET[tile.rowStart - 1],
          "--photo-url": `url(${tile.src})`,
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
