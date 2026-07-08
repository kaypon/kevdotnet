import fs from "node:fs";
import path from "node:path";

export type PosterTileData = {
  id: string;
  alt: string;
  tone?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  bare?: boolean;
  letter?: string;
  colStart: 1 | 2 | 3;
  rowStart: 1 | 2 | 3 | 4;
  /** Position in the hold-to-reveal fade sequence — undefined for bare
   * cells, since they never fade (see PosterTile.tsx) and so are skipped
   * entirely rather than reserving a "dead" step in the sequence. Computed
   * once below by withFadeOrder so every step of the sequence lands on a
   * tile that's actually visibly fading. */
  fadeOrder?: number;
};

// Snake order for the hold-to-reveal fade: bottom row left-to-right, next
// row up right-to-left, alternating, ending at the top-left "V" cell last.
// Bare cells are skipped entirely (not just left un-faded) so the sequence
// never "waits" on a step that has nothing visible to show.
function withFadeOrder(tiles: PosterTileData[]): PosterTileData[] {
  const sweepOrder = ([4, 3, 2, 1] as const).flatMap((rowStart, sweepGroup) => {
    const leftToRight = sweepGroup % 2 === 0;
    return tiles
      .filter((tile) => tile.rowStart === rowStart && !tile.bare)
      .sort((a, b) => (leftToRight ? a.colStart - b.colStart : b.colStart - a.colStart));
  });
  const orderById = new Map(sweepOrder.map((tile, index) => [tile.id, index]));
  return tiles.map((tile) => ({ ...tile, fadeOrder: orderById.get(tile.id) }));
}

export const posterHeadline = "VAN";

const HALFTONES_DIR = path.join(process.cwd(), "public/photos/halftones");

// Every non-bare cell windows into the SAME shared photo (see PosterGrid.tsx,
// which sets --photo-url once on the grid and cycles it through this list on
// click) — so all tone tiles below just need to know they're photo cells,
// not which image. The first entry is always what's shown on load.
//
// Reads public/photos/halftones/ directly rather than hardcoding filenames —
// that list previously went stale twice (files deleted on disk without the
// array being updated, causing 404s on click-to-cycle). This must only be
// called from a Server Component (see components/Poster.tsx) since it
// touches the filesystem; PosterExperience.tsx only ever imports the
// PosterTileData *type* from this module, which is stripped at compile
// time, so `node:fs` never reaches the client bundle.
export function getPosterHalftoneImages(): string[] {
  const files = fs
    .readdirSync(HALFTONES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".png")
    .map((entry) => entry.name)
    .sort((a, b) => {
      if (a === "default.png") return -1;
      if (b === "default.png") return 1;
      return a.localeCompare(b);
    });

  return files.map((name) => `/photos/halftones/${name}`);
}

// 3x4 grid measured off inspo/her.jpg: only the first header cell carries a
// photo tile (the letter reads as a paper-colored cutout on it); the other
// two header letters sit as solid ink type directly on bare paper. Every
// tone tile shares the same portrait as ONE consistently-scaled image
// windowed through the grid (see PosterTile.tsx for the offset math), so
// adjacent tiles line up like a photo cut into pieces rather than 8
// independent crops.
export const posterTiles: PosterTileData[] = withFadeOrder([
  { id: "v", letter: "V", tone: 1, alt: "Kevin van der Poll", colStart: 1, rowStart: 1 },
  { id: "a", letter: "A", bare: true, alt: "", colStart: 2, rowStart: 1 },
  { id: "n", letter: "N", bare: true, alt: "", colStart: 3, rowStart: 1 },
  { id: "t1", tone: 2, alt: "Kevin van der Poll", colStart: 1, rowStart: 2 },
  { id: "t2", tone: 3, alt: "Kevin van der Poll", colStart: 2, rowStart: 2 },
  { id: "t3", tone: 4, alt: "Kevin van der Poll", colStart: 3, rowStart: 2 },
  { id: "bare1", bare: true, alt: "", colStart: 1, rowStart: 3 },
  { id: "t4", tone: 5, alt: "Kevin van der Poll", colStart: 2, rowStart: 3 },
  { id: "t5", tone: 6, alt: "Kevin van der Poll", colStart: 3, rowStart: 3 },
  { id: "t6", tone: 7, alt: "Kevin van der Poll", colStart: 1, rowStart: 4 },
  { id: "t7", tone: 8, alt: "Kevin van der Poll", colStart: 2, rowStart: 4 },
  { id: "bare2", bare: true, alt: "", colStart: 3, rowStart: 4 },
]);

export const posterCaption =
  "KEVIN VAN DER POLL IS A MIAMI BASED ARTIST AND DIGITAL TOOLMAKER.\n\nHE BUILDS THINGS TO FIND OUT WHAT THEY ARE. THE WORK TAKES SHAPE THROUGH MAKING, SOMETIMES BEFORE IT HAS A CLEAR NAME.\n\nIT OFTEN LANDS SOMEWHERE BETWEEN USEFUL AND STRANGE";

// Short summary typed out at the end of the hidden hold-to-reveal sequence,
// then shown statically on /van.
export const posterLore =
  "For Kevin, code and art speak the same language. The screen is not just where the piece appears. It is where it comes to life.\n\nThe goal is not to explain the idea perfectly, but to make something that lets it exist.";
