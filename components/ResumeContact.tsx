"use client";

import { useSyncExternalStore } from "react";
import type { ResumeContactParts } from "@/lib/resume";

type ResumeContactProps = {
  location: string;
  contact: ResumeContactParts | null;
};

const emptySubscribe = () => () => {};

/** Anti-scrape contact line for /resume. The phone number and email only
 * ever exist assembled inside the browser, after hydration — server HTML,
 * RSC payload, and JS bundles carry them split into parts that neither an
 * email regex nor a phone regex can match. Humans see the real thing
 * (clickable) a frame after load; harvesters reading raw responses don't.
 * With no contact configured (env vars unset) only the location shows. */
export function ResumeContact({ location, contact }: ResumeContactProps) {
  // false during SSR and the hydration pass, true in the live browser.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!contact) return <p className="resume-contact">{location}</p>;

  const phone = mounted ? contact.phoneParts.join("-") : null;
  const email = mounted ? `${contact.emailUser}${String.fromCharCode(64)}${contact.emailDomain}` : null;

  return (
    <p className="resume-contact">
      {location}
      {" · "}
      {phone ? <a href={`tel:+1${phone.replace(/-/g, "")}`}>{phone}</a> : <span>···</span>}
      {" · "}
      {email ? <a href={`mailto:${email}`}>{email}</a> : <span>···</span>}
    </p>
  );
}
