import { extendTheme } from "@chakra-ui/react";
import { Nunito_Sans } from "next/font/google";

export const notoComponent = Nunito_Sans({ subsets: ["latin"] });
export const noto = notoComponent.style.fontFamily;

interface ColorMode {
  colorMode: "light" | "dark";
}

const theme = extendTheme({
  styles: {
    global: ({ colorMode }: ColorMode) => ({
      "html, body": {
        background: colorMode === "dark" ? "#181C1B" : "#E4DCCF",
        color: colorMode === "dark" ? "white" : "#6e5f4e",
        heading: `${noto},-apple-system,BlinkMacSystemFont,Arial`,
        body: `${noto},-apple-system,BlinkMacSystemFont,Arial`,
      },
    }),
  },
  fonts: {
    heading: noto,
    body: noto,
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
