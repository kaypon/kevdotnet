"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";
import type { PosterTileData } from "@/lib/data";
import { PosterGrid } from "./PosterGrid";
import { useTypewriter } from "./useTypewriter";

type Phase = "intro" | "idle" | "deleting" | "fading" | "inverting" | "typing" | "done";

type PosterExperienceProps = {
  headline: string;
  tiles: PosterTileData[];
  images: string[];
  caption: string;
  lore: string;
};

const RAINBOW_WORD = "STRANGE";

const HOLD_MS = 500;
const FADE_STEP_MS = 140;
const INVERT_MS = 750;
const RIPPLE_STEP_MS = 55;
const GRID_IN_DELAY_MS = 300;

// Normalized tile centers derived from grid-template-columns: 226fr 159fr 263fr
// and grid-template-rows: 214fr 196fr 158fr 189fr (matches posterTiles in lib/data.ts)
const COL_CENTERS = [113 / 648, 305.5 / 648, 516.5 / 648] as const;
const ROW_CENTERS = [107 / 757, 312 / 757, 489 / 757, 662.5 / 757] as const;

function rippleGroups(
  photoTiles: PosterTileData[],
  cx: number,
  cy: number,
): PosterTileData[][] {
  const dist = (t: PosterTileData) =>
    Math.hypot(COL_CENTERS[t.colStart - 1] - cx, ROW_CENTERS[t.rowStart - 1] - cy);
  const sorted = [...photoTiles].sort((a, b) => dist(a) - dist(b));
  const groups: PosterTileData[][] = [];
  for (const tile of sorted) {
    const d = dist(tile);
    const last = groups[groups.length - 1];
    const lastD = last ? dist(last[0]) : -1;
    if (last && d - lastD < 0.08) {
      last.push(tile);
    } else {
      groups.push([tile]);
    }
  }
  return groups;
}

// V lands first (top-left photo block), then A and N complete the name,
// then the remaining 7 photo tiles reveal in a random order each load.
const INTRO_VAN: Array<{ id: string; pause: number }> = [
  { id: "v", pause: 0 },    // V photo block — first thing visible
  { id: "a", pause: 220 },  // A
  { id: "n", pause: 160 },  // N — VAN complete
];
const INTRO_REST_IDS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"];

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

  const [phase, setPhase] = useState<Phase>("intro");
  const phaseRef = useRef<Phase>("intro");
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const [fadedCount, setFadedCount] = useState(0);
  const [gridVisible, setGridVisible] = useState(false);
  // Starts as an empty Set; tiles are added one-by-one during the intro.
  // Set to undefined when the intro ends — PosterTile falls back to fadedCount.
  const [revealedIds, setRevealedIds] = useState<Set<string> | undefined>(new Set());

  useLayoutEffect(() => {
    return () => {
      setPhase("intro");
      setFadedCount(0);
      setGridVisible(false);
      setRevealedIds(new Set());
    };
  }, []);

  // --- halftone image cycling ---
  const [displayedSrc, setDisplayedSrc] = useState(images[0]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [nextPhotoUrl, setNextPhotoUrl] = useState<string | undefined>(undefined);
  const [switchedIds, setSwitchedIds] = useState<Set<string> | undefined>(undefined);
  const imageIndexRef = useRef(0);
  const loadedRef = useRef(new Set<string>([images[0]]));
  const isCyclingRef = useRef(false);

  useEffect(() => {
    images.forEach((src) => {
      if (loadedRef.current.has(src)) return;
      const img = new window.Image();
      img.onload = () => loadedRef.current.add(src);
      img.src = src;
    });
  }, [images]);

  const cycleImage = (clickX = 0.5, clickY = 0.5) => {
    if (isCyclingRef.current) return;
    isCyclingRef.current = true;
    imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
    const nextSrc = images[imageIndexRef.current];
    const sweep = () => {
      setNextPhotoUrl(nextSrc);
      const photoTiles = tiles.filter((t) => !t.bare);
      const groups = rippleGroups(photoTiles, clickX, clickY);
      const switched = new Set<string>();
      let step = 0;
      const advance = () => {
        for (const t of groups[step]) switched.add(t.id);
        setSwitchedIds(new Set(switched));
        step += 1;
        if (step < groups.length) {
          setTimeout(advance, RIPPLE_STEP_MS);
        } else {
          setTimeout(() => {
            setDisplayedSrc(nextSrc);
            setNextPhotoUrl(undefined);
            setSwitchedIds(undefined);
            isCyclingRef.current = false;
          }, RIPPLE_STEP_MS);
        }
      };
      advance();
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
  // Caption starts empty; intro types it in, hold sequence deletes it.
  const blurbTypewriter = useTypewriter("", 12);
  const loreTypewriter = useTypewriter("", 30);

  // The caption is justified + balanced (see .poster-caption in poster.css),
  // so typing it by slicing the string re-wraps and re-spaces the whole
  // paragraph on every keystroke. Instead the full caption is always laid
  // out and each character is revealed in place (visibility, which keeps its
  // space) — line breaks and word gaps are final from the first frame.
  const rainbowIndex = caption.lastIndexOf(RAINBOW_WORD);
  const visibleCount = blurbTypewriter.text.length;
  const renderCaptionChars = (text: string, offset: number) =>
    text.split("").map((ch, i) => (
      <span
        key={offset + i}
        style={offset + i < visibleCount ? undefined : { visibility: "hidden" }}
      >
        {ch}
      </span>
    ));

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

  // --- intro sequence ---
  // Grid fades in, V lands first, then A and N complete the name, then the
  // remaining 7 photo tiles reveal in a freshly-shuffled random order.
  useEffect(() => {
    if (phase !== "intro") return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setGridVisible(true), GRID_IN_DELAY_MS));

    // Build the full step list: fixed VAN head + shuffled tail.
    const restSteps = shuffled(INTRO_REST_IDS).map((id, i) => ({
      id,
      pause: i === 0 ? 350 : 140, // pause after VAN, then 140ms between each
    }));
    const steps = [...INTRO_VAN, ...restSteps];

    let t = GRID_IN_DELAY_MS;
    for (const { id, pause } of steps) {
      t += pause;
      const capturedId = id;
      const capturedT = t;
      timers.push(
        setTimeout(() => {
          setRevealedIds((prev) => new Set([...(prev ?? []), capturedId]));
        }, capturedT)
      );
    }

    // After all tiles are in, clear intro mode and type the caption.
    timers.push(
      setTimeout(() => {
        setRevealedIds(undefined);
        blurbTypewriter.typeIn(caption, () => setPhase("idle"));
      }, t + 200)
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // --- hold-to-reveal trigger ---
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

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    clearHoldTimer();
    if (holdTriggeredRef.current) {
      holdTriggeredRef.current = false;
      return;
    }
    if (phaseRef.current === "idle") {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cycleImage(x, y);
    }
  };

  const handleGridKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (phaseRef.current === "idle") cycleImage();
    }
  };

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

  // --- hold-to-reveal phase progression ---
  useEffect(() => {
    if (phase !== "fading") return;
    const photoTileCount = tiles.filter((tile) => !tile.bare).length;
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
  }, [phase, tiles]);

  useEffect(() => {
    if (phase !== "inverting") return;
    const timeout = setTimeout(() => setPhase("typing"), INVERT_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    router.prefetch("/van");
    loreTypewriter.typeIn(lore, () => setPhase("done"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    router.push("/van");
  }, [phase, router]);

  const isDark = phase === "inverting" || phase === "typing" || phase === "done";
  const showHint = phase === "idle";
  const introRevealedIds = phase === "intro" ? revealedIds : undefined;
  const fadedCountForGrid = phase === "idle" || phase === "deleting" ? undefined : fadedCount;

  return (
    <main className={`poster-page${isDark ? " poster-page--dark" : ""}`}>
      <section className="poster" aria-label={`${headline} — Kevin van der Poll poster`}>
        <h1 className="sr-only">{headline} — Kevin van der Poll</h1>
        <div className={`van-intro-grid${gridVisible ? " van-intro-grid--visible" : ""}`}>
          <PosterGrid
            tiles={tiles}
            photoUrl={displayedSrc}
            fadedCount={fadedCountForGrid}
            isLoading={isImageLoading}
            nextPhotoUrl={nextPhotoUrl}
            switchedIds={switchedIds}
            loreText={phase === "typing" || phase === "done" ? loreTypewriter.text : undefined}
            revealedIds={introRevealedIds}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={clearHoldTimer}
            onKeyDown={handleGridKeyDown}
          />
        </div>
        <p
          ref={captionRef}
          className="poster-caption"
          style={captionMinHeight ? { minHeight: captionMinHeight } : undefined}
        >
          {rainbowIndex === -1 ? (
            renderCaptionChars(caption, 0)
          ) : (
            <>
              {renderCaptionChars(caption.slice(0, rainbowIndex), 0)}
              <span className="poster-caption-rainbow">
                {renderCaptionChars(caption.slice(rainbowIndex), rainbowIndex)}
              </span>
            </>
          )}
        </p>
        <p className={`poster-hint${showHint ? "" : " poster-hint--hidden"}`}>[ press &amp; hold ]</p>
      </section>
    </main>
  );
}
