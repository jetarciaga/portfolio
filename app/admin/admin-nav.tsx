"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function navClassName(active: boolean) {
  return active
    ? "border-b-2 border-accent pb-2 text-text"
    : "border-b-2 border-transparent pb-2 text-muted transition-colors duration-150 ease-out hover:border-accent hover:text-accent";
}

export function AdminNav() {
  const pathname = usePathname();
  const writingIsActive =
    pathname === "/admin" ||
    (pathname.startsWith("/admin/") &&
      !pathname.startsWith("/admin/jobs") &&
      !pathname.startsWith("/admin/sign-in"));
  const jobsIsActive =
    pathname === "/admin/jobs" || pathname.startsWith("/admin/jobs/");

  return (
    <nav aria-label="Admin sections" className="mt-4 flex gap-5 font-mono text-xs">
      <Link
        aria-current={writingIsActive ? "page" : undefined}
        className={navClassName(writingIsActive)}
        href="/admin"
      >
        Writing
      </Link>
      <Link
        aria-current={jobsIsActive ? "page" : undefined}
        className={navClassName(jobsIsActive)}
        href="/admin/jobs"
      >
        Jobs
      </Link>
    </nav>
  );
}
