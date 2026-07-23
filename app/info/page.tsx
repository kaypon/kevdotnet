import type { Metadata } from "next";
import Image from "next/image";
import { SubPageShell } from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "Info — Kevin van der Poll",
  description: "Builder and artist based in Miami. Born in South Africa, raised in Johannesburg.",
  alternates: { canonical: "/info" },
};

export default function InfoPage() {
  return (
    <SubPageShell title="Info" wide titleTransition="info">
      <div className="subpage-columns">
        <div>
          <p>
            I grew up in Johannesburg and have spent most of my adult life trying to build a
            life from whatever was in front of me. I&rsquo;ve worked in bars, hotels,
            construction, and software. I&rsquo;ve managed people, written code, made drinks,
            built furniture, and started more projects than I could explain in one sitting.
          </p>
          <p>
            Most of the work here began in the hours left over. After shifts. Between jobs.
            Late at night, when an idea would not leave me alone.
          </p>
          <p>
            Some of it became useful. Some of it became art. A lot of it began as a question
            I could not answer until I made something out of it.
          </p>
          <p>
            I&rsquo;m not interested in pretending I followed a clean path. I make things
            because building is how I think, and because sometimes the only way to understand
            an idea is to give it a body.
          </p>
          <p>
            For years, I treated that work like a side effect of the rest of my life. VAN is
            what happened when I stopped.
          </p>
        </div>
        <figure className="subpage-portrait">
          <Image
            src="/photos/whatiactuallylooklike.jpg"
            alt="Portrait of Kevin van der Poll in front of a geometric metal wall"
            width={1365}
            height={2048}
            sizes="(max-width: 48rem) 100vw, 22rem"
            preload
          />
          <figcaption>whatiactuallylooklike.jpg</figcaption>
        </figure>
      </div>
    </SubPageShell>
  );
}
