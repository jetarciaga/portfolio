import Link from "next/link";
import { toggleJobStatus } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/authz";
import {
  listAdminJobs,
  parseJobPage,
  parseJobPlatformFilter,
  parseJobStatusFilter,
} from "@/lib/jobs";

type JobsPageProps = {
  searchParams: Promise<{
    page?: string;
    platform?: string;
    status?: string;
  }>;
};

function formatJobDate(value: string | null) {
  if (!value) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(value));
}

function jobsHref({
  page,
  platform,
  status,
}: {
  page: number;
  platform: string;
  status: string;
}) {
  const params = new URLSearchParams();

  if (platform !== "all") {
    params.set("platform", platform);
  }

  if (status !== "new") {
    params.set("status", status);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/admin/jobs?${query}` : "/admin/jobs";
}

function filterDescription(platform: string, status: string) {
  const platformText = platform === "all" ? "all platforms" : platform;
  const statusText = status === "all" ? "all statuses" : status;
  return `Showing ${statusText} jobs from ${platformText}.`;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const platformFilter = parseJobPlatformFilter(params.platform);
  const statusFilter = parseJobStatusFilter(params.status);
  const page = parseJobPage(params.page);
  const result = await listAdminJobs({
    platform: platformFilter,
    status: statusFilter,
    page,
  });

  const firstDisplayedJob = result.jobs.length
    ? (result.page - 1) * result.pageSize + 1
    : 0;
  const lastDisplayedJob = (result.page - 1) * result.pageSize + result.jobs.length;

  return (
    <main id="main-content" className="relative z-10 bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-prose">
          <h1 className="text-3xl font-semibold leading-heading tracking-tight">
            Jobs review
          </h1>
          <p className="mt-4 text-base leading-body text-muted">
            Review the roles collected by the job-search automation pipeline.
          </p>
        </header>

        <form
          className="mt-10 flex flex-wrap items-end gap-4 border-t border-border pt-6"
          method="get"
        >
          <label className="flex flex-col gap-2 font-mono text-xs text-muted">
            Platform
            <select
              className="rounded-token border border-border bg-surface px-3 py-2 font-sans text-sm text-text"
              defaultValue={platformFilter}
              name="platform"
            >
              <option value="all">All platforms</option>
              <option value="indeed">Indeed</option>
              <option value="jobstreet">JobStreet</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 font-mono text-xs text-muted">
            Status
            <select
              className="rounded-token border border-border bg-surface px-3 py-2 font-sans text-sm text-text"
              defaultValue={statusFilter}
              name="status"
            >
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="all">All statuses</option>
            </select>
          </label>
          <button
            className="rounded-token border border-border px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            type="submit"
          >
            Apply filters
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{filterDescription(platformFilter, statusFilter)}</p>
          <p>
            {result.total === 0
              ? "No matching jobs"
              : `Showing ${firstDisplayedJob}–${lastDisplayedJob} of ${result.total}`}
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {result.jobs.length === 0 ? (
            <p className="border-t border-border pt-6 text-base text-muted">
              No jobs match this filter.
            </p>
          ) : (
            result.jobs.map((job) => {
              const description = job.description?.trim() ?? "";
              const descriptionPreview =
                description.length > 360
                  ? `${description.slice(0, 360).trimEnd()}…`
                  : description;

              return (
                <article
                  className="border-t border-border pt-6"
                  key={job.id}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted">
                        <span className="text-accent">{job.platform}</span>
                        <span>{job.status}</span>
                        <span>Posted {formatJobDate(job.posted_at)}</span>
                      </div>
                      <h2 className="mt-3 text-xl font-semibold leading-heading">
                        <a
                          className="transition-colors duration-150 ease-out hover:text-accent"
                          href={job.apply_url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {job.title}
                        </a>
                      </h2>
                      <p className="mt-2 text-base text-text">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                      {job.salary_text ? (
                        <p className="mt-2 font-mono text-xs text-accent">
                          {job.salary_text}
                        </p>
                      ) : null}
                      {descriptionPreview ? (
                        <p className="mt-4 text-sm leading-body text-muted">
                          {descriptionPreview}
                        </p>
                      ) : null}
                      <p className="mt-4 font-mono text-xs text-muted">
                        Added {formatJobDate(job.created_at)}
                      </p>
                    </div>
                    <form action={toggleJobStatus.bind(null, job.id)}>
                      <button
                        className="w-full rounded-token border border-border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent lg:w-auto"
                        type="submit"
                      >
                        {job.status === "new" ? "Mark reviewed" : "Mark new"}
                      </button>
                    </form>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {result.total > 0 ? (
          <nav
            aria-label="Jobs pagination"
            className="mt-10 flex items-center justify-between border-t border-border pt-6"
          >
            {result.hasPreviousPage ? (
              <Link
                className="rounded-token border border-border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
                href={jobsHref({
                  page: result.page - 1,
                  platform: platformFilter,
                  status: statusFilter,
                })}
              >
                Previous
              </Link>
            ) : (
              <span className="text-sm text-muted">First page</span>
            )}
            <span className="font-mono text-xs text-muted">
              Page {result.page}
            </span>
            {result.hasNextPage ? (
              <Link
                className="rounded-token border border-border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
                href={jobsHref({
                  page: result.page + 1,
                  platform: platformFilter,
                  status: statusFilter,
                })}
              >
                Next
              </Link>
            ) : (
              <span className="text-sm text-muted">Last page</span>
            )}
          </nav>
        ) : null}
      </div>
    </main>
  );
}
