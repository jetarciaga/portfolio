import Link from "next/link";
import { deletePost, togglePostStatus, updatePost } from "@/app/admin/actions";
import { getAdminPostById, isPostId } from "@/lib/admin-posts";
import { requireAdmin } from "@/lib/authz";
import { notFound } from "next/navigation";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  await requireAdmin();
  const { id } = await params;

  if (!isPostId(id)) {
    notFound();
  }

  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  const updatePostForId = updatePost.bind(null, post.id);
  const togglePostStatusForId = togglePostStatus.bind(null, post.id);
  const deletePostForId = deletePost.bind(null, post.id);

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
            {post.status}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
            Edit post
          </h1>
          <p className="mt-4 text-base leading-body text-muted">
            Published slugs are public URLs. Keep the slug stable after
            publishing whenever possible.
          </p>
        </header>

        <form action={updatePostForId} className="mt-12 max-w-3xl space-y-8">
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="title">
              Title
            </label>
            <input
              className="mt-2 block w-full rounded-token border border-border bg-surface px-4 py-3 text-base text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              defaultValue={post.title}
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
              defaultValue={post.slug}
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
              defaultValue={post.summary}
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
              defaultValue={post.tags.join(", ")}
              id="tags"
              name="tags"
              required
              type="text"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-muted" htmlFor="body_md">
              Markdown body
            </label>
            <textarea
              className="mt-2 block min-h-96 w-full rounded-token border border-border bg-surface px-4 py-3 font-mono text-sm leading-body text-text outline-none transition-colors duration-150 ease-out focus:border-accent"
              defaultValue={post.body_md}
              id="body_md"
              name="body_md"
              required
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-token bg-accent px-5 py-3 text-sm font-medium text-bg transition-colors duration-150 ease-out hover:bg-accent-hover"
              type="submit"
            >
              Save changes
            </button>
            <button
              className="rounded-token border border-border px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
              formAction={togglePostStatusForId}
              type="submit"
            >
              {post.status === "published" ? "Revert to draft" : "Publish post"}
            </button>
            <button
              className="rounded-token border border-border px-4 py-3 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
              formAction={deletePostForId}
              type="submit"
            >
              Delete post
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
