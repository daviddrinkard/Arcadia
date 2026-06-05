import { supabase } from "@/lib/supabase";
import type { Game, GameLocation, LocationGame } from "./types";

const GAME_COLUMNS =
  "game_id, game_name, game_genre, game_description, game_year, game_region, game_platform, game_series, game_manufacturer, game_players" as const;

export async function listGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from("games")
    .select(GAME_COLUMNS)
    .order("game_name", { ascending: true });

  if (error) throw new Error(`Failed to list games: ${error.message}`);
  return data ?? [];
}

export async function getGame(id: number): Promise<Game> {
  const { data, error } = await supabase
    .from("games")
    .select(GAME_COLUMNS)
    .eq("game_id", id)
    .single();

  if (error) throw new Error(`Failed to get game: ${error.message}`);
  return data;
}

// Locations that carry a given game, resolved through the public.gamelist
// join table. Returns [] when no arcade lists the game (the current state,
// since gamelist isn't seeded yet).
export async function listLocationsForGame(
  gameId: number,
): Promise<GameLocation[]> {
  const { data, error } = await supabase
    .from("gamelist")
    .select("locations(location_id, name, city, state)")
    .eq("game_id", gameId);

  if (error) {
    throw new Error(`Failed to list locations for game: ${error.message}`);
  }

  // Each gamelist row embeds its single related location (FK is to-one).
  // Untyped client, so normalize defensively and drop any nulls.
  return (data ?? [])
    .flatMap((row) => {
      const loc = (row as { locations: GameLocation | GameLocation[] | null })
        .locations;
      return Array.isArray(loc) ? loc : loc ? [loc] : [];
    });
}

// Games available at a given location, resolved through the public.gamelist
// join table. The inverse of listLocationsForGame. Returns [] when the
// location has no games.
export async function listGamesForLocation(
  locationId: number,
): Promise<LocationGame[]> {
  const { data, error } = await supabase
    .from("gamelist")
    .select("games(game_id, game_name, game_genre)")
    .eq("location_id", locationId);

  if (error) {
    throw new Error(`Failed to list games for location: ${error.message}`);
  }

  // Each gamelist row embeds its single related game (FK is to-one).
  // Untyped client, so normalize defensively and drop any nulls.
  return (data ?? [])
    .flatMap((row) => {
      const game = (row as { games: LocationGame | LocationGame[] | null })
        .games;
      return Array.isArray(game) ? game : game ? [game] : [];
    })
    .sort((a, b) => (a.game_name ?? "").localeCompare(b.game_name ?? ""));
}
