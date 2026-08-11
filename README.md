# Jethro Arciaga — portfolio + writing platform

The public portfolio and technical writing site for Jethro Arciaga, a Python
and data engineer working on scalable pipelines, extraction systems, AWS
integrations, and AI-native workflows.

Live site: [portfolio-woad-chi-55.vercel.app](https://portfolio-woad-chi-55.vercel.app/)

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
