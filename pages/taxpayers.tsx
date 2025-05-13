import { Heading, Select, useBreakpointValue } from "@chakra-ui/react";

import { BarChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/taxpayers";
import { useState } from "react";

export default function Home() {
	const chartWidth = useBreakpointValue(
		{ base: 400, md: 600, lg: 1000 },
		{ ssr: true },
	);
	const [section, setSection] = useState<string>(Object.keys(dataset)[4]);

	return (
		<PageShell
			metadata={metadata}
			topBarChildren={
				<Select
					defaultValue={4}
					borderRadius="md"
					onChange={(e) => {
						setSection(Object.keys(dataset)[e.currentTarget.selectedIndex]);
					}}
					w={{ base: "70px", sm: "120px", md: "250px" }}
					size="sm"
				>
					{Object.keys(dataset).map((k, ind) => (
						<option value={ind} key={ind}>
							{k}
						</option>
					))}
				</Select>
			}
		>
			<Heading as="h2" size="md">
				Taxpayers {section}
			</Heading>
			<br />
			{dataset[section].map((d, id) => {
				return (
					<BarChart
						key={id}
						header={d.header}
						data={d.data}
						options={{
							direction: "vertical",
							width: chartWidth,
							height: 250,
						}}
					/>
				);
			})}
		</PageShell>
	);
}
