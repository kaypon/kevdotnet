import type { Metadata } from "next";
import Link from "next/link";
import { ResumeContact } from "@/components/ResumeContact";
import { ResumeDownload } from "@/components/ResumeDownload";
import {
  resumeEducation,
  resumeExperience,
  resumeHeader,
  resumeSkills,
  resumeSummary,
} from "@/lib/resume";

// Unlinked, shared directly with employers — kept out of the sitemap and
// told to search engines to stay out of the index.
export const metadata: Metadata = {
  title: "Kevin van der Poll — Resume",
  description: "Resume of Kevin van der Poll, Forward-Deployed AI Engineer.",
  robots: { index: false, follow: false },
};

function SectionTitle({ children }: { children: string }) {
  return <h2 className="resume-section-title">{children}</h2>;
}

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-sheet">
        <nav className="resume-topnav" aria-label="Back to site">
          <Link href="/van" className="resume-back">← van</Link>
          <ResumeDownload />
        </nav>

        <header className="resume-header">
          <h1 className="resume-name">{resumeHeader.name}</h1>
          <p className="resume-title">{resumeHeader.title}</p>
          <ResumeContact
            location={resumeHeader.location}
            phoneParts={resumeHeader.phoneParts}
            emailUser={resumeHeader.emailUser}
            emailDomain={resumeHeader.emailDomain}
          />
          <p className="resume-contact">
            {resumeHeader.links.map((link, i) => (
              <span key={link.href}>
                {i > 0 && " · "}
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </header>

        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="resume-summary">{resumeSummary}</p>
        </section>

        <section>
          <SectionTitle>Skills</SectionTitle>
          <dl className="resume-skills">
            {resumeSkills.map(({ group, items }) => (
              <div key={group} className="resume-skill-row">
                <dt>{group}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <SectionTitle>Work Experience</SectionTitle>
          {resumeExperience.map((job) => (
            <article key={`${job.org}-${job.dates}`} className="resume-job">
              <div className="resume-job-head">
                <h3 className="resume-job-role">
                  {job.role} <span className="resume-job-org">| {job.org}</span>
                </h3>
                <p className="resume-job-meta">
                  {job.location && <>{job.location} · </>}
                  {job.dates}
                </p>
              </div>
              {job.note && <p className="resume-job-note">{job.note}</p>}
              <ul className="resume-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <SectionTitle>Education</SectionTitle>
          <ul className="resume-education">
            {resumeEducation.map((entry) => (
              <li key={entry.credential}>
                <span className="resume-edu-credential">{entry.credential}</span>
                {entry.school && <> — {entry.school}</>}
                <span className="resume-edu-meta">
                  {" "}
                  · {entry.location} · {entry.dates}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
