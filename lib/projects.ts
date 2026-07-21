export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
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
    shortDescription: "Generate halftone dot and line patterns, then export.",
    description:
      "Born from a tattoo session. Wanted a halftone line design, spent hours in Procreate not getting it right, and eventually gave up. This tool is the result of that frustration. Dial in exactly the dot or line pattern you're after and export it.",
    tags: ["Design", "Tool"],
    category: ["art", "tech"],
    href: "https://halftone-studio-sigma.vercel.app",
    year: 2026,
  },
  {
    slug: "cables",
    name: "CABLES",
    shortDescription: "A draggable utility pole with spring-physics wires.",
    description:
      "A bare utility pole you can drag around the screen. The wires sag and settle with spring physics.",
    tags: ["Physics", "Interactive"],
    category: ["art"],
    route: "/cables",
    year: 2026,
  },
  {
    slug: "demo-scroll",
    name: "Scroll canvas",
    shortDescription: "A video scrubbed frame-by-frame by scroll position.",
    description:
      "A video scrubbed frame-by-frame by scroll position. The browser as a film projector.",
    tags: ["Canvas", "Web"],
    category: ["art"],
    route: "/demo_scroll",
    year: 2025,
  },
  {
    slug: "spin",
    name: "SPIN",
    shortDescription: "Drag to orbit a halftone head scan.",
    description:
      "A few photos dragged into the illusion of volume. Drag to orbit a halftone head scan and tune the dot screen live. Proof that 3D is mostly a convincing lie.",
    tags: ["3D", "Design"],
    category: ["art"],
    route: "/spin",
    year: 2025,
  },
  {
    slug: "line-up",
    name: "Line-Up",
    shortDescription: "A classified personal record filed by the Van Intelligence Agency.",
    description:
      "A classified personal record filed by the Van Intelligence Agency. Mugshot, height chart, redacted fields, and a list of ongoing findings. The resume you'd have if the resume were a dossier.",
    tags: ["Design", "Identity"],
    category: ["art"],
    route: "/line-up",
    year: 2025,
  },
  {
    slug: "resume",
    name: "Resume",
    shortDescription: "Single-page professional resume.",
    description: "Single-page professional resume. Forward-Deployed AI Engineer, Miami FL.",
    tags: ["Document"],
    category: ["tech"],
    route: "/resume",
    year: 2026,
  },
  {
    slug: "blokc",
    name: "blokc",
    shortDescription: "Bitcoin block hashes rendered as colored pixel art.",
    description:
      "Every Bitcoin block carries a SHA-256 hash, a 64-character hexadecimal string. blokc takes the first 8 characters and renders them as a colored pixel grid, one cell per hex value. Go back to block 1 and watch the patterns change across 800,000+ blocks. A fun way to visualize the history of Bitcoin.",
    tags: ["Generative", "Web3"],
    category: ["art"],
    href: "https://blokc-bice.vercel.app",
    year: 2021,
  },
  {
    slug: "dnd-character-sheet",
    name: "D&D character sheet",
    shortDescription: "A printable D&D character sheet built in the browser.",
    description:
      "Built after losing a fully-fleshed character sheet that had a lot of work put into it. Fill in your stats, abilities, and backstory in the browser and it generates a printable sheet you can take to the table. Includes options for customizing the layout and design.",
    tags: ["Tool", "Web"],
    category: ["tech"],
    href: "https://dnd-rho-umber.vercel.app",
    embeddable: false,
    year: 2024,
  },
  {
    slug: "fifty-two",
    name: "fifty_two",
    shortDescription: "A hands-on look at how large 52 factorial really is.",
    description:
      "There are 8x10^67 ways to arrange a deck of cards. Every time you shuffle, that exact order has almost certainly never existed before in human history. This idea came from watching a VSauce video that wouldn't leave my head. This tool makes you feel the scale of it.",
    tags: ["Math", "Web"],
    category: ["tech"],
    href: "https://fiftytwo.vercel.app",
    year: 2024,
  },
  {
    slug: "pyano",
    name: "pyano",
    shortDescription: "A four-in-one music toy.",
    description:
      "A four-in-one music toy: beatbox creator, onscreen piano, kick-and-snare beat maker, and a keyboard that auto-generates melodies.",
    tags: ["Music", "Web"],
    category: ["art"],
    href: "https://pyano-web.vercel.app",
    year: 2024,
  },
  {
    slug: "blackjack",
    name: "Blackjack trainer",
    shortDescription: "A blackjack trainer for learning basic strategy.",
    description:
      "Built to learn basic strategy the right way, by playing. Every hand gives you instant feedback on your decision versus optimal play. Includes customizable rules, card counting practice, and progress tracking.",
    tags: ["Game", "Web"],
    category: ["tech"],
    href: "https://blackjacktrainer-chi.vercel.app",
    year: 2024,
  },
];
