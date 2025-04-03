import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "@/styles/theme";
import { SharedProvider } from "@/components/SharedContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <SharedProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </SharedProvider>
    </ChakraProvider>
  );
}
