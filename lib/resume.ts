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

export const resumeHeader = {
  name: "Kevin van der Poll",
  title: "Forward-Deployed AI Engineer",
  location: "South Florida",
  // Deliberately split: the assembled number/address must never appear in
  // served HTML, RSC payloads, or JS bundles, where email/phone regexes
  // harvest them. ResumeContact.tsx joins the parts in the browser after
  // mount. Edit the parts, never inline the whole thing.
  phoneParts: ["000", "000", "0000"],
  emailUser: "you",
  emailDomain: "gmail.com",
  links: [
    { label: "kevssite.vercel.app", href: "https://kevssite.vercel.app" },
    { label: "linkedin.com/in/kevinvanderpoll", href: "https://www.linkedin.com/in/kevinvanderpoll/" },
    { label: "github.com/kaypon", href: "https://github.com/kaypon" },
  ],
};

export const resumeSummary =
  "Forward-Deployed AI Engineer with 8+ years designing agentic systems, retrieval " +
  "pipelines, vector-database workflows, and customer-integrated automation solutions. " +
  "Hands-on with MCP protocol, embeddings, Pinecone/Chroma/PGVector, OpenAI Assistants " +
  "API, and LangChain-style orchestration in Node.js + Python. Proven ability to ship " +
  "production systems fast, reduce manual work by 50–70%, and translate ambiguous " +
  "business needs into clean, automated AI workflows.";

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
      "Node.js, Python, REST, GraphQL, SQL, MongoDB, FaunaDB, Firebase, microservices, authentication",
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
      "Client-facing engineering, Agile/Scrum, backlog refinement, sprint planning, QA",
  },
];

export const resumeExperience: ResumeExperience[] = [
  {
    role: "AI Engineer",
    org: "Synvestable",
    location: "Sunrise, FL",
    dates: "January 2025 — current",
    bullets: [
      "Created internal AI copilots that helped teams draft responses, summarize records, generate reports, query documentation, and reduce manual operational work.",
      "Built reusable AI service patterns for document Q&A, proposal generation, lead qualification, support triage, data cleanup, and workflow orchestration.",
      "Built RAG pipelines using document ingestion, chunking, embeddings, vector search, and grounded response generation for internal knowledge retrieval and customer-facing support use cases.",
    ],
  },
  {
    role: "Full-Stack Developer / Technical Project Lead",
    org: "Electric Flow",
    location: "Sunrise, FL",
    dates: "June 2022 — March 2025",
    bullets: [
      "Built LLM-powered agents for content generation, data cleanup, and automated reporting using OpenAI APIs + serverless orchestrations.",
      "Designed embedding and vector-search pipelines (Chroma + PGVector) that reduced editing time by 70%.",
      "Prototyped MCP-compatible tools allowing agents to call internal APIs, classify documents, and complete CRM tasks autonomously.",
      "Implemented AI-driven customer workflows that cut reporting cycles by 50–70%.",
      "Led end-to-end delivery for client projects: planning, architecture, sprints, QA, deployment, and post-launch optimization.",
      "Built Webflow/Shopify systems powered by Make.com + Node.js automations to streamline operations.",
    ],
  },
  {
    role: "Full Stack Engineer",
    org: "Lincoln Network",
    location: "Remote, FL",
    dates: "March 2020 — May 2022",
    bullets: [
      "Delivered production apps using Vue, Node.js, GraphQL, and FaunaDB.",
      "Built data-driven experiments + A/B tests that increased engagement by double digits.",
      "Collaborated closely with PMs to define API specs, tighten acceptance criteria, and improve sprint velocity.",
    ],
  },
  {
    role: "Blockchain Engineer",
    org: "Magic Leap",
    location: "Sunrise, FL",
    dates: "October 2019 — March 2020",
    note: "Work performed under NDA — details limited.",
    bullets: [
      "Built blockchain-based identity/authentication prototypes using Hyperledger Fabric + Ethereum smart contracts.",
      "Designed secure decentralized storage systems using IPFS and encryption standards.",
      "Worked in fast-paced Agile squad building proof-of-concept features.",
    ],
  },
  {
    role: "Full Stack Engineer / Scrum Master",
    org: "Bushido Lab",
    location: "Miami, FL",
    dates: "October 2017 — June 2019",
    bullets: [
      "Built web apps, smart contracts, wallets, and NFT systems using JavaScript, Solidity, and Web3.js.",
      "Integrated IPFS for decentralized storage and metadata distribution.",
      "Facilitated Scrum ceremonies, velocity tracking, and technical planning.",
    ],
  },
];

export const resumeEducation: ResumeEducation[] = [
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
