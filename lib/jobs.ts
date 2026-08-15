import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const jobPlatformFilters = ["all", "indeed", "jobstreet"] as const;
export type JobPlatformFilter = (typeof jobPlatformFilters)[number];
export type JobPlatform = Exclude<JobPlatformFilter, "all">;

export const jobStatusFilters = ["all", "new", "reviewed"] as const;
export type JobStatusFilter = (typeof jobStatusFilters)[number];
export type JobStatus = Exclude<JobStatusFilter, "all">;

export const JOBS_PAGE_SIZE = 25;

export type AdminJob = {
  id: string;
  platform: JobPlatform;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  apply_url: string;
  posted_at: string | null;
  salary_text: string | null;
  status: JobStatus;
  created_at: string;
};

const jobSelect =
  "id, platform, title, company, location, description, apply_url, posted_at, salary_text, status, created_at";
const jobIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isJobId(value: unknown): value is string {
  return typeof value === "string" && jobIdPattern.test(value);
}

export function parseJobPlatformFilter(value: unknown): JobPlatformFilter {
  return typeof value === "string" &&
    jobPlatformFilters.includes(value as JobPlatformFilter)
    ? (value as JobPlatformFilter)
    : "all";
}

export function parseJobStatusFilter(value: unknown): JobStatusFilter {
  return typeof value === "string" &&
    jobStatusFilters.includes(value as JobStatusFilter)
    ? (value as JobStatusFilter)
    : "new";
}

export function parseJobPage(value: unknown) {
  const page = typeof value === "string" ? Number(value) : 1;

  return Number.isInteger(page) && page > 0 ? page : 1;
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isValidDateString(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

export function jobFromRow(value: unknown): AdminJob {
  if (!value || typeof value !== "object") {
    throw new Error("Supabase returned an invalid job row.");
  }

  const row = value as Record<string, unknown>;
  const platform = row.platform;
  const status = row.status;

  if (platform !== "indeed" && platform !== "jobstreet") {
    throw new Error("Supabase returned an invalid job platform.");
  }

  if (status !== "new" && status !== "reviewed") {
    throw new Error("Supabase returned an invalid job status.");
  }

  if (
    !isJobId(row.id) ||
    typeof row.title !== "string" ||
    row.title.trim() === "" ||
    typeof row.company !== "string" ||
    row.company.trim() === "" ||
    !isNullableString(row.location) ||
    !isNullableString(row.description) ||
    typeof row.apply_url !== "string" ||
    row.apply_url.trim() === "" ||
    !isNullableString(row.posted_at) ||
    (row.posted_at !== null && !isValidDateString(row.posted_at)) ||
    !isNullableString(row.salary_text) ||
    !isValidDateString(row.created_at)
  ) {
    throw new Error("Supabase returned an invalid job row shape.");
  }

  return {
    id: row.id,
    platform,
    title: row.title,
    company: row.company,
    location: row.location,
    description: row.description,
    apply_url: row.apply_url,
    posted_at: row.posted_at,
    salary_text: row.salary_text,
    status,
    created_at: row.created_at,
  };
}

function throwQueryError(operation: string, error: { message: string }): never {
  throw new Error(`${operation} failed: ${error.message}`);
}

export type AdminJobList = {
  jobs: AdminJob[];
  page: number;
  pageSize: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function listAdminJobs({
  platform,
  status,
  page,
}: {
  platform: JobPlatformFilter;
  status: JobStatusFilter;
  page: number;
}): Promise<AdminJobList> {
  const currentPage = parseJobPage(String(page));
  const supabase = createAdminSupabaseClient();
  let query = supabase.from("jobs").select(jobSelect, { count: "exact" });

  if (platform !== "all") {
    query = query.eq("platform", platform);
  }

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const from = (currentPage - 1) * JOBS_PAGE_SIZE;
  const to = from + JOBS_PAGE_SIZE - 1;
  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    throwQueryError("Listing jobs", error);
  }

  const total = count ?? 0;

  return {
    jobs: ((data ?? []) as unknown[]).map(jobFromRow),
    page: currentPage,
    pageSize: JOBS_PAGE_SIZE,
    total,
    hasNextPage: currentPage * JOBS_PAGE_SIZE < total,
    hasPreviousPage: currentPage > 1,
  };
}

export async function getAdminJobById(id: string) {
  if (!isJobId(id)) {
    return null;
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(jobSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throwQueryError("Loading job", error);
  }

  return data ? jobFromRow(data) : null;
}
