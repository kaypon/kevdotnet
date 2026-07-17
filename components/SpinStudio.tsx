"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { spinSourceFrames } from "@/lib/spin";

/** /spin: a tiny halftone studio around the 360° photo set. The 8 un-screened
 * cutouts are decoded once into luminance+alpha buffers; every frame change or
 * setting tweak re-screens the current frame onto the canvas live. The
 * transparent background never gets ink — cells outside the cutout's alpha are
 * skipped, exactly like the pre-baked frames on /van.
 *
 * Spinning: drag the canvas horizontally (or arrow keys), or click auto-spin —
 * each click steps the speed up until it stops again.
 */

const SIZE = 1000; // internal canvas resolution, matches the source frames
// Auto-spin cycles through these on each click: off → slow → fast → faster → off.
const AUTO_SPEEDS = [
  { label: "Auto-spin", ms: 0 },
  { label: "Slow", ms: 300 },
  { label: "Fast", ms: 140 },
  { label: "Faster", ms: 60 },
] as const;
const DRAG_PX_PER_FRAME = 40;
const INK = "#191611";
const ALPHA_MIN = 96;

export type Pattern = "dots" | "diamonds" | "lines";

type Settings = {
  pattern: Pattern;
  cell: number; // screen pitch, px
  angle: number; // screen angle, degrees
  contrast: number; // gamma on darkness — higher lifts midtones lighter
};

const DEFAULTS: Settings = { pattern: "diamonds", cell: 6, angle: 45, contrast: 1.6 };

type FrameData = { lum: Float32Array; alpha: Uint8ClampedArray };

function renderHalftone(ctx: CanvasRenderingContext2D, data: FrameData, s: Settings) {
  const { lum, alpha } = data;
  const rad = (s.angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  // Cover the whole canvas at any rotation: lattice reaches the half-diagonal.
  const reach = SIZE * 0.71;
  const cell = s.cell;
  const path = new Path2D();

  for (let v = -reach; v <= reach; v += cell) {
    for (let u = -reach; u <= reach; u += cell) {
      // Lattice point in canvas space (for sampling the photo).
      const x = cx + u * cos - v * sin;
      const y = cy + u * sin + v * cos;
      if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) continue;

      // 3×3 box sample around the cell center.
      let sumL = 0;
      let sumA = 0;
      let n = 0;
      const step = Math.max(1, Math.round(cell / 3));
      for (let dy = -step; dy <= step; dy += step) {
        for (let dx = -step; dx <= step; dx += step) {
          const sx = Math.round(x + dx);
          const sy = Math.round(y + dy);
          if (sx < 0 || sx >= SIZE || sy < 0 || sy >= SIZE) continue;
          const i = sy * SIZE + sx;
          sumL += lum[i];
          sumA += alpha[i];
          n++;
        }
      }
      if (!n) continue;
      if (sumA / n < ALPHA_MIN) continue; // background — no ink, ever

      const darkness = Math.pow(1 - sumL / n / 255, s.contrast);
      if (darkness < 0.02) continue;

      // Shapes are laid out in the rotated lattice frame (the canvas transform
      // below), so they stay axis-aligned here — no per-shape rotation.
      if (s.pattern === "dots") {
        const r = cell * 0.71 * Math.sqrt(darkness);
        if (r < 0.3) continue;
        path.moveTo(u + r, v);
        path.arc(u, v, r, 0, Math.PI * 2);
      } else if (s.pattern === "diamonds") {
        const r = cell * 0.78 * Math.sqrt(darkness); // half-diagonal
        if (r < 0.3) continue;
        path.moveTo(u, v - r);
        path.lineTo(u + r, v);
        path.lineTo(u, v + r);
        path.lineTo(u - r, v);
        path.closePath();
      } else {
        const h = cell * darkness;
        if (h < 0.25) continue;
        path.rect(u - cell * 0.55, v - h / 2, cell * 1.1, h);
      }
    }
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  // Lattice coords are center-relative in the rotated frame: translate to the
  // center, rotate, and the path lands exactly where the sampling looked.
  ctx.translate(cx, cy);
  ctx.rotate(rad);
  ctx.fillStyle = INK;
  ctx.fill(path);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function SpinStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<FrameData[] | null>(null);
  const dragRef = useRef<{ startX: number; startFrame: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [frame, setFrame] = useState(0);
  const [speed, setSpeed] = useState(0); // index into AUTO_SPEEDS
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  // Decode all 8 source frames once into luminance + alpha buffers.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const decoded = await Promise.all(
        spinSourceFrames.map(
          (src) =>
            new Promise<FrameData>((resolve, reject) => {
              const img = new Image();
              img.onload = () => {
                const off = document.createElement("canvas");
                off.width = SIZE;
                off.height = SIZE;
                const octx = off.getContext("2d", { willReadFrequently: true })!;
                octx.drawImage(img, 0, 0, SIZE, SIZE);
                const { data } = octx.getImageData(0, 0, SIZE, SIZE);
                const lum = new Float32Array(SIZE * SIZE);
                const alpha = new Uint8ClampedArray(SIZE * SIZE);
                for (let i = 0, p = 0; i < SIZE * SIZE; i++, p += 4) {
                  const a = data[p + 3] / 255;
                  // Semi-transparent edges blend toward paper-white.
                  lum[i] =
                    (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) * a +
                    255 * (1 - a);
                  alpha[i] = data[p + 3];
                }
                resolve({ lum, alpha });
              };
              img.onerror = reject;
              img.src = src;
            }),
        ),
      );
      if (!cancelled) {
        framesRef.current = decoded;
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Re-screen whenever the visible frame or the screen settings change.
  useEffect(() => {
    if (!ready) return;
    const ctx = canvasRef.current?.getContext("2d");
    const data = framesRef.current?.[frame];
    if (ctx && data) renderHalftone(ctx, data, settings);
  }, [ready, frame, settings]);

  useEffect(() => {
    const { ms } = AUTO_SPEEDS[speed];
    if (!ms) return;
    const id = setInterval(() => setFrame((f) => mod(f + 1, spinSourceFrames.length)), ms);
    return () => clearInterval(id);
  }, [speed]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = { startX: e.clientX, startFrame: frame };
      setSpeed(0);
    },
    [frame],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    // Drag left → next frame: the figure turns with the pull, like spinning
    // a record. One frame per DRAG_PX_PER_FRAME horizontal pixels.
    const delta = Math.round((drag.startX - e.clientX) / DRAG_PX_PER_FRAME);
    setFrame(mod(drag.startFrame + delta, spinSourceFrames.length));
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setSpeed(0);
      setFrame((f) => mod(f + (e.key === "ArrowRight" ? 1 : -1), spinSourceFrames.length));
    }
  }, []);

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));

  return (
    <div className="spin-studio">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="spin-canvas"
        tabIndex={0}
        role="img"
        aria-label="Kevin van der Poll, 360° view. Drag or use the arrow keys to spin."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      />
      <p className="spin-hint" aria-hidden="true">
        [ DRAG TO SPIN ]
      </p>
      <div className="spin-controls">
        <div className="spin-patterns" role="group" aria-label="Halftone pattern">
          {(["dots", "diamonds", "lines"] as const).map((p) => (
            <button
              key={p}
              type="button"
              className={`spin-pattern${settings.pattern === p ? " spin-pattern--on" : ""}`}
              aria-pressed={settings.pattern === p}
              onClick={() => set("pattern", p)}
            >
              {p}
            </button>
          ))}
        </div>
        <label className="spin-slider">
          <span>Size</span>
          <input
            type="range"
            min={3}
            max={14}
            step={1}
            value={settings.cell}
            onChange={(e) => set("cell", Number(e.target.value))}
          />
        </label>
        <label className="spin-slider">
          <span>Angle</span>
          <input
            type="range"
            min={0}
            max={90}
            step={1}
            value={settings.angle}
            onChange={(e) => set("angle", Number(e.target.value))}
          />
        </label>
        <label className="spin-slider">
          <span>Tone</span>
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.05}
            value={settings.contrast}
            onChange={(e) => set("contrast", Number(e.target.value))}
          />
        </label>
        <button
          type="button"
          className={`spin-auto${speed > 0 ? " spin-auto--on" : ""}`}
          aria-pressed={speed > 0}
          onClick={() => setSpeed((s) => (s + 1) % AUTO_SPEEDS.length)}
        >
          {AUTO_SPEEDS[speed].label}
        </button>
      </div>
    </div>
  );
}
