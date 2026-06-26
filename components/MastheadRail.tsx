import Link from "next/link";
import type { MastheadRoute } from "./MastheadIdentity";
import { contact } from "@/lib/data";

type MastheadRailProps = {
  current: MastheadRoute;
  copy: string;
  meta: string;
};

export function MastheadRail({ current, copy, meta }: MastheadRailProps) {
  return (
    <section className="masthead-rail" aria-label="Issue contents">
      <p className="masthead-rail-copy">{copy}</p>
      <nav aria-label="Primary navigation">
        <Link href="/work" aria-current={current === "work" ? "page" : undefined}>
          Work
        </Link>
        <Link href="/van" aria-current={current === "van" ? "page" : undefined}>
          Van
        </Link>
        <a href={`mailto:${contact.email}`}>Contact</a>
      </nav>
      <div className="masthead-rail-meta">
        <span>Contents / 001</span>
        <span>{meta}</span>
      </div>
    </section>
  );
}
