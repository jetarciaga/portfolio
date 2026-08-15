"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/authz";
import {
  getAdminPostById,
  isPostId,
  validatePostForm,
} from "@/lib/admin-posts";
import { getAdminJobById, isJobId } from "@/lib/jobs";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

function revalidatePostPaths(...slugs: string[]) {
  updateTag("content-published-posts");
  revalidatePath("/");
  revalidatePath("/writing");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");

  for (const slug of new Set(slugs.filter(Boolean))) {
    revalidatePath(`/writing/${slug}`);
  }
}

export async function autosavePost(id: string | null, formData: FormData) {
  await requireAdmin();

  if (id !== null && !isPostId(id)) {
    throw new Error("Invalid post id.");
  }

  const input = validatePostForm(formData);
  const supabase = createAdminSupabaseClient();

  if (id === null) {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        ...input,
        status: "draft",
        published_at: null,
      })
      .select("id, slug, status, updated_at")
      .single();

    if (error || !data) {
      throw new Error(`Creating draft failed: ${error?.message ?? "no row returned"}`);
    }

    revalidatePostPaths(input.slug);

    return {
      id: data.id,
      slug: data.slug,
      status: data.status,
      updatedAt: data.updated_at,
    };
  }

  const existing = await getAdminPostById(id);

  if (!existing) {
    throw new Error("Post not found.");
  }

  const { data, error } = await supabase
    .from("posts")
    .update(input)
    .eq("id", id)
    .select("id, slug, status, updated_at")
    .single();

  if (error || !data) {
    throw new Error(`Saving draft failed: ${error?.message ?? "no row returned"}`);
  }

  revalidatePostPaths(existing.slug, input.slug);

  return {
    id: data.id,
    slug: data.slug,
    status: data.status,
    updatedAt: data.updated_at,
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const input = validatePostForm(formData);
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("posts").insert({
    ...input,
    status: "draft",
    published_at: null,
  });

  if (error) {
    throw new Error(`Creating post failed: ${error.message}`);
  }

  revalidatePostPaths(input.slug);
  redirect("/admin");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();

  if (!isPostId(id)) {
    throw new Error("Invalid post id.");
  }

  const existing = await getAdminPostById(id);

  if (!existing) {
    throw new Error("Post not found.");
  }

  const input = validatePostForm(formData);
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("posts")
    .update(input)
    .eq("id", id);

  if (error) {
    throw new Error(`Updating post failed: ${error.message}`);
  }

  revalidatePostPaths(existing.slug, input.slug);
  redirect(`/admin/${id}/edit`);
}

export async function togglePostStatus(id: string) {
  await requireAdmin();

  if (!isPostId(id)) {
    throw new Error("Invalid post id.");
  }

  const existing = await getAdminPostById(id);

  if (!existing) {
    throw new Error("Post not found.");
  }

  const nextStatus = existing.status === "published" ? "draft" : "published";
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("posts")
    .update({
      status: nextStatus,
      published_at:
        nextStatus === "published"
          ? existing.published_at ?? new Date().toISOString()
          : null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Changing post status failed: ${error.message}`);
  }

  revalidatePostPaths(existing.slug);
  redirect("/admin");
}

export async function toggleJobStatus(id: string) {
  await requireAdmin();

  if (!isJobId(id)) {
    throw new Error("Invalid job id.");
  }

  const existing = await getAdminJobById(id);

  if (!existing) {
    throw new Error("Job not found.");
  }

  const nextStatus = existing.status === "reviewed" ? "new" : "reviewed";
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("jobs")
    .update({ status: nextStatus })
    .eq("id", id);

  if (error) {
    throw new Error(`Changing job status failed: ${error.message}`);
  }

  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

export async function deletePost(id: string) {
  await requireAdmin();

  if (!isPostId(id)) {
    throw new Error("Invalid post id.");
  }

  const existing = await getAdminPostById(id);

  if (!existing) {
    throw new Error("Post not found.");
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(`Deleting post failed: ${error.message}`);
  }

  revalidatePostPaths(existing.slug);
  redirect("/admin");
}
