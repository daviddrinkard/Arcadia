import Link from "next/link";

export type ArcadeButtonProps = {
  id: number;
  name: string;
  location: string;
  reviews: number;
};

export default function ArcadeButton({
  id,
  name,
  location,
  reviews,
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
        <div>XXXXX</div>
        <div className="text-xs">({reviews} reviews)</div>
      </div>
    </Link>
  );
}
