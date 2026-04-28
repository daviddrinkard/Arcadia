import type { ReactNode } from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col min-h-screen w-full max-w-5xl mx-auto bg-red-500">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
