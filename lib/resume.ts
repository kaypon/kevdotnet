/** Content for the unlinked /resume page -the only file to edit when the
 * resume changes. Source of truth: Kevin's Kvdp_2026 resume. Phone and email
 * are NOT here (the repo is public): they come from the RESUME_PHONE and
 * RESUME_EMAIL env vars, set in .env.local and on Vercel. */

/** Contact details split into parts so the assembled number/address never
 * appears in served HTML, RSC payloads, or JS bundles, where email/phone
 * regexes harvest them. The client components join the parts in the
 * browser after mount. */
export type ResumeContactParts = {
  phoneParts: string[];
  emailUser: string;
  emailDomain: string;
};

/** Server-only: reads RESUME_PHONE ("305-555-0100" style, dash separated)
 * and RESUME_EMAIL at build time. Returns null when either is missing, and
 * the resume then renders without phone/email instead of failing. */
export function getResumeContact(): ResumeContactParts | null {
  const phone = process.env.RESUME_PHONE?.trim();
  const email = process.env.RESUME_EMAIL?.trim();
  if (!phone || !email || !email.includes("@")) return null;
  const at = email.lastIndexOf("@");
  return {
    phoneParts: phone.split("-").filter(Boolean),
    emailUser: email.slice(0, at),
    emailDomain: email.slice(at + 1),
  };
}

export type ResumeExperience = {
  role: string;
  org: string;
  location?: string;
  dates: string;
  /** e.g. NDA disclaimers -rendered muted under the role line. */
  note?: string;
  bullets: string[];
};

export type ResumeEducation = {
  credential: string;
  school?: string;
  location: string;
  dates: string;
};

export type ResumeProject = {
  name: string;
  stack: string;
  description: string;
  href: string;
};

export const resumeHeader = {
  name: "Kevin van der Poll",
  title: "Full-Stack Developer · AI & Automation Engineer",
  location: "United Kingdom",
  // Phone and email are not in the repo: see getResumeContact() below.
  links: [
    { label: "kevdotnet.net", href: "https://kevdotnet.net" },
    { label: "linkedin.com/in/kevinvanderpoll", href: "https://www.linkedin.com/in/kevinvanderpoll/" },
    { label: "github.com/kaypon", href: "https://github.com/kaypon" },
  ],
};

export const resumeSummary =
  "Full-stack developer and automation engineer with 8+ years shipping real products for real clients. " +
  "Currently contracting in the UK, building the warehouse operations system behind a meal-box fulfilment packer, " +
  "after building AI copilots, RAG pipelines, and agentic workflows at a fintech startup. " +
  "Hands-on with OpenAI APIs, Make.com, Zapier, Webflow, and Shopify. " +
  "Certified Scrum Master who has run full client lifecycles end-to-end, " +
  "from brief to deployment, and can talk to humans as well as write the code. " +
  "Available for remote roles and full-time or contract work in the UK.";

export const resumeSkills: { group: string; items: string }[] = [
  {
    group: "AI / Automation",
    items:
      "OpenAI API, Anthropic Claude API, Claude Code (agent teams), OpenClaw, Make.com, Zapier, RAG pipelines, vector search, embeddings, MCP protocol, agent orchestration, Pinecone, Chroma, PGVector",
  },
  {
    group: "Frontend",
    items:
      "React, Next.js, TypeScript, JavaScript (ES6+), Vue, TailwindCSS, Webflow, responsive UI, state management",
  },
  {
    group: "Backend",
    items:
      "Node.js, Express, Python, Flask, REST, GraphQL, WebSockets, PostgreSQL, SQLite, MongoDB, Firebase, microservices, JWT/OAuth authentication",
  },
  {
    group: "E-commerce / CMS",
    items: "Shopify (Admin API), Webflow CMS, Memberstack, DPD shipping API",
  },
  {
    group: "Cloud & DevOps",
    items: "AWS (Lambda, S3, EC2), Docker, GitHub Actions (CI/CD), serverless, Linux servers (systemd)",
  },
  {
    group: "Leadership / Delivery",
    items:
      "Certified Scrum Master, Agile (Scrum, Kanban), sprint planning, client-facing delivery, MVP delivery",
  },
];

export const resumeExperience: ResumeExperience[] = [
  {
    role: "Lead Engineer",
    org: "Coolpack",
    location: "Corby, UK",
    dates: "Sep 2026 - current",
    bullets: [
      "Sole engineer on a local-first warehouse operations suite for a meal-box fulfilment packer: Python/Flask portal, Node.js hub, SQLite, ~40k lines with automated test suites on both sides.",
      "Integrated the Shopify Admin API and DPD Ireland's live shipping API. First production week: 280 orders pulled, booked and labelled in one pass, 322 parcel labels, zero failed bookings.",
      "Built a height-aware box-packing engine that exactly reproduced the ops lead's hand-planned 209-order workbook, plus automatic station layouts and per-box pick sheets stamped with matching shipping labels.",
      "Shipped real-time floor tooling on an on-site Linux server: handheld and Zebra scanner screens, a live WebSocket pack board, and label safety guards (live vs sandbox mode, stale-label blocking, no double bookings).",
      "Made the platform multi-client (per-client data, branding and login) and onboarded a second meal brand.",
      "Ran the build with AI coding agents (Claude Code agent teams with a dedicated adversarial reviewer, gated on tests passing), working directly with the owners and ops lead to turn physical packing rules into software.",
    ],
  },
  {
    role: "AI Engineer",
    org: "Synvestable",
    location: "Sunrise, FL",
    dates: "Jan 2025 - Aug 2026",
    bullets: [
      "Shipped internal AI copilots that draft responses, summarize records, generate reports, and answer documentation queries, cutting manual operational work across teams.",
      "Turned one-off AI experiments into reusable service patterns: document Q&A, proposal generation, lead qualification, support triage, data cleanup, and workflow orchestration.",
      "Built end-to-end RAG pipelines (ingestion, chunking, embeddings, vector search, grounded generation) powering internal knowledge retrieval and customer-facing support.",
    ],
  },
  {
    role: "Full-Stack Developer / Technical Project Lead",
    org: "Electric Flow",
    location: "Sunrise, FL",
    dates: "June 2022 - March 2025",
    bullets: [
      "Designed and shipped Webflow sites for clients across photography, e-commerce, and professional services, including live builds at sunchokephoto.com and badbucktruck.com.",
      "Built Make.com and Zapier automation pipelines for content publishing, CRM workflows, and lead capture.",
      "Integrated early OpenAI API tooling for automated blog content generation and copy workflows.",
      "Managed full client lifecycle across concurrent projects: scoping, design direction, build, and handoff.",
    ],
  },
  {
    role: "Full Stack Engineer",
    org: "Lincoln Network",
    location: "Remote, FL",
    dates: "March 2020 - May 2022",
    bullets: [
      "Delivered production apps with Vue, Node.js, GraphQL, FaunaDB, and serverless functions, including schoolahoop.org, a free PK–12 school-discovery platform still live today.",
      "Built a reusable UI component library and tuned frontend performance.",
      "Ran data-driven experiments and A/B tests that lifted engagement by double digits.",
      "Partnered with PMs to pin down API contracts, tighten acceptance criteria, and raise sprint velocity.",
    ],
  },
  {
    role: "Blockchain Engineer",
    org: "Magic Leap",
    location: "Sunrise, FL",
    dates: "October 2019 - March 2020",
    note: "Work performed under NDA. Details limited.",
    bullets: [
      "Built blockchain-based biometric identity prototypes on Hyperledger Fabric and Ethereum in a fast-moving Agile squad.",
      "Decentralized storage on IPFS with encryption.",
    ],
  },
  {
    role: "Full Stack Engineer / Scrum Master",
    org: "Bushido Lab",
    location: "Miami, FL",
    dates: "October 2017 - June 2019",
    bullets: [
      "Built web apps and smart contract systems in JavaScript and Solidity.",
      "Ran Scrum ceremonies and technical planning as the team's Scrum Master.",
    ],
  },
];

// Live, clickable proof of range -all shipped, all mine, all one tap away.
export const resumeProjects: ResumeProject[] = [
  {
    name: "Phoebe (OpenClaw agent)",
    stack: "OpenClaw / Claude Opus / GPT failover",
    description:
      "Persistent autonomous AI assistant with tool-calling, file-based long-term memory, sub-agent orchestration, and a 30+ skill modular system. Deployed as a Discord bot with scheduled proactive behavior. Has independently designed and shipped native desktop and web apps.",
    href: "https://openclaw-ai.net",
  },
  {
    name: "kevdotnet.net",
    stack: "Next.js / TypeScript",
    description:
      "Hand-built portfolio: halftone poster with canvas-based tile animations, typewriter sequencing, view transitions, and a working in-browser terminal. No UI libraries. Every effect is custom.",
    href: "https://kevdotnet.net",
  },
  {
    name: "schoolahoop.org",
    stack: "Vue / Node.js / GraphQL / FaunaDB",
    description:
      "Free PK–12 school discovery platform serving families across the US. Shipped at Lincoln Network, still live.",
    href: "https://schoolahoop.org",
  },
  {
    name: "sunchokephoto.com",
    stack: "Webflow",
    description:
      "Photography portfolio for a commercial photographer. Custom layout, CMS-driven galleries, and client booking flow.",
    href: "https://sunchokephoto.com",
  },
  {
    name: "blokc",
    stack: "Generative / Web3",
    description:
      "Every Bitcoin block's SHA-256 hash rendered as colored pixel art. Steps through 800,000+ blocks, one generative grid per block.",
    href: "https://blokc-bice.vercel.app",
  },
];

export const resumeEducation: ResumeEducation[] = [
  {
    credential: "Scrum Master Certification",
    school: "3Back Certified Scrum Training",
    location: "Miami, FL",
    dates: "Oct 2017",
  },
  {
    credential: "Full-stack Web Development Program",
    school: "Web Development Bootcamp",
    location: "Miami, FL",
    dates: "Aug 2017",
  },
  {
    credential: "HND in Electronic Engineering",
    location: "Glasgow, UK",
    dates: "March 2014",
  },
  {
    credential: "B.Eng. Computer Science",
    location: "Johannesburg, ZA",
    dates: "April 2012",
  },
];
