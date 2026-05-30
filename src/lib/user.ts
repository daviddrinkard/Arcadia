// Fake auth: instead of a real login/user system, we identify "the current
// user" by a cookie we drop on first visit. Every like (and any future
// per-user microservice call) is keyed off this id.

export const USER_COOKIE = "arcadiaUserId";

// The single hard-coded user we pretend is always logged in.
const FAKE_USER_ID = "b964cd05-7cc6-4d43-9988-b5b27ff28422";

// One year, in seconds.
const ONE_YEAR = 60 * 60 * 24 * 365;

// Read a cookie value by name (client-side only). Returns undefined if absent.
export function getUserId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${USER_COOKIE}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : undefined;
}

// Ensure the user-id cookie exists, setting it to the fake user on first visit.
// Safe to call on every mount — it only writes when the cookie is missing.
export function ensureUserCookie(): void {
  if (typeof document === "undefined") return;
  if (getUserId()) return;
  document.cookie = `${USER_COOKIE}=${FAKE_USER_ID}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}
