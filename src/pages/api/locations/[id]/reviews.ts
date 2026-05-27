import { methodNotAllowed, pickStringQuery } from "@/server/http";
import { fetchReviewsByLocation } from "@/server/reviews";
import type { Review } from "@/server/types";
import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = { reviews: Review[] };
type ErrorResponse = { error: string };

// GET /api/locations/:id/reviews — proxies the Fetch-Reviews microservice.
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
    const reviews = await fetchReviewsByLocation(id);
    return res.status(200).json({ reviews });
  } catch (e) {
    // The microservice is a separate process; surface its unavailability as a
    // 502 rather than a generic 500.
    return res.status(502).json({ error: (e as Error).message });
  }
}
