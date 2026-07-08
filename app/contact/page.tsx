import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "Contact — Kevin van der Poll",
  description: "Get in touch with Kevin van der Poll.",
};

export default function ContactPage() {
  return (
    <SubPageShell title="Contact">
      <p>
        Reach out — <a href="mailto:you@example.com">you@example.com</a>.
      </p>
      <p>
        <a href="https://github.com/kaypon" target="_blank" rel="noopener noreferrer">GitHub</a>
        {" · "}
        <a href="https://www.linkedin.com/in/kevinvanderpoll/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {" · "}
        <a href="https://x.com/kevdotpng" target="_blank" rel="noopener noreferrer">X</a>
        {" · "}
        <a href="https://www.instagram.com/kevdotpng/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </SubPageShell>
  );
}
