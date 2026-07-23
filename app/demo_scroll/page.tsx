import type { Metadata } from "next";
import { ScrollCanvas } from "@/components/ScrollCanvas";

// A working prototype, not a finished piece — kept out of the index like
// /line-up until it's ready to stand as a real project page.
export const metadata: Metadata = {
  title: "Scroll Demo — Kevin van der Poll",
  description: "A scroll-scrubbed video prototype: canvas frames driven by scroll position, built as a demo of the technique.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demo_scroll" },
};

export default function DemoScrollPage() {
  return <ScrollCanvas />;
}
