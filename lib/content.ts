import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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
  return contentDateFormatter.format(new Date(`${date}T00:00:00Z`));
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

function readCollection(collection: Collection): ContentEntry[] {
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

export function getCollection(collection: Collection) {
  return readCollection(collection)
    .filter((entry) => !entry.draft)
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date));
}

export function getEntry(collection: Collection, slug: string) {
  return getCollection(collection).find((entry) => entry.slug === slug);
}
