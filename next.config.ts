import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  redirects() {
    return [{ source: "/van", destination: "/kev", permanent: true }];
  },
};

export default nextConfig;
