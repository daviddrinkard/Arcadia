import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Navigation from "./Navigation";

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
