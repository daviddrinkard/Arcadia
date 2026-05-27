import { ADD_DATA_API_KEY, ADD_DATA_URL } from "./services";

// Fields the Add-Data service accepts for a location (all optional, mirrors its
// zod schema). The form currently collects a subset of these.
export type NewLocation = {
  name?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
};

// Hand a new location off to the Add-Data microservice. It validates and writes
// to Supabase asynchronously (the POST is queued via ZeroMQ), so a 2xx here
// means "accepted", not "persisted".
export async function addLocation(data: NewLocation): Promise<void> {
  const res = await fetch(`${ADD_DATA_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADD_DATA_API_KEY,
    },
    body: JSON.stringify({
      appId: "app-C",
      resourceType: "location",
      data,
    }),
  });
  if (!res.ok) {
    throw new Error(`Add-Data service responded ${res.status}`);
  }
}
