-- =============================================================================
-- Arcadia — seed public.gamelist (games available at each location)
--
-- Gives every location a random selection of 10–20 games drawn from
-- public.games. Both the game count and the games themselves are random per
-- location, so each arcade ends up with a distinct lineup.
--
-- PREREQUISITES (run in order):
--   1. migrations 0001–0004
--   2. seed_deduped.sql     — provides the game_ids
--   3. seed_locations.sql   — provides the location_ids
--   4. this file
--
-- Idempotent: wipes any existing gamelist rows each run. No identity column
-- on gamelist (composite PK), so a plain TRUNCATE is enough.
--
-- Paste into the Supabase SQL Editor and run it whole.
-- =============================================================================

TRUNCATE TABLE public.gamelist;

INSERT INTO public.gamelist (location_id, game_id)
SELECT l.location_id, g.game_id
FROM public.locations l
CROSS JOIN LATERAL (
  -- Pick 10–20 random games for this location. The WHERE clause references
  -- the outer row, which forces Postgres to re-run the subquery (fresh
  -- shuffle, fresh count) for every location instead of caching one result.
  SELECT gm.game_id
  FROM public.games gm
  WHERE l.location_id IS NOT NULL
  ORDER BY random()
  LIMIT 10 + floor(random() * 11)::int
) g;

-- Sanity check: every location should land between 10 and 20 games.
-- SELECT min(n) AS min_games, max(n) AS max_games, count(*) AS locations
-- FROM (
--   SELECT location_id, count(*) AS n
--   FROM public.gamelist
--   GROUP BY location_id
-- ) per_location;
