import { signOut } from "@/auth";
import { requireAdmin } from "@/lib/authz";

async function signOutOfAdmin() {
  "use server";

  await signOut({ redirectTo: "/" });
}

export default async function AdminPage() {
  const session = await requireAdmin();

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-prose">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
            Writing CMS
          </h1>
          <p className="mt-4 text-base leading-body text-muted">
            Signed in as {session.user?.name ?? session.user?.email ?? "admin"}.
            Database-backed authoring starts in the next milestone.
          </p>
        </header>
        <form action={signOutOfAdmin} className="mt-8">
          <button
            className="rounded-token border border-border px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
