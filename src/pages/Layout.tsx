import type { ReactNode } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Navigation from "./components/Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col min-h-screen w-full max-w-5xl mx-auto bg-black">
        <Header />
        <Navigation />
        <Main>{children}</Main>
        <Footer />
      </div>
    </div>
  );
}
