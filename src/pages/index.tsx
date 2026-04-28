import ArcadeButton from "./components/ArcadeButton";

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
  { name: "Dave&apos;s Arcade", location: "Atlanta, GA", reviews: 100 },
  { name: "John&apos;s Arcade", location: "New York, NY", reviews: 200 },
  { name: "Jane&apos;s Arcade", location: "Los Angeles, CA", reviews: 300 },
  { name: "Jim&apos;s Arcade", location: "Chicago, IL", reviews: 400 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jack&apos;s Arcade", location: "Miami, FL", reviews: 600 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
  { name: "Jill&apos;s Arcade", location: "Houston, TX", reviews: 500 },
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
        {arcades.map((arcade) => (
          <ArcadeButton key={arcade.name} />
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
