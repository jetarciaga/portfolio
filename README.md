# Jethro Arciaga — portfolio + writing platform

The public portfolio and technical writing site for Jethro Arciaga, a Python
and data engineer working on scalable pipelines, extraction systems, AWS
integrations, and AI-native workflows.

Live site: [jarcodes.dev](https://jarcodes.dev/)

## Stack

- Next.js 16 App Router and TypeScript
- Tailwind CSS v4 and `next/font`
- `next-themes` for light, dark, and system themes
- MDX with `next-mdx-remote/rsc` and `gray-matter`
- Build-time syntax highlighting with `rehype-pretty-code` and Shiki
- Vercel deployment through the repository’s Git integration

Posts live in `content/posts/*.mdx`. The shared typed loader in
`lib/content.ts` feeds the homepage, Writing index, post pages, sitemap, and
RSS feed. A new post is published by adding its MDX file and pushing the
change.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production check:

```bash
npm run lint
npm run build
npm run start
```

## Phase 2 setup

Copy `.env.example` to `.env.local` for local work and fill it with values
from Supabase and GitHub OAuth. The real values belong in Vercel's dashboard,
not in the repository. Apply the SQL migration in
`supabase/migrations/20260812000000_create_posts.sql` to the Supabase project,
then verify the anonymous RLS boundary with:

```bash
npm run verify:rls
```

The app uses Supabase's Transaction Pooler on port `6543` with prepared
statements disabled. Auth.js accepts only GitHub user ID `71895533`; the
`middleware.ts` guard and server-side authorization helper protect `/admin`.
