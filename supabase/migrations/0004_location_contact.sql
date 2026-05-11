-- =============================================================================
-- Arcadia — extend public.locations with phone + email contact fields
--
-- Apply with `supabase db push` (or paste into the SQL Editor).
-- =============================================================================

ALTER TABLE public.locations
  ADD COLUMN phone varchar(20),
  ADD COLUMN email varchar(255);
