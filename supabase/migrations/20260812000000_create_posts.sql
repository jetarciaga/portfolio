create type public.post_status as enum ('draft', 'published');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body_md text not null,
  tags text[] not null default '{}',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_posts_have_publish_date check (
    status = 'draft' or published_at is not null
  )
);

create index posts_published_at_idx
  on public.posts (published_at desc)
  where status = 'published';

create or replace function public.set_posts_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_posts_updated_at();

alter table public.posts enable row level security;

revoke all on public.posts from anon, authenticated;
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;

create policy "published posts are public"
on public.posts
for select
to anon
using (status = 'published');

create policy "published posts are readable by signed-in users"
on public.posts
for select
to authenticated
using (status = 'published');

-- Supabase-authenticated sessions may write only when their server-managed
-- app_metadata carries Jethro's GitHub user ID. Auth.js separately gates the
-- Next.js admin surface; this policy protects the Supabase Data API itself.
create policy "allowlisted admin manages posts"
on public.posts
for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'github_user_id') = '71895533'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'github_user_id') = '71895533'
);
