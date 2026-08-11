import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 bg-bg border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Jethro Arciaga · portfolio + writing platform</p>
        <Link
          className="w-fit transition-colors duration-150 ease-out hover:text-accent-hover"
          href="https://github.com/jetarciaga"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </Link>
      </div>
    </footer>
  );
}
