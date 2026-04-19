-- Supabase schema for Gallery + Admin

create type public.gallery_service as enum (
  'interior',
  'exterior',
  'cabinet',
  'commercial',
  'deck',
  'pressure'
);

create type public.gallery_image_kind as enum (
  'before_desktop',
  'before_mobile',
  'after_desktop',
  'after_mobile'
);

create table if not exists public.gallery_projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  service public.gallery_service not null,
  location text not null,
  title_es text not null,
  title_en text not null,
  description_es text not null,
  description_en text not null,
  intro_es text not null,
  intro_en text not null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.gallery_projects(id) on delete cascade,
  kind public.gallery_image_kind not null,
  path text not null,
  public_url text,
  alt_es text not null,
  alt_en text not null,
  caption_es text not null,
  caption_en text not null,
  created_at timestamptz not null default now(),
  unique(project_id, kind)
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_gallery_projects_updated_at on public.gallery_projects;
create trigger trg_gallery_projects_updated_at
before update on public.gallery_projects
for each row
execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles ap
    where ap.id = auth.uid()
      and ap.role = 'admin'
  );
$$;

alter table public.gallery_projects enable row level security;
alter table public.gallery_images enable row level security;
alter table public.admin_profiles enable row level security;

-- Public read for active projects.
create policy "Public can read active projects"
on public.gallery_projects
for select
using (is_active = true or public.is_admin());

create policy "Public can read active images"
on public.gallery_images
for select
using (
  exists (
    select 1
    from public.gallery_projects gp
    where gp.id = gallery_images.project_id
      and (gp.is_active = true or public.is_admin())
  )
);

create policy "Admin can manage projects"
on public.gallery_projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin can manage images"
on public.gallery_images
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admin profile self read"
on public.admin_profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

-- Storage policies for gallery bucket.
create policy "Public read gallery objects"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'gallery');

create policy "Admin write gallery objects"
on storage.objects
for all
to authenticated
using (bucket_id = 'gallery' and public.is_admin())
with check (bucket_id = 'gallery' and public.is_admin());
