export default function ArcadeButton({ key }: { key: string }) {
  return (
    <div key={key} className="bg-black text-white p-4 rounded-md">
      {/* Name and Location Block */}
      <div className="pb-2">
        <p className="text-3xl font-bold">Dave&apos;s Arcade</p>
        <p className="text-xs">Atlanta, GA</p>
      </div>
      {/* Reviews Block */}
      <div className="flex flex-row items-center gap-2">
        <div>XXXXX</div>
        <div className="text-xs">(100 reviews)</div>
      </div>
    </div>
  );
}
