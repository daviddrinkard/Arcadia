import ArcadeButton from "@/components/ArcadeButton";
export default function TopArcades() {
  const arcades = [
    {
      name: "Dave&apos;s Arcade",
      location: "Atlanta, GA",
      reviews: 100,
      id: 1,
    },
    {
      name: "John&apos;s Arcade",
      location: "New York, NY",
      reviews: 200,
      id: 2,
    },
    {
      name: "Jane&apos;s Arcade",
      location: "Los Angeles, CA",
      reviews: 300,
      id: 3,
    },
    { name: "Jim&apos;s Arcade", location: "Chicago, IL", reviews: 400, id: 4 },
    {
      name: "Jill&apos;s Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
    {
      name: "Jill&apos;s Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
    {
      name: "Jill&apos;s Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
    {
      name: "Jill&apos;s Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
    {
      name: "Jill&apos;s Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
    {
      name: "Jill&apos;s Arcade",
      location: "Houston, TX",
      reviews: 500,
      id: 5,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-8">
        <p className="text-2xl font-bold">Top Arcades</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mx-8 w-3/4">
        {arcades.map((arcade, index) => (
          <ArcadeButton
            key={`${arcade.id}-${index}`}
            id={arcade.id}
            name={arcade.name}
            location={arcade.location}
            reviews={arcade.reviews}
          />
        ))}
      </div>
    </div>
  );
}
