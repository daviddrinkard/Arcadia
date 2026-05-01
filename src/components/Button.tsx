import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & (
  | { url: string; onClick?: never }
  | { url?: undefined; onClick: React.MouseEventHandler<HTMLButtonElement> }
);

export default function Button({
  url,
  onClick,
  children,
  variant = "primary",
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary:
      "bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200",
  };

  const className = `${variantClasses[variant]} cursor-pointer px-8 py-2 rounded-md inline-block text-center`;

  if (url !== undefined) {
    return (
      <Link className={className} href={url}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
