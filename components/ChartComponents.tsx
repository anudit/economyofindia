import { Box, Flex, Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

import { useMounted } from "@/components/useMounted";
import { mainFont, mainFontFamily } from "@/styles/theme";
import {
	type AreaChartGeneric,
	type BarChartGeneric,
	type BarChartGenericWithStyle,
	COLORS,
	CRORE,
	RED_COLORS,
	SupportedCurrencies,
	numFormat,
	sum,
	supportedCurrencies,
} from "@/utils/shared";
import { useBreakpointValue } from "@chakra-ui/react";
import { useSharedContext } from "./SharedContext";
import Responsive from "./Responsive";

const header: Array<Array<string | number>> = [["Columnn1", "Columnn2"]];

export const PieChart = ({
	data,
	palette = "green",
	type = "currency",
	hideLegend = false,
}: {
	data: [string, ...number[]][];
	palette?: "green" | "red" | string[];
	type?: "currency" | "value";
	hideLegend?: boolean;
}) => {
	const mounted = useMounted();
	const { activeCurrency, usdInrRate } = useSharedContext();

	if (!mounted) {
		return null;
	}

	return (
		<Flex
			className="pieContainer"
			w="100%"
			maxW="1000px"
			minW="0"
			h={"300px"}
			flexDirection="column"
			overflowX="scroll"
			overflowY="hidden"
		>
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
					false,
					type === "value",
				)}
			</Heading>
			<Responsive>
        {(width, height) => (
          <Chart
            chartType="PieChart"
            data={header.concat(
              data.map((e) => {
                return [
                  e[0],
                  activeCurrency === SupportedCurrencies.INR
                    ? e[1]
                    : e[1] / (usdInrRate as number),
                ];
              }),
            )}
            options={{
              backgroundColor: "transparent",
              fontColor: "black",
              legend:
                hideLegend === true
                  ? "none"
                  : {
                    position: data.length >= 5 ? "right" : "bottom",
                    alignment: "center",
                    textStyle: { color: "#fff" },
                    maxLines: 4,
                  },
              tooltip: {
                showColorCode: true,
              },
              // slices: typeof palette === 'object' ? palette.map((e, ind)=>{return {ind:{color:e}}}): undefined,
              chartArea: { width: "80%", height: "80%" },
              colors:
                typeof palette === "object"
                  ? palette
                  : palette === "green"
                    ? COLORS
                    : RED_COLORS,
              sliceVisibilityThreshold: 0,
              pieSliceBorderColor: "transparent",
              fontName: mainFontFamily,
            }}
            width={`${width}px`}
            height={"300px"}
            legendToggle={!hideLegend}
            formatters={[
              {
                type: "NumberFormat" as const,
                column: 1,
                options: {
                  prefix:
                    type === "currency"
                      ? supportedCurrencies.get(activeCurrency)?.symbol
                      : "",
                  negativeColor: "red",
                  negativeParens: true,
                },
              },
            ]}
          />
        )}
			</Responsive>
		</Flex>
	);
};

export type SankeyDataRow = [string, string, number];

export type SankeyDataWithHeader = [
	["From", "To", "Weight"],
	...SankeyDataRow[],
];

export const Sankey = ({
	data,
	fontSize = 12,
	height = "5000px",
	iters = 5,
}: {
	data: SankeyDataWithHeader;
	fontSize?: number;
	height?: string;
	iters?: number;
}) => {
	const mounted = useMounted();
	const { activeCurrency } = useSharedContext();

	const total: number = sum(
		data.slice(1).map((e) => {
			const row = e as SankeyDataRow;
			return row[2];
		}),
	);

	if (!mounted && !total) {
		return null;
	}

	return (
		<Chart
			chartType="Sankey"
			height={height}
			width="2000px"
			data={data.map((e, ix) => {
				if (ix === 0) {
					return ["From", "To", "Weight", { role: "tooltip", type: "string" }];
				} else {
					const valueCol = 2;
					const tooltip = `${numFormat(
						(e[valueCol] as number) * CRORE,
						activeCurrency,
						true,
						false,
					)} :: ${(((e[valueCol] as number) / total) * 100).toFixed(2)}%`;
					return [...e, tooltip];
				}
			})}
			options={{
				sankey: {
					iterations: iters,
					node: {
						nodePadding: 30,
						label: {
							fontName: mainFont,
							fontSize: fontSize,
							color: "#ffffff",
							bold: true,
							italic: false,
						},
					},
					interactivity: true,

					link: { colorMode: "gradient" },
				},
				tooltip: { showColorCode: true },
			}}
		/>
	);
};

export const BarChart = ({
	data,
	header,
	options = {},
}: {
	data: BarChartGeneric["data"] | BarChartGenericWithStyle["data"];
	header: BarChartGeneric["header"] | BarChartGenericWithStyle["header"];
	options: {
		direction?: "horizontal" | "vertical";
		height?: number;
		width?: number;
		fontSize?: number;
	};
}) => {
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	return (
		<Flex
			className="barContainer"
			w="100%"
			maxW="1000px"
			minW="0"
			h={options.height || "300px"}
			flexDirection="column"
			mb={4}
			overflowX="scroll"
			overflowY="hidden"
		>
		<Responsive>
      {(width, height) => (
        <Chart
     			chartType={
     					options.direction === "horizontal" ? "ColumnChart" : "BarChart"
     			}
     			data={[header, ...data]}
     			options={{
     					backgroundColor: {
     					fill: "transparent",
     					stroke: "none",
     					strokeWidth: 0,
     					},
     					height: height,
     					width: width,
     					hAxis: {
     					textStyle: { color: "white", fontSize: 12 },
     					titleTextStyle: { color: "white" },
     					gridlines: { color: "#3e3a52" },
     					minorGridlines: { color: "#3e3a52" },
     					// title: header[0]
     					},
     					vAxis: {
     					textStyle: { color: "white", fontSize: options.fontSize || 12 },
     					titleTextStyle: { color: "white" },
     					gridlines: { color: "#2F2C3E" },
     					minorGridlines: { color: "#2F2C3E" },
     					title: options.direction === "horizontal" ? header[1] : header[0],
     					// format: "percent",
     					},
     					bars: "horizontal", // no effect on ColumnChart
     					legend: { position: "none" },
     			}}
   			/>
        )}

		</Responsive>
		</Flex>
	);
};

export const StackedAreaChart = ({
	data,
	columns,
	xyAxis,
	colors = ["#FF6347", "#00BFFF", "#BDB76B", "#DAFF00", "#1E90FF", "#90EE90"],
}: AreaChartGeneric) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
			<Chart
				chartType="AreaChart"
				width="100%"
				height="300px"
				// @ts-ignore
				data={[columns].concat(data)}
				options={{
					isStacked: true,
					backgroundColor: {
						fill: "transparent",
						stroke: "none",
						strokeWidth: 0,
					},
					hAxis: {
						textStyle: { color: "white", fontSize: 12 },
						titleTextStyle: { color: "white" },
						gridlines: { color: "#3e3a52" },
						// minorGridlines: { color: "#3e3a52" },
						title: xyAxis[0],
					},
					vAxis: {
						textStyle: { color: "white", fontSize: 12 },
						titleTextStyle: { color: "white" },
						// gridlines: { color: "#2F2C3E" },
						// minorGridlines: { color: "#2F2C3E" },
						minValue: 0,
						title: xyAxis[1],
						format: "decimal",
					},
					height: 300,
					tooltip: { showColorCode: true },
					legend: {
						position: "bottom",
						textStyle: { color: "white", fontSize: 12 },
					},
					areaOpacity: 0.4,
					colors: colors,
				}}
			/>
		</div>
	);
};

export const LineChart = ({ data, header }: BarChartGeneric) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
			<Chart
				chartType="LineChart"
				width="100%"
				height="300px"
				data={[header, ...data]}
				options={{
					isStacked: true,
					backgroundColor: {
						fill: "transparent",
						stroke: "none",
						strokeWidth: 0,
					},
					hAxis: {
						textStyle: { color: "white", fontSize: 12 },
						titleTextStyle: { color: "white" },
						gridlines: { color: "#3e3a52" },
					},
					vAxis: {
						textStyle: { color: "white", fontSize: 12 },
						titleTextStyle: { color: "white" },
						minValue: 0,
						format: "decimal",
					},
					height: 300,
					tooltip: { showColorCode: true },
					legend: {
						position: "bottom",
						textStyle: { color: "white", fontSize: 12 },
					},
				}}
			/>
		</div>
	);
};
