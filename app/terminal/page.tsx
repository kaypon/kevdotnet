import type { Metadata } from "next";
import { TerminalWindow } from "@/components/TerminalWindow";
import { BackLink } from "@/components/BackLink";

export const metadata: Metadata = {
  title: "Terminal — Kevin van der Poll",
  description: "A terminal for exploring kevs.site.",
  alternates: { canonical: "/terminal" },
};

export default function TerminalPage() {
  return (
    <main className="term-page">
      <div className="term-page__inner">
        <BackLink href="/kev" className="term-back" />
        <TerminalWindow />
      </div>
    </main>
  );
}
