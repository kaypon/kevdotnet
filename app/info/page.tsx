import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "Info — Kevin van der Poll",
  description: "Builder and artist based in Miami. Born in South Africa, raised in Johannesburg.",
};

export default function InfoPage() {
  return (
    <SubPageShell title="Info">
      <p>Work in progress — more coming soon.</p>
    </SubPageShell>
  );
}
