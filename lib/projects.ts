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
    slug: "s3-menu-flashcards",
    name: "S3 menu flashcards",
    description: "A flashcard app for training on a restaurant menu.",
    href: "https://trps3menu.vercel.app",
  },
];
