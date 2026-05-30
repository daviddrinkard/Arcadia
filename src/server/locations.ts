import { supabase } from "@/lib/supabase";
import type { Location } from "./types";

const LOCATION_COLUMNS =
  "location_id, name, street_address, city, state, zip, phone, email" as const;

export async function listLocations(
  opts: { state?: string } = {},
): Promise<Location[]> {
  const { data, error } = await supabase
    .from("locations")
    .select(LOCATION_COLUMNS)
    .eq("state", opts.state)
    .order("name", { ascending: true });

  if (error) throw new Error(`Failed to list locations: ${error.message}`);
  return data ?? [];
}

// Fetch several locations at once by id. Used to flesh out the bare ids the
// Top-Locations microservice returns into renderable cards.
export async function getLocationsByIds(ids: number[]): Promise<Location[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from("locations")
    .select(LOCATION_COLUMNS)
    .in("location_id", ids);

  if (error) throw new Error(`Failed to get locations: ${error.message}`);
  return data ?? [];
}

// The join table the Likes microservice writes to: (user_id uuid, location_id
// int). The dashboard reads it directly (no microservice) to list a user's
// liked locations.
const LIKES_TABLE = "user_liked_locations";

// List the locations a user has liked. Reads the relation table for the user's
// liked location ids, then fetches those locations. Returns [] when none.
export async function listLikedLocations(userId: string): Promise<Location[]> {
  const { data, error } = await supabase
    .from(LIKES_TABLE)
    .select("location_id")
    .eq("user_id", userId);

  if (error) throw new Error(`Failed to list liked locations: ${error.message}`);

  const ids = (data ?? []).map((row) => row.location_id as number);
  return getLocationsByIds(ids);
}

export async function getLocation(id: number): Promise<Location> {
  const { data, error } = await supabase
    .from("locations")
    .select(LOCATION_COLUMNS)
    .eq("location_id", id)
    .single();

  if (error) throw new Error(`Failed to get location: ${error.message}`);
  return data;
}
