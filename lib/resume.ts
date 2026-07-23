/** Content for the unlinked /resume page — the only file to edit when the
 * resume changes. Source of truth: Kevin's Kvdp_2026 resume. Contact info
 * lives only here: the page is unlinked and noindexed. */

export type ResumeExperience = {
  role: string;
  org: string;
  location?: string;
  dates: string;
  /** e.g. NDA disclaimers — rendered muted under the role line. */
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
  title: "Forward-Deployed AI Engineer · Full-Stack Developer · Technical Project Lead",
  location: "South Florida",
  // Deliberately split: the assembled number/address must never appear in
  // served HTML, RSC payloads, or JS bundles, where email/phone regexes
  // harvest them. ResumeContact.tsx joins the parts in the browser after
  // mount. Edit the parts, never inline the whole thing.
  phoneParts: ["000", "000", "0000"],
  emailUser: "you",
  emailDomain: "gmail.com",
  links: [
    { label: "kevdotnet.vercel.app", href: "https://kevdotnet.vercel.app" },
    { label: "linkedin.com/in/kevinvanderpoll", href: "https://www.linkedin.com/in/kevinvanderpoll/" },
    { label: "github.com/kaypon", href: "https://github.com/kaypon" },
  ],
};

export const resumeSummary =
  "Forward-Deployed AI Engineer and Full-Stack Developer with 8+ years delivering " +
  "high-impact web, AI, blockchain, and automation solutions. Designs agentic systems, " +
  "retrieval pipelines, and vector-database workflows. Hands-on with MCP protocol, " +
  "embeddings, Pinecone/Chroma/PGVector, OpenAI Assistants API, and LangChain-style " +
  "orchestration in Node.js + Python. Certified Scrum Master with a proven record of " +
  "leading Agile teams, shipping MVPs fast, reducing manual work by 50–70%, and " +
  "bridging business goals with technical execution.";

export const resumeSkills: { group: string; items: string }[] = [
  {
    group: "AI Engineering",
    items:
      "MCP protocol, custom MCP tool servers, OpenAI Assistants API, function calling, agent orchestration, embeddings, vector search, RAG pipelines, evaluation frameworks, LangChain-style chains, metadata filtering",
  },
  {
    group: "Frontend",
    items:
      "React, Next.js, TypeScript, JavaScript (ES6+), Vue, TailwindCSS, responsive UI, state management, Liquid templating",
  },
  {
    group: "Backend",
    items:
      "Node.js, Express, Python, REST, GraphQL, SQL, PostgreSQL, MongoDB, FaunaDB, Firebase, microservices, JWT/OAuth authentication",
  },
  {
    group: "Blockchain / Web3",
    items:
      "Solidity, Web3.js, Ethereum smart contracts, Hyperledger Fabric, IPFS, NFTs, wallets",
  },
  {
    group: "Cloud & DevOps",
    items: "AWS (Lambda, S3, EC2), Docker, GitHub Actions (CI/CD), GCP, serverless, Redis caching",
  },
  {
    group: "Automation / Integration",
    items: "Make.com, Zapier, Memberstack, Webflow CMS, Shopify, OpenAI API, AI integrations",
  },
  { group: "Vector Databases", items: "Pinecone, Chroma, PGVector, Weaviate" },
  {
    group: "Leadership / Delivery",
    items:
      "Certified Scrum Master, Agile (Scrum, Kanban, SAFe), client-facing engineering, sprint planning, backlog refinement, QA automation, velocity optimization, MVP delivery",
  },
  {
    group: "Tools",
    items: "Jira, Confluence, GitHub, Figma",
  },
];

export const resumeExperience: ResumeExperience[] = [
  {
    role: "AI Engineer",
    org: "Synvestable",
    location: "Sunrise, FL",
    dates: "January 2025 — current",
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
    dates: "June 2022 — March 2025",
    bullets: [
      "Shipped full-stack apps in React, Node.js, TypeScript, SQL, and AWS that raised performance and stability across every client platform.",
      "Built LLM-powered agents for content generation, data cleanup, and automated reporting on OpenAI APIs + serverless orchestration.",
      "Designed embedding and vector-search pipelines (Chroma + PGVector) that cut editing time by 70%.",
      "Prototyped MCP-compatible tools that let agents call internal APIs, classify documents, and close out CRM tasks on their own.",
      "Rolled out AI-driven customer workflows that cut reporting cycles by 50–70%.",
      "Stood up CI/CD pipelines with GitHub Actions, cutting deployment time by 60%.",
      "Owned end-to-end client delivery (planning, architecture, sprints, QA, deployment, post-launch optimization), shipping MVPs 60% faster through streamlined Agile and QA automation.",
      "Built Webflow/Shopify systems on Make.com + Node.js automations that lifted client sales.",
    ],
  },
  {
    role: "Full Stack Engineer",
    org: "Lincoln Network",
    location: "Remote, FL",
    dates: "March 2020 — May 2022",
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
    dates: "October 2019 — March 2020",
    note: "Work performed under NDA. Details limited.",
    bullets: [
      "Built blockchain-based biometric identity and authentication prototypes on Hyperledger Fabric + Ethereum smart contracts.",
      "Designed secure decentralized storage on IPFS with encryption standards baked in.",
      "Shipped proof-of-concept features in a fast-moving Agile squad.",
    ],
  },
  {
    role: "Full Stack Engineer / Scrum Master",
    org: "Bushido Lab",
    location: "Miami, FL",
    dates: "October 2017 — June 2019",
    bullets: [
      "Built web apps, smart contracts, wallets, and NFT systems in JavaScript, Solidity, and Web3.js.",
      "Pioneered the studio's IPFS integrations for decentralized storage and metadata distribution.",
      "Ran Scrum ceremonies, velocity tracking, and technical planning as the team's Scrum Master.",
    ],
  },
];

// Live, clickable proof of range — all shipped, all mine, all one tap away.
export const resumeProjects: ResumeProject[] = [
  {
    name: "VAN (kevdotnet.vercel.app)",
    stack: "Next.js / TypeScript",
    description:
      "This resume's home: a halftone wanted-poster that types itself in, dissolves, and inverts into a hidden world. Secret pages, a working terminal, zero UI libraries.",
    href: "https://kevdotnet.vercel.app",
  },
  {
    name: "Halftone Studio",
    stack: "Canvas / image processing",
    description:
      "Upload any image and re-screen it live: dot and line screens, angle and contrast tuning, full-res export. The print engine behind the poster above.",
    href: "https://halftone-studio-sigma.vercel.app",
  },
  {
    name: "pyano",
    stack: "Web Audio API",
    description:
      "Music tools in the browser: a playable piano, a 4-track step sequencer with synthesized drums, a procedural melody generator, and a voice-to-drum-pad beatbox studio with WAV export.",
    href: "https://pyano-web.vercel.app",
  },
  {
    name: "blokc",
    stack: "Web3 / generative art",
    description:
      "Bitcoin block hashes rendered as deterministic 8×8 pixel art. The chain as an endless generative gallery.",
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
    credential: "HNC in 3D Animation and Game Design",
    location: "Prague, CZ",
    dates: "May 2015",
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
