import ArcadeButton from "@/components/ArcadeButton";
import Button from "@/components/Button";
import GameButton from "@/components/GameButton";

export default function Dashboard() {
  const games = [
    { name: "Street Fighter III", genre: "Fighting", id: 1 },
    { name: "Street Fighter IV", genre: "Fighting", id: 2 },
    { name: "Street Fighter V", genre: "Fighting", id: 3 },
    { name: "Street Fighter VI", genre: "Fighting", id: 4 },
    { name: "Street Fighter VII", genre: "Fighting", id: 5 },
    { name: "Street Fighter VIII", genre: "Fighting", id: 6 },
  ];

  const arcades = [
    {
      name: "Dave's Arcade",
      location: "Atlanta, GA",
      reviews: 100,
      id: 1,
    },
    {
      name: "John's Arcade",
      location: "New York, NY",
      reviews: 200,
      id: 2,
    },
    {
      name: "Jane's Arcade",
      location: "Los Angeles, CA",
      reviews: 300,
      id: 3,
    },
    { name: "Jim's Arcade", location: "Chicago, IL", reviews: 400, id: 4 },
    {
      name: "Jill's Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
    { name: "Jack's Arcade", location: "Miami, FL", reviews: 600, id: 6 },
    { name: "Jill's Arcade", location: "Houston, TX", reviews: 500 },
    {
      name: "Jill's Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 8,
    },
    {
      name: "Jill's Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 9,
    },
    {
      name: "Jill's Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 10,
    },
  ];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center">
          <p className="text-2xl font-bold pb-4">Add Location</p>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Phone Number" />
          <input type="email" placeholder="Email (Optional)" />
          <Button onClick={() => {}} variant="secondary">
            Add Location
          </Button>
        </div>
      </div>
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-2">
          <p className="text-2xl font-bold pb-4">My Locations</p>
          {arcades.map((arcade, index) => (
            <ArcadeButton
              key={arcade.id ?? `arcade-${index}`}
              id={arcade.id ?? index}
              name={arcade.name}
              location={arcade.location ?? ""}
              reviews={arcade.reviews ?? 0}
            />
          ))}
        </div>
      </div>
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-2">
          <p className="text-2xl font-bold pb-4">My Games</p>
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
  );
}
