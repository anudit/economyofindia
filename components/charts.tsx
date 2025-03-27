import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useMounted } from "@/components/useMounted";
import { CurrencyType, numFormat } from "@/utils/stringUtils";
import { Heading } from "@chakra-ui/react";
import React from "react";

export default function CustomChart({
  data,
  cur = "inr",
}: {
  data: Array<{ name: string; value: number; fill?: string }>;
  cur: CurrencyType;
}) {
  const mounted = useMounted();

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
      <PieChart width={500} height={350}>
        <Tooltip />
        <Pie
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
          labelLine={false}
          outerRadius={100}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          style={{ fontSize: "14px" }}
        />
      </PieChart>
    </>
  );
}
