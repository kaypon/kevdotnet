"use client";

import { useEffect, useRef, useState } from "react";
import "@/app/styles/scroll-canvas.css";

const N = 60;

const SECTIONS = [
  { label: "01 / concept",  copy: "Not a GIF.\nNot video scrubbing.",              start: 0.00, end: 0.18 },
  { label: "02 / method",   copy: "60 frames extracted\nfrom your video on load.", start: 0.20, end: 0.38 },
  { label: "03 / mechanic", copy: "Scroll position maps\nto a frame index.",       start: 0.42, end: 0.58 },
  { label: "04 / render",   copy: "One canvas draw call.\nInstant. Synchronous.",  start: 0.62, end: 0.78 },
  { label: "05 / reality",  copy: "That's the Apple trick.",                       start: 0.83, end: 1.00 },
];

function sectionOpacity(p: number, start: number, end: number) {
  const f = 0.06;
  if (p < start || p > end) return 0;
  return Math.min((p - start) / f, (end - p) / f, 1);
}

// object-fit: cover — centers and crops to fill canvas without stretching
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap,
  cw: number,
  ch: number
) {
  const scale = Math.max(cw / img.width, ch / img.height);
  const x = (cw - img.width  * scale) / 2;
  const y = (ch - img.height * scale) / 2;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

async function extractFrames(
  video: HTMLVideoElement,
  count: number,
  onProgress: (n: number) => void
): Promise<ImageBitmap[]> {
  const w = video.videoWidth;
  const h = video.videoHeight;
  const oc = new OffscreenCanvas(w, h);
  const ctx = oc.getContext("2d")!;
  const frames: ImageBitmap[] = [];

  for (let i = 0; i < count; i++) {
    video.currentTime = (i / (count - 1)) * video.duration;
    await new Promise<void>((res) => video.addEventListener("seeked", () => res(), { once: true }));
    ctx.drawImage(video, 0, 0, w, h);
    frames.push(await createImageBitmap(oc));
    onProgress(i + 1);
  }
  return frames;
}

export function ScrollCanvas() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textsRef  = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef = useRef<ImageBitmap[]>([]);
  const rafRef    = useRef<number | null>(null);

  const [extracted, setExtracted] = useState(0);
  const [ready, setReady]         = useState(false);

  // Extract frames once video metadata is available
  useEffect(() => {
    const video = videoRef.current!;

    const run = async () => {
      const frames = await extractFrames(video, N, (n) => setExtracted(n));
      framesRef.current = frames;
      setReady(true);
    };

    const onMeta = () => run();
    if (video.readyState >= 1) { run(); return; }
    video.addEventListener("loadedmetadata", onMeta, { once: true });
  }, []);

  // Size canvas and draw frame 0 on ready
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      drawFrame(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Scroll → frame draw
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
        const idx       = Math.min(Math.round(progress * (N - 1)), N - 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCover(ctx, framesRef.current[idx], canvas.width, canvas.height);

        textsRef.current.forEach((el, i) => {
          if (el) el.style.opacity = String(sectionOpacity(progress, SECTIONS[i].start, SECTIONS[i].end));
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    const frame  = framesRef.current[idx];
    if (!canvas || !frame) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, frame, canvas.width, canvas.height);
  }

  return (
    <>
      {/* Hidden video — only used for frame extraction */}
      <video
        ref={videoRef}
        src="/video.mp4"
        preload="auto"
        muted
        playsInline
        style={{ display: "none" }}
      />

      {!ready ? (
        <div className="sc-loader">
          <div className="sc-loader__label">Extracting frames</div>
          <div className="sc-loader__bar-track">
            <div className="sc-loader__bar-fill" style={{ width: `${(extracted / N) * 100}%` }} />
          </div>
          <div className="sc-loader__count">{extracted} / {N}</div>
        </div>
      ) : (
        <div className="sc-scroll-container">
          <div className="sc-sticky">
            <canvas ref={canvasRef} className="sc-canvas" />

            <div className="sc-texts">
              {SECTIONS.map((s, i) => (
                <div
                  key={i}
                  className="sc-text"
                  ref={(el) => { textsRef.current[i] = el; }}
                >
                  <div className="sc-text__label">{s.label}</div>
                  <div className="sc-text__copy">
                    {s.copy.split("\n").map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sc-hint">↓ scroll</div>
          </div>
        </div>
      )}
    </>
  );
}
