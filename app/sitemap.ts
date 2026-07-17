import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE = "https://kevssite.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/van", "/info", "/now", "/projects", "/contact", "/terminal", "/spin"].map(
    (path) => ({ url: `${BASE}${path}` })
  );

  // Info pages exist only for linked projects — mirrors generateStaticParams
  // in app/projects/[slug]/page.tsx. /line-up stays out: it's unlinked WIP.
  const projectRoutes = projects
    .filter((project) => project.href)
    .map((project) => ({ url: `${BASE}/projects/${project.slug}` }));

  return [...staticRoutes, ...projectRoutes];
}
