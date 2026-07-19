export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  category: ("art" | "tech")[];
  href?: string;
  /** Internal Next.js route — links directly, bypasses the /projects/[slug] detail page. */
  route?: string;
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
    category: ["art", "tech"],
    href: "https://halftone-studio-sigma.vercel.app",
    year: 2026,
  },
  {
    slug: "cables",
    name: "CABLES",
    description:
      "A bare utility pole you can drag around the screen — the wires sag and settle with spring physics.",
    tags: ["Physics", "Interactive"],
    category: ["art"],
    route: "/cables",
    year: 2026,
  },
  {
    slug: "demo-scroll",
    name: "Scroll canvas",
    description:
      "A video scrubbed frame-by-frame by scroll position — the browser as a film projector.",
    tags: ["Canvas", "Web"],
    category: ["art"],
    route: "/demo_scroll",
    year: 2025,
  },
  {
    slug: "spin",
    name: "SPIN",
    description: "360° of Kevin. Drag to orbit a halftone head scan; tune the dot screen live.",
    tags: ["3D", "Design"],
    category: ["art"],
    route: "/spin",
    year: 2025,
  },
  {
    slug: "line-up",
    name: "Line-Up",
    description:
      "Official VIA personal record — a police-lineup treatment of Kevin van der Poll, complete with height chart and redacted fields.",
    tags: ["Design", "Identity"],
    category: ["art"],
    route: "/line-up",
    year: 2025,
  },
  {
    slug: "resume",
    name: "Resume",
    description: "Single-page professional resume — Forward-Deployed AI Engineer, Miami FL.",
    tags: ["Document"],
    category: ["tech"],
    route: "/resume",
    year: 2025,
  },
  {
    slug: "blokc",
    name: "blokc",
    description: "Bitcoin block hashes rendered as deterministic 8×8 pixel art.",
    tags: ["Generative", "Web3"],
    category: ["art"],
    href: "https://blokc-bice.vercel.app",
    year: 2024,
  },
  {
    slug: "dnd-character-sheet",
    name: "D&D character sheet",
    description: "A two-page Dungeons & Dragons character sheet you fill out in the browser.",
    tags: ["Tool", "Web"],
    category: ["tech"],
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
    category: ["tech"],
    href: "https://fiftytwo.vercel.app",
    year: 2023,
  },
  {
    slug: "pyano",
    name: "pyano",
    description:
      "A four-in-one music toy: beatbox creator, onscreen piano, kick-and-snare beat maker, and a keyboard that auto-generates melodies.",
    tags: ["Music", "Web"],
    category: ["art"],
    href: "https://pyano-web.vercel.app",
    year: 2022,
  },
  {
    slug: "blackjack",
    name: "Blackjack trainer",
    description: "A blackjack trainer built to teach basic strategy.",
    tags: ["Game", "Web"],
    category: ["tech"],
    href: "https://blackjacktrainer-chi.vercel.app",
    year: 2021,
  },
];
