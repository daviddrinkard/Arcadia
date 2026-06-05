import Button from "@/components/Button";
import GameButton from "@/components/GameButton";
import LikeButton from "@/components/LikeButton";
import ReviewBlock from "@/components/ReviewBlock";
import Stars from "@/components/Stars";
import WarnModal from "@/components/WarnModal";
import { averageRating } from "@/lib/ratings";
import type { Location, LocationGame, Review } from "@/server/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Location() {
  const router = useRouter();
  const raw = router.query.id;
  const id = raw === undefined ? undefined : Array.isArray(raw) ? raw[0] : raw;
  const [showModal, setModal] = useState(false);
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [games, setGames] = useState<LocationGame[]>([]);

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

  // Reviews come from the Fetch-Reviews microservice (proxied through the API
  // route). Best-effort: if the service is down we just show no reviews.
  useEffect(() => {
    if (!router.isReady || id === undefined) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/locations/${id}/reviews`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { reviews: Review[] } = await res.json();
        if (!cancelled) setReviews(data.reviews);
      } catch {
        if (!cancelled) setReviews([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, id]);

  // Games available at this location, from public.gamelist via the API route.
  useEffect(() => {
    if (!router.isReady || id === undefined) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/locations/${id}/games`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { games: LocationGame[] } = await res.json();
        if (!cancelled) setGames(data.games);
      } catch {
        if (!cancelled) setGames([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, id]);

  const alertUser = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
    console.log("This thing is workin.");
  };

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
              <div className="flex flex-row items-center gap-3">
                <p className="text-3xl font-bold">{locationData.name}</p>
                <LikeButton locationId={locationData.location_id} />
              </div>
              <div className="flex flex-col text-sm">
                <p>{locationData.street_address}</p>
                <p>
                  {locationData.city}, {locationData.state} {locationData.zip}
                </p>
                <p>{locationData.phone}</p>
                <p>{locationData.email}</p>
              </div>
              <div className="flex flex-row items-center gap-2 pt-4">
                <span>Rating:</span>
                <Stars rating={averageRating(reviews)} />
              </div>
            </div>

            {/* Reviews — sourced from the Fetch-Reviews microservice. */}
            <div className="flex flex-col m-2 gap-2 overflow-y-auto">
              {reviews.length === 0 && (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
              {reviews.map((review) => (
                <ReviewBlock
                  key={review.reviewId}
                  rating={review.rating ?? 0}
                  review={review.reviewText ?? ""}
                  id={review.reviewId}
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
              {games.length === 0 && (
                <p className="text-sm text-gray-500">No games listed yet.</p>
              )}
              {games.map((game) => (
                <GameButton
                  key={game.game_id}
                  id={game.game_id}
                  name={game.game_name ?? "Unknown"}
                  genre={game.game_genre ?? "Unknown"}
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
