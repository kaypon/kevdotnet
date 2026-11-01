"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setReturningFrom, getPreviousPath } from "@/lib/nav-return";
import { ScrambleWord } from "./ScrambleWord";

type BackLinkProps = {
  href: string;
  section?: string;
  className?: string;
  /** Defaults to the cycling [← kev] label. */
  children?: ReactNode;
};

export function BackLink({ href, section, className = "subpage-back", children }: BackLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (section) setReturningFrom(section);
        const prev = getPreviousPath();
        if (prev) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      {children ?? <>[← <ScrambleWord />]</>}
    </Link>
  );
}
