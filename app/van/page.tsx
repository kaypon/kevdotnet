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

function buildLoreNode(lore: string) {
  const [p1, p2, p3] = lore.split("\n\n");
  return (
    <div className="poster-lore">
      <p className="poster-lore__text">
        <Link href="/terminal" className="poster-lore__link">{p1}</Link>
        {"\n\n"}{p2}
        {p3 ? <>{"\n\n"}{p3}</> : null}
      </p>
    </div>
  );
}

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
          loreNode={buildLoreNode(posterLore)}
          interactive={false}
        />
        <p className="poster-caption poster-caption--ghost" aria-hidden="true">
          {posterCaption}
        </p>
      </section>
      <nav className="poster-nav" aria-label="Site sections">
        {[
          { href: "/now", label: "now", tagline: "whats happening" },
          { href: "/info", label: "info", tagline: "need some more" },
          { href: "/projects", label: "projects", tagline: "can i see your" },
          { href: "/contact", label: "contact", tagline: "how do i get in" },
        ].map(({ href, label, tagline }) => (
          <Link key={href} href={href}>
            <span className="poster-nav__tagline" aria-hidden="true">
              {tagline.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="poster-nav__tw"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span>{word}</span>
                </span>
              ))}
            </span>
            <span className="poster-nav__label">{label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
