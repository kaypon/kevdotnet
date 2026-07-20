"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { setReturningFrom } from "@/lib/nav-return";

type BackLinkProps = {
  href: string;
  section?: string;
  children: ReactNode;
};

export function BackLink({ href, section, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="subpage-back"
      onClick={section ? () => setReturningFrom(section) : undefined}
    >
      {children}
    </Link>
  );
}
