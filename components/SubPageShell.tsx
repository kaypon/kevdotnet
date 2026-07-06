import type { ReactNode } from "react";
import Link from "next/link";

type SubPageShellProps = {
  title: string;
  children: ReactNode;
};

export function SubPageShell({ title, children }: SubPageShellProps) {
  return (
    <main className="subpage">
      <div className="subpage-inner">
        <div className="subpage-topnav">
          <Link href="/van" className="subpage-back">← van</Link>
        </div>
        <h1 className="subpage-title">{title}</h1>
        <div className="subpage-body">{children}</div>
      </div>
    </main>
  );
}
