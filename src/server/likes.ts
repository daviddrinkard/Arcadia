import { LIKES_URL } from "./services";

// Talk to the Likes microservice, which keys every like on (userId, locationId).
// The userId is our fake-auth cookie value, forwarded by the API-route proxy.

// Has this user liked this location?
export async function getLikeStatus(
  userId: string,
  locationId: number,
): Promise<boolean> {
  const res = await fetch(
    `${LIKES_URL}/api/likes/location/status?userId=${encodeURIComponent(userId)}&locationId=${locationId}`,
  );
  if (!res.ok) {
    throw new Error(`Likes service responded ${res.status}`);
  }
  const data = await res.json();
  return Boolean(data?.liked);
}

// Set (create) the like relation. The service upserts, so this is idempotent.
export async function setLike(
  userId: string,
  locationId: number,
): Promise<void> {
  const res = await fetch(`${LIKES_URL}/api/likes/location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, locationId }),
  });
  if (!res.ok) {
    throw new Error(`Likes service responded ${res.status}`);
  }
}
