export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  href?: string;
  year?: number;
  /** Only meaningful when href is set. False for sites that send
   * X-Frame-Options/frame-ancestors headers blocking iframe embeds —
   * their info page shows a fallback card instead of a live preview. */
  embeddable?: boolean;
};

export const projects: Project[] = [
  {
    slug: "halftone-studio",
    name: "Halftone Studio",
    description:
      "Upload an image and tune halftone effects live — the same dot-screen treatment behind this site's poster tiles.",
    tags: ["Design", "Tool"],
    href: "https://halftone-studio-sigma.vercel.app",
    year: 2026,
  },
  {
    slug: "this-site",
    name: "This site",
    description:
      "A halftone-tiled landing page with a hidden press-and-hold reveal sequence, hand-built with Next.js.",
    tags: ["Next.js", "Design"],
    year: 2025,
  },
  {
    slug: "ai-tooling",
    name: "AI tooling",
    description: "Agent workflows and internal tools built around day-to-day engineering work.",
    tags: ["AI", "Engineering"],
    year: 2025,
  },
  {
    slug: "blokc",
    name: "blokc",
    description: "Bitcoin block hashes rendered as deterministic 8×8 pixel art.",
    tags: ["Generative", "Web3"],
    href: "https://blokc-bice.vercel.app",
    year: 2024,
  },
  {
    slug: "visual-experiments",
    name: "Visual experiments",
    description: "Halftone processing, generative layouts, and other small design/code studies.",
    tags: ["Design", "Generative"],
    year: 2024,
  },
  {
    slug: "dnd-character-sheet",
    name: "D&D character sheet",
    description: "A two-page Dungeons & Dragons character sheet you fill out in the browser.",
    tags: ["Tool", "Web"],
    href: "https://dnd-rho-umber.vercel.app",
    embeddable: false,
    year: 2023,
  },
  {
    slug: "fifty-two",
    name: "fifty_two",
    description:
      "Manually shuffle a deck of cards and find out whether that exact order has ever appeared before — a hands-on tour of 52!.",
    tags: ["Math", "Web"],
    href: "https://fiftytwo.vercel.app",
    year: 2023,
  },
  {
    slug: "pyano",
    name: "pyano",
    description:
      "A four-in-one music toy: beatbox creator, onscreen piano, kick-and-snare beat maker, and a keyboard that auto-generates melodies.",
    tags: ["Music", "Web"],
    href: "https://pyano-web.vercel.app",
    year: 2022,
  },
  {
    slug: "pyeye",
    name: "pyeye",
    description:
      "A Python tool that auto-detects eyes in a photo and covers them with a censor bar.",
    tags: ["Python", "CV"],
    year: 2022,
  },
  {
    slug: "blackjack",
    name: "Blackjack trainer",
    description: "A blackjack trainer built to teach basic strategy.",
    tags: ["Game", "Web"],
    href: "https://blackjacktrainer-chi.vercel.app",
    year: 2021,
  },
];
