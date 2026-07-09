import type { Metadata } from "next";
import Link from "next/link";
import { MugshotCycler } from "@/components/MugshotCycler";

export const metadata: Metadata = {
  title: "Line-Up — Kevin van der Poll",
  description:
    "Official criminal record of Kevin van der Poll — digital toolmaker, chaos operator, repeat offender.",
};

const HEIGHT_MARKS = [198, 195, 190, 185, 183, 180, 175, 170, 165, 160, 155];
const MARK_TOP = HEIGHT_MARKS[0];
const MARK_RANGE = MARK_TOP - HEIGHT_MARKS[HEIGHT_MARKS.length - 1];

const FIELDS: [string, string | "REDACTED"][] = [
  ["NAME", "KEVIN VAN DER POLL"],
  ["RECORD ID", "VDP-305-K"],
  ["PRONOUNS", "HE/HIM"],
  ["AGE", "REDACTED"],
  ["OCCUPATION", "DIGITAL TOOLMAKER"],
  ["NATIONALITY", "SOUTH AFRICAN"],
  ["BASE", "MIAMI, FL"],
  ["ALIASES", "VDP / KEV.PNG / VAN"],
];

const FINGER_LABELS = ["L.TH", "L.I", "L.M", "L.R", "L.L", "R.TH", "R.I", "R.M", "R.R", "R.L"];

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
                  <textPath href="#seal-arc">VAN INTELLIGENCE AGENCY • MIA •</textPath>
                </text>
                <text x="32" y="38" textAnchor="middle" fontSize="17" fontWeight="900" fill="#111" fontFamily="Arial, sans-serif">
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
                <tr><th>FILE NUMBER</th><td>#305-VDP-000186</td></tr>
                <tr><th>PURPOSE RECORD</th><td>G-LINEUP-9(P)</td></tr>
                <tr><th>DATE OF RECORD</th><td>██████████</td></tr>
                <tr><th>CASE STATUS</th><td>OPEN — ONGOING</td></tr>
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
                <MugshotCycler />
                <div className="lineup-ruler" aria-hidden="true">
                  {HEIGHT_MARKS.map((n) => (
                    <div
                      key={n}
                      className={`lineup-mugshot__mark${n === 183 ? " lineup-mugshot__mark--subject" : ""}`}
                      style={{ top: `${((MARK_TOP - n) / MARK_RANGE) * 100}%` }}
                    >
                      <span className="lineup-mugshot__tick" />
                      <span className="lineup-mugshot__marknum">{n}</span>
                    </div>
                  ))}
                </div>
              </figure>
              <div className="lineup-mugshot-caption">Photo ID: VDP-305-K &nbsp;•&nbsp; Date taken: ██████</div>
            </div>
          </div>

          <h2 className="lineup-section-title">Charges</h2>
          <ul className="lineup-charges">
            <li>Excessive side projects — ongoing</li>
            <li>Breaking systems to learn their rules</li>
            <li>Making things nobody asked for</li>
            <li>Impersonating a developer, an artist, a bartender, and a carpenter — all charges stuck</li>
          </ul>
          <p className="lineup-casual">
            <u>casual:</u>{" "}
            subject describes the work as &quot;somewhere between useful and strange.&quot;
            the court agrees.
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
                {Array.from({ length: 10 }, (_, i) => (
                  <Fingerprint key={i} seed={i + 1} />
                ))}
              </div>
              <div className="lineup-print-labels">
                {FINGER_LABELS.map((l) => <span key={l}>{l}</span>)}
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
            <span>Internal use only — do not distribute</span>
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
