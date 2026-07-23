import type { Metadata } from "next";
import { CableStudio } from "@/components/CableStudio";

export const metadata: Metadata = {
  title: "CABLES — Kevin van der Poll",
  description: "A bare utility pole. Drag it. The wires follow.",
  alternates: { canonical: "/cables" },
};

export default function CablesPage() {
  return (
    <>
      <h1 className="sr-only">CABLES — Kevin van der Poll</h1>
      <CableStudio />
    </>
  );
}
