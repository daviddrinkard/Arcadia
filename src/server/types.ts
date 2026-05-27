// Shared server-side data shapes. Mirrors the DB row shapes from the
// public.* tables. Frontend consumers will see these as JSON over the API.

export type Location = {
  location_id: number;
  name: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
};

// A review row as returned by the Fetch-Reviews microservice. Note the
// camelCase keys — they come straight from that service's response shape, not
// from this app's snake_case Supabase columns.
export type Review = {
  reviewId: number;
  locationId: number;
  userId: string;
  rating: number | null;
  reviewText: string | null;
};

// A location that has a given game, joined through public.gamelist.
// A trimmed subset of Location — just what the games-list arcade cards render.
export type GameLocation = {
  location_id: number;
  name: string | null;
  city: string | null;
  state: string | null;
};

export type Game = {
  game_id: number;
  game_name: string | null;
  game_genre: string | null;
  game_description: string | null;
  game_year: string | null;
  game_region: string | null;
  game_platform: string | null;
  game_series: string | null;
  game_manufacturer: string | null;
  game_players: string | null;
};
