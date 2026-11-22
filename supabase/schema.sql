-- Run this SQL once in your Supabase Dashboard -> SQL Editor (Project: jfnrfjziviqxndsxtupz)

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null,
  full_name text not null,
  phone text not null,
  email text not null,
  tour_package text not null,
  destination text not null,
  service text not null,
  travel_date date not null,
  travelers integer not null default 2 check (travelers >= 1 and travelers <= 40),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- Allow website visitors to submit booking requests (write-only for anon privacy)
drop policy if exists "Allow public booking inserts" on public.bookings;
create policy "Allow public booking inserts"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  trip_route text not null,
  quote text not null,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

-- Allow website visitors to read and submit testimonials
drop policy if exists "Allow public testimonial reads" on public.testimonials;
create policy "Allow public testimonial reads"
  on public.testimonials
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow public testimonial inserts" on public.testimonials;
create policy "Allow public testimonial inserts"
  on public.testimonials
  for insert
  to anon, authenticated
  with check (true);
