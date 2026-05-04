import Link from "next/link";

type GameButtonProps = {
  id: number;
  name: string;
  genre: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function GameButton({
  id,
  name,
  genre,
  onClick,
}: GameButtonProps) {
  return (
    <Link
      href={`/gamelist?id=${id}`}
      className="block w-full max-w-full rounded-md bg-black p-2 text-white"
    >
      <div className="pb-2">
        <p className="text-xl font-bold">{name}</p>
        <p className="text-xs">Genre: {genre}</p>
      </div>
      <div className="flex flex-row items-center justify-end">
        <button
          onClick={onClick}
          className="text-xs cursor-pointer"
          title="Remove This Game"
        >
          Remove
        </button>
      </div>
    </Link>
  );
}
