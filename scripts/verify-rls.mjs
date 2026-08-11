import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY before running npm run verify:rls.",
  );
}

const anonymous = createClient(supabaseUrl, publishableKey, {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
  },
});

const { data: visiblePosts, error: readError } = await anonymous
  .from("posts")
  .select("status");

if (readError) {
  throw new Error(`Anonymous read failed: ${readError.message}`);
}

if (visiblePosts.some((post) => post.status !== "published")) {
  throw new Error("RLS leak: an anonymous read returned a non-published post.");
}

const { error: writeError } = await anonymous.from("posts").insert({
  slug: "__anonymous-rls-probe__",
  title: "Anonymous RLS probe",
  summary: "This insert must be rejected by RLS.",
  body_md: "",
  tags: ["security-test"],
  status: "published",
  published_at: new Date().toISOString(),
});

if (!writeError) {
  throw new Error("RLS failure: an anonymous insert was accepted.");
}

console.log(
  JSON.stringify(
    {
      anonymousRead: "only published rows visible",
      anonymousWrite: "rejected",
      rejectedCode: writeError.code ?? null,
    },
    null,
    2,
  ),
);
