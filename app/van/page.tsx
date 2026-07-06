import type { Metadata } from "next";
import Link from "next/link";
import {
  getPosterHalftoneImages,
  posterCaption,
  posterHeadline,
  posterLore,
  posterTiles,
} from "@/lib/data";
import { PosterGrid } from "@/components/PosterGrid";

export const metadata: Metadata = {
  title: "VAN — Kevin van der Poll",
  description: "Kevin van der Poll — code artist. Terminal as canvas.",
};

export default function VanPage() {
  const images = getPosterHalftoneImages();
  const photoTileCount = posterTiles.filter((tile) => !tile.bare).length;

  return (
    <main className="poster-page poster-page--dark">
      <section className="poster" aria-label={`${posterHeadline} — Kevin van der Poll poster`}>
        <h1 className="sr-only">{posterHeadline} — Kevin van der Poll</h1>
        <PosterGrid
          tiles={posterTiles}
          photoUrl={images[0]}
          fadedCount={photoTileCount}
          loreText={posterLore}
          interactive={false}
        />
        {/* Reserves the identical gap the ResizeObserver-measured caption
            holds open on `/`, with zero JS — same text, just invisible. */}
        <p className="poster-caption poster-caption--ghost" aria-hidden="true">
          {posterCaption}
        </p>
      </section>
      {/* Sibling of .poster, not nested inside it — .poster-nav positions
          itself relative to .poster-page (75% down the full viewport), not
          relative to .poster's own (grid-sized) height. */}
      <nav className="poster-nav" aria-label="Site sections">
        {[
          { href: "/info", label: "info" },
          { href: "/projects", label: "projects" },
          { href: "/contact", label: "contact" },
        ].map(({ href, label }) => (
          <Link key={href} href={href}>
            <span className="poster-nav__circle" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
