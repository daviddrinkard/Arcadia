import type { NextApiRequest, NextApiResponse } from "next";
import { listLocations } from "@/server/locations";
import { addLocation, type NewLocation } from "@/server/addData";
import { methodNotAllowed, pickStringQuery } from "@/server/http";
import type { Location } from "@/server/types";

type GetResponse = { locations: Location[] };
type PostResponse = { accepted: true };
type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse | ErrorResponse>,
) {
  if (req.method === "GET") {
    try {
      const locations = await listLocations({
        state: pickStringQuery(req.query.state),
      });
      return res.status(200).json({ locations });
    } catch (e) {
      return res.status(500).json({ error: (e as Error).message });
    }
  }

  // POST creates a location via the Add-Data microservice.
  if (req.method === "POST") {
    try {
      const body = (req.body ?? {}) as NewLocation;
      await addLocation(body);
      // The service queues the write and acks immediately, so this is a 202
      // (accepted), not a 201 (created).
      return res.status(202).json({ accepted: true });
    } catch (e) {
      return res.status(502).json({ error: (e as Error).message });
    }
  }

  return methodNotAllowed(res, req.method, ["GET", "POST"]);
}
