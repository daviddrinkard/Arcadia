import type { NextApiRequest, NextApiResponse } from "next";
import { listGames } from "@/server/games";
import { methodNotAllowed } from "@/server/http";
import type { Game } from "@/server/types";

type SuccessResponse = { games: Game[] };
type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== "GET") return methodNotAllowed(res, req.method, ["GET"]);

  try {
    const games = await listGames();
    return res.status(200).json({ games });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}
