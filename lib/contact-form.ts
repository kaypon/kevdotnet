/** Google Form backing the /contact flow. The site never shows Google UI —
 * ContactFlow.tsx POSTs answers straight to the form's public formResponse
 * endpoint, and responses collect in the form's Responses tab.
 *
 * The entry ids come from the form page's FB_PUBLIC_LOAD_DATA_ blob (each
 * question's field name is `entry.<id>`); re-extract them if the form's
 * questions are ever added/removed/reordered.
 */
export const CONTACT_FORM_ID =
  "1FAIpQLSdHB25pUd0x8irKTWPnoEKFUV1WrP52_fFTRtra2YvQ98YDoA";

export type ContactStep = {
  /** Google Forms field name, e.g. "entry.1234567890" */
  entry: string;
  question: string;
  optional: boolean;
  inputType: "email" | "text" | "textarea";
  placeholder: string;
};

export const contactSteps: ContactStep[] = [
  {
    entry: "entry.1526153177",
    question: "Whats your email?",
    optional: false,
    inputType: "email",
    placeholder: "you@somewhere.com",
  },
  {
    entry: "entry.1538674830",
    question: "What would you like to build?",
    optional: true,
    inputType: "textarea",
    placeholder: "an app, a poster, a weird idea...",
  },
  {
    entry: "entry.176119087",
    question: "Who am I talking to?",
    optional: true,
    inputType: "text",
    placeholder: "a name, a handle, a mystery",
  },
];

export const contactFormAction = `https://docs.google.com/forms/d/e/${CONTACT_FORM_ID}/formResponse`;
