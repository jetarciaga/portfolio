import Link from "next/link";
import { createPost } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/authz";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          className="font-mono text-sm text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
          href="/admin"
        >
          ← Admin
        </Link>
        <header className="mt-12 max-w-prose">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
            New post
          </h1>
          <p className="mt-4 text-base leading-body text-muted">
            New posts start as drafts. Publish them from the list when they are
            ready to appear on the public writing page.
          </p>
        </header>

        <form action={createPost} className="mt-12 max-w-3xl space-y-8">
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="title">
              Title
            </label>
            <input
              className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 text-base text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              id="title"
              maxLength={200}
              name="title"
              required
              type="text"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="slug">
              Slug
            </label>
            <input
              className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              id="slug"
              maxLength={120}
              name="slug"
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              required
              type="text"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="summary">
              Summary
            </label>
            <textarea
              className="mt-2 block min-h-32 w-full rounded-token border border-border bg-surface px-4 py-3 text-base text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              id="summary"
              maxLength={500}
              name="summary"
              required
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="tags">
              Tags
            </label>
            <input
              className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              id="tags"
              name="tags"
              placeholder="postgres, debugging"
              required
              type="text"
            />
            <p className="mt-2 text-sm text-muted">Separate tags with commas.</p>
          </div>
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="body_md">
              Markdown body
            </label>
            <textarea
              className="mt-2 block min-h-96 w-full rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm leading-body text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              id="body_md"
              name="body_md"
              required
            />
          </div>
          <button
            className="rounded-token bg-accent px-5 py-3 text-sm font-medium text-bg transition-colors duration-150 ease-out hover:bg-accent-hover"
            type="submit"
          >
            Save draft
          </button>
        </form>
      </div>
    </main>
  );
}
