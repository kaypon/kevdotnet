import { ViewTransition, type ReactNode } from "react";
import { BackLink } from "@/components/BackLink";

type SubPageShellProps = {
  title: string;
  children: ReactNode;
  wide?: boolean;
  backHref?: string;
  backLabel?: string;
  /* Pairs this page's title with an identically named element elsewhere
     (e.g. the /kev nav label) so navigation morphs between the two. */
  titleTransition?: string;
};

export function SubPageShell({
  title,
  children,
  wide,
  backHref = "/kev",
  backLabel,
  titleTransition,
}: SubPageShellProps) {
  const heading = (
    <h1 className="subpage-title">
      <span className="subpage-title__slash">/</span>{title}
    </h1>
  );

  return (
    <main className="subpage">
      <div className={`subpage-inner${wide ? " subpage-inner--wide" : ""}`}>
        <div className="subpage-topnav">
          <BackLink href={backHref} section={titleTransition}>
            {backLabel && `[${backLabel}]`}
          </BackLink>
        </div>
        {titleTransition ? (
          <ViewTransition name={`title-${titleTransition}`} share="morph">
            {heading}
          </ViewTransition>
        ) : (
          heading
        )}
        <div className="subpage-body">{children}</div>
      </div>
    </main>
  );
}
