import { getLocationsByIds } from "./locations";
import { TOP_LOCATIONS_URL } from "./services";
import type { TopArcade, TopLocation } from "./types";

// Pull the top-ranked locations from the Top-Locations microservice (it returns
// a bare array of ids + aggregate scores), then enrich each with the name and
// city/state from our own DB so the Top Arcades cards have something to render.
// Ranking order from the service is preserved.
export async function fetchTopArcades(): Promise<TopArcade[]> {
  const res = await fetch(`${TOP_LOCATIONS_URL}/api/top-locations`);
  if (!res.ok) {
    throw new Error(`Top-Locations service responded ${res.status}`);
  }
  const data = await res.json();
  const ranked: TopLocation[] = Array.isArray(data) ? data : [];

  const locations = await getLocationsByIds(ranked.map((r) => r.locationId));
  const byId = new Map(locations.map((l) => [l.location_id, l]));

  return ranked.map((r) => {
    const loc = byId.get(r.locationId);
    const city = loc?.city ?? null;
    const state = loc?.state ?? null;
    return {
      id: r.locationId,
      name: loc?.name ?? `Location #${r.locationId}`,
      location: [city, state].filter(Boolean).join(", "),
      reviews: r.reviewCount,
      rating: r.averageRating,
    };
  });
}
