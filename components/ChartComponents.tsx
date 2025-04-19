import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

import { useMounted } from "@/components/useMounted";
import { mainFont, mainFontFamily } from "@/styles/theme";
import {
	type BarChartGeneric,
	COLORS,
	CRORE,
	RED_COLORS,
	SupportedCurrencies,
	numFormat,
	sum,
	supportedCurrencies,
} from "@/utils/shared";
import { useSharedContext } from "./SharedContext";

const header: Array<Array<string | number>> = [["Columnn1", "Columnn2"]];

export const PieChart = ({
	data,
	palette = "green",
	type = "currency",
}: {
	data: Array<[string, number]>;
	palette?: "green" | "red";
	type?: "currency" | "value";
}) => {
	const mounted = useMounted();
	const { activeCurrency, usdInrRate } = useSharedContext();

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
					false,
					type === "value",
				)}
			</Heading>
			<div id="chart">
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
						legend: {
							position: data.length > 5 ? "right" : "bottom",
							alignment: "center",
							textStyle: { color: "#fff" },
							maxLines: 4,
						},
						tooltip: {
							showColorCode: true,
						},
						// chartArea: { width: "80%", height: "80%" },
						colors: palette === "green" ? COLORS : RED_COLORS,
						sliceVisibilityThreshold: 0.001,
						pieSliceBorderColor: "transparent",
						fontName: mainFontFamily,
					}}
					width={"100%"}
					height={"300px"}
					legendToggle
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
			</div>
		</>
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
}: {
	data: SankeyDataWithHeader;
	fontSize?: number;
	height?: string;
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
					iterations: 5,
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
}: {
	data: BarChartGeneric["data"];
	header: string[];
}) => {
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	return (
		<Chart
			chartType="ColumnChart"
			data={[header, ...data]}
			options={{
				//@ts-expect-error
				backgroundColor: { fill: "transparent" },
				hAxis: {
					textStyle: { color: "white", fontSize: 11 },
					titleTextStyle: { color: "white" },
					gridlines: { color: "#3e3a52" },
					minorGridlines: { color: "#3e3a52" },
				},
				vAxis: {
					textStyle: { color: "white" },
					titleTextStyle: { color: "white" },
					gridlines: { color: "#2F2C3E" },
					minorGridlines: { color: "#2F2C3E" },
					// format: "percent",
				},
				legend: { position: "none" },
			}}
		/>
	);
};
