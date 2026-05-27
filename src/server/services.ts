// Base URLs for the local microservices the Arcadia app talks to.
//
// Each service runs as its own process on its own port during local dev. Calls
// are proxied server-side (through the Next API routes), never straight from
// the browser — that keeps the Add-Data api key off the client and sidesteps
// CORS (the Add-Data service doesn't send CORS headers).
//
// Override any of these per environment via the matching env var; the defaults
// match each service's documented local dev port.

// Fetch-Reviews microservice — GET /reviews/location/:locationId
export const FETCH_REVIEWS_URL =
  process.env.FETCH_REVIEWS_SERVICE_URL ?? "http://localhost:4000";

// Add-Data microservice — POST /add
export const ADD_DATA_URL =
  process.env.ADD_DATA_SERVICE_URL ?? "http://localhost:3000";

// Add-Data expects this in the `x-api-key` header.
export const ADD_DATA_API_KEY =
  process.env.ADD_DATA_SERVICE_API_KEY ?? "TEST-KEY-ABC123";
