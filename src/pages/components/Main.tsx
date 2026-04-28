export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-white mx-4 my-2 rounded-md">{children}</main>
  );
}
