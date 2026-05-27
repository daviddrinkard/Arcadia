import Link from "next/link";
import Stars from "./Stars";

export type ArcadeButtonProps = {
  id: number;
  name: string;
  location: string;
  reviews: number;
  // Average rating out of 5. Omitted/0 renders an all-empty row of stars.
  rating?: number;
};

export default function ArcadeButton({
  id,
  name,
  location,
  reviews,
  rating = 0,
}: ArcadeButtonProps) {
  return (
    <Link
      href={`/location?id=${id}`}
      className="block w-full max-w-full rounded-md bg-black p-4 text-white"
    >
      <div className="pb-2">
        <p className="text-3xl font-bold">{name}</p>
        <p className="text-xs">{location}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Stars rating={rating} />
        <div className="text-xs">({reviews} reviews)</div>
      </div>
    </Link>
  );
}
