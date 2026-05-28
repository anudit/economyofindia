import { createSystem, defaultConfig } from "@chakra-ui/react";
import { Geist } from "next/font/google";

export const mainFont = Geist({ subsets: ["latin"] });
export const mainFontFamily = mainFont.style.fontFamily;

export const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				heading: { value: mainFontFamily },
				body: { value: mainFontFamily },
			},
			fontWeights: {
				normal: { value: 200 },
				medium: { value: 500 },
				bold: { value: 900 },
			},
		},
		semanticTokens: {
			colors: {
				bg: {
					DEFAULT: {
						value: { _dark: "#181C1B", _light: "#E4DCCF" },
					},
				},
				fg: {
					DEFAULT: {
						value: { _dark: "white", _light: "#6e5f4e" },
					},
				},
			},
		},
	},
	cssVarsPrefix: "in",
});
