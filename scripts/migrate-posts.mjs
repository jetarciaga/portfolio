import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import { createAdminSupabaseClient } from "../lib/supabase/admin.ts";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const expectedSlugs = [
  "connection-pooling-broke-my-pipeline",
  "direct-postgres-over-baas-sdk",
  "what-i-deliberately-didnt-build",
  "why-claude-haiku-not-a-bigger-model",
].sort();

function readPosts() {
  const files = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();

  const slugs = files.map((file) => path.basename(file, ".mdx"));

  if (
    files.length !== expectedSlugs.length ||
    slugs.some((slug, index) => slug !== expectedSlugs[index])
  ) {
    throw new Error(
      "Expected exactly these source slugs: " + expectedSlugs.join(", "),
    );
  }

  return files.map((file) => {
    const filePath = path.join(postsDirectory, file);
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    const date = parsed.data.date;

    if (
      typeof parsed.data.title !== "string" ||
      typeof date !== "string" ||
      typeof parsed.data.summary !== "string" ||
      !Array.isArray(parsed.data.tags) ||
      !parsed.data.tags.every((tag) => typeof tag === "string") ||
      parsed.data.draft !== false
    ) {
      throw new Error(filePath + ": invalid published post frontmatter");
    }

    if (!Number.isFinite(Date.parse(date))) {
      throw new Error(filePath + ": date must be a valid ISO date");
    }

    return {
      slug: path.basename(file, ".mdx"),
      title: parsed.data.title,
      summary: parsed.data.summary,
      body_md: parsed.content.trim(),
      tags: parsed.data.tags,
      status: "published",
      published_at: new Date(date + "T00:00:00.000Z").toISOString(),
    };
  });
}

const posts = readPosts();
const supabase = createAdminSupabaseClient();
const { data, error } = await supabase
  .from("posts")
  .upsert(posts, { onConflict: "slug" })
  .select("slug, status, published_at, title");

if (error) {
  throw new Error("Post migration failed: " + error.message);
}

const migrated = (data ?? []).sort((first, second) =>
  first.slug.localeCompare(second.slug),
);
const expected = [...posts].sort((first, second) =>
  first.slug.localeCompare(second.slug),
);

if (
  migrated.length !== posts.length ||
  migrated.some(
    (row, index) =>
      row.slug !== expected[index].slug ||
      row.status !== "published" ||
      Date.parse(row.published_at) !== Date.parse(expected[index].published_at) ||
      row.title !== expected[index].title,
  )
) {
  throw new Error("Post migration returned an unexpected database result.");
}

console.log(
  JSON.stringify({
    migrated: migrated.map(({ slug, status, published_at: publishedAt }) => ({
      slug,
      status,
      publishedAt,
    })),
  }),
);
