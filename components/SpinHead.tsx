"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { spinHeadFrames } from "@/lib/spin";

/** Kevin's head, constantly spinning — the same halftone treatment as /spin,
 * auto-advanced on a timer. Floats under the lore text on /van (absolutely
 * positioned inside .poster-grid, see .spin-head in spin.css) and fades in
 * last, after the nav has settled. Links through to /spin. Honors
 * prefers-reduced-motion by standing still. */

const FRAME_MS = 150;

export function SpinHead() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % spinHeadFrames.length), FRAME_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <Link href="/spin" className="spin-head" aria-label="Kevin's head, spinning — see the full-size spin">
      {spinHeadFrames.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          width={800}
          height={800}
          loading="eager"
          unoptimized
          draggable={false}
          className={`spin-head__frame${i === frame ? " spin-head__frame--on" : ""}`}
        />
      ))}
    </Link>
  );
}
