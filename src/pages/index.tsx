import ArcadeButton from "@/components/ArcadeButton";
import { useRouter } from "next/router";

const states = [
  { state: "Alabama", id: 1 },
  { state: "Alaska", id: 2 },
  { state: "Arizona", id: 3 },
  { state: "Arkansas", id: 4 },
  { state: "California", id: 5 },
  { state: "Colorado", id: 6 },
  { state: "Connecticut", id: 7 },
  { state: "Delaware", id: 8 },
  { state: "Florida", id: 9 },
  { state: "Georgia", id: 10 },
  { state: "Hawaii", id: 11 },
  { state: "Idaho", id: 12 },
  { state: "Illinois", id: 13 },
  { state: "Indiana", id: 14 },
  { state: "Iowa", id: 15 },
  { state: "Kansas", id: 16 },
  { state: "Kentucky", id: 17 },
  { state: "Louisiana", id: 18 },
  { state: "Maine", id: 19 },
  { state: "Maryland", id: 20 },
  { state: "Massachusetts", id: 21 },
  { state: "Michigan", id: 22 },
  { state: "Minnesota", id: 23 },
  { state: "Mississippi", id: 24 },
  { state: "Missouri", id: 25 },
  { state: "Montana", id: 26 },
  { state: "Nebraska", id: 27 },
  { state: "Nevada", id: 28 },
  { state: "New Hampshire", id: 29 },
  { state: "New Jersey", id: 30 },
  { state: "New Mexico", id: 31 },
  { state: "New York", id: 32 },
  { state: "North Carolina", id: 33 },
  { state: "North Dakota", id: 34 },
  { state: "Ohio", id: 35 },
  { state: "Oklahoma", id: 36 },
  { state: "Oregon", id: 37 },
  { state: "Pennsylvania", id: 38 },
  { state: "Rhode Island", id: 39 },
  { state: "South Carolina", id: 40 },
  { state: "South Dakota", id: 41 },
  { state: "Tennessee", id: 42 },
  { state: "Texas", id: 43 },
  { state: "Utah", id: 44 },
  { state: "Vermont", id: 45 },
  { state: "Virginia", id: 46 },
  { state: "Washington", id: 47 },
  { state: "West Virginia", id: 48 },
  { state: "Wisconsin", id: 49 },
  { state: "Wyoming", id: 50 },
];

const arcades = [
  { name: "Dave's Arcade", location: "Atlanta, GA", reviews: 100, id: 1 },
  { name: "John's Arcade", location: "New York, NY", reviews: 200, id: 2 },
  {
    name: "Jane's Arcade",
    location: "Los Angeles, CA",
    reviews: 300,
    id: 3,
  },
  { name: "Jim's Arcade", location: "Chicago, IL", reviews: 400, id: 4 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 5 },
  { name: "Jack's Arcade", location: "Miami, FL", reviews: 600, id: 6 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 8 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 9 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 10 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 11 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 12 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 13 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 14 },
  { name: "Jill's Arcade", location: "Houston, TX", reviews: 500, id: 15 },
];
export default function Home() {
  const router = useRouter();
  const raw = router.query.id;

  const handleOnClick = (id: number) => {
    router.push(`/?id=${id}`);
  };

  //TODO: use the params to fetch the correct list of arcades per state.

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/4 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        {states.map((state) => (
          <LeftMenuItem
            key={state.id}
            id={state.id}
            state={state.state}
            onClick={handleOnClick}
          />
        ))}
      </div>
      {raw ? (
        <div className="grid min-h-0 min-w-0 flex-1 auto-rows-min grid-cols-1 content-start gap-4 overflow-y-auto pl-4 sm:grid-cols-2">
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
      ) : (
        <div className="w-full flex flex-col items-center p-4">
          <div className="p-8 border-b border-grey-300">
            <img src="images/Arcadia-black-large.svg" className="h-16" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <p className="text-xl font-bold">Welcome to Arcadia!</p>
            <p>
              Arcadia is a community-driven arcade enthusiast site where players
              can share information about their local arcades, in hopes of
              bringing in more players. Each location has reviews, ratings and
              game lists to give you an idea of what to expect when you visit!
            </p>
            <p>
              <span className="font-bold">
                To get started, select the state
              </span>{" "}
              you wish to browse to find a location near you! Not sure if you
              want to visit that location? Checkout the game list to see if
              there is something you must play, and then see what other players
              have said about the arcade.
            </p>
            <p>
              <span className="font-bold">
                Looking to play a specific game?
              </span>{" "}
              Click 'Find A Game' up top to search by game and find a location
              near you that features the game.
            </p>
            <p>
              <span className="font-bold">Want to contribute?</span> Register an
              account above to leave reviews, ratings, update game lists and{" "}
              <span className="font-bold">
                even add new locations to Arcadia.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function LeftMenuItem({
  state,
  id,
  onClick,
}: {
  state: string;
  id: number;
  onClick?: (id: number) => void;
}) {
  return (
    <div
      onClick={() => onClick?.(id)}
      className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white"
    >
      {state}
    </div>
  );
}
