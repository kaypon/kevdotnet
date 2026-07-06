import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import type { PosterTileData } from "@/lib/data";
import { PosterTile } from "./PosterTile";

type PosterGridProps = {
  tiles: PosterTileData[];
  photoUrl: string;
  fadedCount?: number;
  isLoading?: boolean;
  /** Mid-sweep for a tap-to-cycle swap — see PosterTile's props of the same
   * names. */
  nextPhotoUrl?: string;
  switchedIds?: Set<string>;
  /** Typed in below the VAN letters once the hidden sequence reaches its
   * final beat — kept inside the grid's own box so revealing it can never
   * add page height/scroll. */
  loreText?: string;
  /** False for the static /van display (no click-to-cycle, no hold-to-reveal
   * — the reveal already happened on `/`), so it shouldn't announce itself
   * as a button or tab-stop to nothing. Defaults to true for `/`'s
   * interactive usage. */
  interactive?: boolean;
  onPointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export function PosterGrid({
  tiles,
  photoUrl,
  fadedCount,
  isLoading,
  nextPhotoUrl,
  switchedIds,
  loreText,
  interactive = true,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onKeyDown,
}: PosterGridProps) {
  return (
    <div
      className={`poster-grid${isLoading ? " poster-grid--loading" : ""}${interactive ? "" : " poster-grid--static"}`}
      style={{ "--photo-url": `url(${photoUrl})` } as CSSProperties}
      {...(interactive
        ? {
            onPointerDown,
            onPointerUp,
            onPointerLeave,
            onKeyDown,
            role: "button" as const,
            tabIndex: 0,
            "aria-label": "Cycle through halftone treatments. Press and hold to reveal more.",
          }
        : {})}
    >
      {tiles.map((tile) => (
        <PosterTile
          key={tile.id}
          tile={tile}
          fadedCount={fadedCount}
          nextPhotoUrl={nextPhotoUrl}
          switchedIds={switchedIds}
        />
      ))}
      {loreText ? (
        <div className="poster-lore">
          <p className="poster-lore__text">{loreText}</p>
        </div>
      ) : null}
    </div>
  );
}
