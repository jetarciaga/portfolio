// This is Jethro's public GitHub user ID, not a secret. The environment
// override keeps the allowlist explicit in Vercel while retaining a safe
// default if the non-secret setting is omitted.
export const ALLOWED_GITHUB_USER_ID =
  process.env.AUTH_GITHUB_ALLOWED_USER_ID ?? "71895533";
