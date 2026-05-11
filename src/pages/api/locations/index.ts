import type { NextApiRequest, NextApiResponse } from "next";
import { listLocations } from "@/server/locations";
import { methodNotAllowed, pickStringQuery } from "@/server/http";
import type { Location } from "@/server/types";

type SuccessResponse = { locations: Location[] };
type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== "GET") return methodNotAllowed(res, req.method, ["GET"]);

  try {
    const locations = await listLocations({
      state: pickStringQuery(req.query.state),
    });
    return res.status(200).json({ locations });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}
