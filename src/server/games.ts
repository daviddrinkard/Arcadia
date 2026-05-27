import { supabase } from "@/lib/supabase";
import type { Game } from "./types";

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
