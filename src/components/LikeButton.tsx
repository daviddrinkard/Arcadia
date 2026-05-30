import { useEffect, useState } from "react";

// A "Like" button for a location. White by default, pink once liked. Reads and
// sets the like through the Likes microservice (proxied via /api/likes); the
// current user is the fake-auth cookie, resolved server-side by the proxy.
export default function LikeButton({ locationId }: { locationId: number }) {
  const [liked, setLiked] = useState(false);

  // Load the current like status on mount. Best-effort: if the service is down
  // we just leave the button in its default (unliked) state.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/likes?locationId=${locationId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { liked: boolean } = await res.json();
        if (!cancelled) setLiked(data.liked);
      } catch {
        if (!cancelled) setLiked(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locationId]);

  const handleLike = async () => {
    // Optimistically reflect the like; the service upsert is idempotent.
    setLiked(true);
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locationId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch {
      // Roll back if the write failed.
      setLiked(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`rounded-md border px-4 py-1 text-sm font-semibold ${
        liked
          ? "border-pink-500 bg-pink-500 text-white"
          : "border-gray-300 bg-white text-black"
      }`}
    >
      Like
    </button>
  );
}
