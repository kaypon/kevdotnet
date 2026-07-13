"use client";

import { useSyncExternalStore } from "react";

type ResumeContactProps = {
  location: string;
  phoneParts: string[];
  emailUser: string;
  emailDomain: string;
};

const emptySubscribe = () => () => {};

/** Anti-scrape contact line for /resume. The phone number and email only
 * ever exist assembled inside the browser, after hydration — server HTML,
 * RSC payload, and JS bundles carry them split into parts that neither an
 * email regex nor a phone regex can match. Humans see the real thing
 * (clickable) a frame after load; harvesters reading raw responses don't. */
export function ResumeContact({ location, phoneParts, emailUser, emailDomain }: ResumeContactProps) {
  // false during SSR and the hydration pass, true in the live browser.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const phone = mounted ? phoneParts.join("-") : null;
  const email = mounted ? `${emailUser}${String.fromCharCode(64)}${emailDomain}` : null;

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
