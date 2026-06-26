import Link from "next/link";

export type MastheadRoute = "home" | "work" | "van";

type MastheadIdentityProps = {
  current: MastheadRoute;
  descriptor: string;
};

export function MastheadIdentity({
  current,
  descriptor,
}: MastheadIdentityProps) {
  return (
    <section className="masthead-identity" aria-label="Kevin van der Poll">
      <div className="masthead-issue">
        <span>Independent study No. 001</span>
        <span>Miami, Florida</span>
        <span aria-hidden="true">
          {current === "home" ? "Front cover" : `${current} file`}
        </span>
      </div>
      <div className="cover-wordmark masthead-wordmark">
        <h1>
          <Link href="/" aria-label="Kevin van der Poll home">
            KEVIN
          </Link>
        </h1>
        <span className="cover-script-name" aria-hidden="true">
          van der Poll
        </span>
      </div>
      <p className="masthead-descriptor">{descriptor}</p>
    </section>
  );
}
