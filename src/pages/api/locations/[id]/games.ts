import { methodNotAllowed, pickStringQuery } from "@/server/http";
import { listGamesForLocation } from "@/server/games";
import type { LocationGame } from "@/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = { games: LocationGame[] };
type ErrorResponse = { error: string };

// GET /api/locations/:id/games — the games available at a location, via the
// public.gamelist join table.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== "GET") return methodNotAllowed(res, req.method, ["GET"]);

  try {
    const raw = pickStringQuery(req.query.id);
    const id = raw === undefined ? NaN : Number(raw);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "id must be an integer" });
    }
    const games = await listGamesForLocation(id);
    return res.status(200).json({ games });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}
