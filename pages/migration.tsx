import { Flex, Heading} from "@chakra-ui/react";

import { BarChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/migration";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Flex w={{base: "90%", md: "100%"}} maxW="900px" flexDirection="column" mb={4}>
        <Heading as="h3" fontSize="18px" fontWeight={300} >Net Migration from India</Heading>
        <BarChart header={dataset.header} data={dataset.data} />
      </Flex>
		</PageShell>
	);
}
