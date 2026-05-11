import { methodNotAllowed, pickStringQuery } from "@/server/http";
import { getLocation } from "@/server/locations";
import type { Location } from "@/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = { location: Location };
type ErrorResponse = { error: string };

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
    const location = await getLocation(id);
    return res.status(200).json({ location });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}
