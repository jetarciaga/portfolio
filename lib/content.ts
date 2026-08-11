import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createPublicSupabaseClient } from "@/lib/supabase/public";

export const collections = ["posts", "work"] as const;
export type Collection = (typeof collections)[number];

export type ContentFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
};

export type ContentEntry = ContentFrontmatter & {
  collection: Collection;
  slug: string;
  body: string;
};

const contentDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatContentDate(date: string) {
  const normalizedDate = date.length === 10 ? `${date}T00:00:00Z` : date;
  return contentDateFormatter.format(new Date(normalizedDate));
}

function asString(value: unknown, field: string, filePath: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${filePath}: ${field} must be a non-empty string`);
  }

  return value;
}

function parseFrontmatter(
  data: Record<string, unknown>,
  filePath: string,
): ContentFrontmatter {
  const title = asString(data.title, "title", filePath);
  const date = asString(data.date, "date", filePath);
  const summary = asString(data.summary, "summary", filePath);

  if (!Number.isFinite(Date.parse(date))) {
    throw new Error(`${filePath}: date must be a valid ISO date`);
  }

  if (
    !Array.isArray(data.tags) ||
    data.tags.length === 0 ||
    !data.tags.every((tag): tag is string => typeof tag === "string")
  ) {
    throw new Error(`${filePath}: tags must be a non-empty string array`);
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new Error(`${filePath}: draft must be a boolean when provided`);
  }

  return {
    title,
    date,
    summary,
    tags: data.tags,
    draft: data.draft ?? false,
  };
}

function readFileCollection(collection: Collection): ContentEntry[] {
  const directory = path.join(process.cwd(), "content", collection);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const filePath = path.join(directory, entry.name);
      const parsed = matter(fs.readFileSync(filePath, "utf8"));
      const frontmatter = parseFrontmatter(parsed.data, filePath);

      return {
        ...frontmatter,
        collection,
        slug: path.basename(entry.name, ".mdx"),
        body: parsed.content.trim(),
      };
    });
}

type DatabasePost = {
  body_md: unknown;
  created_at: unknown;
  published_at: unknown;
  slug: unknown;
  summary: unknown;
  tags: unknown;
  title: unknown;
};

function databaseString(value: unknown, field: string, slug: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Database post ${slug}: ${field} must be a non-empty string`);
  }

  return value;
}

function databaseDate(value: unknown, slug: string) {
  const date = databaseString(value, "date", slug);
  const parsed = new Date(date);

  if (!Number.isFinite(parsed.getTime())) {
    throw new Error(`Database post ${slug}: date must be valid`);
  }

  return parsed.toISOString().slice(0, 10);
}

function parseDatabasePost(row: DatabasePost): ContentEntry {
  const slug = databaseString(row.slug, "slug", "unknown");
  const tags = row.tags;

  if (
    !Array.isArray(tags) ||
    !tags.every((tag): tag is string => typeof tag === "string")
  ) {
    throw new Error(`Database post ${slug}: tags must be a string array`);
  }

  return {
    collection: "posts",
    slug,
    title: databaseString(row.title, "title", slug),
    date: databaseDate(row.published_at ?? row.created_at, slug),
    summary: databaseString(row.summary, "summary", slug),
    tags,
    draft: false,
    body: typeof row.body_md === "string" ? row.body_md.trim() : "",
  };
}

async function readDatabasePosts() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    return [];
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "body_md, created_at, published_at, slug, summary, tags, title",
    )
    .eq("status", "published");

  if (error) {
    throw new Error(`Published posts read failed: ${error.message}`);
  }

  return ((data ?? []) as unknown as DatabasePost[]).map(parseDatabasePost);
}

function sortEntries(entries: ContentEntry[]) {
  return entries
    .filter((entry) => !entry.draft)
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date));
}

export async function getCollection(collection: Collection) {
  const fileEntries = readFileCollection(collection);

  if (collection !== "posts") {
    return sortEntries(fileEntries);
  }

  const entriesBySlug = new Map(
    sortEntries(fileEntries).map((entry) => [entry.slug, entry]),
  );

  for (const entry of await readDatabasePosts()) {
    entriesBySlug.set(entry.slug, entry);
  }

  return sortEntries([...entriesBySlug.values()]);
}

export async function getEntry(collection: Collection, slug: string) {
  return (await getCollection(collection)).find((entry) => entry.slug === slug);
}
