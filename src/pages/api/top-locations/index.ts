import { methodNotAllowed } from "@/server/http";
import { fetchTopArcades } from "@/server/topLocations";
import type { TopArcade } from "@/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = { topArcades: TopArcade[] };
type ErrorResponse = { error: string };

// GET /api/top-locations — proxies the Top-Locations microservice and enriches
// its ranked ids with location details for the Top Arcades tab.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== "GET") return methodNotAllowed(res, req.method, ["GET"]);

  try {
    const topArcades = await fetchTopArcades();
    return res.status(200).json({ topArcades });
  } catch (e) {
    // The microservice is a separate process; surface its unavailability as a
    // 502 rather than a generic 500.
    return res.status(502).json({ error: (e as Error).message });
  }
}
