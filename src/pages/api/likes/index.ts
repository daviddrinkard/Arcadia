import { USER_COOKIE } from "@/lib/user";
import { methodNotAllowed, pickStringQuery } from "@/server/http";
import { getLikeStatus, setLike } from "@/server/likes";
import type { NextApiRequest, NextApiResponse } from "next";

type LikedResponse = { liked: boolean };
type ErrorResponse = { error: string };

// GET  /api/likes?locationId=  -> is the current user's like set for a location?
// POST /api/likes  body { locationId } -> set the current user's like.
// "Current user" is the fake-auth cookie; we read it server-side and forward it
// to the Likes microservice so the id never has to be passed by the client.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikedResponse | ErrorResponse>,
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return methodNotAllowed(res, req.method, ["GET", "POST"]);
  }

  const userId = req.cookies[USER_COOKIE];
  if (!userId) {
    return res.status(401).json({ error: "no user cookie" });
  }

  const rawLocationId =
    req.method === "GET"
      ? pickStringQuery(req.query.locationId)
      : (req.body?.locationId as unknown);
  const locationId = Number(rawLocationId);
  if (!Number.isInteger(locationId) || locationId <= 0) {
    return res
      .status(400)
      .json({ error: "locationId must be a positive integer" });
  }

  try {
    if (req.method === "POST") {
      await setLike(userId, locationId);
      return res.status(200).json({ liked: true });
    }
    const liked = await getLikeStatus(userId, locationId);
    return res.status(200).json({ liked });
  } catch (e) {
    // The microservice is a separate process; surface its unavailability as a
    // 502 rather than a generic 500.
    return res.status(502).json({ error: (e as Error).message });
  }
}
