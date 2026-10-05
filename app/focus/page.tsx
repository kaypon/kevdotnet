import type { Metadata } from "next";
import { FocusSheet } from "@/components/FocusSheet";

// Hidden page: unlinked, out of the sitemap, and absent from the terminal's
// `ls`. Reachable by URL or `goto focus`.
export const metadata: Metadata = {
  title: "Focus — Kevin van der Poll",
  description: "Editable text with a fake depth-of-field blur made from stacked, tilted copies.",
  robots: { index: false, follow: false },
};

export default function FocusPage() {
  return <FocusSheet />;
}
