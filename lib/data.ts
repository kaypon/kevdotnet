export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  image?: PhotoAsset;
  status?: string;
};

export type EvidenceItem = {
  title: string;
  summary: string;
  detail: string;
  category: string;
};

export type Obsession = {
  title: string;
  note: string;
};

export type OperatingRule = {
  title: string;
  note?: string;
};

export type EditorialTone = "paper" | "ink" | "sand";

export type EditorialCardData = {
  eyebrow: string;
  title: string;
  body?: string;
  meta?: string;
  href?: string;
  linkLabel?: string;
  tone?: EditorialTone;
};

export type PhotoAsset = {
  src?: string;
  alt: string;
  caption: string;
  aspect: "portrait" | "square" | "landscape";
  objectPosition?: string;
};

export type CoverArtifact = EditorialCardData & {
  id: string;
  kind: "note" | "project" | "stamp";
};

export const profile = {
  name: "Kevin van der Poll",
  identity: "VAN",
};

export const evidence: EvidenceItem[] = [
  {
    title: "blokc",
    summary: "Turned Bitcoin block hashes into interactive 8×8 color artwork.",
    detail:
      "SHA-256 digits become color, with latest, random, and manual block modes. Math in; strange little artifact out.",
    category: "Bitcoin / generative art",
  },
  {
    title: "Proof-of-work arcade",
    summary: "Built a Webflow mining simulator instead of another explainer.",
    detail:
      "Fake computers mine blocks, collect fees, maintain balances, and compete with a human smashing the mine button.",
    category: "Webflow / simulation",
  },
  {
    title: "Membership machinery",
    summary: "Connected the tools everybody swears will connect themselves.",
    detail:
      "Webflow, Memberstack, Make, Microsoft 365, booking, intake, approvals, payments, and gated member states.",
    category: "Systems / automation",
  },
  {
    title: "AI toolchain studies",
    summary: "Built the plumbing, not just a chat box with rounded corners.",
    detail:
      "MCP servers, embeddings, Chroma-backed retrieval, agentic workflows, function calling, metadata filters, and evaluation experiments.",
    category: "MCP / RAG / agents",
  },
  {
    title: "Music machines",
    summary: "Made software play, record, sequence, sample, and listen.",
    detail:
      "A pygame piano, procedural melody tools, a drum sequencer, sampler pad, audio recording, and audio-to-bass-tab experiments.",
    category: "Python / audio",
  },
  {
    title: "Physical pixels",
    summary: "Forced digital linework through a needle into five centimeters of reality.",
    detail:
      "SVG tracing, Ink/Stitch, VP3 export, stitch simulation, and embroidery designs constrained by actual thread and fabric.",
    category: "Embroidery / vector",
  },
  {
    title: "Smaller weird things",
    summary: "Bots, forms, shops, toys, and experiments that escaped the notes app.",
    detail:
      "A Discord/OpenAI bot, Shopify and Webflow builds, GPT-powered forms, resume tools, visual prompts, and assorted useful nonsense.",
    category: "Ongoing evidence",
  },
];

export const projects: Project[] = [
  {
    title: "MCP Tooling Lab",
    description:
      "A custom MCP server with tools for embeddings, indexing, and vector search. Built with TypeScript, OpenAI embeddings, and Chroma.",
    tags: ["MCP", "TypeScript", "OpenAI", "Vector Search"],
    status: "Tooling study",
  },
  {
    title: "Vector RAG Pipeline",
    description:
      "A retrieval-augmented generation pipeline using document ingestion, chunking, embeddings, and semantic search.",
    tags: ["RAG", "Chroma", "Embeddings", "Node"],
    status: "Working system",
  },
  {
    title: "Membership Site System",
    description:
      "A Webflow and Memberstack membership flow with approval states, questionnaire intake, photo uploads, payment gating, and calendar booking.",
    tags: ["Webflow", "Memberstack", "Make.com", "Automation"],
    status: "Client system",
  },
  {
    title: "Bitcoin Hash Art",
    description:
      "A visual experiment that turns Bitcoin block hashes into colorful grid-based generative artwork.",
    tags: ["JavaScript", "Bitcoin", "Generative Art"],
    status: "Visual experiment",
  },
];

export const pressure = {
  lede: "I know what it’s like to work tired, fast, sweaty, understaffed—and still make the thing happen.",
  body:
    "I’ve worked across slammed restaurants, construction environments, client projects, and software systems. I’ve handled high-volume service, trained staff, managed inventory and events, dealt with guests and broken processes, and kept moving when the instructions were incomplete. That experience follows me into technical work: abstract tools have to survive contact with real people.",
};

export const obsessions: Obsession[] = [
  {
    title: "Useful AI",
    note: "Agents, MCP, retrieval, automation—and whether any of it helps someone do actual work.",
  },
  {
    title: "Bitcoin as a visual system",
    note: "Proof-of-work, hashes, mining, blocks, and turning invisible mathematics into something you can look at.",
  },
  {
    title: "Marks that survive the medium",
    note: "Banknote engraving, tattooable linework, embroidery, hatching, blackwork, and designs that still work once they leave a screen.",
  },
  {
    title: "Music that can be touched",
    note: "Audio tools, bass tabs, samplers, sequencers, Deftones, and dark pretty shit.",
  },
  {
    title: "Getting stronger and getting gone",
    note: "Fitness, vans, America, remote income, and building a life that does not involve waiting tables forever.",
  },
];

export const operatingRules: OperatingRule[] = [
  { title: "Proof beats talk." },
  {
    title: "A flawed working project beats a perfect imaginary one.",
    note: "Ship it, look at it honestly, make the next version better.",
  },
  {
    title: "Make the useful thing. Then make it feel inevitable.",
  },
  {
    title: "Direct feedback over polite bullshit.",
  },
  {
    title: "Finish what you said you would do.",
    note: "Especially when nobody is watching.",
  },
];

export const contact = {
  email: "you@example.com",
  phoneLabel: "(000) 000-0000",
  phoneHref: "+10000000000",
  socials: ["LinkedIn", "GitHub"],
};

export const cover = {
  descriptor: "Useful systems / strange ideas / Miami",
  issue: "Independent study No. 001",
  lede: "Kevin van der Poll builds tools for people with actual work to do. His past several projects have involved connecting the pieces that everybody swears will connect themselves — automating the clunky parts, making AI useful rather than decorative, and building systems that survive contact with real people. The work spans Miami restaurants, construction sites, client projects, and software stacks. That experience follows him into technical work: abstract tools have to survive contact with the real world.",
  photos: {
    primary: {
      alt: "Primary portrait of Kevin van der Poll",
      caption: "Portrait study 01 — direct flash / 4:5",
      aspect: "portrait",
    },
    secondary: {
      alt: "Candid portrait of Kevin van der Poll",
      caption: "Portrait study 02 — candid / 3:4",
      aspect: "portrait",
    },
    tools: {
      alt: "Kevin's hands and tools at work",
      caption: "Evidence A — hands / tools / process",
      aspect: "square",
    },
    object: {
      alt: "A personally meaningful object",
      caption: "Evidence B — object with a story",
      aspect: "square",
    },
    environment: {
      alt: "Kevin working in a Miami environment",
      caption: "Field study — workspace / Miami",
      aspect: "landscape",
    },
  } satisfies Record<string, PhotoAsset>,
  artifacts: [
    {
      id: "operating-principle",
      kind: "note",
      eyebrow: "Operating principle",
      title: "Make the useful thing.",
      body: "Then make it feel inevitable.",
      meta: "Notes / ongoing",
      href: "/van",
      linkLabel: "Meet VAN",
      tone: "ink",
    },
    {
      id: "current-signal",
      kind: "project",
      eyebrow: "Current signal",
      title: "Tools for people with actual work to do.",
      body: "AI, automation, web systems, and whatever the problem needs next.",
      meta: "Miami / 2026",
      href: "/work",
      linkLabel: "See the work",
      tone: "paper",
    },
    {
      id: "catalog",
      kind: "stamp",
      eyebrow: "Open channel",
      title: "Say hello.",
      body: "Got something worth making?",
      meta: "No pitch deck required",
      href: "mailto:you@example.com",
      linkLabel: "Email VAN",
      tone: "sand",
    },
  ] satisfies CoverArtifact[],
};
