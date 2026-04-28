import type { ReactNode } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Navigation from "./components/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh min-h-0 w-full flex-col overflow-hidden">
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden bg-black">
        <Header />
        <Navigation />
        <Main>{children}</Main>
        <Footer />
      </div>
    </div>
  );
}
