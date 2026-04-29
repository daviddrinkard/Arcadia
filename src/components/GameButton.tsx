import Link from "next/link";

type GameButtonProps = {
  id: number;
  name: string;
  genre: string;
};

export default function GameButton({ id, name, genre }: GameButtonProps) {
  return (
    <Link
      href={`/gamelist?id=${id}`}
      className="block w-full max-w-full rounded-md bg-black p-2 text-white"
    >
      <div className="pb-2">
        <p className="text-xl font-bold">{name}</p>
        <p className="text-xs">Genre: {genre}</p>
      </div>
    </Link>
  );
}
