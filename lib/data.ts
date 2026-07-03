export type PosterTileData = {
  id: string;
  alt: string;
  tone?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  bare?: boolean;
  letter?: string;
  src?: string;
  colStart: 1 | 2 | 3;
  rowStart: 1 | 2 | 3 | 4;
};

export const posterHeadline = "VAN";

const PORTRAIT = "/photos/kevin-halftone.png";

// 3x4 grid measured off inspo/her.jpg: only the first header cell carries a
// photo tile (the letter reads as a paper-colored cutout on it); the other
// two header letters sit as solid ink type directly on bare paper. Every
// tone tile shares the same portrait as ONE consistently-scaled image
// windowed through the grid (see PosterTile.tsx for the offset math), so
// adjacent tiles line up like a photo cut into pieces rather than 8
// independent crops.
export const posterTiles: PosterTileData[] = [
  { id: "v", letter: "V", tone: 1, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 1, rowStart: 1 },
  { id: "a", letter: "A", bare: true, alt: "", colStart: 2, rowStart: 1 },
  { id: "n", letter: "N", bare: true, alt: "", colStart: 3, rowStart: 1 },
  { id: "t1", tone: 2, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 1, rowStart: 2 },
  { id: "t2", tone: 3, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 2, rowStart: 2 },
  { id: "t3", tone: 4, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 3, rowStart: 2 },
  { id: "bare1", bare: true, alt: "", colStart: 1, rowStart: 3 },
  { id: "t4", tone: 5, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 2, rowStart: 3 },
  { id: "t5", tone: 6, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 3, rowStart: 3 },
  { id: "t6", tone: 7, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 1, rowStart: 4 },
  { id: "t7", tone: 8, src: PORTRAIT, alt: "Kevin van der Poll", colStart: 2, rowStart: 4 },
  { id: "bare2", bare: true, alt: "", colStart: 3, rowStart: 4 },
];

export const posterCaption =
  "KEVIN VAN DER POLL. BORN IN SOUTH AFRICA, RAISED IN JOHANNESBURG, WELL TRAVELED SINCE, NOW BASED IN MIAMI. BUILDS USEFUL SYSTEMS, AI TOOLING, AND SOFTWARE FOR PEOPLE WITH ACTUAL WORK TO DO.";

export const posterCredit = "van der poll.";
