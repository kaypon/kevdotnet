import { posterCaption, posterCredit, posterHeadline, posterTiles } from "@/lib/data";
import { PosterTile } from "./PosterTile";

export function Poster() {
  return (
    <main className="poster-page">
      <section
        className="poster"
        aria-label={`${posterHeadline} — Kevin van der Poll poster`}
      >
        <h1 className="sr-only">{posterHeadline} — Kevin van der Poll</h1>
        <div className="poster-grid">
          {posterTiles.map((tile) => (
            <PosterTile key={tile.id} tile={tile} />
          ))}
        </div>
        <p className="poster-caption">{posterCaption}</p>
        <p className="poster-credit">{posterCredit}</p>
      </section>
    </main>
  );
}
