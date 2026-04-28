import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      <h1>Navigation BAR!</h1>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/toparcades">Top Arcades</Link>
      <Link href="/gamelist">Game List</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
