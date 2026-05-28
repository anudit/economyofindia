import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { SharedProvider } from "@/components/SharedContext";
import { Toaster } from "@/components/ui/toaster";
import { system } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider value={system}>
			<ThemeProvider
				attribute="class"
				disableTransitionOnChange
				defaultTheme="dark"
			>
				<SharedProvider>
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
					</Head>
					<Component {...pageProps} />
					<Toaster />
				</SharedProvider>
			</ThemeProvider>
		</ChakraProvider>
	);
}
