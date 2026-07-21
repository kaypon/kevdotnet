"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordNavigation } from "@/lib/nav-return";

export function NavTracker() {
  const pathname = usePathname();
  useEffect(() => {
    recordNavigation(pathname);
  }, [pathname]);
  return null;
}
