import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}`}
    >
      <ThemeProvider attribute="class">
        <NextNProgress />
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
