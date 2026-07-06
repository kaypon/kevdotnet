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
        Kevin van der Poll is a builder and artist based in Miami. Born in South Africa and raised
        in Johannesburg, he is always making something. Code, AI tools, visuals, objects,
        experiments. Most of it lives somewhere between useful and strange.
      </p>
      <p>
        The through-line goes back to a kid in Johannesburg editing MySpace profiles and messing
        with school computers — changing layouts, finding loopholes, breaking things just enough
        to understand them. Everything since has followed the same pattern: get inside the system,
        learn its rules, bend them into something personal.
      </p>
      <p>
        Right now that means shipping software for people with actual work to do, prototyping AI
        tooling, and treating design as an extension of the same instinct — the halftone poster on
        the home page is one example.
      </p>
    </SubPageShell>
  );
}
