import type { Metadata } from "next";
import { TerminalWindow } from "@/components/TerminalWindow";

export const metadata: Metadata = {
  title: "Terminal — Kevin van der Poll",
  description: "A terminal for exploring kevs.site.",
};

export default function TerminalPage() {
  return (
    <main className="term-page">
      <TerminalWindow />
    </main>
  );
}
