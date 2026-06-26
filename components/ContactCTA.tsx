import { contact } from "@/lib/data";
import { EditorialCard } from "./EditorialCard";

type ContactCTAProps = {
  number?: string;
};

export function ContactCTA({ number = "04" }: ContactCTAProps) {
  return (
    <section className="magazine-section contact-card-section" id="contact">
      <div className="editorial-card-grid contact-card-grid">
        <EditorialCard
          eyebrow={`${number} / Open channel`}
          title="Let’s pop the fuck off."
          body="Got something worth making? Let’s make something—and some money."
          meta={contact.email}
          href={`mailto:${contact.email}`}
          linkLabel="Email VAN"
          tone="ink"
          className="contact-email-card"
        />
        <EditorialCard
          eyebrow="Direct line"
          title={contact.phoneLabel}
          body="Call or text. Be interesting."
          meta="Miami / Eastern time"
          href={`tel:${contact.phoneHref}`}
          linkLabel="Call VAN"
          tone="sand"
          className="contact-phone-card"
          headingLevel={3}
        />
        {contact.socials.map((social, index) => (
          <EditorialCard
            key={social}
            eyebrow={`Social 0${index + 1}`}
            title={social}
            body="The account exists in the future."
            meta="Coming soon"
            tone="paper"
            className="contact-social-card"
            headingLevel={3}
          />
        ))}
        <EditorialCard
          eyebrow="Navigation"
          title="Back to the cover."
          meta="VAN / issue 001"
          href="/"
          linkLabel="Home"
          tone="paper"
          className="contact-home-card"
          headingLevel={3}
        />
      </div>
      <footer className="magazine-footer">
        <span>VAN / Kevin van der Poll</span>
        <span>Let’s make something—and some money.</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
