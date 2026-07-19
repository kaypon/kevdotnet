"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PosterTileData } from "@/lib/data";
import { PosterGrid } from "./PosterGrid";
import { useTypewriter } from "./useTypewriter";

type VanIntroProps = {
  tiles: PosterTileData[];
  images: string[];
  lore: string;
  caption: string;
};

const GRID_IN_DELAY_MS = 300;
const GRID_IN_DURATION_MS = 500;
const VAN_PAUSE_MS = 500;
const FADE_STEP_MS = 140;

type Phase = "hidden" | "van" | "van-pause" | "tiles" | "typing" | "done";

export function VanIntro({ tiles, images, lore, caption }: VanIntroProps) {
  const photoTileCount = tiles.filter((t) => !t.bare).length;
  const [gridVisible, setGridVisible] = useState(false);
  const [fadedCount, setFadedCount] = useState(photoTileCount);
  const [phase, setPhase] = useState<Phase>("hidden");
  const { text: loreText, typeIn: loreTypeIn } = useTypewriter("", 30);

  // Step 1: fade grid in after a short mount delay
  useEffect(() => {
    const t = setTimeout(() => {
      setGridVisible(true);
      setPhase("van");
    }, GRID_IN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Step 2: once grid is visible, reveal V tile (fadeOrder=7) — VAN complete
  useEffect(() => {
    if (phase !== "van") return;
    const t = setTimeout(() => {
      setFadedCount((c) => c - 1);
      setPhase("van-pause");
    }, GRID_IN_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Step 3: brief hold on VAN before the blocks below cascade in
  useEffect(() => {
    if (phase !== "van-pause") return;
    const t = setTimeout(() => setPhase("tiles"), VAN_PAUSE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Step 4: reveal the remaining tiles one by one in reverse-fade order
  useEffect(() => {
    if (phase !== "tiles") return;
    let count = photoTileCount - 1;
    const interval = setInterval(() => {
      count -= 1;
      setFadedCount(count);
      if (count <= 0) {
        clearInterval(interval);
        setPhase("typing");
      }
    }, FADE_STEP_MS);
    return () => clearInterval(interval);
  }, [phase, photoTileCount]);

  // Step 5: type lore text in
  useEffect(() => {
    if (phase !== "typing") return;
    loreTypeIn(lore, () => setPhase("done"));
  }, [phase, lore, loreTypeIn]);

  return (
    <main className="poster-page poster-page--dark">
      <section className="poster" aria-label="VAN — Kevin van der Poll poster">
        <h1 className="sr-only">VAN — Kevin van der Poll</h1>
        <div className={`van-intro-grid${gridVisible ? " van-intro-grid--visible" : ""}`}>
          <PosterGrid
            tiles={tiles}
            photoUrl={images[0]}
            fadedCount={fadedCount}
            loreText={phase === "typing" || phase === "done" ? loreText : undefined}
            interactive={false}
          />
        </div>
        <p className="poster-caption poster-caption--ghost" aria-hidden="true">
          {caption}
        </p>
      </section>
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
