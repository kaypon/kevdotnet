"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { PosterTileData } from "@/lib/data";
import { PosterGrid } from "./PosterGrid";
import { useTypewriter } from "./useTypewriter";

type Phase = "idle" | "deleting" | "fading" | "inverting" | "typing" | "done";

type PosterExperienceProps = {
  headline: string;
  tiles: PosterTileData[];
  images: string[];
  caption: string;
  lore: string;
};

const HOLD_MS = 500;
const FADE_STEP_MS = 140;
const INVERT_MS = 750;
// How fast each tile flips to the next treatment during a tap-cycle sweep —
// quick enough that 8 tiles resolve almost instantly.
const SWITCH_STEP_MS = 14;
const REVEALED_STORAGE_KEY = "van-poster-revealed";

// Fisher-Yates — a fresh random switch order every tap, so the sweep never
// reads as the same fixed animation running twice in a row.
function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function PosterExperience({
  headline,
  tiles,
  images,
  caption,
  lore,
}: PosterExperienceProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const [fadedCount, setFadedCount] = useState(0);

  // Safety net: if this component is ever kept alive across navigation
  // instead of fully unmounting (not the case today — see /van's plan notes
  // — but cheap to guard against if that ever changes), make sure coming
  // back to `/` always resets to a fresh idle face page.
  useLayoutEffect(() => {
    return () => {
      setPhase("idle");
      setFadedCount(0);
    };
  }, []);

  // --- halftone image cycling (quick tap only) ---
  // A tap sweeps the grid tile-by-tile in a fresh random order each time
  // (deliberately distinct from the hold-to-reveal fade's fixed snake order)
  // rather than hard-cutting the whole photo at once: each tile flips to the
  // next treatment a beat after the last, so cycling reads as a quick
  // deliberate flip instead of a jarring blink.
  const [displayedSrc, setDisplayedSrc] = useState(images[0]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [nextPhotoUrl, setNextPhotoUrl] = useState<string | undefined>(undefined);
  const [switchedIds, setSwitchedIds] = useState<Set<string> | undefined>(undefined);
  const imageIndexRef = useRef(0);
  const loadedRef = useRef(new Set<string>([images[0]]));
  const isCyclingRef = useRef(false);
  const photoTileIds = tiles.filter((tile) => !tile.bare).map((tile) => tile.id);

  useEffect(() => {
    images.forEach((src) => {
      if (loadedRef.current.has(src)) return;
      const img = new window.Image();
      img.onload = () => loadedRef.current.add(src);
      img.src = src;
    });
  }, [images]);

  const cycleImage = () => {
    if (isCyclingRef.current) return;
    isCyclingRef.current = true;

    imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
    const nextSrc = images[imageIndexRef.current];

    const sweep = () => {
      setNextPhotoUrl(nextSrc);
      const order = shuffled(photoTileIds);
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setSwitchedIds(new Set(order.slice(0, count)));
        if (count >= order.length) {
          clearInterval(interval);
          setDisplayedSrc(nextSrc);
          setNextPhotoUrl(undefined);
          setSwitchedIds(undefined);
          isCyclingRef.current = false;
        }
      }, SWITCH_STEP_MS);
    };

    if (loadedRef.current.has(nextSrc)) {
      sweep();
      return;
    }
    setIsImageLoading(true);
    const img = new window.Image();
    img.onload = () => {
      loadedRef.current.add(nextSrc);
      setIsImageLoading(false);
      sweep();
    };
    img.src = nextSrc;
  };

  // --- typewriters ---
  // The bio blurb is static on load (no entrance typing) — it only deletes
  // when the hidden sequence starts.
  const blurbTypewriter = useTypewriter(caption, 12);
  const loreTypewriter = useTypewriter("", 30);

  // Locks the caption box to the tallest height it's naturally rendered at
  // (i.e. with the full caption showing), so deleting down to fewer lines
  // never shrinks the box and re-centers/shifts the poster above it.
  const captionRef = useRef<HTMLParagraphElement>(null);
  const captionMinHeightRef = useRef(0);
  const [captionMinHeight, setCaptionMinHeight] = useState(0);

  useEffect(() => {
    const el = captionRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      if (height > captionMinHeightRef.current) {
        captionMinHeightRef.current = height;
        setCaptionMinHeight(height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // --- discoverability hint (shown once, until the sequence is completed) ---
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(REVEALED_STORAGE_KEY)) setHintDismissed(true);
  }, []);

  useEffect(() => {
    if (phase !== "done") return;
    localStorage.setItem(REVEALED_STORAGE_KEY, "1");
  }, [phase]);

  // --- hidden hold-to-reveal trigger ---
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTriggeredRef = useRef(false);

  const startSequence = () => {
    if (phaseRef.current !== "idle") return;
    setPhase("deleting");
    blurbTypewriter.typeOut(caption, () => setPhase("fading"));
  };

  const handlePointerDown = () => {
    holdTriggeredRef.current = false;
    holdTimeoutRef.current = setTimeout(() => {
      holdTriggeredRef.current = true;
      startSequence();
    }, HOLD_MS);
  };

  const clearHoldTimer = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const handlePointerUp = () => {
    clearHoldTimer();
    if (holdTriggeredRef.current) {
      holdTriggeredRef.current = false;
      return;
    }
    if (phaseRef.current === "idle") cycleImage();
  };

  const handleGridKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (phaseRef.current === "idle") cycleImage();
    }
  };

  // Global spacebar trigger.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.key !== " ") return;
      if (phaseRef.current !== "idle") return;
      event.preventDefault();
      startSequence();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- phase progression ---
  useEffect(() => {
    if (phase !== "fading") return;
    // Only photo tiles ever fade (bare cells have no fadeOrder — see
    // lib/data.ts's withFadeOrder), so the interval must count up to exactly
    // that many steps. Ticking a fixed 12 times regardless would waste steps
    // on bare cells that have nothing visible to show, producing dead gaps
    // in the cascade instead of a steady run of fades.
    const photoTileCount = tiles.filter((tile) => !tile.bare).length;
    // fadedCount starts at 0 by default and this effect only ever runs once
    // (the sequence is one-way), so no explicit reset is needed here.
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setFadedCount(count);
      if (count >= photoTileCount) {
        clearInterval(interval);
        setPhase("inverting");
      }
    }, FADE_STEP_MS);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "inverting") return;
    const timeout = setTimeout(() => setPhase("typing"), INVERT_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    // Warm /van a beat before we need it, so the eventual push is instant.
    router.prefetch("/van");
    loreTypewriter.typeIn(lore, () => setPhase("done"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Once the sequence is fully done, hand off to the dedicated /van page —
  // a real navigation (not just local state) so browser back/forward works:
  // back from /van returns here to a fresh idle face page, and later back
  // from /info (etc.) returns to /van specifically.
  useEffect(() => {
    if (phase !== "done") return;
    router.push("/van");
  }, [phase, router]);

  const isDark = phase === "inverting" || phase === "typing" || phase === "done";
  const showFadedTiles = !(phase === "idle" || phase === "deleting");
  const showHint = phase === "idle" && !hintDismissed;

  return (
    <main className={`poster-page${isDark ? " poster-page--dark" : ""}`}>
      <section className="poster" aria-label={`${headline} — Kevin van der Poll poster`}>
        <h1 className="sr-only">{headline} — Kevin van der Poll</h1>
        <PosterGrid
          tiles={tiles}
          photoUrl={displayedSrc}
          fadedCount={showFadedTiles ? fadedCount : undefined}
          isLoading={isImageLoading}
          nextPhotoUrl={nextPhotoUrl}
          switchedIds={switchedIds}
          loreText={phase === "typing" || phase === "done" ? loreTypewriter.text : undefined}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={clearHoldTimer}
          onKeyDown={handleGridKeyDown}
        />
        <p
          ref={captionRef}
          className="poster-caption"
          style={captionMinHeight ? { minHeight: captionMinHeight } : undefined}
        >
          {blurbTypewriter.text}
        </p>
        <p className={`poster-hint${showHint ? "" : " poster-hint--hidden"}`}>[ press &amp; hold ]</p>
      </section>
    </main>
  );
}
