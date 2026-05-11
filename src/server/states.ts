import { supabase } from "@/lib/supabase";

// Returns the distinct set of states that currently have at least one location.
// Data-driven (no static list to keep in sync) — auto-updates as locations grow.
export async function listStatesWithLocations(): Promise<string[]> {
  const { data, error } = await supabase
    .from("locations")
    .select("state")
    .not("state", "is", null)
    .order("state", { ascending: true });

  if (error) throw new Error(`Failed to list states: ${error.message}`);

  // PostgREST doesn't return DISTINCT directly; dedupe here.
  return Array.from(new Set((data ?? []).map((r) => r.state as string)));
}
