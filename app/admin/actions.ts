"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/authz";
import {
  getAdminPostById,
  isPostId,
  validatePostForm,
} from "@/lib/admin-posts";
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
