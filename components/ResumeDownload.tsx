"use client";

import { useState } from "react";
import type { ResumeContactParts } from "@/lib/resume";

/** Generates the resume PDF in the visitor's browser at click time, from
 * the same lib/resume.ts data the page renders — the download can never
 * drift from what's on screen, and no PDF file exists at any URL for
 * scrapers to fetch. The renderer (~large) is imported only on click, so
 * the page itself stays light. */
export function ResumeDownload({ contact }: { contact: ResumeContactParts | null }) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const [{ pdf }, { ResumePdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumePdf"),
      ]);
      // Assembled only here, in the browser, at click time.
      const phone = contact ? contact.phoneParts.join("-") : undefined;
      const email = contact
        ? `${contact.emailUser}${String.fromCharCode(64)}${contact.emailDomain}`
        : undefined;
      const blob = await pdf(<ResumePdf phone={phone} email={email} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Kevin-van-der-Poll-Resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" className="resume-download" onClick={handleDownload} disabled={busy}>
      {busy ? "preparing…" : "download pdf ↓"}
    </button>
  );
}
