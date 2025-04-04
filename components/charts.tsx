import { Chart } from "react-google-charts";
import { Heading } from "@chakra-ui/react";

import { useMounted } from "@/components/useMounted";
import {
  COLORS,
  numFormat,
  RED_COLORS,
  supportedCurrencies,
  SupportedCurrencies,
} from "@/utils/shared";
import { useSharedContext } from "./SharedContext";
import { noto } from "@/styles/theme";

const header: Array<Array<string | number>> = [["Pizza", "Popularity"]];

export default function CustomChart({
  data,
  palette = "green",
}: {
  data: Array<Array<string | number>>;
  palette?: "green" | "red";
}) {
  const mounted = useMounted();
  const { activeCurrency } = useSharedContext();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Heading
        as="h4"
        fontSize="sm"
        w="100%"
        color="#ffffffc9"
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt="5px"
        fontWeight={400}
      >
        Total:{" "}
        {numFormat(
          data
            .map((e) => e[1] as number)
            .reduce((partialSum, a) => partialSum + a, 0),
          activeCurrency,
          true,
          true,
        )}
      </Heading>
      <Chart
        chartType="PieChart"
        data={header.concat(data)}
        options={{
          backgroundColor: "transparent",
          legend: {
            position: data.length > 5 ? "right" : "bottom",
            alignment: "center",
            textStyle: { color: "#fff" },
          },
          tooltip: {
            showColorCode: true,
          },
          // chartArea: { width: "80%", height: "80%" },
          colors: palette == "green" ? COLORS : RED_COLORS,
          sliceVisibilityThreshold: 0.001,
          pieSliceBorderColor: "transparent",
          fontName: noto,
        }}
        width={"100%"}
        height={"300px"}
        legendToggle
        formatters={[
          {
            type: "NumberFormat" as const,
            column: 1,
            options: {
              prefix: supportedCurrencies.get(activeCurrency)?.symbol,
              negativeColor: "red",
              negativeParens: true,
            },
          },
        ]}
      />
    </>
  );
}
