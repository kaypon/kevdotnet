import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "Contact — Kevin van der Poll",
  description: "Get in touch with Kevin van der Poll.",
};

export default function ContactPage() {
  return (
    <SubPageShell title="Contact">
      <p>Based in Miami, working on things worth talking about. Reach out below.</p>
      <p>
        <a href="mailto:you@example.com">you@example.com</a>
      </p>
    </SubPageShell>
  );
}
