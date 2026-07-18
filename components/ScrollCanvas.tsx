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

// Resolve once the sought frame is actually presented. iOS WebKit can leave
// `seeked` unfired on programmatic seeks, so also poll
// requestVideoFrameCallback — but only accept a presented frame whose
// mediaTime matches the seek target, since rVFC can first fire for a stale
// pre-seek frame. Race both against a timeout so a stall surfaces as an
// error instead of a hang.
function seekTo(video: HTMLVideoElement, t: number): Promise<void> {
  return new Promise((res, rej) => {
    let done = false;
    // Skipping an equal-time seek is only safe once a frame has actually
    // been presented (readyState >= HAVE_CURRENT_DATA) — before that,
    // drawImage of the video paints nothing at all.
    if (video.currentTime === t && video.readyState >= 2) { res(); return; }
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      video.removeEventListener("seeked", onSeeked);
      res();
    };
    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", onSeeked);
      rej(new Error(`seek to ${t.toFixed(2)}s timed out`));
    }, 5000);
    const onFrame = (_now: number, meta: VideoFrameCallbackMetadata) => {
      if (done) return;
      if (Math.abs(meta.mediaTime - t) < 0.05) finish();
      else video.requestVideoFrameCallback(onFrame);
    };
    // `seeked` can fire a beat before the sought frame is drawable, so give
    // presentation a moment to catch up; rVFC resolves sooner when it fires.
    const onSeeked = () => setTimeout(finish, 50);
    video.addEventListener("seeked", onSeeked, { once: true });
    video.currentTime = t;
    if ("requestVideoFrameCallback" in video) video.requestVideoFrameCallback(onFrame);
  });
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

  // Park mid-video first so the loop's seek to t=0 is a real seek — the
  // video sits at currentTime 0 after load, and capturing without a
  // completed seek yields a fully transparent frame.
  await seekTo(video, video.duration / 2);

  for (let i = 0; i < count; i++) {
    await seekTo(video, (i / (count - 1)) * video.duration);
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
  const idxRef    = useRef(0);

  const [extracted, setExtracted] = useState(0);
  const [ready, setReady]         = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // Fetch the video as a blob, then extract frames. iOS WebKit suspends
  // buffering of streamed video without a user gesture, so seeks past the
  // first frame never complete; a fully local blob seeks reliably.
  useEffect(() => {
    const video = videoRef.current!;
    let objectUrl: string | null = null;
    let cancelled = false;

    const run = async () => {
      try {
        const blob = await fetch("/video.mp4").then((r) => {
          if (!r.ok) throw new Error(`video fetch failed: ${r.status}`);
          return r.blob();
        });
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        await new Promise<void>((res, rej) => {
          video.addEventListener("loadedmetadata", () => res(), { once: true });
          video.addEventListener("error", () => rej(new Error("video failed to decode")), { once: true });
        });
        if (cancelled) return;
        // Prime the decode pipeline: iOS won't service programmatic seeks
        // until the element has played once. Muted + playsInline makes this
        // legal without a user gesture.
        try {
          await video.play();
          video.pause();
        } catch {}
        if (cancelled) return;
        const frames = await extractFrames(video, N, (n) => { if (!cancelled) setExtracted(n); });
        if (cancelled) return;
        framesRef.current = frames;
        setReady(true);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      }
    };
    run();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // Size canvas and draw frame 0 on ready
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current!;

    const resize = () => {
      // The source video is only 752px wide — a backing store beyond ~2×
      // that adds no visible detail but multiplies per-draw cost hugely on
      // retina/4K screens. Cap it instead of blindly using devicePixelRatio.
      const scale = Math.min(devicePixelRatio, 1536 / canvas.offsetWidth, 1536 / canvas.offsetHeight);
      canvas.width  = Math.round(canvas.offsetWidth  * scale);
      canvas.height = Math.round(canvas.offsetHeight * scale);
      drawFrame(idxRef.current);
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
        idxRef.current  = idx;

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
      {/* Extraction-only video, src set from a blob once fetched. Kept
          technically visible (2px, near-transparent) because display:none
          drops it from WebKit's render pipeline and frame events stop
          firing on iOS. */}
      <video
        ref={videoRef}
        muted
        playsInline
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: 2,
          height: 2,
          opacity: 0.01,
          pointerEvents: "none",
        }}
      />

      {error ? (
        <div className="sc-loader">
          <div className="sc-loader__label">Frame extraction failed</div>
          <div className="sc-loader__count">{error}</div>
        </div>
      ) : !ready ? (
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
