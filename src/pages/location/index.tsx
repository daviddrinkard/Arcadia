import Button from "@/components/Button";
import GameButton from "@/components/GameButton";
import ReviewBlock from "@/components/ReviewBlock";
import WarnModal from "@/components/WarnModal";
import type { Location } from "@/server/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Location() {
  const router = useRouter();
  const raw = router.query.id;
  const id = raw === undefined ? undefined : Array.isArray(raw) ? raw[0] : raw;
  const [showModal, setModal] = useState(false);
  const [locationData, setLocationData] = useState<Location | null>(null);

  useEffect(() => {
    if (!router.isReady || id === undefined) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/locations/${id}`);
      const data = await res.json();
      if (!cancelled) {
        setLocationData(data.location);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, id]);

  console.log("locationData:", locationData);

  const alertUser = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
    console.log("This thing is workin.");
  };

  const games = [
    { name: "Street Fighter III", genre: "Fighting", id: 1 },
    { name: "Street Fighter IV", genre: "Fighting", id: 2 },
    { name: "Street Fighter V", genre: "Fighting", id: 3 },
    { name: "Street Fighter VI", genre: "Fighting", id: 4 },
    { name: "Street Fighter VII", genre: "Fighting", id: 5 },
    { name: "Street Fighter VIII", genre: "Fighting", id: 6 },
  ];

  const reviews = [];

  if (locationData) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4">
        {showModal && <WarnModal onClick={() => setModal(false)} />}
        <div className="flex flex-row items-center pb-4">
          <Button url={`/?state=${locationData.state}`} variant="secondary">
            Locations
          </Button>
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-row">
          {/* Left Side */}
          <div className="w-1/2 min-h-0 border-r border-gray-300 flex flex-col">
            {/* Map */}
            <div className="h-40 bg-green-500 m-2 rounded-md items-center justify-center flex">
              Map Goes Here
            </div>

            {/* Name & Locations */}
            <div className="flex flex-col m-2">
              <p className="text-3xl font-bold">{locationData.name}</p>
              <div className="flex flex-col text-sm">
                <p>{locationData.street_address}</p>
                <p>
                  {locationData.city}, {locationData.state} {locationData.zip}
                </p>
                <p>{locationData.phone}</p>
                <p>{locationData.email}</p>
              </div>
              <div className="pt-4">Star Blocks Here XXXXX</div>
            </div>

            {/* Reviews - TODO: ADD REVIEWS HERE */}
            <div className="flex flex-col m-2 gap-2 overflow-y-auto">
              {reviews.map((review) => (
                <ReviewBlock
                  key={review.id}
                  rating={review.rating}
                  title={review.title}
                  review={review.review}
                  id={review.id}
                />
              ))}
            </div>
          </div>
          {/* Right Side */}
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
                  onClick={alertUser}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
