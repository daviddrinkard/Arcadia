import { FETCH_REVIEWS_URL } from "./services";
import type { Review } from "./types";

// Pull a location's reviews from the Fetch-Reviews microservice. That service
// owns the Supabase read and returns a bare array of review rows.
export async function fetchReviewsByLocation(
  locationId: number,
): Promise<Review[]> {
  const res = await fetch(
    `${FETCH_REVIEWS_URL}/reviews/location/${locationId}`,
  );
  if (!res.ok) {
    throw new Error(`Fetch-Reviews service responded ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? (data as Review[]) : [];
}
