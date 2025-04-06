import "@/styles/globals.css";
import { SharedProvider } from "@/components/SharedContext";
import customTheme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

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
