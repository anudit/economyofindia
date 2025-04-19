import { Flex, Heading, SimpleGrid, Text, chakra } from "@chakra-ui/react";

import { BarChart, PieChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useSharedContext } from "@/components/SharedContext";
import { dataset, dataset2, metadata } from "@/dataset/upi";
import { CRORE, numFormat } from "@/utils/shared";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Heading as="h1" size="lg" maxW="95%">
				UPI Metrics
			</Heading>
			<br />
			{dataset.map((d, id) => {
				return (
					<Flex key={id} w="95%" direction="column" my={2}>
						<Heading as="h2" size="md">
							{d.title}
						</Heading>
						<BarChart header={d.header} data={d.data} />
					</Flex>
				);
			})}
			<br />
			<SimpleGrid columns={[1, null, 2]}>
				{Object.entries(dataset2).map(([key, val], id) => {
					return (
						<Flex key={id} w="95%" direction="column" my={2}>
							<Heading as="h2" size="md">
								{key}
							</Heading>
							<PieChart data={val} type={id === 0 ? "value" : "currency"} />
						</Flex>
					);
				})}
			</SimpleGrid>
		</PageShell>
	);
}
