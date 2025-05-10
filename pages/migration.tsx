import { Flex, Heading} from "@chakra-ui/react";

import { BarChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/migration";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Heading as="h1" size="lg" maxW="95%">
			  Net Migration from India
			</Heading>
			<br />
			  <BarChart header={dataset.header} data={dataset.data} />
			<Flex maxW="95vw">
			</Flex>
			<br />
		</PageShell>
	);
}
