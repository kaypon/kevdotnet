"use client";
import { useState } from "react";

const MUGSHOTS = [
  "/photos/halftones/mugshot.png",
  "/photos/halftones/mugshot-c6.png",
  "/photos/halftones/mugshot-lines.png",
];

export function MugshotCycler() {
  const [idx, setIdx] = useState(0);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MUGSHOTS[idx]}
        alt="Halftone subject photograph of Kevin van der Poll"
        className="lineup-mugshot__photo"
        onClick={() => setIdx((i) => (i + 1) % MUGSHOTS.length)}
        title="Click to cycle"
      />
      <div className="lineup-mugshot-dots" aria-hidden="true">
        {MUGSHOTS.map((_, i) => (
          <span
            key={i}
            className={`lineup-mugshot-dot${i === idx ? " lineup-mugshot-dot--active" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
