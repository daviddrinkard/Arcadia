import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

type HealthResponse =
  | { status: "ok"; service: "arcadia-api"; supabase: "connected" }
  | { status: "error"; service: "arcadia-api"; supabase: "unreachable"; message: string };

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HealthResponse>,
) {
  const { error } = await supabase.auth.getSession();

  if (error) {
    return res.status(503).json({
      status: "error",
      service: "arcadia-api",
      supabase: "unreachable",
      message: error.message,
    });
  }

  res.status(200).json({
    status: "ok",
    service: "arcadia-api",
    supabase: "connected",
  });
}
