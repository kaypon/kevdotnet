import {
  getPosterHalftoneImages,
  posterCaption,
  posterHeadline,
  posterLore,
  posterTiles,
} from "@/lib/data";
import { PosterExperience } from "./PosterExperience";

export function Poster() {
  return (
    <PosterExperience
      headline={posterHeadline}
      tiles={posterTiles}
      images={getPosterHalftoneImages()}
      caption={posterCaption}
      lore={posterLore}
    />
  );
}
