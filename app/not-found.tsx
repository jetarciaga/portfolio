import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative z-10 flex min-h-screen items-center bg-bg px-4 py-20 sm:px-6"
    >
      <div className="mx-auto w-full max-w-prose">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-heading tracking-tight">
          That page isn&apos;t here.
        </h1>
        <p className="mt-4 text-base leading-body text-muted">
          The address may be wrong, or the page may have moved.
        </p>
        <Link
          className="mt-8 inline-flex rounded-token border border-border px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          href="/"
        >
          Back home →
        </Link>
      </div>
    </main>
  );
}
