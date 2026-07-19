"use client";

import { useEffect, useRef, useState } from "react";
import { ContactFlow } from "@/components/ContactFlow";

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button className="contact-modal__trigger" onClick={() => setOpen(true)}>
        [ get in touch ]
      </button>

      {open && (
        <div
          className="contact-modal__overlay"
          ref={overlayRef}
          onClick={(e) => { if (e.target === overlayRef.current) setOpen(false); }}
          aria-modal="true"
          role="dialog"
        >
          <div className="contact-modal__panel">
            <button
              className="contact-modal__close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              [×]
            </button>
            <ContactFlow onDone={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
