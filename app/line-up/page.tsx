import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Line-Up — Kevin van der Poll",
  description:
    "Official criminal record of Kevin van der Poll — digital toolmaker, chaos operator, repeat offender.",
};

// Mugshot height-chart marks (cm). Top mark to bottom mark maps onto the
// full box height, with a little headroom below the last mark.
const HEIGHT_MARKS = Array.from({ length: 17 }, (_, i) => 190 - i * 4);
const MARK_TOP = HEIGHT_MARKS[0];
const MARK_RANGE = MARK_TOP - 122;

const FIELDS: [string, string][] = [
  ["NAME", "KEVIN VAN DER POLL"],
  ["RECORD ID", "VDP-305-K"],
  ["PRONOUNS", "HE/HIM"],
  ["AGE", "[REDACTED]"],
  ["OCCUPATION", "DIGITAL TOOLMAKER"],
  ["NATIONALITY", "SOUTH AFRICAN"],
  ["BASE", "MIAMI, FL"],
  ["ALIASES", "VDP / KEV.PNG / VAN"],
];

function Fingerprint({ seed }: { seed: number }) {
  const rings = Array.from({ length: 7 }, (_, i) => 2.2 + i * 2.1);
  return (
    <svg viewBox="0 0 40 50" className="lineup-print" aria-hidden="true">
      <filter id={`fp-${seed}`} x="-25%" y="-25%" width="150%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed={seed * 7 + 3} />
        <feDisplacementMap in="SourceGraphic" scale="5" />
      </filter>
      <g filter={`url(#fp-${seed})`} fill="none" stroke="#1a1a1a" strokeWidth="0.9">
        {rings.map((r) => (
          <ellipse key={r} cx="20" cy="24" rx={r * 0.78} ry={r} />
        ))}
        <path d="M3 46 Q20 32 37 46" />
        <path d="M4 50 Q20 37 36 50" />
      </g>
    </svg>
  );
}

export default function LineUpPage() {
  return (
    <main className="lineup-page">
      <div className="lineup-wrap">
        <div className="subpage-topnav">
          <Link href="/van" className="subpage-back">← van</Link>
        </div>
        <article className="lineup-sheet">
          <header className="lineup-head">
            <div className="lineup-agency">
              <svg viewBox="0 0 64 64" className="lineup-seal" aria-hidden="true">
                <defs>
                  <path id="seal-arc" d="M 32 7 A 25 25 0 1 1 31.99 7" />
                </defs>
                <circle cx="32" cy="32" r="30" fill="none" stroke="#111" strokeWidth="2" />
                <circle cx="32" cy="32" r="17" fill="none" stroke="#111" strokeWidth="1.5" />
                <text fontSize="6.5" letterSpacing="1.4" fill="#111" fontFamily="Arial, sans-serif" fontWeight="bold">
                  <textPath href="#seal-arc">VAN INTELLIGENCE AGENCY • MIA •</textPath>
                </text>
                <text
                  x="32"
                  y="38"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="900"
                  fill="#111"
                  fontFamily="Arial, sans-serif"
                >
                  V
                </text>
              </svg>
              <div className="lineup-agency__name">
                <span>Van Intelligence Agency</span>
                <strong>CRIMINAL RECORD</strong>
                <small>VDPKVN305FL</small>
              </div>
            </div>
            <table className="lineup-filetable">
              <tbody>
                <tr>
                  <th>FILE NUMBER</th>
                  <td>#305-VDP-000186</td>
                </tr>
                <tr>
                  <th>PURPOSE RECORD</th>
                  <td>G-LINEUP-9(P)</td>
                </tr>
                <tr>
                  <th>SRU ID</th>
                  <td>K007</td>
                </tr>
              </tbody>
            </table>
          </header>

          <p className="lineup-idnum">#KVDP305MIAGG000186</p>

          <div className="lineup-main">
            <dl className="lineup-fields">
              {FIELDS.map(([label, value]) => (
                <div key={label} className="lineup-field">
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <figure className="lineup-mugshot">
              {HEIGHT_MARKS.map((n) => (
                <div
                  key={n}
                  className="lineup-mugshot__mark"
                  style={{ top: `${((MARK_TOP - n) / MARK_RANGE) * 100}%` }}
                >
                  <span>{n}</span>
                  <span className="lineup-mugshot__line" />
                  <span>{n}</span>
                </div>
              ))}
              {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps
                  the halftone pixels untouched; next/image re-encoding softens them */}
              <img
                src="/photos/halftones/fine.png"
                alt="Halftone mugshot of Kevin van der Poll"
                className="lineup-mugshot__photo"
              />
            </figure>
          </div>

          <h2 className="lineup-section-title">CHARGES...</h2>
          <ul className="lineup-charges">
            <li>EXCESSIVE SIDE PROJECTS — ONGOING</li>
            <li>BREAKING SYSTEMS TO LEARN THEIR RULES</li>
            <li>MAKING THINGS NOBODY ASKED FOR</li>
            <li>IMPERSONATING A DEVELOPER, AN ARTIST, A BARTENDER, AND A CARPENTER — ALL CHARGES STUCK</li>
          </ul>
          <p className="lineup-casual">
            <u>casual:</u>{" "}
            subject describes the work as &quot;somewhere between useful and strange.&quot;
            the court agrees.
          </p>

          <div className="lineup-notes">
            <p>
              <strong>#CODE:</strong> react, node, typescript, next.js. automations, scrapers,
              AI tooling, weird web experiments. builds real software and strange ones with
              equal conviction.
            </p>
            <p>
              <strong>#HANDS:</strong> cabinetry, CNC, demolition, stone work. when the screen
              gets old the tools come out. the pattern never changes: make the thing.
            </p>
            <p>
              <strong>#FLOOR:</strong> bartender, trainer, manager. years of high-volume
              service. handles chaos without freezing. keeps moving when the thing is messy.
            </p>
          </div>

          <div className="lineup-bottom">
            <div>
              <h2 className="lineup-section-title">FINGERTIPS...</h2>
              <div className="lineup-prints">
                {Array.from({ length: 10 }, (_, i) => (
                  <Fingerprint key={i} seed={i + 1} />
                ))}
              </div>
            </div>
            <div className="lineup-tastes">
              <h3>LIKES</h3>
              <p>
                raw but designed. high-contrast line art, vintage newsprint, banknote
                engraving, code that feels beautiful.
              </p>
              <h3>DISLIKES</h3>
              <p>
                polished corporate sludge, generic inspirational language, anything that
                smells generated.
              </p>
            </div>
          </div>

          <p className="lineup-footer">( internal use only — do not distribute )</p>
        </article>
      </div>
    </main>
  );
}
