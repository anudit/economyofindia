import { Heading } from "@chakra-ui/react";
import { Chart } from "react-google-charts";

import { useMounted } from "@/components/useMounted";
import { mainFont, mainFontFamily } from "@/styles/theme";
import {
	COLORS,
	CRORE,
	RED_COLORS,
	numFormat,
	sum,
	supportedCurrencies,
} from "@/utils/shared";
import { useSharedContext } from "./SharedContext";

const header: Array<Array<string | number>> = [["Columnn1", "Columnn2"]];

export const PieChart = ({
	data,
	palette = "green",
}: {
	data: Array<Array<string | number>>;
	palette?: "green" | "red";
}) => {
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
			<div id="chart">
				<Chart
					chartType="PieChart"
					data={header.concat(data)}
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
								prefix: supportedCurrencies.get(activeCurrency)?.symbol,
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
