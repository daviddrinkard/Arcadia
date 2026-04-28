import ArcadeButton from "../components/ArcadeButton";

const games = [
  { name: "Street Fighter III", genre: "Fighting", id: 1 },
  { name: "Street Fighter IV", genre: "Fighting", id: 2 },
  { name: "Street Fighter V", genre: "Fighting", id: 3 },
  { name: "Street Fighter VI", genre: "Fighting", id: 4 },
  { name: "Street Fighter VII", genre: "Fighting", id: 5 },
  { name: "Street Fighter VIII", genre: "Fighting", id: 6 },
];

const arcades = [
  { id: 1, name: "Dave's Arcade", location: "Atlanta, GA", reviews: 100 },
  { id: 2, name: "John's Arcade", location: "New York, NY", reviews: 200 },
  { id: 3, name: "Jane's Arcade", location: "Los Angeles, CA", reviews: 300 },
];

export default function GameList() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/4 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        {games.map((game) => (
          <LeftMenuItem key={game.name} title={game.name} />
        ))}
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden pl-4">
        <div className="shrink-0 border-b border-gray-300 pb-2">
          <p>Game Title</p>
          <p>Genre</p>
          <p>Description</p>
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
      </div>
    </div>
  );
}

function LeftMenuItem({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white"
    >
      {title}
    </div>
  );
}
