import type { Metadata } from "next";
import { Poster } from "@/components/Poster";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <Poster />;
}
