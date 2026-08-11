import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

type SignInPageProps = {
  searchParams: Promise<{ error?: string }>;
};

async function signInWithGitHub() {
  "use server";

  try {
    await signIn("github", { redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/sign-in?error=AccessDenied");
    }

    throw error;
  }
}

export default async function AdminSignIn({
  searchParams,
}: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-prose">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
            Sign in to publish.
          </h1>
          <p className="mt-4 text-base leading-body text-muted">
            The CMS uses GitHub OAuth. Only the configured admin GitHub account
            can continue.
          </p>
          {error ? (
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-muted">
              This GitHub account is not allowlisted.
            </p>
          ) : null}
          <form action={signInWithGitHub} className="mt-8">
            <button
              className="rounded-token border border-border px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
              type="submit"
            >
              Continue with GitHub ↗
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
