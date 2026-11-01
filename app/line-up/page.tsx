import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MugshotCycler } from "@/components/MugshotCycler";
import { BackLink } from "@/components/BackLink";

// Kept out of the index — a gag page, not a real destination worth ranking.
export const metadata: Metadata = {
  title: "Line-Up — Kevin van der Poll",
  description:
    "Official personal record of Kevin van der Poll — digital toolmaker, chaos operator, subject of ongoing analysis.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/line-up" },
};

// The mugshot box maps linearly to a height scale: its top edge is 198cm,
// its bottom edge 150cm. The photo is offset in lineup.css so the subject's
// head-top (8.56% down the source image) sits exactly on the 183cm line —
// Kevin's actual height. Keep both in sync if the scale or images change.
const CHART_TOP_CM = 198;
const CHART_RANGE_CM = 48;
const HEIGHT_MARKS = [195, 190, 185, 180, 175, 170, 165, 160, 155];

const FIELDS: [string, string | "REDACTED"][] = [
  ["NAME", "KEVIN VAN DER POLL"],
  ["RECORD ID", "VDP-305-K"],
  ["PRONOUNS", "HE/HIM"],
  ["AGE", "REDACTED"],
  ["OCCUPATION", "DIGITAL TOOLMAKER"],
  ["NATIONALITY", "SOUTH AFRICAN"],
  ["BASE", "MIAMI, FL"],
  ["ALIASES", "VDP / KEV.PNG"],
];

// Clean black icons of the subject's 10 strongest technologies, one per
// print-card cell.
function TechPrint({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 40 50" className="lineup-print" aria-hidden="true">
      <g fill="none" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const printText = (text: string, size: number, y = 26) => (
  <text
    x="20"
    y={y}
    textAnchor="middle"
    fontSize={size}
    fontWeight="700"
    fill="#1a1a1a"
    stroke="none"
    style={{ fontFamily: "var(--terminal)" }}
  >
    {text}
  </text>
);

const TECH_PRINTS: { label: string; art: ReactNode }[] = [
  {
    label: "PY",
    art: (
      <>
        {/* two interlocked snake hooks + eyes */}
        <path d="M11.5 26 v-8 a8.5 8.5 0 0 1 17 0 v1 h-12.5" />
        <path d="M28.5 24 v8 a8.5 8.5 0 0 1 -17 0 v-1 h12.5" />
        <circle cx="16" cy="14.5" r="1.2" fill="#1a1a1a" stroke="none" />
        <circle cx="24" cy="35.5" r="1.2" fill="#1a1a1a" stroke="none" />
      </>
    ),
  },
  {
    label: "JS",
    art: (
      <>
        <rect x="8" y="13" width="24" height="24" />
        {printText("JS", 10, 29)}
      </>
    ),
  },
  {
    label: "TS",
    art: (
      <>
        <rect x="8" y="13" width="24" height="24" />
        {printText("TS", 10, 29)}
      </>
    ),
  },
  {
    label: "REACT",
    art: (
      <>
        <ellipse cx="20" cy="25" rx="13" ry="5" />
        <ellipse cx="20" cy="25" rx="13" ry="5" transform="rotate(60 20 25)" />
        <ellipse cx="20" cy="25" rx="13" ry="5" transform="rotate(120 20 25)" />
        <circle cx="20" cy="25" r="2" fill="#1a1a1a" stroke="none" />
      </>
    ),
  },
  {
    label: "NEXT",
    art: (
      <>
        <circle cx="20" cy="25" r="13" />
        {printText("N", 12, 29.5)}
      </>
    ),
  },
  {
    label: "NODE",
    art: <polygon points="20,12 31.3,18.5 31.3,31.5 20,38 8.7,31.5 8.7,18.5" />,
  },
  {
    label: "SQL",
    art: (
      <>
        {/* database cylinder */}
        <ellipse cx="20" cy="15" rx="11" ry="3.5" />
        <path d="M9 15 v17" />
        <path d="M31 15 v17" />
        <path d="M9 21.5 a11 3.5 0 0 0 22 0" />
        <path d="M9 27 a11 3.5 0 0 0 22 0" />
        <path d="M9 32 a11 3.5 0 0 0 22 0" />
      </>
    ),
  },
  {
    label: "AI",
    art: (
      <>
        {/* sparkles */}
        <path d="M18 13 l2.2 8 8 2.2 -8 2.2 -2.2 8 -2.2 -8 -8 -2.2 8 -2.2 z" />
        <path d="M30 27 l1.2 3.3 3.3 1.2 -3.3 1.2 -1.2 3.3 -1.2 -3.3 -3.3 -1.2 3.3 -1.2 z" />
      </>
    ),
  },
  {
    label: "GIT",
    art: (
      <>
        <path d="M14 17 v16" />
        <circle cx="14" cy="14.5" r="2.5" />
        <circle cx="14" cy="35.5" r="2.5" />
        <path d="M14 22 c0 7 12 3 12 9" />
        <circle cx="26" cy="33.5" r="2.5" />
      </>
    ),
  },
  {
    label: "AUTO",
    art: (
      <>
        {/* gear */}
        <circle cx="20" cy="25" r="10" />
        <path d="M30 25 h3.5 M20 15 v-3.5 M10 25 h-3.5 M20 35 v3.5" />
        <path d="M27.1 17.9 l2.5 -2.5 M12.9 17.9 l-2.5 -2.5 M12.9 32.1 l-2.5 2.5 M27.1 32.1 l2.5 2.5" />
        <circle cx="20" cy="25" r="4" />
      </>
    ),
  },
];

export default function LineUpPage() {
  return (
    <main className="lineup-page">
      <div className="lineup-wrap">
        <div className="subpage-topnav">
          <BackLink href="/kev" />
        </div>
        <article className="lineup-sheet">

          {/* Classification bar — top */}
          <div className="lineup-classify lineup-classify--top">
            CONFIDENTIAL // VDA-7K // NOT FOR DISTRIBUTION // HANDLE VIA APPROVED CHANNELS ONLY
          </div>

          {/* Rubber stamp */}
          <div className="lineup-stamp" aria-hidden="true">CONFIDENTIAL</div>

          <header className="lineup-head">
            <div className="lineup-agency">
              <svg viewBox="0 0 64 64" className="lineup-seal" aria-hidden="true">
                <defs>
                  <path id="seal-arc" d="M 32 7 A 25 25 0 1 1 31.99 7" />
                </defs>
                <circle cx="32" cy="32" r="30" fill="none" stroke="#111" strokeWidth="2" />
                <circle cx="32" cy="32" r="17" fill="none" stroke="#111" strokeWidth="1.5" />
                <text fontSize="6.5" letterSpacing="1.4" fill="#111" fontFamily="Arial, sans-serif" fontWeight="bold">
                  <textPath href="#seal-arc">KEV INTELLIGENCE AGENCY • MIA •</textPath>
                </text>
                <text x="32" y="38" textAnchor="middle" fontSize="17" fontWeight="900" fill="#111" fontFamily="Arial, sans-serif">
                  V
                </text>
              </svg>
              <div className="lineup-agency__name">
                <span>Kev Intelligence Agency</span>
                <strong>PERSONAL RECORD</strong>
                <small>VDPKVN305FL</small>
              </div>
            </div>
            <table className="lineup-filetable">
              <tbody>
                <tr><th>FILE NUMBER</th><td>#305-VDP-000186</td></tr>
                <tr><th>PURPOSE RECORD</th><td>G-LINEUP-9(P)</td></tr>
                <tr><th>DATE OF RECORD</th><td>██████████</td></tr>
                <tr><th>CASE STATUS</th><td>OPEN / ONGOING</td></tr>
                <tr><th>SRU ID</th><td>K007</td></tr>
              </tbody>
            </table>
          </header>

          <p className="lineup-idnum">#KVDP305MIAGG000186</p>

          <div className="lineup-main">
            <dl className="lineup-fields">
              {FIELDS.map(([label, value]) => (
                <div key={label} className="lineup-field">
                  <dt>{label}:</dt>
                  <dd>
                    {value === "REDACTED"
                      ? <span className="lineup-redact">REDACTED</span>
                      : value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="lineup-mugshot-wrap">
              <div className="lineup-mugshot-label">Subject Photograph</div>
              <figure className="lineup-mugshot">
                {/* Chart renders before the photo so the multiply-blended
                    halftone sits on top: lines read through its light areas
                    and the subject occludes them, like a printed backdrop. */}
                <div className="lineup-chart" aria-hidden="true">
                  {HEIGHT_MARKS.map((n) => (
                    <div
                      key={n}
                      className="lineup-chart__mark"
                      style={{ top: `${((CHART_TOP_CM - n) / CHART_RANGE_CM) * 100}%` }}
                    >
                      <span className="lineup-chart__num">{n}</span>
                      <span className="lineup-chart__line" />
                      <span className="lineup-chart__num">{n}</span>
                    </div>
                  ))}
                </div>
                <MugshotCycler />
              </figure>
              <div className="lineup-mugshot-caption">Photo ID: VDP-305-K &nbsp;•&nbsp; Date taken: ██████</div>
            </div>
          </div>

          <h2 className="lineup-section-title">Findings</h2>
          <ul className="lineup-charges">
            <li>Excessive side projects, ongoing</li>
            <li>Breaking systems to learn their rules</li>
            <li>Making things nobody asked for</li>
            <li>Operating as a developer, an artist, a bartender, and a carpenter. All findings confirmed</li>
          </ul>
          <p className="lineup-casual">
            <u>analyst&apos;s note:</u>{" "}
            subject describes the work as &quot;somewhere between useful and strange.&quot;
            the agency concurs.
          </p>

          <div className="lineup-notes">
            <p>
              <strong>#Code</strong>
              react, node, typescript, next.js. automations, scrapers, AI tooling, weird web
              experiments. builds real software and strange ones with equal conviction.
            </p>
            <p>
              <strong>#Hands</strong>
              cabinetry, CNC, demolition, stone work. when the screen gets old the tools come
              out. the pattern never changes: make the thing.
            </p>
            <p>
              <strong>#Floor</strong>
              bartender, trainer, manager. years of high-volume service. handles chaos without
              freezing. keeps moving when the thing is messy.
            </p>
          </div>

          <h2 className="lineup-section-title" style={{ marginTop: "2.4rem" }}>Biometrics</h2>
          <div className="lineup-bottom">
            <div>
              <div className="lineup-prints">
                {TECH_PRINTS.map((t) => (
                  <TechPrint key={t.label}>{t.art}</TechPrint>
                ))}
              </div>
              <div className="lineup-print-labels">
                {TECH_PRINTS.map((t) => <span key={t.label}>{t.label}</span>)}
              </div>
            </div>
            <div className="lineup-tastes">
              <h3>Likes</h3>
              <p>
                raw but designed. high-contrast line art, vintage newsprint, banknote
                engraving, code that feels beautiful.
              </p>
              <h3>Dislikes</h3>
              <p>
                polished corporate sludge, generic inspirational language, anything that
                smells generated.
              </p>
            </div>
          </div>

          {/* Authorization block */}
          <div className="lineup-auth">
            <div className="lineup-auth-field">
              <span>&nbsp;</span>
              <span>Case Officer</span>
            </div>
            <div className="lineup-auth-field">
              <span>&nbsp;</span>
              <span>Reviewed By</span>
            </div>
            <div className="lineup-auth-field">
              <span>&nbsp;</span>
              <span>Date Authorized</span>
            </div>
          </div>

          <div className="lineup-footer">
            <span>Internal use only. Do not distribute</span>
            <span>Form VDA-305-K Rev. 04/2024 &nbsp;•&nbsp; Page 1 of 1</span>
          </div>

          {/* Classification bar — bottom */}
          <div className="lineup-classify lineup-classify--bottom">
            CONFIDENTIAL // VDA-7K // NOT FOR DISTRIBUTION // HANDLE VIA APPROVED CHANNELS ONLY
          </div>

        </article>
      </div>
    </main>
  );
}
