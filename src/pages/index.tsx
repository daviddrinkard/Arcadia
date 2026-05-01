import ArcadeButton from "@/components/ArcadeButton";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
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
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/4 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        {states.map((state) => (
          <LeftMenuItem key={state} state={state} />
        ))}
      </div>
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
    </div>
  );
}

function LeftMenuItem({
  state,
  onClick,
}: {
  state: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white"
    >
      {state}
    </div>
  );
}
