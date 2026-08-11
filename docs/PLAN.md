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
9. **Load the page and check the browser console before reporting any milestone complete.** Milestone 3 was reported done with a fatal `IntersectionObserver` error firing on every page load — a build that compiles is not a page that works.
10. **Commit at the end of every milestone and every approved checkpoint, with a real descriptive message — not just at scaffold time. `git commit` is not the finish line, `git push` is.** Milestone 1's `git init` + push was a one-time setup step, never an ongoing instruction, and this plan never established one until now: as of the Milestone 4 checkpoint approval, the repo still has only its original `create-next-app` commit — every one of Milestones 2 through 4b exists solely as uncommitted working-tree changes, with no rollback point anywhere in that work. **This has already recurred once even after being fixed:** the Milestone 7 commit ("Ship launch metadata and feeds") was made locally and correctly, but never pushed — Vercel only builds from what's actually on GitHub, so the live site kept serving the Milestone 5 build, silently one milestone behind, until this was caught during verification and pushed manually. Reporting a milestone "done" requires confirming `git status` shows a clean tree **and** the local branch is not ahead of `origin/<branch>` — check both, not just that a commit exists.

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

**Education (corrected — "Manila" was a placeholder, real institution names now confirmed).** BS Information Technology, **Pamantasan ng Lungsod ng Muntinlupa** · College Degree in Multimedia Arts, **CIIT College of Arts and Technology**. Already rendered live on the site at `app/page.tsx` lines ~330-334 (`<li>BS Information Technology · Manila</li>` / `<li>College Degree in Multimedia Arts · Manila</li>`) — update both to the real institution names, same `· ` separator format.

**NDA note:** Jethro initially described his work as mostly NDA'd, but `creativejourneysph.com` and `peccbm.ph` are **public, shipped, linkable** products — feature and link them. GovConnex and Penbrothers internals stay at capability level; the system names ("Live-Transcript", "Instant-Transcript") are already on his own CV so naming them is fine. Client data, architecture internals, and volumes are not.

---

## Assets

**Photo** — `/Users/jethro/Desktop/jetShanghai.jpg`, 2048×2048, 846KB. Environmental portrait in a park with autumn ginkgo; warm gold dominates.

- Copy into the repo; **never reference the Desktop path.**
- On Vercel, `next/image` handles resizing and format conversion — pass the source and set `sizes` correctly. No manual pre-optimization needed (this is a direct benefit of dropping static export).
- Used as a **full-bleed hero background** (see Hero Treatment below), not a small avatar or side card. **Do not** crop to a tight circular avatar — insufficient face resolution.
- Explicit `width`/`height` to prevent layout shift; real alt text.
- The photo's warm palette is why the accent is amber. See Design System.

---

## Hero treatment — decided (photo as background + composited motion)

**Requested by Jethro**, evaluated, and confirmed. Two parts.

**1 — Layout.** The photo becomes a full-bleed hero background, not a side-by-side card. `next/image` with `fill`, a dark gradient scrim between the photo and the text (strongest at the text zone, fading elsewhere), copy positioned on top.

- **Round 4 correction — `object-position` alone cannot solve this crop; the technique itself was wrong, not just the value.** Verified live (rendered `getBoundingClientRect` + direct A/B screenshots at `0%`, `8%`, `40%` — all visually identical): the source photo is a perfect square, and the hero is much wider than tall, so `object-fit: cover` scales the image to exactly match container **width** with zero horizontal pixels left to crop. `object-position`'s X value has **no visible effect** at this aspect ratio — three rounds of "lower the X value" were tuning a knob connected to nothing. Stop adjusting `object-position` X for this photo.
- **The fix that actually works: add real zoom via `transform: scale()`, then pan with `transform-origin`.** This creates genuine crop room where none existed. Apply this on `.hero-background` alongside the existing `object-fit: cover`.
- **Desktop (`≥1024px`) is now finalized by Jethro's own hand — locked, do not adjust further without explicit request:**
  ```css
  .hero-background {
    object-position: 8% 50%;
    transform: scale(1.15);
    transform-origin: left center;
  }
  ```
  This lives in `app/globals.css` inside `@media (min-width: 1024px)`. Treat it as done. If a later change (copy panel width, breakpoint restructuring) causes the crop to regress, flag it rather than silently re-tuning these numbers.
- Re-derive scale/origin **independently for the remaining breakpoints** (`<640px` and `640–1023px` still lack any `transform`) — each has a different box aspect ratio, so the desktop values will not carry across. Same method: try a value, screenshot, adjust.
- **Why previous rounds appeared to work at all:** the copy panel's max-width changed in the same passes as the object-position tweaks, which shifted how much of the (unmoving) image was covered by the panel — that's what read as progress, not the object-position changes themselves.
- **Contrast is the hard constraint.** The photo is bright gold ginkgo behind dark text/light text depending on theme — verify AA against the *busiest* region of the image behind the text, not an average sample. If the scrim alone can't guarantee it reliably, add a solid, near-opaque text-zone panel rather than trusting gradient math to hold at every viewport.
- No JS required for this part — pure CSS, degrades safely.

**2 — Motion.** Composited overlays on top of the static photo, evaluated against real image-to-video generation and chosen instead — this is simulated, not real, motion; the water and mist and leaves in the photo do not move, elements are layered in front of them. Three effects:

- **Falling leaves** — small SVG/CSS sprites drifting down and swaying, looping, respawning off-screen top.
- **Rising mist** — see Round 3 fix below; supersedes the original "panning" description.
- ~~Water ripples~~ — **removed in Round 5, see below.** Restyling was attempted (soften the stroke, warm the color, blur the edge) but it still read as sonar/radar to Jethro and was distracting. Cut rather than iterate further.
- **Water sparkle** — see Round 3 fix below; supersedes the original generic description.
- **Cursor fog trail** — new in Round 5, see below. First JS-driven effect in the hero; everything else here is pure CSS.

**Legibility is a hard requirement, not just "technically animating."** First pass wired mist and water shimmer with real, correctly-applied CSS animations that were nonetheless imperceptible — mist panned so slowly (56s full cycle) a glance wouldn't register it, and a drifting gradient doesn't visually read as "ripples" no matter how it moves. **Motion must be recognizable within 2–3 seconds of looking at the hero, without staring for it.** This was a spec-tuning gap, not an execution error — the fix is retuning duration/amplitude and, for water, changing the technique itself (concentric fading rings, not a panning gradient) rather than just nudging existing numbers.

**Round 3 fixes** — round 2 made mist/water genuinely animate (real keyframes, correctly wired), but three things are still wrong, diagnosed from the actual CSS, not guessed:

- **Mist axis is wrong.** `hero-mist-pan` currently sweeps mostly horizontally — `translate3d(-22%,-8%,0) → translate3d(220%,14%,0)` — positioned in the frame's vertical middle (`top: 45%`). Jethro wants smoke, not a drifting cloud: **rise bottom→top and fade out**, not sweep sideways. Rework as a primarily-vertical `translateY` (downward start, rising up and off) combined with an opacity arc — fade in low, fade out as it nears the top, mirroring `hero-water-ripple`'s existing opacity-arc pattern rather than a flat `.5` throughout. A single large shape resetting after one rise reads as an obvious loop; consider 2–3 smaller staggered wisps (same multi-instance-with-staggered-delay pattern already used for leaves, ripples, and sparkles) so it reads as continuous.
- **Ripple reads as radar, not water — this is a styling problem, not a geometry problem.** The current `.hero-ripple` is `border: 1px solid rgb(250 250 249 / 0.34); border-radius: 50%` — a crisp, pure-white, hard-edged stroked circle. That combination (thin uniform stroke, stark white, sharp edge, positioned at `left: 48%, top: 56%`, near dead-center of the whole hero) is exactly what reads as a sonar sweep. The expanding-and-fading *animation* (`hero-water-ripple` keyframes) is correct and should stay; replace the *rendering*: drop the hard `border`, build the ring from a blurred radial-gradient band or a `box-shadow`-based glow instead of a stroke, warm the color (blend toward the amber/gold already established, not stark white), and add `filter: blur()` so the edge is soft rather than drafting-tool crisp. Also re-anchor the ripple origin (and the sparkle cluster) to wherever the water is **actually visible** in the current object-position crop at each breakpoint — verify this by screenshot rather than assuming the `48%/56%` coordinates already line up with real water, since object-position has changed twice since those numbers were set and they were never re-checked against it.
- **Sparkle should be a sun-glitter glint, not a flat accent-colored icon.** Jethro supplied a reference photo: real sun-on-water glitter reads as small, sharp, four/eight-point star flares with a **bright warm-white core and a soft glow halo**, loosely clustered in an irregular band (not evenly spaced single dots), varying in size. Current `.hero-sparkle` is a flat `var(--hero-accent)` (solid amber) icon with no glow — too flat and too uniform to read as a glint. Keep the existing multi-instance staggered-SVG structure (`.hero-sparkle--one` etc. — this part is right), but: shift color toward a warm near-white core (e.g. `--site-bg`-family light tone or literal near-white) with the amber worked in only as a `filter: drop-shadow(0 0 Npx var(--hero-accent))` glow behind it, not as the fill; loosen the spacing so sparkles cluster irregularly rather than sitting at evenly-plotted coordinates; vary size per instance more than currently. Align the cluster with the ripple region so sparkle and ripple read as the same patch of water, same reason as above.

**Round 5 changes** — decided directly by Jethro, not up for re-litigation:

- **Remove the ripple effect entirely.** It was restyled per the Round 3 diagnosis (soft blur, warmer color) and still read as sonar — Jethro's words: "distracting." Delete completely, both sides:
  - `app/page.tsx` — the `<div className="hero-water-ripples">` wrapper and its four `<span className="hero-ripple hero-ripple--N" />` children (currently around lines 70–74).
  - `app/globals.css` — the `.hero-ripple` rule, its four `.hero-ripple--one` through `--four` variants, and the `@keyframes hero-water-ripple` block.
  - **Careful:** `.hero-water-ripples` currently shares a combined selector with `.hero-water-sparkles` (`.hero-water-ripples, .hero-water-sparkles { right:0; bottom:0; left:0; height:44%; overflow:hidden; }`). Remove `.hero-water-ripples` from that selector list — don't delete the whole rule, sparkle still needs those base positioning properties.
- **Add a cursor fog trail** — subtle, soft smoke/fog that follows the mouse as it moves across the hero. This is a genuinely different technique from everything else here: leaves/mist/sparkle are all pure CSS loops with no JS; a cursor trail *requires* JavaScript, since CSS alone cannot read live pointer position. Flagging this plainly rather than quietly changing the "no new dependencies, pure CSS" constraint.

  **Approach** — a client component (`"use client"`) reusing the project's existing composited-sprite pattern rather than inventing a second technique or reaching for canvas: a small pool of puff elements (5–8), each repositioned to trail recent cursor coordinates and faded via CSS opacity/scale, visually consistent with `.hero-mist` (soft, blurred, low-opacity) rather than a new look.

  **Hard requirements:**
  - Throttle position updates via `requestAnimationFrame` — raw `pointermove` fires far more often than needed and will visibly jank without this.
  - `pointer-events: none` on every trail element, no exceptions — this must never intercept clicks on the copy panel's buttons/links underneath.
  - Must go fully inert under `prefers-reduced-motion: reduce`, same as every other hero effect — either don't attach the listener at all, or attach it and no-op, either is fine as long as reduced-motion users see nothing.
  - Pointer/mouse only — no special handling needed for touch (it won't fire), but don't spend effort trying to fake it there.
  - Confine the effect to the photo area of the hero, not the full section — a trail crossing over the text panel while someone is trying to read is a plausible distraction; worth checking at the review checkpoint rather than assuming either way.

**Round 6 — pinned hero background.** Currently the whole `.hero` section (photo + scrim + motion layer + copy panel) scrolls away together as one unit. Jethro wants the **photo (with its scrim and motion layer) to stay fixed in the viewport** while the hero's own text scrolls up and off normally, and the next section's opaque background then scrolls up and progressively covers the fixed photo — the classic pinned-hero-background pattern.

**Technique — `position: fixed`, not `background-attachment: fixed`.** Two ways to build this; only one is right here:
- `background-attachment: fixed` only works on a CSS `background-image`, not an `<img>` — it would mean abandoning `next/image` for the hero photo (losing the automatic responsive sizing/format conversion that was a specific reason for leaving static export). It's also known to be janky or outright ignored on mobile Safari.
- **Use `position: fixed`** on the background+scrim+motion layer instead, `next/image` stays intact. This is the correct choice — smaller trade-off, works with what's already built.

**Implementation notes:**
- Keep the hero **section** itself at normal `min-h-screen` in document flow (so nav scroll-spy offsets and anchor positions don't shift) — only the photo/scrim/motion layer becomes `position: fixed`, sitting at a low z-index behind the copy panel *and* behind all later sections' own content, so their opaque backgrounds naturally cover it once scrolled into view.
- **Watch for the `position: fixed` containing-block trap** — we've already hit several "this CSS doesn't do what it looks like" surprises in this hero, and this is a classic one: if any ancestor of the fixed layer has `transform`, `filter`, `perspective`, or `will-change: transform` set, that ancestor becomes the fixed element's containing block instead of the viewport, and it silently stops behaving as "fixed to the page." Check the motion-effect elements and `.hero`'s own `isolate` don't create this trap — `isolation: isolate` alone does *not* cause it, but verify nothing else in the stack does.
- **Respect `prefers-reduced-motion` here too**, consistent with everything else in this hero — content sliding over a static pinned background is a known vestibular-discomfort trigger for some users, not just true multi-speed parallax. Fall back to the current normal-scroll behavior (photo scrolls away with its section) under reduced motion.
- Verify at a real mobile breakpoint specifically, not just a resized desktop window — `position: fixed` interacting with mobile browser chrome (address bar show/hide) has historically been a rough edge worth checking directly rather than assuming.
- The existing crop values (`object-position`, `transform: scale`, `transform-origin` per breakpoint) must carry over unchanged — this is a positioning-scheme change, not a re-crop.

**Round 7 — the direct, foreseeable fallout of Round 6, now confirmed twice.** Once `.hero-background` became `position: fixed`, it became a *positioned* element — and under CSS stacking rules, positioned elements paint **above** plain static (non-positioned) content, regardless of z-index value or DOM order. Any plain element downstream of the hero with no explicit `position` and no opaque background will lose that fight and let the fixed photo show through it. This has now hit twice:

1. **About/Work/Writing/Contact backgrounds** — first attempt added `bg-bg` correctly to the shared `components/Section.tsx`, but then wrapped all four `<Section>`s in an outer `<div className="... mx-auto max-w-6xl px-4 ...">` in `app/page.tsx`. Because that wrapper constrains width, each section's background only covers the center content column — the side gutters on wide viewports still show the fixed photo bleeding through.
2. **Footer disappeared entirely** — `components/SiteFooter.tsx`'s root `<footer>` has no `position` and no background at all, so it loses the same stacking fight completely.

**The fix — mirror the pattern the hero itself already uses successfully: full-bleed background layer, inner `max-w-6xl` content constraint as a separate nested element.** Do not conflate the two into one element.

**Corrected approach (simpler than the first draft of this fix): the background lives on ONE shared wrapper, not on each individual section.** The stacking bug only requires *something* opaque and positioned between the fixed photo and the viewer — it doesn't need to be repeated four times. Section-level `bg-bg` was the first instinct but is redundant once the shared wrapper carries it correctly.

- `app/page.tsx` — the existing outer wrapper around the four `<Section>`s becomes the single background-bearing layer: full-width (drop `max-w-6xl` from it), keep `relative z-10 bg-bg`, keep the vertical padding (`py-20 sm:py-28`). Add a **new inner `<div className="mx-auto max-w-6xl px-4 sm:px-6">`** nested directly inside it, and move the four `<Section>`s inside *that* — this inner div only centers content width, it carries no background of its own.
- `components/Section.tsx` — remove `bg-bg` from the root `<section>` entirely; it's no longer needed once the parent wrapper is already opaque. Keep `relative z-10` or drop it too if the parent's stacking already covers it — either is harmless, but simpler is better here. Also revert the earlier "move max-w-6xl inward" change if it was already applied — that constraint now lives once, at the `page.tsx` wrapper level, not duplicated per-section.
- `components/SiteFooter.tsx`: add `relative z-10 bg-bg` to the root `<footer>`, alongside its existing `border-t border-border`. The footer is a separate element from the about-contact wrapper, so it still needs its own fix — this one can't be consolidated into the same shared wrapper. Its inner `mx-auto max-w-6xl px-4 ...` div is already correctly used for content centering — leave that as-is.
- **This is a standing risk, not a one-time fix** — anything added later below the hero (a new section, a modal, whatever) needs the same treatment: explicit `position` (even just `relative`) plus an explicit opaque background, or it will silently repeat this exact bug. `Nav.tsx` is the reference example already done right: `sticky` (a positioned value) + `bg-bg` + explicit `z-40`.
- Verify by screenshot at a **wide desktop width specifically** (this is where the side-gutter bleed-through is visible — a narrow/mobile screenshot could pass while the bug is still present) and confirm zero photo bleed-through from About through the footer, footer text/link fully legible.

**A third fallout of the same Round 6 change: `components/CursorFog.tsx`'s coordinate math broke.** Its puffs are positioned via `--fog-x`/`--fog-y`, computed in JS as `pointer.x - heroRect.left` / `pointer.y - heroRect.top` (`heroRect` from `.hero.getBoundingClientRect()`). That was correct when `.hero-motion` (the puffs' container) was positioned relative to `.hero`'s own box. Round 6 made `.hero-motion` `position: fixed`, so its coordinate origin is now the *viewport*, not `.hero`'s box — the subtraction is now wrong, offsetting every puff upward by roughly the sticky nav's height (`.hero`'s top edge sits below it, even at zero scroll). **Fix: delete the `heroRect` subtraction entirely** — use raw `event.clientX`/`event.clientY` directly for `--fog-x`/`--fog-y`, since the puffs' container is now already viewport-anchored. `heroRect`/`hero.getBoundingClientRect()` becomes dead code once this is removed. Mist/sparkles/leaves were unaffected by Round 6 because they use plain CSS percentage positioning, not JS-computed pixel coordinates — worth remembering if a *future* effect ever needs JS-computed positioning: it must be computed relative to the viewport now, not `.hero`.

**Round 8 — real-device mobile bug: horizontal overflow from the new tags feature, not a Round 6/7 recurrence.** Confirmed on Jethro's actual phone, then reproduced and diagnosed live at 400px width. Symptom looked identical to Round 7 (photo bleeding through on one side, persisting through Writing and the footer) but the cause is different — verified `Nav`, the About-Contact wrapper, and `SiteFooter` are all still correctly 400px wide, exactly per the Round 7 fix. The real culprit:

- **The featured Writing card is 529px wide in a 400px viewport** — its `<a>`, `<h3>`, `<p>`, and tags row all measure 529px. Root cause: CSS Grid items default to `min-width: auto`, meaning a grid item won't shrink below its own content's *intrinsic* width, even when something inside it (the tags row) correctly has `flex-wrap`. The featured card's row of 6 items (5 tags + the "Featured" badge) has an unwrapped natural width of ~529px; the grid item is held open to that width rather than shrinking to the actual single-column track width, even though the pills *do* visually wrap once rendered inside that oversized card.
- **This is newly introduced by the tags feature**, not a lingering Round 6/7 issue — the wrapper-width fix from Round 7 is confirmed still correct and doesn't need touching.
- **The visible "photo bleeding through" is a downstream symptom, not the bug itself.** Once *any* element causes real page-level horizontal overflow, a `position: fixed` layer (the hero photo) can desync from the rest of the page the moment the viewport scrolls sideways even slightly — trivial to trigger by accident on a touchscreen, essentially never on desktop with a mouse. This is why it wasn't caught until an actual phone was used.

**Fix:**
- Add `min-w-0` (Tailwind) to the Writing card's grid-item root (`<a>` wrapper) — both the featured and secondary card variants — so it's allowed to shrink to its actual grid column width instead of being held open by its tags row's intrinsic content width.
- **Audit for the same pattern elsewhere** — anywhere a grid or flex item contains wrapping content (the Work section's cards are the next most likely candidate, given similar card/grid structure) needs the same `min-w-0` treatment as a precaution, not just Writing.
- **Defense in depth, do regardless of the above:** add `overflow-x: hidden` to `html`/`body` in `app/globals.css`. This doesn't fix the root cause and isn't a substitute for the `min-w-0` fix, but caps the blast radius of the *next* similar overflow bug — without it, any future overflow will keep desyncing the fixed hero background exactly like this one did. ~~**Correction — see Round 9: applying this to `body` (not just `html`) broke the sticky nav. Only `html` should have it.**~~
- **Verify by reproducing the original repro, not just eyeballing it:** at 390-400px width, check `document.documentElement.scrollWidth` equals `window.innerWidth` (no overflow at all), not just that the visual gutter is gone — the gutter is a symptom, confirm the actual cause is resolved.

**Round 9 — two more real-device findings: sticky nav broken (a Round 8 regression), and hero text too large on mobile.**

**1. Sticky nav — caused by Round 8's own "defense in depth" fix, own mistake, corrected here.** Both `html` and `body` currently have `overflow-x: hidden` (`app/globals.css` lines ~100-110). Setting it on `body` specifically has a well-documented side effect: it forces the browser to compute `overflow-y: auto` on body too (CSS spec requires both axes resolve to non-`visible` once either is set to something other than `visible`), which promotes `<body>` into its own scroll container instead of the normal viewport/`<html>` scrolling. `position: sticky` descendants of a promoted scroll container like this can stop sticking — confirmed live: `header`'s computed `position` is still correctly `sticky`, but `header.getBoundingClientRect().top` scrolls straight past `0` instead of pinning, and `body`'s computed `overflow` reads `"hidden auto"` (proof of the promotion). Nav's own CSS (`sticky top-0 z-40 bg-bg`) was never the problem.

**Fix:** remove `overflow-x: hidden` from `body` — keep it on `html` only. `<html>` alone is sufficient to block horizontal scroll page-wide (this was redundant on both from the start), and leaving `body` as a normal, non-scrolling, `overflow: visible` element restores sticky's normal viewport-relative behavior. Verify by real scroll (mouse wheel or touch drag, not `window.scrollTo` — that call is unreliable once body has its own scrollTop, which is itself a symptom worth confirming is gone) at mobile width: nav should stay pinned to the top throughout.

**2. Hero name and summary too large on mobile.** Confirmed live at 390px width: `#home-heading` (`text-3xl`, 39px, no responsive downsize) renders at 526px wide — wider than the 390px viewport, so it either overflows or wraps awkwardly depending on exact rendering, matching Jethro's report that his name isn't fitting on one line. The summary paragraph (`.hero-positioning`, `text-lg`, 20px, also not responsive) reads oversized at this width too.

**Fix — apply smaller existing type-scale tokens at the base (mobile) breakpoint, scaling back up at `sm:`/larger, reusing the scale per Guardrail #4 rather than introducing new sizes:**
- `#home-heading`: `text-2xl` at base, `sm:text-3xl` (or `lg:text-3xl`, whichever breakpoint already governs the current desktop-tuned crop/copy-panel width) to restore the current size at larger widths.
- `.hero-positioning`: `text-base` at base, `sm:text-lg` to restore.
- These are starting points, not guaranteed-final numbers — verify "Jethro Arciaga" actually fits on one line at real mobile widths (375-414px, accounting for the copy panel's own padding) after the change, the same way every other hero sizing call in this plan has needed a real screenshot to confirm, not just a size on paper.

**Explicit, scoped exception to Guardrail #3.** The guardrail against gradients, animated blobs, and particle fields exists to stop the executing agent from freelancing decoration nobody asked for — it is not a ban on decoration Jethro explicitly requests. This hero is the **one deliberate exception**, confined to this one component. It does not license gradients, blobs, or particles anywhere else on the site; everywhere else, Guardrail #3 still applies at full strength.

**Current effect set, post-Round-5: falling leaves, rising mist, water sparkle, cursor fog trail.** (Ripple removed, not replaced.)

**Requirements:**
- Every effect **must** be inert under `prefers-reduced-motion: reduce` — the photo displays static with the scrim only. Same pattern already established for scroll motion and theme transitions; extend it here rather than treating it as a special case.
- Effects sit **behind** the text in z-index — never obscuring copy or buttons. For the cursor trail specifically, `pointer-events: none` is the actual safety guarantee (see Round 5) — z-index alone isn't sufficient for something that follows the mouse.
- No measurable Lighthouse Performance regression — this is the test, not a vibe check.
- **Leaves, mist, and sparkle stay pure CSS/SVG, no new dependencies** — the no-JS fallback for these three is the static photo with scrim, same principle as the theme toggle's CSS fallback. **The cursor trail is the one exception**, and requires JS by nature (see Round 5) — its own no-JS fallback is simply that it doesn't render; it does not affect the other three.

**Expect multiple review passes.** Unlike the token-driven parts of this build, "does this look convincing or does it look like a cheap overlay" is a judgment call only Jethro can make, and first-pass CSS particle effects often read as tacky before they read as atmospheric. Budget 2–3 iterations at the checkpoint below rather than expecting to approve on sight.

🔍 **New checkpoint — review the hero specifically, separate from the rest of Milestone 4.** Toggle `prefers-reduced-motion` in DevTools to confirm the effects actually stop, not just slow down.

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
                                          accent-hover #92400E
Dark       bg #1C1917   surface #292524  text #FAFAF9
           muted #A8A29E  border #44403C  accent #FBBF24
                                          accent-hover #F59E0B

Spacing    Tailwind default 4px scale
Radius     6px, uniform
Shadows    none — separation via borders and space
Motion     150ms ease-out on hover/focus only
```

Warm neutrals (stone, not slate), single amber accent, **no second accent color.**

**Why amber (decided).** The accent is pulled out of the hero photo's gold so the page reads as one composition. Teal was considered and rejected — it sits near the complement of that gold and would compete with the photo.

Amber's risk is drifting toward "warning banner." Confine it to links, active nav state, and one primary action per section. **Body text is never amber.** Contrast (approximate — verify with a tool): `#B45309` on `#FAFAF9` ≈ 4.9:1, passes with little headroom so **do not lighten it**; `#FBBF24` on `#1C1917` ≈ 10.5:1, comfortable.

**Hover states use the `accent-hover` token — never `opacity`.** Fading amber toward the canvas lightens it and drops contrast below AA (measured: ≈4.9:1 → ≈3.5:1 at `opacity-80` in light mode). Amber has no headroom, so hover moves *darker* in light mode and *brighter* in dark. This applies to every accent surface: buttons, links, active nav state.

**Dark mode — three states: light / dark / system, with a visible toggle.** Defaults to `system`; an explicit choice persists in `localStorage` and must beat the OS preference **in both directions**.

Implement with **`next-themes`** (decided — evaluated against hand-rolling): `attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`.

- `<html>` needs `suppressHydrationWarning` — the library mutates the attribute before React hydrates, and without this React logs a mismatch on every load.
- CSS must be written to work **with and without JS**, so the media query stays as a no-JS fallback:
  ```css
  :root { /* light tokens */ }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) { /* dark tokens */ }
  }
  :root[data-theme="dark"] { /* dark tokens */ }
  ```
  **Never** let a token's only definition live inside a media or attribute block.
- `color-scheme` must be set per state — it drives scrollbars and native form controls, and is a common miss.
- **Toggle component:** cycles light → dark → system. Needs a real `aria-label` reflecting current state (an icon alone is silent to a screen reader), and a `mounted` guard so the icon doesn't render a wrong-state flash before hydration. Lives in the sticky `Nav`.
- **No color transition on theme change.** A 150ms fade across every surface at once reads as a glitch, not polish. Icon transitions are fine.

The existing `.theme-preview--light` / `--dark` scoped classes on the Milestone 2 page are compatible and can stay while that page exists.

Verify both themes at every checkpoint — half-done dark mode is worse than none.

**Motion:** CSS `scroll-behavior: smooth` plus `scroll-margin-top` on anchors to clear the sticky nav. Scroll reveals are permitted but subtle — opacity and a few pixels of translate, nothing staggered or bouncy. **All motion respects `prefers-reduced-motion: reduce`.**

**Accessibility is a requirement, not polish:** visible focus rings everywhere, semantic landmarks, alt text, 4.5:1 minimum in both themes, verified with a tool rather than by eye.

---

# Phase 1 — the site

**Goal: live and shareable within days.** Posts are MDX files in the repo; publishing is a git push.

## Stack

Next.js App Router · TypeScript · Tailwind + `@tailwindcss/typography` · **`next-themes`** (theme toggle) · MDX via `next-mdx-remote/rsc` + `gray-matter` · `rehype-pretty-code` (Shiki, build-time highlighting, zero client JS) · deployed by Vercel's git integration.

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

**3 — Shell.** Root layout, sticky `Nav` with scroll-spy, `Section` wrapper, footer, skip-link, **`ThemeToggle` (light / dark / system via `next-themes`)**.
*Accepts:* nav clicks smooth-scroll to the right offset with the sticky bar clearing the heading; active item tracks scroll; keyboard tab order sane with visible focus.
*Theme toggle accepts:* set dark, hard-reload — **no white flash before paint** (the critical test; check on a throttled connection, not just a warm cache); choosing light while the OS is dark stays light, and vice versa; `system` follows the OS live when it switches; the toggle is reachable and operable by keyboard and announces its state.

**Mobile nav — hamburger menu (new, requested after real-device review).** Current mobile behavior (`Nav.tsx`, `<640px`): name + theme toggle on one row, then the five nav links wrap to a second row as a horizontally-scrollable strip (`order-3 w-full overflow-x-auto`). Replace with a hamburger-triggered dropdown instead, matching what Jethro asked for directly.

- **Collapsed bar (mobile only, `<640px`), one row, no wrapping:** Name — ThemeToggle — hamburger button, in that order. This replaces the current two-row wrapping layout; the `flex-wrap`/`order-3`/`w-full` link-row logic goes away for mobile.
- **Desktop/tablet (`sm:` and up) is unchanged** — same horizontal link row as today. Only the mobile case changes.
- **Hamburger button:** a real `<button>`, not a styled div — `aria-expanded`, `aria-controls` pointing to the menu's id, `aria-label` that reflects state ("Open menu" / "Close menu"), mirroring exactly how `ThemeToggle` already handles state-reflecting `aria-label` in this same file's sibling component. Icon: a small hand-built inline SVG (three lines → morphs to an X when open), consistent with the codebase's existing pattern of custom SVG icons (`ThemeToggle`'s icons, the `Leaf`/sparkle SVGs) rather than pulling in an icon library.
- **Dropdown panel:** appears below the bar when triggered, `<640px` only. Reuse the *same* `navItems` data and the *same* active-state logic (`isActive`/`aria-current="location"`, same `text-accent` vs `text-muted hover:text-accent-hover` treatment) already computed for the desktop link row — factor the per-item rendering into one shared piece used by both the desktop `<ul>` and this mobile list, rather than duplicating the active-color logic in two places where it can drift. Style as a vertical list, `bg-bg`, separated from the bar above by `border-t border-border` (matches the Design System's "no shadows, separation via borders" rule) — position it as an absolutely-positioned overlay below the header rather than pushing page content down, so opening it doesn't reflow the page underneath.
- **Closing the menu — all of these, not just one:** clicking a nav link (must close *and* still navigate/scroll to the section), pressing Escape (return focus to the hamburger button), clicking outside the menu, and resizing past the `sm:` breakpoint (prevents an orphaned open-mobile-menu state if the viewport grows past mobile width while it's open).
- **Respect `prefers-reduced-motion`** for any open/close transition — same site-wide rule as everywhere else in this build, not a special case here.
- *Accepts:* verify by real scroll/tap on an actual phone, not just DevTools resize (matches the standing lesson from Rounds 6-9) — menu opens and closes cleanly, active section highlighting still works inside the dropdown, no layout shift when it opens, and it visually sits above the hero photo (check this specifically, since the hero's fixed-positioning stack has already caused three separate stacking-order surprises in this build).

**Sticky nav — still broken, because the Round 9 fix was never actually applied to the code.** Not a new bug, not a regression, not a second cause — checked `app/globals.css` directly: `body` still has `overflow-x: hidden` at line ~110, the exact rule Round 9 diagnosed and specced the fix for. This affects **both mobile and desktop identically**, since body-scroll-container promotion is a page-wide effect, not a breakpoint-specific one — which is consistent with Jethro now reporting it on both. **The fix is unchanged from Round 9: remove `overflow-x: hidden` from the `body` rule, keep it on `html` only.** Codex needs to actually make this edit this time, not just acknowledge it.

**Hero copy panel — center it on mobile, don't let it hug the left edge.** Confirmed live at 390px width: `.hero-copy-panel` sits flush against the left page padding, with all the leftover horizontal space dumped on the right side only (photo visible through the gap) — not centered. Root cause: the mobile breakpoint (`max-width: 639px`) sets a fixed `max-width: 18rem` with no horizontal centering margin, so the panel just sits at its flex parent's default start-alignment.

**Fix — two changes to the `@media (max-width: 639px) { .hero-copy-panel { ... } }` rule:**
- Add `margin-inline: auto` (Tailwind `mx-auto`) so the panel centers within its available space instead of hugging the left edge.
- Replace the fixed `max-width: 18rem` with a **percentage-based width** (e.g. `width: 90%`) instead of another fixed rem value — this directly matches "most of the space, not the entire width" and scales proportionally across the whole mobile range (320-639px) rather than needing separate magic numbers re-tuned per device size. 90% is a starting recommendation, not a fixed final number — adjust by screenshot if it reads too tight or too loose.
- Leave the tablet (`28rem`) and desktop (`36rem`) breakpoints untouched — this complaint is specifically about the mobile case.
- Verify by screenshot at 375-414px: panel should read as clearly centered, with visible photo margin on *both* sides, not just the right.

**4 — Home sections.** Hero (photo, name, positioning line, links), About, Work, Writing, Contact.

**Sequencing within this milestone — hero first, explicitly gated:**

**4a — Hero only.** Build the hero exactly per the "Hero treatment" section above: full-bleed photo background, scrim, text overlay, and all three composited motion effects. Copy `/Users/jethro/Desktop/jetShanghai.jpg` into the repo (never reference the Desktop path). Do not start About/Work/Writing/Contact yet.
🔍 **Checkpoint — hero only. APPROVED (Aug 2026) after five iteration rounds** — see "Hero treatment" and its Round 2–5 notes for the full history. Desktop crop is Jethro's own final value, locked. Do not revisit the hero's look without an explicit new request.

**4b — Build the rest: About, Work, Writing, Contact.**
- ~~Move the Milestone 2 design-system page to `/design-system`~~ — **already done**, ahead of schedule, while building the hero. `app/page.tsx` is confirmed to be the real home page now (pure hero, no leftover design-system content); `/design-system` exists as its own route. Nothing left to do here.
- Update `navItems` in `Nav.tsx` to the real sections (home / about / work / writing / contact); drop the design-system placeholders.
- Content is Source Material only — About/Work copy drawn from the CV table, availability line behind `SITE.availability`. No invented facts or metrics, no phone number.
- Delete the unused default Next.js SVGs in `public/` (file, globe, next, vercel, window) — dead weight from `create-next-app`.

*Accepts:* no layout break 320px → 2560px; no horizontal scroll at any width.
🔍 **Checkpoint — review on a real phone, not a resized window. APPROVED (Aug 2026).** Went through far more scrutiny than a single pass: real-device screenshots surfaced and fixed a full pinned-background crop rework, ripple removal, a CSS Grid `min-width` overflow bug, two separate sticky-nav regressions (both traced to the same `overflow-x: hidden`-on-`body` cause), a mobile hamburger nav rebuild, and hero copy-panel centering. All confirmed fixed at both the code and live-render level. Milestone 4 is done — do not revisit without a new explicit issue.

**Code review findings (Aug 2026, pre-Milestone-5 cleanup) — three confirmed, fix before starting Milestone 5:**

1. **`writingItems` (`app/page.tsx`) has no `date` field**, despite the "Homepage Writing preview" section above requiring sort-by-date with the latest post featured — "featured" is currently just array position. Add a `date` field to each of the 4 entries and actually sort/slice by it, not array order. This also blocks the plan's own requirement that this logic "must carry over driven by real post data" once `lib/content.ts` lands — there's no date to sort by yet.
2. **`components/Nav.tsx`** duplicates the "scrolled to page end → highlight last section" check verbatim in two places (inside the `IntersectionObserver` callback and again in the separate scroll/resize handler). Extract to one shared function so a future tweak can't update one copy and silently leave the other stale.
3. **`.hero-water-sparkles` (`app/globals.css`)** is declared as two separate, non-adjacent rule blocks — a leftover from Round 5's removal of `.hero-water-ripples` from a combined selector. Merge back into one block.

**5 — Content pipeline.** `lib/content.ts`, MDX rendering, `rehype-pretty-code`, prose layout, `/writing` index.
*Accepts:* fixture post renders with highlighted Python and SQL; long lines scroll inside the code block rather than widening the page; drafts unreachable.

**6 — Real content.** See below.
*Accepts:* every post has title/date/summary/tags; no lorem ipsum; no stray `TODO(jethro):`.

**7 — Launch.** Ship on the free `*.vercel.app` URL — custom domain is deliberately deferred. RSS, `sitemap.ts`, `robots.ts`, OG tags, 404 page.

- **Rewrite `README.md`** — still the `create-next-app` boilerplate, including yarn/pnpm/bun instructions that don't apply. Replace with what the project is, the stack, how to run it locally, and a link to the live site. The repo is public and linked from the site, so this is the first thing anyone browsing the code sees.
- Leave `AGENTS.md` and `CLAUDE.md` alone — both are auto-generated by `next dev` and meant to be committed as-is.

*Accepts:* live, `/feed.xml` parses, OG preview renders, availability line visible and driven by the config flag, README describes this project rather than a fresh Next.js install.

**Post-launch bug found during verification — canonical URL is unstable across deployments.** `lib/site.ts` falls back to `process.env.VERCEL_URL` when `NEXT_PUBLIC_SITE_URL` isn't set. `VERCEL_URL` is Vercel's **per-deployment** URL — it's a different value on every single deploy (confirmed live: the RSS feed's own `<link>`/`<guid>` values, the sitemap's `<loc>` values, and `robots.txt`'s `Sitemap:` line all pointed to `portfolio-5vfonws0d-jethro-arciagas-projects.vercel.app`, not the actual stable site at `portfolio-woad-chi-55.vercel.app`). Every new deployment bakes a *different* canonical URL into RSS guids, OG tags, and the sitemap — defeats the purpose of a stable feed, and means shared OG previews could point at a dead deployment-specific URL after the next push.

**Fix:** prefer `VERCEL_PROJECT_PRODUCTION_URL` over `VERCEL_URL` in the fallback chain in `lib/site.ts` — this is the system environment variable Vercel provides automatically, specifically for the stable production domain, with zero manual dashboard configuration needed (unlike setting `NEXT_PUBLIC_SITE_URL` by hand, which would also work but has to be remembered and kept in sync if a custom domain is ever added later). Verify by checking the RSS feed, sitemap, and robots.txt again after redeploying — all three should show the same stable domain, and it should match what's actually being visited.

## Launch content

Adapt from the JetSight README — existing writing, not new invention.

1. **"Four ways connection pooling broke my data pipeline"** — the flagship. IPv6-only Supabase host diagnosed via `dig` (AAAA, no A record); `prepare_threshold=None` because psycopg auto-promotes repeated queries to server-side prepared statements that break under PgBouncer transaction mode; `executemany`'s libpq pipeline mode, ruled in by `SSL SYSCALL error: EOF detected` on a freshly-opened connection; and the unescaped `@` in a generated password that ended URL-based connection strings entirely. Uncommon material — lead with it.
2. **"Why Claude Haiku, not a bigger model"** — cheapest model clearing the accuracy bar; under $1 per 100–150 posting run.
3. **"Direct Postgres over the BaaS SDK"** — extending the same pooling and schema knowledge into a second runtime as a coherence argument.
4. **"What I deliberately didn't build"** — Gall's Law staging; dropping semantic search because Claude has no embeddings endpoint and it meant a second paid vendor for a non-load-bearing feature.
5. *(optional)* **"Testing against real messy data"** — fixtures from real fetched data, not synthetic.

**Homepage Writing preview — capped, not a full dump (newly specified, not yet built).** Currently the homepage renders all `writingItems` flat in one uniform 2-column grid — no cap, no featured post, no link to a fuller archive. Change to:

- **Sort by `date` descending.** The single latest post is **featured**: visually larger — bigger title size, full summary visible, spans the section's full width (reuse existing type-scale tokens only, e.g. `text-xl`/`text-2xl` for its title vs `text-base`/`text-lg` for the rest — no new arbitrary sizes per Guardrail #4).
- **Display the date on every card too — this was never actually specified, only its use as sort data was.** `date` existed purely as a sort key with no visible UI element; add one now. Format as "Aug 2026" (month + year), reusing the exact format already used for Credentials/Education elsewhere on the site rather than introducing a new date format. Style with the same `font-mono text-xs` metadata treatment already used for eyebrows throughout — small, muted, not competing with the title.
- **Next two posts** show as a more compact secondary list below/beside the featured one — smaller title, one-line summary, less visual weight.
- **Every card links to its own article — featured and both secondary posts, not just the featured one.** `writingItems` currently only has `title`/`description`, no `slug` — add one per entry, matching the URL each post will actually live at:
  - `connection-pooling-broke-my-pipeline` — "Four ways connection pooling broke my data pipeline"
  - `why-claude-haiku-not-a-bigger-model` — "Why Claude Haiku, not a bigger model"
  - `direct-postgres-over-baas-sdk` — "Direct Postgres over the BaaS SDK"
  - `what-i-deliberately-didnt-build` — "What I deliberately didn't build"

  Each card's title (or the whole card) links to `/writing/${slug}`. **These slug values are the ones of record** — when Milestone 6 creates the real `content/posts/*.mdx` files, their filenames/frontmatter slugs must match exactly, or these homepage links break the moment the real content pipeline replaces the hardcoded array.
- **Cap at 3 total shown on the homepage**, regardless of how many posts actually exist (currently 4, `TODO` optional 5th, and more will arrive via the Phase 2 CMS) — this must scale automatically, not be hardcoded to "4 minus 1."
- **Button below the three: "All writing →"**, linking to `/writing`. Matches the terse, arrow-suffixed link style already used everywhere else on the site ("GitHub ↗", "Visit site ↗") and reuses the section's own name rather than a synonym like "posts" or "articles."
- **Sequencing note:** this is Milestone-4b-scoped UI work and can be built now against the existing hardcoded `writingItems` array. Neither `/writing` nor any `/writing/[slug]` page exists until Milestone 5's content pipeline lands — so the "All writing →" link *and* every individual post-card link will 404 until then. That's expected sequencing, not a bug; don't let it block building the homepage treatment now. Once `lib/content.ts` exists, this same featured/secondary/cap/link logic must carry over driven by real post data, not just the temporary static array.

**Tags (new).** Each post gets a `tags: string[]` field, matching the `tags` frontmatter already anticipated for the real content pipeline (Milestone 5) and the Phase 2 `posts.tags[]` Postgres column — this isn't a new concept, just wiring the field into the homepage array now too. No dedicated tag/badge component exists yet in the codebase; build one reusing the site's existing `border` + `rounded-token` visual language already used for buttons (small padding, `font-mono text-xs`), rather than inventing new styling — matches Guardrail #4.

- **Cap at 5 visible tags per post**, with a `+N` indicator for any beyond that (e.g. a 6-tag post shows 5 pills + a plain `+1` — no need for that overflow indicator to be interactive/expandable, just a visible count).
- **The latest (featured) post gets an additional "Featured" pill**, visually distinct from its topic tags — accent-filled (`bg-accent text-bg`) rather than the outlined/muted style topic-tag pills use, so it reads as a status marker, not just another topic. No new `featured` field needed — this is already structurally determined by the date-sort/first-position logic specified above, not separate state to track.
- **Display density judgment call, flagging so it can be corrected:** cramming up to 5 tag pills into the *secondary* (compact, low-visual-weight) cards risks working against the "less visual weight" intent already specified for them. Recommending: full up-to-5 tags + Featured pill only on the **featured** card; secondary cards show at most 2 tags (or none, if that reads as cleaner); the full 5-tag display applies uniformly once the actual `/writing` index and `/writing/[slug]` pages exist (Milestone 5), where there's more room. Revisit at the review checkpoint if this looks wrong.
- **Tags are informational only for now — no click-to-filter.** A natural Phase 2 extension once tags are real Postgres data, not in scope here.

**Real tag values for the 4 existing posts** (grounded in their actual content, not placeholders):
- `connection-pooling-broke-my-pipeline` → `postgres`, `pgbouncer`, `python`, `debugging`, `infrastructure`
- `why-claude-haiku-not-a-bigger-model` → `llm`, `claude`, `cost-optimization`, `ai-engineering`
- `direct-postgres-over-baas-sdk` → `postgres`, `supabase`, `architecture`
- `what-i-deliberately-didnt-build` → `architecture`, `scoping`, `roadmap`

**Work section — corrected (was missing an entire employer, see below).**

**JetSight is a personal project, not a job — don't let it compete with real employment for a slot.** It stays the flagship, with its own case study page (architecture, the RLS finding, roadmap reasoning), sitting above/separate from the employer list. Link the repo; add the live dashboard when it ships.

**The Work list itself covers all four real employers — no omissions.** Original draft only included three (GovConnex, CreativeJourneysPH, Indra) and left out Penbrothers entirely, which is a genuine ~1 year 8 month job (Dec 2023–Aug 2025) — an omission a recruiter cross-checking against LinkedIn would notice. Fixed:

1. **AI-native extraction at scale** (GovConnex) — PDF/video/email pipelines, and specifically **evaluating** LLM behavior with Promptfoo rather than trusting it. Give it the most room of the four. Capability level only. **Link:** `https://www.govconnex.com/` — same labeling rule as OpenArchitects: this identifies the employer, it isn't a claim that Jethro built govconnex.com. Link label should read as identification (e.g. "GovConnex ↗"), not "Visit site ↗".
2. **ETL for OpenArchitects** (Penbrothers) — secure client-data integration via API and Selenium, transformed to spec, landed in Azure Blob Storage; Docker, CI/CD, TDD. Naming OpenArchitects is fine — it's the client name already on Jethro's own CV, not confidential. **Link:** `https://www.openarchitectsk12.com/` — but word the link label as identifying the client (e.g. "OpenArchitects ↗"), not as "Visit site" the way CreativeJourneysPH/peccbm.ph are labeled. Those two *are* things Jethro built; OpenArchitects' own website is not — he did backend ETL for them, and the link should read as a citation, not a claim of authorship.
3. **CreativeJourneysPH** — public, shipped, linkable. Full-stack React + Django. Useful evidence against "backend only."
4. **peccbm.ph** (Indra) — award-winning public app; Lambda, Cognito, **Neo4j**, EventBridge. Graph-database work is differentiating; most DE resumes are relational-only.

Supporting repos: `penbrothers-automation`, `csv-diff-tool`, `travel-scraper`.

---

# Phase 2 — the CMS

**Do not start until Phase 1 is live and reviewed.** This is the full-stack learning project: write and publish posts from a browser instead of committing files.

## Account-level prerequisites — Jethro must do these himself, before handing Codex a milestone prompt

**Learned the hard way at Milestone 8:** the Milestone 8 prompt was handed to Codex before any of this existed, and Codex correctly refused to fake credentials or skip real verification — it blocked and asked, which was the right call, but the setup should have happened first. Check this section **before** starting each milestone below, not after getting blocked.

- **A Supabase project** — separate from JetSight's, this is a different app with its own database. Needed before Milestone 8: Transaction Pooler connection details (host/port/user/password/database) from Project Settings → Database, plus the Project URL and API keys from **Project Settings → API Keys** (not the "Data API" integrations page — that only shows the API URL and a Data API toggle, not the actual keys, and is easy to land on by mistake).
  - **Terminology note, confirmed live on the actual dashboard (Aug 2026):** Supabase renamed the classic `anon`/`service_role` JWT keys. The API Keys page now defaults to a **"Publishable and secret API keys"** tab — grab the **Publishable key** (`sb_publishable_...`, client-safe, replaces `anon`) and the **Secret key** (`sb_secret_...`, server-only, replaces `service_role`, hidden by default behind an eye-icon reveal). A **"Legacy anon, service_role API keys"** tab still exists for the old JWT format, but there's no reason to use it for a fresh project. Confirmed compatible with the installed `@supabase/supabase-js@2.112.3` — no code changes needed, this is a naming change only.
- **A GitHub OAuth App** — GitHub → Settings → Developer settings → OAuth Apps. Needed before Milestone 8: Client ID and Client Secret, with the callback URL set to `<production-url>/api/auth/callback/github`. Note a classic OAuth App only supports one callback URL — a second app is needed for local-dev testing against `localhost:3000`, or test only against the deployed site.
- **Jethro's GitHub user ID** for the auth allowlist (not username) — `71895533` for `jetarciaga`, already looked up, no need to re-fetch.
- **A second GitHub account**, for the explicit-denial test in Milestone 8's acceptance criteria.
- **Image storage credentials** (Supabase Storage or Vercel Blob, whichever gets chosen) — will be needed before Milestone 10's editor work (image upload). Not urgent yet, but flagging now so it doesn't repeat the same blocker.
- **Env vars set in two places**: `.env.local` locally (gitignored, never committed) and the same values in Vercel's dashboard for production. Codex can wire code to read these; it cannot generate or create the underlying accounts/values.

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

**Milestone 8 verified complete (commit `5ebf18e`)** — real live tests, not assumed: anonymous reads restricted to published posts, anonymous writes rejected with `42501`, allowlisted account reaches `/admin`, non-allowlisted account gets `AccessDenied`, service-role key confirmed absent from any client bundle. `middleware.ts` added afterward (`export { auth as middleware }`, `matcher: ["/admin/:path*"]`) to centralize the guard the plan originally asked for, superseding the page-level `requireAdmin()` check as the primary gate — that function can stay as defense-in-depth, doesn't need removing.

**Note for Milestone 9 — one RLS policy is unverified because nothing exercises it yet.** The `"allowlisted admin manages posts"` policy in the migration checks a Supabase JWT claim, `auth.jwt() -> 'app_metadata' ->> 'github_user_id'`. Nothing in the codebase currently sets that claim — admin identity is established via Auth.js (Next.js-level session, GitHub OAuth), and privileged writes are expected to go through the service-role client in `lib/supabase/admin.ts`, which bypasses RLS by design and relies on `requireAdmin()`/middleware as the real gate. That's a sound design — just means this specific policy branch is unexercised, not wrong. When Milestone 9 implements the actual write server actions, confirm explicitly which path they use: if it's the service-role client (the architecture as it stands implies this), that's fine and this policy stays as unused defense-in-depth; if anything ever writes through a Supabase-authenticated (not service-role) session instead, verify that claim actually gets populated before trusting this policy to do anything.

**9 — CRUD.** Create, edit, delete, draft/publish. Server actions with validation.
*Accepts:* a post created in `/admin` appears on `/writing` after publish and disappears when reverted to draft.

**Milestone 9 verified complete (commit `4402568`)** — real checks, not assumed: `lib/content.ts`'s `getCollection("posts")` correctly merges file-based entries (the 4 original MDX posts, untouched) with database entries keyed by slug, so nothing was lost when DB-backed posts were added. Every server action in `app/admin/actions.ts` calls `requireAdmin()`, validates `isPostId()` against a real UUID pattern before trusting any client-supplied id, and — the key security property — **status is never taken from client input**: `createPost` hardcodes `draft`, `togglePostStatus` computes the next state from the existing DB row, not from anything the client sent. `lib/admin-posts.ts`'s `validatePostForm` enforces real bounds on every field and validates the shape of data coming back from Supabase too. `npm run lint` and `npm run build` both re-run and confirmed clean. Live-checked on production: `/writing` renders correctly, console clean, no orphaned test content left behind.

**Real deviation from spec, found during verification — fixed before Milestone 10.** The "Rendering" section above says post pages should "stay statically generated, with `revalidatePath` called on publish." The actual build output showed `/`, `/writing`, and `/writing/[slug]` all marked `ƒ` (dynamic, server-rendered per request) instead of `○`/`●` (static) — every page visit was querying Supabase live, not just after a publish/edit. **Resolution:** `lib/content.ts` now caches the published-post query with `unstable_cache`; the public pages build as `○`/`●`, while the existing `revalidatePath` calls invalidate the affected routes and `updateTag` expires the shared content cache. The full publish/revert cycle was verified on production without a redeploy, with a clean browser console.

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
