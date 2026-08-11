import PostEditor from "@/components/PostEditor";
import { requireAdmin } from "@/lib/authz";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

        <div className="mt-12">
          <PostEditor initialPost={null} />
        </div>
      </div>
    </main>
  );
}
