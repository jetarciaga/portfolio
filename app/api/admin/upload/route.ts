import { auth } from "@/auth";
import { ALLOWED_GITHUB_USER_ID } from "@/lib/auth-config";
import { processImage } from "@/lib/image-processing";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const bucketName = "post-images";
const maxFileSize = 10 * 1024 * 1024;
const allowedTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

async function ensureBucket() {
  const supabase = createAdminSupabaseClient();
  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Storage bucket lookup failed: ${listError.message}`);
  }

  if (!buckets.some((bucket) => bucket.id === bucketName)) {
    const { error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: "10MB",
      allowedMimeTypes: [...allowedTypes],
    });

    if (error) {
      throw new Error(`Storage bucket creation failed: ${error.message}`);
    }
  }

  return supabase;
}

function altFromFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .slice(0, 120) || "Uploaded image";
}

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user?.id !== ALLOWED_GITHUB_USER_ID) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const fileValue = formData.get("file");

  if (!(fileValue instanceof File)) {
    return Response.json({ error: "An image file is required." }, { status: 400 });
  }

  if (!allowedTypes.has(fileValue.type) || fileValue.size > maxFileSize) {
    return Response.json(
      { error: "Use a GIF, JPEG, PNG, or WebP image up to 10MB." },
      { status: 400 },
    );
  }

  let processedImage: Buffer;

  try {
    processedImage = await processImage(
      Buffer.from(await fileValue.arrayBuffer()),
    );
  } catch {
    return Response.json(
      {
        error:
          "Image processing failed. Use a valid image under the 50-megapixel limit.",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = await ensureBucket();
    const path = `posts/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, processedImage, {
        cacheControl: "31536000",
        contentType: "image/webp",
        upsert: false,
      });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
    const alt = altFromFilename(fileValue.name);

    return Response.json({
      alt,
      markdown: `![${alt}](${data.publicUrl})`,
      url: data.publicUrl,
    });
  } catch {
    return Response.json(
      { error: "Image upload failed. Please try again." },
      { status: 500 },
    );
  }
}
