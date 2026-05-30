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

export async function getLocation(id: number): Promise<Location> {
  const { data, error } = await supabase
    .from("locations")
    .select(LOCATION_COLUMNS)
    .eq("location_id", id)
    .single();

  if (error) throw new Error(`Failed to get location: ${error.message}`);
  return data;
}
