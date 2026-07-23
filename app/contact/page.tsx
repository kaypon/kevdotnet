import type { Metadata } from "next";
import Link from "next/link";
import { SubPageShell } from "@/components/SubPageShell";
import { ContactModal } from "@/components/ContactModal";

export const metadata: Metadata = {
  title: "Contact — Kevin van der Poll",
  description: "Start a conversation with Kevin van der Poll.",
  alternates: { canonical: "/contact" },
};

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/kaypon" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/kevinvanderpoll/" },
  { label: "X",         href: "https://x.com/kevdotpng" },
  { label: "Instagram", href: "https://www.instagram.com/kevdotpng/" },
];

export default function ContactPage() {
  return (
    <SubPageShell title="Contact" titleTransition="contact">
      <ul className="contact-socials">
        {SOCIALS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="contact-social__link">
              {label} ↗
            </a>
          </li>
        ))}
        <li>
          <Link href="/resume" className="contact-social__link">
            Resume
          </Link>
        </li>
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
