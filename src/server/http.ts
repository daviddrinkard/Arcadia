import type { NextApiResponse } from "next";

// Next gives us req.query values as string | string[] | undefined (arrays come
// from repeated keys like ?tag=a&tag=b). For scalar params, take the first.
export function pickStringQuery(
  value: string | string[] | undefined,
): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export function methodNotAllowed(
  res: NextApiResponse,
  method: string | undefined,
  allowed: readonly string[],
) {
  res.setHeader("Allow", allowed.join(", "));
  return res
    .status(405)
    .json({ error: `Method ${method ?? "UNKNOWN"} not allowed` });
}
