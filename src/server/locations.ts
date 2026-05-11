import { supabase } from "@/lib/supabase";
import type { Location } from "./types";

const LOCATION_COLUMNS =
  "location_id, name, street_address, city, state, zip" as const;

export async function listLocations(
  opts: { state?: string } = {},
): Promise<Location[]> {
  let query = supabase
    .from("locations")
    .select(LOCATION_COLUMNS)
    .order("name", { ascending: true });

  if (opts.state) query = query.eq("state", opts.state);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to list locations: ${error.message}`);
  return data ?? [];
}
