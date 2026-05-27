import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArcadeButton from "@/components/ArcadeButton";
import type { Game, GameLocation } from "@/server/types";

// Seed names include trailing region/revision tags, e.g. "1942 (Rev A)" or
// "... [hb]". Strip from the first '(' or '[' for the left-rail display only —
// the detail panel still shows the full stored name.
const displayName = (name: string | null) =>
  (name ?? "(unnamed)").replace(/\s*[([].*$/, "").trim() || "(unnamed)";

// "City, ST" for the arcade card, tolerating missing parts.
const locationLabel = (loc: GameLocation) =>
  [loc.city, loc.state].filter(Boolean).join(", ");

export default function GameList() {
  const router = useRouter();
  const idParam =
    typeof router.query.id === "string" ? router.query.id : undefined;
  const selectedId = idParam ? Number(idParam) : undefined;

  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [game, setGame] = useState<Game | null>(null);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState<string | null>(null);

  const [locations, setLocations] = useState<GameLocation[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/games");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { games: Game[] } = await res.json();
        if (!cancelled) setGames(data.games);
      } catch (e) {
        if (!cancelled) setGamesError((e as Error).message);
      } finally {
        if (!cancelled) setGamesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!router.isReady || selectedId === undefined) {
      setGame(null);
      return;
    }
    let cancelled = false;
    (async () => {
      setGameLoading(true);
      setGameError(null);
      try {
        const res = await fetch(`/api/games/${selectedId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { game: Game } = await res.json();
        if (!cancelled) setGame(data.game);
      } catch (e) {
        if (!cancelled) setGameError((e as Error).message);
      } finally {
        if (!cancelled) setGameLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, selectedId]);

  useEffect(() => {
    if (!router.isReady || selectedId === undefined) {
      setLocations([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLocationsLoading(true);
      setLocationsError(null);
      try {
        const res = await fetch(`/api/games/${selectedId}/locations`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { locations: GameLocation[] } = await res.json();
        if (!cancelled) setLocations(data.locations);
      } catch (e) {
        if (!cancelled) setLocationsError((e as Error).message);
      } finally {
        if (!cancelled) setLocationsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, selectedId]);

  const handleGameClick = (id: number) => {
    router.push(`/gamelist?id=${id}`);
  };

  // Case-insensitive substring match on the full stored name, so "stre"
  // matches both "Street Fighter" and "Fighting Street".
  const q = query.trim().toLowerCase();
  const filteredGames = q
    ? games.filter((g) => (g.game_name ?? "").toLowerCase().includes(q))
    : games;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/4 min-h-0 min-w-0 shrink-0 flex-col border-r border-gray-300 pr-4">
        {/* mb-0 cancels the global `input { margin-bottom: 16px }` base rule;
            its phantom bottom margin otherwise enlarges the input's flex margin
            box and pushes the clear button below center. Spacing below the box
            comes from the wrapper's mb-2 instead. */}
        <div className="mb-2 flex shrink-0 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter games…"
            className="mb-0 w-full min-w-0 rounded border border-gray-300 py-1 pl-2 pr-7 text-sm focus:border-pink-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear filter"
              className="-ml-7 flex w-7 shrink-0 items-center justify-center text-gray-400 hover:text-gray-700"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M6 6l8 8M14 6l-8 8" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex min-h-0 flex-col overflow-y-auto">
          {gamesLoading && (
            <div className="px-2 py-1 text-gray-500">Loading games…</div>
          )}
          {gamesError && (
            <div className="px-2 py-1 text-red-600">
              Failed to load games: {gamesError}
            </div>
          )}
          {!gamesLoading && !gamesError && filteredGames.length === 0 && (
            <div className="px-2 py-1 text-gray-500">No games match “{query}”.</div>
          )}
          {!gamesLoading &&
            !gamesError &&
            filteredGames.map((g) => (
              <LeftMenuItem
                key={g.game_id}
                id={g.game_id}
                title={displayName(g.game_name)}
                selected={g.game_id === selectedId}
                onClick={handleGameClick}
              />
            ))}
        </div>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden pl-4">
        {selectedId === undefined && (
          <div className="p-4 text-gray-500">
            Select a game from the list to see its details.
          </div>
        )}
        {selectedId !== undefined && gameLoading && (
          <div className="p-4 text-gray-500">Loading game…</div>
        )}
        {selectedId !== undefined && gameError && (
          <div className="p-4 text-red-600">
            Failed to load game: {gameError}
          </div>
        )}
        {selectedId !== undefined && !gameLoading && !gameError && game && (
          <>
            <div className="shrink-0 border-b border-gray-300 pb-2">
              <p className="text-2xl font-bold">{game.game_name}</p>
              <p className="text-sm text-gray-600">{game.game_genre}</p>
              <p className="pt-2">{game.game_description}</p>
            </div>
            <p className="shrink-0">Arcades with this game:</p>
            <div className="grid min-h-0 w-full flex-1 auto-rows-min grid-cols-1 content-start gap-4 overflow-y-auto sm:grid-cols-2">
              {locationsLoading && (
                <div className="text-gray-500">Loading arcades…</div>
              )}
              {locationsError && (
                <div className="text-red-600">
                  Failed to load arcades: {locationsError}
                </div>
              )}
              {!locationsLoading &&
                !locationsError &&
                locations.length === 0 && (
                  <div className="text-gray-500">
                    No arcades list this game yet.
                  </div>
                )}
              {!locationsLoading &&
                !locationsError &&
                locations.map((loc) => (
                  <ArcadeButton
                    key={loc.location_id}
                    id={loc.location_id}
                    name={loc.name ?? "(unnamed)"}
                    location={locationLabel(loc)}
                    reviews={0}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LeftMenuItem({
  id,
  title,
  selected,
  onClick,
}: {
  id: number;
  title: string;
  selected?: boolean;
  onClick: (id: number) => void;
}) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white ${
        selected ? "bg-pink-500 text-white" : ""
      }`}
    >
      {title}
    </div>
  );
}
