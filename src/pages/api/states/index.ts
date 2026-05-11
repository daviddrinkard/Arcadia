import type { NextApiRequest, NextApiResponse } from "next";
import { listStatesWithLocations } from "@/server/states";
import { methodNotAllowed } from "@/server/http";

type SuccessResponse = { states: string[] };
type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  if (req.method !== "GET") return methodNotAllowed(res, req.method, ["GET"]);

  try {
    const states = await listStatesWithLocations();
    return res.status(200).json({ states });
  } catch (e) {
    return res.status(500).json({ error: (e as Error).message });
  }
}
