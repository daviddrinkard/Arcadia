import Link from "next/link";

export default function NavButton({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="hover:bg-primary-button hover:text-white transition-colors duration-200 py-2 px-4"
      href={url}
    >
      {children}
    </Link>
  );
}
