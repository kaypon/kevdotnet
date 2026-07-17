/** The 8 halftoned head spin frames (one full turn, 45° apart), baked
 * full-bleed from the aligned/heads set — the little always-spinning head in
 * the poster's bottom-right cell (SpinHead.tsx). Client-safe: no fs, unlike
 * lib/data.ts. */
export const spinHeadFrames = Array.from({ length: 8 }, (_, i) => `/photos/spin/head-${i}.webp`);

/** The full-body turn as un-screened 1000px cutouts (photo + alpha) — inputs
 * for the /spin studio, which halftones them live on canvas. */
export const spinSourceFrames = Array.from({ length: 8 }, (_, i) => `/photos/spin/src-${i}.webp`);
