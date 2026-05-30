import { USER_COOKIE } from "@/lib/user";
import { methodNotAllowed } from "@/server/http";
import { listLikedLocations } from "@/server/locations";
import type { Location } from "@/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = { locations: Location[] };
type ErrorResponse = { error: string };

// GET /api/liked-locations — the current user's liked locations, read straight
// from the relation table (no microservice). "Current user" is the fake-auth
// cookie, resolved server-side.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== "GET") return methodNotAllowed(res, req.method, ["GET"]);

  const userId = req.cookies[USER_COOKIE];
  if (!userId) {
    return res.status(401).json({ error: "no user cookie" });
  }

  try {
    const locations = await listLikedLocations(userId);
    return res.status(200).json({ locations });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}
