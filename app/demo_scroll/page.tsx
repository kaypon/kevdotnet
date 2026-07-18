import type { Metadata } from "next";
import { ScrollCanvas } from "@/components/ScrollCanvas";

export const metadata: Metadata = {
  title: "Scroll Demo",
};

export default function DemoScrollPage() {
  return <ScrollCanvas />;
}
