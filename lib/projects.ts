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
  /** Skips the preview/blocked-preview block entirely on the detail page. */
  hidePreview?: boolean;
  /** Skips the "visit site" button on the detail page. */
  hideVisitLink?: boolean;
  /** Extended write-up rendered on the detail page below the description. */
  caseStudy?: {
    sections: { heading: string; body: string }[];
  };
};

// Ordered by when each entry was added to this list (oldest first), not by
// the `year` field, which records when the project itself was originally
// built.
export const projects: Project[] = [
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
    slug: "phoebe",
    name: "Phoebe",
    shortDescription: "Autonomous personal AI assistant running on OpenClaw.",
    description:
      "A persistent, tool-augmented AI agent built on the OpenClaw runtime, backed by Claude Opus 4.8 with automatic failover to GPT. Features a tool-calling loop (web search, shell execution, file I/O, cron scheduling), file-based long-term memory with semantic recall, sub-agent orchestration for parallel tasks, and 30+ modular skills. Deployed as a Discord bot with a proactive heartbeat system. Has autonomously designed, built, and shipped native desktop and web applications.",
    tags: ["AI", "Agents", "OpenClaw"],
    category: ["tech"],
    href: "https://openclaw-ai.net",
    embeddable: false,
    hidePreview: true,
    hideVisitLink: true,
    year: 2026,
    caseStudy: {
      sections: [
        {
          heading: "Why",
          body: "Went looking for a decent AI companion after seeing glimpses of what people were building online, wanted something Jarvis-like. Had a spare laptop sitting around doing nothing, so it got handed over completely: Phoebe's machine, not a shared one.",
        },
        {
          heading: "How it's wired",
          body: "Chose Discord over WhatsApp or Telegram because it gets Phoebe a full server: dedicated channels, its own permissions, room to moderate and post on its own terms. Memory runs on GraphRAG instead of flat context stuffing, pulling only the relevant nodes on each recall instead of re-feeding the whole history.",
        },
        {
          heading: "The bottleneck",
          body: "Token cost was the real fight. The first message of a session was burning a disproportionate chunk of budget just reloading context before it could do anything useful. Moving memory over to GraphRAG fixed it: lookups pull what's relevant instead of everything. Once that was solved, the rest was easy.",
        },
        {
          heading: "What it does now",
          body: "Runs on a daily timer: summarizes what got done, the weather, and news filtered to stated preferences. Beyond that it designs, builds, and ships its own native desktop and web apps without being walked through it step by step.",
        },
      ],
    },
  },
  {
    slug: "sunchokephoto",
    name: "Sunchoke Photo",
    shortDescription: "Photography portfolio for a commercial photographer.",
    description:
      "Photography portfolio for a commercial photographer. Custom layout, CMS-driven galleries, and client booking flow. Built in Webflow.",
    tags: ["Webflow", "Client Work"],
    category: ["tech"],
    href: "https://sunchokephoto.com",
    embeddable: false,
    year: 2023,
  },
  {
    slug: "badbucktruck",
    name: "Bad Buck Truck",
    shortDescription: "E-commerce and inventory site for a truck accessories brand.",
    description:
      "E-commerce and inventory site for a truck accessories brand. Webflow CMS, product pages, and lead capture. Built in Webflow.",
    tags: ["Webflow", "Client Work"],
    category: ["tech"],
    href: "https://badbucktruck.com",
    embeddable: false,
    year: 2023,
  },
  {
    slug: "schoolahoop",
    name: "Schoolahoop",
    shortDescription: "Free PK–12 school discovery platform serving families across the US.",
    description:
      "Free PK–12 school discovery platform serving families across the US. Built at Lincoln Network with Vue, Node.js, GraphQL, and FaunaDB. Still live.",
    tags: ["Vue", "GraphQL", "Client Work"],
    category: ["tech"],
    href: "https://schoolahoop.org",
    embeddable: false,
    year: 2021,
  },
  {
    slug: "face-detect",
    name: "Face Detect",
    shortDescription: "A browser-based face tracking playground with a hand-framed color portal.",
    description:
      "A face tracking playground built on face-api.js: live mesh overlays, landmarks, mood and age/gender readouts, AR stickers, and a halftone camera style, all running 100% locally, nothing leaves the browser. Frame your hands into a rectangle and MediaPipe hand tracking turns the window between them into a false-color or frosted-glass portal.",
    tags: ["Vision", "Browser"],
    category: ["art"],
    href: "https://facerec-sigma.vercel.app",
    embeddable: false,
    year: 2026,
    caseStudy: {
      sections: [
        {
          heading: "Why",
          body: "Been into facial recognition since messing around with the Kairos API back in 2017. This is a browser-only version of that itch: face-api.js running entirely client-side for the mesh, landmarks, mood tracking, and AR stickers, no server involved.",
        },
        {
          heading: "The hand portal",
          body: "Saw people doing the two-hand picture-frame trick on Instagram and had to give it a shot. MediaPipe tracks both hands, and the window traced between your thumbs and index fingers gets false-colored or turned to frosted glass. The versions on Instagram are way more technical than this. Mine's about as basic as it gets, just a simple, runs-in-the-browser take on the idea.",
        },
      ],
    },
  },
];
