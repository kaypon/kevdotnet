import type { Metadata } from "next";
import { SpinStudio } from "@/components/SpinStudio";
import { BackLink } from "@/components/BackLink";

export const metadata: Metadata = {
  title: "SPIN — Kevin van der Poll",
  description: "360° of KEV. Drag to spin, tune the halftone.",
  alternates: { canonical: "/spin" },
};

export default function SpinPage() {
  return (
    <main className="spin-page">
      <div className="spin-page__inner">
        <BackLink href="/kev" className="spin-back" />
        <h1 className="sr-only">SPIN — Kevin van der Poll</h1>
        <SpinStudio />
      </div>
    </main>
  );
}
