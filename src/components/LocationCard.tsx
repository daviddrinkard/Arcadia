import { useEffect, useState } from "react";
import ArcadeButton from "./ArcadeButton";
import { averageRating } from "@/lib/ratings";
import type { Review } from "@/server/types";

type LocationCardProps = {
  id: number;
  name: string;
  location: string;
};

// A location list card that fetches its own reviews from the Fetch-Reviews
// microservice (via the API proxy) and derives an average star rating + count.
//
// Note: this is one request per card, so a list of N locations makes N calls.
// Not ideal, but acceptable for this project — the microservice only exposes a
// per-location endpoint.
export default function LocationCard({ id, name, location }: LocationCardProps) {
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/locations/${id}/reviews`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { reviews: Review[] } = await res.json();
        if (cancelled) return;

        setCount(data.reviews.length);
        setRating(averageRating(data.reviews));
      } catch {
        // Service unreachable / no reviews — leave the defaults (0 / 0).
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <ArcadeButton
      id={id}
      name={name}
      location={location}
      reviews={count}
      rating={rating}
    />
  );
}
