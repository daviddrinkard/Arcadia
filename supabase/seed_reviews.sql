-- =============================================================================
-- Arcadia — dummy reviews seed (DEVELOPMENT ONLY)
--
-- Generates a pool of fake auth users and a realistic spread of lorem-ipsum
-- reviews across roughly half of the seeded locations. Of the locations that
-- get reviews, most have 3–4 and about 1 in 6 is "busy" with 21–30.
--
-- PREREQUISITES (run in order):
--   1. migrations 0001–0004
--   2. seed_locations.sql   — provides the location_ids these reviews point at
--   3. this file
--
-- !!  WRITES TO THE auth SCHEMA. reviews.user_id is a NOT NULL FK to
--     public.profiles → auth.users, and there is no other way to satisfy it,
--     so this inserts fake rows into auth.users. The on_auth_user_created
--     trigger then auto-creates a matching public.profiles row for each.
--     Intended for LOCAL / DEV databases only — never run against real auth
--     data.
--
-- Idempotent: wipes prior reviews and re-creates the dummy reviewers each run.
-- Dummy users are tagged by their @arcadia.example email, so any real users in
-- the DB are left untouched.
--
-- Run it whole (it is wrapped in a single transaction). Note: if your Postgres
-- / GoTrue version still declares the auth.users token columns NOT NULL without
-- a default (older Supabase), add `confirmation_token, recovery_token,
-- email_change_token_new, email_change` to the INSERT below, each set to ''.
-- =============================================================================

BEGIN;

-- 1. Reset --------------------------------------------------------------------
-- Clear reviews, then drop any dummy reviewers left over from a previous run
-- (this cascades to their profiles; their reviews were just truncated anyway).
TRUNCATE TABLE public.reviews RESTART IDENTITY;
DELETE FROM auth.users WHERE email LIKE 'reviewer%@arcadia.example';

-- 2. Reviewer pool ------------------------------------------------------------
-- 40 fake users — more than the 30-review cap, so every review at a location
-- can come from a distinct reviewer. The on_auth_user_created trigger fills in
-- a matching public.profiles row for each; step 3 reads them back from there.
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'reviewer' || g || '@arcadia.example',
  -- Non-functional placeholder hash; these users never authenticate.
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('user_name', 'Reviewer ' || g),
  now(),
  now()
FROM generate_series(1, 40) AS g;

-- 3. Reviews ------------------------------------------------------------------
INSERT INTO public.reviews (location_id, user_id, rating, review_text, created_at)
WITH loc_counts AS (
  -- ~half the locations get reviews; of those, ~1 in 6 is busy (21–30), the
  -- rest get 3–4.
  SELECT
    location_id,
    CASE
      WHEN random() < 0.16 THEN 21 + floor(random() * 10)::int  -- 21–30
      ELSE                       3  + floor(random() * 2)::int   -- 3–4
    END AS review_count
  FROM public.locations
  WHERE random() < 0.5
),
reviewers AS (
  -- The 40 profiles the trigger just created, identified precisely by their
  -- tagged email so no real users get pulled in.
  SELECT p.user_id, row_number() OVER (ORDER BY p.user_id) AS rn
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.user_id
  WHERE u.email LIKE 'reviewer%@arcadia.example'
),
reviewer_count AS (
  SELECT count(*)::int AS n FROM reviewers
),
expanded AS (
  -- One row per review-to-be.
  SELECT lc.location_id, gs.seq
  FROM loc_counts lc
  CROSS JOIN LATERAL generate_series(1, lc.review_count) AS gs(seq)
),
lorem(sentences) AS (
  SELECT ARRAY[
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.',
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
    'Quis autem vel eum iure reprehenderit qui in ea voluptate velit.',
    'At vero eos et accusamus et iusto odio dignissimos ducimus.',
    'Et harum quidem rerum facilis est et expedita distinctio.',
    'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
    'Temporibus autem quibusdam et aut officiis debitis aut rerum.',
    'Itaque earum rerum hic tenetur a sapiente delectus reiciendis.',
    'Maecenas ligula massa, varius a, semper congue, euismod non mi.'
  ]
)
SELECT
  e.location_id,
  r.user_id,
  -- Random rating in 0.5 steps across the full 1.0–5.0 range.
  (round((1 + random() * 4) * 2) / 2)::numeric(2, 1) AS rating,
  -- 2–4 random sentences from the pool, joined into one blurb.
  (
    SELECT string_agg(s, ' ')
    FROM (
      SELECT lorem.sentences[1 + floor(random() * array_length(lorem.sentences, 1))::int] AS s
      FROM generate_series(1, 2 + floor(random() * 3)::int)
    ) picked
  ) AS review_text,
  -- Spread over the past ~2 years.
  now() - (random() * interval '730 days') AS created_at
FROM expanded e
CROSS JOIN reviewer_count rc
CROSS JOIN lorem
JOIN reviewers r
  -- Distinct reviewer per review within a location (review_count <= 30 < 40);
  -- the location-based offset varies which reviewers each location draws.
  ON r.rn = ((e.location_id * 7 + e.seq) % rc.n) + 1;

COMMIT;
