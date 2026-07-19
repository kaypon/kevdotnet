"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface WireConfig {
  ax: number;
  ay: number;
  ex: number;
  ey: number;
  sag: number;
  sway: number;
  stiffness: number;
  damping: number;
}

interface WireState {
  offset: number;
  velocity: number;
}

const SKIES = [
  { name: "clear day",   bg: "linear-gradient(180deg, #87CEEB 0%, #c5e8f7 100%)" },
  { name: "golden hour", bg: "linear-gradient(180deg, #f7971e 0%, #ffd200 55%, #fff8dc 100%)" },
  { name: "sunset",      bg: "linear-gradient(180deg, #c0392b 0%, #e55a2b 25%, #f0883e 55%, #ffd460 100%)" },
  { name: "dusk",        bg: "linear-gradient(180deg, #0f0c29 0%, #302b63 55%, #6b4f8e 100%)" },
  { name: "overcast",    bg: "linear-gradient(180deg, #8e9eab 0%, #b8c6ce 55%, #eceff1 100%)" },
];

// Pivot points — cross_transparent.png (1458×1079):
//   A — crossarm top (pole-cap bolt):  ax=0.352, ay=0.262
//   B — arm-pole junction:             ax=0.352, ay=0.318
//   C — left arm insulator:            ax=0.270, ay=0.348
//   D — mid-pole attachment:           ax=0.352, ay=0.700
const WIRES: WireConfig[] = [
  // ── A: crossarm top — both ways ──
  { ax: 0.352, ay: 0.262, ex: 0.00, ey: 0.352, sag: 22, sway: 0.016, stiffness: 0.112, damping: 0.883 },
  { ax: 0.352, ay: 0.262, ex: 1.00, ey: 0.352, sag: 22, sway: 0.016, stiffness: 0.112, damping: 0.883 },

  // ── C: left arm insulator — left service drop, right line wire ──
  { ax: 0.270, ay: 0.348, ex: 0.00, ey: 0.560, sag: 28, sway: 0.020, stiffness: 0.108, damping: 0.885 },
  { ax: 0.270, ay: 0.348, ex: 1.00, ey: 0.430, sag: 28, sway: 0.020, stiffness: 0.108, damping: 0.885 },

  // ── B: arm-pole junction — both ways ──
  { ax: 0.352, ay: 0.318, ex: 0.00, ey: 0.396, sag: 30, sway: 0.020, stiffness: 0.108, damping: 0.885 },
  { ax: 0.352, ay: 0.318, ex: 1.00, ey: 0.396, sag: 30, sway: 0.020, stiffness: 0.108, damping: 0.885 },

  // ── D: mid-pole — both ways ──
  { ax: 0.352, ay: 0.700, ex: 0.00, ey: 0.616, sag: 20, sway: 0.018, stiffness: 0.110, damping: 0.885 },
  { ax: 0.352, ay: 0.700, ex: 1.00, ey: 0.616, sag: 20, sway: 0.018, stiffness: 0.110, damping: 0.885 },

  // ── B: service drops ──
  { ax: 0.352, ay: 0.318, ex: 0.74, ey: 1.00, sag: 45, sway: 0.024, stiffness: 0.098, damping: 0.893 },
  { ax: 0.352, ay: 0.318, ex: 0.86, ey: 1.00, sag: 38, sway: 0.026, stiffness: 0.095, damping: 0.896 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CableStudio() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);
  const [skyIdx, setSkyIdx] = useState(0);

  useEffect(() => {
    const stage = stageRef.current!;
    const frame = frameRef.current!;
    const svg   = svgRef.current!;

    const paths = WIRES.map(() => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("class", "cables-wire");
      svg.appendChild(p);
      return p;
    });

    const states: WireState[] = WIRES.map(() => ({ offset: 0, velocity: 0 }));

    let dragging = false;
    let grabOffsetX = 0;
    let grabOffsetY = 0;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let lastFrame = performance.now();
    let rafId = 0;

    function getFramePos() {
      const sr = stage.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();
      return { x: fr.left - sr.left, y: fr.top - sr.top };
    }

    function updateWires() {
      const sr = stage.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();

      const px = fr.left - sr.left;
      const py = fr.top  - sr.top;
      const pw = fr.width;
      const ph = fr.height;
      const sw = sr.width;
      const sh = sr.height;

      WIRES.forEach((wire, i) => {
        const ax = px + pw * wire.ax;
        const ay = py + ph * wire.ay;
        const ex = sw * wire.ex;
        const ey = sh * wire.ey;
        const dx = ex - ax;
        const dy = ey - ay;

        const c1x = ax + dx * 0.34;
        const c2x = ax + dx * 0.68;
        const c1y = ay + dy * 0.34 + wire.sag + states[i].offset;
        const c2y = ay + dy * 0.68 + wire.sag + states[i].offset;

        paths[i].setAttribute("d", `M ${ax} ${ay} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`);
      });
    }

    function animate(now: number) {
      const dt = clamp((now - lastFrame) / 16.6667, 0, 2);
      lastFrame = now;

      const pos = getFramePos();
      velX = (pos.x - prevX) / Math.max(dt, 0.001);
      velY = (pos.y - prevY) / Math.max(dt, 0.001);
      prevX = pos.x;
      prevY = pos.y;

      WIRES.forEach((wire, i) => {
        const s = states[i];
        const kick = Math.abs(velX) * wire.sway + velY * wire.sway * 0.8;
        s.velocity += kick;
        s.velocity += -s.offset * wire.stiffness * dt;
        s.velocity *= Math.pow(wire.damping, dt);
        s.offset   += s.velocity * dt;
        s.offset    = clamp(s.offset, -28, 105);
      });

      updateWires();
      rafId = requestAnimationFrame(animate);
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      frame.classList.add("cables-frame--dragging");
      frame.setPointerCapture(e.pointerId);

      const sr = stage.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();

      frame.style.transform = "none";
      frame.style.left = `${fr.left - sr.left}px`;
      frame.style.top  = `${fr.top  - sr.top}px`;

      grabOffsetX = e.clientX - fr.left;
      grabOffsetY = e.clientY - fr.top;
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const sr = stage.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();

      const x = clamp(e.clientX - sr.left - grabOffsetX, 0, sr.width  - fr.width);
      const y = clamp(e.clientY - sr.top  - grabOffsetY, 0, sr.height - fr.height);

      frame.style.left = `${x}px`;
      frame.style.top  = `${y}px`;
    }

    function onPointerUp(e: PointerEvent) {
      dragging = false;
      frame.classList.remove("cables-frame--dragging");
      if (frame.hasPointerCapture(e.pointerId)) frame.releasePointerCapture(e.pointerId);
    }

    frame.addEventListener("pointerdown",   onPointerDown);
    frame.addEventListener("pointermove",   onPointerMove);
    frame.addEventListener("pointerup",     onPointerUp);
    frame.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize",       updateWires);

    const initial = getFramePos();
    prevX = initial.x;
    prevY = initial.y;

    updateWires();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      frame.removeEventListener("pointerdown",   onPointerDown);
      frame.removeEventListener("pointermove",   onPointerMove);
      frame.removeEventListener("pointerup",     onPointerUp);
      frame.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize",       updateWires);
      paths.forEach((p) => p.remove());
    };
  }, []);

  const nextIdx = (skyIdx + 1) % SKIES.length;

  return (
    <div className="cables-stage" ref={stageRef}>
      <div className="cables-frame" ref={frameRef}>
        <div className="cables-bg" style={{ background: SKIES[skyIdx].bg }} />
        <div className="cables-photo" />
      </div>
      <svg className="cables-svg" ref={svgRef} aria-hidden="true" />
      <Link href="/van" className="cables-back">[← van]</Link>
      <p className="cables-hint">I can&apos;t ever let go.</p>
      <button
        className="cables-cycle"
        onClick={() => setSkyIdx(nextIdx)}
        aria-label={`Switch to ${SKIES[nextIdx].name} sky`}
      >
        {SKIES[nextIdx].name} →
      </button>
    </div>
  );
}
