import Button from "@/components/Button";
import GameButton from "@/components/GameButton";
import LocationCard from "@/components/LocationCard";
import type { Location } from "@/server/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // Add Location form. Submits to /api/locations, which proxies the Add-Data
  // microservice. (Address maps to the location's street_address; city/state/
  // zip aren't collected by this form yet.)
  const [form, setForm] = useState({
    name: "",
    street_address: "",
    phone: "",
    email: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // "My Locations" = the locations the current user has liked, read from the
  // relation table via /api/liked-locations. Best-effort: leave empty on error.
  const [likedLocations, setLikedLocations] = useState<Location[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/liked-locations");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { locations: Location[] } = await res.json();
        if (!cancelled) setLikedLocations(data.locations);
      } catch {
        if (!cancelled) setLikedLocations([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleAddLocation = async () => {
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("Location submitted.");
      setForm({ name: "", street_address: "", phone: "", email: "" });
    } catch (e) {
      setStatus(`Failed to add location: ${(e as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const games = [
    { name: "Street Fighter III", genre: "Fighting", id: 1 },
    { name: "Street Fighter IV", genre: "Fighting", id: 2 },
    { name: "Street Fighter V", genre: "Fighting", id: 3 },
    { name: "Street Fighter VI", genre: "Fighting", id: 4 },
    { name: "Street Fighter VII", genre: "Fighting", id: 5 },
    { name: "Street Fighter VIII", genre: "Fighting", id: 6 },
  ];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center">
          <p className="text-2xl font-bold pb-4">Add Location</p>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={setField("name")}
          />
          <input
            type="text"
            placeholder="Address"
            value={form.street_address}
            onChange={setField("street_address")}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={setField("phone")}
          />
          <input
            type="email"
            placeholder="Email (Optional)"
            value={form.email}
            onChange={setField("email")}
          />
          <Button onClick={handleAddLocation} variant="secondary">
            {submitting ? "Adding…" : "Add Location"}
          </Button>
          {status && <p className="pt-2 text-sm text-gray-600">{status}</p>}
        </div>
      </div>
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-2">
          <p className="text-2xl font-bold pb-4">My Locations</p>
          {likedLocations.length === 0 && (
            <p className="text-sm text-gray-500">No liked locations yet.</p>
          )}
          {likedLocations.map((loc) => (
            <LocationCard
              key={loc.location_id}
              id={loc.location_id}
              name={loc.name ?? ""}
              location={[loc.city, loc.state].filter(Boolean).join(", ")}
            />
          ))}
        </div>
      </div>
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-2">
          <p className="text-2xl font-bold pb-4">My Games</p>
          {games.map((game) => (
            <GameButton
              key={game.name}
              id={game.id}
              name={game.name}
              genre={game.genre}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
