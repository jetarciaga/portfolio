import "server-only";
/* eslint-disable @next/next/no-img-element */

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { renderToReadableStream } from "react-dom/server.edge";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { MDXComponents } from "mdx/types";

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
  img: ({ alt, ...props }: ComponentPropsWithoutRef<"img">) => (
    <img
      {...props}
      alt={alt ?? ""}
      className="my-8 max-w-full rounded-token border border-border"
    />
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

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [
      ...(defaultSchema.attributes?.["*"] ?? []),
      "className",
    ],
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      "dataLanguage",
      "dataMeta",
    ],
    span: [
      ...(defaultSchema.attributes?.span ?? []),
      "dataLine",
      "dataHighlightedLine",
      "dataHighlightedChars",
    ],
  },
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

const rehypeSanitizePlugin: [typeof rehypeSanitize, typeof sanitizeSchema] = [
  rehypeSanitize,
  sanitizeSchema,
];

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [rehypeSanitizePlugin, rehypePrettyCodePlugin],
  },
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: mdxOptions,
  });

  return content;
}

export async function renderMdxToHtml(source: string) {
  const stream = await renderToReadableStream(await renderMdx(source));
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }

  return (html + decoder.decode()).replace(
    /<link rel="preload"[^>]*>\s*/g,
    "",
  );
}

export async function MdxContent({ source }: { source: string }) {
  return renderMdx(source);
}
