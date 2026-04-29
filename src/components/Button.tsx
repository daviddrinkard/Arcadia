import Link from "next/link";

export default function Button({
  url,
  children,
  variant = "primary",
}: {
  url: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary:
      "bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200",
  };

  return (
    <Link
      className={`${variantClasses[variant]} px-8 py-2 rounded-md`}
      href={url}
    >
      {children}
    </Link>
  );
}
