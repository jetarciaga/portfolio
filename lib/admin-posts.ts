import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const postStatusFilters = ["all", "draft", "published"] as const;
export type PostStatusFilter = (typeof postStatusFilters)[number];
export type PostStatus = Exclude<PostStatusFilter, "all">;

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body_md: string;
  tags: string[];
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const postSelect =
  "id, slug, title, summary, body_md, tags, status, published_at, created_at, updated_at";
const postIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isPostId(value: unknown): value is string {
  return typeof value === "string" && postIdPattern.test(value);
}

export function parsePostStatusFilter(value: unknown): PostStatusFilter {
  return typeof value === "string" && postStatusFilters.includes(value as PostStatusFilter)
    ? (value as PostStatusFilter)
    : "all";
}

function postFromRow(value: unknown): AdminPost {
  if (!value || typeof value !== "object") {
    throw new Error("Supabase returned an invalid post row.");
  }

  const row = value as Record<string, unknown>;
  const status = row.status;

  if (status !== "draft" && status !== "published") {
    throw new Error("Supabase returned an invalid post status.");
  }

  if (
    typeof row.id !== "string" ||
    typeof row.slug !== "string" ||
    typeof row.title !== "string" ||
    typeof row.summary !== "string" ||
    typeof row.body_md !== "string" ||
    !Array.isArray(row.tags) ||
    !row.tags.every((tag): tag is string => typeof tag === "string") ||
    (row.published_at !== null && typeof row.published_at !== "string") ||
    typeof row.created_at !== "string" ||
    typeof row.updated_at !== "string"
  ) {
    throw new Error("Supabase returned an invalid post row shape.");
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    body_md: row.body_md,
    tags: row.tags,
    status,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function throwQueryError(operation: string, error: { message: string }): never {
  throw new Error(`${operation} failed: ${error.message}`);
}

export async function listAdminPosts(filter: PostStatusFilter) {
  const supabase = createAdminSupabaseClient();
  let query = supabase.from("posts").select(postSelect);

  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  const { data, error } = await query.order("updated_at", {
    ascending: false,
  });

  if (error) {
    throwQueryError("Listing posts", error);
  }

  return ((data ?? []) as unknown[]).map(postFromRow);
}

export async function getAdminPostById(id: string) {
  if (!isPostId(id)) {
    return null;
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throwQueryError("Loading post", error);
  }

  return data ? postFromRow(data) : null;
}

function formText(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string") {
    throw new Error(`${field} must be text.`);
  }

  return value.trim();
}

function boundedText(
  formData: FormData,
  field: string,
  maximum: number,
) {
  const value = formText(formData, field);

  if (value.length === 0 || value.length > maximum) {
    throw new Error(`${field} must be between 1 and ${maximum} characters.`);
  }

  return value;
}

export function validatePostForm(formData: FormData) {
  const title = boundedText(formData, "title", 200);
  const slug = boundedText(formData, "slug", 120).toLowerCase();
  const summary = boundedText(formData, "summary", 500);
  const body_md = boundedText(formData, "body_md", 200_000);

  if (!slugPattern.test(slug)) {
    throw new Error(
      "slug must contain only lowercase letters, numbers, and single hyphens.",
    );
  }

  const tags = formText(formData, "tags")
    .split(/[\n,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  const uniqueTags = [...new Set(tags)];

  if (
    uniqueTags.length === 0 ||
    uniqueTags.length > 12 ||
    uniqueTags.some((tag) => tag.length > 50)
  ) {
    throw new Error("tags must contain between 1 and 12 short values.");
  }

  return { title, slug, summary, body_md, tags: uniqueTags };
}
