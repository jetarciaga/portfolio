import Link from "next/link";
import { signOut } from "@/auth";
import { deletePost, togglePostStatus } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/authz";
import {
  listAdminPosts,
  parsePostStatusFilter,
} from "@/lib/admin-posts";
import { formatContentDate } from "@/lib/content";

async function signOutOfAdmin() {
  "use server";

  await signOut({ redirectTo: "/" });
}

type AdminPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;
  const statusFilter = parsePostStatusFilter(params.status);
  const posts = await listAdminPosts(statusFilter);

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-prose">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
              Writing CMS
            </h1>
            <p className="mt-4 text-base leading-body text-muted">
              Signed in as {session.user?.name ?? session.user?.email ?? "admin"}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-token bg-accent px-4 py-3 text-sm font-medium text-bg transition-colors duration-150 ease-out hover:bg-accent-hover"
              href="/admin/new"
            >
              New post
            </Link>
            <form action={signOutOfAdmin}>
              <button
                className="rounded-token border border-border px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <form
          className="mt-10 flex flex-wrap items-end gap-4 border-t border-border pt-6"
          method="get"
        >
          <label className="flex flex-col gap-2 font-mono text-xs text-muted">
            Status
            <select
              className="rounded-token border border-border bg-surface px-3 py-2 font-sans text-sm text-text"
              defaultValue={statusFilter}
              name="status"
            >
              <option value="all">All posts</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
            </select>
          </label>
          <button
            className="rounded-token border border-border px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            type="submit"
          >
            Filter
          </button>
        </form>

        <div className="mt-10 space-y-8">
          {posts.length === 0 ? (
            <p className="border-t border-border pt-6 text-base text-muted">
              No posts match this filter.
            </p>
          ) : (
            posts.map((post) => (
              <article
                className="min-w-0 border-t border-border pt-6"
                key={post.id}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 max-w-prose">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
                      <span className="uppercase tracking-widest text-accent">
                        {post.status}
                      </span>
                      <span>{formatContentDate(post.updated_at)}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold leading-heading">
                      <Link
                        className="transition-colors duration-150 ease-out hover:text-accent"
                        href={`/admin/${post.id}/edit`}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-body text-muted">
                      {post.summary}
                    </p>
                    <p className="mt-4 font-mono text-xs leading-body text-muted">
                      {post.tags.join(" · ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <form action={togglePostStatus.bind(null, post.id)}>
                      <button
                        className="rounded-token border border-border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
                        type="submit"
                      >
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        className="rounded-token border border-border px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
