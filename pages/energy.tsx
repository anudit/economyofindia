import { Flex, Heading } from "@chakra-ui/react";

import PageShell from "@/components/PageShell";
import { dataset, dataset2, metadata, stats } from "@/dataset/energy";

import { StackedAreaChart } from "@/components/ChartComponents";
import { LineChart } from "@/components/ChartComponents";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Flex
				w={{ base: "90%", md: "100%" }}
				maxW="900px"
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
				<Heading fontSize="lg" fontWeight="300">
					How much of the installed electricity growth
				</Heading>
				<LineChart title="" header={dataset2.header} data={dataset2.data} />
			</Flex>
		</PageShell>
	);
}
