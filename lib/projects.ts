export type Project = {
  slug: string;
  name: string;
  description: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "this-site",
    name: "This site",
    description:
      "A halftone-tiled landing page with a hidden press-and-hold reveal sequence, hand-built with Next.js.",
  },
  {
    slug: "ai-tooling",
    name: "AI tooling",
    description: "Agent workflows and internal tools built around day-to-day engineering work.",
  },
  {
    slug: "visual-experiments",
    name: "Visual experiments",
    description: "Halftone processing, generative layouts, and other small design/code studies.",
  },
  {
    slug: "blokc",
    name: "blokc",
    description: "Bitcoin block hashes rendered as deterministic 8x8 pixel art.",
    href: "https://blokc-bice.vercel.app",
  },
  {
    slug: "dnd-character-sheet",
    name: "D&D character sheet",
    description: "A two-page Dungeons & Dragons character sheet you fill out in the browser.",
    href: "https://dnd-rho-umber.vercel.app",
  },
  {
    slug: "fifty-two",
    name: "fifty_two",
    description:
      "A way to explore 52! (52 factorial) — shuffling a deck of cards in unique ways.",
  },
  {
    slug: "pyano",
    name: "pyano",
    description:
      "A four-in-one music toy: a beatbox creator, an onscreen piano, a kick-and-snare beat maker, and a keyboard that auto-generates melodies.",
  },
  {
    slug: "pyeye",
    name: "pyeye",
    description:
      "A Python tool that auto-detects eyes in a photo and covers them with a censor bar, with a few style options.",
  },
  {
    slug: "blackjack",
    name: "Blackjack trainer",
    description: "A blackjack trainer built to teach basic strategy.",
  },
];
