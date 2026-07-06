import type { Metadata } from "next";
import Link from "next/link";
import { TerminalWindow } from "@/components/TerminalWindow";

export const metadata: Metadata = {
  title: "Terminal — Kevin van der Poll",
  description: "A terminal for exploring kevs.site.",
};

export default function TerminalPage() {
  return (
    <main className="term-page">
      <div className="term-page__inner">
        <Link href="/van" className="term-back">← van</Link>
        <TerminalWindow />
      </div>
    </main>
  );
}
