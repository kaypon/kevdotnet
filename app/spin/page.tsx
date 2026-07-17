import type { Metadata } from "next";
import Link from "next/link";
import { SpinStudio } from "@/components/SpinStudio";

export const metadata: Metadata = {
  title: "SPIN — Kevin van der Poll",
  description: "360° of Kevin. Drag to spin, tune the halftone.",
};

export default function SpinPage() {
  return (
    <main className="spin-page">
      <div className="spin-page__inner">
        <Link href="/van" className="spin-back">← van</Link>
        <h1 className="sr-only">SPIN — Kevin van der Poll</h1>
        <SpinStudio />
      </div>
    </main>
  );
}
