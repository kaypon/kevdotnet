import type { Metadata } from "next";
import { SpinStudio } from "@/components/SpinStudio";

export const metadata: Metadata = {
  title: "SPIN — Kevin van der Poll",
  description: "360° of Kevin. Drag to spin, tune the halftone.",
};

export default function SpinPage() {
  return (
    <main className="spin-page">
      <h1 className="sr-only">SPIN — Kevin van der Poll</h1>
      <SpinStudio />
    </main>
  );
}
