import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  resumeEducation,
  resumeExperience,
  resumeHeader,
  resumeSkills,
  resumeSummary,
} from "@/lib/resume";

/** The downloadable resume, rendered on demand in the visitor's browser by
 * ResumeDownload.tsx from the same lib/resume.ts data the page displays —
 * edit the data file and both stay in sync, nothing to regenerate.
 *
 * Layout choices are ATS-first: one column, real text (PDF-standard Courier,
 * no embedded/outlined fonts), conventional section headings, plain bullet
 * glyphs. Contact info is passed in pre-assembled by the caller so the
 * split-parts anti-scrape scheme stays intact at rest.
 *
 * react-pdf gotchas encoded here: unitless lineHeight inherits computed
 * against the PAGE font size, so any style with a different fontSize needs
 * its own explicit lineHeight or text overlaps. Job entries must NOT be
 * wrap={false} as a whole — a long entry then jumps wholesale to the next
 * page leaving half a page blank; instead the head carries minPresenceAhead
 * and individual bullets are kept unsplit. */

// Courier's fixed pitch + narrow columns makes ugly mid-word hyphen breaks
// ("Integra-tion"); resumes read better with none at all.
Font.registerHyphenationCallback((word) => [word]);

const INK = "#191611";
const MUTED = "#4a443a";

const S = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 44,
    paddingHorizontal: 48,
    fontFamily: "Courier",
    fontSize: 9,
    lineHeight: 1.45,
    color: INK,
  },
  name: { fontFamily: "Courier-Bold", fontSize: 21, lineHeight: 1.15, marginBottom: 2 },
  title: { fontFamily: "Courier-Bold", fontSize: 10.5, lineHeight: 1.3, marginBottom: 8 },
  contact: { fontSize: 8.5, lineHeight: 1.45, color: MUTED, marginBottom: 1 },
  sectionTitle: {
    fontFamily: "Courier-Bold",
    fontSize: 9.5,
    lineHeight: 1.4,
    marginTop: 16,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: INK,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillGroup: { fontFamily: "Courier-Bold", width: 132, fontSize: 8.5, lineHeight: 1.45, paddingRight: 8 },
  skillItems: { flex: 1, fontSize: 8.5, lineHeight: 1.45 },
  jobHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  jobHead: { fontFamily: "Courier-Bold", fontSize: 9.5, lineHeight: 1.35, flex: 1, paddingRight: 10 },
  jobDates: { fontSize: 8.5, lineHeight: 1.45, color: MUTED, flexShrink: 0 },
  jobMeta: { fontSize: 8.5, lineHeight: 1.45, color: MUTED, marginBottom: 4 },
  jobNote: { fontFamily: "Courier-Oblique", fontSize: 8.5, lineHeight: 1.45, color: MUTED, marginBottom: 3 },
  bullet: { flexDirection: "row", marginBottom: 2.5 },
  bulletGlyph: { width: 12 },
  bulletText: { flex: 1 },
  eduLine: { marginBottom: 4 },
  eduMeta: { color: MUTED },
});

type ResumePdfProps = {
  phone: string;
  email: string;
};

export function ResumePdf({ phone, email }: ResumePdfProps) {
  return (
    <Document
      title={`${resumeHeader.name} — Resume`}
      author={resumeHeader.name}
    >
      <Page size="LETTER" style={S.page}>
        <Text style={S.name}>{resumeHeader.name.toUpperCase()}</Text>
        <Text style={S.title}>{resumeHeader.title.toUpperCase()}</Text>
        <Text style={S.contact}>
          {resumeHeader.location} | {phone} | {email}
        </Text>
        <Text style={S.contact}>
          {resumeHeader.links.map((l) => l.label).join(" | ")}
        </Text>

        <Text style={S.sectionTitle}>Professional Summary</Text>
        <Text>{resumeSummary}</Text>

        <Text style={S.sectionTitle}>Skills</Text>
        {resumeSkills.map(({ group, items }) => (
          <View key={group} style={S.skillRow} wrap={false}>
            <Text style={S.skillGroup}>{group}</Text>
            <Text style={S.skillItems}>{items}</Text>
          </View>
        ))}

        <Text style={S.sectionTitle}>Work Experience</Text>
        {resumeExperience.map((job) => (
          <View key={`${job.org}-${job.dates}`}>
            {/* Keep the header with at least a couple of bullets; the entry
                itself may split across pages instead of orphaning a half page. */}
            <View minPresenceAhead={70}>
              <View style={S.jobHeadRow}>
                <Text style={S.jobHead}>
                  {job.role} | {job.org}
                </Text>
                <Text style={S.jobDates}>{job.dates}</Text>
              </View>
              {job.location ? <Text style={S.jobMeta}>{job.location}</Text> : null}
              {job.note ? <Text style={S.jobNote}>{job.note}</Text> : null}
            </View>
            {job.bullets.map((bullet) => (
              <View key={bullet} style={S.bullet} wrap={false}>
                <Text style={S.bulletGlyph}>•</Text>
                <Text style={S.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={S.sectionTitle}>Education</Text>
        {resumeEducation.map((entry) => (
          <Text key={entry.credential} style={S.eduLine}>
            <Text style={{ fontFamily: "Courier-Bold" }}>{entry.credential}</Text>
            {entry.school ? ` — ${entry.school}` : ""}
            <Text style={S.eduMeta}>
              {"  |  "}
              {entry.location} | {entry.dates}
            </Text>
          </Text>
        ))}
      </Page>
    </Document>
  );
}
