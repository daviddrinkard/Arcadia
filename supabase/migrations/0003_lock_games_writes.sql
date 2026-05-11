-- =============================================================================
-- Arcadia — lock public.games to admin-only writes
--
-- Drops the permissive INSERT policy from 0001_init.sql. With RLS enabled and
-- no INSERT policy, the anon and authenticated roles cannot insert. The
-- service_role key bypasses RLS, so the seed and any future admin tooling
-- (Edge Functions, server-side scripts) still works.
--
-- Re-introduce a policy here when user-submitted games are added in a later
-- phase of the app.
--
-- Paste into the Supabase SQL Editor and run after 0002_games_columns.sql.
-- =============================================================================

DROP POLICY IF EXISTS games_insert_authed ON public.games;
