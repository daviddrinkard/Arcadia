-- =============================================================================
-- Arcadia — extend public.games with metadata fields from the seed CSV
--
-- Paste into the Supabase SQL Editor and run after 0001_init.sql.
-- =============================================================================

-- Widen game_name: CSV has names up to 77 chars (e.g. long Marvel vs. Capcom
-- variants with region/revision suffixes). 150 leaves headroom.
ALTER TABLE public.games
  ALTER COLUMN game_name TYPE varchar(150);

ALTER TABLE public.games
  ADD COLUMN game_year         varchar(10),
  ADD COLUMN game_region       varchar(45),
  ADD COLUMN game_platform     varchar(100),
  ADD COLUMN game_series       varchar(100),
  ADD COLUMN game_manufacturer varchar(100),
  ADD COLUMN game_players      varchar(45);
