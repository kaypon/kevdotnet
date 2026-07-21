import type { Metadata } from "next";
import { SpinStudio } from "@/components/SpinStudio";
import { BackLink } from "@/components/BackLink";

export const metadata: Metadata = {
  title: "SPIN — Kevin van der Poll",
  description: "360° of VAN. Drag to spin, tune the halftone.",
};

export default function SpinPage() {
  return (
    <main className="spin-page">
      <div className="spin-page__inner">
        <BackLink href="/van" className="spin-back">[← van]</BackLink>
        <h1 className="sr-only">SPIN — Kevin van der Poll</h1>
        <SpinStudio />
      </div>
    </main>
  );
}
