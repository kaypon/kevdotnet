import type { Metadata } from "next";
import { SubPageShell } from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "Info — Kevin van der Poll",
  description: "Builder and artist based in Miami. Born in South Africa, raised in Johannesburg.",
};

export default function InfoPage() {
  return (
    <SubPageShell title="Info">
      <p>
        Kevin van der Poll is a builder and artist based in Miami. Born in South Africa and
        raised in Johannesburg, he is always making something.
      </p>
      <p>
        The through-line goes back to a kid editing MySpace profiles — changing layouts, finding
        loopholes, breaking things just enough to understand them. Everything since has followed
        the same pattern: get inside the system, learn its rules, bend it into something
        personal.
      </p>
      <p>
        For Kevin, code and art speak the same language. The work usually takes shape through
        making, sometimes before it has a clear name — and it tends to land somewhere between
        useful and strange.
      </p>
      <p>
        Right now that means shipping software for people with actual work to do, prototyping AI
        tooling, and treating design as an extension of the same instinct.
      </p>
    </SubPageShell>
  );
}
