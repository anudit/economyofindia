import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useBreakpointValue, Heading } from "@chakra-ui/react";

import { useMounted } from "@/components/useMounted";
import { CurrencyType, numFormat } from "@/utils/stringUtils";

export default function CustomChart({
  data,
  cur = "inr",
}: {
  data: Array<{ name: string; value: number; fill?: string }>;
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
          data.map((e) => e.value).reduce((partialSum, a) => partialSum + a, 0),
          true,
          cur,
        )}
      </Heading>
      <ResponsiveContainer maxHeight={350}>
        <PieChart width={chartWidth} height={350}>
          <Tooltip />
          <Pie
            allowReorder="yes"
            isAnimationActive={false}
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            strokeWidth={0}
            label={({ payload, ...props }) => {
              return (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="white"
                >
                  {numFormat(payload.value, true, cur)}
                </text>
              );
            }}
            labelLine={true}
            outerRadius={100}
          />
          <Legend
            layout={data.length > 5 ? "vertical" : "horizontal"}
            align={data.length > 5 ? "right" : "center"}
            verticalAlign={data.length > 5 ? "middle" : "bottom"}
            wrapperStyle={{ fontSize: data.length > 5 ? "10px" : "14px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
