import { Flex, Heading, Select, useBreakpointValue } from "@chakra-ui/react";

import LiveValue from "@/components/AnimatedNumber";
import { BarChart, PieChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useSharedContext } from "@/components/SharedContext";
import { SingleStat } from "@/components/SingleStat";
import { population } from "@/dataset/population";
import { calcs, dataset, dataset2, metadata } from "@/dataset/taxpayers";
import { sum } from "@/utils/shared";
import { useState } from "react";

export default function Home() {
	const chartWidth = useBreakpointValue(
		{ base: 400, md: 600, lg: 1000 },
		{ ssr: true },
	);
	const [section, setSection] = useState<string>(Object.keys(dataset)[4]);
	const { usdInrRate, activeCurrency } = useSharedContext();

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
			<Flex
				direction="column"
				bg="gray.900"
				p={4}
				borderRadius="md"
				boxShadow="md"
				border="1px solid"
				borderColor="gray.700"
				w="fit-content"
			>
				<Heading as="h3" size="xs" fontWeight={300} mb={2}>
					Live Debt Clock (INR)
				</Heading>

				<LiveValue
					startValue={calcs.debt}
					ratePerSec={calcs.ratePerSec}
					type="currency"
				/>
			</Flex>
			<br />
			<Flex flexDirection={{ base: "column", md: "row" }}>
				<SingleStat
					title="Debt per Taxpayer"
					value={
						sum(Object.values(dataset2["2024-2025"])) /
						sum(dataset["AY 2023-24"][0].data.slice(1).flatMap((e) => e[1]))
					}
				/>
				<SingleStat
					title="Total Taxpayers"
					value={sum(
						dataset["AY 2023-24"][0].data.slice(1).flatMap((e) => e[1]),
					)}
					type="value"
					extra={`(${(
						(sum(dataset["AY 2023-24"][0].data.slice(1).flatMap((e) => e[1])) /
							population) *
							100
					).toFixed(2)}%)`}
				/>
				<SingleStat
					title="Total Debt"
					value={sum(Object.values(dataset2["2024-2025"]))}
				/>
			</Flex>
			<br />
			{dataset[section].map((d, id) => {
				return (
					<Flex direction={{ base: "column", lg: "row" }} key={id}>
						<Flex direction="column" w={{ base: "200px", lg: "400px" }}>
							<PieChart
								//@ts-ignore
								data={d.data}
								hideLegend={true}
							/>
						</Flex>
						<BarChart
							header={d.header}
							data={d.data}
							options={{
								direction: "vertical",
								width: chartWidth,
								height: 250,
							}}
						/>
					</Flex>
				);
			})}
		</PageShell>
	);
}
