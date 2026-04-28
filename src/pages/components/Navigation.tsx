import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex items-center justify-between gap-4 bg-yellow-300 py-2 px-8">
      <Link href="/">Home</Link>
      <div className="flex gap-4">
        <Link href="/toparcades">Top Arcades</Link>
        <Link href="/gamelist">Game List</Link>
      </div>
    </div>
  );
}
