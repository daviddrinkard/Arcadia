import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { ensureUserCookie } from "@/lib/user";

export default function App({ Component, pageProps }: AppProps) {
  // Fake auth: drop the user-id cookie on first landing so per-user calls
  // (likes, etc.) have an identifier to key off.
  useEffect(() => {
    ensureUserCookie();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
