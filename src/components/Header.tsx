import Button from "./Button";

export default function Header({ isLoggedIn }: { isLoggedIn?: boolean }) {
  return (
    <div className="flex flex-row items-center justify-between w-full px-8 py-4 text-white">
      <img
        src="images/Arcadia-main.svg"
        alt="Arcadia main logo"
        className="h-8"
      />
      <div className="flex flex-row items-center gap-4">
        {isLoggedIn ? (
          <Button url="/dashboard" variant="secondary">
            Dashboard
          </Button>
        ) : (
          <Button url="/login" variant="secondary">
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
