"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { spinHeadFrames } from "@/lib/spin";

const FRAME_MS = 150;
const IDLE_MS = 5000;
const N = spinHeadFrames.length;

export function SpinHead() {
  const [frame, setFrame] = useState(0);
  const [autoSpin, setAutoSpin] = useState(true);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // The lore text's height and the nav's position both vary with viewport
  // size (cqh-based font sizing, phone vs. desktop nav layout), so a fixed
  // CSS percentage leaves uneven gaps above/below the head depending on the
  // window. Measure the real gap and center the head inside it instead —
  // the CSS `top` below is only the pre-JS fallback.
  const [topPx, setTopPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const headEl = containerRef.current;
    if (!headEl) return;

    function reposition() {
      const grid = headEl?.closest(".poster-grid");
      const textEl = document.querySelector(".poster-lore__text");
      const navEl = document.querySelector(".poster-nav");
      if (!headEl || !grid || !textEl || !navEl) return;
      const gridTop = grid.getBoundingClientRect().top;
      const textBottom = textEl.getBoundingClientRect().bottom;
      const navTop = navEl.getBoundingClientRect().top;
      const headHeight = headEl.getBoundingClientRect().height;
      const midY = (textBottom + navTop) / 2;
      setTopPx(midY - gridTop - headHeight / 2);
    }

    reposition();
    window.addEventListener("resize", reposition);
    document.fonts?.ready.then(reposition);

    const ro = new ResizeObserver(reposition);
    const textEl = document.querySelector(".poster-lore__text");
    const navEl = document.querySelector(".poster-nav");
    if (textEl) ro.observe(textEl);
    if (navEl) ro.observe(navEl);

    return () => {
      window.removeEventListener("resize", reposition);
      ro.disconnect();
    };
  }, []);

  // Mouse-follow: map cursor angle to frame, idle-out after 5s → resume auto-spin
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Horizontal distance from head center, normalized over half the viewport width
      // → mouse has to travel far across the screen to reach max turn
      const dx = e.clientX - cx;
      const norm = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.45)));
      const offset = Math.round(-norm * 2);
      setFrame(((offset % N) + N) % N);
      setAutoSpin(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setAutoSpin(true), IDLE_MS);
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, []);

  // Auto-spin — only runs when mouse is idle
  useEffect(() => {
    if (!autoSpin) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % N), FRAME_MS);
    return () => clearInterval(id);
  }, [autoSpin]);

  return (
    <Link
      ref={containerRef}
      href="/spin"
      className="spin-head"
      style={topPx !== null ? { top: topPx } : undefined}
      aria-label="VAN's head, spinning. See the full-size spin"
    >
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
