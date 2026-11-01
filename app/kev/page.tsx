import type { Metadata } from "next";
import Link from "next/link";
import {
  getPosterHalftoneImages,
  posterCaption,
  posterHeadline,
  posterLore,
  posterTiles,
} from "@/lib/data";
import { PosterNav } from "@/components/PosterNav";
import { ScramblingPosterGrid } from "@/components/ScramblingPosterGrid";
import { SpinHead } from "@/components/SpinHead";

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
  title: "Kevin van der Poll",
  description: "Kevin van der Poll. Code artist. Terminal as canvas.",
  alternates: { canonical: "/kev" },
};

export default function KevPage() {
  const images = getPosterHalftoneImages();
  const photoTileCount = posterTiles.filter((tile) => !tile.bare).length;

  return (
    <main className="poster-page poster-page--dark">
      <section className="poster" aria-label={`${posterHeadline} — Kevin van der Poll poster`}>
        <h1 className="sr-only">{posterHeadline} — Kevin van der Poll</h1>
        <ScramblingPosterGrid
          tiles={posterTiles}
          photoUrl={images[0]}
          fadedCount={photoTileCount}
          loreNode={buildLoreNode(posterLore)}
          interactive={false}
        >
          {/* The page's closing beat: fades in after the nav settles. */}
          <SpinHead />
        </ScramblingPosterGrid>
        <p className="poster-caption poster-caption--ghost" aria-hidden="true">
          {posterCaption}
        </p>
      </section>
      <PosterNav />
    </main>
  );
}
