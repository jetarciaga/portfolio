import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatContentDate,
  getCollection,
  getEntry,
} from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import { absoluteUrl, SITE } from "@/lib/site";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCollection("posts")).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getEntry("posts", slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} — Jethro Arciaga`,
    description: post.summary,
    alternates: {
      canonical: absoluteUrl(`/writing/${post.slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: absoluteUrl(`/writing/${post.slug}`),
      siteName: SITE.name,
      type: "article",
      publishedTime: `${post.date}T00:00:00.000Z`,
      tags: post.tags,
    },
  };
}

export default async function WritingPost({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getEntry("posts", slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          className="font-mono text-sm text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
          href="/writing"
        >
          ← Writing
        </Link>

        <header className="mt-12 max-w-prose">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Writing
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 font-mono text-xs leading-body text-muted">
            {formatContentDate(post.date)}
          </p>
          <p className="mt-6 text-lg leading-body text-muted">
            {post.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-token border border-border px-2 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mdx-content mt-12 max-w-prose">
          <MdxContent source={post.body} />
        </div>
      </article>
    </main>
  );
}
