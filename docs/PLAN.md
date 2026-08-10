# Portfolio + writing platform — Jethro Arciaga

**Plan author:** Claude Opus · **Executor:** a separate coding agent · **Owner/reviewer:** Jethro Arciaga

Two phases. **Phase 1 ships a live site in days.** Phase 2 turns it into a full-stack app with a real CMS. Phase 1 is deployed to Vercel from the start specifically so Phase 2 needs no migration.

---

## Handoff — read first

This document is the specification. It lives at `docs/PLAN.md` inside the repo so the executing agent can read it, and so it is version-controlled next to the code it describes.

**Working directory:** `/Users/jethro/Desktop/portfolio` (currently empty — this is a greenfield build).

**Start at Milestone 1.** Work in order. Stop at every 🔍 checkpoint and wait for Jethro before continuing — those are review gates, not suggestions.

**If reality contradicts this plan**, reality wins: flag it and ask. A stale instruction is not a reason to build the wrong thing. But do not silently substitute your own judgment on the design system or the Source Material — those are fixed by decisions already made, and are recorded in the Decisions table with reasoning.

---

## Context

Jethro is a Python data engineer, five years in (Aug 2021 →). He is **between contracts as of early Aug 2026** and actively job hunting for remote / visa-sponsored Data Engineer and AI/LLM Engineer roles. A shareable URL has immediate value, which is why Phase 1 ships before Phase 2 starts.

Three goals sit on top of the artifact:

1. **Technical credibility through writing** — audience is peers, not keyword-scanning recruiters.
2. **Reps and confidence in frontend**, toward a longer-term full-stack goal.
3. **A low-friction way to publish** — a running log of what he's learning and finding. This is what Phase 2 exists for, and it's the goal that matters most long-term: a site with posting momentum beats a polished site frozen at launch week.

This plan is executed by a coding agent with Jethro reviewing. That carries one real risk: **rubber-stamping teaches nothing.** The 🔍 checkpoints are where learning happens.

**Two findings from the CV that reset earlier assumptions:**

- **Jethro is not a frontend beginner.** He holds a **Meta Front-End Developer certificate** (Aug 2024 — nine courses including Advanced React, UX/UI design principles, HTML/CSS in depth) and a **College Degree in Multimedia Arts**, a formal design education. Add `jetsight/frontend` (Next.js + TS + Tailwind, in progress), several React repos, and paid full-stack freelance work. His self-described "weak at frontend, struggling with design" is a **confidence and reps gap, not a knowledge gap.** Do not pitch explanations at beginner level.
- **The strongest positioning is AI-native data engineering.** GovConnex has him on Claude-based classification, MCP servers, and — the differentiator — **Promptfoo for systematic prompt benchmarking and regression testing**. Most engineers bolt an LLM on and never measure it. Lead with evaluation rigor.

The decisive content asset: `jetarciaga/jetsight`'s README is already portfolio-grade writing. Its "Real bugs found building this" section documents four genuine infrastructure failures with root causes. Phase 1 is largely about giving that writing a home.

---

## Guardrails for the executing agent

1. **Never invent biographical facts.** Source Material below is the complete authoritative record. **Invent no numbers** — no "processed 10M records", no "cut latency 40%". The CV contains no quantified metrics, so neither does the site. Anything needed but unavailable ships as the literal string `TODO(jethro):`.
2. **Never publish the phone number.** It's on the CV; it must not reach the site, metadata, or structured data. Email and LinkedIn only.
3. **Do not redesign.** The Design System block is the design. No gradients, glassmorphism, animated blobs, particle fields, tilt-on-hover cards, or a "Let's build something amazing together" hero.
4. **No arbitrary Tailwind values** (`text-[17px]`, `mt-[13px]`). If a value isn't on the scale, either the scale or the design is wrong — raise it.
5. **Verify versions at install time.** Do not trust version numbers from memory, including your own.
6. **Prose is Jethro's voice.** When adapting the JetSight README, preserve its specificity and hedges. Do not smooth it into generic tech-blog register.
7. **Do not start Phase 2 until Phase 1 is live and reviewed.**
8. **Stop and ask** rather than guessing on anything materially ambiguous.

---

## Source material (authoritative — from CV, verified Aug 2026)

**Identity.** Jethro Arciaga · Muntinlupa, Metro Manila, Philippines · `jet.arciaga@gmail.com` · `linkedin.com/in/jethroarciaga` · `github.com/jetarciaga` · **phone excluded — do not publish.**

**Positioning line** (adapt, don't copy): Python and data engineer building scalable pipelines, automated scraping and extraction systems, and AWS integrations — specialising in AI-native workflows: LLM classification, structured extraction, and systematic prompt evaluation.

**Availability — confirmed, include it.** Jethro is open to remote and visa-sponsored roles, and wants this stated on the site.

- Wording: factual and brief, e.g. *"Open to remote and visa-sponsored roles."* Being explicit about sponsorship is useful signal — it filters out companies that can't sponsor before either side wastes time.
- **Tone:** confident, not pleading. No "Hire me!", no exclamation marks, no pulsing green dot, no full-width banner. A quiet line under the hero and a mention in Contact.
- Pair it with his location (Muntinlupa, Philippines) so timezone is obvious without a reader hunting for it.
- **Implement as a single flag in a site-config module** (e.g. `SITE.availability`), rendered conditionally. Once he's hired, removing it is a one-line change rather than a hunt through components. He will need this — plan for it now.

| Employer | Role | Dates | Substance |
|---|---|---|---|
| **GovConnex** | Python Developer / Data Engineer | 19 Aug 2025 — **early Aug 2026 (ended)** | High-throughput AI-driven extraction and ingestion on an in-house orchestration platform. PDF mining of unstructured text and tabular layouts; "Live-Transcript" low-latency streaming pipeline ingesting live broadcasts with concurrent closed-caption capture; "Instant-Transcript" on-demand URL-driven video extraction; async email pipeline using Claude for payload extraction and classification; **Promptfoo** for prompt benchmarking and regression prevention; MCP servers + Copilot for delivery velocity. *AWS, Python, TypeScript, Node.js, Scrapy, Pytest, Datadog, CI/CD.* |
| **CreativeJourneysPH** | Full Stack Developer (freelance) | 2025 | Built and maintains `creativejourneysph.com`. *React, Python/Django, Vercel, Google Cloud, SquareSpace, AWS EC2, GitHub Actions, Pytest, TDD.* |
| **Penbrothers** | Python Developer / Data Engineer | 4 Dec 2023 — Aug 2025 | ETL pipelines for OpenArchitects; secure client-data integration via API and Selenium; transform to spec, land in Azure Blob Storage. *Azure Blob, Selenium, BeautifulSoup, Slack, Postman, Rundeck, Docker, GitHub Actions, Pytest, TDD.* |
| **Indra Philippines** | Python Developer / Analyst | 2 Aug 2021 — 22 Sep 2023 | Backend for the client's award-winning `peccbm.ph`: AWS Lambda, APIs, Cognito permissions, **Neo4j graph database**, EventBridge report scheduling, S3. *Lambda, API Gateway, Cognito, S3, EC2, Boto3, Serverless, Neo4j, SharePoint, BitBucket.* |

**Credentials.** Meta Front-End Developer (Aug 2024, `60RHLRGXGXF9`) · Google IT Automation with Python (Dec 2020, `CPX753NHKXCW`) · Google AI Essentials (Sept 2024, `W4ZATUI7B3D5`) · AWS Cloud Practitioner Essentials (Apr 2024) · Web Application Technologies and Django (Jan 2021).

**Education.** BS Information Technology, Manila · College Degree in Multimedia Arts, Manila.

**NDA note:** Jethro initially described his work as mostly NDA'd, but `creativejourneysph.com` and `peccbm.ph` are **public, shipped, linkable** products — feature and link them. GovConnex and Penbrothers internals stay at capability level; the system names ("Live-Transcript", "Instant-Transcript") are already on his own CV so naming them is fine. Client data, architecture internals, and volumes are not.

---

## Assets

**Photo** — `/Users/jethro/Desktop/jetShanghai.jpg`, 2048×2048, 846KB. Environmental portrait in a park with autumn ginkgo; warm gold dominates.

- Copy into the repo; **never reference the Desktop path.**
- On Vercel, `next/image` handles resizing and format conversion — pass the source and set `sizes` correctly. No manual pre-optimization needed (this is a direct benefit of dropping static export).
- Mid-distance shot, so the face is small. Crop to upper body rather than using the full frame at small sizes. **Do not** crop to a tight circular avatar — insufficient face resolution.
- Explicit `width`/`height` to prevent layout shift; real alt text.
- The photo's warm palette is why the accent is amber. See Design System.

---

## Decisions (reversible — flag to change)

| Decision | Choice | Why |
|---|---|---|
| Hosting | **Vercel from day one** | Phase 2 needs a server. Starting here avoids a migration later, and removes every static-export constraint now. |
| Repo | `jetarciaga/portfolio`, public | The `jetarciaga.github.io` name only mattered for Pages. |
| Rendering | Normal Next.js build — **no `output: 'export'`** | Enables `next/image`, and Phase 2 server code drops in without restructuring. |
| Page structure | Single-page smooth scroll `/`, real routes for posts | Jethro asked for a one-pager, but long posts with code blocks need their own linkable, indexable URLs. |
| Styling | Tailwind (evaluated against CSS Modules, confirmed) | Matches `jetsight/frontend`; its scales enforce token discipline automatically. |
| Phase 2 backend | Next.js server-side, same repo | One repo, one deploy, no CORS. Keeps the learning on frontend and integration. |
| Phase 2 database | Supabase Postgres | Jethro already knows it from JetSight, including the pooler and RLS gotchas. |

---

## Design system

**This block is the entire visual design.** Define once in `app/globals.css` as CSS custom properties; map the Tailwind theme onto those tokens. Every component references tokens — no raw hex, no arbitrary values.

*(Teaching note: this is the real answer to design paralysis. Decide once, and every later choice becomes "which token" instead of "what looks good." Restyling the whole site later means editing this one block.)*

```
Type       Inter (UI + body), JetBrains Mono (code, metadata, tags)
           via next/font — self-hosted at build, no external requests

Scale      xs 0.8125rem · sm 0.9375rem · base 1.0625rem · lg 1.25rem
           xl 1.5625rem · 2xl 1.953rem · 3xl 2.441rem
           (1.25 ratio; body 17px — deliberately large, this is a reading site)

Leading    body 1.7 · headings 1.2
Measure    prose max-width 68ch — never full-bleed text

Light      bg #FAFAF9   surface #FFFFFF  text #1C1917
           muted #57534E  border #E7E5E4  accent #B45309
Dark       bg #1C1917   surface #292524  text #FAFAF9
           muted #A8A29E  border #44403C  accent #FBBF24

Spacing    Tailwind default 4px scale
Radius     6px, uniform
Shadows    none — separation via borders and space
Motion     150ms ease-out on hover/focus only
```

Warm neutrals (stone, not slate), single amber accent, **no second accent color.**

**Why amber (decided).** The accent is pulled out of the hero photo's gold so the page reads as one composition. Teal was considered and rejected — it sits near the complement of that gold and would compete with the photo.

Amber's risk is drifting toward "warning banner." Confine it to links, active nav state, and one primary action per section. **Body text is never amber.** Contrast (approximate — verify with a tool): `#B45309` on `#FAFAF9` ≈ 4.9:1, passes with little headroom so **do not lighten it**; `#FBBF24` on `#1C1917` ≈ 10.5:1, comfortable.

**Dark mode** defaults to system preference: light on `:root`, overrides under `@media (prefers-color-scheme: dark)`. Verify both themes at every checkpoint — half-done dark mode is worse than none.

**Motion:** CSS `scroll-behavior: smooth` plus `scroll-margin-top` on anchors to clear the sticky nav. Scroll reveals are permitted but subtle — opacity and a few pixels of translate, nothing staggered or bouncy. **All motion respects `prefers-reduced-motion: reduce`.**

**Accessibility is a requirement, not polish:** visible focus rings everywhere, semantic landmarks, alt text, 4.5:1 minimum in both themes, verified with a tool rather than by eye.

---

# Phase 1 — the site

**Goal: live and shareable within days.** Posts are MDX files in the repo; publishing is a git push.

## Stack

Next.js App Router · TypeScript · Tailwind + `@tailwindcss/typography` · MDX via `next-mdx-remote/rsc` + `gray-matter` · `rehype-pretty-code` (Shiki, build-time highlighting, zero client JS) · deployed by Vercel's git integration.

## Structure

```
app/
  layout.tsx              fonts, tokens, metadata, skip-link
  page.tsx                scroll page: hero → about → work → writing → contact
  writing/page.tsx        post index
  writing/[slug]/page.tsx post
  work/[slug]/page.tsx    case study
  feed.xml/route.ts       RSS
components/
  Nav.tsx (sticky, scroll-spy)  Section.tsx  PostCard.tsx
  ProseLayout.tsx  ThemeToggle.tsx
content/posts/*.mdx   content/work/*.mdx
lib/content.ts          ONE typed loader, parameterized by collection
```

`lib/content.ts` is the piece worth designing carefully: a single loader feeding `generateStaticParams`, both index views, and RSS. **Do not write parallel loaders for posts and work** — Phase 2 replaces this module's internals with database queries, so a clean interface here pays off directly.

Frontmatter: `title`, `date`, `summary`, `tags`, `draft`. Filter `draft: true` from listings **and** `generateStaticParams`.

## Milestones

**1 — Scaffold.** Next.js + TS + Tailwind in `/Users/jethro/Desktop/portfolio`. Set `metadataBase`. `git init`, push to `jetarciaga/portfolio`, connect Vercel.
*Accepts:* `npm run build` clean; Vercel preview deploy succeeds.

**2 — Design system.** Tokens in `globals.css`, fonts via `next/font`, Tailwind theme mapped to tokens, both themes wired.
*Accepts:* a scratch page renders the full type scale and palette in both themes; all pairs pass 4.5:1.
🔍 **Checkpoint — Jethro reviews the look before anything is built on it.** Cheapest possible point to change direction.

**3 — Shell.** Root layout, sticky `Nav` with scroll-spy, `Section` wrapper, footer, skip-link.
*Accepts:* nav clicks smooth-scroll to the right offset with the sticky bar clearing the heading; active item tracks scroll; keyboard tab order sane with visible focus.

**4 — Home sections.** Hero (photo, name, positioning line, links), About, Work, Writing, Contact.
*Accepts:* no layout break 320px → 2560px; no horizontal scroll at any width.
🔍 **Checkpoint — review on a real phone, not a resized window.**

**5 — Content pipeline.** `lib/content.ts`, MDX rendering, `rehype-pretty-code`, prose layout, `/writing` index.
*Accepts:* fixture post renders with highlighted Python and SQL; long lines scroll inside the code block rather than widening the page; drafts unreachable.

**6 — Real content.** See below.
*Accepts:* every post has title/date/summary/tags; no lorem ipsum; no stray `TODO(jethro):`.

**7 — Launch.** Ship on the free `*.vercel.app` URL — custom domain is deliberately deferred. RSS, `sitemap.ts`, `robots.ts`, OG tags, 404 page.
*Accepts:* live, `/feed.xml` parses, OG preview renders, availability line visible and driven by the config flag.

## Launch content

Adapt from the JetSight README — existing writing, not new invention.

1. **"Four ways connection pooling broke my data pipeline"** — the flagship. IPv6-only Supabase host diagnosed via `dig` (AAAA, no A record); `prepare_threshold=None` because psycopg auto-promotes repeated queries to server-side prepared statements that break under PgBouncer transaction mode; `executemany`'s libpq pipeline mode, ruled in by `SSL SYSCALL error: EOF detected` on a freshly-opened connection; and the unescaped `@` in a generated password that ended URL-based connection strings entirely. Uncommon material — lead with it.
2. **"Why Claude Haiku, not a bigger model"** — cheapest model clearing the accuracy bar; under $1 per 100–150 posting run.
3. **"Direct Postgres over the BaaS SDK"** — extending the same pooling and schema knowledge into a second runtime as a coherence argument.
4. **"What I deliberately didn't build"** — Gall's Law staging; dropping semantic search because Claude has no embeddings endpoint and it meant a second paid vendor for a non-load-bearing feature.
5. *(optional)* **"Testing against real messy data"** — fixtures from real fetched data, not synthetic.

**Work section** — four entries, leading with the AI-native angle:

1. **JetSight** (flagship, own case study page) — architecture, the RLS finding, roadmap reasoning. Link the repo; add the live dashboard when it ships.
2. **AI-native extraction at scale** (GovConnex) — PDF/video/email pipelines, and specifically **evaluating** LLM behavior with Promptfoo rather than trusting it. Give it the most room. Capability level only.
3. **CreativeJourneysPH** — public, shipped, linkable. Full-stack React + Django. Useful evidence against "backend only."
4. **peccbm.ph** (Indra) — award-winning public app; Lambda, Cognito, **Neo4j**, EventBridge. Graph-database work is differentiating; most DE resumes are relational-only.

Supporting repos: `penbrothers-automation`, `csv-diff-tool`, `travel-scraper`.

---

# Phase 2 — the CMS

**Do not start until Phase 1 is live and reviewed.** This is the full-stack learning project: write and publish posts from a browser instead of committing files.

## What gets built

**Data.** Supabase Postgres, `posts` table: `id`, `slug` (unique), `title`, `summary`, `body_md`, `tags[]`, `status` (`draft` | `published`), `published_at`, `created_at`, `updated_at`.

Reuse the JetSight lessons — transaction pooler, and **RLS enabled with explicit policies**: anonymous reads limited to `status = 'published'`, writes restricted to the authenticated admin. This time RLS is genuinely load-bearing rather than a Security Advisor warning.

**Auth.** Auth.js with the GitHub provider, allowlisted to Jethro's GitHub user ID. Middleware protects `/admin/*`.
**Do not hand-roll password auth.** An admin panel is a public login page granting write access to his professional identity. OAuth means no stored credential and no password reset flow to get wrong.

**Admin UI.** `/admin` (list with status filter), `/admin/new`, `/admin/[id]/edit`.

**Authoring model — confirmed:** Jethro writes Markdown *syntax*, but no longer creates Markdown *files*. The body is stored in the `body_md` column. Portability is deliberate: content can be exported back to `.mdx` at any time, so there is no lock-in.

**Editor — split pane, Markdown left, live preview right.** Requirements:

- Preview **must** reuse the public site's render pipeline — same MDX/`rehype-pretty-code` path. Never a second, approximate renderer, or preview will drift from published output.
- Debounce preview rendering (~200ms) so typing stays responsive on long posts.
- **Split panes do not work below ~768px.** On mobile, collapse to a single pane with a Write/Preview toggle. Test on a real phone — writing from a phone is a main reason the CMS exists.
- Autosave drafts on an interval, plus warn on navigating away with unsaved changes. Losing a post to a closed tab would sour the whole feature.
- Monospace font in the editor pane, and preserve tab characters — posts are code-heavy.
- Slug auto-generated from the title, manually overridable. **Once published, changing a slug breaks the live URL** — warn, and prefer keeping the original.
- Image upload via drag-and-drop to Supabase Storage or Vercel Blob, inserting the Markdown link at the cursor.

**Rendering.** `lib/content.ts` swaps its internals from filesystem reads to database queries — the interface built in Phase 1 stays. Public post pages stay statically generated, with `revalidatePath` called on publish so new posts appear immediately without a full redeploy.

**Migration.** A one-off script moving the Phase 1 MDX files into the database. Parse frontmatter, map to columns, insert. Straightforward ETL — familiar territory.

## Milestones

**8 — Database and auth.** Schema, RLS policies, Auth.js + GitHub OAuth, protected middleware.
*Accepts:* signed out, `/admin` redirects; signed in as a non-allowlisted GitHub account, access is **denied** — test this explicitly, do not assume.

**9 — CRUD.** Create, edit, delete, draft/publish. Server actions with validation.
*Accepts:* a post created in `/admin` appears on `/writing` after publish and disappears when reverted to draft.

**10 — Editor.** Split-pane Markdown + live preview, image upload, slug handling, autosave.
*Accepts:* preview output is byte-identical to published output for a post containing headings, code blocks and images; the pane collapses to a Write/Preview toggle on a real phone; killing the browser tab mid-draft loses no work.

**11 — Migrate and cut over.** Move MDX into the DB; DB becomes the source of truth.
*Accepts:* every Phase 1 post renders identically from the database; **all existing URLs unchanged** — no broken links, no lost SEO.
🔍 **Checkpoint — full review before cutover.**

## Security checklist (Phase 2 — verify each explicitly)

- Service-role key server-side only; **never** in a client component or `NEXT_PUBLIC_` var
- RLS on, with policies tested from an anonymous client — not merely enabled
- Auth allowlist verified by attempting login with a different GitHub account
- Markdown sanitized on render; do not `dangerouslySetInnerHTML` raw HTML
- Uploads: validate type and size, cap dimensions
- Server actions validate input; never trust a client-supplied `status` or `id`
- No secrets in the repo; env vars set in Vercel

---

## Verification

1. `npm run build` clean, then test the built output — not just `npm run dev`.
2. Every route walked; console clean.
3. Widths 320 / 375 / 768 / 1440 / 2560 — no horizontal scroll anywhere.
4. Keyboard-only pass: tab through everything, visible focus, working skip-link.
5. Both themes; contrast verified with a tool.
6. `grep -r "TODO(jethro)"` returns nothing before sharing.
7. Lighthouse ≥95 Performance / Accessibility / SEO. A static text site clears this easily; lower means something is wrong.
8. Post-deploy: live URL, `/feed.xml` parses, OG preview renders.
9. Phase 2 only: the full security checklist above.

---

## Review checkpoints — the learning part

Calibration: Jethro holds a Meta Front-End Developer certificate and a Multimedia Arts degree. **Do not explain React, CSS, or design fundamentals.** He knows this material and is out of practice, not uninformed. Explain *why this decision here* — trade-offs and rejected alternatives — not what a flex container is.

At 🔍 stops, review against specifics rather than vibes:

- **Spacing rhythm** — consistent between sections? Is related content closer together than unrelated content?
- **Hierarchy** — squint at it. Does the most important thing still dominate?
- **Measure** — any text lines over ~70 characters? The most common readability failure.
- **Alignment** — do elements share edges, or is everything slightly off?
- **375px** — does it hold up on a real phone?
- **Focus states** — tab through. Can you always see where you are?

Ask the agent *why* for anything that looks off. "Why is this section 96px from the last one?" yields either a principled answer or a bug. Both are worth knowing.

---

## Open items

**Nothing is blocking execution.** All decisions are settled: CV and photo received; accent amber; Tailwind; Vercel hosting; CMS deferred to Phase 2 with the backend in Next.js; split-pane Markdown editor; availability line included behind a config flag.

**Assumed unless Jethro says otherwise:** contact is `mailto:` plus LinkedIn — no form, since one would need a third-party service and attract spam.

**Deferred to the future, no rework needed when they happen:**
- **Custom domain** — launch on the free `*.vercel.app` URL. Adding a domain later is a DNS change plus a Vercel setting; nothing in the codebase changes. Only caveat: do it before the URL is on many résumés, since moving later costs SEO and breaks shared links.
- Analytics — prefer a privacy-respecting option if ever added.

**Out of scope:** updating the CV PDF itself. The site carries the corrected GovConnex end date.
