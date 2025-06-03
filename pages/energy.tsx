import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import PageShell from "@/components/PageShell";
import { dataset, dataset2, dataset3, metadata, stats } from "@/dataset/energy";

import ChartCard from "@/components/ChartCard";
import { StackedAreaChart } from "@/components/ChartComponents";
import { LineChart } from "@/components/ChartComponents";
import StatCard from "@/components/StatCard";
import type { Dataset3, Dict } from "@/utils/shared";
import { type SimpleDataset, chartDataFormat, titleCase } from "@/utils/shared";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Flex
				w={{ base: "90%", md: "90%" }}
				// maxW="900px"
				flexDirection="column"
				mb={4}
			>
				<Heading fontSize="lg" fontWeight="300">
					Current Total: {stats.total.toFixed(2)} GW (~
					{((stats.total * stats.hoursAvg * 365) / 1000).toFixed(2)} TWh Yearly)
				</Heading>
				<StackedAreaChart
					xyAxis={[undefined, "Installed Capacity (GW)"]}
					columns={[
						"Year",
						"Coal",
						"Gas",
						"Diesel",
						"Nuclear",
						"Hydro",
						"Wind, Solar & Other RE",
					]}
					data={Object.entries(dataset).map(([key, val]) => [
						new Date(String(key)),
						...Object.values(val).map((e) =>
							typeof e === "number" ? e / 1000 : 0,
						),
					])}
				/>
				<br />
				<br />
				<br />
				<br />
				<br />
				<Heading fontSize="lg" fontWeight="300">
					Installed electricity growth compared to Industrial growth.
				</Heading>
				<LineChart title="" header={dataset2.header} data={dataset2.data} />
				<br />
				<Heading fontSize="lg" fontWeight="300" mb={2}>
					State-wise installed capacity of Renewable Power (MW)
				</Heading>
				<br />
				<SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2} w="100%">
					<ChartGrid
						dataset={dataset3}
						section={"Electricity"}
						convert={false}
						palette={[
							"#19a3d2", // Small Hydro Power
							"#99a2b0", // Wind Power
							"#2E7D32", // Biomass Power Bagasse Cogeneration
							"#1B5E20", // Biomass Cogeneration (Non-Bagasse)
							"#C2185B", // Waste to Energy
							"#D81B60", // Waste to Energy (Off-grid)
							"#c9cd3b", // Ground Mounted Solar
							"#989c00", // PM-Surya Ghar Yojana Solar (Rooftop)
							"#7F4D00", // Hybrid Solar
							"#d2b32b", // Off-grid Solar/KUSUM
							"#1976D2", // Large Hydro
						]}
					/>
				</SimpleGrid>
			</Flex>
		</PageShell>
	);
}

function ChartGrid({
	dataset,
	palette,
	section,
	convert = false,
}: {
	dataset: Dict<Dict<number>>;
	palette: string[];
	section?: string;
	convert?: boolean;
}) {
	if (!dataset) {
		return <Text>Data not available</Text>;
	}

	return (
		<>
			{Object.entries(dataset).map(([level2Key, level2Val]) => {
				return (
					<ChartCard
						palette={Object.values(level2Val).map((e, ix) =>
							e <= 0 ? "black" : palette[ix],
						)}
						data={Object.entries(level2Val)}
						title={level2Key}
						key={level2Key}
						route={`${section !== undefined ? `${titleCase(section)} > ` : ""}${titleCase(level2Key)}`}
					/>
				);
			})}
		</>
	);
}
