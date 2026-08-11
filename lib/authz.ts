import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ALLOWED_GITHUB_USER_ID } from "@/lib/auth-config";

export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.id !== ALLOWED_GITHUB_USER_ID) {
    redirect("/admin/sign-in");
  }

  return session;
}
