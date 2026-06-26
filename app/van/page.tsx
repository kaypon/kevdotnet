import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { EditorialCard } from "@/components/EditorialCard";
import { EvidenceLedger } from "@/components/EvidenceLedger";
import { NumberedList } from "@/components/NumberedList";
import { SiteMasthead } from "@/components/SiteMasthead";
import { evidence, obsessions, operatingRules, pressure } from "@/lib/data";

export const metadata: Metadata = {
  title: "VAN — Kevin van der Poll",
  description:
    "Things VAN has made, survived, obsessed over, and learned to finish.",
};

export default function VanPage() {
  return (
    <main className="editorial-page magazine-page van-page" id="top">
      <SiteMasthead
        current="van"
        descriptor="Things made / current obsessions / operating rules"
        railCopy="Things made, pressure survived, current obsessions, and a few rules worth remembering."
        railMeta="Identity file / still becoming"
      />
      <div className="magazine-canvas van-magazine">
        <section className="magazine-section evidence-magazine-section" id="evidence">
          <EvidenceLedger
            items={evidence}
            lead={
              <>
                <EditorialCard
                  eyebrow="Identity file / Kevin van der Poll, if you’re being formal"
                  title="Old man. Young body."
                  body="I make useful shit, weird experiments, and systems that survive contact with real people."
                  meta="VAN / Miami / still becoming"
                  tone="ink"
                  className="van-intro-card"
                />
                <EditorialCard
                  eyebrow="01 / Selected evidence"
                  title="Made this shit."
                  body="Not an exhaustive archive. Just enough proof to establish a pattern."
                  meta={`${evidence.length} exhibits / more in progress`}
                  tone="sand"
                  className="section-title-card"
                />
              </>
            }
          />
        </section>

        <section className="magazine-section pressure-magazine-section" id="pressure">
          <EditorialCard
            eyebrow="02 / Field experience"
            title="Built under pressure."
            body={pressure.lede}
            meta="Restaurants / construction / clients / software"
            tone="ink"
            className="pressure-lede-card"
          />
          <EditorialCard
            eyebrow="Field note 02A"
            title="Abstract tools have to survive contact with real people."
            body={pressure.body}
            meta="No perfect spec required"
            tone="paper"
            className="pressure-body-card"
            headingLevel={3}
          />
        </section>

        <section className="magazine-section obsession-magazine-section" id="obsessions">
          <NumberedList
            items={obsessions}
            label="Current obsessions"
            lead={
              <EditorialCard
                eyebrow="03 / Current fixations"
                title="Currently obsessed with"
                body="The subjects currently eating the tabs, notebooks, and available brain space."
                meta={`${obsessions.length} active investigations`}
                tone="sand"
                className="section-title-card"
              />
            }
          />
        </section>

        <section className="magazine-section rules-magazine-section" id="rules">
          <NumberedList
            items={operatingRules}
            label="Operating rules"
            variant="rules"
            lead={
              <EditorialCard
                eyebrow="04 / Operating system"
                title="Rules, apparently."
                body="Nothing laminated. Just the shit worth remembering when motivation gets theatrical."
                meta={`${operatingRules.length} rules / subject to proof`}
                tone="ink"
                className="section-title-card"
              />
            }
          />
        </section>

        <ContactCTA number="05" />
      </div>
    </main>
  );
}
