import type { ReactNode } from "react";
import Link from "next/link";

type SubPageShellProps = {
  title: string;
  children: ReactNode;
  wide?: boolean;
  backHref?: string;
  backLabel?: string;
};

export function SubPageShell({
  title,
  children,
  wide,
  backHref = "/van",
  backLabel = "← van",
}: SubPageShellProps) {
  return (
    <main className="subpage">
      <div className={`subpage-inner${wide ? " subpage-inner--wide" : ""}`}>
        <div className="subpage-topnav">
          <Link href={backHref} className="subpage-back">[{backLabel}]</Link>
        </div>
        <h1 className="subpage-title">
          <span className="subpage-title__slash">/</span>{title}
        </h1>
        <div className="subpage-body">{children}</div>
      </div>
    </main>
  );
}
