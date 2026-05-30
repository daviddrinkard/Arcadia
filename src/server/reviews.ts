import { FETCH_REVIEWS_URL } from "./services";
import type { Review } from "./types";

// The service caps pageSize at 100; request the max so we exhaust a location's
// reviews in as few round trips as possible.
const MAX_PAGE_SIZE = 100;

type ReviewsPage = {
  reviews: Review[];
  totalCount: number;
};

// Fetch one page of a location's reviews from the microservice. A 404 means the
// location has no locations row, which we treat as "no reviews" rather than an
// outage. Returns the unwrapped rows plus the total so the caller can paginate.
async function fetchReviewsPage(
  locationId: number,
  page: number,
): Promise<ReviewsPage> {
  const res = await fetch(
    `${FETCH_REVIEWS_URL}/api/reviews?locationId=${locationId}&page=${page}&pageSize=${MAX_PAGE_SIZE}`,
  );
  if (res.status === 404) {
    return { reviews: [], totalCount: 0 };
  }
  if (!res.ok) {
    throw new Error(`Fetch-Reviews service responded ${res.status}`);
  }
  const data = await res.json();
  return {
    reviews: Array.isArray(data?.reviews) ? (data.reviews as Review[]) : [],
    totalCount: Number(data?.totalCount) || 0,
  };
}

// Pull *all* of a location's reviews from the Fetch-Reviews microservice. That
// service owns the Supabase read and returns a paginated envelope:
//   { reviews: Review[], totalCount, page, pageSize }
// Since the UI computes counts and averages over the full set, we walk every
// page (using totalCount to know when to stop) and concatenate the rows.
export async function fetchReviewsByLocation(
  locationId: number,
): Promise<Review[]> {
  const first = await fetchReviewsPage(locationId, 1);
  const all = [...first.reviews];

  const totalPages = Math.ceil(first.totalCount / MAX_PAGE_SIZE);
  for (let page = 2; page <= totalPages; page++) {
    const next = await fetchReviewsPage(locationId, page);
    if (next.reviews.length === 0) break; // defensive: avoid an unbounded loop
    all.push(...next.reviews);
  }

  return all;
}
