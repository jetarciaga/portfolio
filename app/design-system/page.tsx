import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Design system — Jethro Arciaga",
  description: "The living visual reference for Jethro Arciaga's portfolio.",
};

const typeSamples = [
  { name: "xs", className: "text-xs", sample: "Metadata · 13px" },
  { name: "sm", className: "text-sm", sample: "Supporting copy · 15px" },
  { name: "base", className: "text-base", sample: "Body copy · 17px" },
  { name: "lg", className: "text-lg", sample: "Lead copy · 20px" },
  { name: "xl", className: "text-xl", sample: "Subheading · 25px" },
  { name: "2xl", className: "text-2xl", sample: "Section heading · 31px" },
  { name: "3xl", className: "text-3xl", sample: "Page heading · 39px" },
] as const;

const colorSamples = [
  { name: "Background", role: "page canvas", className: "bg-bg text-text" },
  { name: "Surface", role: "cards and panels", className: "bg-surface text-text" },
  { name: "Text", role: "body and headings", className: "bg-text text-bg" },
  { name: "Muted", role: "metadata and supporting copy", className: "bg-surface text-muted" },
  { name: "Border", role: "quiet separation", className: "border border-border bg-bg text-text" },
  { name: "Accent", role: "links and primary actions", className: "bg-accent text-bg" },
] as const;

function ThemePreview({
  mode,
  label,
  description,
}: {
  mode: "light" | "dark";
  label: string;
  description: string;
}) {
  return (
    <article
      className={`theme-preview theme-preview--${mode} rounded-token border border-border bg-bg p-6 text-text`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Theme
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-heading">{label}</h3>
        </div>
        <span className="rounded-token bg-accent px-3 py-1 font-mono text-xs text-bg">
          Aa
        </span>
      </div>
      <p className="mt-4 text-sm text-muted">{description}</p>
      <div className="mt-6 rounded-token border border-border bg-surface p-4">
        <p className="font-mono text-xs text-muted">MUTED / METADATA</p>
        <p className="mt-3 text-base leading-body">
          Readable technical writing with enough room for the details.
        </p>
        <a
          className="mt-4 inline-flex font-mono text-sm text-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-hover hover:decoration-current"
          href="#type-scale"
        >
          Accent link →
        </a>
      </div>
    </article>
  );
}

export default function DesignSystemPage() {
  return (
    <main id="main-content" className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <section
          aria-labelledby="intro-heading"
          className="max-w-prose scroll-mt-24"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Living reference · milestone 2
          </p>
          <h1
            id="intro-heading"
            className="mt-6 text-3xl font-semibold leading-heading tracking-tight"
          >
            Python, data, and AI-native workflows.
          </h1>
          <p className="mt-6 text-lg leading-body text-muted">
            The visual rules behind the portfolio: warm neutrals, one amber
            accent, a reading-first type scale, and explicit theme tokens.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
            <a
              className="rounded-token bg-accent px-5 py-3 text-bg transition-colors duration-150 ease-out hover:bg-accent-hover"
              href="#themes"
            >
              Review the themes
            </a>
            <a
              className="rounded-token border border-border px-5 py-3 text-text transition-colors duration-150 ease-out hover:border-accent-hover hover:text-accent-hover"
              href="#type-scale"
            >
              Inspect the type scale
            </a>
          </div>
        </section>

        <Section
          id="themes"
          className="mt-24"
          eyebrow="Palette"
          title="Warm neutrals, one amber accent."
          description={
            <>
              The site follows the reader&apos;s system preference. Both themes
              use the same roles, spacing, and contrast relationships.
            </>
          }
        >
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ThemePreview
              mode="light"
              label="Light"
              description="Stone neutrals on an almost-white canvas."
            />
            <ThemePreview
              mode="dark"
              label="Dark"
              description="The same hierarchy, with warmer deep neutrals."
            />
          </div>
        </Section>

        <Section
          id="type-scale"
          className="mt-24"
          eyebrow="Type"
          title="A reading-first scale."
          description={
            <>
              Inter carries the interface and prose. JetBrains Mono marks code,
              metadata, and tags without turning the whole page into a terminal.
            </>
          }
        >
          <div className="mt-8 border-t border-border">
            {typeSamples.map((sample) => (
              <div
                key={sample.name}
                className="grid gap-3 border-b border-border py-5 sm:grid-cols-3 sm:items-baseline"
              >
                <p className="font-mono text-xs text-muted">{sample.name}</p>
                <p className={`sm:col-span-2 ${sample.className}`}>{sample.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="color"
          className="mt-24"
          eyebrow="Roles"
          title="Tokens, not one-off decoration."
        >
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorSamples.map((sample) => (
              <div
                key={sample.name}
                className={`rounded-token p-5 ${sample.className}`}
              >
                <p className="font-mono text-xs uppercase tracking-widest">
                  {sample.name}
                </p>
                <p className="mt-8 text-sm">{sample.role}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
