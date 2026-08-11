import type { Metadata } from "next";
import Link from "next/link";
import { formatContentDate, getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing — Jethro Arciaga",
  description:
    "Notes from building data systems, choosing models, and keeping technical scope deliberate.",
};

export const dynamic = "force-dynamic";

export default async function WritingIndex() {
  const posts = await getCollection("posts");

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-prose">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Writing
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
            Notes from building data systems.
          </h1>
          <p className="mt-4 text-base leading-body text-muted">
            Technical threads on infrastructure failures, model choices, and
            the boundaries worth keeping.
          </p>
        </header>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              className={`group block min-w-0 border-t border-border pt-6 transition-colors duration-150 ease-out ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              href={`/writing/${post.slug}`}
            >
              <p className="font-mono text-xs leading-body text-muted">
                {formatContentDate(post.date)}
              </p>
              <h2
                className={`mt-3 font-semibold leading-heading transition-colors duration-150 ease-out group-hover:text-accent ${
                  index === 0 ? "text-2xl" : "text-lg"
                }`}
              >
                {post.title}
              </h2>
              <p
                className={`${
                  index === 0
                    ? "mt-4 max-w-prose text-base"
                    : "mt-3 text-sm"
                } leading-body text-muted`}
              >
                {post.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-token border border-border px-2 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
