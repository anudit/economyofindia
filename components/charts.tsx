import { Chart } from "react-google-charts";
import { useBreakpointValue, Heading } from "@chakra-ui/react";

import { useMounted } from "@/components/useMounted";
import { COLORS, CurrencyType, numFormat } from "@/utils/stringUtils";

const header: Array<Array<string | number>> = [["Pizza", "Popularity"]];

export default function CustomChart({
  data,
  cur = "inr",
}: {
  data: Array<Array<string | number>>;
  cur: CurrencyType;
}) {
  const mounted = useMounted();

  const chartWidth = useBreakpointValue({
    base: 500,
    md: 480,
    lg: 480,
  });

  if (!mounted) {
    return null;
  }

  const formatters = [
    {
      type: "NumberFormat" as const,
      column: 1,
      options: {
        prefix: "$",
        negativeColor: "red",
        negativeParens: true,
      },
    },
  ];

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
          true,
          cur,
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
          colors: COLORS,
          sliceVisibilityThreshold: 0.001,
          pieSliceBorderColor: "transparent",
        }}
        width={"100%"}
        height={"350px"}
        legendToggle
        formatters={formatters}
      />
    </>
  );
}
