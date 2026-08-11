import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";
import {
  formatContentDate,
  getCollection,
  getEntry,
} from "@/lib/content";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const mdxComponents: MDXComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-12 text-2xl font-semibold leading-heading">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-10 text-xl font-semibold leading-heading">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mt-6 text-base leading-body text-muted">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-body text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mt-6 list-decimal space-y-2 pl-6 text-base leading-body text-muted">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="mt-8 border-l-2 border-accent pl-4 text-base italic leading-body text-muted">
      {children}
    </blockquote>
  ),
  a: ({ children, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-hover hover:decoration-current"
    >
      {children}
    </a>
  ),
  pre: ({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className={`my-8 max-w-full overflow-x-auto rounded-token border border-border bg-surface p-4 text-sm leading-body ${className ?? ""}`}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className={`font-mono text-sm ${className ?? ""}`}
    >
      {children}
    </code>
  ),
};

const rehypePrettyCodePlugin: [
  typeof rehypePrettyCode,
  { keepBackground: boolean; theme: string },
] = [
  rehypePrettyCode,
  {
    keepBackground: false,
    theme: "github-dark-dimmed",
  },
];

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [rehypePrettyCodePlugin],
  },
};

export function generateStaticParams() {
  return getCollection("posts").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getEntry("posts", slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} — Jethro Arciaga`,
    description: post.summary,
  };
}

export default async function WritingPost({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getEntry("posts", slug);

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
          <MDXRemote
            source={post.body}
            components={mdxComponents}
            options={mdxOptions}
          />
        </div>
      </article>
    </main>
  );
}
