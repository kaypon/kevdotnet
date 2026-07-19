import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";
import { ContactModal } from "@/components/ContactModal";

export const metadata: Metadata = {
  title: "Contact — Kevin van der Poll",
  description: "Start a conversation with Kevin van der Poll.",
};

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/kaypon" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/kevinvanderpoll/" },
  { label: "X",         href: "https://x.com/kevdotpng" },
  { label: "Instagram", href: "https://www.instagram.com/kevdotpng/" },
];

export default function ContactPage() {
  return (
    <SubPageShell title="Contact">
      <ul className="contact-socials">
        {SOCIALS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="contact-social__link">
              {label} ↗
            </a>
          </li>
        ))}
      </ul>

      <div className="contact-cta">
        <p className="contact-cta__copy">
          Want to build something? Have a weird idea? Just say hi.
        </p>
        <ContactModal />
      </div>
    </SubPageShell>
  );
}
