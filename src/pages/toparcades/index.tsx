import ArcadeButton from "@/components/ArcadeButton";
import type { TopArcade } from "@/server/types";
import { useEffect, useState } from "react";

export default function TopArcades() {
  const [arcades, setArcades] = useState<TopArcade[]>([]);

  // Top arcades come from the Top-Locations microservice (proxied through the
  // API route). Best-effort: if the service is down we just show none.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/top-locations");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { topArcades: TopArcade[] } = await res.json();
        if (!cancelled) setArcades(data.topArcades);
      } catch {
        if (!cancelled) setArcades([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-8">
        <p className="text-2xl font-bold">Top Arcades</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mx-8 w-3/4">
        {arcades.map((arcade, index) => (
          <ArcadeButton
            key={`${arcade.id}-${index}`}
            id={arcade.id}
            name={arcade.name}
            location={arcade.location}
            reviews={arcade.reviews}
            rating={arcade.rating}
          />
        ))}
      </div>
    </div>
  );
}
