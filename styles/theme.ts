import { extendTheme } from "@chakra-ui/react";
import { Geist } from "next/font/google";

export const mainFont = Geist({ subsets: ["latin"] });
export const mainFontFamily = mainFont.style.fontFamily;

interface ColorMode {
	colorMode: "light" | "dark";
}

const theme = extendTheme({
	styles: {
		global: ({ colorMode }: ColorMode) => ({
			"html, body": {
				background: colorMode === "dark" ? "#181C1B" : "#E4DCCF",
				color: colorMode === "dark" ? "white" : "#6e5f4e",
				heading: `${mainFontFamily},-apple-system,BlinkMacSystemFont,Arial`,
				body: `${mainFontFamily},-apple-system,BlinkMacSystemFont,Arial`,
        borderColor: 'none'
			},
		}),
	},
	fonts: {
		heading: mainFontFamily,
		body: mainFontFamily,
	},
	fontWeights: {
		normal: 200,
		medium: 500,
		bold: 900,
	},
	config: {
		cssVarPrefix: "in",
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
});

export default theme;
