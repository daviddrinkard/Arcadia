import NavButton from "./NavButton";

export default function Navigation() {
  return (
    <div className="flex items-center justify-between gap-4 bg-yellow-300 px-8">
      <NavButton url="/">Home</NavButton>
      <div className="flex gap-4">
        <NavButton url="/toparcades">Top Arcades</NavButton>
        <NavButton url="/gamelist">Game List</NavButton>
      </div>
    </div>
  );
}
