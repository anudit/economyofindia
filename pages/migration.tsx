import { Flex, Heading } from "@chakra-ui/react";

import { BarChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/migration";
import type { BarChartGenericWithStyle } from "@/utils/shared";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Flex
				w={{ base: "90%", md: "100%" }}
				maxW="900px"
				flexDirection="column"
				mb={4}
			>
				<Heading as="h3" fontSize="18px" fontWeight={300}>
					Net Migration from India
				</Heading>
				<BarChart
					header={
						[
							...dataset.header,
							{ role: "style" },
						] as BarChartGenericWithStyle["header"]
					}
					//@ts-ignore
					data={dataset.data.map((e) => [
						...e,
						e[1] > 0 ? "color: green" : "color: red",
					])}
					options={{ direction: "horizontal" }}
				/>
			</Flex>
		</PageShell>
	);
}
