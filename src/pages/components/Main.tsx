export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-4 my-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-md bg-white">
      {children}
    </main>
  );
}
