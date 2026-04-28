import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../components/Button";
import GameButton from "../components/GameButton";

export default function Location() {
  const router = useRouter();
  const raw = router.query.id;
  const id = raw === undefined ? undefined : Array.isArray(raw) ? raw[0] : raw;

  const games = [
    { name: "Street Fighter III", genre: "Fighting", id: 1 },
    { name: "Street Fighter IV", genre: "Fighting", id: 2 },
    { name: "Street Fighter V", genre: "Fighting", id: 3 },
    { name: "Street Fighter VI", genre: "Fighting", id: 4 },
    { name: "Street Fighter VII", genre: "Fighting", id: 5 },
    { name: "Street Fighter VIII", genre: "Fighting", id: 6 },
  ];

  useEffect(() => {
    if (!router.isReady || id === undefined) return;
    // fetch locations when you wire the API
  }, [router.isReady, id]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4">
      <div className="flex flex-row items-center pb-4">
        <Button url="/" variant="secondary">
          Locations
        </Button>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-row">
        <div className="w-1/2 min-h-0 border-r border-gray-300">Left Side</div>
        <div className="flex w-1/2 min-h-0 min-w-0 flex-col gap-2 overflow-hidden pl-2">
          <div className="w-full shrink-0">
            <p className="text-lg font-bold">Available Games:</p>
          </div>
          <div className="grid min-h-0 w-full flex-1 auto-rows-min grid-cols-2 content-start gap-3 overflow-y-auto">
            {games.map((game) => (
              <GameButton
                key={game.name}
                id={game.id}
                name={game.name}
                genre={game.genre}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
