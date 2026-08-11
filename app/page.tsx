import Image from "next/image";
import Link from "next/link";
import type { ContentEntry } from "@/lib/content";
import heroPhoto from "@/public/jet-shanghai.jpg";
import CursorFog from "@/components/CursorFog";
import Section from "@/components/Section";
import { formatContentDate, getCollection } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const leafVariants = [
  "hero-leaf--one",
  "hero-leaf--two",
  "hero-leaf--three",
  "hero-leaf--four",
  "hero-leaf--five",
  "hero-leaf--six",
  "hero-leaf--seven",
] as const;

const sparkleVariants = [
  "hero-sparkle--one",
  "hero-sparkle--two",
  "hero-sparkle--three",
  "hero-sparkle--four",
  "hero-sparkle--five",
  "hero-sparkle--six",
] as const;

const workItems = [
  {
    title: "JetSight",
    eyebrow: "Flagship project",
    description:
      "Architecture, the RLS finding, and roadmap reasoning for the project.",
    stack: "",
    href: "https://github.com/jetarciaga/jetsight",
    linkLabel: "View repository ↗",
    wide: true,
  },
  {
    title: "AI-native extraction at scale",
    eyebrow: "GovConnex · Python Developer / Data Engineer · 19 Aug 2025 — early Aug 2026",
    description:
      "PDF mining of unstructured text and tabular layouts; Live-Transcript low-latency streaming with concurrent closed-caption capture; Instant-Transcript on-demand URL-driven video extraction; an async email pipeline using Claude for extraction and classification; Promptfoo benchmarking and regression prevention; and MCP servers with Copilot for delivery velocity.",
    stack:
      "AWS · Python · TypeScript · Node.js · Scrapy · Pytest · Datadog · CI/CD",
    href: "https://www.govconnex.com/",
    linkLabel: "GovConnex ↗",
    wide: true,
  },
  {
    title: "ETL for OpenArchitects",
    eyebrow:
      "Penbrothers · Python Developer / Data Engineer · 4 Dec 2023 — Aug 2025",
    description:
      "ETL pipelines for OpenArchitects: secure client-data integration via API and Selenium, transformed to spec and landed in Azure Blob Storage.",
    stack:
      "Azure Blob Storage · Selenium · BeautifulSoup · Slack · Postman · Rundeck · Docker · GitHub Actions · CI/CD · Pytest · TDD",
    href: "https://www.openarchitectsk12.com/",
    linkLabel: "OpenArchitects ↗",
    wide: false,
  },
  {
    title: "CreativeJourneysPH",
    eyebrow: "Full Stack Developer (freelance) · 2025",
    description: "Built and maintains creativejourneysph.com.",
    stack:
      "React · Python/Django · Vercel · Google Cloud · SquareSpace · AWS EC2 · GitHub Actions · Pytest · TDD",
    href: "https://creativejourneysph.com",
    linkLabel: "Visit site ↗",
    wide: false,
  },
  {
    title: "peccbm.ph",
    eyebrow: "Indra Philippines · Python Developer / Analyst · 2 Aug 2021 — 22 Sep 2023",
    description:
      "Backend for the client's award-winning peccbm.ph: AWS Lambda, APIs, Cognito permissions, Neo4j graph database, EventBridge report scheduling, and S3.",
    stack:
      "Lambda · API Gateway · Cognito · S3 · EC2 · Boto3 · Serverless · Neo4j · SharePoint · BitBucket",
    href: "https://peccbm.ph",
    linkLabel: "Visit site ↗",
    wide: false,
  },
] as const;

function Leaf({ variant }: { variant: (typeof leafVariants)[number] }) {
  return (
    <span className={`hero-leaf ${variant}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.8 3.2C14.2 3.3 7.2 5.3 4.2 9.5c-2.3 3.3-.8 7.2 2.9 7.3 4.8.1 8.8-4.5 10.4-8.3-1.8 3.9-5.2 7.2-8.8 8.8 4.8-.7 8.7-4.1 10.2-8.2.7-1.9 1-3.9 1.9-5.9Z" />
        <path d="M5.2 18.2c3-3.5 6.2-6.3 10.3-9.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
      </svg>
    </span>
  );
}

function WaterSparkle({
  variant,
}: {
  variant: (typeof sparkleVariants)[number];
}) {
  return (
    <span className={`hero-sparkle ${variant}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5c.7 5.9 4.6 9.8 10.5 10.5-5.9.7-9.8 4.6-10.5 10.5C11.3 16.6 7.4 12.7 1.5 12 7.4 11.3 11.3 7.4 12 1.5Z" />
      </svg>
    </span>
  );
}

function WorkEntry({ item }: { item: (typeof workItems)[number] }) {
  return (
    <article
      className={`min-w-0 border-t border-border pt-6 ${item.wide ? "lg:col-span-2" : ""}`}
    >
      <div className="min-w-0 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <p className="font-mono text-xs leading-body text-muted">
            {item.eyebrow}
          </p>
          <h3 className="mt-3 text-xl font-semibold leading-heading">
            {item.title}
          </h3>
        </div>
        {item.href ? (
          <a
            className="w-fit shrink-0 font-mono text-sm text-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-hover hover:decoration-current"
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            {item.linkLabel}
          </a>
        ) : null}
      </div>
      <p className="mt-5 max-w-prose text-base leading-body text-muted">
        {item.description}
      </p>
      {item.stack ? (
        <p className="mt-5 max-w-prose font-mono text-xs leading-body text-muted">
          {item.stack}
        </p>
      ) : null}
    </article>
  );
}

function WritingCard({
  item,
  featured = false,
}: {
  item: ContentEntry;
  featured?: boolean;
}) {
  return (
    <Link
      className={`group block min-w-0 border-t border-border pt-6 transition-colors duration-150 ease-out ${
        featured ? "md:col-span-2" : ""
      }`}
      href={`/writing/${item.slug}`}
    >
      <p className="font-mono text-xs leading-body text-muted">
        {formatContentDate(item.date)}
      </p>
      <h3
        className={`mt-3 font-semibold leading-heading transition-colors duration-150 ease-out group-hover:text-accent ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`${
          featured
            ? "mt-4 max-w-prose text-base"
            : "mt-3 truncate text-sm"
        } leading-body text-muted`}
      >
        {item.summary}
      </p>
      <WritingTags tags={item.tags} featured={featured} />
    </Link>
  );
}

function WritingTags({
  tags,
  featured = false,
}: {
  tags: readonly string[];
  featured?: boolean;
}) {
  const visibleTags = tags.slice(0, featured ? 5 : 2);
  const overflowCount = tags.length - visibleTags.length;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Tags">
      {featured ? (
        <span className="rounded-token bg-accent px-2 py-1 font-mono text-xs text-bg">
          Featured
        </span>
      ) : null}
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className="rounded-token border border-border px-2 py-1 font-mono text-xs text-muted"
        >
          {tag}
        </span>
      ))}
      {overflowCount > 0 ? (
        <span className="font-mono text-xs text-muted">+{overflowCount}</span>
      ) : null}
    </div>
  );
}

export default async function Home() {
  const writingItems = await getCollection("posts");
  const featuredWritingItem = writingItems[0];
  const secondaryWritingItems = writingItems.slice(1, 3);

  return (
    <main id="main-content" className="bg-bg">
      <section
        id="home"
        aria-labelledby="home-heading"
        className="hero relative isolate min-h-screen overflow-hidden"
      >
        <Image
          className="hero-background"
          src={heroPhoto}
          alt="Jethro Arciaga in a park beneath autumn ginkgo trees"
          fill
          sizes="100vw"
          preload
        />

        <div className="hero-scrim" aria-hidden="true" />

        <div className="hero-motion" aria-hidden="true">
          <CursorFog />
          <div className="hero-mist" />
          <div className="hero-water-sparkles">
            {sparkleVariants.map((variant) => (
              <WaterSparkle key={variant} variant={variant} />
            ))}
          </div>
          <div className="hero-leaves">
            {leafVariants.map((variant) => (
              <Leaf key={variant} variant={variant} />
            ))}
          </div>
        </div>

        <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl items-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:items-center lg:py-24">
          <div className="hero-copy-panel">
            <p className="hero-eyebrow font-mono text-xs uppercase tracking-widest">
              Python · Data · AI/LLM engineering
            </p>
            <h1
              id="home-heading"
              className="mt-5 text-3xl font-semibold leading-heading tracking-tight"
            >
              {SITE.name}
            </h1>
            <p className="hero-positioning mt-6 max-w-prose text-lg leading-body">
              Python and data engineer building scalable pipelines, automated
              scraping and extraction systems, and AWS integrations —
              specialising in AI-native workflows: LLM classification,
              structured extraction, and systematic prompt evaluation.
            </p>
            {SITE.availability ? (
              <div className="hero-availability mt-8 border-l-2 pl-4">
                <p className="font-mono text-sm">{SITE.availabilityText}</p>
                <p className="mt-1 font-mono text-xs">{SITE.location}</p>
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
              <a
                className="rounded-token bg-accent px-5 py-3 text-bg transition-colors duration-150 ease-out hover:bg-accent-hover"
                href={`mailto:${SITE.email}`}
              >
                Email me
              </a>
              <a
                className="hero-secondary-link rounded-token border px-5 py-3 transition-colors duration-150 ease-out"
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="mt-6 font-mono text-sm">
              <a
                className="hero-text-link underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out"
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-bg py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Section
            id="about"
            eyebrow="About"
            title="Python, data, and AI-native workflows."
            description={
              <>
                <p>
                  I build scalable pipelines, automated scraping and extraction
                  systems, and AWS integrations — specialising in AI-native
                  workflows: LLM classification, structured extraction, and
                  systematic prompt evaluation.
                </p>
                <p className="mt-5">
                  My experience spans Python development, data engineering,
                  full-stack delivery, and frontend work across GovConnex,
                  CreativeJourneysPH, Penbrothers, and Indra Philippines.
                </p>
              </>
            }
          >
            <div className="mt-10 grid gap-10 border-t border-border pt-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold leading-heading">
                  Credentials
                </h3>
                <ul className="mt-5 space-y-3 text-base leading-body text-muted">
                  <li>Meta Front-End Developer · Aug 2024</li>
                  <li>Google IT Automation with Python · Dec 2020</li>
                  <li>Google AI Essentials · Sept 2024</li>
                  <li>AWS Cloud Practitioner Essentials · Apr 2024</li>
                  <li>Web Application Technologies and Django · Jan 2021</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold leading-heading">
                  Education
                </h3>
                <ul className="mt-5 space-y-3 text-base leading-body text-muted">
                  <li>
                    BS Information Technology · Pamantasan ng Lungsod ng
                    Muntinlupa
                  </li>
                  <li>
                    College Degree in Multimedia Arts · CIIT College of Arts
                    and Technology
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          <Section
            id="work"
            className="mt-24 border-t border-border pt-16 sm:mt-32 sm:pt-24"
            eyebrow="Work"
            title="Systems, products, and the reasoning behind them."
            description="Extraction, ingestion, full-stack delivery, and backend systems across public products and capability-level work."
          >
            <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
              {workItems.map((item) => (
                <WorkEntry key={item.title} item={item} />
              ))}
            </div>
          </Section>

          <Section
            id="writing"
            className="mt-24 border-t border-border pt-16 sm:mt-32 sm:pt-24"
            eyebrow="Writing"
            title="Notes from building data systems."
            description="Technical threads on infrastructure failures, model choices, and the boundaries worth keeping."
          >
            <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {featuredWritingItem ? (
                <WritingCard item={featuredWritingItem} featured />
              ) : null}
              {secondaryWritingItems.map((item) => (
                <WritingCard key={item.slug} item={item} />
              ))}
              <Link
                className="w-fit rounded-token border border-border px-4 py-3 font-mono text-sm text-accent transition-colors duration-150 ease-out hover:border-accent-hover hover:text-accent-hover md:col-span-2"
                href="/writing"
              >
                All writing →
              </Link>
            </div>
          </Section>

          <Section
            id="contact"
            className="mt-24 border-t border-border pt-16 sm:mt-32 sm:pt-24"
            eyebrow="Contact"
            title="A clear route to get in touch."
            description="For remote or visa-sponsored roles, email or connect on LinkedIn."
          >
            <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-2 md:gap-10">
              <div>
                {SITE.availability ? (
                  <p className="font-mono text-sm text-accent">
                    {SITE.availabilityText}
                  </p>
                ) : null}
                <p className="mt-3 text-base text-muted">{SITE.location}</p>
              </div>
              <div className="flex flex-wrap content-start gap-x-6 gap-y-4 font-mono text-sm">
                <a
                  className="text-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-hover hover:decoration-current"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
                <a
                  className="text-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-hover hover:decoration-current"
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  className="text-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-hover hover:decoration-current"
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
