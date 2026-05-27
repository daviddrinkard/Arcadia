import type { Review } from "@/server/types";

// Average of the numeric ratings in a list of reviews; 0 when none are numeric.
// (rating can arrive as a string from the numeric DB column, so coerce.)
export function averageRating(reviews: Review[]): number {
  const rated = reviews
    .map((r) => Number(r.rating))
    .filter((n) => Number.isFinite(n));
  return rated.length > 0
    ? rated.reduce((sum, n) => sum + n, 0) / rated.length
    : 0;
}
