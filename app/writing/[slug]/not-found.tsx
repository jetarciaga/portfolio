import Link from "next/link";

export default function WritingPostNotFound() {
  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Writing
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-heading">
          Post not found
        </h1>
        <p className="mt-4 max-w-prose text-base leading-body text-muted">
          This post is not published or does not exist.
        </p>
        <Link
          className="mt-8 inline-block font-mono text-sm text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
          href="/writing"
        >
          ← Back to writing
        </Link>
      </section>
    </main>
  );
}
