"use client";

import { useEffect, useState, ViewTransition } from "react";
import Link from "next/link";
import { clearReturningFrom, peekReturningFrom } from "@/lib/nav-return";

const SECTIONS = [
  { href: "/now", label: "now", tagline: "whats happening" },
  { href: "/info", label: "info", tagline: "i need some more" },
  { href: "/projects", label: "projects", tagline: "can i see your" },
  { href: "/contact", label: "contact", tagline: "how do i get in" },
];

export function PosterNav() {
  /* The link being returned to must be visible from the first frame — the
     morph animates its live snapshot; the others keep the blink-in intro. */
  const [returningFrom] = useState(peekReturningFrom);

  useEffect(() => {
    clearReturningFrom();
  }, []);

  return (
    <nav className="poster-nav" aria-label="Site sections">
      {SECTIONS.map(({ href, label, tagline }) => (
        <Link
          key={href}
          href={href}
          className={label === returningFrom ? "poster-nav__item--settled" : undefined}
        >
          <span className="poster-nav__tagline" aria-hidden="true">
            {tagline.split(" ").map((word, i) => (
              <span
                key={i}
                className="poster-nav__tw"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span>{word}</span>
              </span>
            ))}
          </span>
          <ViewTransition name={`title-${label}`} share="morph">
            <span className="poster-nav__label">{label}</span>
          </ViewTransition>
        </Link>
      ))}
    </nav>
  );
}
