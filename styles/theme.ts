import { extendTheme } from "@chakra-ui/react";

interface ColorMode {
  colorMode: "light" | "dark";
}

const theme = extendTheme({
  styles: {
    global: ({ colorMode }: ColorMode) => ({
      "html, body": {
        background: colorMode === "dark" ? "#181C1B" : "#E4DCCF",
        color: colorMode === "dark" ? "white" : "#6e5f4e",
      },
      // path: {
      //   fill: colorMode === "dark" ? "white" : "#6e5f4e",
      // },
      hr: {
        borderColor: colorMode === "dark" ? "white" : "#6e5f4e",
      },
    }),
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  fontWeights: {
    normal: 200,
    medium: 500,
    bold: 900,
  },
  config: {
    cssVarPrefix: "ch",
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
