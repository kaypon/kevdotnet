import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "Contact — Kevin van der Poll",
  description: "Get in touch with Kevin van der Poll.",
};

export default function ContactPage() {
  return (
    <SubPageShell title="Contact">
      <p>Work in progress — more coming soon.</p>
    </SubPageShell>
  );
}
