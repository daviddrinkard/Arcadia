import Link from "next/link";

export default function Button({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="bg-blue-500 text-white p-2 rounded-md" href={url}>
      {children}
    </Link>
  );
}
