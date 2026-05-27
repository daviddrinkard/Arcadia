import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LocationCard from "@/components/LocationCard";
import type { Location } from "@/server/types";

export default function Home() {
  const router = useRouter();
  const stateParam =
    typeof router.query.state === "string" ? router.query.state : undefined;

  const [states, setStates] = useState<string[]>([]);
  const [statesLoading, setStatesLoading] = useState(true);
  const [statesError, setStatesError] = useState<string | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  // Fetch the list of states with at least one location on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/states");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { states: string[] } = await res.json();
        if (!cancelled) setStates(data.states);
      } catch (e) {
        if (!cancelled) setStatesError((e as Error).message);
      } finally {
        if (!cancelled) setStatesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Refetch locations when the selected state changes. When stateParam is
  // absent the right pane shows the welcome screen and any stale `locations`
  // value is not rendered, so we skip clearing it eagerly.
  useEffect(() => {
    if (!router.isReady || !stateParam) return;
    let cancelled = false;
    (async () => {
      setLocationsLoading(true);
      setLocationsError(null);
      try {
        const res = await fetch(
          `/api/locations?state=${encodeURIComponent(stateParam)}`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { locations: Location[] } = await res.json();
        if (!cancelled) setLocations(data.locations);
      } catch (e) {
        if (!cancelled) setLocationsError((e as Error).message);
      } finally {
        if (!cancelled) setLocationsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, stateParam]);

  const handleStateClick = (state: string) => {
    router.push(`/?state=${encodeURIComponent(state)}`);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/4 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        {statesLoading && (
          <div className="px-2 py-1 text-gray-500">Loading states…</div>
        )}
        {statesError && (
          <div className="px-2 py-1 text-red-600">
            Failed to load states: {statesError}
          </div>
        )}
        {!statesLoading &&
          !statesError &&
          states.map((state) => (
            <LeftMenuItem
              key={state}
              state={state}
              selected={state === stateParam}
              onClick={handleStateClick}
            />
          ))}
      </div>
      {stateParam ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col pl-4">
          <div className="p-4 text-2xl font-bold">{stateParam}</div>
          {locationsLoading && (
            <div className="p-4 text-gray-500">Loading locations…</div>
          )}
          {locationsError && (
            <div className="p-4 text-red-600">
              Failed to load locations: {locationsError}
            </div>
          )}
          {!locationsLoading && !locationsError && locations.length === 0 && (
            <div className="p-4 text-gray-500">
              No locations in {stateParam} yet.
            </div>
          )}
          {!locationsLoading && !locationsError && locations.length > 0 && (
            <div className="grid min-h-0 min-w-0 flex-1 auto-rows-min grid-cols-1 content-start gap-4 overflow-y-auto sm:grid-cols-2">
              {locations.map((loc) => (
                <LocationCard
                  key={loc.location_id}
                  id={loc.location_id}
                  name={loc.name ?? "(unnamed)"}
                  location={
                    loc.city && loc.state
                      ? `${loc.city}, ${loc.state}`
                      : (loc.state ?? "")
                  }
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center p-4">
          <div className="border-grey-300 border-b p-8">
            <img src="images/Arcadia-black-large.svg" className="h-16" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <p className="text-xl font-bold">Welcome to Arcadia!</p>
            <p>
              Arcadia is a community-driven arcade enthusiast site where players
              can share information about their local arcades, in hopes of
              bringing in more players. Each location has reviews, ratings and
              game lists to give you an idea of what to expect when you visit!
            </p>
            <p>
              <span className="font-bold">
                To get started, select the state
              </span>{" "}
              you wish to browse to find a location near you! Not sure if you
              want to visit that location? Checkout the game list to see if
              there is something you must play, and then see what other players
              have said about the arcade.
            </p>
            <p>
              <span className="font-bold">
                Looking to play a specific game?
              </span>{" "}
              Click &apos;Find A Game&apos; up top to search by game and find a
              location near you that features the game.
            </p>
            <p>
              <span className="font-bold">Want to contribute?</span> Register an
              account above to leave reviews, ratings, update game lists and{" "}
              <span className="font-bold">
                even add new locations to Arcadia.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function LeftMenuItem({
  state,
  selected,
  onClick,
}: {
  state: string;
  selected?: boolean;
  onClick: (state: string) => void;
}) {
  return (
    <div
      onClick={() => onClick(state)}
      className={`cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white ${
        selected ? "bg-pink-500 text-white" : ""
      }`}
    >
      {state}
    </div>
  );
}
