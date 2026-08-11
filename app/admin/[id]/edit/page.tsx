import PostEditor from "@/components/PostEditor";
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

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

        <div className="mt-12">
          <PostEditor initialPost={post} />
        </div>
      </div>
    </main>
  );
}
