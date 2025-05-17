import { Flex, Heading } from "@chakra-ui/react";

import { BarChart, PieChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, dataset2, metadata } from "@/dataset/ministries";

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
				  Ministry/Deptarment wise Expenses
				</Heading>
				<br/>
				<PieChart
					header={dataset.header }
					data={dataset.data.sort((a, b) => b[1] - a[1])}
					type="currency"
					// options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
				<BarChart
					header={dataset.header }
					data={dataset.data}
					options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
				<Heading as="h3" fontSize="18px" fontWeight={300}>
				  Scheme wise Expense
				</Heading>
				<br/>
				<PieChart
					header={dataset2.header }
					data={dataset2.data.map(e=>[e[0], e[1] <= 0 ? 0 : e[1]]).sort((a, b) => b[1] - a[1])}
					type="currency"
					// options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
				<BarChart
					header={dataset2.header }
					data={dataset2.data}
					options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
			</Flex>
		</PageShell>
	);
}
