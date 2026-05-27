import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArcadeButton from "@/components/ArcadeButton";
import type { Game } from "@/server/types";

// Seed names include trailing region/revision tags, e.g. "1942 (Rev A)" or
// "... [hb]". Strip from the first '(' or '[' for the left-rail display only —
// the detail panel still shows the full stored name.
const displayName = (name: string | null) =>
  (name ?? "(unnamed)").replace(/\s*[([].*$/, "").trim() || "(unnamed)";

const arcades = [
  { id: 1, name: "Dave's Arcade", location: "Atlanta, GA", reviews: 100 },
  { id: 2, name: "John's Arcade", location: "New York, NY", reviews: 200 },
  { id: 3, name: "Jane's Arcade", location: "Los Angeles, CA", reviews: 300 },
];

export default function GameList() {
  const router = useRouter();
  const idParam =
    typeof router.query.id === "string" ? router.query.id : undefined;
  const selectedId = idParam ? Number(idParam) : undefined;

  const [games, setGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);

  const [game, setGame] = useState<Game | null>(null);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameError, setGameError] = useState<string | null>(null);

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

  const handleGameClick = (id: number) => {
    router.push(`/gamelist?id=${id}`);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/4 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        {gamesLoading && (
          <div className="px-2 py-1 text-gray-500">Loading games…</div>
        )}
        {gamesError && (
          <div className="px-2 py-1 text-red-600">
            Failed to load games: {gamesError}
          </div>
        )}
        {!gamesLoading &&
          !gamesError &&
          games.map((g) => (
            <LeftMenuItem
              key={g.game_id}
              id={g.game_id}
              title={displayName(g.game_name)}
              selected={g.game_id === selectedId}
              onClick={handleGameClick}
            />
          ))}
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
              {arcades.map((arcade) => (
                <ArcadeButton
                  key={arcade.id}
                  id={arcade.id}
                  name={arcade.name}
                  location={arcade.location}
                  reviews={arcade.reviews}
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
