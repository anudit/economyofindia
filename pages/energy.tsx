import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";

import PageShell from "@/components/PageShell";
import { dataset, dataset2, dataset3, metadata, stats } from "@/dataset/energy";

import { StackedAreaChart } from "@/components/ChartComponents";
import { LineChart } from "@/components/ChartComponents";
import ChartGrid from "@/components/ChartGrid";

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
						key,
						...Object.values(val).map((e) =>
							typeof e === "number" ? e / 1000 : 0,
						),
					])}
				/>
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
  "#996633", // PM-Surya Ghar Yojana Solar (Rooftop)
  "#7F4D00", // Hybrid Solar
  "#663300", // Off-grid Solar/KUSUM
  "#1976D2"  // Large Hydro
]}
					/>
				</SimpleGrid>
			</Flex>
		</PageShell>
	);
}
